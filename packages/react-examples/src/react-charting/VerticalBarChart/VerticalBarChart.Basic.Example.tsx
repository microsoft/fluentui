import * as React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartProps,
  IVerticalBarChartDataPoint,
  ILineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IVerticalChartState {
  width: number;
  height: number;
  isCalloutselected: boolean;
  useSingleColor: boolean;
  hideLabels: boolean;
  showAxisTitles: boolean;
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
      hideLabels: false,
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
  private _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ useSingleColor: checked });
  };
  private _onHideLabelsCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideLabels: checked });
  };
  private _onToggleAxisTitlesCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.forceUpdate();
    this.setState({ showAxisTitles: checked });
  };

  private _basicExample(): JSX.Element {
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: 0,
        y: 10000,
        legend: 'Oranges',
        color: DefaultPalette.accent,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '4%',
        lineData: {
          y: 7000,
          yAxisCalloutData: '3%',
        },
      },
      {
        x: 10000,
        y: 50000,
        legend: 'Dogs',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '21%',
        lineData: {
          y: 30000,
          yAxisCalloutData: '12%',
        },
      },
      {
        x: 25000,
        y: 30000,
        legend: 'Apples',
        color: DefaultPalette.blueMid,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '12%',
        lineData: {
          y: 3000,
          yAxisCalloutData: '1%',
        },
      },

      {
        x: 40000,
        y: 13000,
        legend: 'Bananas',
        color: getColorFromToken(DataVizPalette.color6),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '5%',
      },
      {
        x: 52000,
        y: 43000,
        legend: 'Giraffes',
        color: getColorFromToken(DataVizPalette.color11),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '18%',
        lineData: {
          y: 30000,
          yAxisCalloutData: '12%',
        },
      },
      {
        x: 68000,
        y: 30000,
        legend: 'Cats',
        color: DefaultPalette.blueDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '12%',
        lineData: {
          y: 5000,
          yAxisCalloutData: '2%',
        },
      },
      {
        x: 80000,
        y: 20000,
        legend: 'Elephants',
        color: getColorFromToken(DataVizPalette.color11),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '8%',
        lineData: {
          y: 16000,
          yAxisCalloutData: '7%',
        },
      },
      {
        x: 92000,
        y: 45000,
        legend: 'Monkeys',
        color: getColorFromToken(DataVizPalette.color6),
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '19%',
        lineData: {
          y: 40000,
          yAxisCalloutData: '16%',
        },
      },
    ];

    const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <p>
          In this example the <code>xAxisCalloutData</code> property overrides the x value that is shown on the callout.
          So instead of a numeric value, the callout will show the date that is passed in the{' '}
          <code>xAxisCalloutData</code> property.
        </p>
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
        <Checkbox
          label="Hide labels"
          checked={this.state.hideLabels}
          onChange={this._onHideLabelsCheckChange}
          styles={{ root: { marginTop: '10px' } }}
        />
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
            <VerticalBarChart
              culture={window.navigator.language}
              chartTitle="Vertical bar chart basic example "
              data={points}
              width={this.state.width}
              useSingleColor={this.state.useSingleColor}
              height={this.state.height}
              lineLegendText={'just line'}
              lineLegendColor={'brown'}
              lineOptions={lineOptions}
              {...(this.state.isCalloutselected && {
                onRenderCalloutPerDataPoint: (
                  props: IVerticalBarChartDataPoint,
                  defaultRender: IRenderFunction<IVerticalBarChartDataPoint>,
                ) => (props ? defaultRender(props) : null),
              })}
              hideLabels={this.state.hideLabels}
              enableReflow={true}
              yAxisTitle={this.state.showAxisTitles ? 'Different categories of animals and fruits' : undefined}
              xAxisTitle={this.state.showAxisTitles ? 'Values of each category' : undefined}
            />
          </div>
        )}
        {!this.state.showAxisTitles && (
          <div style={rootStyle}>
            <VerticalBarChart
              culture={window.navigator.language}
              chartTitle="Vertical bar chart basic example "
              data={points}
              width={this.state.width}
              useSingleColor={this.state.useSingleColor}
              height={this.state.height}
              lineLegendText={'just line'}
              lineLegendColor={'brown'}
              lineOptions={lineOptions}
              {...(this.state.isCalloutselected && {
                onRenderCalloutPerDataPoint: (
                  props: IVerticalBarChartDataPoint,
                  defaultRender: IRenderFunction<IVerticalBarChartDataPoint>,
                ) => (props ? defaultRender(props) : null),
              })}
              hideLabels={this.state.hideLabels}
              enableReflow={true}
            />
          </div>
        )}
      </>
    );
  }
}
