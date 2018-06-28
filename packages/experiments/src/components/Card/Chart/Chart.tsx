import * as React from 'react';
import { IChartInternalProps, ChartType } from './Chart.types';
import { VerticalBarChart } from '../../../../../charting/src/components/VerticalBarChart';
import { LineChart } from '../../../../../charting/src/components/LineChart';
import { CardSize } from '../Card.types';

interface IChartSize {
  width: number;
  height: number;
}

export class Chart extends React.Component<IChartInternalProps, {}> {
  public render(): JSX.Element {
    const size = this._getSize();
    switch (this.props.chartType) {
      case ChartType.VerticalBarChart: {
        return (
          <VerticalBarChart
            data={this.props.data}
            width={size.width}
            height={size.height}
            barWidth={this.props.barWidth}
            chartLabel={this.props.chartLabel}
            colors={this.props.colors}
          />
        );
      }
      case ChartType.LineChart: {
        return (
          <LineChart
            data={this.props.data}
            width={size.width}
            height={size.height}
            strokeWidth={this.props.strokeWidth}
            chartLabel={this.props.chartLabel}
            color={this.props.colors && this.props.colors.length > 0 ? this.props.colors[0] : undefined}
          />
        );
      }
    }
  }

  private _getSize(): IChartSize {
    switch (this.props.cardSize) {
      case CardSize.small:
        return { width: 100, height: 50 };
      case CardSize.mediumTall:
        return { width: 100, height: 200 };
      case CardSize.mediumWide:
        return { width: 450, height: 50 };
      case CardSize.large:
        return { width: 450, height: 200 };
    }
  }
}
