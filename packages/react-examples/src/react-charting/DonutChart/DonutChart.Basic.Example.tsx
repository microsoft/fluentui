import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { mergeStyles } from '@fluentui/merge-styles';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 20000, color: '#0099BC', xAxisCalloutData: '2020/04/30' },
      { legend: 'second', data: 39000, color: '#77004D', xAxisCalloutData: '2020/04/20' },
    ];

    const data: IChartProps = {
      chartTitle: 'Donut chart basic example',
      chartData: points,
    };

    const className = mergeStyles({
      '#donut-string-id': {
        fontSize: '28px',
      },
    });

    return (
      <div className={className}>
        <DonutChart
          culture={window.navigator.language}
          data={data}
          innerRadius={64}
          href={'https://developer.microsoft.com/en-us/'}
          legendsOverflowText={'overflow Items'}
          hideLegend={true}
          height={220}
          width={176}
          valueInsideDonut={39000}
        />
      </div>
    );
  }
}
