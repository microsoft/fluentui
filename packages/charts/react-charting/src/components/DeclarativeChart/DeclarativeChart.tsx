/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { IRefObject } from '@fluentui/react/lib/Utilities';
import { DonutChart } from '../DonutChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { decodeBase64Fields } from '@fluentui/chart-utilities';
import type { PlotData, PlotlySchema, OutputChartType } from '@fluentui/chart-utilities';
import { isArrayOrTypedArray, isMonthArray, mapFluentChart, sanitizeJson } from '@fluentui/chart-utilities';

import type { GridTemplate } from './PlotlySchemaAdapter';
import {
  correctYearMonth,
  createGridTemplate,
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
  projectPolarToCartesian,
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
import { ChartTable } from '../ChartTable/index';

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
const ResponsiveChartTable = withResponsiveContainer(ChartTable);

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
): JSX.Element {
  const chartProps = transformer(...transformerArgs);
  return <Renderer {...chartProps} {...commonProps} />;
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
    data: chart.validTracesInfo!.map(trace => plotlyInput.data[trace[0]]),
  };

  let { selectedLegends } = plotlySchema;
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

  // const renderLineArea = (plotlyData: Data[], isAreaChart: boolean): JSX.Element => {
  //   // Dont consider yaxis2 as secondary axis if grid view is present
  //   // const hasGridView = plotlyData.some((dataSeries: PlotData) => dataSeries.xaxis !== 'x');
  //   const data1 = plotlyData.filter((dataSeries: PlotData) => dataSeries.xaxis === 'x');
  //   const data2 = plotlyData.filter((dataSeries: PlotData) => dataSeries.xaxis === 'x2');
  //   const data3 = plotlyData.filter((dataSeries: PlotData) => dataSeries.xaxis === 'x3');
  //   const chartProps: ILineChartProps | IAreaChartProps = {
  //     ...transformPlotlyJsonToScatterChartProps(
  //       { data: data1, layout: plotlyInput.layout },
  //       isAreaChart,
  //       colorMap,
  //       props.colorwayType,
  //       isDarkTheme,
  //     ),
  //     ...commonProps,
  //   };
  //   const chartProps2: ILineChartProps | IAreaChartProps = {
  //     ...transformPlotlyJsonToScatterChartProps(
  //       { data: data2, layout: plotlyInput.layout },
  //       isAreaChart,
  //       colorMap,
  //       props.colorwayType,
  //       isDarkTheme,
  //     ),
  //     ...commonProps,
  //   };
  //   const chartProps3: ILineChartProps | IAreaChartProps = {
  //     ...transformPlotlyJsonToScatterChartProps(
  //       { data: data3, layout: plotlyInput.layout },
  //       isAreaChart,
  //       isScatterMarkers,
  //       colorMap,
  //       props.colorwayType,
  //       isDarkTheme,
  //     ),
  //     ...commonProps,
  //   };
  //   if (isAreaChart) {
  //     return <ResponsiveAreaChart {...chartProps} />;
  //   }
  //   return (
  //     <div
  //       style={{
  //         display: 'grid',
  //         gridTemplateColumns: '1fr 1fr 1fr',
  //         gridTemplateRows: '1fr',
  //         gap: '0px',
  //         width: '100%',
  //         height: '100%',
  //       }}
  //     >
  //       {/* ResponsiveLineChart is wrapped in a div to ensure it takes full width and height */}
  //       <ResponsiveLineChart {...chartProps} />
  //       <ResponsiveLineChart {...chartProps2} />
  //       <ResponsiveLineChart {...chartProps3} />
  //     </div>
  //   );
  // };

  const exportAsImage = React.useCallback(
    (opts?: IImageExportOptions): Promise<string> => {
      return new Promise((resolve, reject) => {
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
    chart.type = 'line'; // Treat scatterpolar as line chart for rendering
  }

  const groupedTraces: Record<string, number[]> = {};
  plotlyInputWithValidData.data.forEach((trace: Partial<PlotData>, index) => {
    const xAxisKey = trace.xaxis ?? 'default'; //Handle when xaxis is not defined like PieData or SankeyData
    if (!groupedTraces[xAxisKey]) {
      groupedTraces[xAxisKey] = [];
    }
    groupedTraces[xAxisKey].push(index);
  });

  const gridTemplate: GridTemplate = createGridTemplate(plotlyInputWithValidData.layout);

  type ChartType = keyof ChartTypeMap;
  // map through the grouped traces and render the appropriate chart
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: gridTemplate.templateRows,
        gridTemplateColumns: gridTemplate.templateColumns,
      }}
    >
      {Object.entries(groupedTraces).map(([xAxisKey, index]) => {
        const plotlyInputForGroup: PlotlySchema = {
          ...plotlyInputWithValidData,
          data: index.map(idx => plotlyInputWithValidData.data[idx]),
        };

        // Use the first valid trace to determine the chart type
        //const chartType = chart.validTracesInfo!.find(trace => trace[0] === index[0])?.[1] as ChartType;
        const filteredTracesInfo = chart.validTracesInfo!.filter(trace => index.includes(trace[0]));
        const chartType = filteredTracesInfo.some(trace => trace[1] === 'fallback')
          ? 'fallback'
          : filteredTracesInfo[0][1];

        const chartEntry = chartMap[chartType as ChartType];
        if (chartEntry) {
          const { transformer, renderer, preTransformCondition, preTransformOperation } = chartEntry;
          if (preTransformCondition === undefined || preTransformCondition(plotlyInputForGroup)) {
            const transformedInput = preTransformOperation
              ? preTransformOperation(plotlyInputForGroup)
              : plotlyInputForGroup;
            return renderChart<ReturnType<typeof transformer>>(
              renderer,
              transformer,
              [transformedInput, colorMap, props.colorwayType, isDarkTheme],
              commonProps,
            );
          }
          return <></>;
        } else {
          throw new Error(`Unsupported chart type :${plotlyInputForGroup.data[0]?.type}`);
        }
      })}
    </div>
  );
});
DeclarativeChart.displayName = 'DeclarativeChart';
DeclarativeChart.defaultProps = {
  colorwayType: 'default',
};
