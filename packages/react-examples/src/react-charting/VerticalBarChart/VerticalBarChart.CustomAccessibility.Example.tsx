import * as React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartProps,
  IVerticalBarChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IVerticalBarChartState {
  isChecked: boolean;
  useSingleColor: boolean;
}
export class VerticalBarChartCustomAccessibilityExample extends React.Component<
  IVerticalBarChartProps,
  IVerticalBarChartState
> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      isChecked: true,
      useSingleColor: true,
    };
  }

  public render(): JSX.Element {
    const { isChecked } = this.state;
    const points: IVerticalBarChartDataPoint[] = [
      {
        x: 'One',
        y: 20,
        ...(isChecked && { lineData: { y: 10, yAxisCalloutData: '12%' } }),
        callOutAccessibilityData: { ariaLabel: `Bar series 1 of 4 ${isChecked ? 'one 12% 20' : 'one 20'}` },
      },
      {
        x: 'Two',
        y: 48,
        ...(isChecked && { lineData: { y: 28 } }),
        callOutAccessibilityData: { ariaLabel: `Bar series 2 of 4 ${isChecked ? 'Two 28 48' : 'Two 48'}` },
      },
      {
        x: 'Three',
        y: 30,
        ...(isChecked && { lineData: { y: 4 } }),
        callOutAccessibilityData: { ariaLabel: `Bar series 3 of 4 ${isChecked ? 'Three 4 30' : 'Three 30'}` },
      },
      {
        x: 'Four',
        y: 40,
        ...(isChecked && { lineData: { y: 28 } }),
        callOutAccessibilityData: { ariaLabel: `Bar series 4 of 4 ${isChecked ? 'Four 28 40' : 'Four 40'}` },
      },
    ];

    const customColors = [
      getColorFromToken(DataVizPalette.color8),
      getColorFromToken(DataVizPalette.color18),
      getColorFromToken(DataVizPalette.color28),
    ];

    return (
      <>
        <Checkbox
          label="show  line(This will draw the line)"
          checked={this.state.isChecked}
          onChange={this._onChange}
        />
        <Checkbox
          label="use single color(This will have only one color)"
          checked={this.state.useSingleColor}
          onChange={this._onCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={{ width: '800px', height: '400px' }}>
          <VerticalBarChart
            chartTitle="Vertical bar chart custom accessibility example "
            data={points}
            width={800}
            height={400}
            barWidth={20}
            useSingleColor={this.state.useSingleColor}
            yAxisTickCount={6}
            colors={customColors}
            hideLegend={true}
            enableReflow={true}
            lineLegendColor={getColorFromToken(DataVizPalette.color10)}
          />
        </div>
      </>
    );
  }
  private _onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ isChecked: checked });
  };
  private _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ useSingleColor: checked });
  };
}
