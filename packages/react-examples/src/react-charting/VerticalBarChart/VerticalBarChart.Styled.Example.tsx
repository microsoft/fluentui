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
export class VerticalBarChartStyledExample extends React.Component<IVerticalBarChartProps, IVerticalBarChartState> {
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
      { x: 'One', y: 20, ...(isChecked && { lineData: { y: 10, yAxisCalloutData: '12%' } }) },
      { x: 'Two', y: 48, ...(isChecked && { lineData: { y: 28 } }) },
      { x: 'Three', y: 30, ...(isChecked && { lineData: { y: 4 } }) },
      { x: 'Four', y: 40, ...(isChecked && { lineData: { y: 28 } }) },
      { x: 'Five', y: 13, ...(isChecked && { lineData: { y: 8, yAxisCalloutData: '45%' } }) },
      { x: 'Six', y: 60 },
      { x: 'Seven', y: 60 },
      { x: 'Eight', y: 57, ...(isChecked && { lineData: { y: 48 } }) },
      { x: 'Nine', y: 14 },
      { x: 'Ten', y: 35 },
      { x: 'Eleven', y: 20, ...(isChecked && { lineData: { y: 1 } }) },
      { x: 'Twelve', y: 44, ...(isChecked && { lineData: { y: 10 } }) },
      { x: 'Thirteen', y: 33 },
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
            chartTitle="Vertical bar chart styled example "
            data={points}
            width={800}
            height={400}
            barWidth={20}
            useSingleColor={this.state.useSingleColor}
            yAxisTickCount={6}
            colors={customColors}
            hideLegend={true}
            lineLegendColor={getColorFromToken(DataVizPalette.color10)}
            enableReflow={true}
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
