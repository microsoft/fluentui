/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToColumnProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  isDateArray,
  isNumberArray,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
} from './PlotlySchemaAdapter';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';

/**
 * DeclarativeChart props.
 * {@docCategory DeclarativeChart}
 */
export interface DeclarativeChartProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * The schema representing the chart
   */
  chartSchema: any;
}

const useColorMapping = () => {
  const colorMapping = React.useRef(new Map<string, string>());
  const colorIndex = React.useRef(0);
  return {
    colorMapping,
    colorIndex,
  };
};

/**
 * DeclarativeChart component.
 * {@docCategory DeclarativeChart}
 */
export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>((props, forwardedRef) => {
  const colorMap = useColorMapping();
  const xValues = props.chartSchema.data[0].x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);

  switch (props.chartSchema.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(props.chartSchema, colorMap)} />;
    case 'bar':
      const orientation = props.chartSchema.data[0].orientation;
      if (orientation === 'h') {
        return (
          <HorizontalBarChartWithAxis
            {...transformPlotlyJsonToHorizontalBarWithAxisProps(props.chartSchema, colorMap)}
          />
        );
      } else {
        return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(props.chartSchema, colorMap)} />;
      }
    case 'scatter':
      const isAreaChart = props.chartSchema.data.some((series: any) => series.fill === 'tonexty');
      if (isXDate || isXNumber) {
        if (isAreaChart) {
          return <AreaChart {...transformPlotlyJsonToScatterChartProps(props.chartSchema, true, colorMap)} />;
        }
        return <LineChart {...transformPlotlyJsonToScatterChartProps(props.chartSchema, false, colorMap)} />;
      }
      return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(props.chartSchema, colorMap)} />;
    case 'heatmap':
      return <HeatMapChart {...transformPlotlyJsonToHeatmapProps(props.chartSchema)} />;
    case 'sankey':
      return <SankeyChart {...transformPlotlyJsonToSankeyProps(props.chartSchema, colorMap)} />;
    case 'indicator':
      if (props.chartSchema?.data?.[0]?.mode?.includes('gauge')) {
        return <GaugeChart {...transformPlotlyJsonToGaugeProps(props.chartSchema, colorMap)} />;
      }
      return <div>Unsupported Schema</div>;
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
