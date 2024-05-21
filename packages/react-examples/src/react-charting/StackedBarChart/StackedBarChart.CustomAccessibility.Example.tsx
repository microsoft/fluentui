import * as React from 'react';
import { StackedBarChart, IChartProps, IChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IStackedBarState {
  hideTooltip: boolean;
}

export class StackedBarChartCustomAccessibilityExample extends React.Component<{}, IStackedBarState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      hideTooltip: false,
    };
  }

  public render(): JSX.Element {
    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 3000000,
        color: DefaultPalette.blue,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '99%',
        callOutAccessibilityData: { ariaLabel: 'Bar series 1 of 1 2020/04/30 99%' },
      },
      { legend: 'second', data: 1, color: DefaultPalette.green },
    ];

    const data0: IChartProps = {
      chartTitle: 'Stacked Bar chart example',
      chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about Stacked Bar chart example' },
      chartDataAccessibilityData: { ariaLabel: 'number 3000000 out of 3000001' },
      chartData: points,
    };

    const data1: IChartProps = {
      chartTitle: 'Stacked Bar chart example with ignore fix style',
      chartTitleAccessibilityData: {
        ariaLabel: 'Bar chart depicting about Stacked Bar chart example with ignore fix style',
      },
      chartData: points,
    };

    return (
      <>
        <Checkbox
          label="Hide tooltip"
          checked={this.state.hideTooltip}
          onChange={this._onHideTooltipChange}
          styles={{ root: { marginBottom: '20px' } }}
        />
        <StackedBarChart
          data={data0}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={false}
          hideTooltip={this.state.hideTooltip}
        />
        <br />
        <StackedBarChart
          data={data1}
          href={'https://developer.microsoft.com/en-us/'}
          ignoreFixStyle={true}
          hideTooltip={this.state.hideTooltip}
        />
      </>
    );
  }

  private _onHideTooltipChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ hideTooltip: checked });
  };
}
