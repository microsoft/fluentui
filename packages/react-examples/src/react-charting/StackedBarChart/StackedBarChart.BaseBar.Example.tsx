import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class StackedBarChartBaseBarExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      { legend: 'first', color: DefaultPalette.blue },
      { legend: 'second', color: DefaultPalette.green },
      { legend: 'third', color: DefaultPalette.red },
      { legend: 'forth', color: DefaultPalette.orange },
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
