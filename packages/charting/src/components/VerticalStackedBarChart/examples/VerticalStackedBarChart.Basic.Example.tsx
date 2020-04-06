import * as React from 'react';
import { VerticalStackedBarChart } from '@uifabric/charting/lib/VerticalStackedBarChart';
import { IVSChartDataPoint, IVerticalStackedChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackedBarChartBasicExample extends React.Component<Readonly<{}>, {}> {
  public render(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 50, color: DefaultPalette.blueLight },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 30, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 30, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 0 },
      { chartData: secondChartPoints, xAxisPoint: 45 },
      { chartData: thirdChartPoints, xAxisPoint: 80 },
      { chartData: firstChartPoints, xAxisPoint: 100 },
    ];

    return <VerticalStackedBarChart data={data} chartLabel="Card title" />;
  }
}
