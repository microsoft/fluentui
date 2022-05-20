import * as React from 'react';
import {
  ChartHoverCard,
  VerticalStackedBarChart,
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  IVerticalStackedBarChartProps,
} from '@fluentui/react-charting';
import { DefaultPalette, IStyle, DefaultFontStyles } from '@fluentui/react/lib/Styling';
import { ChoiceGroup, DirectionalHint, IChoiceGroupOption } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'singleCallout', text: 'Single callout' },
  { key: 'MultiCallout', text: 'Stack callout' },
];

interface IVerticalStackedBarState {
  width: number;
  height: number;
  barGapMax: number;
  barCornerRadius: number;
  barMinimumHeight: number;
  selectedCallout: string;
}

export class VerticalStackedBarChartStyledExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      barGapMax: 2,
      barCornerRadius: 2,
      barMinimumHeight: 1,
      selectedCallout: 'MultiCallout',
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _basicExample(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 2, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 0.5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 0, color: DefaultPalette.blueLight },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 30, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 3, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'Jan' },
      { chartData: secondChartPoints, xAxisPoint: 'Feb' },
      { chartData: thirdChartPoints, xAxisPoint: 'March' },
      { chartData: firstChartPoints, xAxisPoint: 'April' },
      { chartData: thirdChartPoints, xAxisPoint: 'May' },
      { chartData: firstChartPoints, xAxisPoint: 'June' },
      { chartData: secondChartPoints, xAxisPoint: 'July' },
      { chartData: thirdChartPoints, xAxisPoint: 'August' },
      { chartData: firstChartPoints, xAxisPoint: 'September' },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    const textStyle: IStyle = {
      fill: DefaultPalette.black,
      fontSize: '10px',
      lineHeight: '14px',
    };

    const customStyles: IVerticalStackedBarChartProps['styles'] = () => {
      return {
        xAxis: {
          selectors: {
            text: { fill: 'black', fontSize: '10px' },
          },
        },
        chart: {
          paddingBottom: '45px',
        },
        chartLabel: {
          color: DefaultPalette.blueMid,
          ...DefaultFontStyles.large,
        },
        xAxisText: {
          ...textStyle,
        },
      };
    };

    return (
      <>
        <div>
          <label htmlFor="ChangeWidth_Styled">Width:</label>
          <input
            type="range"
            value={this.state.width}
            min={200}
            max={1000}
            id="ChangeWidth_Styled"
            onChange={e => this.setState({ width: +e.target.value })}
          />
          <label htmlFor="changeHeight_Styled">Height:</label>
          <input
            type="range"
            value={this.state.height}
            min={200}
            max={1000}
            id="changeHeight_Styled"
            onChange={e => this.setState({ height: +e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="changeBarGapMax_Styled">BarGapMax:</label>
          <input
            type="range"
            value={this.state.barGapMax}
            min={0}
            max={10}
            id="changeBarGapMax_Styled"
            onChange={e => this.setState({ barGapMax: +e.target.value })}
          />
          <label htmlFor="ChangeBarCornerRadius_condition">BarCornerRadius:</label>
          <input
            type="range"
            value={this.state.barCornerRadius}
            min={0}
            max={10}
            id="ChangeBarCornerRadius_condition"
            onChange={e => this.setState({ barCornerRadius: +e.target.value })}
          />
          <label htmlFor="ChangeBarMinimumHeight_condition">BarMinimumHeight:</label>
          <input
            type="range"
            value={this.state.barMinimumHeight}
            min={0}
            max={10}
            id="ChangeBarMinimumHeight_condition"
            onChange={e => this.setState({ barMinimumHeight: +e.target.value })}
          />
          <ChoiceGroup
            options={options}
            defaultSelectedKey="MultiCallout"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(_ev, option) => option && this.setState({ selectedCallout: option.key })}
            label="Pick one"
          />
        </div>
        <div style={rootStyle}>
          <VerticalStackedBarChart
            chartTitle="Vertical stacked bar chart styled example"
            data={data}
            {...this.state}
            yAxisTickCount={10}
            // eslint-disable-next-line react/jsx-no-bind
            onBarClick={(event, clickData) => console.log('clicked', event, clickData)}
            // eslint-disable-next-line react/jsx-no-bind
            styles={customStyles}
            yMaxValue={120}
            isCalloutForStack={this.state.selectedCallout === 'MultiCallout'}
            calloutProps={{
              directionalHint: DirectionalHint.topCenter,
            }}
            // eslint-disable-next-line react/jsx-no-bind
            yAxisTickFormat={(x: number | string) => `${x} h`}
            margins={{
              bottom: 35,
              top: 10,
              left: 35,
              right: 0,
            }}
            legendProps={{
              allowFocusOnLegends: true,
              styles: {
                rect: {
                  borderRadius: '3px',
                },
              },
            }}
            // eslint-disable-next-line react/jsx-no-bind
            onRenderCalloutPerDataPoint={props =>
              props ? (
                <ChartHoverCard
                  XValue={props.xAxisCalloutData}
                  Legend={props.legend}
                  YValue={`${props.yAxisCalloutData || props.data} h`}
                  color={props.color}
                />
              ) : null
            }
            svgProps={{
              'aria-label': 'Example chart with metadata per month',
            }}
          />
        </div>
      </>
    );
  }
}
