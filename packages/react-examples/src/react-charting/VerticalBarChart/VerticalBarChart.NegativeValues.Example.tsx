import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '@fluentui/react-charting';

export class VerticalBarChartNegativeValuesExample extends React.Component<IVerticalBarChartProps> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: 1,
        y: 20,
      },
      {
        x: 2,
        y: -20,
      },
      {
        x: 3,
        y: -28,
      },
      {
        x: 4,
        y: 40,
      },
      {
        x: 5,
        y: 60,
      },
      {
        x: 6,
        y: -48,
      },
      {
        x: 7,
        y: -4,
      },
      {
        x: 8,
        y: 50,
      },
    ];

    return (
      <div style={{ width: '600px', height: '400px' }}>
        <VerticalBarChart
          chartTitle="Vertical bar chart Negative Values example "
          data={points}
          width={600}
          height={400}
          barWidth={20}
          hideLegend={true}
          enableReflow={true}
          supportNegativeYValues={true}
        />
      </div>
    );
  }
}
