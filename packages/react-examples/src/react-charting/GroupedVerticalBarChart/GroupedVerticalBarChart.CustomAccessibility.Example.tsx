import * as React from 'react';
import {
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  IGroupedVerticalBarChartData,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

interface IGroupedBarChartState {
  width: number;
  height: number;
  selectedCallout: 'singleCallout' | 'StackCallout';
}

export class GroupedVerticalBarChartCustomAccessibilityExample extends React.Component<{}, IGroupedBarChartState> {
  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
      selectedCallout: 'singleCallout',
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

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    this.setState({ selectedCallout: option.key as IGroupedBarChartState['selectedCallout'] });
  };

  private _basicExample(): JSX.Element {
    const data: IGroupedVerticalBarChartData[] = [
      {
        name: 'Metadata info multi lines text Completed',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color10),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '29%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 1 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 29%',
            },
          },
          {
            key: 'series2',
            data: 44000,
            color: getColorFromToken(DataVizPalette.color11),
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '44%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 x-Axis 2020/04/30 MetaData4 44%',
            },
          },
        ],
        stackCallOutAccessibilityData: {
          ariaLabel: 'Group series 1 of 4 x-Axis 2020/04/30 MetaData1 33% MetaData4 44%',
        },
      },
      {
        name: 'Data Point2',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color10),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '29%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 2 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 29%',
            },
          },
          {
            key: 'series2',
            data: 3000,
            color: getColorFromToken(DataVizPalette.color11),
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 x-Axis 2020/04/30 MetaData4 3%',
            },
          },
        ],
        stackCallOutAccessibilityData: {
          ariaLabel: 'Group series 2 of 4 x-Axis 2020/04/30 MetaData1 33% MetaData4 3%',
        },
      },
      {
        name: 'Single line text ',
        series: [
          {
            key: 'series1',
            data: 14000,
            color: getColorFromToken(DataVizPalette.color10),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '13%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 3 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 13%',
            },
          },
          {
            key: 'series2',
            data: 50000,
            color: getColorFromToken(DataVizPalette.color11),
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '50%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 x-Axis 2020/04/30 MetaData4 50%',
            },
          },
        ],
        stackCallOutAccessibilityData: {
          ariaLabel: 'Group series 3 of 4 x-Axis 2020/04/30 MetaData1 14% MetaData4 50%',
        },
      },
      {
        name: 'Hello World!!!',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color10),
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '29%',
            callOutAccessibilityData: {
              ariaLabel: 'Group series 4 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 29%',
            },
          },
          {
            key: 'series2',
            data: 3000,
            color: getColorFromToken(DataVizPalette.color11),
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Bar series 2 of 2 x-Axis 2020/04/30 MetaData4 3%',
            },
          },
        ],
        stackCallOutAccessibilityData: {
          ariaLabel: 'Group series 4 of 4 x-Axis 2020/04/30 MetaData1 33% MetaData4 3%',
        },
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const options: IChoiceGroupOption[] = [
      { key: 'singleCallout', text: 'Single callout' },
      { key: 'StackCallout', text: 'Stack callout' },
    ];
    return (
      <>
        <label htmlFor="changeWidth_Custom">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Custom"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Custom">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Custom"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <ChoiceGroup
          options={options}
          selectedKey={this.state.selectedCallout}
          onChange={this._onChange}
          label="Pick one"
        />
        <div style={rootStyle}>
          <GroupedVerticalBarChart
            chartTitle="Grouped Vertical Bar chart custom accessibility example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            showYAxisGridLines
            wrapXAxisLables
            isCalloutForStack={this.state.selectedCallout === 'StackCallout'}
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}
