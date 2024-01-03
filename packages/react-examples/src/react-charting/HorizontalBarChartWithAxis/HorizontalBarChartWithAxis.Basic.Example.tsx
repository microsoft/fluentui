import * as React from 'react';
import {
  HorizontalBarChartWithAxis,
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisDataPoint,
  getColorFromToken,
  DataVizPalette,
} from '@fluentui/react-charting';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IHorizontalBarChartWithAxisState {
  width: number;
  height: number;
  isCalloutselected: boolean;
  useSingleColor: boolean;
}

const options: IChoiceGroupOption[] = [
  { key: 'basicExample', text: 'Basic Example' },
  { key: 'calloutExample', text: 'Custom Callout Example' },
];

export class HorizontalBarChartWithAxisBasicExample extends React.Component<
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisState
> {
  constructor(props: IHorizontalBarChartWithAxisProps) {
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
    const points: IHorizontalBarChartWithAxisDataPoint[] = [
      {
        x: 10000,
        y: 5000,
        legend: 'Oranges',
        color: getColorFromToken(DataVizPalette.color1),
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      },
      {
        x: 20000,
        y: 50000,
        legend: 'Dogs',
        color: getColorFromToken(DataVizPalette.color2),
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '20%',
      },
      {
        x: 25000,
        y: 30000,
        legend: 'Apples',
        color: getColorFromToken(DataVizPalette.color3),
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '37%',
      },

      {
        x: 40000,
        y: 13000,
        legend: 'Bananas',
        color: getColorFromToken(DataVizPalette.color4),
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '88%',
      },
    ];

    //const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

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
          <HorizontalBarChartWithAxis
            culture={window.navigator.language}
            chartTitle="Horizontal bar chart basic example "
            data={points}
            width={this.state.width}
            useSingleColor={this.state.useSingleColor}
            height={this.state.height}
            {...(this.state.isCalloutselected && {
              onRenderCalloutPerDataPoint: (
                props: IHorizontalBarChartWithAxisDataPoint,
                defaultRender: IRenderFunction<IHorizontalBarChartWithAxisDataPoint>,
              ) => (props ? defaultRender(props) : null),
            })}
            enableReflow={true}
          />
        </div>
      </>
    );
  }
}
