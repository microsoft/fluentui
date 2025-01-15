/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { IRefObject } from '@fluentui/react/lib/Utilities';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { PlotData, PlotlySchema } from './PlotlySchema';
//import type { Data, Layout } from './PlotlySchema';
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
import { LineChart, ILineChartProps } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart, IAreaChartProps } from '../AreaChart/index';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const plotlyInput = plotlySchema as PlotlySchema;
  let { selectedLegends } = plotlySchema;
  const colorMap = useColorMapping();
  const theme = useTheme();
  const isDarkTheme = theme?.isInverted ?? false;
  const chartRef = React.useRef<IChart>(null);
  let fallbackVSBC = false;

  if (!isArrayOrTypedArray(selectedLegends)) {
    selectedLegends = [];
  }

  const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends);
  const onActiveLegendsChange = (keys: string[]) => {
    setActiveLegends(keys);
    if (props.onSchemaChange) {
      props.onSchemaChange({ plotlySchema: { plotlyInput, selectedLegends: keys } });
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

  const checkAndRenderChart = (
    renderChart: (chartProps: ILineChartProps | IAreaChartProps) => JSX.Element,
    isAreaChart: boolean = false,
  ) => {
    const xValues = (plotlyInput.data[0] as PlotData).x;
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const isXMonth = isMonthArray(xValues);
    if (isXDate || isXNumber) {
      const chartProps = {
        ...transformPlotlyJsonToScatterChartProps(
          { data: plotlyInput.data, layout: plotlyInput.layout },
          isAreaChart,
          colorMap,
          isDarkTheme,
        ),
        legendProps,
        componentRef: chartRef,
        calloutProps: { layerProps: { eventBubblingEnabled: true } },
      };
      return renderChart(chartProps);
    } else if (isXMonth) {
      const updatedData = plotlyInput.data.map((dataPoint: PlotData) => ({
        ...dataPoint,
        x: updateXValues(dataPoint.x),
      }));
      const chartProps = {
        ...transformPlotlyJsonToScatterChartProps(
          { data: updatedData, layout: plotlyInput.layout },
          isAreaChart,
          colorMap,
          isDarkTheme,
        ),
        legendProps,
        componentRef: chartRef,
        calloutProps: { layerProps: { eventBubblingEnabled: true } },
      };
      return renderChart(chartProps);
    }
    // Unsupported schema, render as VerticalStackedBarChart
    fallbackVSBC = true;
    return (
      <VerticalStackedBarChart
        {...transformPlotlyJsonToVSBCProps(plotlySchema, colorMap, isDarkTheme, fallbackVSBC)}
        legendProps={multiSelectLegendProps}
        componentRef={chartRef}
        calloutProps={{ layerProps: { eventBubblingEnabled: true } }}
      />
    );
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

  switch (plotlyInput.data[0].type) {
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
      const orientation = plotlyInput.data[0].orientation;
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
      const isAreaChart = plotlyInput.data.some(
        (series: PlotData) => series.fill === 'tonexty' || series.fill === 'tozeroy',
      );
      const renderChart = (chartProps: ILineChartProps | IAreaChartProps) => {
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
      return checkAndRenderChart(renderChart, isAreaChart);
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
      if (plotlyInput.data?.[0]?.mode?.includes('gauge')) {
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
      const xValues = (plotlyInput.data[0] as PlotData).x;
      const yValues = (plotlyInput.data[0] as PlotData).y;
      if (xValues && yValues && xValues.length > 0 && yValues.length > 0) {
        const renderLineChartJsx = (chartProps: ILineChartProps) => {
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
        return checkAndRenderChart(renderLineChartJsx);
      }
      throw new Error('Unsupported chart schema');
  }
});
DeclarativeChart.displayName = 'DeclarativeChart';
