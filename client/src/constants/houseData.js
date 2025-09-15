export const HOUSE_NAMES = {
  Gryff: 'Gryffindor',
  Slyth: 'Slytherin',
  Raven: 'Ravenclaw',
  Huff: 'Hufflepuff'
};

export const HOUSE_DESCRIPTIONS = {
  Gryff: 'Known for bravery, daring, nerve, and chivalry. Gryffindor values courage and determination above all.',
  Slyth: 'Values ambition, leadership, cunning, determination, and resourcefulness. Slytherins are known for their strategic minds.',
  Raven: 'Values intelligence, knowledge, curiosity, creativity and wit. Ravenclaws are known for their wisdom and learning.',
  Huff: 'Values hard work, dedication, patience, loyalty, and fair play. Hufflepuffs are known for their strong moral compass.'
};

export const HOUSE_COLORS = {
  Gryff: {
    primary: '#740001',
    text: 'text-gryffindor-primary',
    bg: 'bg-gryffindor-primary/10',
    border: 'border-gryffindor-primary'
  },
  Slyth: {
    primary: '#1A472A',
    text: 'text-slytherin-primary',
    bg: 'bg-slytherin-primary/10',
    border: 'border-slytherin-primary'
  },
  Raven: {
    primary: '#0E1A40',
    text: 'text-ravenclaw-primary',
    bg: 'bg-ravenclaw-primary/10',
    border: 'border-ravenclaw-primary'
  },
  Huff: {
    primary: '#FFD800',
    text: 'text-hufflepuff-primary',
    bg: 'bg-hufflepuff-primary/10',
    border: 'border-hufflepuff-primary'
  }
};

export const HOUSE_ICONS = {
  Gryff: '🦁',
  Slyth: '🐍',
  Raven: '🦅',
  Huff: '🦡'
};

export const TIME_WINDOWS = [
  { id: '5m', label: 'Last 5 Minutes', icon: '⏱️' },
  { id: '1h', label: 'Last Hour', icon: '🕐' },
  { id: 'all', label: 'All Time', icon: '📜' }
];

export const INITIAL_HOUSE_POINTS = {
  Gryff: 0,
  Slyth: 0,
  Raven: 0,
  Huff: 0
};
