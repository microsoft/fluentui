/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Legends, Legend, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';
import { Button } from '@fluentui/react-components';

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
    shape: 'diamond',
  },
  {
    title: 'Legend 4',
    color: getColorFromToken(DataVizPalette.color4),
    shape: 'triangle',
  },
];
export const LegendsControlled = (): JSXElement => {
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);

  const onChange = (keys: string[]) => {
    setSelectedLegends(keys);
  };

  const handleSelect1And3 = () => {
    setSelectedLegends(['Legend 1', 'Legend 3']);
  };

  const handleSelect2And4 = () => {
    setSelectedLegends(['Legend 2', 'Legend 4']);
  };

  const handleSelectAll = () => {
    setSelectedLegends(legends.map(legend => legend.title));
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 15,
        }}
      >
        <Button onClick={handleSelect1And3}>Select 1 and 3</Button>
        <Button onClick={handleSelect2And4}>Select 2 and 4</Button>
        <Button onClick={handleSelectAll}>Select all</Button>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Legends
          legends={legends}
          canSelectMultipleLegends
          selectedLegends={selectedLegends}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChange}
        />
      </div>
      Selected legends: {selectedLegends.join(', ')}
    </div>
  );
};
LegendsControlled.parameters = {
  docs: {
    description: {},
  },
};
