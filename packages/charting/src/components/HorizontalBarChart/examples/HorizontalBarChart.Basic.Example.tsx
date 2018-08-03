import * as React from 'react';
import { HorizontalBarChart, IHorizontalBarChartProps } from '@uifabric/charting/lib/HorizontalBarChart';
import { customizable } from 'office-ui-fabric-react/lib/Utilities';
@customizable('HorizontalBarChartBasicExample', ['theme', 'styles'])
export class HorizontalBarChartBasicExample extends React.Component<IHorizontalBarChartProps, {}> {
  constructor(props: IHorizontalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        {this._basicExample()}
        <hr />
        {this._styledExample()}
      </div>
    );
  }

  private _basicExample(): JSX.Element {
    const points = [
      { x: 7, y: 0 },
      { x: 6, y: 18 },
      { x: 12, y: 36 },
      { x: 21, y: 20 },
      { x: 29, y: 46 },
      { x: 34, y: 25 },
      { x: 40, y: 13 },
      { x: 48, y: 43 },
      { x: 57, y: 30 },
      { x: 64, y: 45 },
      { x: 72, y: 12 },
      { x: 78, y: 50 },
      { x: 85, y: 25 },
      { x: 90, y: 43 },
      { x: 96, y: 22 },
      { x: 100, y: 19 }
    ];

    return <HorizontalBarChart data={points} chartLabel={'Basic Chart with Numeric Axes'} />;
  }

  private _styledExample(): JSX.Element {
    const { theme } = this.props;
    const { palette, fonts } = theme!;

    const points = [
      { x: 'One', y: 20 },
      { x: 'Two', y: 48 },
      { x: 'Three', y: 30 },
      { x: 'Four', y: 40 },
      { x: 'Five', y: 13 },
      { x: 'Six', y: 60 },
      { x: 'Seven', y: 60 },
      { x: 'Eight', y: 57 },
      { x: 'Nine', y: 14 },
      { x: 'Ten', y: 35 },
      { x: 'Eleven', y: 21 },
      { x: 'Twelve', y: 60 },
      { x: 'Thirteen', y: 60 },
      { x: 'Fourteen', y: 52 },
      { x: 'Fifteen', y: 23 }
    ];

    const axisStyle = {
      stroke: palette.orange
    };
    const textStyle = {
      fill: palette.orangeLight,
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

    const customColors = [palette.greenLight, palette.green, palette.greenDark];

    return (
      <HorizontalBarChart
        data={points}
        width={800}
        height={400}
        barHeight={15}
        yAxisTickCount={6}
        styles={customStyles}
        colors={customColors}
        chartLabel={'Chart with Axis Labels and Custom Styles'}
      />
    );
  }
}
