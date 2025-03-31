/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Legends, ILegend, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { DefaultButton, Stack } from '@fluentui/react';

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
      <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginBottom: 15 } }}>
        <DefaultButton onClick={handleSelect1And3}>Select 1 and 3</DefaultButton>
        <DefaultButton onClick={handleSelect2And4}>Select 2 and 4</DefaultButton>
        <DefaultButton onClick={handleSelectAll}>Select all</DefaultButton>
      </Stack>
      <Legends
        legends={legends}
        canSelectMultipleLegends
        selectedLegends={selectedLegends}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        styles={{ root: { marginBottom: 10 } }}
      />
      Selected legends: {selectedLegends.join(', ')}
    </div>
  );
};
