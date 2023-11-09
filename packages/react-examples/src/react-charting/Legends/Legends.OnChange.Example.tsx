import * as React from 'react';
import { Legends, ILegend, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';

const legends: ILegend[] = [
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
    shape: 'diamond',
  },
  {
    title: 'Legend 4',
    color: getColorFromToken(DataVizPalette.color4),
    shape: 'triangle',
  },
];

export const LegendsOnChangeExample: React.FunctionComponent = () => {
  const defaultSelectedLegends = ['Legend 1', 'Legend 3'];
  const onChange = (keys: string[]) => {
    alert(keys.length ? `Selected: ${keys.join()}` : 'Empty');
  };
  return (
    <Legends
      legends={legends}
      canSelectMultipleLegends={true}
      defaultSelectedLegends={defaultSelectedLegends}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onChange}
    />
  );
};
