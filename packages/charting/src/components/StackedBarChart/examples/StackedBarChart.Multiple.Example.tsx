import * as React from 'react';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartMultipleExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    const points = [
      { x: 'first Lorem ipsum dolor sit amet', y: 40 },
      { x: 'second', y: 23 },
      { x: 'third Praesent era lectus, molestie vitae mauris eget', y: 35 },
      { x: 'fourth', y: 87 }
    ];
    const colors = [
      DefaultPalette.magentaDark,
      DefaultPalette.green,
      DefaultPalette.greenLight,
      DefaultPalette.magenta
    ];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} colors={colors} />;
  }
}
