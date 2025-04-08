import * as React from 'react';
import {
  IChartDataPoint,
  MultiStackedBarChart,
  IChartProps,
  MultiStackedBarChartVariant,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IMSBCVariantExampleState {
  hideLabels: boolean;
}

export class MultiStackedBarChartVariantExample extends React.Component<{}, IMSBCVariantExampleState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      hideLabels: false,
    };
  }

  public render() {
    const chartPoints1: IChartDataPoint[] = [
      {
        legend: 'Debit card numbers (EU and USA)',
        data: 40,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: 'Passport numbers (USA)',
        data: 23,
        color: getColorFromToken(DataVizPalette.color5),
      },
      {
        legend: 'Social security numbers',
        data: 35,
        color: getColorFromToken(DataVizPalette.color3),
      },
      {
        legend: 'Credit card numbers',
        data: 87,
        color: getColorFromToken(DataVizPalette.color2),
      },
      {
        legend: 'Tax identification numbers (USA)',
        data: 87,
        color: getColorFromToken(DataVizPalette.color9),
      },
    ];

    const chartPoints2: IChartDataPoint[] = [
      {
        legend: 'Debit card numbers (EU and USA)',
        data: 40,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: 'Passport numbers (USA)',
        data: 56,
        color: getColorFromToken(DataVizPalette.color5),
      },
      {
        legend: 'Social security numbers',
        data: 35,
        color: getColorFromToken(DataVizPalette.color3),
      },
      {
        legend: 'Credit card numbers',
        data: 92,
        color: getColorFromToken(DataVizPalette.color2),
      },
      {
        legend: 'Tax identification numbers (USA)',
        data: 87,
        color: getColorFromToken(DataVizPalette.color9),
      },
    ];

    const chartPoints3: IChartDataPoint[] = [
      {
        legend: 'Phone Numbers',
        data: 40,
        color: getColorFromToken(DataVizPalette.color27),
      },
      {
        legend: 'Credit card Numbers',
        data: 23,
        color: getColorFromToken(DataVizPalette.color28),
      },
    ];

    const data: IChartProps[] = [
      {
        chartTitle: 'Monitored First',
        chartData: chartPoints1,
      },
      {
        chartTitle: 'Monitored Second',
        chartData: chartPoints2,
      },
      {
        chartTitle: 'Unmonitored',
        chartData: chartPoints3,
      },
    ];

    return (
      <>
        <Checkbox
          label="Hide labels"
          checked={this.state.hideLabels}
          onChange={this._onCheckChange}
          styles={{ root: { marginBottom: '20px' } }}
        />
        <MultiStackedBarChart
          data={data}
          variant={MultiStackedBarChartVariant.AbsoluteScale}
          hideLabels={this.state.hideLabels}
        />
      </>
    );
  }

  private _onCheckChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ hideLabels: checked });
  };
}
