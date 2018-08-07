import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { customizable } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
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
      ],
      [
        { x: 'One', y: 7 },
        { x: 'Two', y: 12 },
        { x: 'Three', y: 7 },
        { x: 'Four', y: 22 },
        { x: 'Five', y: 20 },
        { x: 'Six', y: 7 },
        { x: 'Seven', y: 12 },
        { x: 'Eight', y: 7 },
        { x: 'Nine', y: 22 },
        { x: 'Ten', y: 20 }
      ],
      [
        { x: 'One', y: 9 },
        { x: 'Two', y: 14 },
        { x: 'Three', y: 9 },
        { x: 'Four', y: 24 },
        { x: 'Five', y: 22 },
        { x: 'Six', y: 9 },
        { x: 'Seven', y: 14 },
        { x: 'Eight', y: 9 },
        { x: 'Nine', y: 24 },
        { x: 'Ten', y: 22 }
      ],
      [
        { x: 'One', y: 11 },
        { x: 'Two', y: 16 },
        { x: 'Three', y: 11 },
        { x: 'Four', y: 26 },
        { x: 'Five', y: 24 },
        { x: 'Six', y: 11 },
        { x: 'Seven', y: 16 },
        { x: 'Eight', y: 11 },
        { x: 'Nine', y: 26 },
        { x: 'Ten', y: 20 }
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

    const colors = ['#FF5733', '#176213', '#193BBD', '#FF0000'];

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
