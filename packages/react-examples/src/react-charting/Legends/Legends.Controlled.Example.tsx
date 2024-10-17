import * as React from 'react';
import { Legends, ILegend, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { Button, Stack } from '@fluentui/react';

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

export const LegendsControlledExample: React.FunctionComponent = () => {
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>([]);

  const onChange = (keys: string[]) => {
    setSelectedLegends(keys);
  };

  return (
    <div>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <Button onClick={() => setSelectedLegends(['Legend 1', 'Legend 3'])}>Select 1 and 3</Button>
        <Button onClick={() => setSelectedLegends(['Legend 2', 'Legend 4'])}>Select 2 and 4</Button>
        <Button onClick={() => setSelectedLegends(legends.map(legend => legend.title))}>Select all</Button>
      </Stack>
      <Legends
        legends={legends}
        canSelectMultipleLegends
        selectedLegends={selectedLegends}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
      />
      Selected legends: {selectedLegends.join(', ')}
    </div>
  );
};
