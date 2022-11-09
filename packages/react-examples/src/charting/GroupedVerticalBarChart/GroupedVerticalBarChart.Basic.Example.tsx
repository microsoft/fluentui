import * as React from 'react';
import { GroupedVerticalBarChart, IGroupedVerticalBarChartProps } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';
interface IGroupedBarChartState {
  width: number;
  height: number;
  selectedCallout: 'singleCallout' | 'StackCallout';
  barwidth: number;
}

export class GroupedVerticalBarChartBasicExample extends React.Component<{}, IGroupedBarChartState> {
  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
      selectedCallout: 'singleCallout',
      barwidth: 10,
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
  private _onBarwidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ barwidth: parseInt(e.target.value, 10) });
  };
  private _basicExample(): JSX.Element {
    const data = [
      {
        name: 'Metadata info multi lines text Completed',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 44000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/04/30',
            yAxisCalloutData: '44%',
          },
        ],
      },
      {
        name: 'Meta Data2',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/05/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 3000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/05/30',
            yAxisCalloutData: '3%',
          },
        ],
      },

      {
        name: 'Single line text ',
        series: [
          {
            key: 'series1',
            data: 14000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/06/30',
            yAxisCalloutData: '14%',
          },
          {
            key: 'series2',
            data: 50000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/06/30',
            yAxisCalloutData: '50%',
          },
        ],
      },
      {
        name: 'Hello World!!!',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: DefaultPalette.blueLight,
            legend: 'MetaData1',
            xAxisCalloutData: '2020/07/30',
            yAxisCalloutData: '33%',
          },
          {
            key: 'series2',
            data: 3000,
            color: DefaultPalette.blue,
            legend: 'MetaData4',
            xAxisCalloutData: '2020/07/30',
            yAxisCalloutData: '3%',
          },
        ],
      },
    ];

    const options: IChoiceGroupOption[] = [
      { key: 'singleCallout', text: 'Single callout' },
      { key: 'StackCallout', text: 'Stack callout' },
    ];
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <>
        <label>Change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>Change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <label>Change Barwidth:</label>
        <input type="range" value={this.state.barwidth} min={10} max={70} onChange={this._onBarwidthChange} />
        <label>{this.state.barwidth}</label>
        <ChoiceGroup
          options={options}
          selectedKey={this.state.selectedCallout}
          onChange={this._onChange}
          label="Pick one"
        />
        <br />

        <div style={rootStyle}>
          <GroupedVerticalBarChart
            culture={window.navigator.language}
            chartTitle="Grouped Vertical Bar chart basic example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            showYAxisGridLines
            wrapXAxisLables
            isCalloutForStack={this.state.selectedCallout === 'StackCallout'}
            barwidth={this.state.barwidth}
          />
        </div>
      </>
    );
  }
}
