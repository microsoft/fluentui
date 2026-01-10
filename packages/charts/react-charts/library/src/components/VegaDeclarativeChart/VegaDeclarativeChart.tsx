'use client';

import * as React from 'react';
import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToVerticalStackedBarChartProps,
  transformVegaLiteToGroupedVerticalBarChartProps,
  transformVegaLiteToHorizontalBarChartProps,
  transformVegaLiteToAreaChartProps,
  transformVegaLiteToScatterChartProps,
  transformVegaLiteToDonutChartProps,
  transformVegaLiteToHeatMapChartProps,
  transformVegaLiteToHistogramProps,
} from '../DeclarativeChart/VegaLiteSchemaAdapter';
import { withResponsiveContainer } from '../ResponsiveContainer/withResponsiveContainer';
import { LineChart } from '../LineChart/index';
import { VerticalBarChart } from '../VerticalBarChart/index';
import { VerticalStackedBarChart } from '../VerticalStackedBarChart/index';
import { GroupedVerticalBarChart } from '../GroupedVerticalBarChart/index';
import { HorizontalBarChartWithAxis } from '../HorizontalBarChartWithAxis/index';
import { AreaChart } from '../AreaChart/index';
import { ScatterChart } from '../ScatterChart/index';
import { DonutChart } from '../DonutChart/index';
import { HeatMapChart } from '../HeatMapChart/index';
import { ThemeContext_unstable as V9ThemeContext } from '@fluentui/react-shared-contexts';
import { webLightTheme } from '@fluentui/tokens';
import type { Chart } from '../../types/index';

/**
 * Vega-Lite specification type
 *
 * For full type support, install the vega-lite package:
 * ```
 * npm install vega-lite
 * ```
 *
 * Then you can import and use TopLevelSpec:
 * ```typescript
 * import type { TopLevelSpec } from 'vega-lite';
 * const spec: TopLevelSpec = { ... };
 * ```
 */
export type VegaLiteSpec = any;

/**
 * Schema for VegaDeclarativeChart component
 */
export interface VegaSchema {
  /**
   * Vega-Lite specification
   *
   * @see https://vega.github.io/vega-lite/docs/spec.html
   */
  vegaLiteSpec: VegaLiteSpec;

  /**
   * Selected legends for filtering
   */
  selectedLegends?: string[];
}

/**
 * Props for VegaDeclarativeChart component
 */
export interface VegaDeclarativeChartProps {
  /**
   * Vega-Lite chart schema
   */
  chartSchema: VegaSchema;

  /**
   * Callback when schema changes (e.g., legend selection)
   */
  onSchemaChange?: (newSchema: VegaSchema) => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Hook to determine if dark theme is active
 */
function useIsDarkTheme(): boolean {
  const theme = React.useContext(V9ThemeContext);
  const currentTheme = theme || webLightTheme;
  return currentTheme?.colorBrandBackground2 === '#004C50';
}

/**
 * Hook for color mapping across charts
 */
function useColorMapping() {
  return React.useRef<Map<string, string>>(new Map());
}

/**
 * Check if spec is a horizontal concatenation
 */
function isHConcatSpec(spec: VegaLiteSpec): boolean {
  return spec.hconcat && Array.isArray(spec.hconcat) && spec.hconcat.length > 0;
}

/**
 * Check if spec is a vertical concatenation
 */
function isVConcatSpec(spec: VegaLiteSpec): boolean {
  return spec.vconcat && Array.isArray(spec.vconcat) && spec.vconcat.length > 0;
}

/**
 * Check if spec is any kind of concatenation
 */
// @ts-expect-error - Function reserved for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isConcatSpec(spec: VegaLiteSpec): boolean {
  return isHConcatSpec(spec) || isVConcatSpec(spec);
}

/**
 * Get grid properties for concat specs
 */
function getVegaConcatGridProperties(spec: VegaLiteSpec): {
  templateRows: string;
  templateColumns: string;
  isHorizontal: boolean;
  specs: VegaLiteSpec[];
} {
  if (isHConcatSpec(spec)) {
    return {
      templateRows: '1fr',
      templateColumns: `repeat(${spec.hconcat.length}, 1fr)`,
      isHorizontal: true,
      specs: spec.hconcat,
    };
  }

  if (isVConcatSpec(spec)) {
    return {
      templateRows: `repeat(${spec.vconcat.length}, 1fr)`,
      templateColumns: '1fr',
      isHorizontal: false,
      specs: spec.vconcat,
    };
  }

  return {
    templateRows: '1fr',
    templateColumns: '1fr',
    isHorizontal: false,
    specs: [spec],
  };
}

const ResponsiveLineChart = withResponsiveContainer(LineChart);
const ResponsiveVerticalBarChart = withResponsiveContainer(VerticalBarChart);
const ResponsiveVerticalStackedBarChart = withResponsiveContainer(VerticalStackedBarChart);
const ResponsiveGroupedVerticalBarChart = withResponsiveContainer(GroupedVerticalBarChart);
const ResponsiveHorizontalBarChartWithAxis = withResponsiveContainer(HorizontalBarChartWithAxis);
const ResponsiveAreaChart = withResponsiveContainer(AreaChart);
const ResponsiveScatterChart = withResponsiveContainer(ScatterChart);
const ResponsiveDonutChart = withResponsiveContainer(DonutChart);
const ResponsiveHeatMapChart = withResponsiveContainer(HeatMapChart);

/**
 * Chart type mapping with transformers and renderers
 * Follows the factory functor pattern from PlotlyDeclarativeChart
 */
type VegaChartTypeMap = {
  line: { transformer: typeof transformVegaLiteToLineChartProps; renderer: typeof ResponsiveLineChart };
  bar: { transformer: typeof transformVegaLiteToVerticalBarChartProps; renderer: typeof ResponsiveVerticalBarChart };
  'stacked-bar': {
    transformer: typeof transformVegaLiteToVerticalStackedBarChartProps;
    renderer: typeof ResponsiveVerticalStackedBarChart;
  };
  'grouped-bar': {
    transformer: typeof transformVegaLiteToGroupedVerticalBarChartProps;
    renderer: typeof ResponsiveGroupedVerticalBarChart;
  };
  'horizontal-bar': {
    transformer: typeof transformVegaLiteToHorizontalBarChartProps;
    renderer: typeof ResponsiveHorizontalBarChartWithAxis;
  };
  area: { transformer: typeof transformVegaLiteToAreaChartProps; renderer: typeof ResponsiveAreaChart };
  scatter: { transformer: typeof transformVegaLiteToScatterChartProps; renderer: typeof ResponsiveScatterChart };
  donut: { transformer: typeof transformVegaLiteToDonutChartProps; renderer: typeof ResponsiveDonutChart };
  heatmap: { transformer: typeof transformVegaLiteToHeatMapChartProps; renderer: typeof ResponsiveHeatMapChart };
  histogram: { transformer: typeof transformVegaLiteToHistogramProps; renderer: typeof ResponsiveVerticalBarChart };
};

const vegaChartMap: VegaChartTypeMap = {
  line: { transformer: transformVegaLiteToLineChartProps, renderer: ResponsiveLineChart },
  bar: { transformer: transformVegaLiteToVerticalBarChartProps, renderer: ResponsiveVerticalBarChart },
  'stacked-bar': {
    transformer: transformVegaLiteToVerticalStackedBarChartProps,
    renderer: ResponsiveVerticalStackedBarChart,
  },
  'grouped-bar': {
    transformer: transformVegaLiteToGroupedVerticalBarChartProps,
    renderer: ResponsiveGroupedVerticalBarChart,
  },
  'horizontal-bar': {
    transformer: transformVegaLiteToHorizontalBarChartProps,
    renderer: ResponsiveHorizontalBarChartWithAxis,
  },
  area: { transformer: transformVegaLiteToAreaChartProps, renderer: ResponsiveAreaChart },
  scatter: { transformer: transformVegaLiteToScatterChartProps, renderer: ResponsiveScatterChart },
  donut: { transformer: transformVegaLiteToDonutChartProps, renderer: ResponsiveDonutChart },
  heatmap: { transformer: transformVegaLiteToHeatMapChartProps, renderer: ResponsiveHeatMapChart },
  histogram: { transformer: transformVegaLiteToHistogramProps, renderer: ResponsiveVerticalBarChart },
};

/**
 * Determines the chart type based on Vega-Lite spec
 */
function getChartType(spec: VegaLiteSpec): {
  type:
    | 'line'
    | 'bar'
    | 'stacked-bar'
    | 'grouped-bar'
    | 'horizontal-bar'
    | 'area'
    | 'scatter'
    | 'donut'
    | 'heatmap'
    | 'histogram';
  mark: string;
} {
  // Handle layered specs - check if it's a bar+line combo for stacked bar with lines
  if (spec.layer && spec.layer.length > 1) {
    const marks = spec.layer.map((layer: any) => (typeof layer.mark === 'string' ? layer.mark : layer.mark?.type));
    const hasBar = marks.includes('bar');
    const hasLine = marks.includes('line') || marks.includes('point');

    // Bar + line combo should use stacked bar chart (which supports line overlays)
    if (hasBar && hasLine) {
      const barLayer = spec.layer.find((layer: any) => {
        const mark = typeof layer.mark === 'string' ? layer.mark : layer.mark?.type;
        return mark === 'bar';
      });

      if (barLayer?.encoding?.color?.field) {
        return { type: 'stacked-bar', mark: 'bar' };
      }
      // If no color encoding, still use stacked bar to support line overlay
      return { type: 'stacked-bar', mark: 'bar' };
    }
  }

  // Handle layered specs - use first layer's mark for other cases
  const mark = spec.layer ? spec.layer[0]?.mark : spec.mark;
  const markType = typeof mark === 'string' ? mark : mark?.type;

  const encoding = spec.layer ? spec.layer[0]?.encoding : spec.encoding;
  const hasColorEncoding = !!encoding?.color?.field;

  // Arc marks for pie/donut charts
  // Donut charts have innerRadius defined in mark properties
  if (markType === 'arc' && encoding?.theta) {
    return { type: 'donut', mark: markType };
  }

  // Rect marks for heatmaps
  // For heatmaps, we need rect mark with x, y, and color (quantitative) encodings
  // Must have actual field names, not just datum values
  if (
    markType === 'rect' &&
    encoding?.x?.field &&
    encoding?.y?.field &&
    encoding?.color?.field &&
    encoding?.color?.type === 'quantitative'
  ) {
    return { type: 'heatmap', mark: markType };
  }

  // Bar charts
  if (markType === 'bar') {
    // Check for histogram: binned x-axis with aggregate y-axis
    if (encoding?.x?.bin) {
      return { type: 'histogram', mark: markType };
    }

    const isXNominal = encoding?.x?.type === 'nominal' || encoding?.x?.type === 'ordinal';
    const isYNominal = encoding?.y?.type === 'nominal' || encoding?.y?.type === 'ordinal';

    // Horizontal bar: x is quantitative, y is nominal/ordinal
    if (isYNominal && !isXNominal) {
      return { type: 'horizontal-bar', mark: markType };
    }

    // Vertical bars with color encoding
    if (hasColorEncoding) {
      // Check for xOffset encoding which indicates grouped bars
      const hasXOffset = !!(encoding as Record<string, unknown>)?.xOffset;

      if (hasXOffset) {
        return { type: 'grouped-bar', mark: markType };
      }

      // Otherwise, default to stacked bar
      return { type: 'stacked-bar', mark: markType };
    }

    // Simple vertical bar
    return { type: 'bar', mark: markType };
  }

  // Area charts
  if (markType === 'area') {
    return { type: 'area', mark: markType };
  }

  // Scatter/point charts
  if (markType === 'point' || markType === 'circle' || markType === 'square') {
    return { type: 'scatter', mark: markType };
  }

  // Line charts (default)
  return { type: 'line', mark: markType };
}

/**
 * Renders a single Vega-Lite chart spec
 */
function renderSingleChart(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme: boolean,
  chartRef: React.RefObject<Chart | null>,
  multiSelectLegendProps: any,
  interactiveCommonProps: any,
): React.ReactElement {
  const chartType = getChartType(spec);
  const chartConfig = vegaChartMap[chartType.type];

  if (!chartConfig) {
    throw new Error(`VegaDeclarativeChart: Unsupported chart type '${chartType.type}'`);
  }

  const { transformer, renderer: ChartRenderer } = chartConfig;
  const chartProps = transformer(spec, colorMap, isDarkTheme) as any;

  // Special handling for charts with different prop patterns
  if (chartType.type === 'donut') {
    return <ChartRenderer {...chartProps} legendProps={multiSelectLegendProps} />;
  } else if (chartType.type === 'heatmap') {
    return <ChartRenderer {...chartProps} componentRef={chartRef} />;
  } else {
    return <ChartRenderer {...chartProps} {...interactiveCommonProps} />;
  }
}

/**
 * VegaDeclarativeChart - Render Vega-Lite specifications with Fluent UI styling
 *
 * Supported chart types:
 * - Line charts: mark: 'line' or 'point'
 * - Area charts: mark: 'area'
 * - Scatter charts: mark: 'point', 'circle', or 'square'
 * - Vertical bar charts: mark: 'bar' with nominal/ordinal x-axis
 * - Stacked bar charts: mark: 'bar' with color encoding
 * - Grouped bar charts: mark: 'bar' with color encoding (via configuration)
 * - Horizontal bar charts: mark: 'bar' with nominal/ordinal y-axis
 * - Donut/Pie charts: mark: 'arc' with theta encoding
 * - Heatmaps: mark: 'rect' with x, y, and color (quantitative) encodings
 * - Combo charts: Layered specs with bar + line marks render as VerticalStackedBarChart with line overlays
 *
 * Multi-plot Support:
 * - Horizontal concatenation (hconcat): Multiple charts side-by-side
 * - Vertical concatenation (vconcat): Multiple charts stacked vertically
 * - Shared data and encoding are merged from parent spec to each subplot
 *
 * Limitations:
 * - Most layered specifications (multiple chart types) are not fully supported
 * - Bar + Line combinations ARE supported and will render properly
 * - For other composite charts, only the first layer will be rendered
 * - Faceting and repeat operators are not yet supported
 * - Funnel charts are not a native Vega-Lite mark type. The conversion_funnel.json example
 *   uses a horizontal bar chart (y: nominal, x: quantitative) which is the standard way to
 *   represent funnel data in Vega-Lite. For specialized funnel visualizations with tapering
 *   shapes, consider using Plotly's native funnel chart type instead.
 *
 * Note: Sankey, Gantt, and Gauge charts are not standard Vega-Lite marks.
 * These specialized visualizations would require custom extensions or alternative approaches.
 *
 * @example Line Chart
 * ```tsx
 * import { VegaDeclarativeChart } from '@fluentui/react-charts';
 *
 * const spec = {
 *   mark: 'line',
 *   data: { values: [{ x: 1, y: 10 }, { x: 2, y: 20 }] },
 *   encoding: {
 *     x: { field: 'x', type: 'quantitative' },
 *     y: { field: 'y', type: 'quantitative' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
 * ```
 *
 * @example Area Chart
 * ```tsx
 * const areaSpec = {
 *   mark: 'area',
 *   data: { values: [{ date: '2023-01', value: 100 }, { date: '2023-02', value: 150 }] },
 *   encoding: {
 *     x: { field: 'date', type: 'temporal' },
 *     y: { field: 'value', type: 'quantitative' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: areaSpec }} />
 * ```
 *
 * @example Scatter Chart
 * ```tsx
 * const scatterSpec = {
 *   mark: 'point',
 *   data: { values: [{ x: 10, y: 20, size: 100 }, { x: 15, y: 30, size: 200 }] },
 *   encoding: {
 *     x: { field: 'x', type: 'quantitative' },
 *     y: { field: 'y', type: 'quantitative' },
 *     size: { field: 'size', type: 'quantitative' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: scatterSpec }} />
 * ```
 *
 * @example Vertical Bar Chart
 * ```tsx
 * const barSpec = {
 *   mark: 'bar',
 *   data: { values: [{ cat: 'A', val: 28 }, { cat: 'B', val: 55 }] },
 *   encoding: {
 *     x: { field: 'cat', type: 'nominal' },
 *     y: { field: 'val', type: 'quantitative' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: barSpec }} />
 * ```
 *
 * @example Stacked Bar Chart
 * ```tsx
 * const stackedSpec = {
 *   mark: 'bar',
 *   data: { values: [
 *     { cat: 'A', group: 'G1', val: 28 },
 *     { cat: 'A', group: 'G2', val: 15 }
 *   ]},
 *   encoding: {
 *     x: { field: 'cat', type: 'nominal' },
 *     y: { field: 'val', type: 'quantitative' },
 *     color: { field: 'group', type: 'nominal' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: stackedSpec }} />
 * ```
 *
 * @example Donut Chart
 * ```tsx
 * const donutSpec = {
 *   mark: 'arc',
 *   data: { values: [{ category: 'A', value: 30 }, { category: 'B', value: 70 }] },
 *   encoding: {
 *     theta: { field: 'value', type: 'quantitative' },
 *     color: { field: 'category', type: 'nominal' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: donutSpec }} />
 * ```
 *
 * @example Heatmap
 * ```tsx
 * const heatmapSpec = {
 *   mark: 'rect',
 *   data: { values: [
 *     { x: 'A', y: 'Mon', value: 28 },
 *     { x: 'B', y: 'Mon', value: 55 },
 *     { x: 'A', y: 'Tue', value: 43 }
 *   ]},
 *   encoding: {
 *     x: { field: 'x', type: 'nominal' },
 *     y: { field: 'y', type: 'nominal' },
 *     color: { field: 'value', type: 'quantitative' }
 *   }
 * };
 *
 * <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: heatmapSpec }} />
 * ```
 */
export const VegaDeclarativeChart = React.forwardRef<HTMLDivElement, VegaDeclarativeChartProps>(
  (props, forwardedRef) => {
    const { vegaLiteSpec, selectedLegends = [] } = props.chartSchema;

    if (!vegaLiteSpec) {
      throw new Error('VegaDeclarativeChart: vegaLiteSpec is required in chartSchema');
    }

    const colorMap = useColorMapping();
    const isDarkTheme = useIsDarkTheme();
    const chartRef = React.useRef<Chart>(null);

    const [activeLegends, setActiveLegends] = React.useState<string[]>(selectedLegends);

    const onActiveLegendsChange = (keys: string[]) => {
      setActiveLegends(keys);
      if (props.onSchemaChange) {
        props.onSchemaChange({ vegaLiteSpec, selectedLegends: keys });
      }
    };

    React.useEffect(() => {
      setActiveLegends(props.chartSchema.selectedLegends ?? []);
    }, [props.chartSchema.selectedLegends]);

    const multiSelectLegendProps = {
      canSelectMultipleLegends: true,
      onChange: onActiveLegendsChange,
      selectedLegends: activeLegends,
    };

    const interactiveCommonProps = {
      componentRef: chartRef,
      legendProps: multiSelectLegendProps,
    };

    try {
      // Check if this is a concat spec (multiple charts side-by-side or stacked)
      if (isHConcatSpec(vegaLiteSpec) || isVConcatSpec(vegaLiteSpec)) {
        const gridProps = getVegaConcatGridProperties(vegaLiteSpec);

        return (
          <div
            ref={forwardedRef}
            className={props.className}
            style={{
              ...props.style,
              display: 'grid',
              gridTemplateRows: gridProps.templateRows,
              gridTemplateColumns: gridProps.templateColumns,
              gap: '16px',
            }}
          >
            {gridProps.specs.map((subSpec: VegaLiteSpec, index: number) => {
              // Merge shared data and encoding from parent spec into each subplot
              const mergedSpec = {
                ...subSpec,
                data: subSpec.data || vegaLiteSpec.data,
                encoding: {
                  ...(vegaLiteSpec.encoding || {}),
                  ...(subSpec.encoding || {}),
                },
              };

              const cellRow = gridProps.isHorizontal ? 1 : index + 1;
              const cellColumn = gridProps.isHorizontal ? index + 1 : 1;

              return (
                <div
                  key={`chart_${index}`}
                  style={{
                    gridRowStart: cellRow,
                    gridRowEnd: cellRow + 1,
                    gridColumnStart: cellColumn,
                    gridColumnEnd: cellColumn + 1,
                  }}
                >
                  {renderSingleChart(
                    mergedSpec,
                    colorMap,
                    isDarkTheme,
                    chartRef,
                    multiSelectLegendProps,
                    interactiveCommonProps,
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      // Check if this is a layered spec (composite chart)
      if (vegaLiteSpec.layer && vegaLiteSpec.layer.length > 1) {
        // Check if it's a supported bar+line combo
        const marks = vegaLiteSpec.layer.map((layer: any) =>
          typeof layer.mark === 'string' ? layer.mark : layer.mark?.type,
        );
        const hasBar = marks.includes('bar');
        const hasLine = marks.includes('line') || marks.includes('point');
        const isBarLineCombo = hasBar && hasLine;

        // Only warn for unsupported layered specs
        if (!isBarLineCombo) {
          // eslint-disable-next-line no-console
          console.warn(
            'VegaDeclarativeChart: Layered specifications with multiple chart types are not fully supported. ' +
              'Only the first layer will be rendered. Bar+Line combinations are supported via VerticalStackedBarChart.',
          );
        }
      }

      // Render single chart
      const chartComponent = renderSingleChart(
        vegaLiteSpec,
        colorMap,
        isDarkTheme,
        chartRef,
        multiSelectLegendProps,
        interactiveCommonProps,
      );

      return (
        <div ref={forwardedRef} className={props.className} style={props.style}>
          {chartComponent}
        </div>
      );
    } catch (error) {
      throw new Error(`Failed to transform Vega-Lite spec: ${error}`);
    }
  },
);

VegaDeclarativeChart.displayName = 'VegaDeclarativeChart';
