export const mockGraphData = {
  nodes: [
    { id: 'S1', name: 'Alice Johnson', type: 'student', group: 1, val: 20 },
    { id: 'S2', name: 'Bob Smith', type: 'student', group: 1, val: 20 },
    { id: 'S3', name: 'Charlie Davis', type: 'student', group: 1, val: 20 },
    { id: 'SK1', name: 'Machine Learning', type: 'skill', group: 2, val: 25 },
    { id: 'SK2', name: 'NLP', type: 'skill', group: 2, val: 25 },
    { id: 'SK3', name: 'Computer Vision', type: 'skill', group: 2, val: 25 },
    { id: 'P1', name: 'Intelligent Tutoring System', type: 'project', group: 3, val: 30 },
    { id: 'P2', name: 'Medical Imaging AI', type: 'project', group: 3, val: 30 },
    { id: 'PUB1', name: 'Transformers in Education', type: 'publication', group: 4, val: 15 },
    { id: 'PUB2', name: 'CNNs for X-Ray Analysis', type: 'publication', group: 4, val: 15 },
  ],
  links: [
    { source: 'S1', target: 'SK1' },
    { source: 'S1', target: 'SK2' },
    { source: 'S2', target: 'SK1' },
    { source: 'S2', target: 'SK3' },
    { source: 'S3', target: 'SK2' },
    { source: 'SK1', target: 'P1' },
    { source: 'SK2', target: 'P1' },
    { source: 'SK3', target: 'P2' },
    { source: 'SK1', target: 'P2' },
    { source: 'P1', target: 'PUB1' },
    { source: 'P2', target: 'PUB2' },
  ]
};

export const mockSearchResults = [
  {
    id: 1,
    title: "Advancements in Transformer Models",
    type: "publication",
    description: "A comprehensive study on the evolution of transformer architectures in natural language processing.",
    relatedResearchers: ["Alice Johnson", "Charlie Davis"]
  },
  {
    id: 2,
    title: "AI in Healthcare: Diagnostic Tools",
    type: "project",
    description: "Developing automated systems for early detection of respiratory diseases using chest X-rays.",
    relatedResearchers: ["Bob Smith", "Dr. Sarah Lee"]
  },
  {
    id: 3,
    title: "Neural Language Processing for Education",
    type: "project",
    description: "Using LLMs to provide personalized feedback to students in entry-level computer science courses.",
    relatedResearchers: ["Alice Johnson"]
  }
];

export const mockRecommendations = [
  {
    id: 101,
    name: "Dr. Elena Rodriguez",
    expertise: "Deep Learning & Audio Processing",
    projects: ["SoundSense AI", "EchoLocation Research"],
    skills: ["PyTorch", "Signal Processing", "CNNs"]
  },
  {
    id: 102,
    name: "James Wilson",
    expertise: "Knowledge Graphs & Semantic Web",
    projects: ["EduGraph", "Knowledge Miner"],
    skills: ["SPARQL", "Neo4j", "Python"]
  },
  {
    id: 103,
    name: "Samantha Chang",
    expertise: "Human-Computer Interaction",
    projects: ["Adaptive Interfaces", "Inclusive Design"],
    skills: ["React", "UX Research", "Accessibility"]
  }
];

export const mockTrends = {
  skills: [
    { name: 'Python', count: 85 },
    { name: 'PyTorch', count: 64 },
    { name: 'NLP', count: 52 },
    { name: 'Computer Vision', count: 48 },
    { name: 'Data Science', count: 72 },
    { name: 'React', count: 35 },
  ],
  activity: [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 18 },
    { month: 'Mar', count: 25 },
    { month: 'Apr', count: 22 },
    { month: 'May', count: 30 },
    { month: 'Jun', count: 45 },
    { month: 'Jul', count: 50 },
  ]
};
