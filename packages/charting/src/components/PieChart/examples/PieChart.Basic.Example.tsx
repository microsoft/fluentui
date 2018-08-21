import * as React from 'react';
import { PieChart, IPieChartProps } from '@uifabric/charting/lib/PieChart';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class PieChartBasicExample extends React.Component<IPieChartProps, {}> {
  constructor(props: IPieChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points = [{ y: 50, x: 'A' }, { y: 25, x: 'B' }, { y: 25, x: 'C' }];
    const colors = [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green];
    return <PieChart data={points} chartTitle="Pie Chart" colors={colors} />;
  }
}
