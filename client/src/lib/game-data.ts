export type Category = 'Math' | 'Physics' | 'Chemistry' | 'Objects';

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

export const CATEGORIES: Category[] = ['Math', 'Physics', 'Chemistry', 'Objects'];

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
    "Standard Dev", "Entropy", "Information Thm", "Turing Machine", "Lambda Calc"
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
    "Bohr", "Planck", "Heisenberg", "Feynman", "Hawking"
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
    "Caffeine", "Nicotine", "Alcohol", "Ethanol", "Methanol"
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
    "Painting", "Statue", "Toy", "Doll", "Ball"
  ]
};
