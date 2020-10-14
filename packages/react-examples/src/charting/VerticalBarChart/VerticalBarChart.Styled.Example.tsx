import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '@uifabric/charting';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export class VerticalBarChartStyledExample extends React.Component<IVerticalBarChartProps, { isChecked: boolean }> {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      isChecked: false,
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
      { x: 'Elven', y: 20, ...(isChecked && { lineData: { y: 1 } }) },
      { x: 'Twelve', y: 44, ...(isChecked && { lineData: { y: 10 } }) },
      { x: 'Thirteen', y: 33 },
    ];

    const customColors = [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark];

    return (
      <>
        <Checkbox
          label="show  line(This will draw the line)"
          checked={this.state.isChecked}
          onChange={this._onChange}
        />
        <div style={{ width: '800px', height: '400px' }}>
          <VerticalBarChart
            data={points}
            width={800}
            height={400}
            barWidth={20}
            yAxisTickCount={6}
            colors={customColors}
            hideLegend={true}
          />
        </div>
      </>
    );
  }
  private _onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ isChecked: checked });
  };
}
