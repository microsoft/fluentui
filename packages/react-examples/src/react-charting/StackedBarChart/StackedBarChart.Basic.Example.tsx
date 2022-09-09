import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class StackedBarChartBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 3000000,
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
      },
      { legend: 'second', data: 1, color: DefaultPalette.green },
      { legend: 'third', data: 10, color: DefaultPalette.red },
      { legend: 'fourth', data: 5000, color: DefaultPalette.yellow },
      { legend: 'f', data: 1, color: DefaultPalette.green },
      { legend: 'g', data: 10, color: DefaultPalette.red },
      { legend: 'h', data: 5000, color: DefaultPalette.yellow },
      { legend: 'i', data: 1, color: DefaultPalette.green },
      { legend: 'j', data: 10, color: DefaultPalette.red },
      { legend: 'k', data: 5000, color: DefaultPalette.yellow },
      { legend: 'l', data: 1, color: DefaultPalette.green },
      { legend: 'm', data: 10, color: DefaultPalette.red },
      { legend: 'n', data: 5000, color: DefaultPalette.yellow },
      { legend: 'o', data: 1, color: DefaultPalette.green },
      { legend: 'p', data: 10, color: DefaultPalette.red },
      { legend: 'q', data: 1, color: DefaultPalette.yellow },
      { legend: 'r', data: 1, color: DefaultPalette.green },
      { legend: 's', data: 1, color: DefaultPalette.red },
      { legend: 't', data: 1, color: DefaultPalette.yellow },
    ];

    const data0: IChartProps = {
      chartTitle: 'Stacked Bar chart example',
      chartData: points,
    };

    const data1: IChartProps = {
      chartTitle: 'Stacked Bar chart example with ignore fix style',
      chartData: points,
    };

    return (
      <>
        <StackedBarChart
          culture={window.navigator.language}
          data={data0}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={false}
        />
        <br />
        <StackedBarChart
          culture={window.navigator.language}
          data={data1}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={true}
          hideTooltip={true}
        />
      </>
    );
  }
}
