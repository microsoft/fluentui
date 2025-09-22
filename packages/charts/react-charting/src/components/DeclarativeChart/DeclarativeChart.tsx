/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { IRefObject } from '@fluentui/react/lib/Utilities';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { decodeBase64Fields } from '@fluentui/chart-utilities';
import type { Data, PlotData, PlotlySchema, OutputChartType, TraceInfo } from '@fluentui/chart-utilities';
import { isArrayOrTypedArray, isMonthArray, mapFluentChart, sanitizeJson } from '@fluentui/chart-utilities';

import type { GridProperties } from './PlotlySchemaAdapter';
import {
  correctYearMonth,
  getGridProperties,
  isNonPlotType,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToAreaChartProps,
  transformPlotlyJsonToLineChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
  transformPlotlyJsonToChartTableProps,
  transformPlotlyJsonToScatterChartProps,
  projectPolarToCartesian,
  getAllupLegendsProps,
  NON_PLOT_KEY_PREFIX,
  SINGLE_REPEAT,
  transformPlotlyJsonToFunnelChartProps,
  transformPlotlyJsonToGanttChartProps,
} from './PlotlySchemaAdapter';
import type { ColorwayType } from './PlotlyColorAdapter';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { IChart, IImageExportOptions } from '../../types/index';
import { withResponsiveContainer } from '../ResponsiveContainer/withResponsiveContainer';
import { ScatterChart } from '../ScatterChart/index';
import { ChartTable } from '../ChartTable/index';
import { FunnelChart } from '../FunnelChart/FunnelChart';
import { GanttChart } from '../GanttChart/index';
import { ILegendsProps, Legends } from '../Legends/index';

const ResponsiveDonutChart = withResponsiveContainer(DonutChart);
const ResponsiveVerticalStackedBarChart = withResponsiveContainer(VerticalStackedBarChart);
const ResponsiveLineChart = withResponsiveContainer(LineChart);
const ResponsiveHorizontalBarChartWithAxis = withResponsiveContainer(HorizontalBarChartWithAxis);
const ResponsiveAreaChart = withResponsiveContainer(AreaChart);
const ResponsiveHeatMapChart = withResponsiveContainer(HeatMapChart);
const ResponsiveSankeyChart = withResponsiveContainer(SankeyChart);
const ResponsiveGaugeChart = withResponsiveContainer(GaugeChart);
const ResponsiveGroupedVerticalBarChart = withResponsiveContainer(GroupedVerticalBarChart);
const ResponsiveVerticalBarChart = withResponsiveContainer(VerticalBarChart);
const ResponsiveScatterChart = withResponsiveContainer(ScatterChart);
const ResponsiveChartTable = withResponsiveContainer(ChartTable);
// Removing responsive wrapper for FunnelChart as responsive container is not working with FunnelChart
//const ResponsiveFunnelChart = withResponsiveContainer(FunnelChart);
const ResponsiveGanttChart = withResponsiveContainer(GanttChart);

// Default x-axis key for grouping traces. Also applicable for PieData and SankeyData where x-axis is not defined.
const DEFAULT_XAXIS = 'x';

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

  /**
   * Optional prop to specify the colorway type of the chart.
   * - 'default': Use Fluent UI color palette aligning with plotly colorway.
   * - 'builtin': Use Fluent UI colorway.
   * - 'others': Reserved for future colorways.
   * @default 'default'
   */
  colorwayType?: ColorwayType;
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

function renderChart<TProps>(
  Renderer: React.ComponentType<TProps>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformer: (...args: any[]) => TProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformerArgs: any[],
  commonProps: Partial<TProps>,
  cellRow: number,
  cellColumn: number,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): JSX.Element {
  const chartProps = transformer(...transformerArgs);
  return (
    <div
      key={`${cellRow}_${cellColumn}`}
      style={{
        gridRowStart: cellRow,
        gridRowEnd: cellRow + 1,
        gridColumnStart: cellColumn,
        gridColumnEnd: cellColumn + 1,
      }}
    >
      <Renderer {...chartProps} {...commonProps} />
    </div>
  );
}

type PreTransformHooks = {
  preTransformCondition?: (plotlySchema: PlotlySchema) => boolean;
  preTransformOperation?: (plotlySchema: PlotlySchema) => PlotlySchema;
};

const LineAreaPreTransformOp = (plotlyInput: PlotlySchema) => {
  const xValues = (plotlyInput.data[0] as PlotData).x;
  const isXMonth = isMonthArray(xValues);
  let renderData = plotlyInput.data;
  if (isXMonth) {
    renderData = plotlyInput.data.map((dataPoint: PlotData) => ({
      ...dataPoint,
      x: correctYearMonth(dataPoint.x),
    }));
  }
  return { data: renderData, layout: plotlyInput.layout };
};

type ChartTypeMap = {
  donut: {
    transformer: typeof transformPlotlyJsonToDonutProps;
    renderer: typeof ResponsiveDonutChart;
  } & PreTransformHooks;
  sankey: {
    transformer: typeof transformPlotlyJsonToSankeyProps;
    renderer: typeof ResponsiveSankeyChart;
  } & PreTransformHooks;
  table: {
    transformer: typeof transformPlotlyJsonToChartTableProps;
    renderer: typeof ResponsiveChartTable;
  } & PreTransformHooks;
  horizontalbar: {
    transformer: typeof transformPlotlyJsonToHorizontalBarWithAxisProps;
    renderer: typeof ResponsiveHorizontalBarChartWithAxis;
  } & PreTransformHooks;
  groupedverticalbar: {
    transformer: typeof transformPlotlyJsonToGVBCProps;
    renderer: typeof ResponsiveGroupedVerticalBarChart;
  } & PreTransformHooks;
  verticalstackedbar: {
    transformer: typeof transformPlotlyJsonToVSBCProps;
    renderer: typeof ResponsiveVerticalStackedBarChart;
  } & PreTransformHooks;
  heatmap: {
    transformer: typeof transformPlotlyJsonToHeatmapProps;
    renderer: typeof ResponsiveHeatMapChart;
  } & PreTransformHooks;
  gauge: {
    transformer: typeof transformPlotlyJsonToGaugeProps;
    renderer: typeof ResponsiveGaugeChart;
  } & PreTransformHooks;
  verticalbar: {
    transformer: typeof transformPlotlyJsonToVBCProps;
    renderer: typeof ResponsiveVerticalBarChart;
  } & PreTransformHooks;
  area: {
    transformer: typeof transformPlotlyJsonToAreaChartProps;
    renderer: typeof ResponsiveAreaChart;
  } & PreTransformHooks;
  line: {
    transformer: typeof transformPlotlyJsonToLineChartProps;
    renderer: typeof ResponsiveLineChart;
  } & PreTransformHooks;
  scatter: {
    transformer: typeof transformPlotlyJsonToScatterChartProps;
    renderer: typeof ResponsiveScatterChart;
  } & PreTransformHooks;
  funnel: {
    transformer: typeof transformPlotlyJsonToFunnelChartProps;
    renderer: typeof FunnelChart;
  } & PreTransformHooks;
  gantt: {
    transformer: typeof transformPlotlyJsonToGanttChartProps;
    renderer: typeof ResponsiveGanttChart;
  } & PreTransformHooks;
  fallback: {
    transformer: typeof transformPlotlyJsonToVSBCProps;
    renderer: typeof ResponsiveVerticalStackedBarChart;
  } & PreTransformHooks;
};

const chartMap: ChartTypeMap = {
  // PieData category charts
  donut: {
    transformer: transformPlotlyJsonToDonutProps,
    renderer: ResponsiveDonutChart,
  },
  // SankeyData category charts
  sankey: {
    transformer: transformPlotlyJsonToSankeyProps,
    renderer: ResponsiveSankeyChart,
  },
  // TableData category charts
  table: {
    transformer: transformPlotlyJsonToChartTableProps,
    renderer: ResponsiveChartTable,
  },
  // PlotData category charts
  horizontalbar: {
    transformer: transformPlotlyJsonToHorizontalBarWithAxisProps,
    renderer: ResponsiveHorizontalBarChartWithAxis,
  },
  groupedverticalbar: {
    transformer: transformPlotlyJsonToGVBCProps,
    renderer: ResponsiveGroupedVerticalBarChart,
  },
  verticalstackedbar: {
    transformer: transformPlotlyJsonToVSBCProps,
    renderer: ResponsiveVerticalStackedBarChart,
  },
  heatmap: {
    transformer: transformPlotlyJsonToHeatmapProps,
    renderer: ResponsiveHeatMapChart,
  },
  gauge: {
    transformer: transformPlotlyJsonToGaugeProps,
    renderer: ResponsiveGaugeChart,
  },
  verticalbar: {
    transformer: transformPlotlyJsonToVBCProps,
    renderer: ResponsiveVerticalBarChart,
  },
  area: {
    transformer: transformPlotlyJsonToAreaChartProps,
    renderer: ResponsiveAreaChart,
    preTransformOperation: LineAreaPreTransformOp,
  },
  line: {
    transformer: transformPlotlyJsonToLineChartProps,
    renderer: ResponsiveLineChart,
    preTransformOperation: LineAreaPreTransformOp,
  },
  scatter: {
    transformer: transformPlotlyJsonToScatterChartProps,
    renderer: ResponsiveScatterChart,
    preTransformOperation: LineAreaPreTransformOp,
  },
  funnel: {
    transformer: transformPlotlyJsonToFunnelChartProps,
    renderer: FunnelChart,
  },
  gantt: {
    transformer: transformPlotlyJsonToGanttChartProps,
    renderer: ResponsiveGanttChart,
  },
  fallback: {
    transformer: transformPlotlyJsonToVSBCProps,
    renderer: ResponsiveVerticalStackedBarChart,
  },
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
  const chart: OutputChartType = mapFluentChart(plotlySchema);
  if (!chart.isValid) {
    throw new Error(`Invalid chart schema: ${chart.errorMessage}`);
  }
  let plotlyInput = plotlySchema as PlotlySchema;
  try {
    plotlyInput = decodeBase64Fields(plotlyInput);
  } catch (error) {
    throw new Error(`Failed to decode plotly schema: ${error}`);
  }
  const plotlyInputWithValidData: PlotlySchema = {
    ...plotlyInput,
    data: chart.validTracesInfo!.map(trace => plotlyInput.data[trace.index]),
  };

  const validTracesFilteredIndex: TraceInfo[] = chart.validTracesInfo!.map((trace, index) => ({
    index,
    type: trace.type,
  }));

  let { selectedLegends } = plotlySchema;
  const colorMap = useColorMapping();
  const theme = useTheme();
  const isDarkTheme = theme?.isInverted ?? false;
  const chartRef = React.useRef<IChart>(null);
  const isMultiPlot = React.useRef(false);

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

  const multiSelectLegendProps = {
    canSelectMultipleLegends: true,
    onChange: onActiveLegendsChange,
    selectedLegends: activeLegends,
  };

  const commonProps = {
    legendProps: multiSelectLegendProps,
    componentRef: chartRef,
    calloutProps: { layerProps: { eventBubblingEnabled: true } },
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  function createLegends(legendProps: ILegendsProps): JSX.Element {
    // eslint-disable-next-line react/jsx-no-bind
    return <Legends {...legendProps} selectedLegends={activeLegends} onChange={onActiveLegendsChange} />;
  }

  const exportAsImage = React.useCallback(
    (opts?: IImageExportOptions): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (isMultiPlot.current) {
          return reject(Error('Exporting multi plot charts as image is not supported'));
        }
        if (!chartRef.current || typeof chartRef.current.toImage !== 'function') {
          return reject(Error('Chart cannot be exported as image'));
        }

        chartRef.current
          .toImage({
            background: theme.semanticColors.bodyBackground,
            scale: 5,
            ...opts,
          })
          .then(resolve)
          .catch(reject);
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

  if (chart.type === 'scatterpolar') {
    const cartesianProjection = projectPolarToCartesian(plotlyInputWithValidData);
    plotlyInputWithValidData.data = cartesianProjection.data;
    plotlyInputWithValidData.layout = cartesianProjection.layout;
    validTracesFilteredIndex.forEach((trace, index) => {
      if (trace.type === 'scatterpolar') {
        const mode = (plotlyInputWithValidData.data[index] as PlotData)?.mode ?? '';
        if (mode.includes('line')) {
          validTracesFilteredIndex[index].type = 'line';
        } else if (mode.includes('markers') || mode === 'text') {
          validTracesFilteredIndex[index].type = 'scatter';
        } else {
          validTracesFilteredIndex[index].type = 'line';
        }
      }
    });
  }

  const groupedTraces: Record<string, number[]> = {};
  let nonCartesianTraceCount = 0;
  plotlyInputWithValidData.data.forEach((trace: Data, index: number) => {
    let traceKey = '';
    if (isNonPlotType(chart.validTracesInfo![index].type)) {
      traceKey = `${NON_PLOT_KEY_PREFIX}${nonCartesianTraceCount + 1}`;
      nonCartesianTraceCount++;
    } else {
      traceKey = (trace as PlotData).xaxis ?? DEFAULT_XAXIS;
    }
    if (!groupedTraces[traceKey]) {
      groupedTraces[traceKey] = [];
    }
    groupedTraces[traceKey].push(index);
  });

  isMultiPlot.current = Object.keys(groupedTraces).length > 1;
  const gridProperties: GridProperties = getGridProperties(
    plotlyInputWithValidData,
    isMultiPlot.current,
    chart.validTracesInfo!,
  );

  // Render only one plot if the grid properties cannot determine positioning of multiple plots.
  if (
    isMultiPlot.current &&
    gridProperties.templateRows === SINGLE_REPEAT &&
    gridProperties.templateColumns === SINGLE_REPEAT
  ) {
    if (chart.type === 'donut') {
      // If there are multiple data traces for donut/pie, picking the last one similar to plotly
      const keys = Object.keys(groupedTraces);
      keys.forEach((key, index) => {
        if (index < keys.length - 1) {
          delete groupedTraces[key];
        }
      });
    } else {
      Object.keys(groupedTraces).forEach((key, index) => {
        if (index > 0) {
          delete groupedTraces[key];
        }
      });
    }
    isMultiPlot.current = false;
  }

  const allupLegendsProps = getAllupLegendsProps(
    plotlyInputWithValidData,
    colorMap,
    props.colorwayType,
    chart.validTracesInfo!,
    isDarkTheme,
  );

  type ChartType = keyof ChartTypeMap;
  // map through the grouped traces and render the appropriate chart
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: gridProperties.templateRows,
          gridTemplateColumns: gridProperties.templateColumns,
        }}
      >
        {Object.entries(groupedTraces).map(([xAxisKey, index]) => {
          const plotlyInputForGroup: PlotlySchema = {
            ...plotlyInputWithValidData,
            data: index.map(idx => plotlyInputWithValidData.data[idx]),
          };

          const filteredTracesInfo = validTracesFilteredIndex.filter(trace => index.includes(trace.index));
          let chartType =
            chart.type === 'fallback' || chart.type === 'groupedverticalbar' ? chart.type : filteredTracesInfo[0].type;

          if (
            validTracesFilteredIndex.some(trace => trace.type === 'line') &&
            validTracesFilteredIndex.some(trace => trace.type === 'scatter')
          ) {
            chartType = 'line';
          }

          const chartEntry = chartMap[chartType as ChartType];
          if (chartEntry) {
            const { transformer, renderer, preTransformCondition, preTransformOperation } = chartEntry;
            if (preTransformCondition === undefined || preTransformCondition(plotlyInputForGroup)) {
              const transformedInput = preTransformOperation
                ? preTransformOperation(plotlyInputForGroup)
                : plotlyInputForGroup;
              const cellProperties = gridProperties.layout[xAxisKey];

              return renderChart<ReturnType<typeof transformer>>(
                renderer,
                transformer,
                [transformedInput, isMultiPlot.current, colorMap, props.colorwayType, isDarkTheme],
                {
                  ...commonProps,
                  xAxisAnnotation: cellProperties?.xAnnotation,
                  yAxisAnnotation: cellProperties?.yAnnotation,
                },
                cellProperties?.row ?? 1,
                cellProperties?.column ?? 1,
              );
            }
            return <></>;
          } else {
            throw new Error(`Unsupported chart type :${plotlyInputForGroup.data[0]?.type}`);
          }
        })}
      </div>
      {isMultiPlot.current && createLegends(allupLegendsProps)}
    </>
  );
});
DeclarativeChart.displayName = 'DeclarativeChart';
// eslint-disable-next-line @typescript-eslint/no-deprecated
DeclarativeChart.defaultProps = {
  colorwayType: 'default',
};
