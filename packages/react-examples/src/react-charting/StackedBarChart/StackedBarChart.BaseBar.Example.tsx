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
      { legend: 'first', color: getColorFromToken(DataVizPalette.color21) },
      { legend: 'second', color: getColorFromToken(DataVizPalette.color22) },
      { legend: 'third', color: getColorFromToken(DataVizPalette.color23) },
      { legend: 'forth', color: getColorFromToken(DataVizPalette.color24) },
    ];

    const chartTitle = 'Stacked Bar chart example';

    const data: IChartProps = {
      chartTitle,
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
