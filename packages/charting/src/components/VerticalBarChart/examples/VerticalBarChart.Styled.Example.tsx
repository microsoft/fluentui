import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps } from '@uifabric/charting';
import { DefaultPalette, DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

interface IRootStyles {
  height: string;
  width: string;
}

export class VerticalBarChartStyledExample extends React.Component<IVerticalBarChartProps, {}> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
  }

  public render(): JSX.Element {
    const rootStyle: IRootStyles = { width: '800px', height: '400px' };
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
      { x: 'Elven', y: 20 },
      { x: 'Twelve', y: 44 },
      { x: 'Thirteen', y: 33 },
    ];

    const axisStyle = {
      stroke: DefaultPalette.orange,
    };
    const textStyle = {
      fill: DefaultPalette.orangeLight,
      fontSize: '12px',
    };

    const customStyles = () => {
      return {
        chart: {
          paddingBottom: '45px',
        },
        chartLabel: {
          color: DefaultPalette.orange,
          ...DefaultFontStyles.large,
        },
        xAxisDomain: axisStyle,
        xAxisTicks: axisStyle,
        yAxisDomain: axisStyle,
        yAxisTicks: axisStyle,
        yAxisText: textStyle,
      };
    };

    const customColors = [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark];

    return (
      <div className={mergeStyles(rootStyle)}>
        <VerticalBarChart
          data={points}
          width={800}
          height={400}
          barWidth={20}
          yAxisTickCount={6}
          styles={customStyles}
          colors={customColors}
          hideLegend={true}
          hideTooltip={true}
        />
      </div>
    );
  }
}
