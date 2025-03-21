import * as React from 'react';
import {
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  VerticalStackedBarChart,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';

export class VerticalStackedBarChartReflowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="containerDiv" key={'id_VBC'}>
        {this._reflowExample()}
      </div>
    );
  }

  private _reflowExample(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 40,
        color: getColorFromToken(DataVizPalette.color11),
      },
      {
        legend: 'Metadata2',
        data: 5,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: 'Metadata3',
        data: 20,
        color: getColorFromToken(DataVizPalette.color6),
      },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 30,
        color: getColorFromToken(DataVizPalette.color11),
      },
      {
        legend: 'Metadata2',
        data: 20,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: 'Metadata3',
        data: 40,
        color: getColorFromToken(DataVizPalette.color6),
      },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 44,
        color: getColorFromToken(DataVizPalette.color11),
      },
      {
        legend: 'Metadata2',
        data: 28,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: getColorFromToken(DataVizPalette.color6),
      },
    ];

    const fourthChartPoints: IVSChartDataPoint[] = [
      {
        legend: 'Metadata1',
        data: 88,
        color: getColorFromToken(DataVizPalette.color11),
      },
      {
        legend: 'Metadata2',
        data: 22,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: 'Metadata3',
        data: 30,
        color: getColorFromToken(DataVizPalette.color6),
      },
    ];

    const data: IVerticalStackedChartProps[] = [
      {
        chartData: firstChartPoints,
        xAxisPoint: 0,
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: 20,
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: 40,
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 60,
      },
      {
        chartData: fourthChartPoints,
        xAxisPoint: 80,
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 100,
      },
    ];

    return <VerticalStackedBarChart data={data} enableReflow={true} />;
  }
}
