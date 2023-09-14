import * as React from 'react';
import { StackedBarChart, IChartDataPoint, IChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class StackedBarChartMultipleExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'This is the first legend of the chart', data: 40, color: DefaultPalette.magentaDark },
      { legend: 'This is the second legend of the chart', data: 23, color: DefaultPalette.red },
      {
        legend: 'This is the third legend of the chart',
        data: 35,
        color: DefaultPalette.blueLight,
      },
      { legend: 'This is the fourth legend of the chart', data: 87, color: DefaultPalette.greenLight },
    ];
    const chartTitle = 'Stacked bar chart 2nd example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points,
    };

    return <StackedBarChart data={data} enabledLegendsWrapLines={true} />;
  }
}
