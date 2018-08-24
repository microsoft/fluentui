import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@uifabric/charting/lib/DonutChart';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 40, color: DefaultPalette.blue },
      { legend: 'second', data: 20, color: DefaultPalette.red }
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points
    };
    return <DonutChart data={data} innerRadius={40} />;
  }
}
