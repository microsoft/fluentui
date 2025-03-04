import * as React from 'react';
import {
  StackedBarChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class StackedBarChartBaseBarExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', color: getColorFromToken(DataVizPalette.color1) },
      { legend: 'second', color: getColorFromToken(DataVizPalette.color2) },
      { legend: 'third', color: getColorFromToken(DataVizPalette.color3) },
      { legend: 'forth', color: getColorFromToken(DataVizPalette.color4) },
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle: chartTitle,
      chartData: points,
    };

    return (
      <StackedBarChart
        data={data}
        barBackgroundColor={DefaultPalette.neutralSecondary}
        href={'https://developer.microsoft.com/en-us/'}
      />
    );
  }
}
