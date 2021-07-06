import * as React from 'react';
import { VerticalStackedBarChart, IVSChartDataPoint, IVerticalStackedChartProps } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

const options: IChoiceGroupOption[] = [
  { key: 'singleCallout', text: "Single callout (won't work if lines are present)" },
  { key: 'MultiCallout', text: 'Stack callout' },
  { key: 'singleCustomCallout', text: "single callout with custom content (won't work if lines are present)" },
  { key: 'MultiCustomCallout', text: 'stack callout with custom content' },
];

interface IVerticalStackedBarState {
  width: number;
  height: number;
  selectedCallout: 'singleCallout' | 'MultiCallout' | 'MultiCustomCallout' | 'singleCustomCallout';
  showLine: boolean;
  barGapMax: number;
}

export class VerticalStackedBarChartCalloutExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      barGapMax: 2,
      showLine: true,
      selectedCallout: 'MultiCallout',
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
    this.setState({ selectedCallout: option.key as IVerticalStackedBarState['selectedCallout'] });
  };

  private _onShowLineChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ showLine: checked });
  };

  private _basicExample(): JSX.Element {
    const { showLine } = this.state;
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 5, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 15, color: DefaultPalette.blueLight },
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
    const fourthChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 10, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
    ];
    const fifthChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 40, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];
    const sixthChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 40, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 20, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
    ];

    const seventhChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 10, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 80, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 20, color: DefaultPalette.blueLight },
    ];
    const eightChartPoints: IVSChartDataPoint[] = [
      { legend: 'Metadata1', data: 50, color: DefaultPalette.accent },
      { legend: 'Metadata2', data: 50, color: DefaultPalette.blueMid },
      { legend: 'Metadata3', data: 20, color: DefaultPalette.blueLight },
    ];

    const data: IVerticalStackedChartProps[] = [
      {
        chartData: firstChartPoints,
        xAxisPoint: 'Jan',
        ...(showLine && { lineData: [{ y: 40, color: DefaultPalette.yellowDark, legend: 'line1' }] }),
      },
      {
        chartData: secondChartPoints,
        xAxisPoint: 'Feb',
        ...(showLine && {
          lineData: [
            { y: 15, color: DefaultPalette.yellowDark, legend: 'line1' },
            { y: 70, color: DefaultPalette.magenta, legend: 'line3' },
          ],
        }),
      },
      {
        chartData: thirdChartPoints,
        xAxisPoint: 'March',
        ...(showLine && {
          lineData: [
            { y: 65, color: DefaultPalette.greenDark, legend: 'line2' },
            { y: 98, color: DefaultPalette.magenta, legend: 'line3' },
          ],
        }),
      },
      {
        chartData: fourthChartPoints,
        xAxisPoint: 'April',
        ...(showLine && {
          lineData: [
            { y: 40, color: DefaultPalette.yellowDark, legend: 'line1' },
            { y: 50, color: DefaultPalette.greenDark, legend: 'line2' },
            { y: 65, color: DefaultPalette.magenta, legend: 'line3' },
          ],
        }),
      },
      {
        chartData: fifthChartPoints,
        xAxisPoint: 'May',
        ...(showLine && {
          lineData: [
            { y: 20, color: DefaultPalette.yellowDark, legend: 'line1' },
            { y: 65, color: DefaultPalette.greenDark, legend: 'line2' },
          ],
        }),
      },
      {
        chartData: sixthChartPoints,
        xAxisPoint: 'June',
        ...(showLine && {
          lineData: [
            { y: 54, color: DefaultPalette.greenDark, legend: 'line2' },
            { y: 87, color: DefaultPalette.magenta, legend: 'line3' },
          ],
        }),
      },
      {
        chartData: seventhChartPoints,
        xAxisPoint: 'July',
        ...(showLine && {
          lineData: [
            { y: 10, color: DefaultPalette.yellowDark, legend: 'line1' },
            { y: 110, color: DefaultPalette.magenta, legend: 'line3' },
          ],
        }),
      },
      {
        chartData: eightChartPoints,
        xAxisPoint: 'August',
        ...(showLine && {
          lineData: [
            { y: 45, color: DefaultPalette.yellowDark, legend: 'line1' },
            { y: 87, color: DefaultPalette.greenDark, legend: 'line2' },
          ],
        }),
      },
      {
        chartData: firstChartPoints,
        xAxisPoint: 'September',
        ...(showLine && {
          lineData: [
            { y: 15, color: DefaultPalette.yellowDark, legend: 'line1' },
            { y: 60, color: DefaultPalette.magenta, legend: 'line3' },
          ],
        }),
      },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <label>BarGapMax:</label>
        <input
          type="range"
          value={this.state.barGapMax}
          min={0}
          max={10}
          onChange={e => this.setState({ barGapMax: +e.target.value })}
        />
        <ChoiceGroup
          options={options}
          selectedKey={this.state.selectedCallout}
          onChange={this._onChange}
          label="Pick one"
        />
        <Checkbox
          label="show the lines (hide or show the lines)"
          checked={this.state.showLine}
          onChange={this._onShowLineChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={rootStyle}>
          <VerticalStackedBarChart
            barGapMax={this.state.barGapMax}
            data={data}
            height={this.state.height}
            width={this.state.width}
            yAxisTickCount={10}
            chartLabel="Card title"
            isCalloutForStack={
              this.state.selectedCallout === 'MultiCallout' || this.state.selectedCallout === 'MultiCustomCallout'
            }
            yMaxValue={120}
            calloutProps={{
              directionalHint: DirectionalHint.topCenter,
            }}
            margins={{ left: 50 }}
            colors={['red', 'white', 'green', 'black']}
            {...(this.state.selectedCallout === 'singleCustomCallout' && {
              onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) => {
                return (
                  <div>
                    <pre>{JSON.stringify(props, undefined, 2)}</pre>
                  </div>
                );
              },
            })}
            {...(this.state.selectedCallout === 'MultiCustomCallout' && {
              onRenderCalloutPerStack: (props: IVerticalStackedChartProps) => {
                return (
                  <div>
                    <pre>
                      <code>{JSON.stringify(props, null, 4)}</code>
                    </pre>
                  </div>
                );
              },
            })}
            allowHoverOnLegend={false}
          />
        </div>
      </>
    );
  }
}
