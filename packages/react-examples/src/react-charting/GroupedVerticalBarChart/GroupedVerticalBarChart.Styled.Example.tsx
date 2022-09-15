import * as React from 'react';
import { GroupedVerticalBarChart, IGroupedVerticalBarChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface IGroupedBarChartState {
  width: number;
  height: number;
}

export class GroupedVerticalBarChartStyledExample extends React.Component<{}, IGroupedBarChartState> {
  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _basicExample(): JSX.Element {
    const data = [
      {
        name: '2000',
        series: [
          {
            key: 'series1',
            data: 66,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 13,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 34,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
        ],
      },
      {
        name: '2010',
        series: [
          {
            key: 'series1',
            data: 14,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 90,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 33,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
        ],
      },
      {
        name: '2020',
        series: [
          {
            key: 'series1',
            data: 54,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.accent,
            legend: 'MetaData1',
          },
          {
            key: 'series2',
            data: 72,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.blueMid,
            legend: 'MetaData2',
          },
          {
            key: 'series3',
            data: 18,
            xAxisCalloutData: '2020/04/30',
            color: DefaultPalette.blueLight,
            legend: 'MetaData3',
          },
        ],
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <>
        <label htmlFor="changeWidth_Styled">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Styled"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Styled">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Styled"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart styled example"
            data={data}
            width={this.state.width}
            height={this.state.height}
            showYAxisGridLines
            yAxisTickCount={10}
            barwidth={43}
          />
        </div>
      </>
    );
  }
}
