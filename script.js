(function(){
  "use strict";

  var CHAPTERS = window.CHAPTERS || [];
  var byId = {};
  CHAPTERS.forEach(function(c){ byId[c.id] = c; });

  var TAG_META = {
    "ncert":          { cls: "tag--ncert", label: "NCERT" },
    "cbse-formative": { cls: "tag--cbsef", label: "CBSE \u00b7 formative" },
    "old-ncert":      { cls: "tag--old",   label: "Old NCERT" },
    "jee-main":       { cls: "tag--jmain", label: "JEE Main" },
    "jee-adv":        { cls: "tag--jadv",  label: "JEE Advanced" }
  };

  var SUBJECT_LABEL = { physics: "Physics", chemistry: "Chemistry", maths: "Mathematics" };

  var DEFAULT_TITLE = "JEE Syllabus Map \u2014 Physics, Chemistry & Maths, chapter by chapter";

  // The four topic-filter pills shown inside every chapter drawer.
  // "ncert" doubles as the CBSE board-syllabus filter.
  var TOPIC_FILTERS = [
    { key: "all",      label: "All topics" },
    { key: "ncert",    label: "CBSE / NCERT" },
    { key: "jee-main", label: "JEE Main" },
    { key: "jee-adv",  label: "JEE Advanced" }
  ];

  var state = {
    subject: "physics",
    cls: "11",
    query: "",
    openChapterId: null,
    topicFilter: "all"
  };

  // ---------- elements ----------
  var el = {
    grid: document.getElementById("chapterGrid"),
    count: document.getElementById("chapterCount"),
    total: document.getElementById("totalChapters"),
    search: document.getElementById("searchInput"),
    subjectBtns: Array.prototype.slice.call(document.querySelectorAll(".subject-btn")),
    classBtns: Array.prototype.slice.call(document.querySelectorAll(".class-btn")),
    drawer: document.getElementById("drawer"),
    drawerContent: document.getElementById("drawerContent"),
    drawerClose: document.getElementById("drawerClose"),
    backdrop: document.getElementById("backdrop"),
    legendBtn: document.getElementById("legendBtn"),
    legendOverlay: document.getElementById("legendOverlay"),
    legendClose: document.getElementById("legendClose"),
    brand: document.getElementById("brandLink")
  };

  el.total.textContent = CHAPTERS.length + " chapters mapped";

  // ---------- helpers ----------
  function tagPill(tagKey){
    var meta = TAG_META[tagKey];
    if(!meta) return "";
    return '<span class="tag ' + meta.cls + '">' + meta.label + '</span>';
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(m){
      return ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[m];
    });
  }

  function setAccent(subject){
    document.documentElement.style.setProperty("--accent", "var(--" + subject + ")");
    document.documentElement.style.setProperty("--accent-soft", "var(--" + subject + "-soft)");
  }

  function filteredChapters(){
    var q = state.query.trim().toLowerCase();
    return CHAPTERS.filter(function(c){
      if(c.subject !== state.subject || c.cls !== state.cls) return false;
      if(!q) return true;
      if(c.title.toLowerCase().indexOf(q) !== -1) return true;
      return c.topics.some(function(t){ return t.toLowerCase().indexOf(q) !== -1; });
    }).sort(function(a,b){ return a.num - b.num; });
  }

  // ---------- render: controls ----------
  function renderControls(){
    el.subjectBtns.forEach(function(btn){
      btn.classList.toggle("is-active", btn.dataset.subject === state.subject);
    });
    el.classBtns.forEach(function(btn){
      btn.classList.toggle("is-active", btn.dataset.cls === state.cls);
    });
    if(!state.openChapterId) setAccent(state.subject);
  }

  // ---------- render: grid ----------
  function renderGrid(){
    var list = filteredChapters();
    el.count.textContent = list.length + (list.length === 1 ? " chapter" : " chapters");

    if(list.length === 0){
      var msg = state.query.trim()
        ? 'No chapters match "' + escapeHtml(state.query) + '".'
        : "No chapters found for this class yet.";
      el.grid.innerHTML = '<div class="empty-state">' + msg + '</div>';
      return;
    }

    el.grid.innerHTML = list.map(function(c){
      var linked = (c.prereq.length + c.unlocks.length) > 0;
      var mainTags = c.tags.slice(0, 3).map(tagPill).join(" ");
      return (
        '<button class="chapter-card' + (c.id === state.openChapterId ? " is-active" : "") + '" data-id="' + c.id + '">' +
          '<div class="chapter-card__top">' +
            '<span class="chapter-card__num">' + c.cls + '.' + c.num + '</span>' +
            (linked ? '<span class="chapter-card__linked">LINKED</span>' : '') +
          '</div>' +
          '<h3 class="chapter-card__title">' + escapeHtml(c.title) + '</h3>' +
          '<p class="chapter-card__blurb">' + escapeHtml(c.blurb) + '</p>' +
          '<div class="chapter-card__foot">' +
            '<span>' + c.topics.length + ' topics</span>' +
            '<span class="dot">&middot;</span>' + mainTags +
          '</div>' +
        '</button>'
      );
    }).join("");
  }

  // ---------- render: drawer content ----------
  function linkList(ids, emptyMsg){
    if(!ids.length){
      return '<p class="link-empty">' + emptyMsg + '</p>';
    }
    return '<ul class="link-list">' + ids.map(function(id){
      var c = byId[id];
      if(!c) return "";
      return (
        '<li>' +
          '<button class="link-chip" data-id="' + c.id + '">' +
            '<span class="link-chip__num">' + c.cls + '.' + c.num + '</span>' +
            '<span>' +
              '<span class="link-chip__title">' + escapeHtml(c.title) + '</span>' +
              '<span class="link-chip__sub">' + SUBJECT_LABEL[c.subject] + ' &middot; Class ' + c.cls + '</span>' +
            '</span>' +
          '</button>' +
        '</li>'
      );
    }).join("") + '</ul>';
  }

  // Effective tag set for one topic: a per-topic override if one exists,
  // otherwise it simply inherits every tag the whole chapter carries.
  function topicTags(c, topicText){
    var ov = c.topicOverrides && c.topicOverrides[topicText];
    return ov && ov.length ? ov : c.tags;
  }

  // Decides what the topics panel should show for a given filter key:
  // the full list, a filtered subset, or an explanatory message when the
  // chapter simply isn't part of that syllabus at all.
  var FRIENDLY_FILTER_LABEL = {
    "ncert": "the CBSE / NCERT syllabus",
    "jee-main": "JEE Main",
    "jee-adv": "JEE Advanced"
  };

  function resolveTopicView(c, filterKey){
    if(filterKey === "all"){
      return { mode: "list", items: c.topics };
    }

    var hasTag = c.tags.indexOf(filterKey) !== -1;

    if(filterKey === "ncert"){
      if(hasTag){
        var itemsN = c.topics.filter(function(t){ return topicTags(c,t).indexOf("ncert") !== -1; });
        return {
          mode: "list",
          items: itemsN,
          note: itemsN.length === c.topics.length
            ? "Nothing exclusive here \u2014 every topic in this chapter is also on " + FRIENDLY_FILTER_LABEL["ncert"] + "."
            : undefined
        };
      }
      if(c.tags.indexOf("cbse-formative") !== -1){
        return {
          mode: "list",
          items: c.topics,
          note: "Formative only in the CBSE 2026\u201327 syllabus \u2014 not asked in the board exam, but still fair game for JEE."
        };
      }
      return {
        mode: "message",
        message: "Not in the CBSE 2026\u201327 syllabus." + (c.tags.indexOf("old-ncert") !== -1
          ? " It was a full chapter in the pre-rationalisation NCERT textbook, and JEE Advanced still expects it."
          : "")
      };
    }

    if(hasTag){
      var items = c.topics.filter(function(t){ return topicTags(c,t).indexOf(filterKey) !== -1; });
      return {
        mode: "list",
        items: items,
        note: items.length === c.topics.length
          ? "Nothing exclusive here \u2014 every topic in this chapter is also on " + FRIENDLY_FILTER_LABEL[filterKey] + "."
          : undefined
      };
    }
    var niceName = filterKey === "jee-main" ? "JEE Main" : "JEE Advanced";
    return { mode: "message", message: "Not on the " + niceName + " syllabus for this chapter." };
  }

  function renderTopicsPanelInner(c){
    var view = resolveTopicView(c, state.topicFilter);

    var pillsHtml = TOPIC_FILTERS.map(function(f){
      return '<button class="topic-filter-btn' + (f.key === state.topicFilter ? " is-active" : "") + '" data-filter="' + f.key + '">' + f.label + '</button>';
    }).join("");

    var bodyHtml;
    if(view.mode === "message"){
      bodyHtml = '<p class="topics-message">' + escapeHtml(view.message) + '</p>';
    } else {
      bodyHtml =
        (view.note ? '<p class="topics-note">' + escapeHtml(view.note) + '</p>' : "") +
        (view.items.length
          ? '<ul class="topics-list">' + view.items.map(function(t){ return '<li>' + escapeHtml(t) + '</li>'; }).join("") + '</ul>'
          : '<p class="topics-message">No topics tagged for this filter.</p>');
    }

    return (
      '<div class="topics-filter-row">' + pillsHtml + '</div>' +
      '<p class="topics-panel__hint">' +
        (view.mode === "list" ? view.items.length + " of " + c.topics.length + " topics shown" : "0 of " + c.topics.length + " topics shown") +
      '</p>' +
      bodyHtml
    );
  }

  function renderDrawerContent(c){
    setAccent(c.subject);
    state.topicFilter = "all";
    var tagsHtml = c.tags.map(tagPill).join(" ");

    el.drawerContent.innerHTML =
      '<p class="back-crumb">' + SUBJECT_LABEL[c.subject] + ' &middot; Class ' + c.cls + '</p>' +

      '<div class="chapter-detail__head">' +
        '<div class="chapter-detail__badge">' + c.num + '<small>Ch.</small></div>' +
        '<div class="chapter-detail__heading">' +
          '<h2 class="chapter-detail__title">' + escapeHtml(c.title) + '</h2>' +
          '<p class="chapter-detail__blurb">' + escapeHtml(c.blurb) + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="chapter-detail__tags">' + tagsHtml + '</div>' +

      '<div class="topics-panel">' +
        '<h3>Topics in this chapter</h3>' +
        '<div id="topicsPanelBody">' + renderTopicsPanelInner(c) + '</div>' +
      '</div>' +

      '<div class="detail-grid">' +
        '<div class="link-panel">' +
          '<h3>Prerequisite chapters</h3>' +
          '<p class="link-panel__hint">Have these solid before starting this one.</p>' +
          linkList(c.prereq, "No formal prerequisite \u2014 this is a good place to start.") +
        '</div>' +
        '<div class="link-panel">' +
          '<h3>Used in later chapters</h3>' +
          '<p class="link-panel__hint">This chapter feeds directly into&hellip;</p>' +
          linkList(c.unlocks, "Not a direct prerequisite for any other mapped chapter.") +
        '</div>' +
      '</div>';

    Array.prototype.slice.call(el.drawerContent.querySelectorAll(".link-chip")).forEach(function(btn){
      btn.addEventListener("click", function(){ openChapter(btn.dataset.id); });
    });

    bindTopicFilterButtons(c);

    document.title = c.title + " \u2014 JEE Syllabus Map";
    el.drawerContent.scrollTop = 0;
  }

  function bindTopicFilterButtons(c){
    Array.prototype.slice.call(el.drawerContent.querySelectorAll(".topic-filter-btn")).forEach(function(btn){
      btn.onclick = function(){
        state.topicFilter = btn.dataset.filter;
        document.getElementById("topicsPanelBody").innerHTML = renderTopicsPanelInner(c);
        bindTopicFilterButtons(c);
      };
    });
  }

  // ---------- drawer open / close ----------
  function openChapter(id){
    var c = byId[id];
    if(!c) return;
    state.openChapterId = id;
    renderDrawerContent(c);
    el.drawer.classList.add("is-open");
    el.drawer.setAttribute("aria-hidden", "false");
    el.backdrop.classList.add("is-open");
    document.body.classList.add("drawer-open");
    renderGrid();
    history.replaceState(null, "", "#" + id);
  }

  function closeDrawer(){
    if(!state.openChapterId) return;
    el.drawer.classList.remove("is-open");
    el.drawer.setAttribute("aria-hidden", "true");
    el.backdrop.classList.remove("is-open");
    document.body.classList.remove("drawer-open");
    state.openChapterId = null;
    document.title = DEFAULT_TITLE;
    setAccent(state.subject);
    renderGrid();
    history.replaceState(null, "", "#");
  }

  // ---------- legend modal open / close ----------
  function openLegend(){ el.legendOverlay.classList.add("is-open"); }
  function closeLegend(){ el.legendOverlay.classList.remove("is-open"); }

  // ---------- events ----------
  el.subjectBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      state.subject = btn.dataset.subject;
      renderControls(); renderGrid();
    });
  });
  el.classBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      state.cls = btn.dataset.cls;
      renderControls(); renderGrid();
    });
  });
  el.search.addEventListener("input", function(){
    state.query = el.search.value;
    renderGrid();
  });
  el.grid.addEventListener("click", function(e){
    var card = e.target.closest(".chapter-card");
    if(card) openChapter(card.dataset.id);
  });

  el.drawerClose.addEventListener("click", closeDrawer);
  el.backdrop.addEventListener("click", closeDrawer);

  el.brand.addEventListener("click", function(e){
    e.preventDefault();
    closeDrawer();
    closeLegend();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  el.legendBtn.addEventListener("click", openLegend);
  el.legendClose.addEventListener("click", closeLegend);
  el.legendOverlay.addEventListener("click", function(e){
    if(e.target === el.legendOverlay) closeLegend();
  });

  document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    if(el.legendOverlay.classList.contains("is-open")){ closeLegend(); return; }
    if(state.openChapterId){ closeDrawer(); }
  });

  window.addEventListener("hashchange", function(){
    var hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if(!hash){
      if(state.openChapterId) closeDrawer();
      return;
    }
    if(byId[hash] && hash !== state.openChapterId){
      var c = byId[hash];
      state.subject = c.subject;
      state.cls = c.cls;
      renderControls();
      renderGrid();
      openChapter(hash);
    }
  });

  // ---------- init ----------
  function init(){
    renderControls();
    renderGrid();

    var hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if(hash && byId[hash]){
      var c = byId[hash];
      state.subject = c.subject;
      state.cls = c.cls;
      renderControls();
      renderGrid();
      openChapter(hash);
    }
  }

  init();
})();
