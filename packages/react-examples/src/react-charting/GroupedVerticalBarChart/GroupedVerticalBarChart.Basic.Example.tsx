import * as React from 'react';
import {
  GroupedVerticalBarChart,
  IGroupedVerticalBarChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface IGroupedBarChartState {
  width: number;
  height: number;
  barwidth: number;
  selectedCallout: 'singleCallout' | 'StackCallout';
  hideLabels: boolean;
  enableGradient: boolean;
  roundCorners: boolean;
  selectMultipleLegends: boolean;
}
export class GroupedVerticalBarChartBasicExample extends React.Component<{}, IGroupedBarChartState> {
  constructor(props: IGroupedVerticalBarChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 400,
      barwidth: 16,
      selectedCallout: 'singleCallout',
      hideLabels: false,
      enableGradient: false,
      roundCorners: false,
      selectMultipleLegends: false,
    };
  }

  public componentDidMount(): void {
    const style = document.createElement('style');
    const focusStylingCSS = `
    .containerDiv [contentEditable=true]:focus,
    .containerDiv [tabindex]:focus,
    .containerDiv area[href]:focus,
    .containerDiv button:focus,
    .containerDiv iframe:focus,
    .containerDiv input:focus,
    .containerDiv select:focus,
    .containerDiv textarea:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
    `;
    style.appendChild(document.createTextNode(focusStylingCSS));
    document.head.appendChild(style);
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
  private _onBarwidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ barwidth: parseInt(e.target.value, 10) });
  };
  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    this.setState({ selectedCallout: option.key as IGroupedBarChartState['selectedCallout'] });
  };
  private _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideLabels: checked });
  };

  private _onEnableGradientChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onRoundCornersChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _onLegendMultiSelectChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ selectMultipleLegends: checked });
  };

  private _basicExample(): JSX.Element {
    const data = [
      {
        name: 'Jan - Mar',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color3),
            legend: '2022',
            xAxisCalloutData: '2022/04/30',
            yAxisCalloutData: '29%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 1 of 2 2022, x value 2022/04/30, y value 29%',
            },
          },
          {
            key: 'series2',
            data: 44000,
            color: getColorFromToken(DataVizPalette.color4),
            legend: '2023',
            xAxisCalloutData: '2023/04/30',
            yAxisCalloutData: '44%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 2 of 2 2023, x value 2023/04/30, y value 44%',
            },
          },
          {
            key: 'series3',
            data: 54000,
            color: getColorFromToken(DataVizPalette.color5),
            legend: '2024',
            xAxisCalloutData: '2024/04/30',
            yAxisCalloutData: '44%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 3 of 4 2022, x value 2024/04/30, y value 44%',
            },
          },
          {
            key: 'series4',
            data: 24000,
            color: getColorFromToken(DataVizPalette.color6),
            legend: '2021',
            xAxisCalloutData: '2021/04/30',
            yAxisCalloutData: '44%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 4 of 4 2021, x value 2021/04/30, y value 44%',
            },
          },
        ],
      },
      {
        name: 'Apr - Jun',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color3),
            legend: '2022',
            xAxisCalloutData: '2022/05/30',
            yAxisCalloutData: '29%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 1 of 2 2022, x value 2022/05/30, y value 29%',
            },
          },
          {
            key: 'series2',
            data: 3000,
            color: getColorFromToken(DataVizPalette.color4),
            legend: '2023',
            xAxisCalloutData: '2023/05/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 2 of 2 2023, x value 2023/05/30, y value 3%',
            },
          },
          {
            key: 'series3',
            data: 9000,
            color: getColorFromToken(DataVizPalette.color5),
            legend: '2024',
            xAxisCalloutData: '2024/05/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 3 of 4 2024, x value 2024/05/30, y value 3%',
            },
          },
          {
            key: 'series4',
            data: 12000,
            color: getColorFromToken(DataVizPalette.color6),
            legend: '2021',
            xAxisCalloutData: '2021/05/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 4 of 4 2021, x value 2021/05/30, y value 3%',
            },
          },
        ],
      },

      {
        name: 'Jul - Sep',
        series: [
          {
            key: 'series1',
            data: 14000,
            color: getColorFromToken(DataVizPalette.color3),
            legend: '2022',
            xAxisCalloutData: '2022/06/30',
            yAxisCalloutData: '13%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 1 of 2 2022, x value 2022/06/30, y value 13%',
            },
          },
          {
            key: 'series2',
            data: 50000,
            color: getColorFromToken(DataVizPalette.color4),
            legend: '2023',
            xAxisCalloutData: '2023/06/30',
            yAxisCalloutData: '50%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 2 of 2 2023, x value 2023/06/30, y value 50%',
            },
          },
          {
            key: 'series3',
            data: 60000,
            color: getColorFromToken(DataVizPalette.color5),
            legend: '2024',
            xAxisCalloutData: '2024/06/30',
            yAxisCalloutData: '50%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 3 of 4 2024, x value 2024/06/30, y value 50%',
            },
          },
          {
            key: 'series4',
            data: 10000,
            color: getColorFromToken(DataVizPalette.color6),
            legend: '2021',
            xAxisCalloutData: '2021/06/30',
            yAxisCalloutData: '50%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 4 of 4 2021, x value 2021/06/30, y value 50%',
            },
          },
        ],
      },
      {
        name: 'Oct - Dec',
        series: [
          {
            key: 'series1',
            data: 33000,
            color: getColorFromToken(DataVizPalette.color3),
            legend: '2022',
            xAxisCalloutData: '2022/07/30',
            yAxisCalloutData: '29%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 1 of 2 2022, x value 2022/07/30, y value 29%',
            },
          },
          {
            key: 'series2',
            data: 3000,
            color: getColorFromToken(DataVizPalette.color4),
            legend: '2023',
            xAxisCalloutData: '2023/07/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 2 of 2 2023, x value 2023/07/30, y value 3%',
            },
          },
          {
            key: 'series3',
            data: 6000,
            color: getColorFromToken(DataVizPalette.color5),
            legend: '2024',
            xAxisCalloutData: '2024/07/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 3 of 4 2024, x value 2024/07/30, y value 3%',
            },
          },
          {
            key: 'series4',
            data: 15000,
            color: getColorFromToken(DataVizPalette.color6),
            legend: '2021',
            xAxisCalloutData: '2021/07/30',
            yAxisCalloutData: '3%',
            callOutAccessibilityData: {
              ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 4 of 4 2021, x value 2021/07/30, y value 3%',
            },
          },
        ],
      },
    ];

    const options: IChoiceGroupOption[] = [
      { key: 'singleCallout', text: 'Single callout' },
      { key: 'StackCallout', text: 'Stack callout' },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    return (
      <div className="containerDiv">
        <div>
          In this example the <code>xAxisCalloutData</code> property overrides the x value that is shown on the callout.
          So instead of a numeric value, the callout will show the date that is passed in the{' '}
          <code>xAxisCalloutData</code> property.
        </div>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={200}
          max={1000}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <br />
        <label htmlFor="changeBarwidth">Change Barwidth:</label>
        <input
          type="range"
          value={this.state.barwidth}
          min={1}
          max={50}
          id="changeBarwidth"
          onChange={this._onBarwidthChange}
          aria-valuetext={`ChangeBarwidthslider${this.state.barwidth}`}
        />
        <label>{this.state.barwidth}</label>
        <ChoiceGroup
          options={options}
          selectedKey={this.state.selectedCallout}
          onChange={this._onChange}
          label="Pick one"
        />
        <Checkbox
          label="Hide labels"
          checked={this.state.hideLabels}
          onChange={this._onCheckChange}
          styles={{ root: { marginTop: '20px' } }}
        />
        <div style={{ display: 'flex' }}>
          <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onEnableGradientChange} />
          &nbsp;&nbsp;
          <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onRoundCornersChange} />
          &nbsp;&nbsp;
          <Toggle
            label="Select Multiple Legends"
            onText="ON"
            offText="OFF"
            onChange={this._onLegendMultiSelectChange}
          />
        </div>
        <div style={rootStyle}>
          <GroupedVerticalBarChart
            culture={window.navigator.language}
            chartTitle="Grouped Vertical Bar chart basic example"
            data={data}
            height={this.state.height}
            width={this.state.width}
            isCalloutForStack={this.state.selectedCallout === 'StackCallout'}
            barwidth={this.state.barwidth}
            hideLabels={this.state.hideLabels}
            enableReflow={true}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
            legendProps={{
              canSelectMultipleLegends: this.state.selectMultipleLegends,
            }}
          />
        </div>
      </div>
    );
  }
}
