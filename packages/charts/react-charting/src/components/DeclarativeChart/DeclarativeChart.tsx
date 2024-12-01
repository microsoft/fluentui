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

export interface Schema {
  /**
   * Plotly schema represented as JSON object
   */
  plotlySchema: any;

  /**
   * The legends selected by the user to persist in the chart
   */
  selectedLegends?: string[];

  /**
   * Dictionary for localizing the accessibility labels
   */
  accesibilityLabels?: { [key: string]: string };
}

/**
 * DeclarativeChart props.
 * {@docCategory DeclarativeChart}
 */
export interface DeclarativeChartProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * The schema representing the chart data, layout and configuration
   */
  chartSchema: Schema;

  /**
   * Callback when an event occurs
   */
  onSchemaChange?: (eventData: Schema) => void;
}

/**
 * DeclarativeChart component.
 * {@docCategory DeclarativeChart}
 */
export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>((props, forwardedRef) => {
  const { plotlySchema } = props.chartSchema;
  const xValues = plotlySchema.data[0].x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);

  switch (plotlySchema.data[0].type) {
    case 'pie':
      return <DonutChart {...transformPlotlyJsonToDonutProps(plotlySchema)} />;
    case 'bar':
      const orientation = plotlySchema.data[0].orientation;
      if (orientation === 'h') {
        return <HorizontalBarChartWithAxis {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema)} />;
      } else {
        return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(plotlySchema)} />;
      }
    case 'scatter':
      const isAreaChart = plotlySchema.data.some((series: any) => series.fill === 'tonexty');
      if (isXDate || isXNumber) {
        if (isAreaChart) {
          return <AreaChart {...transformPlotlyJsonToScatterChartProps(plotlySchema, true)} />;
        }
        return <LineChart {...transformPlotlyJsonToScatterChartProps(plotlySchema, false)} />;
      }
      return <VerticalStackedBarChart {...transformPlotlyJsonToColumnProps(plotlySchema)} />;
    case 'heatmap':
      return <HeatMapChart {...transformPlotlyJsonToHeatmapProps(plotlySchema)} />;
    case 'sankey':
      return <SankeyChart {...transformPlotlyJsonToSankeyProps(plotlySchema)} />;
    case 'indicator':
      if (plotlySchema?.data?.[0]?.mode?.includes('gauge')) {
        return <GaugeChart {...transformPlotlyJsonToGaugeProps(plotlySchema)} />;
      }
      return <div>Unsupported Schema</div>;
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
