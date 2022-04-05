import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@fluentui/react-charting';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 20000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
      { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
    ];

    const data: IChartProps = {
      chartTitle: 'Donut chart basic example',
      chartData: points,
    };
    return (
      <DonutChart
        culture={window.navigator.language}
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={true}
        height={220}
        width={176}
        valueInsideDonut={39000}
      />
    );
  }
}
