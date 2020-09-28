import * as React from 'react';
import { ChartHoverCard, DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@uifabric/charting';

export class DonutChartCustomCalloutExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 20000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
      { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points,
    };
    return (
      <DonutChart
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={true}
        height={220}
        width={176}
        valueInsideDonut={39000}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <ChartHoverCard
              XValue={'Custom XVal'}
              Legend={'Custom Legend'}
              YValue={`${props.yAxisCalloutData || props.data} h`}
              color={'red'}
            />
          ) : null
        }
      />
    );
  }
}
