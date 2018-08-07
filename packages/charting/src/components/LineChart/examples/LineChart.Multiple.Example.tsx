import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { customizable } from 'office-ui-fabric-react/lib/Utilities';
import { IDataPoint } from '@uifabric/charting/lib/types/IDataPoint';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

@customizable('HorizontalBarChartBasicExample', ['theme', 'styles'])
export class LineChartMultipleExample extends React.Component<ILineChartProps, {}> {
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
        { x: 0, y: 10 },
        { x: 5, y: 18 },
        { x: 10, y: 24 },
        { x: 15, y: 25 },
        { x: 20, y: 15 },
        { x: 25, y: 30 },
        { x: 30, y: 18 },
        { x: 35, y: 32 },
        { x: 40, y: 29 },
        { x: 45, y: 43 },
        { x: 50, y: 45 }
      ],
      [
        { x: 0, y: 18 },
        { x: 5, y: 20 },
        { x: 10, y: 40 },
        { x: 15, y: 30 },
        { x: 20, y: 18 },
        { x: 22, y: 20 },
        { x: 35, y: 40 },
        { x: 40, y: 30 },
        { x: 42, y: 18 },
        { x: 43, y: 20 },
        { x: 45, y: 40 },
        { x: 50, y: 30 }
      ],
      [
        { x: 0, y: 20 },
        { x: 5, y: 15 },
        { x: 10, y: 30 },
        { x: 15, y: 35 },
        { x: 20, y: 30 },
        { x: 22, y: 15 },
        { x: 35, y: 30 },
        { x: 40, y: 27 },
        { x: 42, y: 29 },
        { x: 43, y: 35 },
        { x: 45, y: 40 },
        { x: 50, y: 42 }
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

    const colors = [DefaultPalette.blue, DefaultPalette.green, DefaultPalette.red];

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
