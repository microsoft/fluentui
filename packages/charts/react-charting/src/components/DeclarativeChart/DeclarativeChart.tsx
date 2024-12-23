/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { IRefObject } from '@fluentui/react/lib/Utilities';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  isDateArray,
  isNumberArray,
  isMonthArray,
  updateXValues,
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
import { IImageExportOptions, toImage } from './imageExporter';
import { IChart } from '../../types/index';

/**
 * DeclarativeChart schema.
 * {@docCategory DeclarativeChart}
 */
export interface Schema {
  /**
   * Plotly schema represented as JSON object
   */
  plotlySchema: any;
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

/**
 * {@docCategory DeclarativeChart}
 */
export interface IDeclarativeChart {
  exportAsImage: (opts?: IImageExportOptions) => Promise<string>;
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
  const { data, layout, selectedLegends } = plotlySchema;
  const xValues = data[0].x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);
  const isXMonth = isMonthArray(xValues);
  const colorMap = useColorMapping();
  const theme = useTheme();
  const isDarkTheme = theme?.isInverted ?? false;
  const chartRef = React.useRef<IChart>(null);

  const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends ?? []);
  const onActiveLegendsChange = (keys: string[]) => {
    setActiveLegends(keys);
    if (props.onSchemaChange) {
      props.onSchemaChange({ plotlySchema: { data, layout, selectedLegends: keys } });
    }
  };

  const legendProps = {
    canSelectMultipleLegends: false,
    onChange: onActiveLegendsChange,
    ...(activeLegends.length > 0 && { selectedLegend: activeLegends[0] }),
  };

  const exportAsImage = React.useCallback(
    (opts?: IImageExportOptions) => {
      return toImage(chartRef.current?.chartContainer, {
        background: theme.palette.white,
        ...opts,
      });
    },
    [theme],
  );

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      exportAsImage,
    }),
    [exportAsImage],
  );

  switch (data[0].type) {
    case 'pie':
      return (
        <DonutChart
          {...transformPlotlyJsonToDonutProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={legendProps}
          componentRef={chartRef}
        />
      );
    case 'bar':
      const orientation = data[0].orientation;
      if (orientation === 'h') {
        return (
          <HorizontalBarChartWithAxis
            {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={legendProps}
            componentRef={chartRef}
          />
        );
      } else {
        if (['group', 'overlay'].includes(plotlySchema?.layout?.barmode)) {
          return (
            <GroupedVerticalBarChart
              {...transformPlotlyJsonToGVBCProps(plotlySchema, colorMap, isDarkTheme)}
              legendProps={legendProps}
              componentRef={chartRef}
            />
          );
        }
        return (
          <VerticalStackedBarChart
            {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={legendProps}
            componentRef={chartRef}
          />
        );
      }
    case 'scatter':
      const isAreaChart = data.some((series: any) => series.fill === 'tonexty' || series.fill === 'tozeroy');
      const renderChart = (chartProps: any) => {
        if (isAreaChart) {
          return <AreaChart {...chartProps} />;
        }
        return <LineChart {...chartProps} />;
      };
      if (isXDate || isXNumber) {
        const chartProps = {
          ...transformPlotlyJsonToScatterChartProps({ data, layout }, isAreaChart, colorMap, isDarkTheme),
          legendProps,
        };
        return renderChart(chartProps);
      } else if (isXMonth) {
        const updatedData = data.map((dataPoint: any) => ({
          ...dataPoint,
          x: updateXValues(dataPoint.x),
        }));
        const chartProps = {
          ...transformPlotlyJsonToScatterChartProps({ data: updatedData, layout }, isAreaChart, colorMap, isDarkTheme),
          legendProps,
        };
        return renderChart(chartProps);
      }
      return (
        <VerticalStackedBarChart
          {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={legendProps}
          componentRef={chartRef}
        />
      );
    case 'heatmap':
      return (
        <HeatMapChart
          {...transformPlotlyJsonToHeatmapProps(plotlySchema)}
          legendProps={legendProps}
          componentRef={chartRef}
        />
      );
    case 'sankey':
      return (
        <SankeyChart
          {...transformPlotlyJsonToSankeyProps(plotlySchema, colorMap, isDarkTheme)}
          componentRef={chartRef}
        />
      );
    case 'indicator':
      if (data?.[0]?.mode?.includes('gauge')) {
        return (
          <GaugeChart
            {...transformPlotlyJsonToGaugeProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={legendProps}
            componentRef={chartRef}
          />
        );
      }
      return <div>Unsupported Schema</div>;
    case 'histogram':
      return (
        <VerticalBarChart
          {...transformPlotlyJsonToVBCProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={legendProps}
          componentRef={chartRef}
        />
      );
    default:
      return <div>Unsupported Schema</div>;
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
