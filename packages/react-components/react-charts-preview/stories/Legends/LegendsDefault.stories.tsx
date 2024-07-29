import * as React from 'react';
import { getColorFromToken, DataVizPalette } from '../../src/utilities/colors';
import { ILegend, Legends } from '../../src/Legends';

export const LegendsBasic = () => {
  const legends: ILegend[] = [
    {
      title: 'Legend 1',
      color: getColorFromToken(DataVizPalette.color1),
      action: () => {
        console.log('click from LegendsPage');
        alert('Legend1 clicked');
      },
      onMouseOutAction: () => {
        console.log('On mouse out action');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 2',
      color: getColorFromToken(DataVizPalette.color2),
      action: () => {
        alert('Legend2 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 3',
      color: getColorFromToken(DataVizPalette.color3),
      action: () => {
        alert('Legend3 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 4',
      color: getColorFromToken(DataVizPalette.color4),
      action: () => {
        alert('Legend4 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 5',
      color: getColorFromToken(DataVizPalette.color5),
      action: () => {
        alert('Legend5 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 6',
      color: getColorFromToken(DataVizPalette.color6),
      action: () => {
        alert('Legend6 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 7',
      color: getColorFromToken(DataVizPalette.color7),
      action: () => {
        alert('Legend7 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 8',
      color: getColorFromToken(DataVizPalette.color8),
      action: () => {
        alert('Legend8 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 9',
      color: getColorFromToken(DataVizPalette.color9),
      action: () => {
        alert('Legend9 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 10',
      color: getColorFromToken(DataVizPalette.color10),
      action: () => {
        alert('Legend10 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 11',
      color: getColorFromToken(DataVizPalette.color11),
      action: () => {
        alert('Legend11 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 12',
      color: getColorFromToken(DataVizPalette.color12),
      action: () => {
        alert('Legend12 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 13',
      color: getColorFromToken(DataVizPalette.color13),
      action: () => {
        alert('Legend13 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 14',
      color: getColorFromToken(DataVizPalette.color14),
      action: () => {
        alert('Legend14 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 15',
      color: getColorFromToken(DataVizPalette.color15),
      action: () => {
        alert('Legend15 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
    {
      title: 'Legend 16',
      color: getColorFromToken(DataVizPalette.color16),
      action: () => {
        alert('Legend16 clicked');
      },
      hoverAction: () => {
        console.log('hover action');
      },
    },
  ];
  return <Legends legends={legends} />;
};

LegendsBasic.parameters = {
  docs: {
    description: {
      story: 'Donut Chart Story.',
    },
  },
};
