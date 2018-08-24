import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting/lib/VerticalBarChart';
import { DefaultPalette, DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

export class VerticalBarChartStyledExample extends React.Component<IVerticalBarChartProps, {}> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
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
      stroke: DefaultPalette.orange
    };
    const textStyle = {
      fill: DefaultPalette.orangeLight,
      fontSize: '12px'
    };

    const customStyles = () => {
      return {
        chart: {
          paddingBottom: '45px'
        },
        chartLabel: {
          color: DefaultPalette.orange,
          ...DefaultFontStyles.large
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

    const customColors = [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark];

    return (
      <VerticalBarChart
        data={points}
        width={800}
        height={400}
        barWidth={20}
        yAxisTickCount={6}
        styles={customStyles}
        colors={customColors}
        chartLabel={'Chart with Axis Labels and Custom Styles'}
      />
    );
  }
}
