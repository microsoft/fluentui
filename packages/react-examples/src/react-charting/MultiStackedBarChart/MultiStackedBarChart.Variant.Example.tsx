import * as React from 'react';
import {
  IChartDataPoint,
  MultiStackedBarChart,
  IChartProps,
  MultiStackedBarChartVariant,
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
        color: '#0099BC',
      },
      {
        legend: 'Passport numbers (USA)',
        data: 23,
        color: '#77004D',
      },
      {
        legend: 'Social security numbers',
        data: 35,
        color: '#4F68ED',
      },
      {
        legend: 'Credit card numbers',
        data: 87,
        color: '#AE8C00',
      },
      {
        legend: 'Tax identification numbers (USA)',
        data: 87,
        color: '#004E8C',
      },
    ];

    const chartPoints2: IChartDataPoint[] = [
      {
        legend: 'Debit card numbers (EU and USA)',
        data: 40,
        color: '#0099BC',
      },
      {
        legend: 'Passport numbers (USA)',
        data: 56,
        color: '#77004D',
      },
      {
        legend: 'Social security numbers',
        data: 35,
        color: '#4F68ED',
      },
      {
        legend: 'Credit card numbers',
        data: 92,
        color: '#AE8C00',
      },
      {
        legend: 'Tax identification numbers (USA)',
        data: 87,
        color: '#004E8C',
      },
    ];

    const chartPoints3: IChartDataPoint[] = [
      {
        legend: 'Phone Numbers',
        data: 40,
        color: '#881798',
      },
      {
        legend: 'Credit card Numbers',
        data: 23,
        color: '#AE8C00',
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
