// --- GEMINI API CONFIG ---
const apiKey = "AIzaSyAnh8v0E0qY8z5ZPOD6Y1g5FIV_QEbUOUQ"; 

// --- DATA STORE ---
const syllabusData = {
    physics: {
        summary: "Physics requires the strongest continuity. Mechanics concepts (Force, Work, Energy) are the alphabet of 12th Physics.",
        dependencyData: [70, 20, 10], 
        chapters: [
            {
                name: "Electrostatics",
                desc: "Electric charges and fields, Potential",
                prereqs: [
                    { name: "Vectors", importance: "Critical", reason: "Field calculations require vector addition & resolution." },
                    { name: "Work, Power & Energy", importance: "Critical", reason: "Electric Potential Energy is analogous to Gravitational PE." },
                    { name: "Newton's Laws of Motion", importance: "High", reason: "Equilibrium problems involving charges." }
                ]
            },
            {
                name: "Current Electricity",
                desc: "Ohm's law, Circuits, Cells",
                prereqs: [
                    { name: "Basic Kinematics", importance: "Medium", reason: "Drift velocity concepts." },
                    { name: "Work, Power & Energy", importance: "High", reason: "Heat dissipation and power calculations." }
                ]
            },
            {
                name: "Magnetism & Matter",
                desc: "Magnetic effects of current",
                prereqs: [
                    { name: "Vectors", importance: "Critical", reason: "Cross products (Biot-Savart Law, Lorentz Force)." },
                    { name: "Circular Motion", importance: "High", reason: "Motion of charged particles in magnetic fields." }
                ]
            },
            {
                name: "Alternating Current (AC)",
                desc: "LCR circuits, Resonance",
                prereqs: [
                    { name: "Simple Harmonic Motion (SHM)", importance: "Critical", reason: "AC equations are sinusoidal, same math as SHM." },
                    { name: "Waves", importance: "Medium", reason: "Phase difference concepts." }
                ]
            },
            {
                name: "Optics (Ray & Wave)",
                desc: "Reflection, Refraction, Interference",
                prereqs: [
                    { name: "Waves", importance: "Critical", reason: "Wave Optics is a direct extension of 11th Waves." },
                    { name: "Basic Geometry", importance: "Medium", reason: "Ray diagrams require geometry." }
                ]
            },
            {
                name: "Modern Physics",
                desc: "Atoms, Nuclei, Dual Nature",
                prereqs: [
                    { name: "Work, Power & Energy", importance: "High", reason: "Energy levels and transitions." },
                    { name: "Chemistry Structure of Atom", importance: "High", reason: "Heavy overlap with 11th Chemistry." }
                ]
            }
        ],
        class11: [
            { id: "p1", name: "Vectors", impact: 25 },
            { id: "p2", name: "Units & Dimensions", impact: 5 },
            { id: "p3", name: "Kinematics 1D/2D", impact: 10 },
            { id: "p4", name: "Newton's Laws (NLM)", impact: 15 },
            { id: "p5", name: "Work, Power, Energy", impact: 20 },
            { id: "p6", name: "Rotational Motion", impact: 10 }, 
            { id: "p7", name: "Gravitation", impact: 15 }, 
            { id: "p8", name: "SHM", impact: 12 },
            { id: "p9", name: "Waves", impact: 12 },
            { id: "p10", name: "Thermodynamics", impact: 5 }
        ]
    },
    chemistry: {
        summary: "Organic Chemistry is a chain; if you break 11th GOC, 12th Organic collapses. Inorganic relies on Bonding.",
        dependencyData: [60, 30, 10],
        chapters: [
            {
                name: "Solutions",
                desc: "Colligative properties, Concentration",
                prereqs: [
                    { name: "Mole Concept", importance: "Critical", reason: "Molarity, Molality calculations." },
                    { name: "States of Matter", importance: "Medium", reason: "Gas laws and vapor pressure." }
                ]
            },
            {
                name: "Electrochemistry",
                desc: "Cells, Nernst Equation",
                prereqs: [
                    { name: "Redox Reactions", importance: "Critical", reason: "Balancing equations and oxidation states." },
                    { name: "Equilibrium", importance: "High", reason: "Ionic equilibrium concepts used in Nernst equation." },
                    { name: "Thermodynamics", importance: "Medium", reason: "Gibbs Free Energy." }
                ]
            },
            {
                name: "Chemical Kinetics",
                desc: "Rate of reaction",
                prereqs: [
                    { name: "Equilibrium", importance: "High", reason: "Law of Mass Action." },
                    { name: "Mole Concept", importance: "High", reason: "Concentration terms." }
                ]
            },
            {
                name: "Organic Chemistry",
                desc: "The major chunk of Class 12",
                prereqs: [
                    { name: "GOC (General Organic Chem)", importance: "Critical", reason: "Inductive effect, Resonance, Hybridization are mandatory." },
                    { name: "Hydrocarbons", importance: "Critical", reason: "Reaction mechanisms foundation." }
                ]
            },
            {
                name: "Inorganic (P, D, F Blocks)",
                desc: "Periodic properties",
                prereqs: [
                    { name: "Chemical Bonding", importance: "Critical", reason: "Structures, Hybridization, Bond angles." },
                    { name: "Periodic Table", importance: "Critical", reason: "Trends in atomic size, ionization energy." }
                ]
            }
        ],
        class11: [
            { id: "c1", name: "Mole Concept", impact: 18 },
            { id: "c2", name: "Structure of Atom", impact: 12 },
            { id: "c3", name: "Periodic Classification", impact: 15 },
            { id: "c4", name: "Chemical Bonding", impact: 25 },
            { id: "c5", name: "Thermodynamics", impact: 8 },
            { id: "c6", name: "Equilibrium", impact: 12 },
            { id: "c7", name: "Redox Reactions", impact: 10 },
            { id: "c8", name: "GOC (General Organic)", impact: 30 },
            { id: "c9", name: "Hydrocarbons", impact: 20 }
        ]
    },
    maths: {
        summary: "Calculus dominates Class 12 (approx 40-50%). It is built entirely on Class 11 Functions, Limits, and Trigonometry.",
        dependencyData: [80, 15, 5],
        chapters: [
            {
                name: "Relations & Functions",
                desc: "Types of relations, Inverse functions",
                prereqs: [
                    { name: "Sets, Relations & Functions (11th)", importance: "Critical", reason: "Direct continuation of the topic." },
                    { name: "Basic Inequalities", importance: "High", reason: "Finding domain and range." }
                ]
            },
            {
                name: "Calculus (Continuity, Differentiability)",
                desc: "The start of Calculus",
                prereqs: [
                    { name: "Limits & Derivatives (11th)", importance: "Critical", reason: "Foundation of all calculus." },
                    { name: "Trigonometry", importance: "Critical", reason: "Formulas used in simplification before differentiating." }
                ]
            },
            {
                name: "Integrals & Differential Equations",
                desc: "Advanced Calculus",
                prereqs: [
                    { name: "Differentiation", importance: "Critical", reason: "Integration is reverse differentiation." },
                    { name: "Trigonometric Formulas", importance: "Critical", reason: "Essential for solving integrals." },
                    { name: "Coordinate Geometry", importance: "Medium", reason: "Area under curves requires graphing knowledge." }
                ]
            },
            {
                name: "Vectors & 3D Geometry",
                desc: "Spatial geometry",
                prereqs: [
                    { name: "Coordinate Geometry (2D)", importance: "Medium", reason: "Analogy to 2D formulas." },
                    { name: "Physics Vectors", importance: "High", reason: "Strong overlap helps understanding." }
                ]
            },
            {
                name: "Probability",
                desc: "Bayes theorem, Distributions",
                prereqs: [
                    { name: "Permutations & Combinations", importance: "High", reason: "Counting principles are essential." },
                    { name: "Probability (11th)", importance: "Medium", reason: "Basic axioms." }
                ]
            }
        ],
        class11: [
            { id: "m1", name: "Sets, Relations, Functions", impact: 25 },
            { id: "m2", name: "Trigonometry", impact: 20 },
            { id: "m3", name: "Quadratic Equations", impact: 5 },
            { id: "m4", name: "Permutations & Combinations", impact: 10 },
            { id: "m5", name: "Binomial Theorem", impact: 5 },
            { id: "m6", name: "Sequence & Series", impact: 5 },
            { id: "m7", name: "Straight Lines & Conics", impact: 10 },
            { id: "m8", name: "Limits & Derivatives", impact: 25 },
            { id: "m9", name: "Statistics", impact: 2 }
        ]
    }
};

// --- GLOBAL STATE ---
let currentSubject = 'physics';
let currentSimSubject = 'physics';
let dependencyChartInstance = null;
let riskChartInstance = null;
let selectedWeakTopics = new Set();

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderSubjectData(currentSubject);
    initSimCheckboxes(currentSimSubject);
    initRiskChart();
});

// --- GEMINI HELPER FUNCTIONS ---

async function callGemini(prompt) {
    if (!apiKey) {
        return "Error: API Key is missing.";
    }

    try {
        const maxRetries = 3;
        let delay = 1000;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const result = await response.json();
                return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
                
            } catch (e) {
                if (i === maxRetries - 1) throw e;
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;
            }
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I couldn't generate a response. Please try again later.";
    }
}

function showModal(title, content) {
    document.getElementById('modal-title').innerHTML = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('ai-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('ai-modal').classList.add('hidden');
}

function showLoading(context) {
    return `
        <div class="flex flex-col items-center justify-center py-12">
            <div class="loader-ring mb-4"><div></div><div></div><div></div><div></div></div>
            <p class="text-stone-500 font-medium animate-pulse">${context}</p>
        </div>
    `;
}

// --- NEW HELPER: Robust Markdown Table Converter ---
function convertMarkdownToTable(text) {
    // 1. Clean code blocks
    let cleanText = text.replace(/```markdown/g, '').replace(/```html/g, '').replace(/```/g, '').trim();

    // 2. Find the start of the table (looks for line starting with |)
    const tableStartIndex = cleanText.indexOf('|');
    if (tableStartIndex === -1) return text; // No table found

    // Extract just the table part (in case there is intro text)
    const tableText = cleanText.substring(tableStartIndex);
    const rows = tableText.split('\n').filter(row => row.trim().startsWith('|'));

    if (rows.length < 3) return text; // Not a valid table

    // 3. Build HTML
    let html = '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-stone-200 border border-stone-200 mb-4">';
    
    // Header
    const headers = rows[0].split('|').filter(cell => cell.trim() !== '');
    html += '<thead class="bg-stone-100"><tr>';
    headers.forEach(header => {
        html += `<th class="px-3 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">${header.trim()}</th>`;
    });
    html += '</tr></thead><tbody class="bg-white divide-y divide-stone-200">';

    // Body (Skip separator row |---|)
    for (let i = 2; i < rows.length; i++) {
        const cells = rows[i].split('|').filter(cell => cell.trim() !== '');
        if (cells.length === 0) continue;
        html += '<tr>';
        cells.forEach(cell => {
            html += `<td class="px-3 py-2 whitespace-normal text-sm text-stone-600 border-b border-stone-100">${cell.trim()}</td>`;
        });
        html += '</tr>';
    }
    html += '</tbody></table></div>';

    // Preserve intro text if it exists
    const intro = cleanText.substring(0, tableStartIndex).trim();
    if (intro) {
        return `<p class="mb-4 text-stone-700">${intro}</p>` + html;
    }

    return html;
}

function formatAIResponse(text) {
    // 1. Convert any Markdown tables to HTML tables first
    let processedText = convertMarkdownToTable(text);
    
    // 2. Simple Formatting for remaining markdown
    return processedText
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-teal-800">$1</strong>') // Bold
        .replace(/^\* (.*?)$/gm, '<li class="ml-4 mb-2">$1</li>') // List items
        .replace(/\n\n/g, '<br><br>') // Paragraphs
        .replace(/\n/g, '<br>'); // Line breaks
}

// Function to render math using KaTeX
function renderMath(elementId) {
    const element = document.getElementById(elementId);
    if (window.renderMathInElement) {
        renderMathInElement(element, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
    }
}

// --- AI FEATURES IMPLEMENTATION ---

async function explainConnection(chapterName, prereqs) {
    showModal(`<span class="text-2xl">✨</span> Connection Explained`, showLoading("Analyzing syllabus links..."));
    
    // UPDATED PROMPT
    const prompt = `
        I am a JEE student. Explain the conceptual connection between Class 12 topic "${chapterName}" and its Class 11 prerequisites: ${prereqs}.
        
        **Instructions:**
        1. Keep it concise (under 150 words).
        2. Highlight key terms with **bold**.
        3. Use LaTeX delimiters $...$ for inline math.
    `;
    
    const response = await callGemini(prompt);
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = formatAIResponse(response);
    renderMath('modal-content');
}

async function generateRecoveryPlan() {
    if (selectedWeakTopics.size === 0) {
        showModal("Wait!", "Please select at least one weak topic in the simulator to generate a plan.");
        return;
    }

    showModal(`<span class="text-2xl">✨</span> Recovery Plan`, showLoading("Designing your bridge course..."));

    // Gather topic names
    const weakTopicNames = [];
    syllabusData[currentSimSubject].class11.forEach(t => {
        if (selectedWeakTopics.has(t.id)) weakTopicNames.push(t.name);
    });

    // UPDATED PROMPT: Request Markdown Table (which we now convert perfectly)
    const prompt = `
        I am moving to Class 12. I am weak in these Class 11 ${currentSimSubject} topics: ${weakTopicNames.join(', ')}.
        
        Generate a structured "Bridge Course" plan (20 days).
        
        **CRITICAL INSTRUCTIONS:**
        1. **Output a Markdown Table**.
        2. Columns: **Days**, **Topic**, **Strategy**, **Math/Formula Focus**.
        3. Use LaTeX $...$ for math.
    `;

    const response = await callGemini(prompt);
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = formatAIResponse(response);
    renderMath('modal-content');
}

// --- SECTION 1 LOGIC: SUBJECT EXPLORER ---

function switchTab(subject) {
    currentSubject = subject;
    ['physics', 'chemistry', 'maths'].forEach(s => {
        const btn = document.getElementById(`tab-${s}`);
        if (s === subject) {
            btn.className = "tab-active px-6 py-3 text-sm md:text-base transition-colors focus:outline-none";
        } else {
            btn.className = "tab-inactive px-6 py-3 text-sm md:text-base transition-colors focus:outline-none";
        }
    });
    renderSubjectData(subject);
}

function renderSubjectData(subject) {
    const data = syllabusData[subject];
    document.getElementById('analyst-note').innerText = data.summary;
    renderDependencyChart(data.dependencyData);

    const listContainer = document.getElementById('chapter-list');
    listContainer.innerHTML = '';

    data.chapters.forEach((chapter, index) => {
        const row = document.createElement('div');
        row.className = "group cursor-pointer transition-colors hover:bg-stone-50";
        row.onclick = (e) => {
            if(!e.target.closest('button')) toggleRow(index);
        };

        // --- BUG FIX FOR ELECTROSTATICS BUTTON ---
        // We must 'escape' the single quotes in names (e.g., "Newton's")
        const safeChapterName = chapter.name.replace(/'/g, "\\'");
        const safePrereqNames = chapter.prereqs.map(p => p.name).join(', ').replace(/'/g, "\\'");
        // -----------------------------------------

        row.innerHTML = `
            <div class="px-6 py-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-bold text-stone-800 group-hover:text-teal-700">${chapter.name}</h4>
                        <p class="text-xs text-stone-500 mt-1">${chapter.desc}</p>
                    </div>
                    <div class="transform transition-transform duration-200" id="icon-${index}">
                        <svg class="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                <div id="details-${index}" class="hidden mt-4 pl-4 border-l-2 border-teal-200 space-y-3">
                    <div class="text-xs font-semibold text-stone-400 uppercase tracking-wide">Requires Class 11 Concepts:</div>
                    ${chapter.prereqs.map(p => `
                        <div class="bg-white p-3 rounded border border-stone-200 shadow-sm">
                            <div class="flex justify-between items-start">
                                <span class="font-medium text-stone-700 text-sm">${p.name}</span>
                                <span class="text-[10px] px-1.5 py-0.5 rounded ${p.importance === 'Critical' ? 'bg-rose-100 text-rose-700' : p.importance === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}">${p.importance}</span>
                            </div>
                            <p class="text-xs text-stone-500 mt-1">${p.reason}</p>
                        </div>
                    `).join('')}
                    
                    <div class="pt-2">
                        <!-- Used safe variables here -->
                        <button onclick="explainConnection('${safeChapterName}', '${safePrereqNames}')" class="text-xs flex items-center gap-1 text-teal-600 font-medium hover:text-teal-800 transition">
                            <span>✨</span> Explain conceptual link with AI
                        </button>
                    </div>
                </div>
            </div>
        `;
        listContainer.appendChild(row);
    });
}

function toggleRow(index) {
    const details = document.getElementById(`details-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        details.classList.add('animate-fade-in');
        icon.classList.add('rotate-180');
    } else {
        details.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

function renderDependencyChart(dataValues) {
    const ctx = document.getElementById('dependencyChart').getContext('2d');
    if (dependencyChartInstance) dependencyChartInstance.destroy();

    dependencyChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Dependency', 'Medium Dependency', 'Independent'],
            datasets: [{
                data: dataValues,
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { family: "'Inter', sans-serif", size: 12 } } },
                tooltip: { backgroundColor: '#292524', titleFont: { family: 'Inter' }, bodyFont: { family: 'Inter' }, padding: 10 }
            },
            cutout: '65%'
        }
    });
}

// --- SECTION 2 LOGIC: SIMULATOR ---

function setSimSubject(subject) {
    currentSimSubject = subject;
    document.getElementById('sim-subject-title').innerText = `Select Weak ${subject.charAt(0).toUpperCase() + subject.slice(1)} Topics`;
    initSimCheckboxes(subject);
    selectedWeakTopics.clear();
    calculateTotalRisk();
}

function initSimCheckboxes(subject) {
    const container = document.getElementById('sim-checkboxes');
    container.innerHTML = '';
    const topics = syllabusData[subject].class11;
    
    topics.forEach(topic => {
        const div = document.createElement('div');
        div.className = "flex items-center p-2 rounded hover:bg-stone-700 transition";
        const isChecked = selectedWeakTopics.has(topic.id) ? 'checked' : '';
        div.innerHTML = `
            <input type="checkbox" id="${topic.id}" value="${topic.impact}" class="w-4 h-4 text-teal-600 rounded border-stone-500 focus:ring-teal-500 bg-stone-700" onchange="updateRisk('${topic.id}')" ${isChecked}>
            <label for="${topic.id}" class="ml-3 text-sm font-medium text-stone-300 cursor-pointer select-none flex-grow">${topic.name}</label>
        `;
        container.appendChild(div);
    });
}

function updateRisk(topicId) {
    if (selectedWeakTopics.has(topicId)) selectedWeakTopics.delete(topicId);
    else selectedWeakTopics.add(topicId);
    calculateTotalRisk();
}

function calculateTotalRisk() {
    const currentTopics = syllabusData[currentSimSubject].class11;
    let currentSubjectRisk = 0;
    currentTopics.forEach(t => {
        if (selectedWeakTopics.has(t.id)) currentSubjectRisk += t.impact;
    });
    let riskPercentage = Math.min(100, currentSubjectRisk);
    updateRiskVisuals(riskPercentage);
}

function updateRiskVisuals(percentage) {
    const scoreEl = document.getElementById('risk-score');
    scoreEl.innerText = `${percentage}%`;
    
    if (percentage < 30) scoreEl.className = "text-4xl font-bold text-emerald-400 transition-colors duration-500";
    else if (percentage < 60) scoreEl.className = "text-4xl font-bold text-yellow-400 transition-colors duration-500";
    else scoreEl.className = "text-4xl font-bold text-rose-500 transition-colors duration-500";

    riskChartInstance.data.datasets[0].data = [percentage, 100 - percentage];
    riskChartInstance.data.datasets[0].backgroundColor = [
        percentage > 60 ? '#f43f5e' : (percentage > 30 ? '#facc15' : '#34d399'), 
        '#44403c'
    ];
    riskChartInstance.update();
}

function initRiskChart() {
    const ctx = document.getElementById('riskChart').getContext('2d');
    riskChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['At Risk', 'Safe'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#34d399', '#44403c'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            cutout: '80%'
        }
    });
}

function resetSimulator() {
    selectedWeakTopics.clear();
    document.querySelectorAll('#sim-checkboxes input').forEach(cb => cb.checked = false);
    calculateTotalRisk();
}