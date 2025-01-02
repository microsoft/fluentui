/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { IRefObject } from '@fluentui/react/lib/Utilities';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import {
  isArrayOrTypedArray,
  isDateArray,
  isNumberArray,
  isMonthArray,
  sanitizeJson,
  updateXValues,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
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
  const { plotlySchema } = sanitizeJson(props.chartSchema);
  const { data, layout } = plotlySchema;
  let { selectedLegends } = plotlySchema;
  const xValues = data[0].x;
  const isXDate = isDateArray(xValues);
  const isXNumber = isNumberArray(xValues);
  const isXMonth = isMonthArray(xValues);
  const colorMap = useColorMapping();
  const theme = useTheme();
  const isDarkTheme = theme?.isInverted ?? false;
  const chartRef = React.useRef<IChart>(null);

  if (!isArrayOrTypedArray(selectedLegends)) {
    selectedLegends = [];
  }

  const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends);
  const onActiveLegendsChange = (keys: string[]) => {
    setActiveLegends(keys);
    if (props.onSchemaChange) {
      props.onSchemaChange({ plotlySchema: { data, layout, selectedLegends: keys } });
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { plotlySchema } = sanitizeJson(props.chartSchema);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { selectedLegends } = plotlySchema;
    setActiveLegends(selectedLegends ?? []);
  }, [props.chartSchema]);

  const legendProps = {
    canSelectMultipleLegends: false,
    onChange: onActiveLegendsChange,
    selectedLegend: activeLegends.slice(0, 1)[0],
  };

  const exportAsImage = React.useCallback(
    (opts?: IImageExportOptions) => {
      return toImage(chartRef.current?.chartContainer, {
        background: theme.semanticColors.bodyBackground,
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

  const multiSelectLegendProps = {
    ...legendProps,
    canSelectMultipleLegends: true,
    selectedLegends: activeLegends,
  };

  switch (data[0].type) {
    case 'pie':
      return (
        <DonutChart
          {...transformPlotlyJsonToDonutProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={multiSelectLegendProps}
          componentRef={chartRef}
          // Bubble event to prevent right click to open menu on the callout
          calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
        />
      );
    case 'bar':
      const orientation = data[0].orientation;
      if (orientation === 'h') {
        return (
          <HorizontalBarChartWithAxis
            {...transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={multiSelectLegendProps}
            componentRef={chartRef}
            calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
          />
        );
      } else {
        if (['group', 'overlay'].includes(plotlySchema?.layout?.barmode)) {
          return (
            <GroupedVerticalBarChart
              {...transformPlotlyJsonToGVBCProps(plotlySchema, colorMap, isDarkTheme)}
              legendProps={multiSelectLegendProps}
              componentRef={chartRef}
              calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
            />
          );
        }
        return (
          <VerticalStackedBarChart
            {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={multiSelectLegendProps}
            componentRef={chartRef}
            calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
          />
        );
      }
    case 'scatter':
      const isAreaChart = data.some((series: any) => series.fill === 'tonexty' || series.fill === 'tozeroy');
      const renderChart = (chartProps: any) => {
        if (isAreaChart) {
          return (
            <AreaChart
              {...chartProps}
              legendProps={{ ...legendProps, canSelectMultipleLegends: true, selectedLegends: activeLegends }}
            />
          );
        }
        return (
          <LineChart
            {...{
              ...chartProps,
              legendProps: {
                onChange: onActiveLegendsChange,
                canSelectMultipleLegends: true,
                selectedLegends: activeLegends,
              },
            }}
          />
        );
      };
      if (isXDate || isXNumber) {
        const chartProps = {
          ...transformPlotlyJsonToScatterChartProps({ data, layout }, isAreaChart, colorMap, isDarkTheme),
          legendProps,
          componentRef: chartRef,
          calloutProps: { layerProps: { eventBubblingEnabled: true } },
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
          componentRef: chartRef,
          calloutProps: { layerProps: { eventBubblingEnabled: true } },
        };
        return renderChart(chartProps);
      }
      return (
        <VerticalStackedBarChart
          {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={multiSelectLegendProps}
          componentRef={chartRef}
          calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
        />
      );
    case 'heatmap':
      return (
        <HeatMapChart
          {...transformPlotlyJsonToHeatmapProps(plotlySchema)}
          componentRef={chartRef}
          calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
        />
      );
    case 'sankey':
      return (
        <SankeyChart
          {...transformPlotlyJsonToSankeyProps(plotlySchema, colorMap, isDarkTheme)}
          componentRef={chartRef}
          calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
        />
      );
    case 'indicator':
      if (data?.[0]?.mode?.includes('gauge')) {
        return (
          <GaugeChart
            {...transformPlotlyJsonToGaugeProps(plotlySchema, colorMap, isDarkTheme)}
            legendProps={multiSelectLegendProps}
            componentRef={chartRef}
            calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
          />
        );
      }
      return <div>Unsupported Schema</div>;
    case 'histogram':
      return (
        <VerticalBarChart
          {...transformPlotlyJsonToVBCProps(plotlySchema, colorMap, isDarkTheme)}
          legendProps={multiSelectLegendProps}
          componentRef={chartRef}
          calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
        />
      );
    default:
      throw new Error('Unsupported chart schema');
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
