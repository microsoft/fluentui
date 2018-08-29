import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '@uifabric/charting/lib/DonutChart';
import { DefaultPalette, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 20, color: DefaultPalette.blue },
      { legend: 'second', data: 39, color: DefaultPalette.red },
      { legend: 'third', data: 25, color: DefaultPalette.yellow },
      { legend: 'fourth', data: 10, color: DefaultPalette.orange },
      { legend: 'five', data: 18, color: DefaultPalette.purpleLight },
      { legend: 'six', data: 20, color: DefaultPalette.tealDark }
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points
    };
    const style = { height: '150px', width: '150px' };
    return (
      <div className={mergeStyles(style)}>
        <DonutChart data={data} innerRadius={30} />
      </div>
    );
  }
}
