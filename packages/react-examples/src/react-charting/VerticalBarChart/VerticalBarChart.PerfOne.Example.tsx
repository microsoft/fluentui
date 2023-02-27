import * as React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartProps,
  IVerticalBarChartDataPoint,
  ILineChartLineOptions,
} from '@fluentui/react-charting';
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

export class VerticalBarPerfOneExample extends React.Component<IVerticalBarChartProps, IVerticalChartState> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 1000,
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
    // const points: IVerticalBarChartDataPoint[] = [
    //   {
    //     x: 0,
    //     y: 10000,
    //     //legend: 'Oranges',
    //     color: DefaultPalette.accent,
    //   },
    //   {
    //     x: 10000,
    //     y: 50000,
    //     //legend: 'Dogs',
    //     color: DefaultPalette.blueDark,
    //   },
    //   {
    //     x: 25000,
    //     y: 30000,
    //     //legend: 'Apples',
    //     color: DefaultPalette.blueMid,
    //   },

    //   {
    //     x: 40000,
    //     y: 13000,
    //     //legend: 'Bananas',
    //     color: DefaultPalette.blueLight,
    //   },
    //   {
    //     x: 52000,
    //     y: 43000,
    //     //legend: 'Giraffes',
    //     color: DefaultPalette.blue,
    //   },
    //   {
    //     x: 68000,
    //     y: 30000,
    //     //legend: 'Cats',
    //     color: DefaultPalette.blueDark,
    //   },
    //   {
    //     x: 80000,
    //     y: 20000,
    //     // legend: 'Elephants',
    //     color: DefaultPalette.blue,
    //   },
    //   {
    //     x: 92000,
    //     y: 45000,
    //     //legend: 'Monkeys',
    //     color: DefaultPalette.blueLight,
    //   },
    // ];

    const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          onChange={this._onWidthChange}
          id="changeWidth"
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <ChoiceGroup options={options} defaultSelectedKey="basicExample" onChange={this._onChange} label="Pick one" />
        <Checkbox
          label="use single color(This will have only one color)"
          checked={this.state.useSingleColor}
          onChange={this._onCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={rootStyle}>
          <VerticalBarChart
            culture={window.navigator.language}
            chartTitle="Vertical bar chart basic example "
            data={this._getData()}
            width={this.state.width}
            useSingleColor={this.state.useSingleColor}
            height={this.state.height}
            lineLegendText={'just line'}
            lineLegendColor={'brown'}
            lineOptions={lineOptions}
            hideLegend={true}
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
  private _getData(): any {
    const points: IVerticalBarChartDataPoint[] = [];

    let i = 1;
    for (i = 1; i < 101; i++) {
      const y: number = Math.random() * 2000;
      const x: number = Math.random() * 1000;
      points.push({ x, y, color: DefaultPalette.blue });
    }
    return points;
  }
}
