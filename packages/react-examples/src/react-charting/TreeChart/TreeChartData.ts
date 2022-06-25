export const twoLayerChart = {
  name: 'University',
  subname: 'VIT Vellore',
  fill: '#0099BC',
  children: [
    {
      name: 'Professor',
      subname: 'subtext',
      fill: 'pink',
    },
    { name: 'Student', subname: 'subtext', fill: 'pink' },
    { name: 'Placement', subname: 'subtext', fill: 'pink' },
    {
      name: 'Management',
      subname: 'subtext',
      fill: 'pink',
    },
  ],
};

export const threeLayerChart = {
  name: 'University',
  subname: 'sub-text',
  fill: '#0099BC',
  children: [
    {
      name: 'Professor',
      subname: 'sub-text',
      fill: 'pink',
      children: [
        {
          name: 'leaf1',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf2',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf3',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf4',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
    {
      name: 'Student',
      subname: 'sub-text',
      fill: 'pink',
      children: [
        {
          name: 'leaf5',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf6',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
    {
      name: 'Management',
      subname: 'sub-text',
      fill: 'pink',
      children: [
        {
          name: 'leaf7',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf8',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf9',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
    {
      name: 'Placement',
      subname: 'sub-text',
      fill: 'pink',
      children: [
        {
          name: 'leaf10',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
  ],
};
