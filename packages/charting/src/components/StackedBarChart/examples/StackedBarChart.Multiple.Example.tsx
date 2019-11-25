import * as React from 'react';
import { StackedBarChart, IChartDataPoint, IChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartMultipleExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first Lorem ipsum dolor sit amet', data: 40, color: DefaultPalette.magentaDark },
      { legend: 'Winter is coming', data: 23, color: DefaultPalette.red },
      { legend: 'third Praesent era lectus, molestie vitae mauris eget', data: 35, color: DefaultPalette.blueLight },
      { legend: 'This is the fourth legend of the chart', data: 87, color: DefaultPalette.greenLight }
    ];
    const chartTitle = 'Stacked bar chart 2nd example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points
    };

    return <StackedBarChart data={data} enabledLegendsWrapLines={true} />;
  }
}
