import * as React from 'react';
import { StackedBarChart, IStackedBarChartProps } from '@uifabric/charting/lib/StackedBarChart';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class StackedBarChartBasicExample extends React.Component<IStackedBarChartProps, {}> {
  public render(): JSX.Element {
    const points = [{ x: 'first', y: 40 }, { x: 'second', y: 23 }];
    const colors = [DefaultPalette.magentaDark, DefaultPalette.green];

    return <StackedBarChart data={points} chartTitle={'Stacked Bar chart'} colors={colors} />;
  }
}
