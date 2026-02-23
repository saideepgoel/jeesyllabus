// --- GEMINI API CONFIG ---
const apiKey = "AIzaSyAnh8v0E0qY8z5ZPOD6Y1g5FIV_QEbUOUQ";

// --- 1. DATA STORE ---
const syllabusDB = {
    physics: [
        { id: "p11_01", title: "Units & Measurements", class: 11, desc: "Error analysis and dimensional formulas.", significance: "Used in every single chapter to check formula consistency. 4-8 marks guaranteed in JEE Main.", topics: ["Dimensional Analysis", "Significant Figures", "Errors", "Vernier Caliper"], prereqs: [] },
        { id: "p11_02", title: "Vectors & Basic Maths", class: 11, desc: "Mathematical tools for Physics.", significance: "CRITICAL. You cannot do Physics without Vectors and Calculus.", topics: ["Vector Addition", "Dot & Cross Product", "Differentiation", "Integration"], prereqs: [] },
        { id: "p11_03", title: "Kinematics (1D & 2D)", class: 11, desc: "Motion of objects without reference to forces.", significance: "Foundation of mechanics. Projectile motion concepts recur in Electrostatics.", topics: ["Equations of Motion", "Graphs (v-t, x-t)", "Projectile Motion", "Relative Velocity"], prereqs: ["p11_02"] },
        { id: "p11_04", title: "Newton's Laws of Motion", class: 11, desc: "Forces, Equilibrium, and Dynamics.", significance: "The heart of classical physics. Free Body Diagrams (FBD) are the #1 skill in JEE Physics.", topics: ["FBD Drawing", "Law of Inertia", "Conservation of Momentum", "Friction"], prereqs: ["p11_03", "p11_02"] },
        { id: "p11_05", title: "Work, Power & Energy", class: 11, desc: "Energy conservation principles.", significance: "Provides shortcuts to solve difficult Newton's Laws problems. Essential for Electrostatics.", topics: ["Work-Energy Theorem", "Potential Energy", "Spring Force", "Vertical Circular Motion"], prereqs: ["p11_04", "p11_02"] },
        { id: "p11_06", title: "Center of Mass & Collisions", class: 11, desc: "System of particles and momentum conservation.", significance: "Vital for Rotation and Modern Physics (nuclear collisions).", topics: ["COM Calculation", "Momentum Conservation", "Collisions", "Coefficient of Restitution"], prereqs: ["p11_05", "p11_04"] },
        { id: "p11_07", title: "Rotational Motion", class: 11, desc: "Dynamics of rigid bodies.", significance: "The 'Final Boss' of Class 11. Combines every concept learned so far.", topics: ["Moment of Inertia", "Torque", "Rolling Motion", "Angular Momentum Conservation"], prereqs: ["p11_06", "p11_05", "p11_04", "p11_02"] },
        { id: "p11_08", title: "Gravitation", class: 11, desc: "Universal law of gravitation and satellites.", significance: "Direct analogue to Electrostatics. Master this, and Electrostatics becomes 50% easier.", topics: ["Gravitational Field & Potential", "Kepler's Laws", "Escape Velocity", "Satellite Motion"], prereqs: ["p11_05", "p11_07"] },
        { id: "p11_09", title: "Solids & Fluids", class: 11, desc: "Properties of matter.", significance: "Scoring topic. Fluid concepts often mixed with SHM.", topics: ["Young's Modulus", "Pascal's Law", "Archimedes Principle", "Bernoulli's Theorem"], prereqs: ["p11_04"] },
        { id: "p11_10", title: "Thermal Physics", class: 11, desc: "Heat, Thermodynamics, and KTG.", significance: "High weightage in JEE Main. Overlaps with Chemistry Thermodynamics.", topics: ["Calorimetry", "Thermal Expansion", "First Law of Thermodynamics", "Heat Engines"], prereqs: ["p11_05"] },
        { id: "p11_11", title: "SHM & Waves", class: 11, desc: "Oscillatory motion and wave propagation.", significance: "Basis for AC Circuits (12th) and Wave Optics (12th).", topics: ["Equation of SHM", "Energy in SHM", "Sound Waves", "Doppler Effect"], prereqs: ["p11_03", "p11_04", "p11_05"] },
        { id: "p12_01", title: "Electrostatics", class: 12, desc: "Static charges, fields, and potentials.", significance: "The start of Electromagnetism. Huge weightage.", topics: ["Coulomb's Law", "Gauss Law", "Electric Potential", "Capacitors & Dielectrics"], prereqs: ["p11_02", "p11_04", "p11_05", "p11_08"] },
        { id: "p12_02", title: "Current Electricity", class: 12, desc: "Electric current, resistance, and circuits.", significance: "Easiest high-scoring chapter in 12th Physics.", topics: ["Ohm's Law", "Kirchhoff's Laws", "Combination of Resistors", "Measuring Instruments"], prereqs: ["p12_01", "p11_10"] },
        { id: "p12_03", title: "Magnetic Effects of Current", class: 12, desc: "Magnetic fields due to moving charges.", significance: "Requires strong visualization and vector cross-product skills.", topics: ["Biot-Savart Law", "Ampere's Law", "Force on Charge/Wire", "Cyclotron"], prereqs: ["p12_02", "p11_02", "p11_07"] },
        { id: "p12_04", title: "Magnetism & Matter", class: 12, desc: "Earth's magnetism and magnetic properties.", significance: "Theory heavy, quick to solve.", topics: ["Earth's Magnetism", "Hysteresis", "Para/Dia/Ferro Materials"], prereqs: ["p12_03"] },
        { id: "p12_05", title: "EMI & AC", class: 12, desc: "Electromagnetic Induction and Alternating Current.", significance: "Combines Calc, SHM, and Magnetism.", topics: ["Faraday's & Lenz's Law", "Self/Mutual Inductance", "LCR Circuits", "Transformers"], prereqs: ["p12_03", "p11_11"] },
        { id: "p12_06", title: "Ray Optics", class: 12, desc: "Reflection, Refraction, and Instruments.", significance: "Independent unit but long. Good geometry skills needed.", topics: ["Mirror Formula", "Snell's Law & TIR", "Lens Maker's Formula", "Optical Instruments"], prereqs: ["p11_01"] },
        { id: "p12_07", title: "Wave Optics", class: 12, desc: "Light as a wave: Interference and Diffraction.", significance: "Direct application of Class 11 Waves chapter.", topics: ["Huygens Principle", "YDSE", "Diffraction", "Polarization"], prereqs: ["p11_11"] },
        { id: "p12_08", title: "Modern Physics", class: 12, desc: "Dual Nature, Atoms, and Nuclei.", significance: "Highest ROI. Easy math, high marks.", topics: ["Photoelectric Effect", "Bohr Model", "Radioactivity", "Nuclear Fission/Fusion"], prereqs: ["p11_06", "p12_01"] },
        { id: "p12_09", title: "Semiconductors", class: 12, desc: "Electronic devices and Logic Gates.", significance: "Logic gates are a guaranteed question.", topics: ["PN Junction Diode", "Transistors", "Logic Gates", "Zener Diode"], prereqs: ["p12_02"] }
    ],
    chemistry: [
        { id: "c11_01", title: "Mole Concept", class: 11, desc: "Stoichiometry and basic calculations.", significance: "The alphabet of Chemistry. Used everywhere.", topics: ["Moles & Molar Mass", "Concentration Terms", "Limiting Reagent", "Stoichiometry"], prereqs: [] },
        { id: "c11_02", title: "Atomic Structure", class: 11, desc: "Quantum numbers and electronic configuration.", significance: "Basis for Periodicity and Bonding.", topics: ["Bohr Model", "Quantum Numbers", "Electronic Config", "Shape of Orbitals"], prereqs: ["c11_01"] },
        { id: "c11_03", title: "Periodic Table", class: 11, desc: "Trends in element properties.", significance: "Foundation of Inorganic Chemistry.", topics: ["Ionization Energy", "Atomic Radius", "Electron Gain Enthalpy", "Electronegativity"], prereqs: ["c11_02"] },
        { id: "c11_04", title: "Chemical Bonding", class: 11, desc: "How atoms form molecules.", significance: "MOST IMPORTANT CHAPTER. Controls Organic & Inorganic.", topics: ["VSEPR Theory", "Hybridization", "MOT", "Hydrogen Bonding"], prereqs: ["c11_03"] },
        { id: "c11_05", title: "States of Matter & Redox", class: 11, desc: "Gas laws and Oxidation numbers.", significance: "Gas laws used in Thermo. Redox used in Electrochemistry.", topics: ["Ideal Gas Equation", "Real Gases", "Oxidation States", "Balancing Redox"], prereqs: ["c11_01"] },
        { id: "c11_06", title: "Thermodynamics", class: 11, desc: "Energy changes in reactions.", significance: "Concepts of Entropy and Gibbs Free Energy govern spontaneity.", topics: ["Enthalpy", "Entropy", "Gibbs Energy", "Hess's Law"], prereqs: ["c11_01", "c11_05"] },
        { id: "c11_07", title: "Equilibrium", class: 11, desc: "Reversible reactions and pH.", significance: "Ionic Equilibrium is tough but critical for Electrochemistry.", topics: ["Le Chatelier Principle", "Kp/Kc", "pH Calculation", "Solubility Product"], prereqs: ["c11_01", "c11_06"] },
        { id: "c11_08", title: "GOC", class: 11, desc: "Mechanism basics of Organic Chemistry.", significance: "DO OR DIE. If you fail GOC, you fail 12th Organic.", topics: ["Inductive/Mesomeric Effect", "Resonance", "Carbocation Stability", "Isomerism"], prereqs: ["c11_04"] },
        { id: "c11_09", title: "Hydrocarbons", class: 11, desc: "Alkanes, Alkenes, Alkynes, Benzene.", significance: "Introduction to reaction mechanisms used in 12th.", topics: ["Markovnikov's Rule", "Ozonolysis", "Friedel Crafts Reaction", "Nitration"], prereqs: ["c11_08"] },
        { id: "c12_01", title: "Solutions", class: 12, desc: "Liquid solutions and Colligative properties.", significance: "Formula based, scoring.", topics: ["Raoult's Law", "Colligative Properties", "Van't Hoff Factor"], prereqs: ["c11_01", "c11_07"] },
        { id: "c12_02", title: "Electrochemistry", class: 12, desc: "Redox reactions and electricity.", significance: "High weightage Physical Chemistry chapter.", topics: ["Nernst Equation", "Conductance", "Batteries & Cells", "Faraday's Laws"], prereqs: ["c11_05", "c11_07", "c11_06"] },
        { id: "c12_03", title: "Chemical Kinetics", class: 12, desc: "Rate of reactions.", significance: "Easy to score.", topics: ["Rate Law & Order", "Integrated Rate Equations", "Arrhenius Equation"], prereqs: ["c11_01", "c11_07"] },
        { id: "c12_04", title: "Coordination Compounds", class: 12, desc: "Complex salts and ligands.", significance: "Major Inorganic chapter. Requires strong Bonding concepts.", topics: ["IUPAC Naming", "Werner's Theory", "VBT & CFT", "Isomerism"], prereqs: ["c11_04", "c11_05"] },
        { id: "c12_05", title: "Block Chemistry", class: 12, desc: "Properties of specific group elements.", significance: "Memory intensive. Pattern recognition needed.", topics: ["Group 15-18 Trends", "Transition Metals", "Lanthanoid Contraction"], prereqs: ["c11_03"] },
        { id: "c12_06", title: "Haloalkanes & Arenes", class: 12, desc: "Organic compounds with Halogens.", significance: "Entry to 12th Organic. SN1/SN2 mechanisms taught here.", topics: ["SN1 vs SN2", "Elimination Reactions", "Grignard Reagent", "Stereochemistry"], prereqs: ["c11_08", "c11_09"] },
        { id: "c12_07", title: "Alcohols, Phenols, Ethers", class: 12, desc: "Oxygen containing organic compounds.", significance: "Reaction heavy.", topics: ["Dehydration", "Reimer-Tiemann", "Ether Synthesis", "Acidity of Phenols"], prereqs: ["c12_06", "c11_08"] },
        { id: "c12_08", title: "Aldehydes, Ketones, Acids", class: 12, desc: "Carbonyl compounds.", significance: "The biggest Organic chapter. Name reactions galore.", topics: ["Aldol Condensation", "Cannizzaro Reaction", "Nucleophilic Addition", "Decarboxylation"], prereqs: ["c12_07", "c11_08"] },
        { id: "c12_09", title: "Amines & Biomolecules", class: 12, desc: "Nitrogen compounds and Life chemistry.", significance: "Biomolecules is free marks (easy memory).", topics: ["Basic Strength of Amines", "Hofmann Bromamide", "Carbohydrates", "Proteins"], prereqs: ["c12_08"] }
    ],
    maths: [
        { id: "m11_01", title: "Sets, Relations & Functions", class: 11, desc: "Basics of mathematical mapping.", significance: "Foundation for Calculus.", topics: ["Set Theory", "Domain & Range", "Types of Functions", "Inequalities"], prereqs: [] },
        { id: "m11_02", title: "Trigonometry", class: 11, desc: "Angles and ratios.", significance: "The oxygen of JEE Maths. Used in Calculus, Vectors, Complex Numbers.", topics: ["Compound Angles", "Trig Equations", "Solution of Triangles", "Multiple Angles"], prereqs: [] },
        { id: "m11_03", title: "Quadratic & Complex Numbers", class: 11, desc: "Polynomials and Imaginary numbers.", significance: "Algebra heavyweights.", topics: ["Roots & Coefficients", "Location of Roots", "Iota powers", "Cube root of unity"], prereqs: ["m11_01"] },
        { id: "m11_04", title: "Permutation & Combination", class: 11, desc: "Counting principles.", significance: "Requires pure logic. Prerequisite for Probability.", topics: ["Arrangements", "Selections", "Circular Permutation", "Distribution"], prereqs: [] },
        { id: "m11_05", title: "Binomial & Sequences", class: 11, desc: "Expansions and Series.", significance: "Series summation is used in Definite Integration.", topics: ["General Term", "Binomial Coefficients", "AP/GP/HP", "Special Series"], prereqs: [] },
        { id: "m11_06", title: "Coordinate Geometry", class: 11, desc: "Straight Lines & Circles.", significance: "Huge chunk of 11th Maths.", topics: ["Slope & Equations", "Distance Formula", "Family of Lines", "Tangents"], prereqs: ["m11_01", "m11_03"] },
        { id: "m11_07", title: "Conic Sections", class: 11, desc: "Parabola, Ellipse, Hyperbola.", significance: "Extension of Circles logic.", topics: ["Standard Equations", "Tangent/Normal conditions", "Parametric Coordinates"], prereqs: ["m11_06"] },
        { id: "m11_08", title: "Limits & Derivatives", class: 11, desc: "Intro to Calculus.", significance: "The bridge to Class 12 Calculus.", topics: ["L'Hopital Rule", "Standard Limits", "First Principle of Derivative"], prereqs: ["m11_02", "m11_01"] },
        { id: "m12_01", title: "Relations & Functions", class: 12, desc: "Advanced mapping properties.", significance: "First chapter of 12th. Essential for Inverse Trig.", topics: ["One-One/Onto", "Composite Functions", "Inverse Functions", "Modulus Graphs"], prereqs: ["m11_01", "m11_02"] },
        { id: "m12_02", title: "Inverse Trigonometry", class: 12, desc: "Trig functions in reverse.", significance: "Formulas used extensively in Differentiation/Integration.", topics: ["Principal Value", "Property conversions", "Simplification"], prereqs: ["m12_01", "m11_02"] },
        { id: "m12_03", title: "Matrices & Determinants", class: 12, desc: "Linear algebra arrays.", significance: "Independent, high scoring, easy.", topics: ["Matrix Multiplication", "Inverse & Adjoint", "Cramer's Rule", "Properties"], prereqs: [] },
        { id: "m12_04", title: "Continuity & Differentiability", class: 12, desc: "Calculus foundations.", significance: "Critical for the rest of Calculus.", topics: ["Continuity checks", "Differentiability at a point", "Chain Rule"], prereqs: ["m11_08", "m12_01"] },
        { id: "m12_05", title: "Applications of Derivatives", class: 12, desc: "Using slopes to analyze curves.", significance: "High weightage. Maxima/Minima is everywhere.", topics: ["Tangents/Normals", "Increasing/Decreasing", "Maxima/Minima", "Rate Measure"], prereqs: ["m12_04", "m11_06"] },
        { id: "m12_06", title: "Definite & Indefinite Integration", class: 12, desc: "Reverse differentiation and Area.", significance: "The hardest part of JEE Maths. Needs practice.", topics: ["Substitution", "By-Parts", "King's Property", "Area Under Curve"], prereqs: ["m12_04", "m11_02"] },
        { id: "m12_07", title: "Differential Equations", class: 12, desc: "Solving equations involving derivatives.", significance: "Guaranteed question. Methodical.", topics: ["Variable Separable", "Homogeneous Eq", "Linear DE"], prereqs: ["m12_06"] },
        { id: "m12_08", title: "Vectors & 3D Geometry", class: 12, desc: "Geometry in space.", significance: "Highest weightage in recent JEE Mains. Must do.", topics: ["Dot/Cross Product", "Scalar Triple Product", "Equation of Line/Plane", "Shortest Distance"], prereqs: ["m11_02"] },
        { id: "m12_09", title: "Probability", class: 12, desc: "Chance and Bayes Theorem.", significance: "Tricky but logical.", topics: ["Conditional Probability", "Bayes Theorem", "Bernoulli Trials"], prereqs: ["m11_04"] }
    ]
};

// --- 2. STATE MANAGEMENT ---
let currentSubject = 'physics';
let currentClassFilter = 'all';
let currentChapterId = null;

const themes = {
    physics: {
        btnOn: 'bg-white text-indigo-600 shadow-indigo-200 shadow-md', btnOff: 'text-zinc-600 hover:bg-white/50',
        gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        icon: '⚛️', cardAccent: '#4f46e5'
    },
    chemistry: {
        btnOn: 'bg-white text-teal-600 shadow-teal-200 shadow-md', btnOff: 'text-zinc-600 hover:bg-white/50',
        gradient: 'bg-gradient-to-br from-teal-500 to-emerald-600',
        icon: '🧪', cardAccent: '#0d9488'
    },
    maths: {
        btnOn: 'bg-white text-rose-600 shadow-rose-200 shadow-md', btnOff: 'text-zinc-600 hover:bg-white/50',
        gradient: 'bg-gradient-to-br from-rose-500 to-orange-500',
        icon: '📐', cardAccent: '#e11d48'
    }
};

// --- 3. DOM ELEMENTS ---
const chapterListEl = document.getElementById('chapter-list');
const detailPanel = document.getElementById('detail-panel');
const mobileOverlay = document.getElementById('mobile-detail-overlay');
const mobileContent = document.getElementById('mobile-detail-content');
const searchBox = document.getElementById('searchBox');

const emptyState = document.getElementById('empty-state');
const contentView = document.getElementById('content-view');

// --- 4. RENDER LOGIC ---
function init() {
    setSubject('physics');
    renderOverviewChart();
}

function setSubject(subj) {
    currentSubject = subj;

    ['physics', 'chemistry', 'maths'].forEach(s => {
        const btn = document.getElementById(`btn-${s}`);
        btn.className = `px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${s === subj ? themes[s].btnOn : themes[s].btnOff}`;
    });

    document.body.className = `h-screen flex flex-col overflow-hidden text-zinc-800 relative theme-${subj}`;
    renderChapterList();

    emptyState.classList.remove('hidden');
    contentView.classList.add('hidden');
    currentChapterId = null;
}

function filterClass(cls) {
    currentClassFilter = cls;
    const activeClass = 'flex-1 py-2 rounded-full bg-zinc-800 text-white font-semibold transition-all shadow-md';
    const inactiveClass = 'flex-1 py-2 rounded-full text-zinc-600 hover:bg-white/60 font-medium transition-all';

    document.getElementById('filter-all').className = cls === 'all' ? activeClass : inactiveClass;
    document.getElementById('filter-11').className = cls === 11 ? activeClass : inactiveClass;
    document.getElementById('filter-12').className = cls === 12 ? activeClass : inactiveClass;

    renderChapterList();
}

function renderChapterList() {
    const list = syllabusDB[currentSubject];
    const query = searchBox.value.toLowerCase();

    chapterListEl.innerHTML = '';

    const filtered = list.filter(ch => {
        const matchesClass = currentClassFilter === 'all' || ch.class === currentClassFilter;
        const matchesSearch = ch.title.toLowerCase().includes(query) || ch.desc.toLowerCase().includes(query);
        return matchesClass && matchesSearch;
    });

    if (filtered.length === 0) {
        chapterListEl.innerHTML = `<div class="p-6 text-center text-zinc-400 text-sm font-medium bg-white/40 rounded-3xl mx-2 border border-white/50">No systems match your scan.</div>`;
        return;
    }

    filtered.forEach(ch => {
        const el = document.createElement('div');
        const isActive = currentChapterId === ch.id;

        el.className = `chapter-card p-5 mb-3 bg-white/60 backdrop-blur-lg border border-white/50 cursor-pointer group ${isActive ? 'active' : ''}`;
        el.onclick = () => selectChapter(ch.id);

        const dotColor = ch.class === 11 ? 'bg-zinc-300' : 'bg-zinc-800';

        el.innerHTML = `
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-[10px] font-bold uppercase tracking-widest ${ch.class === 11 ? 'text-zinc-400' : 'text-zinc-800'} bg-zinc-100 px-2 py-1 rounded-full">Class ${ch.class}</span>
                        ${ch.prereqs.length > 0 ? `<div class="flex items-center gap-1 opacity-60"><div class="w-1.5 h-1.5 rounded-full ${dotColor}"></div><span class="text-[10px] text-zinc-400 font-medium">Linked</span></div>` : ''}
                    </div>
                    <h3 class="font-bold text-zinc-800 text-base leading-tight group-hover:text-zinc-900 transition-colors mb-1">${ch.title}</h3>
                    <p class="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-medium">${ch.desc}</p>
                `;
        chapterListEl.appendChild(el);
    });
}

function selectChapter(id) {
    currentChapterId = id;
    renderChapterList();

    let chapter = null;
    let subject = '';

    for (const s in syllabusDB) {
        const found = syllabusDB[s].find(c => c.id === id);
        if (found) { chapter = found; subject = s; break; }
    }
    if (!chapter) return;

    emptyState.classList.add('hidden');
    contentView.classList.remove('hidden');

    document.getElementById('detail-title').innerText = chapter.title;
    document.getElementById('detail-tagline').innerText = chapter.desc;
    document.getElementById('detail-class-badge').innerText = `Class ${chapter.class}`;
    document.getElementById('detail-subject-badge').innerText = subject.charAt(0).toUpperCase() + subject.slice(1);

    const hero = document.getElementById('hero-section');
    hero.className = `relative p-10 md:p-14 overflow-hidden rounded-b-[3rem] transition-colors duration-700 shadow-md ${themes[subject].gradient}`;
    document.getElementById('hero-icon').innerText = themes[subject].icon;

    document.getElementById('significance-text').innerText = chapter.significance;

    const topicList = document.getElementById('topic-list');
    topicList.innerHTML = chapter.topics.map(t =>
        `<li class="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-colors">
                    <div class="w-2 h-2 rounded-full bg-zinc-300"></div>
                    <span class="text-sm font-semibold text-zinc-700">${t}</span>
                </li>`
    ).join('');

    const prereqContainer = document.getElementById('prereq-container');
    if (chapter.prereqs.length === 0) {
        prereqContainer.innerHTML = `
                    <div class="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 text-center">
                        <span class="text-sm font-medium text-zinc-400">Independent Concept. Ready to start!</span>
                    </div>`;
    } else {
        prereqContainer.innerHTML = chapter.prereqs.map(pid => {
            const pChapter = syllabusDB[subject].find(c => c.id === pid);
            if (!pChapter) return '';
            return `
                        <div onclick="selectChapter('${pid}')" class="group flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-sm font-bold text-zinc-500 shadow-sm group-hover:text-indigo-600 transition-colors">
                                    ${pChapter.class}
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-zinc-800">${pChapter.title}</h4>
                                    <p class="text-[11px] text-zinc-500 font-medium mt-0.5">Required Knowledge</p>
                                </div>
                            </div>
                            <svg class="w-5 h-5 text-zinc-300 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    `;
        }).join('');
    }

    const unlocksContainer = document.getElementById('unlocks-container');
    const unlocks = syllabusDB[subject].filter(c => c.prereqs.includes(id));

    if (unlocks.length === 0) {
        unlocksContainer.innerHTML = `
                    <div class="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 text-center">
                        <span class="text-sm font-medium text-zinc-400">Terminal node or indirectly applied.</span>
                    </div>`;
    } else {
        unlocksContainer.innerHTML = unlocks.map(uChapter => `
                     <div onclick="selectChapter('${uChapter.id}')" class="group flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100/50 hover:bg-teal-50 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-white border border-teal-100 flex items-center justify-center text-sm shadow-sm group-hover:scale-110 transition-transform">
                                    🔓
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-zinc-800 group-hover:text-teal-800 transition-colors">${uChapter.title}</h4>
                                    <p class="text-[11px] text-teal-600/70 font-medium mt-0.5">Unlocks in Class ${uChapter.class}</p>
                                </div>
                            </div>
                            <svg class="w-5 h-5 text-teal-300 group-hover:text-teal-600 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                `).join('');
    }

    detailPanel.scrollTop = 0;
    if (window.innerWidth < 768) mobileContent.scrollTop = 0;

    if (window.innerWidth < 768) {
        mobileContent.innerHTML = '';
        const clone = contentView.cloneNode(true);
        clone.id = 'cloned-content-view';
        mobileContent.appendChild(clone);
        mobileOverlay.classList.remove('translate-x-full');
    }
}

function closeMobileDetail() {
    mobileOverlay.classList.add('translate-x-full');
    setTimeout(() => { mobileContent.innerHTML = ''; }, 500);
}

// --- 5. OVERVIEW CHART ---
function renderOverviewChart() {
    const ctx = document.getElementById('overviewChart').getContext('2d');

    const counts = { physics: 0, chemistry: 0, maths: 0 };
    const links = { physics: 0, chemistry: 0, maths: 0 };

    ['physics', 'chemistry', 'maths'].forEach(s => {
        counts[s] = syllabusDB[s].length;
        links[s] = syllabusDB[s].reduce((acc, c) => acc + c.prereqs.length, 0);
    });

    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#a1a1aa';

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Physics', 'Chemistry', 'Maths'],
            datasets: [
                {
                    label: 'Total Chapters',
                    data: [counts.physics, counts.chemistry, counts.maths],
                    backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(20, 184, 166, 0.8)', 'rgba(244, 63, 94, 0.8)'],
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.6
                },
                {
                    label: 'Inter-connections',
                    data: [links.physics, links.chemistry, links.maths],
                    backgroundColor: ['rgba(99, 102, 241, 0.2)', 'rgba(20, 184, 166, 0.2)', 'rgba(244, 63, 94, 0.2)'],
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.03)', drawBorder: false },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { usePointStyle: true, padding: 20, font: { weight: '500' } }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#18181b',
                    bodyColor: '#52525b',
                    borderColor: 'rgba(0,0,0,0.05)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: { size: 14, family: "'Plus Jakarta Sans', sans-serif" }
                }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });
}

// --- INIT ---
searchBox.addEventListener('input', renderChapterList);
init();