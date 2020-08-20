import * as React from 'react';
import { VerticalStackedBarChart } from '@uifabric/charting';
import { IVSChartDataPoint, IVerticalStackedChartProps } from '@uifabric/charting';
import { DefaultPalette, DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class VerticalStackedBarChartStyledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 15, color: DefaultPalette.blueLight },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 30, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 3, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'Jan' },
      { chartData: secondChartPoints, xAxisPoint: 'Feb month' },
      { chartData: thirdChartPoints, xAxisPoint: 'March' },
      { chartData: firstChartPoints, xAxisPoint: 'I am April Moanth and Iam long text' },
      { chartData: thirdChartPoints, xAxisPoint: 'May' },
      { chartData: firstChartPoints, xAxisPoint: 'June' },
      { chartData: secondChartPoints, xAxisPoint: 'July' },
      { chartData: thirdChartPoints, xAxisPoint: 'August Month 2020' },
      { chartData: firstChartPoints, xAxisPoint: 'September' },
    ];

    const textStyle = {
      fill: DefaultPalette.black,
      fontSize: '10px',
      lineHeight: '14px',
    };

    const customStyles = () => {
      return {
        chart: {
          paddingBottom: '45px',
        },
        chartLabel: {
          color: DefaultPalette.blueMid,
          ...DefaultFontStyles.large,
        },
        xAxisText: {
          ...textStyle,
        },
      };
    };
    const rootStyle = mergeStyles({ width: '600px', height: '350px' });
    return (
      <div className={rootStyle}>
        <VerticalStackedBarChart
          data={data}
          height={350}
          width={600}
          yAxisTickCount={10}
          href={'www.google.com'}
          // eslint-disable-next-line react/jsx-no-bind
          styles={customStyles}
          chartLabel="Card title"
          wrapXAxisLables
        />
        <VerticalStackedBarChart
          data={data}
          height={350}
          width={600}
          yAxisTickCount={10}
          href={'www.google.com'}
          // eslint-disable-next-line react/jsx-no-bind
          styles={customStyles}
          chartLabel="Card title"
          showXAxisLablesTooltip
          noOfCharsToTruncate={8}
          XAxistickPadding={4}
        />
      </div>
    );
  }
}
