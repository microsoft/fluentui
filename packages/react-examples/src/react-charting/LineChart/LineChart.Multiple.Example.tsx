import * as React from 'react';
import { IChartProps, ILineChartPoints, ILineChartProps, LineChart, DataVizPalette } from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface ILineChartMultipleExampleState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
}

export class LineChartMultipleExample extends React.Component<{}, ILineChartMultipleExampleState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      allowMultipleShapes: false,
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <label htmlFor="changeWidth_Multiple">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Multiple"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Multiple">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Multiple"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <Toggle
          label="Enabled  multiple shapes for each line"
          onText="On"
          offText="Off"
          onChange={this._onShapeChange}
          checked={this.state.allowMultipleShapes}
        />
        <div>{this._styledExample()}</div>
      </>
    );
  }

  private _onShapeChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ allowMultipleShapes: checked });
  };

  private _onLegendClickHandler = (selectedLegend: string | null): void => {
    if (selectedLegend !== null) {
      console.log(`Selected legend - ${selectedLegend}`);
    }
  };

  private _styledExample(): JSX.Element {
    const points: ILineChartPoints[] = [
      {
        data: [
          { x: new Date('2018/01/01'), y: 10, xAxisCalloutData: '2018/01/01', yAxisCalloutData: '10%' },
          { x: new Date('2018/02/01'), y: 30, xAxisCalloutData: '2018/02/01', yAxisCalloutData: '18%' },
          { x: new Date('2018/03/01'), y: 10, xAxisCalloutData: '2018/03/01', yAxisCalloutData: '24%' },
          { x: new Date('2018/04/01'), y: 30, xAxisCalloutData: '2018/04/01', yAxisCalloutData: '25%' },
          { x: new Date('2018/05/01'), y: 10, xAxisCalloutData: '2018/05/01', yAxisCalloutData: '15%' },
          { x: new Date('2018/06/01'), y: 30, xAxisCalloutData: '2018/06/01', yAxisCalloutData: '30%' },
        ],
        legend: 'First',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 30 },
          { x: new Date('2018/02/01'), y: 50 },
          { x: new Date('2018/03/01'), y: 30 },
          { x: new Date('2018/04/01'), y: 50 },
          { x: new Date('2018/05/01'), y: 30 },
          { x: new Date('2018/06/01'), y: 50 },
        ],
        legend: 'Second',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 50 },
          { x: new Date('2018/02/01'), y: 70 },
          { x: new Date('2018/03/01'), y: 50 },
          { x: new Date('2018/04/01'), y: 70 },
          { x: new Date('2018/05/01'), y: 50 },
          { x: new Date('2018/06/01'), y: 70 },
        ],
        legend: 'Third',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 70 },
          { x: new Date('2018/02/01'), y: 90 },
          { x: new Date('2018/03/01'), y: 70 },
          { x: new Date('2018/04/01'), y: 90 },
          { x: new Date('2018/05/01'), y: 70 },
          { x: new Date('2018/06/01'), y: 90 },
        ],
        legend: 'Fourth',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 90 },
          { x: new Date('2018/02/01'), y: 110 },
          { x: new Date('2018/03/01'), y: 90 },
          { x: new Date('2018/04/01'), y: 110 },
          { x: new Date('2018/05/01'), y: 90 },
          { x: new Date('2018/06/01'), y: 110 },
        ],
        legend: 'Fifth',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 110 },
          { x: new Date('2018/02/01'), y: 130 },
          { x: new Date('2018/03/01'), y: 110 },
          { x: new Date('2018/04/01'), y: 130 },
          { x: new Date('2018/05/01'), y: 110 },
          { x: new Date('2018/06/01'), y: 130 },
        ],
        legend: 'Sixth',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 130 },
          { x: new Date('2018/02/01'), y: 150 },
          { x: new Date('2018/03/01'), y: 130 },
          { x: new Date('2018/04/01'), y: 150 },
          { x: new Date('2018/05/01'), y: 130 },
          { x: new Date('2018/06/01'), y: 150 },
        ],
        legend: 'Seventh',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 150 },
          { x: new Date('2018/02/01'), y: 170 },
          { x: new Date('2018/03/01'), y: 150 },
          { x: new Date('2018/04/01'), y: 170 },
          { x: new Date('2018/05/01'), y: 150 },
          { x: new Date('2018/06/01'), y: 170 },
        ],
        legend: 'Eight',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 170 },
          { x: new Date('2018/02/01'), y: 190 },
          { x: new Date('2018/03/01'), y: 170 },
          { x: new Date('2018/04/01'), y: 190 },
          { x: new Date('2018/05/01'), y: 170 },
          { x: new Date('2018/06/01'), y: 190 },
        ],
        legend: 'Ninth',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 190 },
          { x: new Date('2018/02/01'), y: 210 },
          { x: new Date('2018/03/01'), y: 190 },
          { x: new Date('2018/04/01'), y: 210 },
          { x: new Date('2018/05/01'), y: 190 },
          { x: new Date('2018/06/01'), y: 210 },
        ],
        legend: 'Tenth',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 210 },
          { x: new Date('2018/02/01'), y: 230 },
          { x: new Date('2018/03/01'), y: 210 },
          { x: new Date('2018/04/01'), y: 230 },
          { x: new Date('2018/05/01'), y: 210 },
          { x: new Date('2018/06/01'), y: 230 },
        ],
        legend: 'Eleventh',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
      {
        data: [
          { x: new Date('2018/01/01'), y: 230 },
          { x: new Date('2018/02/01'), y: 250 },
          { x: new Date('2018/03/01'), y: 230 },
          { x: new Date('2018/04/01'), y: 250 },
          { x: new Date('2018/05/01'), y: 230 },
          { x: new Date('2018/06/01'), y: 250 },
        ],
        legend: 'Tweleth',
        lineOptions: {
          lineBorderWidth: '4',
        },
        onLegendClick: this._onLegendClickHandler,
      },
    ];

    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: points,
    };
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const timeFormat = '%m/%d';
    // Passing tick values is optional, for more control.
    // If you do not pass them the line chart will render them for you based on D3's standard.
    const tickValues: Date[] = [
      new Date('01-01-2018'),
      new Date('02-01-2018'),
      new Date('03-01-2018'),
      new Date('04-01-2018'),
      new Date('05-01-2018'),
      new Date('06-01-2018'),
      new Date('07-01-2018'),
    ];
    const colorFillBarData = [
      {
        legend: 'Time range 1',
        color: DataVizPalette.color19,
        data: [
          {
            startX: new Date('2018/01/06'),
            endX: new Date('2018/01/25'),
          },
        ],
      },
      {
        legend: 'Time range 2',
        color: DataVizPalette.color20,
        data: [
          {
            startX: new Date('2018/01/18'),
            endX: new Date('2018/02/20'),
          },
          {
            startX: new Date('2018/04/17'),
            endX: new Date('2018/05/10'),
          },
        ],
        applyPattern: true,
      },
    ];
    return (
      <div style={rootStyle}>
        <LineChart
          data={data}
          strokeWidth={4}
          tickFormat={timeFormat}
          tickValues={tickValues}
          height={this.state.height}
          width={this.state.width}
          legendProps={{ canSelectMultipleLegends: true, allowFocusOnLegends: true }}
          colorFillBars={colorFillBarData}
          allowMultipleShapesForPoints={this.state.allowMultipleShapes}
          enablePerfOptimization={true}
          useUTC={false}
        />
      </div>
    );
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
}
