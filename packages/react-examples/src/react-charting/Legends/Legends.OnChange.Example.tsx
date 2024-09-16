import * as React from 'react';
import { Legends, ILegend, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

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
  const [isMulti, { toggle: toggleIsMulti }] = useBoolean(true);

  const onChange = (keys: string[]) => {
    alert(keys.length ? `Selected: ${keys.join()}` : 'Empty');
  };
  return (
    <div>
      <Toggle
        label="Can select multiple legends"
        onText="Multiple"
        offText="Single"
        checked={isMulti}
        onChange={toggleIsMulti}
      />
      <Legends
        legends={legends}
        canSelectMultipleLegends={isMulti}
        defaultSelectedLegends={defaultSelectedLegends}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
      />
    </div>
  );
};
