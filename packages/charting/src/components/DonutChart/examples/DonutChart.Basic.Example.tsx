import * as React from 'react';
import { DonutChart, IDonutChartProps, IChartProps, IChartDataPoint } from '../../DonutChart';
import { DefaultPalette, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 20, color: DefaultPalette.blue },
      { legend: 'second', data: 20, color: DefaultPalette.red },
      { legend: 'third', data: 20, color: DefaultPalette.blue },
      { legend: 'fourth', data: 20, color: DefaultPalette.red },
      { legend: 'five', data: 20, color: DefaultPalette.blue },
      { legend: 'six', data: 20, color: DefaultPalette.red }
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points
    };
    const style = { border: '1px solid black', height: '250px', width: '299px' };
    return (
      <div className={mergeStyles(style)}>
        <DonutChart data={data} innerRadius={40} />
      </div>
    );
  }
}
