import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartBenchmarkExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', data: 10, color: DefaultPalette.redDark },
      { data: 90, color: DefaultPalette.neutralTertiaryAlt, placeHolder: true }
    ];

    const data: IChartProps = {
      chartData: points
    };

    const benchmarkData1: IChartDataPoint = {
      legend: 'Benchmark',
      data: 20
    };

    const benchmarkData2: IChartDataPoint = {
      legend: 'Benchmark',
      data: 10
    };

    const targetData: IChartDataPoint = {
      legend: 'Your target',
      data: 50
    };

    return (
      <>
        <StackedBarChart data={data} benchmarkData={benchmarkData1} ignoreFixStyle={true} />
        <br />
        <StackedBarChart data={data} benchmarkData={benchmarkData2} targetData={targetData} ignoreFixStyle={true} />
      </>
    );
  }
}
