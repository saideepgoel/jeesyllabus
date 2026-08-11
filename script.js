/* =========================================================================
   JEE SYLLABUS — THE CHAPTER MAP
   Data model: each chapter has an id, class (11/12), title, tagline,
   prerequisite / next-step chapter ids, and a tiered topic list:
     topics.ncert    — the NCERT textbook core
     topics.main     — extra ground JEE Main adds on top of NCERT
     topics.advanced — extra ground JEE Advanced adds on top of Main
   notInAdvanced: true marks chapters JEE Advanced has historically
   dropped from its syllabus altogether (still asked in Main / boards).
   ========================================================================= */

const SYLLABUS = {

  physics: {
    label: "Physics",
    glyph: "⚡",
    11: [
      { id:"p-units", title:"Units and Measurements", tagline:"The language every physical law is written in.",
        prereq: [], next: ["p-kinematics"],
        topics: {
          ncert: ["Physical quantities & SI units","Dimensional analysis & dimensional formulae","Errors in measurement","Significant figures","Vernier calipers & screw gauge"],
          main: ["Order of magnitude & precision estimates"],
          advanced: ["Propagation of combined errors in derived quantities"] } },
      { id:"p-kinematics", title:"Kinematics", tagline:"Describing motion before explaining it.",
        prereq: ["p-units"], next: ["p-laws-motion"],
        topics: {
          ncert: ["Distance vs displacement","Position-time & velocity-time graphs","Equations of uniformly accelerated motion","Relative velocity","Projectile motion","Uniform circular motion"],
          main: ["River-boat & rain-man relative motion"],
          advanced: ["Calculus-based variable-acceleration problems"] } },
      { id:"p-laws-motion", title:"Laws of Motion", tagline:"Why things move the way they do.",
        prereq: ["p-kinematics"], next: ["p-work-energy","p-gravitation"],
        topics: {
          ncert: ["Newton's three laws","Momentum & impulse","Static and kinetic friction","Circular motion dynamics & banking","Pseudo forces","Connected bodies & pulley systems"],
          main: ["Motion on wedges & inclined-plane systems"],
          advanced: ["Non-inertial frame analysis","Variable-mass systems (rocket propulsion)"] } },
      { id:"p-work-energy", title:"Work, Energy and Power", tagline:"Motion, measured in a currency that's always conserved.",
        prereq: ["p-laws-motion"], next: ["p-rotation"],
        topics: {
          ncert: ["Work done by a variable force","Kinetic & potential energy","Work-energy theorem","Conservation of mechanical energy","Elastic & inelastic collisions","Power"],
          main: ["Oblique (2D) collisions"],
          advanced: ["Centre-of-mass frame collision analysis"] } },
      { id:"p-rotation", title:"System of Particles and Rotational Motion", tagline:"Every rigid body is secretly a system of points.",
        prereq: ["p-work-energy"], next: ["p-gravitation"],
        topics: {
          ncert: ["Centre of mass","Torque & angular momentum","Moment of inertia & theorems","Rolling motion","Conservation of angular momentum"],
          main: ["Combined translational + rotational motion"],
          advanced: ["Instantaneous axis of rotation","Angular impulse-momentum theorem"] } },
      { id:"p-gravitation", title:"Gravitation", tagline:"The force that built the solar system.",
        prereq: ["p-laws-motion","p-rotation"], next: ["p-fluids"],
        topics: {
          ncert: ["Newton's law of gravitation","Kepler's laws of planetary motion","Gravitational potential & potential energy","Escape velocity","Orbital velocity & satellites"],
          main: ["Variation of g with height, depth & rotation"],
          advanced: ["Binary star systems & orbital energy problems"] } },
      { id:"p-solids", title:"Mechanical Properties of Solids", tagline:"How far a material bends before it breaks.",
        prereq: ["p-laws-motion"], next: ["p-fluids"],
        topics: {
          ncert: ["Stress and strain","Hooke's law","Young's, bulk & shear modulus","Elastic potential energy","Stress-strain curve"],
          main: ["Poisson's ratio"],
          advanced: ["Thermal stress in composite rods"] } },
      { id:"p-fluids", title:"Mechanical Properties of Fluids", tagline:"Solids that flow follow their own rules.",
        prereq: ["p-solids","p-gravitation"], next: ["p-thermal"],
        topics: {
          ncert: ["Pressure & Pascal's law","Archimedes' principle & buoyancy","Equation of continuity","Bernoulli's theorem","Viscosity & Stokes' law","Surface tension & capillarity"],
          main: ["Venturimeter & flow-rate applications"],
          advanced: ["Terminal velocity derivations in viscous flow"] } },
      { id:"p-thermal", title:"Thermal Properties of Matter", tagline:"Temperature is where mechanics meets heat.",
        prereq: ["p-fluids"], next: ["p-thermo11"],
        topics: {
          ncert: ["Temperature scales","Thermal expansion","Specific & latent heat, calorimetry","Conduction, convection & radiation","Newton's law of cooling"],
          main: ["Thermal conductivity problems"],
          advanced: ["Combined conduction-convection-radiation systems"] } },
      { id:"p-thermo11", title:"Thermodynamics", tagline:"The rules that govern every engine ever built.",
        prereq: ["p-thermal"], next: ["p-kinetic"],
        topics: {
          ncert: ["Thermodynamic state & variables","Zeroth & first law of thermodynamics","Isothermal & adiabatic processes","Second law of thermodynamics","Heat engines & refrigerators"],
          main: ["Work done in cyclic processes"],
          advanced: ["Carnot cycle efficiency derivations","Entropy change in irreversible processes"] } },
      { id:"p-kinetic", title:"Kinetic Theory of Gases", tagline:"Temperature and pressure, explained by chaos.",
        prereq: ["p-thermo11"], next: ["p-oscillations"],
        topics: {
          ncert: ["Postulates of kinetic theory","Pressure of an ideal gas","Kinetic interpretation of temperature","Degrees of freedom & law of equipartition","Mean free path"],
          main: ["Specific heat ratios from degrees of freedom"],
          advanced: ["Maxwell-Boltzmann speed distribution (qualitative)"] } },
      { id:"p-oscillations", title:"Oscillations", tagline:"Every wave starts as something wobbling in place.",
        prereq: ["p-rotation","p-kinetic"], next: ["p-waves"],
        topics: {
          ncert: ["Simple harmonic motion","Energy in SHM","Simple pendulum & spring-mass system","Damped & forced oscillations","Resonance"],
          main: ["SHM in electrical & fluid analogues"],
          advanced: ["Coupled oscillators (conceptual)"] } },
      { id:"p-waves", title:"Waves", tagline:"Oscillations that learned to travel.",
        prereq: ["p-oscillations"], next: ["p-electric-fields","p-ray-optics"],
        topics: {
          ncert: ["Transverse & longitudinal waves","Progressive wave equation","Superposition & standing waves","Beats","Doppler effect"],
          main: ["Waves on strings — reflection at boundaries"],
          advanced: ["Doppler effect with a moving medium"] } },
    ],
    12: [
      { id:"p-electric-fields", title:"Electric Charges and Fields", tagline:"Where electromagnetism begins: a charge at rest.",
        prereq: ["p-waves"], next: ["p-potential"],
        topics: {
          ncert: ["Coulomb's law","Electric field & field lines","Electric dipole","Gauss's law","Continuous charge distributions"],
          main: ["Electric field due to charged sheets & shells"],
          advanced: ["Gauss's law in non-symmetric charge distributions"] } },
      { id:"p-potential", title:"Electrostatic Potential and Capacitance", tagline:"Storing electrical energy in empty space.",
        prereq: ["p-electric-fields"], next: ["p-current"],
        topics: {
          ncert: ["Electric potential & potential energy","Equipotential surfaces","Capacitors & capacitance","Series & parallel combinations","Energy stored in a capacitor","Dielectrics"],
          main: ["Van de Graaff generator (qualitative)"],
          advanced: ["Energy density in the electric field","Force between capacitor plates"] } },
      { id:"p-current", title:"Current Electricity", tagline:"Charge, finally allowed to move.",
        prereq: ["p-potential"], next: ["p-moving-charges"],
        topics: {
          ncert: ["Ohm's law & resistivity","Drift velocity","Series & parallel resistors","Kirchhoff's laws","Wheatstone bridge & meter bridge","EMF & internal resistance"],
          main: ["Potentiometer applications"],
          advanced: ["Non-linear & multi-loop resistive circuits"] } },
      { id:"p-moving-charges", title:"Moving Charges and Magnetism", tagline:"A moving charge is a magnet in disguise.",
        prereq: ["p-current"], next: ["p-magnetism-matter"],
        topics: {
          ncert: ["Magnetic force on a charge & a wire","Biot–Savart law","Ampere's circuital law","Force between parallel currents","Moving coil galvanometer"],
          main: ["Cyclotron working"],
          advanced: ["Velocity selector & mass spectrometer problems"] } },
      { id:"p-magnetism-matter", title:"Magnetism and Matter", tagline:"The Earth, seen as one giant bar magnet.",
        prereq: ["p-moving-charges"], next: ["p-emi"],
        topics: {
          ncert: ["Bar magnet as a dipole","Earth's magnetism","Magnetic field lines","Diamagnetism, paramagnetism, ferromagnetism"],
          main: ["Hysteresis loop (qualitative)"],
          advanced: ["Magnetic dipole in a non-uniform field"] } },
      { id:"p-emi", title:"Electromagnetic Induction", tagline:"Every generator on Earth runs on this chapter.",
        prereq: ["p-magnetism-matter"], next: ["p-ac"],
        topics: {
          ncert: ["Faraday's & Lenz's laws","Motional EMF","Self-inductance & mutual inductance","Eddy currents"],
          main: ["AC generator working principle"],
          advanced: ["Motional EMF in rotating rods & loops"] } },
      { id:"p-ac", title:"Alternating Current", tagline:"Induction, once it starts oscillating.",
        prereq: ["p-emi"], next: ["p-em-waves"],
        topics: {
          ncert: ["AC voltage & current, phasors","Reactance & impedance in LCR circuits","Resonance & Q-factor","Power in AC circuits","Transformers"],
          main: ["Wattless (idle) current"],
          advanced: ["LC oscillations & analogy with SHM"] } },
      { id:"p-em-waves", title:"Electromagnetic Waves", tagline:"Maxwell's proof that light is electric and magnetic.",
        prereq: ["p-ac"], next: ["p-ray-optics"],
        topics: {
          ncert: ["Displacement current","Properties of electromagnetic waves","The electromagnetic spectrum","Applications of EM waves"],
          main: ["Poynting vector (qualitative)"],
          advanced: [] } },
      { id:"p-ray-optics", title:"Ray Optics and Optical Instruments", tagline:"Light, treated as a ray that travels in straight lines.",
        prereq: ["p-waves","p-em-waves"], next: ["p-wave-optics"],
        topics: {
          ncert: ["Reflection at spherical mirrors","Refraction & total internal reflection","Lens formula, magnification & power","Refraction through a prism","Microscopes & telescopes"],
          main: ["Optical fibre (qualitative)"],
          advanced: ["Combination of lenses & mirrors, silvered-lens problems"] } },
      { id:"p-wave-optics", title:"Wave Optics", tagline:"Light, treated as a wave that interferes.",
        prereq: ["p-ray-optics"], next: ["p-dual-nature"],
        topics: {
          ncert: ["Huygens' principle","Young's double-slit interference","Diffraction at a single slit","Polarization"],
          main: ["Fresnel distance"],
          advanced: ["Diffraction-grating analysis"] } },
      { id:"p-dual-nature", title:"Dual Nature of Radiation and Matter", tagline:"Light acts like a particle. Particles act like waves.",
        prereq: ["p-wave-optics"], next: ["p-atoms"],
        topics: {
          ncert: ["Photoelectric effect","Einstein's photoelectric equation","Photon energy & momentum","de Broglie wavelength of matter"],
          main: ["Davisson–Germer experiment"],
          advanced: [] } },
      { id:"p-atoms", title:"Atoms", tagline:"The dual nature of matter, applied to the atom itself.",
        prereq: ["p-dual-nature"], next: ["p-nuclei"],
        topics: {
          ncert: ["Rutherford's nuclear model","Bohr's model of the hydrogen atom","Atomic energy levels","Hydrogen emission spectrum"],
          main: ["Numerical problems on spectral series (Lyman, Balmer …)"],
          advanced: [] } },
      { id:"p-nuclei", title:"Nuclei", tagline:"What's inside the tiny core Rutherford found.",
        prereq: ["p-atoms"], next: ["p-semiconductors"],
        topics: {
          ncert: ["Nuclear size, composition & density","Mass defect & binding energy","Radioactivity & decay laws","Nuclear fission & fusion"],
          main: ["Nuclear reactors (qualitative)"],
          advanced: ["Radioactive decay chains & series"] } },
      { id:"p-semiconductors", title:"Semiconductor Electronics", tagline:"How a crystal of silicon learned to switch.",
        prereq: ["p-nuclei"], next: [],
        topics: {
          ncert: ["Energy bands in solids","p-n junction diode & rectification","Zener diode & LEDs","Transistors & amplification","Logic gates"],
          main: ["Logic-gate truth tables & combinations"],
          advanced: [] } },
    ],
  },

  chemistry: {
    label: "Chemistry",
    glyph: "⚗",
    11: [
      { id:"c-basic-concepts", title:"Some Basic Concepts of Chemistry", tagline:"The mole, and everything that's counted with it.",
        prereq: [], next: ["c-atomic-structure"],
        topics: {
          ncert: ["Laws of chemical combination","Mole concept & molar mass","Stoichiometry & limiting reagent","Empirical & molecular formulae","Concentration terms (molarity, molality)"],
          main: ["Percentage composition & purity calculations"],
          advanced: ["Multi-step stoichiometry with impurities & yield"] } },
      { id:"c-atomic-structure", title:"Structure of Atom", tagline:"Chemistry starts by opening the atom up.",
        prereq: ["c-basic-concepts"], next: ["c-periodicity"],
        topics: {
          ncert: ["Atomic models (Thomson, Rutherford, Bohr)","Quantum numbers","Electronic configuration","Aufbau, Pauli & Hund's rules","de Broglie equation & Heisenberg uncertainty"],
          main: ["Photoelectric effect link to atomic structure"],
          advanced: ["Numerical problems on quantum numbers & orbital shapes"] } },
      { id:"c-periodicity", title:"Classification of Elements and Periodicity", tagline:"The periodic table, explained by electron configuration.",
        prereq: ["c-atomic-structure"], next: ["c-bonding"],
        topics: {
          ncert: ["Modern periodic law","s, p, d, f block classification","Periodic trends: radius, ionization energy","Electron affinity & electronegativity"],
          main: ["Diagonal relationship (qualitative)"],
          advanced: ["Anomalous periodic trends across the transition series"] } },
      { id:"c-bonding", title:"Chemical Bonding and Molecular Structure", tagline:"Why atoms don't like being alone.",
        prereq: ["c-periodicity"], next: ["c-states-matter","c-goc"],
        topics: {
          ncert: ["Ionic & covalent bonding","Lewis structures","VSEPR theory","Hybridization","Molecular orbital theory","Hydrogen bonding"],
          main: ["Bond order & magnetic behaviour from MOT"],
          advanced: ["Back bonding & multicentre bonding"] } },
      { id:"c-states-matter", title:"States of Matter", tagline:"Gases, liquids, and the laws that connect them.",
        prereq: ["c-bonding"], next: ["c-thermo11"],
        topics: {
          ncert: ["Gas laws (Boyle's, Charles', Avogadro's)","Ideal gas equation","Kinetic molecular theory of gases","Real gases & van der Waals equation","Liquid state properties"],
          main: ["Deviation from ideal behaviour, compressibility factor"],
          advanced: ["Critical constants & Andrews curves"] } },
      { id:"c-thermo11", title:"Thermodynamics", tagline:"Every chemical reaction is an energy transaction.",
        prereq: ["c-states-matter"], next: ["c-equilibrium"],
        topics: {
          ncert: ["System, surroundings & state functions","First law & internal energy","Enthalpy & Hess's law","Entropy & Gibbs free energy","Spontaneity of a reaction"],
          main: ["Bond-enthalpy calculations"],
          advanced: ["Combined Hess's-law & entropy numerical problems"] } },
      { id:"c-equilibrium", title:"Equilibrium", tagline:"Reactions that never quite finish.",
        prereq: ["c-thermo11"], next: ["c-redox"],
        topics: {
          ncert: ["Chemical equilibrium, Kc & Kp","Le Chatelier's principle","Acids, bases & pH","Buffer solutions","Solubility product"],
          main: ["Common ion effect"],
          advanced: ["Simultaneous equilibria & polyprotic acid problems"] } },
      { id:"c-redox", title:"Redox Reactions", tagline:"Every reaction is secretly electrons changing hands.",
        prereq: ["c-equilibrium"], next: ["c-hydrogen"],
        topics: {
          ncert: ["Oxidation & reduction concepts","Oxidation number rules","Balancing redox equations","Electrochemical series basics"],
          main: ["Balancing by the ion-electron method"],
          advanced: ["Redox titration stoichiometry"] } },
      { id:"c-hydrogen", title:"Hydrogen", tagline:"Element number one gets a chapter of its own.",
        prereq: ["c-redox"], next: ["c-s-block"],
        topics: {
          ncert: ["Position of hydrogen in the periodic table","Isotopes of hydrogen","Preparation & properties of hydrides","Water & hydrogen peroxide"],
          main: ["Hydrogen as a fuel"],
          advanced: [] } },
      { id:"c-s-block", title:"s-Block Elements", tagline:"The most reactive metals on the table.",
        prereq: ["c-periodicity","c-hydrogen"], next: ["c-p-block11"],
        topics: {
          ncert: ["Alkali metals & their compounds","Alkaline earth metals & their compounds","NaOH, Na2CO3 & industrial uses","Anomalous behaviour of Li and Be"],
          main: ["Industrial preparation — Solvay process"],
          advanced: ["Diagonal relationships in detail"] } },
      { id:"c-p-block11", title:"p-Block Elements (Groups 13 & 14)", tagline:"Boron and carbon, and everything they build.",
        prereq: ["c-s-block"], next: ["c-goc"],
        topics: {
          ncert: ["Group 13 trends & boron compounds","Group 14 trends","Allotropes of carbon","Silicates & silicones"],
          main: ["Borax bead test"],
          advanced: ["Structure of diborane & boranes"] } },
      { id:"c-goc", title:"Organic Chemistry — Basic Principles and Techniques", tagline:"The grammar you need before reading any organic reaction.",
        prereq: ["c-bonding"], next: ["c-hydrocarbons"],
        topics: {
          ncert: ["IUPAC nomenclature","Structural & stereoisomerism","Inductive, resonance & hyperconjugation effects","Reaction intermediates","Types of organic reactions & mechanisms"],
          main: ["Overview of common named reactions"],
          advanced: ["Ranking carbocation / carbanion / free-radical stability"] } },
      { id:"c-hydrocarbons", title:"Hydrocarbons", tagline:"Carbon and hydrogen, in every shape they can take.",
        prereq: ["c-goc","c-p-block11"], next: ["c-haloalkanes12"],
        topics: {
          ncert: ["Alkanes & conformations","Alkenes & addition reactions","Alkynes & their reactions","Aromatic hydrocarbons & electrophilic substitution"],
          main: ["Markovnikov & anti-Markovnikov addition"],
          advanced: ["Mechanism-based problems on electrophilic addition/substitution"] } },
    ],
    12: [
      { id:"c-solid-state", title:"Solid State", tagline:"Matter, locked into a repeating pattern.",
        prereq: ["c-states-matter"], next: ["c-solutions"],
        topics: {
          ncert: ["Crystal lattices & unit cells","Packing efficiency","Voids & coordination number","Point defects in solids","Electrical & magnetic properties"],
          main: ["Density calculations from unit-cell data"],
          advanced: ["Non-stoichiometric defects in detail"] } },
      { id:"c-solutions", title:"Solutions", tagline:"What happens when one substance dissolves in another.",
        prereq: ["c-solid-state"], next: ["c-electrochemistry"],
        topics: {
          ncert: ["Concentration terms","Raoult's law","Colligative properties","Ideal & non-ideal solutions","Van't Hoff factor & abnormal molar mass"],
          main: ["Azeotropes"],
          advanced: ["Combined Raoult's-law & colligative-property numericals"] } },
      { id:"c-electrochemistry", title:"Electrochemistry", tagline:"Redox reactions, wired up to do work.",
        prereq: ["c-solutions","c-redox"], next: ["c-kinetics"],
        topics: {
          ncert: ["Electrochemical & galvanic cells","Nernst equation","Conductance & Kohlrausch's law","Electrolysis & Faraday's laws","Batteries & corrosion"],
          main: ["Fuel cells (qualitative)"],
          advanced: ["Electrolysis numericals & concentration cells"] } },
      { id:"c-kinetics", title:"Chemical Kinetics", tagline:"Not just what reacts — how fast.",
        prereq: ["c-electrochemistry"], next: ["c-surface"],
        topics: {
          ncert: ["Rate of reaction & rate law","Order & molecularity","Integrated rate equations","Arrhenius equation & activation energy","Collision theory"],
          main: ["Pseudo first-order reactions"],
          advanced: ["Determining order of reaction from experimental data"] } },
      { id:"c-surface", title:"Surface Chemistry", tagline:"Chemistry that happens only at the boundary.",
        prereq: ["c-kinetics"], next: ["c-p-block12"],
        notInAdvanced: true,
        topics: {
          ncert: ["Adsorption & its types","Catalysis","Colloids & their classification","Emulsions"],
          main: ["Enzyme catalysis (qualitative)"],
          advanced: [] } },
      { id:"c-p-block12", title:"p-Block Elements (Groups 15–18)", tagline:"Nitrogen to the noble gases.",
        prereq: ["c-p-block11"], next: ["c-d-f-block"],
        topics: {
          ncert: ["Group 15: nitrogen & phosphorus compounds","Group 16: oxygen & sulphur compounds","Group 17: halogens & interhalogens","Group 18: noble gases"],
          main: ["Interhalogen compounds"],
          advanced: ["Structures of oxoacids in detail"] } },
      { id:"c-d-f-block", title:"d- and f-Block Elements", tagline:"The transition metals, and why they're colourful.",
        prereq: ["c-p-block12"], next: ["c-coordination"],
        topics: {
          ncert: ["Electronic configuration of transition elements","General properties & variable oxidation states","Lanthanoids & actinoids","KMnO4 & K2Cr2O7 chemistry"],
          main: ["Origin of colour in transition-metal ions"],
          advanced: ["KMnO4 / K2Cr2O7 redox-titration numericals"] } },
      { id:"c-coordination", title:"Coordination Compounds", tagline:"Metal ions, surrounded and stabilized by ligands.",
        prereq: ["c-d-f-block","c-bonding"], next: ["c-haloalkanes12"],
        topics: {
          ncert: ["Werner's theory","Nomenclature of coordination compounds","Isomerism in coordination compounds","Valence bond & crystal field theory","Applications"],
          main: ["Applications in qualitative analysis"],
          advanced: ["CFT splitting-energy calculations, isomerism edge cases"] } },
      { id:"c-haloalkanes12", title:"Haloalkanes and Haloarenes", tagline:"Where hydrocarbons meet a halogen — and start reacting.",
        prereq: ["c-hydrocarbons"], next: ["c-alcohols"],
        topics: {
          ncert: ["Nomenclature & preparation","Nucleophilic substitution: SN1 vs SN2","Elimination reactions","Reactivity of haloarenes"],
          main: ["Grignard reagent reactions"],
          advanced: ["Stereochemistry of SN1/SN2 (inversion vs racemization)"] } },
      { id:"c-alcohols", title:"Alcohols, Phenols and Ethers", tagline:"Oxygen, bonded to carbon in three different ways.",
        prereq: ["c-haloalkanes12"], next: ["c-aldehydes"],
        topics: {
          ncert: ["Preparation of alcohols & phenols","Acidity of phenols","Williamson ether synthesis","Reactions of alcohols, phenols & ethers"],
          main: ["Lucas test & distinguishing tests"],
          advanced: ["Multi-step synthesis problems"] } },
      { id:"c-aldehydes", title:"Aldehydes, Ketones and Carboxylic Acids", tagline:"The carbonyl group, in all its reactive forms.",
        prereq: ["c-alcohols","c-goc"], next: ["c-amines","c-biomolecules"],
        topics: {
          ncert: ["Nucleophilic addition reactions","Aldol condensation & Cannizzaro reaction","Preparation & acidity of carboxylic acids","Derivatives of carboxylic acids"],
          main: ["Named reactions: Clemmensen, Wolff–Kishner"],
          advanced: ["Multi-step organic synthesis & mechanism problems"] } },
      { id:"c-amines", title:"Amines", tagline:"Nitrogen's turn to bond with carbon.",
        prereq: ["c-aldehydes"], next: ["c-biomolecules"],
        topics: {
          ncert: ["Classification & nomenclature","Basicity of amines","Preparation methods","Diazonium salts & their reactions"],
          main: ["Hoffmann bromamide degradation"],
          advanced: ["Diazonium coupling synthesis problems"] } },
      { id:"c-biomolecules", title:"Biomolecules", tagline:"Organic chemistry, scaled up to run a living cell.",
        prereq: ["c-aldehydes","c-amines"], next: ["c-polymers"],
        notInAdvanced: true,
        topics: {
          ncert: ["Carbohydrates","Proteins & amino acids","Enzymes","Vitamins","Nucleic acids"],
          main: ["Denaturation of proteins"],
          advanced: [] } },
      { id:"c-polymers", title:"Polymers", tagline:"Small molecules, chained into something huge.",
        prereq: ["c-biomolecules"], next: ["c-everyday-life"],
        notInAdvanced: true,
        topics: {
          ncert: ["Classification of polymers","Addition polymerization","Condensation polymerization","Rubber, elastomers & biodegradable polymers"],
          main: ["Natural vs synthetic rubber"],
          advanced: [] } },
      { id:"c-everyday-life", title:"Chemistry in Everyday Life", tagline:"Where the syllabus meets the medicine cabinet.",
        prereq: ["c-polymers"], next: [],
        notInAdvanced: true,
        topics: {
          ncert: ["Classification of drugs","Drug-target interaction","Chemicals in food: preservatives & sweeteners","Soaps & detergents"],
          main: ["Artificial sweeteners"],
          advanced: [] } },
    ],
  },

  maths: {
    label: "Maths",
    glyph: "∑",
    11: [
      { id:"m-sets", title:"Sets, Relations and Functions", tagline:"The vocabulary every later chapter borrows.",
        prereq: [], next: ["m-trig"],
        topics: {
          ncert: ["Sets & set operations","Relations","Functions: domain, range & types","Composition of functions"],
          main: ["Venn-diagram word problems"],
          advanced: ["Functional equations (introductory)"] } },
      { id:"m-trig", title:"Trigonometric Functions and Equations", tagline:"Angles, extended past the right triangle.",
        prereq: ["m-sets"], next: ["m-complex"],
        topics: {
          ncert: ["Trigonometric ratios & identities","Graphs of trigonometric functions","Compound & multiple angle formulas","Trigonometric equations"],
          main: ["Conditional trigonometric identities"],
          advanced: ["General-solution problems combining multiple identities"] } },
      { id:"m-complex", title:"Complex Numbers and Quadratic Equations", tagline:"What happens when a quadratic refuses to factor.",
        prereq: ["m-trig"], next: ["m-sequences"],
        topics: {
          ncert: ["Algebra of complex numbers","Argand plane & polar form","Modulus & argument","Quadratic equations with complex roots"],
          main: ["Cube roots of unity applications"],
          advanced: ["Geometry with complex numbers: rotation & loci"] } },
      { id:"m-sequences", title:"Sequences and Series", tagline:"Numbers that follow a rule, added up.",
        prereq: ["m-complex"], next: ["m-permutations"],
        topics: {
          ncert: ["Arithmetic progression","Geometric progression","AM, GM & HM","Special sums: squares & cubes"],
          main: ["Arithmetic-geometric progression"],
          advanced: ["Summation using the method of differences"] } },
      { id:"m-permutations", title:"Permutations and Combinations", tagline:"Counting, done properly.",
        prereq: ["m-sequences"], next: ["m-binomial"],
        topics: {
          ncert: ["Fundamental principle of counting","Permutations","Combinations","Circular permutations"],
          main: ["Permutations with repetition"],
          advanced: ["Combinatorics requiring case-by-case bijections"] } },
      { id:"m-binomial", title:"Binomial Theorem", tagline:"Expanding (a + b)ⁿ without ever multiplying it out.",
        prereq: ["m-permutations"], next: ["m-lines"],
        topics: {
          ncert: ["Binomial expansion for positive integral index","General term & middle term","Properties of binomial coefficients"],
          main: ["Greatest term in an expansion"],
          advanced: ["Multinomial theorem applications"] } },
      { id:"m-lines", title:"Straight Lines", tagline:"Coordinate geometry's simplest citizen.",
        prereq: ["m-binomial"], next: ["m-circles"],
        topics: {
          ncert: ["Slope & equations of a line","Distance & section formulas","Angle between two lines","Family of lines"],
          main: ["Locus problems"],
          advanced: [] } },
      { id:"m-circles", title:"Circles", tagline:"Every point, the same distance from a centre.",
        prereq: ["m-lines"], next: ["m-conics"],
        topics: {
          ncert: ["Standard equation of a circle","Tangents & normals to a circle","Family of circles","Radical axis"],
          main: ["Pole and polar (qualitative)"],
          advanced: ["Common tangents & family-of-circles problems"] } },
      { id:"m-conics", title:"Conic Sections", tagline:"Parabolas, ellipses and hyperbolas — all one shape, sliced differently.",
        prereq: ["m-circles"], next: ["m-3d11"],
        topics: {
          ncert: ["Parabola","Ellipse","Hyperbola","Eccentricity & focal properties"],
          main: ["Chord of contact, tangent & normal equations"],
          advanced: ["Parametric problems combining multiple conics"] } },
      { id:"m-3d11", title:"Introduction to Three-Dimensional Geometry", tagline:"Coordinate geometry, given a third axis.",
        prereq: ["m-conics"], next: ["m-limits"],
        topics: {
          ncert: ["3D coordinate system","Distance formula in 3D","Section formula in 3D"],
          main: [],
          advanced: [] } },
      { id:"m-limits", title:"Limits and Derivatives", tagline:"Calculus, before it's called calculus.",
        prereq: ["m-3d11"], next: ["m-stats-prob11"],
        topics: {
          ncert: ["Concept & algebra of limits","Standard limits","Derivative from first principles","Derivatives of standard functions"],
          main: ["Evaluating limits using standard forms"],
          advanced: ["Limits involving summations & series"] } },
      { id:"m-stats-prob11", title:"Statistics and Probability", tagline:"Making sense of data and of uncertainty.",
        prereq: ["m-limits"], next: ["m-inverse-trig"],
        topics: {
          ncert: ["Measures of dispersion","Mean deviation & variance","Probability basics","Addition & multiplication theorems"],
          main: ["Bayes' theorem preview"],
          advanced: [] } },
    ],
    12: [
      { id:"m-inverse-trig", title:"Inverse Trigonometric Functions", tagline:"Running trigonometry backwards.",
        prereq: ["m-trig"], next: ["m-matrices"],
        topics: {
          ncert: ["Domain & range of inverse trig functions","Properties of inverse trig functions","Graphs of inverse trig functions"],
          main: ["Solving inverse trigonometric equations"],
          advanced: [] } },
      { id:"m-matrices", title:"Matrices", tagline:"A grid of numbers that behaves like an algebra of its own.",
        prereq: ["m-inverse-trig"], next: ["m-determinants"],
        topics: {
          ncert: ["Types of matrices","Matrix algebra: addition & multiplication","Transpose & symmetric matrices","Inverse by elementary operations"],
          main: ["Matrix polynomial equations"],
          advanced: [] } },
      { id:"m-determinants", title:"Determinants", tagline:"One number that summarizes an entire matrix.",
        prereq: ["m-matrices"], next: ["m-continuity"],
        topics: {
          ncert: ["Properties of determinants","Cofactors & adjoint","Inverse of a matrix","Cramer's rule & area of a triangle"],
          main: ["Solving linear-equation systems using determinants"],
          advanced: ["Properties-based determinant proofs"] } },
      { id:"m-continuity", title:"Continuity and Differentiability", tagline:"Limits, formalized and made rigorous.",
        prereq: ["m-determinants","m-limits"], next: ["m-application-derivatives"],
        topics: {
          ncert: ["Continuity of a function","Differentiability","Chain rule","Implicit & logarithmic differentiation","Higher-order derivatives"],
          main: ["Differentiability at a point from first principles"],
          advanced: ["Functional equations combined with continuity"] } },
      { id:"m-application-derivatives", title:"Application of Derivatives", tagline:"What the derivative is actually for.",
        prereq: ["m-continuity"], next: ["m-indefinite-integrals"],
        topics: {
          ncert: ["Rate of change of quantities","Tangents & normals","Increasing & decreasing functions","Maxima & minima","Approximations"],
          main: ["Rolle's & Lagrange's mean value theorems"],
          advanced: ["Optimization problems with multiple constraints"] } },
      { id:"m-indefinite-integrals", title:"Indefinite Integrals", tagline:"Undoing a derivative.",
        prereq: ["m-application-derivatives"], next: ["m-definite-integrals"],
        topics: {
          ncert: ["Integration by substitution","Integration by parts","Integration using partial fractions","Standard integral forms"],
          main: ["Basic reduction formulae"],
          advanced: ["Integration of irrational & composite trig functions"] } },
      { id:"m-definite-integrals", title:"Definite Integrals and Applications", tagline:"Turning integration into area.",
        prereq: ["m-indefinite-integrals"], next: ["m-diff-eq"],
        topics: {
          ncert: ["Fundamental theorem of calculus","Properties of definite integrals","Area under a curve","Area between two curves"],
          main: ["Definite integral as the limit of a sum"],
          advanced: ["Estimation & inequality problems on definite integrals"] } },
      { id:"m-diff-eq", title:"Differential Equations", tagline:"Equations that describe how things change.",
        prereq: ["m-definite-integrals"], next: ["m-vectors"],
        topics: {
          ncert: ["Order & degree","Variable separable method","Homogeneous differential equations","Linear differential equations"],
          main: ["Exact differential equations (basic)"],
          advanced: [] } },
      { id:"m-vectors", title:"Vector Algebra", tagline:"Quantities with a direction, given their own algebra.",
        prereq: ["m-diff-eq","m-3d11"], next: ["m-3d12"],
        topics: {
          ncert: ["Vector operations & components","Dot product","Cross product","Scalar triple product"],
          main: ["Vector equations of lines & planes (preview)"],
          advanced: ["Scalar & vector triple-product identities"] } },
      { id:"m-3d12", title:"Three-Dimensional Geometry", tagline:"Lines and planes, described with vectors.",
        prereq: ["m-vectors"], next: ["m-probability12"],
        topics: {
          ncert: ["Direction cosines & direction ratios","Equation of a line in space","Equation of a plane","Shortest distance between two lines"],
          main: ["Angle between a line & a plane"],
          advanced: ["Image of a point in a plane or line"] } },
      { id:"m-probability12", title:"Probability", tagline:"Conditional probability, and the theorem built on it.",
        prereq: ["m-3d12","m-stats-prob11"], next: [],
        topics: {
          ncert: ["Conditional probability","Bayes' theorem","Random variables & probability distributions","Bernoulli trials & binomial distribution"],
          main: ["Mean & variance of a probability distribution"],
          advanced: ["Multi-stage conditional-probability problems"] } },
    ],
  },
};

/* =========================================================================
   APP LOGIC
   ========================================================================= */

const TIERS = [
  { key: "ncert",    label: "NCERT" },
  { key: "main",     label: "JEE Main" },
  { key: "advanced", label: "JEE Advanced" },
];

// Flatten everything into a single lookup: id -> { ...chapter, subject, cls }
const CHAPTER_INDEX = {};
for (const [subjectKey, subject] of Object.entries(SYLLABUS)) {
  for (const cls of [11, 12]) {
    for (const chapter of subject[cls]) {
      CHAPTER_INDEX[chapter.id] = { ...chapter, subject: subjectKey, cls };
    }
  }
}

function topicCount(chapter) {
  return chapter.topics.ncert.length + chapter.topics.main.length + chapter.topics.advanced.length;
}

// Build the cumulative topic list + badge for a given tier.
// NCERT tier -> ncert only. Main -> ncert + main. Advanced -> ncert + main + advanced.
function topicsForTier(chapter, tierKey) {
  const t = chapter.topics;
  if (tierKey === "ncert") return t.ncert.map(x => ({ text: x, added: false }));
  if (tierKey === "main") {
    return [...t.ncert.map(x => ({ text: x, added: false })), ...t.main.map(x => ({ text: x, added: true }))];
  }
  return [
    ...t.ncert.map(x => ({ text: x, added: false })),
    ...t.main.map(x => ({ text: x, added: true })),
    ...t.advanced.map(x => ({ text: x, added: true })),
  ];
}

const state = {
  subject: "physics",
  cls: 11,
  tier: "ncert",
};

const els = {
  subjectTabs: document.querySelectorAll(".subject-tab"),
  classBtns: document.querySelectorAll(".class-toggle__btn"),
  grid: document.getElementById("chapter-grid"),
  count: document.getElementById("board-count"),
  detail: document.getElementById("detail"),
  scrim: document.getElementById("scrim"),
  detailBack: document.getElementById("detail-back"),
  detailClassChip: document.getElementById("detail-classchip"),
  detailSubject: document.getElementById("detail-subject"),
  detailTitle: document.getElementById("detail-title"),
  detailTagline: document.getElementById("detail-tagline"),
  prereqSection: document.getElementById("detail-prereq-section"),
  prereqList: document.getElementById("detail-prereq-list"),
  tierSelect: document.getElementById("tier-select"),
  tierNote: document.getElementById("tier-note"),
  topicList: document.getElementById("detail-topic-list"),
  nextSection: document.getElementById("detail-next-section"),
  nextList: document.getElementById("detail-next-list"),
};

function setSubject(subjectKey) {
  state.subject = subjectKey;
  document.body.setAttribute("data-subject", subjectKey);
  els.subjectTabs.forEach(btn => {
    const active = btn.dataset.subject === subjectKey;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  renderGrid();
}

function setClass(cls) {
  state.cls = cls;
  els.classBtns.forEach(btn => {
    const active = Number(btn.dataset.class) === cls;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  renderGrid();
}

function renderGrid() {
  const chapters = SYLLABUS[state.subject][state.cls];
  els.grid.innerHTML = "";
  els.count.textContent = `${chapters.length} chapter${chapters.length === 1 ? "" : "s"}`;

  chapters.forEach((chapter, i) => {
    const hasLinks = chapter.prereq.length > 0 || chapter.next.length > 0;
    const card = document.createElement("button");
    card.className = "chapter-card";
    card.style.setProperty("--i", i);
    card.setAttribute("type", "button");
    card.innerHTML = `
      <div class="chapter-card__top">
        <span class="chapter-card__chip">${state.cls}</span>
        <span class="chapter-card__link ${hasLinks ? "is-linked" : ""}">
          <span class="dot"></span>${hasLinks ? "Linked" : "Standalone"}
        </span>
      </div>
      <h3 class="chapter-card__title">${chapter.title}</h3>
      <p class="chapter-card__tagline">${chapter.tagline}</p>
      <span class="chapter-card__count">${topicCount(chapter)} topics · NCERT → Advanced${chapter.notInAdvanced ? " · not in Advanced" : ""}</span>
    `;
    card.addEventListener("click", () => openDetail(chapter.id));
    els.grid.appendChild(card);
  });
}

function chapterPill(id) {
  const c = CHAPTER_INDEX[id];
  const pill = document.createElement("button");
  pill.className = "chip-pill";
  pill.innerHTML = `
    <span class="chip-pill__num">${c.cls}</span>
    <span class="chip-pill__text">
      <strong>${c.title}</strong>
      <em>${c.cls === state.cls && c.subject === state.subject ? "Required knowledge" : `Unlocks in Class ${c.cls} · ${SYLLABUS[c.subject].label}`}</em>
    </span>
    <span class="chip-pill__arrow">›</span>
  `;
  pill.addEventListener("click", () => openDetail(id));
  return pill;
}

function renderTopicList() {
  const chapter = CHAPTER_INDEX[state.activeChapterId];
  if (!chapter) return;

  // Keep the select in sync with state.tier
  els.tierSelect.value = state.tier;

  if (state.tier === "advanced" && chapter.notInAdvanced) {
    els.tierNote.style.display = "";
    els.tierNote.textContent = "Not part of the JEE Advanced syllabus — still asked in JEE Main and boards, so shown here as JEE Main.";
    const topics = topicsForTier(chapter, "main");
    renderTopicItems(topics);
    return;
  }

  els.tierNote.style.display = "none";
  const topics = topicsForTier(chapter, state.tier);
  renderTopicItems(topics);
}

function renderTopicItems(topics) {
  els.topicList.innerHTML = "";
  topics.forEach(({ text, added }) => {
    const li = document.createElement("li");
    li.className = added ? "topic-list__item topic-list__item--added" : "topic-list__item";
    li.innerHTML = `<span>${text}</span>${added ? '<span class="topic-list__badge">+</span>' : ""}`;
    els.topicList.appendChild(li);
  });
}

function openDetail(id) {
  const chapter = CHAPTER_INDEX[id];
  if (!chapter) return;

  state.activeChapterId = id;
  state.tier = "ncert";

  // Sync the board underneath to this chapter's own subject/class.
  if (chapter.subject !== state.subject || chapter.cls !== state.cls) {
    state.subject = chapter.subject;
    state.cls = chapter.cls;
    document.body.setAttribute("data-subject", state.subject);
    els.subjectTabs.forEach(btn => {
      const active = btn.dataset.subject === state.subject;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    els.classBtns.forEach(btn => {
      const active = Number(btn.dataset.class) === state.cls;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    renderGrid();
  }

  els.detailClassChip.textContent = chapter.cls;
  els.detailSubject.textContent = `${SYLLABUS[chapter.subject].glyph} ${SYLLABUS[chapter.subject].label}`;
  els.detailTitle.textContent = chapter.title;
  els.detailTagline.textContent = chapter.tagline;

  els.prereqList.innerHTML = "";
  if (chapter.prereq.length) {
    chapter.prereq.forEach(pid => els.prereqList.appendChild(chapterPill(pid)));
    els.prereqSection.style.display = "";
  } else {
    els.prereqSection.style.display = "none";
  }

  renderTopicList();

  els.nextList.innerHTML = "";
  if (chapter.next.length) {
    chapter.next.forEach(nid => els.nextList.appendChild(chapterPill(nid)));
    els.nextSection.style.display = "";
  } else {
    els.nextSection.style.display = "none";
  }

  document.body.setAttribute("data-subject", chapter.subject);
  els.detail.classList.add("is-open");
  els.scrim.classList.add("is-open");
  els.detail.setAttribute("aria-hidden", "false");
  els.detail.scrollTop = 0;
  document.body.classList.add("no-scroll");
}

function closeDetail() {
  els.detail.classList.remove("is-open");
  els.scrim.classList.remove("is-open");
  els.detail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  document.body.setAttribute("data-subject", state.subject);
}

els.subjectTabs.forEach(btn => btn.addEventListener("click", () => setSubject(btn.dataset.subject)));
els.classBtns.forEach(btn => btn.addEventListener("click", () => setClass(Number(btn.dataset.class))));
els.detailBack.addEventListener("click", closeDetail);
els.scrim.addEventListener("click", closeDetail);
els.tierSelect.addEventListener("change", () => { state.tier = els.tierSelect.value; renderTopicList(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDetail(); });

// Init
setSubject("physics");
setClass(11);
