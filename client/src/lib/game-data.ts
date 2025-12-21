export type Category = 'Math' | 'Physics' | 'Chemistry' | 'Objects' | 'Emotions' | 'College Majors' | 'Red Flags' | 'Animals' | 'Geography';

export interface GameState {
  step: 'setup' | 'category-select' | 'roles' | 'play' | 'vote' | 'result';
  players: number;
  playerNames: string[];
  imposters: number;
  category: string | null;
  secretWord: string;
  playerRoles: Role[];
  currentPlayerIndex: number;
  votes: Record<number, number>; // playerIndex -> votes received
  winner: 'crew' | 'imposter' | null;
}

export type Role = 'crew' | 'imposter';

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 12;

export const CATEGORIES: Category[] = [
  'Math',
  'Physics',
  'Chemistry',
  'Objects',
  'Emotions',
  'College Majors',
  'Red Flags',
  'Animals',
  'Geography'
];

export interface CategoryStyle {
  bgClass: string;
  bgHoverClass: string;
  textClass: string;
}

export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  Math: {
    bgClass: 'bg-primary/10',
    bgHoverClass: 'group-hover:bg-primary/20',
    textClass: 'text-primary'
  },
  Physics: {
    bgClass: 'bg-secondary/10',
    bgHoverClass: 'group-hover:bg-secondary/20',
    textClass: 'text-secondary'
  },
  Chemistry: {
    bgClass: 'bg-accent/10',
    bgHoverClass: 'group-hover:bg-accent/20',
    textClass: 'text-accent'
  },
  Objects: {
    bgClass: 'bg-[var(--category-objects)]/10',
    bgHoverClass: 'group-hover:bg-[var(--category-objects)]/20',
    textClass: 'text-[var(--category-objects)]'
  },
  Emotions: {
    bgClass: 'bg-[var(--category-emotions)]/10',
    bgHoverClass: 'group-hover:bg-[var(--category-emotions)]/20',
    textClass: 'text-[var(--category-emotions)]'
  },
  'College Majors': {
    bgClass: 'bg-[var(--category-majors)]/10',
    bgHoverClass: 'group-hover:bg-[var(--category-majors)]/20',
    textClass: 'text-[var(--category-majors)]'
  },
  'Red Flags': {
    bgClass: 'bg-[var(--category-red-flags)]/10',
    bgHoverClass: 'group-hover:bg-[var(--category-red-flags)]/20',
    textClass: 'text-[var(--category-red-flags)]'
  },
  Animals: {
    bgClass: 'bg-[var(--category-animals)]/10',
    bgHoverClass: 'group-hover:bg-[var(--category-animals)]/20',
    textClass: 'text-[var(--category-animals)]'
  },
  Geography: {
    bgClass: 'bg-[var(--category-geography)]/10',
    bgHoverClass: 'group-hover:bg-[var(--category-geography)]/20',
    textClass: 'text-[var(--category-geography)]'
  }
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Math: 'Calculus • Geometry • Algebra',
  Physics: 'Quantum • Gravity • Forces',
  Chemistry: 'Elements • Reactions • Bonds',
  Objects: 'Everyday Items • Tools • Furniture',
  Emotions: 'Joy • Fear • Surprise',
  'College Majors': 'STEM • Arts • Business',
  'Red Flags': 'Warnings • Signals • Clues',
  Animals: 'Wildlife • Pets • Creatures',
  Geography: 'Places • Landforms • Maps'
};

export const CATEGORY_IMAGE_ICONS: Partial<Record<Category, string>> = {
  Math: '/images/icon_math_pastel.png',
  Physics: '/images/icon_physics_pastel.png',
  Chemistry: '/images/icon_chemistry_pastel.png',
  Objects: '/images/icon_objects_pastel.png'
};

export const WORDS: Record<Category, string[]> = {
  Math: [
    "Game Theory", "Chaos Theory", "Number Theory", "Set Theory", "Graph Theory", 
    "Knot Theory", "Group Theory", "Ring Theory", "Field Theory", "Galois Theory", 
    "Model Theory", "Proof Theory", "Type Theory", "Category Theory", "Measure Theory", 
    "Ergodic Theory", "Spectral Theory", "Potential Theory", "Homotopy Theory", "Homology Theory", 
    "K-Theory", "Hodge Theory", "Gauge Theory", "String Theory", "M-Theory", 
    "Yang-Mills", "Chern-Simons", "Riemann Hypothesis", "Fermat's Last", "Goldbach Conjecture", 
    "Twin Prime", "P vs NP", "Poincare Conjecture", "Four Color", "Continuum Hypothesis", 
    "Incompleteness Thm", "Halting Problem", "Zorn's Lemma", "Axiom Choice", "Peano Axioms", 
    "Euclidean Geometry", "Hyperbolic Geom", "Elliptic Geom", "Differential Geom", "Algebraic Geom", 
    "Symplectic Geom", "Complex Analysis", "Real Analysis", "Functional Analysis", "Fourier Analysis", 
    "Vector Calculus", "Tensor Calculus", "Linear Algebra", "Abstract Algebra", "Boolean Algebra", 
    "Lie Algebra", "Clifford Algebra", "Modular Arithmetic", "Prime Number", "Fibonacci Seq", 
    "Golden Ratio", "Pi", "Euler's Number", "Imaginary Unit", "Complex Number", 
    "Quaternion", "Octonion", "Matrix", "Determinant", "Eigenvalue", "Eigenvector", 
    "Derivative", "Integral", "Limit", "Series", "Sequence", 
    "Fractal", "Mandelbrot Set", "Julia Set", "Strange Attractor", "Butterfly Effect", 
    "Nash Equilibrium", "Prisoner's Dilemma", "Monte Carlo", "Bayesian Stats", "Markov Chain", 
    "Random Walk", "Poisson Dist", "Normal Dist", "Binomial Dist", "Central Limit", 
    "Law Large", "Least Squares", "Regression", "Correlation", "Variance", 
    "Standard Dev", "Entropy", "Information Thm", "Turing Machine", "Lambda Calc", 
    "Ramsey Theory", "Combinatorics", "Graph Coloring", "Hilbert Space", "Banach Space", 
    "Sobolev Space", "Fourier Transform", "Laplace Transform", "Wavelet", "Convex Opt", 
    "Linear Programming", "Lagrange Multiplier", "Euler Characteristic", "Dynamical System", "Coxeter Group", 
    "Geometric Group", "Topological Data", "Sieve Theory", "Spectral Graph", 
    "Arithmetic", "Addition", "Subtraction", "Multiplication", "Division", 
    "Order Ops", "PEMDAS", "Whole Number", "Integer", "Rational Number", 
    "Irrational Number", "Real Number", "Complex Plane", "Number Line", "Factor", 
    "Multiple", "Prime Factor", "Composite Number", "Divisibility", "Fraction", 
    "Decimal", "Percent", "Ratio", "Proportion", "Unit Rate", 
    "Cross Multiply", "Scale Factor", "Scientific Notation", "Sig Fig", "Rounding", 
    "Estimation", "Equation", "Inequality", "Variable", "Expression", 
    "Term", "Coefficient", "Constant", "Monomial", "Binomial", 
    "Polynomial", "Degree", "Factoring", "Completing Square", "Quadratic Formula", 
    "Discriminant", "Parabola", "Vertex", "Axis Symmetry", "Linear Function", 
    "Piecewise Function", "Absolute Value", "Step Function", "Exponential Function", "Log Function", 
    "Change Base", "Natural Log", "Inverse Function", "Composition", "Sequence Arithmetic", 
    "Sequence Geometric", "Recursive Formula", "Series Sum", "Sigma Notation", "Limit Definition", 
    "Derivative Rule", "Chain Rule", "Product Rule", "Quotient Rule", "Power Rule", 
    "Mean Value", "Critical Point", "Inflection Point", "Concavity", "Riemann Sum", 
    "Definite Integral", "Indefinite Integral", "U-Substitution", "Integration by Parts", "Differential Eq", 
    "Initial Value", "Slope Field", "Vector", "Dot Product", "Cross Product", 
    "Magnitude", "Unit Vector", "Parametric Curve", "Polar Coordinates", "Polar Graph", 
    "Asymptote", "End Behavior", "Domain", "Range", "Interval Notation", 
    "Set Notation", "Union", "Intersection", "Complement", "Venn Diagram", 
    "Truth Table", "Logic Gate", "Algorithm", "Pseudocode", "Recursion", 
    "Induction", "Proof by Contradiction", "Direct Proof", "Counterexample", "Sample Space", 
    "Event", "Experimental Prob", "Theoretical Prob", "Conditional Prob", "Independent Events", 
    "Dependent Events", "Bayes Rule", "Expected Value", "Random Variable", "Normal Curve", 
    "Standard Normal", "Z-Score", "Histogram", "Box Plot", "Scatter Plot", 
    "Correlation Coeff", "Residual", "Linear Regression", "Outlier", "Confidence Interval"
  ],
  Physics: [
    "Relativity", "Quantum Mech", "Thermodynamics", "Electromagnetism", "Gravity", 
    "Black Hole", "Dark Matter", "Dark Energy", "Big Bang", "String Theory", 
    "Standard Model", "Higgs Boson", "Quark", "Lepton", "Boson", 
    "Fermion", "Photon", "Electron", "Proton", "Neutron", 
    "Neutrino", "Antimatter", "Superconductor", "Superfluid", "Bose-Einstein", 
    "Plasma", "Laser", "Fusion", "Fission", "Radioactivity", 
    "Half-life", "Doppler Effect", "Redshift", "Blueshift", "Interference", 
    "Diffraction", "Refraction", "Reflection", "Polarization", "Wave-Particle", 
    "Uncertainty", "Entanglement", "Teleportation", "Superposition", "Schrodinger's Cat", 
    "Maxwell's Demon", "Entropy", "Enthalpy", "Free Energy", "Kinetic Energy", 
    "Potential Energy", "Momentum", "Angular Momentum", "Torque", "Force", 
    "Mass", "Acceleration", "Velocity", "Speed", "Time", 
    "Space", "Spacetime", "Wormhole", "Event Horizon", "Singularity", 
    "Cosmic Ray", "Gamma Ray", "X-Ray", "Ultraviolet", "Infrared", 
    "Microwave", "Radio Wave", "Sound Wave", "Shock Wave", "Sonic Boom", 
    "Fluid Dynamics", "Aerodynamics", "Hydrodynamics", "Turbulence", "Viscosity", 
    "Surface Tension", "Capillary Action", "Buoyancy", "Pressure", "Temperature", 
    "Heat", "Work", "Power", "Watt", "Joule", 
    "Newton", "Pascal", "Tesla", "Volt", "Ampere", 
    "Ohm", "Coulomb", "Faraday", "Maxwell", "Einstein", 
    "Bohr", "Planck", "Heisenberg", "Feynman", "Hawking", 
    "Gravitational Wave", "LIGO", "CMB", "Cosmic Inflation", "Photoelectric Effect", 
    "Compton Scattering", "Cherenkov Light", "Casimir Effect", "Quantum Hall", "Muon", 
    "Tau", "Solar Wind", "Aurora", "Neutron Star", "Pulsar", 
    "White Dwarf", "Red Giant", "Supernova", "Event Rate", "Muon Collider", 
    "Cyclotron", "Synchrotron", "Plasma Jet", "Shock Front", "Lagrange Point", 
    "Motion", "Displacement", "Distance", "Scalar", "Vector", 
    "Frame Reference", "Kinematics", "One-D Motion", "Projectile", "Free Fall", 
    "Acceleration Gravity", "Terminal Velocity", "Inertia", "Newton First", "Newton Second", 
    "Newton Third", "Net Force", "Normal Force", "Friction", "Static Friction", 
    "Kinetic Friction", "Tension", "Spring", "Hooke's Law", "Elastic Potential", 
    "Work-Energy Thm", "Mechanical Energy", "Mechanical Advantage", "Simple Machine", "Lever", 
    "Pulley", "Inclined Plane", "Wheel Axle", "Efficiency", "Power Output", 
    "Horsepower", "Momentum Conservation", "Impulse", "Elastic Collision", "Inelastic Collision", 
    "Center Mass", "Circular Motion", "Centripetal Force", "Centripetal Acc", "Tangential Speed", 
    "Rotational Motion", "Angular Velocity", "Moment Inertia", "Rotational Kinetic", "Equilibrium", 
    "Static Equilibrium", "Gravitational Field", "Kepler Laws", "Orbit", "Satellite", 
    "Escape Velocity", "Tidal Force", "Fluid Pressure", "Pascal Principle", "Archimedes", 
    "Bernoulli", "Continuity Eq", "Ideal Gas", "Gas Law", "Boyle's Law", 
    "Charles Law", "Avogadro Number", "Heat Capacity", "Specific Heat", "Calorimetry", 
    "Phase Change", "Latent Heat", "Conduction", "Convection", "Radiation", 
    "Thermal Expansion", "Heat Engine", "Carnot Cycle", "Heat Pump", "Electric Charge", 
    "Coulomb Law", "Electric Field", "Electric Potential", "Equipotential", "Capacitance", 
    "Capacitor", "Dielectric", "Current", "Resistance", "Resistivity", 
    "Ohm's Law", "Series Circuit", "Parallel Circuit", "Kirchoff Loop", "Kirchoff Junction", 
    "Electrical Power", "Circuit Breaker", "Fuse", "Magnetic Field", "Magnetic Flux", 
    "Magnet", "Lorentz Force", "Induction", "Faraday Law", "Lenz Law", 
    "Transformer", "Generator", "Motor", "AC Current", "DC Current", 
    "RMS Voltage", "Standing Wave", "Node", "Antinode", "Fundamental", 
    "Harmonic", "Resonance", "Lens", "Focal Length", "Snell Law"
  ],
  Chemistry: [
    "Atom", "Molecule", "Ion", "Isotope", "Element", 
    "Compound", "Mixture", "Solution", "Suspension", "Colloid", 
    "Acid", "Base", "pH", "Buffer", "Salt", 
    "Metal", "Nonmetal", "Metalloid", "Alloy", "Polymer", 
    "Plastic", "Rubber", "Fiber", "Ceramic", "Glass", 
    "Crystal", "Mineral", "Ore", "Gemstone", "Diamond", 
    "Graphite", "Graphene", "Fullerene", "Nanotube", "Organic Chem", 
    "Inorganic Chem", "Biochemistry", "Physical Chem", "Analytical Chem", "Electrochemistry", 
    "Thermochemistry", "Photochemistry", "Radiochemistry", "Nuclear Chem", "Quantum Chem", 
    "Stoichiometry", "Mole", "Molarity", "Molality", "Titration", 
    "Distillation", "Filtration", "Chromatography", "Spectroscopy", "Electrolysis", 
    "Oxidation", "Reduction", "Redox", "Combustion", "Corrosion", 
    "Rust", "Fermentation", "Photosynthesis", "Respiration", "Enzyme", 
    "Catalyst", "Inhibitor", "Protein", "Amino Acid", "Peptide", 
    "DNA", "RNA", "Lipid", "Fat", "Oil", 
    "Wax", "Steroid", "Carbohydrate", "Sugar", "Starch", 
    "Cellulose", "Glucose", "Fructose", "Sucrose", "Lactose", 
    "Maltose", "Vitamin", "Hormone", "Pheromone", "Toxin", 
    "Poison", "Venom", "Drug", "Medicine", "Aspirin", 
    "Caffeine", "Nicotine", "Alcohol", "Ethanol", "Methanol", 
    "Periodic Table", "Alkali Metal", "Alkaline Earth", "Halogen", "Noble Gas", 
    "Transition Metal", "Lanthanide", "Actinide", "Crystal Field", "Ligand", 
    "Coordination Complex", "Chelation", "Supramolecular", "Self-Assembly", "Aromatic Ring", 
    "Benzene", "Alkane", "Alkene", "Alkyne", "Isomer", 
    "Chirality", "Stereochem", "Mass Spec", "NMR", "IR Spectra", 
    "UV-Vis", "Le Chatelier", "Gibbs Energy", "Henderson-Hasselbalch", "Solubility Prod", 
    "Partition Coeff", "Green Chem", "Click Chem", "Electronegativity", "Lattice Energy", 
    "Atom Model", "Bohr Model", "Electron Cloud", "Proton Number", "Neutron Number", 
    "Atomic Number", "Mass Number", "Atomic Mass", "Isotopic Abundance", "Periodic Trend", 
    "Atomic Radius", "Ionization Energy", "Metallic Character", "Valence Electron", "Lewis Dot", 
    "Octet Rule", "Electron Shell", "Orbital", "s Orbital", "p Orbital", 
    "d Orbital", "f Orbital", "Aufbau", "Hund Rule", "Pauli Exclusion", 
    "Electron Config", "Noble Gas Config", "Ground State", "Excited State", "Energy Level", 
    "Photon", "Flame Test", "Emission Spectrum", "Absorption Spectrum", "Cation", 
    "Anion", "Ionic Bond", "Covalent Bond", "Polar Covalent", "Nonpolar", 
    "Metallic Bond", "Dipole", "Hydrogen Bond", "Intermolecular Forces", "London Dispersion", 
    "Dipole Moment", "Formal Charge", "Resonance", "VSEPR", "Linear Shape", 
    "Bent Shape", "Trig Planar", "Tetrahedral", "Trig Bipyramidal", "Octahedral", 
    "Bond Angle", "Lattice", "Unit Cell", "Crystal Structure", "Ionic Compound", 
    "Molecular Compound", "Empirical Formula", "Molecular Formula", "Structural Formula", "Functional Group", 
    "Alcohol Group", "Carboxyl", "Carbonyl", "Ester", "Ether", 
    "Amine", "Amide", "Nitrile", "Alkyl", "Phenyl", 
    "Polymerization", "Addition Polymer", "Condensation Polymer", "Crosslink", "Monomer", 
    "Reaction Rate", "Collision Theory", "Activation Energy", "Rate Law", "Rate Constant", 
    "Reaction Mechanism", "Intermediate", "Transition State", "Potential Energy Diagram", "Equilibrium Constant", 
    "Reaction Quotient", "ICE Table", "Endothermic", "Exothermic", "Calorimeter", 
    "Heat of Reaction", "Enthalpy Change", "Hess Law", "Entropy Change", "Gibbs Free", 
    "Spontaneity", "Electrolyte", "Nonelectrolyte", "Precipitate", "Solubility Curve", 
    "Saturated", "Unsaturated", "Supersaturated", "Solvation", "Hydration", 
    "Dissociation", "Strong Acid", "Weak Acid", "Strong Base", "Weak Base"
  ],
  Objects: [
    "Chair", "Table", "Desk", "Sofa", "Bed", 
    "Lamp", "Mirror", "Clock", "Watch", "Phone", 
    "Laptop", "Tablet", "Camera", "Television", "Radio", 
    "Speaker", "Headphone", "Microphone", "Guitar", "Piano", 
    "Violin", "Drum", "Flute", "Trumpet", "Book", 
    "Pen", "Pencil", "Eraser", "Ruler", "Scissors", 
    "Stapler", "Paper", "Notebook", "Envelope", "Stamp", 
    "Key", "Lock", "Door", "Window", "Wall", 
    "Floor", "Ceiling", "Roof", "Chimney", "Fence", 
    "Gate", "Garden", "Tree", "Flower", "Grass", 
    "Leaf", "Rock", "Stone", "Sand", "Water", 
    "Fire", "Ice", "Snow", "Rain", "Cloud", 
    "Sun", "Moon", "Star", "Planet", "Car", 
    "Bus", "Train", "Plane", "Boat", "Ship", 
    "Bike", "Scooter", "Skateboard", "Helmet", "Glove", 
    "Hat", "Shoe", "Sock", "Shirt", "Pants", 
    "Dress", "Coat", "Jacket", "Scarf", "Belt", 
    "Bag", "Wallet", "Purse", "Money", "Coin", 
    "Card", "Ticket", "Passport", "Map", "Compass", 
    "Flag", "Banner", "Sign", "Poster", "Picture", 
    "Painting", "Statue", "Toy", "Doll", "Ball", 
    "Smartwatch", "Drone", "VR Headset", "Game Console", "Controller", 
    "Joystick", "Projector", "Whiteboard", "Marker", "Chalk", 
    "3D Printer", "Telescope", "Microscope", "Binoculars", "Flashlight", 
    "Backpack", "Suitcase", "Luggage Tag", "Umbrella", "Raincoat", 
    "Sunglasses", "Refrigerator", "Oven", "Microwave Oven", "Dishwasher", 
    "Washing Machine", "Dryer", "Vacuum", "Air Conditioner", "Heater", 
    "Thermostat", "Bicycle Pump", "Helmet Light", "Toolbox", "Measuring Tape", 
    "Mug", "Plate", "Bowl", "Fork", "Spoon", 
    "Knife", "Chopsticks", "Pan", "Pot", "Kettle", 
    "Toaster", "Blender", "Mixer", "Cutting Board", "Spatula", 
    "Ladle", "Whisk", "Measuring Cup", "Measuring Spoon", "Strainer", 
    "Colander", "Lunchbox", "Thermos", "Water Bottle", "Cooler", 
    "Ice Tray", "Trash Can", "Recycling Bin", "Broom", "Mop", 
    "Bucket", "Sponge", "Scrub Brush", "Dustpan", "Detergent Bottle", 
    "Soap Dispenser", "Towel", "Napkin", "Tissue", "Toothbrush", 
    "Toothpaste", "Floss", "Shampoo", "Conditioner", "Comb", 
    "Hair Dryer", "Razor", "Lotion", "Sunscreen", "Deodorant", 
    "Nail Clipper", "Hand Mirror", "Hair Tie", "Lunch Bag", "Pencil Case", 
    "Calculator", "Binder", "Folder", "Highlighter", "Glue Stick", 
    "Tape", "Staple Remover", "Push Pin", "Paper Clip", "Clipboard", 
    "Whiteboard Eraser", "Chalkboard", "Bulletin Board", "Calendar", "Alarm Clock", 
    "Nightstand", "Dresser", "Closet", "Hanger", "Laundry Basket", 
    "Clothesline", "Iron", "Ironing Board", "Sewing Kit", "Needle", 
    "Thread", "Button", "Safety Pin", "Tailor's Chalk", "Fabric Scissors", 
    "Yarn", "Knitting Needle", "Paint Brush", "Paint Roller", "Easel", 
    "Canvas", "Palette", "Craft Glue", "Extension Cord", "Power Strip", 
    "Surge Protector", "Battery", "Flash Drive", "Hard Drive", "Router", 
    "Ethernet Cable", "Mouse", "Keyboard", "Mouse Pad", "Monitor", 
    "Printer", "Scanner", "Copier", "Shredder", "Filing Cabinet"
  ],
  Emotions: [
    "Joy", "Sadness", "Anger", "Fear", "Surprise",
    "Disgust", "Trust", "Anticipation", "Relief", "Anxiety",
    "Pride", "Shame", "Guilt", "Embarrassment", "Excitement",
    "Boredom", "Contentment", "Gratitude", "Envy", "Jealousy",
    "Hope", "Despair", "Loneliness", "Love", "Affection",
    "Nostalgia", "Awe", "Curiosity", "Frustration", "Irritation",
    "Calm", "Serenity", "Stress", "Panic", "Compassion",
    "Sympathy", "Empathy", "Confusion", "Doubt", "Determination",
    "Motivation", "Amusement", "Delight", "Triumph", "Regret",
    "Melancholy", "Resentment", "Vulnerability", "Courage", "Confidence",
    "Insecurity", "Wonder", "Tenderness", "Content", "Grief"
  ],
  'College Majors': [
    "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology",
    "Psychology", "Sociology", "Economics", "Political Science", "Philosophy",
    "English", "History", "Art History", "Graphic Design", "Architecture",
    "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering", "Biomedical Engineering",
    "Nursing", "Pre-Med", "Public Health", "Business Administration", "Accounting",
    "Finance", "Marketing", "International Relations", "Anthropology", "Linguistics",
    "Education", "Early Childhood", "Environmental Science", "Geology", "Astronomy",
    "Music", "Theater", "Film Studies", "Journalism", "Communications",
    "Statistics", "Data Science", "Information Systems", "Cybersecurity", "Game Design",
    "Supply Chain", "Human Resources", "Criminal Justice", "Law", "Kinesiology",
    "Nutrition", "Social Work", "Urban Planning", "Neuroscience", "Hospitality"
  ],
  'Red Flags': [
    "Ghosting", "Love Bombing", "Gaslighting", "Jealousy", "Controlling",
    "Silent Treatment", "Constant Lying", "Blame Shifting", "No Accountability", "Insults",
    "Hot and Cold", "Boundary Pushing", "Disrespect", "Manipulation", "Isolation",
    "Financial Secrecy", "Double Standards", "Excessive Criticism", "Explosive Anger", "Stonewalling",
    "Passive Aggressive", "Canceling Plans", "Breadcrumbing", "Inconsistency", "Secretive Phone",
    "Rushing Intimacy", "Ultimatums", "Threats", "Name Calling", "Mocking",
    "Minimizing Feelings", "Invalidation", "No Empathy", "Victim Playing", "Constant Flirting",
    "Cheating", "Lack of Trust", "Unreliable", "Addiction", "Dishonesty",
    "Disappearing Act", "Future Faking", "Jealous Monitoring", "Overly Defensive", "Refuses Apologize",
    "Breaks Promises", "Privacy Invasion", "Guilt Trips", "Tries to Control", "Disrespecting Friends"
  ],
  Animals: [
    "Dog", "Cat", "Horse", "Cow", "Sheep",
    "Goat", "Pig", "Rabbit", "Deer", "Fox",
    "Wolf", "Bear", "Lion", "Tiger", "Leopard",
    "Cheetah", "Elephant", "Giraffe", "Zebra", "Rhino",
    "Hippo", "Kangaroo", "Koala", "Panda", "Monkey",
    "Gorilla", "Chimpanzee", "Otter", "Seal", "Dolphin",
    "Whale", "Shark", "Octopus", "Penguin", "Eagle",
    "Hawk", "Owl", "Parrot", "Flamingo", "Peacock",
    "Turtle", "Snake", "Lizard", "Frog", "Crocodile",
    "Alligator", "Bee", "Butterfly", "Ant", "Ladybug",
    "Horsefly", "Moose", "Bison", "Camel", "Raccoon"
  ],
  Geography: [
    "Mountain", "River", "Lake", "Ocean", "Desert",
    "Peninsula", "Delta", "Archipelago", "Equator", "Prime Meridian",
    "Latitude", "Longitude", "Tundra", "Savanna", "Rainforest",
    "Glacier", "Canyon", "Plateau", "Valley", "Coast",
    "Gulf", "Bay", "Strait", "Island", "Continent",
    "Hemisphere", "Volcano", "Earthquake", "Tectonic Plate", "Fjord",
    "Oasis", "Monsoon", "Climate Zone", "Steppe", "Wetland",
    "Marsh", "Lagoon", "Coral Reef", "Atoll", "Watershed",
    "River Basin", "Estuary", "Capital City", "Border", "Map",
    "Compass Rose", "Scale", "Topography", "Elevation", "Time Zone"
  ]
};
