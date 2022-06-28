export const twoLayerChart = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    { name: 'Child 1', subname: 'subtext', fill: 'pink' },
    { name: 'Child 2', subname: 'subtext', fill: 'pink' },
    { name: 'Child 3', subname: 'subtext', fill: 'pink' },
    { name: 'Child 4', subname: 'subtext', fill: 'pink' },
  ],
};

export const threeLayerChart = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    {
      name: 'Child 1',
      subname: 'subtext',
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
      name: 'Child 2',
      subname: 'subtext',
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
      name: 'Child 3',
      subname: 'subtext',
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
      name: 'Child 4',
      subname: 'subtext',
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
