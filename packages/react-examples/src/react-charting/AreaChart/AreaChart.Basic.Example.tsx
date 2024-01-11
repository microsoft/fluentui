import * as React from 'react';
import { AreaChart, ICustomizedCalloutData } from '@fluentui/react-charting';
import { IAreaChartProps, ChartHoverCard, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IAreaChartBasicState {
  width: number;
  height: number;
  isCalloutselected: boolean;
  showAxisTitles: boolean;
}

const options: IChoiceGroupOption[] = [
  { key: 'basicExample', text: 'Basic Example' },
  { key: 'calloutExample', text: 'Custom Callout Example' },
];

export class AreaChartBasicExample extends React.Component<{}, IAreaChartBasicState> {
  constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      isCalloutselected: false,
      showAxisTitles: true,
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
    if (this.state.isCalloutselected) {
      this.setState({ isCalloutselected: false });
    } else {
      this.setState({ isCalloutselected: true });
    }
  };

  private _onToggleAxisTitlesCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.forceUpdate();
    this.setState({ showAxisTitles: checked });
  };

  private _basicExample(): JSX.Element {
    const chart1Points = [
      {
        x: 20,
        y: 7000,
        xAxisCalloutData: '2018/01/01',
        yAxisCalloutData: '35%',
      },
      {
        x: 25,
        y: 9000,
        xAxisCalloutData: '2018/01/15',
        yAxisCalloutData: '45%',
      },
      {
        x: 30,
        y: 13000,
        xAxisCalloutData: '2018/01/28',
        yAxisCalloutData: '65%',
      },
      {
        x: 35,
        y: 15000,
        xAxisCalloutData: '2018/02/01',
        yAxisCalloutData: '75%',
      },
      {
        x: 40,
        y: 11000,
        xAxisCalloutData: '2018/03/01',
        yAxisCalloutData: '55%',
      },
      {
        x: 45,
        y: 8760,
        xAxisCalloutData: '2018/03/15',
        yAxisCalloutData: '43%',
      },
      {
        x: 50,
        y: 3500,
        xAxisCalloutData: '2018/03/28',
        yAxisCalloutData: '18%',
      },
      {
        x: 55,
        y: 20000,
        xAxisCalloutData: '2018/04/04',
        yAxisCalloutData: '100%',
      },
      {
        x: 60,
        y: 17000,
        xAxisCalloutData: '2018/04/15',
        yAxisCalloutData: '85%',
      },
      {
        x: 65,
        y: 1000,
        xAxisCalloutData: '2018/05/05',
        yAxisCalloutData: '5%',
      },
      {
        x: 70,
        y: 12000,
        xAxisCalloutData: '2018/06/01',
        yAxisCalloutData: '60%',
      },
      {
        x: 75,
        y: 6876,
        xAxisCalloutData: '2018/01/15',
        yAxisCalloutData: '34%',
      },
      {
        x: 80,
        y: 12000,
        xAxisCalloutData: '2018/04/30',
        yAxisCalloutData: '60%',
      },
      {
        x: 85,
        y: 7000,
        xAxisCalloutData: '2018/05/04',
        yAxisCalloutData: '35%',
      },
      {
        x: 90,
        y: 10000,
        xAxisCalloutData: '2018/06/01',
        yAxisCalloutData: '50%',
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
      },
    ];

    const chartData = {
      chartTitle: 'Area chart basic example',
      lineChartData: chartPoints,
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />

        <ChoiceGroup options={options} defaultSelectedKey="basicExample" onChange={this._onChange} label="Pick one" />
        <Toggle
          label="Toggle Axis titles"
          onText="Show axis titles"
          offText="Hide axis titles"
          checked={this.state.showAxisTitles}
          onChange={this._onToggleAxisTitlesCheckChange}
          styles={{ root: { marginTop: '10px' } }}
        />
        {this.state.showAxisTitles && (
          <div style={rootStyle}>
            <AreaChart
              culture={window.navigator.language}
              height={this.state.height}
              width={this.state.width}
              data={chartData}
              enablePerfOptimization={true}
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
                props && this.state.isCalloutselected ? (
                  <ChartHoverCard
                    XValue={props.x.toString()}
                    Legend={'Custom Legend'}
                    YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                    color={getColorFromToken(DataVizPalette.color7)}
                  />
                ) : null
              }
              enableReflow={true}
              yAxisTitle={this.state.showAxisTitles ? 'Variation of stock market prices' : undefined}
              xAxisTitle={this.state.showAxisTitles ? 'Number of days' : undefined}
              handleError={() => (
                <div>
                  <img
                    src={
                      'https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=996&t=st=1704980908~exp=1704981508~hmac=c9dcc38fa37803ef28cce8639cbe5cb6a66af1d41892b9f9a15326ac3d4cc8da'
                    }
                  />
                </div>
              )}
            />
          </div>
        )}
        {!this.state.showAxisTitles && (
          <div style={rootStyle}>
            <AreaChart
              culture={window.navigator.language}
              height={this.state.height}
              width={this.state.width}
              data={chartData}
              enablePerfOptimization={true}
              // eslint-disable-next-line react/jsx-no-bind
              onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
                props && this.state.isCalloutselected ? (
                  <ChartHoverCard
                    XValue={props.x.toString()}
                    Legend={'Custom Legend'}
                    YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                    color={getColorFromToken(DataVizPalette.color7)}
                  />
                ) : null
              }
              enableReflow={true}
              handleError={() => (
                <div>
                  <img
                    src={
                      'https://www.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_20602774.htm#query=no%20results&position=3&from_view=keyword&track=ais&uuid=58e325f3-9cbf-45ce-88b6-5a1cf9d8973e#position=3&query=no%20results'
                    }
                  />
                </div>
              )}
            />
          </div>
        )}
      </>
    );
  }
}
