/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToColumnProps,
  transformPlotlyJsonToLineChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToAreaChartProps,
} from './PlotlySchemaAdapter';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';

export interface DeclarativeChartProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * The schema representing the chart
   */
  chartSchema: any;
}

export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>((props, forwardedRef) => {
  switch (props.chartSchema.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(props.chartSchema)} />;
    case 'bar':
      const orientation = props.chartSchema.data[0].orientation;
      if (orientation === 'h') {
        return <HorizontalBarChartWithAxis {...transformPlotlyJsonToHorizontalBarWithAxisProps(props.chartSchema)} />;
      } else {
        return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(props.chartSchema)} />;
      }
    case 'scatter':
      const isAreaChart = props.chartSchema.data.some((series: any) => series.fill === 'tonexty');
      if (isAreaChart) {
        return <AreaChart {...transformPlotlyJsonToAreaChartProps(props.chartSchema)} />;
      } else {
        return <LineChart {...transformPlotlyJsonToLineChartProps(props.chartSchema)} />;
      }
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
