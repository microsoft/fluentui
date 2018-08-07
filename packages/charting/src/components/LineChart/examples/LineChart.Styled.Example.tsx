import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { customizable } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

@customizable('HorizontalBarChartBasicExample', ['theme', 'styles'])
export class LineChartStyledExample extends React.Component<ILineChartProps, {}> {
  constructor(props: ILineChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._styledExample()}</div>;
  }

  private _styledExample(): JSX.Element {
    const { theme } = this.props;
    const { palette, fonts } = theme!;

    const points: IDataPoint[][] = [
      [
        { x: 'One', y: 5 },
        { x: 'Two', y: 10 },
        { x: 'Three', y: 5 },
        { x: 'Four', y: 20 },
        { x: 'Five', y: 18 },
        { x: 'Six', y: 5 },
        { x: 'Seven', y: 10 },
        { x: 'Eight', y: 5 },
        { x: 'Nine', y: 20 },
        { x: 'Ten', y: 18 }
      ]
    ];

    const axisStyle = {
      stroke: palette.purpleDark
    };
    const textStyle = {
      fill: palette.purpleDark,
      fontSize: '12px'
    };

    const customStyles = () => {
      return {
        chart: {
          paddingBottom: '45px'
        },
        chartLabel: {
          color: palette.orange,
          ...fonts.large
        },
        xAxisDomain: axisStyle,
        xAxisTicks: axisStyle,
        xAxisText: {
          transform: 'rotateZ(-40deg)',
          textAnchor: 'end',
          ...textStyle
        },
        yAxisDomain: axisStyle,
        yAxisTicks: axisStyle,
        yAxisText: textStyle
      };
    };

    const colors = [DefaultPalette.blue];

    return (
      <LineChart
        data={points}
        width={900}
        height={500}
        yAxisTickCount={6}
        styles={customStyles}
        colors={colors}
        chartLabel={'Chart with Axis Labels and Custom Styles'}
        strokeWidth={4}
      />
    );
  }
}
