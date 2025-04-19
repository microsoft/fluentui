import * as React from 'react';
import { DonutChart, ChartProps, getColorFromToken, DataVizPalette } from '@fluentui/react-charts';
import { Switch } from '@fluentui/react-components';

export const DonutChartBasic = () => {
  const [selectMultipleLegends, setSelectMultipleLegends] = React.useState<boolean>(false);

  const points = [
    { legend: 'first', data: 20000, color: getColorFromToken(DataVizPalette.color1), xAxisCalloutData: '2020/04/30' },
    {
      legend: 'second',
      data: 35000,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/20',
    },
    {
      legend: 'third',
      data: 10000,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/10',
    },
    {
      legend: 'fourth',
      data: 15000,
      color: getColorFromToken(DataVizPalette.color4),
      xAxisCalloutData: '2020/04/05',
    },
    {
      legend: 'fifth',
      data: 5000,
      color: getColorFromToken(DataVizPalette.color5),
      xAxisCalloutData: '2020/04/01',
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };

  const _onToggleMultiLegendSelection = React.useCallback(ev => {
    setSelectMultipleLegends(ev.currentTarget.checked);
  }, []);

  return (
    <>
      <Switch
        label="Select Multiple Legends"
        checked={selectMultipleLegends}
        onChange={_onToggleMultiLegendSelection}
        style={{ marginBottom: '10px' }}
      />
      <DonutChart
        culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        valueInsideDonut={35000}
        legendProps={{
          canSelectMultipleLegends: selectMultipleLegends, // Pass the toggle state
        }}
      />
    </>
  );
};

DonutChartBasic.parameters = {
  docs: {
    description: {},
  },
};
