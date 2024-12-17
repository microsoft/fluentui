/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  isDateArray,
  isNumberArray,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
} from './PlotlySchemaAdapter';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { downloadImage } from './helpers';
import { IChart } from '../../types/index';

import { IRefObject, useTheme } from '@fluentui/react';

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

  /**
   * Optional callback to access the IDeclarativeChart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDeclarativeChart>;
}

export interface IDeclarativeChart {
  download: () => void;
}

const useColorMapping = () => {
  const colorMap = React.useRef(new Map<string, string>());
  return colorMap;
};

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
  const colorMap = useColorMapping();
  const theme = useTheme();
  const isDarkTheme = theme?.isInverted ?? false;
  const chartRef = React.useRef<IChart>(null);

  const download = React.useCallback(() => {
    downloadImage(chartRef.current?.container, theme.palette.white);
  }, [theme]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      download,
    }),
    [download],
  );

  switch (plotlySchema.data[0].type) {
    case 'pie':
      return (
        <DonutChart {...transformPlotlyJsonToDonutProps(plotlySchema, colorMap, isDarkTheme)} componentRef={chartRef} />
      );
    case 'bar':
      const orientation = plotlySchema.data[0].orientation;
      if (orientation === 'h') {
        return (
          <HorizontalBarChartWithAxis
            {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, colorMap, isDarkTheme)}
            componentRef={chartRef}
          />
        );
      } else {
        if (['group', 'overlay'].includes(plotlySchema?.layout?.barmode)) {
          return (
            <GroupedVerticalBarChart
              {...transformPlotlyJsonToGVBCProps(plotlySchema, colorMap, isDarkTheme)}
              componentRef={chartRef}
            />
          );
        }
        return (
          <VerticalStackedBarChart
            {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
            componentRef={chartRef}
          />
        );
      }
    case 'scatter':
      const isAreaChart = plotlySchema.data.some((series: any) => series.fill === 'tonexty');
      if (isXDate || isXNumber) {
        if (isAreaChart) {
          return (
            <AreaChart
              {...transformPlotlyJsonToScatterChartProps(plotlySchema, true, colorMap, isDarkTheme)}
              componentRef={chartRef}
            />
          );
        }
        return (
          <LineChart
            {...transformPlotlyJsonToScatterChartProps(plotlySchema, false, colorMap, isDarkTheme)}
            componentRef={chartRef}
          />
        );
      }
      return (
        <VerticalStackedBarChart
          {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
          componentRef={chartRef}
        />
      );
    case 'heatmap':
      return <HeatMapChart {...transformPlotlyJsonToHeatmapProps(plotlySchema)} componentRef={chartRef} />;
    case 'sankey':
      return (
        <SankeyChart
          {...transformPlotlyJsonToSankeyProps(plotlySchema, colorMap, isDarkTheme)}
          componentRef={chartRef}
        />
      );
    case 'indicator':
      if (plotlySchema?.data?.[0]?.mode?.includes('gauge')) {
        return (
          <GaugeChart
            {...transformPlotlyJsonToGaugeProps(plotlySchema, colorMap, isDarkTheme)}
            componentRef={chartRef}
          />
        );
      }
      return <div>Unsupported Schema</div>;
    case 'histogram':
      return (
        <VerticalBarChart
          {...transformPlotlyJsonToVBCProps(plotlySchema, colorMap, isDarkTheme)}
          componentRef={chartRef}
        />
      );
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
