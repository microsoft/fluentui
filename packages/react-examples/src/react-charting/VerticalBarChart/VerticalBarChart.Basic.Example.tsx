import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IVerticalChartState {
  width: number;
  height: number;
  isCalloutselected: boolean;
  useSingleColor: boolean;
}

const options: IChoiceGroupOption[] = [
  { key: 'basicExample', text: 'Basic Example' },
  { key: 'calloutExample', text: 'Custom Callout Example' },
];

export class VerticalBarChartBasicExample extends React.Component<IVerticalBarChartProps, IVerticalChartState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      isCalloutselected: false,
      useSingleColor: false,
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
  private _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ useSingleColor: checked });
  };

  private _basicExample(): JSX.Element {
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: 0,
        y: 10000,
        legend: 'Oranges',
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '10%',
        lineData: {
          y: 7000,
          yAxisCalloutData: '34%',
        },
      },
      {
        x: 10000,
        y: 50000,
        legend: 'Dogs',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '20%',
        lineData: {
          y: 30000,
        },
      },
      {
        x: 25000,
        y: 30000,
        legend: 'Apples',
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '37%',
        lineData: {
          y: 3000,
          yAxisCalloutData: '43%',
        },
      },

      {
        x: 40000,
        y: 13000,
        legend: 'Bananas',
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '88%',
      },
      {
        x: 52000,
        y: 43000,
        legend: 'Giraffes',
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '71%',
        lineData: {
          y: 30000,
        },
      },
      {
        x: 68000,
        y: 30000,
        legend: 'Cats',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '40%',
        lineData: {
          y: 5000,
        },
      },
      {
        x: 80000,
        y: 20000,
        legend: 'Elephants',
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '87%',
        lineData: {
          y: 16000,
        },
      },
      {
        x: 92000,
        y: 45000,
        legend: 'Monkeys',
        color: DefaultPalette.blueLight,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
        lineData: {
          y: 40000,
          yAxisCalloutData: '45%',
        },
      },
    ];
    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <ChoiceGroup options={options} defaultSelectedKey="basicExample" onChange={this._onChange} label="Pick one" />
        <Checkbox
          label="use single color(This will have only one color)"
          checked={this.state.useSingleColor}
          onChange={this._onCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={rootStyle}>
          <VerticalBarChart
            data={points}
            width={this.state.width}
            useSingleColor={this.state.useSingleColor}
            height={this.state.height}
            chartLabel={'Basic Chart with Numeric Axes'}
            lineLegendText={'just line'}
            lineLegendColor={'brown'}
            {...(this.state.isCalloutselected && {
              onRenderCalloutPerDataPoint: (
                props: IVerticalBarChartDataPoint,
                defaultRender: IRenderFunction<IVerticalBarChartDataPoint>,
              ) => (props ? defaultRender(props) : null),
            })}
          />
        </div>
      </>
    );
  }
}
