import * as React from 'react';
import { AreaChart, ICustomizedCalloutData } from '@fluentui/react-charting';
import { IAreaChartProps, ChartHoverCard } from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

interface IAreaChartBasicState {
  width: number;
  height: number;
  isCalloutselected: boolean;
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

  private _basicExample(): JSX.Element {
    const chart1Points = [
      {
        x: 20,
        y: 7000,
        xAxisCalloutData: '2018/01/01',
        yAxisCalloutData: '10%',
      },
      {
        x: 25,
        y: 9000,
        xAxisCalloutData: '2018/01/15',
        yAxisCalloutData: '18%',
      },
      {
        x: 30,
        y: 13000,
        xAxisCalloutData: '2018/01/28',
        yAxisCalloutData: '24%',
      },
      {
        x: 35,
        y: 15000,
        xAxisCalloutData: '2018/02/01',
        yAxisCalloutData: '25%',
      },
      {
        x: 40,
        y: 11000,
        xAxisCalloutData: '2018/03/01',
        yAxisCalloutData: '15%',
      },
      {
        x: 45,
        y: 8760,
        xAxisCalloutData: '2018/03/15',
        yAxisCalloutData: '30%',
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
        yAxisCalloutData: '32%',
      },
      {
        x: 60,
        y: 17000,
        xAxisCalloutData: '2018/04/15',
        yAxisCalloutData: '29%',
      },
      {
        x: 65,
        y: 1000,
        xAxisCalloutData: '2018/05/05',
        yAxisCalloutData: '43%',
      },
      {
        x: 70,
        y: 12000,
        xAxisCalloutData: '2018/06/01',
        yAxisCalloutData: '45%',
      },
      {
        x: 75,
        y: 6876,
        xAxisCalloutData: '2018/01/15',
        yAxisCalloutData: '18%',
      },
      {
        x: 80,
        y: 12000,
        xAxisCalloutData: '2018/04/30',
        yAxisCalloutData: '55%',
      },
      {
        x: 85,
        y: 7000,
        xAxisCalloutData: '2018/05/04',
        yAxisCalloutData: '12%',
      },
      {
        x: 90,
        y: 10000,
        xAxisCalloutData: '2018/06/01',
        yAxisCalloutData: '45%',
      },
    ];

    const chartPoints = [
      {
        legend: 'legend1',
        data: chart1Points,
        color: '#0099BC',
      },
    ];

    const chartData = {
      chartTitle: 'Area chart basic example',
      lineChartData: chartPoints,
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <ChoiceGroup options={options} defaultSelectedKey="basicExample" onChange={this._onChange} label="Pick one" />
        <div style={rootStyle}>
          <AreaChart
            culture={window.navigator.language}
            height={this.state.height}
            width={this.state.width}
            data={chartData}
            showYAxisGridLines={true}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
              props && this.state.isCalloutselected ? (
                <ChartHoverCard
                  XValue={props.x.toString()}
                  Legend={'Custom Legend'}
                  YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                  color={'red'}
                />
              ) : null
            }
          />
        </div>
      </>
    );
  }
}
