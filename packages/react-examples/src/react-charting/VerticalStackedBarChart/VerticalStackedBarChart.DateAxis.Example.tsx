import * as React from 'react';
import {
  ChartHoverCard,
  VerticalStackedBarChart,
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  IVerticalStackedBarChartProps,
  DataVizPalette,
  getColorFromToken,
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

export class VerticalStackedBarChartDateAxisExample extends React.Component<{}, IVerticalStackedBarState> {
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
      { legend: 'meta data 1', data: 2, color: getColorFromToken(DataVizPalette.color8) },
      { legend: 'Meta data 2', data: 0.5, color: getColorFromToken(DataVizPalette.color9) },
      { legend: 'meta Data 3', data: 0, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'meta data 1', data: 30, color: getColorFromToken(DataVizPalette.color8) },
      { legend: 'Meta data 2', data: 3, color: getColorFromToken(DataVizPalette.color9) },
      { legend: 'meta Data 3', data: 40, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'meta data 1', data: 10, color: getColorFromToken(DataVizPalette.color8) },
      { legend: 'Meta data 2', data: 60, color: getColorFromToken(DataVizPalette.color9) },
      { legend: 'meta Data 3', data: 30, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const data: IVerticalStackedChartProps[] = [
      {
        chartData: firstChartPoints,
        xAxisPoint: new Date('2018/03/01'),
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: new Date('2018/05/01'),
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: new Date('2018/07/01'),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: new Date('2018/09/01'),
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: new Date('2018/11/01'),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: new Date('2019/02/01'),
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: new Date('2019/05/01'),
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: new Date('2019/07/01'),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: new Date('2019/09/01'),
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    const textStyle: IStyle = {
      fill: DefaultPalette.black,
      fontSize: '10px',
      lineHeight: '14px',
    };
    const timeFormat = '%m/%d';
    const tickValues: Date[] = [
      new Date('2018/03/01'),
      new Date('2018/05/01'),
      new Date('2018/07/01'),
      new Date('2018/09/01'),
      new Date('2018/11/01'),
      new Date('2019/02/01'),
      new Date('2019/05/01'),
      new Date('2019/07/01'),
      new Date('2019/09/01'),
    ];
    const customStyles: IVerticalStackedBarChartProps['styles'] = () => {
      return {
        xAxis: {
          selectors: {
            text: { fill: getColorFromToken(DataVizPalette.color2), fontSize: '10px' },
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
            aria-valuetext={`ChangeWidthSlider${this.state.width}`}
          />
          <label htmlFor="changeHeight_Styled">Height:</label>
          <input
            type="range"
            value={this.state.height}
            min={200}
            max={1000}
            id="changeHeight_Styled"
            onChange={e => this.setState({ height: +e.target.value })}
            aria-valuetext={`ChangeHeightslider${this.state.height}`}
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
            aria-valuetext={`ChangebarGapMaxslider${this.state.barGapMax}`}
          />
          <label htmlFor="ChangeBarCornerRadius_condition">BarCornerRadius:</label>
          <input
            type="range"
            value={this.state.barCornerRadius}
            min={0}
            max={10}
            id="ChangeBarCornerRadius_condition"
            onChange={e => this.setState({ barCornerRadius: +e.target.value })}
            aria-valuetext={`ChangeBarCornerRadiusSlider${this.state.barCornerRadius}`}
          />
          <label htmlFor="ChangeBarMinimumHeight_condition">BarMinimumHeight:</label>
          <input
            type="range"
            value={this.state.barMinimumHeight}
            min={0}
            max={10}
            id="ChangeBarMinimumHeight_condition"
            onChange={e => this.setState({ barMinimumHeight: +e.target.value })}
            aria-valuetext={`ChangebarBarMinimumHeightslider${this.state.barMinimumHeight}`}
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
            tickValues={tickValues}
            tickFormat={timeFormat}
            // eslint-disable-next-line react/jsx-no-bind
            onBarClick={(event, clickData) => console.log('clicked', event, clickData)}
            // eslint-disable-next-line react/jsx-no-bind
            styles={customStyles}
            yMaxValue={120}
            isCalloutForStack={this.state.selectedCallout === 'MultiCallout'}
            calloutProps={{
              directionalHint: DirectionalHint.topAutoEdge,
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
                legend: {
                  textTransform: 'none',
                },
              },
            }}
            // eslint-disable-next-line react/jsx-no-bind
            {...(this.state.selectedCallout === 'singleCallout' && {
              onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) => {
                return props ? (
                  <ChartHoverCard
                    XValue={props.xAxisCalloutData}
                    Legend={props.legend}
                    YValue={`${props.yAxisCalloutData || props.data} h`}
                    color={props.color}
                  />
                ) : null;
              },
            })}
            svgProps={{
              'aria-label': 'Example chart with metadata per month',
            }}
            enableReflow={true}
            useUTC={false}
          />
        </div>
      </>
    );
  }
}
