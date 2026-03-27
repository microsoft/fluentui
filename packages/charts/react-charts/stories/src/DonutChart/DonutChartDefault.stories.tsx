import * as React from 'react';
import {
  DonutChart,
  ChartProps,
  ChartDataPoint,
  DataVizGradientPalette,
  getGradientFromToken,
} from '@fluentui/react-charts';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const DonutChartBasic = (): JSXElement => {
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const points: ChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getGradientFromToken(DataVizGradientPalette.gradient1),
      xAxisCalloutData: '2020/04/30',
    },
    {
      legend: 'second',
      data: 35000,
      color: getGradientFromToken(DataVizGradientPalette.gradient2),
      xAxisCalloutData: '2020/04/20',
    },
  ];

  const data: ChartProps = {
    chartTitle: 'Donut chart basic example',
    chartData: points,
  };
  return (
    <div className="containerDiv">
      <div style={{ marginBottom: '16px' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient ON' : 'Enable Gradient OFF'}
          checked={enableGradient}
          onChange={_onSwitchGradient}
        />
      </div>
      <DonutChart
        culture={typeof window !== 'undefined' ? window.navigator.language : 'en-us'}
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        valueInsideDonut={35000}
        enableGradient={enableGradient}
      />
    </div>
  );
};

DonutChartBasic.parameters = {
  docs: {
    description: {},
  },
};
