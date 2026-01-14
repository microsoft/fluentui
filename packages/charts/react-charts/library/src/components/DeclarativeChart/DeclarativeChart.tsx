'use client';

/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import type { Data, PlotData, PlotlySchema, OutputChartType, TraceInfo } from '@fluentui/chart-utilities';
import {
  decodeBase64Fields,
  isArrayOrTypedArray,
  isMonthArray,
  mapFluentChart,
  sanitizeJson,
} from '@fluentui/chart-utilities';
import type { GridProperties } from './PlotlySchemaAdapter';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { ThemeContext_unstable as V9ThemeContext } from '@fluentui/react-shared-contexts';
import { Theme, webLightTheme } from '@fluentui/tokens';
import * as d3Color from 'd3-color';

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
  getAllupLegendsProps,
  NON_PLOT_KEY_PREFIX,
  SINGLE_REPEAT,
  transformPlotlyJsonToFunnelChartProps,
  transformPlotlyJsonToGanttChartProps,
  transformPlotlyJsonToAnnotationChartProps,
  transformPlotlyJsonToPolarChartProps,
  DEFAULT_POLAR_SUBPLOT,
} from './PlotlySchemaAdapter';
import { getChartTitleInlineStyles } from '../../utilities/index';
import type { ColorwayType } from './PlotlyColorAdapter';
import { AnnotationOnlyChart } from '../AnnotationOnlyChart/AnnotationOnlyChart';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { LineChart } from '../LineChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { SankeyChart } from '../SankeyChart/SankeyChart';
import { GaugeChart } from '../GaugeChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { Chart, ImageExportOptions } from '../../types/index';
import { ScatterChart } from '../ScatterChart/index';
import { FunnelChart } from '../FunnelChart/FunnelChart';
import { GanttChart } from '../GanttChart/index';
import { PolarChart } from '../PolarChart/index';

import { withResponsiveContainer } from '../ResponsiveContainer/withResponsiveContainer';
import { ChartTable } from '../ChartTable/index';
import { LegendsProps, Legends, LegendContainer } from '../Legends/index';
import { JSXElement } from '@fluentui/react-utilities/src/index';
import { resolveCSSVariables, useRtl } from '../../utilities/index';
import { exportChartsAsImage } from '../../utilities/image-export-utils';

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
const ResponsiveGanttChart = withResponsiveContainer(GanttChart);
// Removing responsive wrapper for FunnelChart as responsive container is not working with FunnelChart
//const ResponsiveFunnelChart = withResponsiveContainer(FunnelChart);
const ResponsivePolarChart = withResponsiveContainer(PolarChart);

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
  componentRef?: React.Ref<IDeclarativeChart>;

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
  exportAsImage: (opts?: ImageExportOptions) => Promise<string>;
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
): JSXElement {
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
  annotation: {
    transformer: typeof transformPlotlyJsonToAnnotationChartProps;
    renderer: typeof AnnotationOnlyChart;
  } & PreTransformHooks;
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
  gantt: {
    transformer: typeof transformPlotlyJsonToGanttChartProps;
    renderer: typeof ResponsiveGanttChart;
  } & PreTransformHooks;
  funnel: {
    transformer: typeof transformPlotlyJsonToFunnelChartProps;
    renderer: typeof FunnelChart;
  } & PreTransformHooks;
  scatterpolar: {
    transformer: typeof transformPlotlyJsonToPolarChartProps;
    renderer: typeof ResponsivePolarChart;
  } & PreTransformHooks;
  fallback: {
    transformer: typeof transformPlotlyJsonToVSBCProps;
    renderer: typeof ResponsiveVerticalStackedBarChart;
  } & PreTransformHooks;
};

const chartMap: ChartTypeMap = {
  annotation: {
    transformer: transformPlotlyJsonToAnnotationChartProps,
    renderer: AnnotationOnlyChart,
  },
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
  gantt: {
    transformer: transformPlotlyJsonToGanttChartProps,
    renderer: ResponsiveGanttChart,
  },
  funnel: {
    transformer: transformPlotlyJsonToFunnelChartProps,
    renderer: FunnelChart,
  },
  scatterpolar: {
    transformer: transformPlotlyJsonToPolarChartProps,
    renderer: ResponsivePolarChart,
  },
  fallback: {
    transformer: transformPlotlyJsonToVSBCProps,
    renderer: ResponsiveVerticalStackedBarChart,
  },
};

const useIsDarkTheme = (): boolean => {
  const parentV9Theme = React.useContext(V9ThemeContext) as Theme;
  const v9Theme: Theme = parentV9Theme ? parentV9Theme : webLightTheme;

  // Get background and foreground colors
  const backgroundColor = d3Color.hsl(v9Theme.colorNeutralBackground1);
  const foregroundColor = d3Color.hsl(v9Theme.colorNeutralForeground1);

  const isDarkTheme = backgroundColor.l < foregroundColor.l;

  return isDarkTheme;
};

/**
 * DeclarativeChart component.
 * {@docCategory DeclarativeChart}
 */
export const DeclarativeChart: React.FunctionComponent<DeclarativeChartProps> = React.forwardRef<
  HTMLDivElement,
  DeclarativeChartProps
>(({ colorwayType = 'default', ...props }, forwardedRef) => {
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
  const isDarkTheme = useIsDarkTheme();
  const chartRefs = React.useRef<{ compRef: Chart | null; row: number; col: number }[]>([]);
  const isMultiPlot = React.useRef(false);
  const legendsRef = React.useRef<LegendContainer>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isRTL = useRtl();

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

  const interactiveCommonProps = {
    legendProps: multiSelectLegendProps,
  };

  function createLegends(legendProps: LegendsProps): JSXElement {
    // eslint-disable-next-line react/jsx-no-bind
    return (
      <Legends
        {...legendProps}
        selectedLegends={activeLegends}
        onChange={onActiveLegendsChange}
        legendRef={legendsRef}
      />
    );
  }

  const exportAsImage = React.useCallback(
    async (opts?: ImageExportOptions) => {
      if (!containerRef.current) {
        throw new Error('Container reference is null');
      }

      const imgExpOpts = {
        background: resolveCSSVariables(containerRef.current, tokens.colorNeutralBackground1),
        scale: 5,
        ...opts,
      };

      if (!isMultiPlot.current) {
        if (!chartRefs.current[0]?.compRef?.toImage) {
          throw new Error('Chart cannot be exported as image');
        }

        return chartRefs.current[0].compRef.toImage(imgExpOpts);
      }

      return exportChartsAsImage(
        chartRefs.current.map(item => ({
          container: item.compRef?.chartContainer,
          row: item.row,
          col: item.col,
        })),
        legendsRef.current?.toSVG,
        isRTL,
        imgExpOpts,
      );
    },
    [isRTL],
  );

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      exportAsImage,
    }),
    [exportAsImage],
  );

  const groupedTraces: Record<string, number[]> = {};
  let nonCartesianTraceCount = 0;

  // For annotation-only charts, create a single group entry
  if (chart.type === 'annotation') {
    groupedTraces[DEFAULT_XAXIS] = [];
  } else {
    plotlyInputWithValidData.data.forEach((trace: Data, index: number) => {
      let traceKey = '';
      if (isNonPlotType(chart.validTracesInfo![index].type)) {
        traceKey = `${NON_PLOT_KEY_PREFIX}${nonCartesianTraceCount + 1}`;
        nonCartesianTraceCount++;
      } else {
        traceKey =
          chart.validTracesInfo![index].type === 'scatterpolar'
            ? (trace as { subplot?: string }).subplot ?? DEFAULT_POLAR_SUBPLOT
            : (trace as PlotData).xaxis ?? DEFAULT_XAXIS;
      }
      if (!groupedTraces[traceKey]) {
        groupedTraces[traceKey] = [];
      }
      groupedTraces[traceKey].push(index);
    });
  }

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
    colorwayType,
    chart.validTracesInfo!,
    isDarkTheme,
  );

  type ChartType = keyof ChartTypeMap;

  const titleObj = plotlyInputWithValidData.layout?.title;
  const chartTitle = typeof titleObj === 'string' ? titleObj : titleObj?.text ?? '';
  const titleFont = typeof titleObj === 'object' ? titleObj?.font : undefined;

  const titleStyle: React.CSSProperties = {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground1,
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalS,
    ...getChartTitleInlineStyles(titleFont),
  };

  // map through the grouped traces and render the appropriate chart
  return (
    <>
      {isMultiPlot.current && chartTitle && <div style={titleStyle}>{chartTitle}</div>}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: gridProperties.templateRows,
          gridTemplateColumns: gridProperties.templateColumns,
        }}
        ref={containerRef}
      >
        {Object.entries(groupedTraces).map(([xAxisKey, index], chartIdx) => {
          const plotlyInputForGroup: PlotlySchema = {
            ...plotlyInputWithValidData,
            data: index.map(idx => plotlyInputWithValidData.data[idx]),
          };

          const filteredTracesInfo = validTracesFilteredIndex.filter(trace => index.includes(trace.index));
          let chartType =
            chart.type === 'fallback' || chart.type === 'groupedverticalbar'
              ? chart.type
              : filteredTracesInfo[0]?.type ?? chart.type;

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

              const resolvedCommonProps = (
                chartType === 'annotation'
                  ? {}
                  : {
                      ...interactiveCommonProps,
                    }
              ) as Partial<ReturnType<typeof transformer>>;

              return renderChart<ReturnType<typeof transformer>>(
                renderer,
                transformer,
                [transformedInput, isMultiPlot.current, colorMap, colorwayType, isDarkTheme],
                {
                  ...resolvedCommonProps,
                  ...(cellProperties?.xAnnotation && { xAxisAnnotation: cellProperties.xAnnotation }),
                  ...(cellProperties?.yAnnotation && { yAxisAnnotation: cellProperties.yAnnotation }),
                  componentRef: (ref: Chart | null) => {
                    chartRefs.current[chartIdx] = {
                      compRef: ref,
                      row: cellProperties?.row ?? 1,
                      col: cellProperties?.column ?? 1,
                    };
                  },
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
