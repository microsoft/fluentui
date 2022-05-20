import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@fluentui/react-charting';

export class DonutChartCustomAccessibilityExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 20000,
        color: '#E5E5E5',
        xAxisCalloutData: '2020/04/30',
        callOutAccessibilityData: { ariaLabel: 'Pia chart 1 of 2 2020/04/30' },
      },
      {
        legend: 'second',
        data: 39000,
        color: '#0078D4',
        xAxisCalloutData: '2020/04/20',
        callOutAccessibilityData: { ariaLabel: 'Pia chart 2 of 2 2020/04/20' },
      },
    ];

    const data: IChartProps = {
      chartTitle: 'Donut chart custom accessibility example',
      chartData: points,
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about Donut chart' },
    };
    return (
      <DonutChart
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        width={176}
        valueInsideDonut={39000}
      />
    );
  }
}
