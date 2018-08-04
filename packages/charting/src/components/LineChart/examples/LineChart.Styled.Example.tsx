import * as React from 'react';
import { LineChart, ILineChartProps } from '@uifabric/charting/lib/LineChart';
import { customizable } from 'office-ui-fabric-react/lib/Utilities';
@customizable('LineChartStyledExample', ['theme', 'styles'])
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
      { x: 'Fifteen', y: 23 },
      { x: 'Sixteen', y: 14 },
      { x: 'Seventeen', y: 11 },
      { x: 'Eighteen', y: 50 },
      { x: 'Nineteen', y: 43 },
      { x: 'Twenty', y: 20 }
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

    const customColor = 'green';

    return (
      <LineChart
        data={points}
        width={900}
        height={500}
        yAxisTickCount={6}
        styles={customStyles}
        color={customColor}
        chartLabel={'Chart with Axis Labels and Custom Styles'}
        strokeWidth={4}
      />
    );
  }
}
