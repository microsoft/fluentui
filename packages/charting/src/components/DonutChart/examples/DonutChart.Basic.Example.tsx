import * as React from 'react';
import { DonutChart, IDonutChartProps } from '@uifabric/charting/lib/DonutChart';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class DonutChartBasicExample extends React.Component<IDonutChartProps, {}> {
  constructor(props: IDonutChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const points = [{ y: 50, x: 'A' }, { y: 25, x: 'B' }, { y: 25, x: 'C' }];
    const colors = [DefaultPalette.red, DefaultPalette.blueLight, DefaultPalette.greenLight];
    return <DonutChart data={points} colors={colors} />;
  }
}
