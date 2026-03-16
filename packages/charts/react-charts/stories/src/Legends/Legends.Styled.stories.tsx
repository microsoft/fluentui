import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Legend, Legends, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';

export const LegendsStyled = (): JSXElement => {
  const legends: Legend[] = [
    {
      title: 'Legend 1',
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      title: 'Legend 2',
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      title: 'Legend 3',
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      title: 'Legend 4',
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      title: 'Legend 5',
      color: getColorFromToken(DataVizPalette.color5),
    },
    {
      title: 'Legend 6',
      color: getColorFromToken(DataVizPalette.color6),
    },
    {
      title: 'Legend 7',
      color: getColorFromToken(DataVizPalette.color7),
    },
    {
      title: 'Legend 8',
      color: getColorFromToken(DataVizPalette.color8),
    },
    {
      title: 'Legend 9',
      color: getColorFromToken(DataVizPalette.color9),
    },
    {
      title: 'Legend 10',
      color: getColorFromToken(DataVizPalette.color10),
    },
    {
      title: 'Legend 11',
      color: getColorFromToken(DataVizPalette.color11),
    },
    {
      title: 'Legend 12',
      color: getColorFromToken(DataVizPalette.color12),
    },
    {
      title: 'Legend 13',
      color: getColorFromToken(DataVizPalette.color13),
    },
    {
      title: 'Legend 14',
      color: getColorFromToken(DataVizPalette.color14),
    },
    {
      title: 'Legend 15',
      color: getColorFromToken(DataVizPalette.color15),
    },
    {
      title: 'Legend 16',
      color: getColorFromToken(DataVizPalette.color16),
    },
    {
      title: 'Legend 17',
      color: getColorFromToken(DataVizPalette.color17),
    },
  ];

  return (
    <Legends
      legends={legends}
      overflowText={'Overflow Items'}
      allowFocusOnLegends={true}
      canSelectMultipleLegends={false}
    />
  );
};

LegendsStyled.parameters = {
  docs: {
    description: {},
  },
};
