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
    "jee-adv":        { cls: "tag--jadv",  label: "JEE Advanced" },
    "cbse-board":     { cls: "tag--cbse",  label: "CBSE 2026\u201327" }
  };

  var SUBJECT_LABEL = {
    physics: "Physics", chemistry: "Chemistry", maths: "Mathematics",
    english: "English Core (301)", pe: "Physical Education (048)"
  };
  var CBSE_SUBJECTS = ["english", "pe"];
  var CBSE_SHORT = { english: "English", pe: "PE" };
  function isCbse(subject){ return CBSE_SUBJECTS.indexOf(subject) !== -1; }
  function chipNum(c){ return c.label ? c.label : c.cls + "." + c.num; }
  var SCOPE_ROWS = [
    { key: "cbse", filter: "ncert",    label: "CBSE 2026\u201327" },
    { key: "main", filter: "jee-main", label: "JEE Main 2026" },
    { key: "adv",  filter: "jee-adv",  label: "JEE Advanced 2026" }
  ];

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
    topicFilter: "all",
    lastPcmCls: "11"
  };

  // ---------- elements ----------
  var el = {
    grid: document.getElementById("chapterGrid"),
    count: document.getElementById("chapterCount"),
    total: document.getElementById("totalChapters"),
    search: document.getElementById("searchInput"),
    subjectBtns: Array.prototype.slice.call(document.querySelectorAll(".subject-btn[data-subject]")),
    cbseMenu: document.getElementById("cbseMenu"),
    cbseBtn: document.getElementById("cbseBtn"),
    cbseBtnLabel: document.getElementById("cbseBtnLabel"),
    cbseItems: Array.prototype.slice.call(document.querySelectorAll(".cbse-item")),
    classToggle: document.getElementById("classToggle"),
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
    var cbse = isCbse(state.subject);
    el.cbseBtn.classList.toggle("is-active", cbse);
    el.cbseBtnLabel.textContent = cbse ? "CBSE \u00b7 " + CBSE_SHORT[state.subject] : "CBSE";
    el.cbseItems.forEach(function(it){ it.classList.toggle("is-active", it.dataset.subject === state.subject); });
    // CBSE English / PE exist for Class XII only, so the class toggle has nothing to choose
    el.classToggle.classList.toggle("is-hidden", cbse);
    if(!state.openChapterId) setAccent(state.subject);
  }

  function setSubject(subject){
    if(isCbse(subject)){
      if(!isCbse(state.subject)) state.lastPcmCls = state.cls;
      state.subject = subject;
      state.cls = "12";
    } else {
      state.subject = subject;
      state.cls = state.lastPcmCls || "11";
    }
    renderControls(); renderGrid();
  }

  // ---------- render: grid ----------
  function renderGrid(){
    var list = filteredChapters();
    el.count.textContent = list.length + (list.length === 1 ? " chapter" : " chapters");

    if(list.length === 0){
      var msg = state.query.trim()
        ? 'No chapters match "' + escapeHtml(state.query) + '".'
        : "No chapters found here yet.";
      el.grid.innerHTML = '<div class="empty-state">' + msg + '</div>';
      return;
    }

    el.grid.innerHTML = list.map(function(c){
      var linked = (c.prereq.length + c.unlocks.length) > 0;
      var mainTags = c.tags.slice(0, 3).map(tagPill).join(" ") +
        (c.marks ? ' <span class="tag tag--marks">' + escapeHtml(c.marks) + '</span>' : '') +
        (c.span ? ' <span class="tag tag--span">' + c.span + '</span>' : '');
      return (
        '<button class="chapter-card' + (c.id === state.openChapterId ? " is-active" : "") + '" data-id="' + c.id + '">' +
          '<div class="chapter-card__top">' +
            '<span class="chapter-card__num">' + chipNum(c) + '</span>' +
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
            '<span class="link-chip__num">' + chipNum(c) + '</span>' +
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
          note: "CBSE formative-only: curriculum-present but not summatively assessed (not the same as \u201cnot in CBSE\u201d)."
        };
      }
      return {
        mode: "message",
        message: (c.scope && c.scope.cbse) ? c.scope.cbse
          : "Not a standalone summatively assessed chapter in CBSE 2026\u201327."
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
    var scopeKey = filterKey === "jee-main" ? "main" : "adv";
    return {
      mode: "message",
      message: (c.scope && c.scope[scopeKey]) ? c.scope[scopeKey]
        : "Not on the " + niceName + " syllabus for this chapter."
    };
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

    if(isCbse(c.subject)){
      return (
        (c.note ? '<p class="topics-note">' + escapeHtml(c.note) + '</p>' : '') +
        '<p class="topics-panel__hint">' + c.topics.length + ' topics' + (c.marks ? ' \u00b7 ' + escapeHtml(c.marks) : '') + '</p>' +
        bodyHtml
      );
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
    var tagsHtml = c.tags.map(tagPill).join(" ") +
      (c.marks ? ' <span class="tag tag--marks">' + escapeHtml(c.marks) + '</span>' : '') +
      (c.span ? ' <span class="tag tag--span">' + c.span + '</span>' : '');
    var cbse = isCbse(c.subject);
    var hasLinks = (c.prereq.length + c.unlocks.length) > 0;

    var scopeHtml = "";
    if(c.scope){
      scopeHtml =
        '<div class="scope-panel">' +
          '<h3>Official scope, side by side</h3>' +
          '<p class="scope-panel__hint">Wording and depth can differ between the three \u2014 this is the crosswalk text for this chapter.</p>' +
          SCOPE_ROWS.map(function(r){
            return '<div class="scope-row" data-scope="' + r.filter + '">' +
              '<p class="scope-row__label">' + r.label + '</p>' +
              '<p class="scope-row__text">' + escapeHtml(c.scope[r.key]) + '</p></div>';
          }).join("") +
        '</div>';
    }

    var templatesHtml = "";
    if(c.templates){
      templatesHtml =
        '<div class="tpl-panel">' +
          '<div class="tpl-panel__head">' +
            '<div><h3>Writing templates</h3>' +
            '<p class="tpl-panel__hint">Open a format to see its layout. Fill the blanks and stay inside the word limit.</p></div>' +
            (c.pdf ? '<div class="tpl-actions">' +
              '<a class="embed-btn" href="' + escapeHtml(c.pdf.file) + '" target="_blank" rel="noopener">Open PDF</a>' +
              '<a class="embed-btn embed-btn--ghost" href="' + escapeHtml(c.pdf.file) + '" download>Download</a>' +
            '</div>' : '') +
          '</div>' +
          '<div class="tpl-toolbar">' +
            '<button type="button" class="tpl-toggle" data-tpl="expand">Expand all</button>' +
            '<button type="button" class="tpl-toggle" data-tpl="collapse">Collapse all</button>' +
            (c.pdf ? '<span class="tpl-source">Source: ' + escapeHtml(c.pdf.title) + ' \u00b7 ' + escapeHtml(c.pdf.meta || "") + '</span>' : '') +
          '</div>' +
          c.templates.map(function(g){
            return '<section class="tpl-group">' +
              '<div class="tpl-group__head"><h4>' + escapeHtml(g.group) + '</h4>' +
              (g.note ? '<span class="tpl-group__note">' + escapeHtml(g.note) + '</span>' : '') + '</div>' +
              g.items.map(function(it){
                return '<details class="tpl">' +
                  '<summary><span class="tpl__title">' + escapeHtml(it.title) + '</span>' +
                  '<span class="tpl__tag">' + escapeHtml(it.tag || "") + '</span></summary>' +
                  '<div class="tpl__body">' +
                    (function(){
                      var linesHtml = it.lines.map(function(l){
                        if(l === "") return '<div class="tpl-line tpl-line--gap"></div>';
                        if(l.charAt(0) === "~") return '<div class="tpl-deco">' + escapeHtml(l.slice(1)) + '</div>';   // decorative, not copied
                        var centred = l.charAt(0) === "^";
                        return '<div class="tpl-line' + (centred ? ' tpl-line--c' : '') + '">' + escapeHtml(centred ? l.slice(1) : l) + '</div>';
                      }).join("");
                      return '<div class="tpl-paper' + (it.boxed ? ' tpl-paper--boxed' : '') + '">' +
                        (it.boxed ? '<div class="tpl-box tpl-box--' + it.boxed + '">' + linesHtml + '</div>' : linesHtml) +
                      '</div>';
                    })() +
                    '<button type="button" class="tpl-copy">Copy template</button>' +
                  '</div>' +
                '</details>';
              }).join("") +
            '</section>';
          }).join("") +
        '</div>';
    }

    var linksHtml = "";
    if(!cbse || hasLinks){
      linksHtml =
      '<div class="detail-grid">' +
        '<div class="link-panel">' +
          '<h3>Prerequisite chapters</h3>' +
          '<p class="link-panel__hint">Have these solid before starting this one.</p>' +
          linkList(c.prereq, "No formal prerequisite \u2014 this is a good place to start.") +
          (c.prereqText ? '<p class="link-note"><b>CONCEPTS NEEDED</b><br>' + escapeHtml(c.prereqText) + '</p>' : '') +
        '</div>' +
        '<div class="link-panel">' +
          '<h3>Used in later chapters</h3>' +
          '<p class="link-panel__hint">This chapter feeds directly into&hellip;</p>' +
          linkList(c.unlocks, "Not a direct prerequisite for any other mapped chapter.") +
          (c.usedText ? '<p class="link-note"><b>REUSED IN</b><br>' + escapeHtml(c.usedText) + '</p>' : '') +
        '</div>' +
      '</div>';
    }

    el.drawerContent.innerHTML =
      '<p class="back-crumb">' + (cbse ? 'CBSE 2026\u201327 &middot; ' : '') + SUBJECT_LABEL[c.subject] + ' &middot; Class ' + c.cls + '</p>' +

      '<div class="chapter-detail__head">' +
        '<div class="chapter-detail__badge">' + (c.badge || c.num) + '<small>' + (c.badgeSmall || 'Ch.') + '</small></div>' +
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

      templatesHtml +
      scopeHtml +
      linksHtml;

    Array.prototype.slice.call(el.drawerContent.querySelectorAll(".link-chip")).forEach(function(btn){
      btn.addEventListener("click", function(){ openChapter(btn.dataset.id); });
    });

    bindTopicFilterButtons(c);

    document.title = c.title + " \u2014 JEE Syllabus Map";
    el.drawerContent.scrollTop = 0;
  }

  function highlightScope(){
    Array.prototype.slice.call(el.drawerContent.querySelectorAll(".scope-row")).forEach(function(row){
      row.classList.toggle("is-focus", row.dataset.scope === state.topicFilter);
    });
  }

  function bindTopicFilterButtons(c){
    Array.prototype.slice.call(el.drawerContent.querySelectorAll(".topic-filter-btn")).forEach(function(btn){
      btn.onclick = function(){
        state.topicFilter = btn.dataset.filter;
        document.getElementById("topicsPanelBody").innerHTML = renderTopicsPanelInner(c);
        bindTopicFilterButtons(c);
        highlightScope();
      };
    });
  }

  // ---------- drawer open / close ----------
  function openChapter(id){
    var c = byId[id];
    if(!c) return;
    state.openChapterId = id;
    // keep the grid behind the drawer on the same subject/class as the chapter (e.g. after jumping PE -> Physics)
    if(state.subject !== c.subject || state.cls !== c.cls){
      if(isCbse(c.subject) && !isCbse(state.subject)) state.lastPcmCls = state.cls;
      state.subject = c.subject;
      state.cls = c.cls;
      if(!isCbse(c.subject)) state.lastPcmCls = c.cls;
      renderControls();
    }
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
    btn.addEventListener("click", function(){ setSubject(btn.dataset.subject); });
  });
  el.classBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      state.cls = btn.dataset.cls;
      state.lastPcmCls = btn.dataset.cls;
      renderControls(); renderGrid();
    });
  });

  // ---------- CBSE dropdown: opens on hover (mouse) or click/tap/keyboard ----------
  var hoverCapable = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  var cbseCloseTimer = null;
  function openCbseMenu(){
    clearTimeout(cbseCloseTimer);
    el.cbseMenu.classList.add("is-open");
    el.cbseBtn.setAttribute("aria-expanded", "true");
  }
  function closeCbseMenu(){
    clearTimeout(cbseCloseTimer);
    el.cbseMenu.classList.remove("is-open");
    el.cbseBtn.setAttribute("aria-expanded", "false");
  }
  el.cbseMenu.addEventListener("mouseenter", function(){ if(hoverCapable) openCbseMenu(); });
  el.cbseMenu.addEventListener("mouseleave", function(){
    if(hoverCapable) cbseCloseTimer = setTimeout(closeCbseMenu, 180);
  });
  el.cbseBtn.addEventListener("click", function(){
    if(el.cbseMenu.classList.contains("is-open") && !hoverCapable) closeCbseMenu(); else openCbseMenu();
  });
  el.cbseBtn.addEventListener("keydown", function(e){
    if(e.key === "ArrowDown"){ e.preventDefault(); openCbseMenu(); if(el.cbseItems[0]) el.cbseItems[0].focus(); }
  });
  el.cbseItems.forEach(function(it, i){
    it.addEventListener("click", function(){ setSubject(it.dataset.subject); closeCbseMenu(); });
    it.addEventListener("keydown", function(e){
      if(e.key === "ArrowDown"){ e.preventDefault(); (el.cbseItems[i+1] || el.cbseItems[0]).focus(); }
      if(e.key === "ArrowUp"){ e.preventDefault(); (el.cbseItems[i-1] || el.cbseItems[el.cbseItems.length-1]).focus(); }
    });
  });
  document.addEventListener("click", function(e){
    if(!el.cbseMenu.contains(e.target)) closeCbseMenu();
  });
  el.search.addEventListener("input", function(){
    state.query = el.search.value;
    renderGrid();
  });
  el.grid.addEventListener("click", function(e){
    var card = e.target.closest(".chapter-card");
    if(card) openChapter(card.dataset.id);
  });

  el.drawerContent.addEventListener("click", function(e){
    var tog = e.target.closest(".tpl-toggle");
    if(tog){
      var open = tog.dataset.tpl === "expand";
      Array.prototype.slice.call(el.drawerContent.querySelectorAll("details.tpl")).forEach(function(d){ d.open = open; });
      return;
    }
    var cp = e.target.closest(".tpl-copy");
    if(cp){
      var text = Array.prototype.slice.call(cp.parentNode.querySelectorAll(".tpl-line")).map(function(n){ return n.textContent; }).join("\n");
      var done = function(ok){
        cp.textContent = ok ? "Copied \u2713" : "Press Ctrl/Cmd+C to copy";
        setTimeout(function(){ cp.textContent = "Copy template"; }, 1600);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ done(true); }, function(){ done(false); });
      } else { done(false); }
    }
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
    if(el.cbseMenu.classList.contains("is-open")){ closeCbseMenu(); el.cbseBtn.focus(); return; }
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
      if(!isCbse(c.subject)) state.lastPcmCls = c.cls;
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
      if(!isCbse(c.subject)) state.lastPcmCls = c.cls;
      renderControls();
      renderGrid();
      openChapter(hash);
    }
  }

  init();
})();
