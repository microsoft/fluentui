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
  transformVegaLiteToPolarChartProps,
  getChartType,
  getMarkType,
  getVegaLiteLegendsProps,
} from './VegaLiteSchemaAdapter';
import type { VegaLiteUnitSpec, VegaLiteSpec } from './VegaLiteTypes';
import { Legends } from '../Legends/index';
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
import { PolarChart } from '../PolarChart/index';
import { useIsDarkTheme, useColorMapping } from './VegaDeclarativeChartHooks';
import type { Chart } from '../../types/index';

// Re-export the typed VegaLiteSpec for public API
export type { VegaLiteSpec } from './VegaLiteTypes';

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
 * Check if spec is a horizontal concatenation
 */
function isHConcatSpec(spec: VegaLiteSpec): boolean {
  return !!spec.hconcat && Array.isArray(spec.hconcat) && spec.hconcat.length > 0;
}

/**
 * Check if spec is a vertical concatenation
 */
function isVConcatSpec(spec: VegaLiteSpec): boolean {
  return !!spec.vconcat && Array.isArray(spec.vconcat) && spec.vconcat.length > 0;
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
      templateRows: 'auto',
      templateColumns: `repeat(${spec.hconcat!.length}, 1fr)`,
      isHorizontal: true,
      specs: spec.hconcat!,
    };
  }

  if (isVConcatSpec(spec)) {
    return {
      templateRows: `repeat(${spec.vconcat!.length}, auto)`,
      templateColumns: '1fr',
      isHorizontal: false,
      specs: spec.vconcat!,
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
const ResponsivePolarChart = withResponsiveContainer(PolarChart);

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
  polar: { transformer: typeof transformVegaLiteToPolarChartProps; renderer: typeof ResponsivePolarChart };
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
  polar: { transformer: transformVegaLiteToPolarChartProps, renderer: ResponsivePolarChart },
};

interface MultiSelectLegendProps {
  canSelectMultipleLegends: boolean;
  onChange: (keys: string[]) => void;
  selectedLegends: string[];
}

/**
 * Renders a single Vega-Lite chart spec
 */
function renderSingleChart(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme: boolean,
  interactiveCommonProps: { componentRef: React.RefObject<Chart | null>; legendProps: MultiSelectLegendProps },
): React.ReactElement {
  const chartType = getChartType(spec);
  const chartConfig = vegaChartMap[chartType.type];

  if (!chartConfig) {
    throw new Error(`VegaDeclarativeChart: Unsupported chart type '${chartType.type}'`);
  }

  const { transformer, renderer: ChartRenderer } = chartConfig;
  const chartProps = transformer(spec, colorMap, isDarkTheme) as Record<string, unknown>;

  // For hconcat/vconcat sub-charts, hide per-chart legends (shared legend rendered separately)
  if ((spec as Record<string, unknown>)._hideLegend) {
    chartProps.hideLegend = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ChartRenderer {...(chartProps as any)} {...interactiveCommonProps} />;
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

        // Build shared legend from the first sub-chart's color encoding
        const firstSubSpec = {
          ...gridProps.specs[0],
          data: gridProps.specs[0].data || vegaLiteSpec.data,
          encoding: {
            ...(vegaLiteSpec.encoding || {}),
            ...(gridProps.specs[0].encoding || {}),
          },
        };
        const sharedLegendProps = getVegaLiteLegendsProps(firstSubSpec, colorMap, isDarkTheme);

        return (
          <div ref={forwardedRef} className={props.className} style={props.style}>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: gridProps.templateRows,
                gridTemplateColumns: gridProps.templateColumns,
                gap: '16px',
              }}
            >
              {gridProps.specs.map((subSpec: VegaLiteSpec, index: number) => {
                // Compute default height for sub-charts
                const defaultSubHeight =
                  typeof vegaLiteSpec.height === 'number'
                    ? vegaLiteSpec.height
                    : typeof subSpec.height === 'number'
                    ? subSpec.height
                    : 300;

                const mergedSpec = {
                  ...subSpec,
                  data: subSpec.data || vegaLiteSpec.data,
                  encoding: {
                    ...(vegaLiteSpec.encoding || {}),
                    ...(subSpec.encoding || {}),
                  },
                  height: typeof subSpec.height === 'number' ? subSpec.height : defaultSubHeight,
                  // Hide legends on ALL sub-charts — shared legend is rendered below
                  _hideLegend: true,
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
                      minWidth: 0,
                    }}
                  >
                    {renderSingleChart(
                      mergedSpec,
                      colorMap,
                      isDarkTheme,
                      interactiveCommonProps,
                    )}
                  </div>
                );
              })}
            </div>
            {sharedLegendProps.legends.length > 0 && <Legends {...sharedLegendProps} {...multiSelectLegendProps} />}
          </div>
        );
      }

      // Check if this is a layered spec (composite chart)
      if (vegaLiteSpec.layer && vegaLiteSpec.layer.length > 1) {
        // Check if it's a supported bar+line combo
        const marks = vegaLiteSpec.layer.map((layer: VegaLiteUnitSpec) => getMarkType(layer.mark));
        const hasBar = marks.includes('bar');
        const hasLine = marks.includes('line') || marks.includes('point');
        const isBarLineCombo = hasBar && hasLine;

        // Only warn for unsupported layered specs
        if (!isBarLineCombo) {
          // Layered specifications with multiple chart types are not fully supported.
          // Only the first layer will be rendered.
        }
      }

      // Render single chart
      const chartComponent = renderSingleChart(
        vegaLiteSpec,
        colorMap,
        isDarkTheme,
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
