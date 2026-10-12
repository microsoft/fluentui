'use client';

import * as React from 'react';
import { createElement as createSlotElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type {
  VegaDeclarativeChartSlots,
  VegaDeclarativeChartState,
  VegaUnitViewPlan,
  VegaViewPlan,
  VegaLegendProps,
} from './VegaDeclarativeChart.types';
import type { VegaLiteSpec, VegaLiteSemanticMode } from './VegaLiteTypes';
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
} from './VegaLiteSchemaAdapter';
import { VegaLiteRangedChart, canRenderVegaRangedSpec } from './VegaLiteRangedChart';
import type { VegaLiteRangedChartProps } from './VegaLiteRangedChart';
import { VegaLiteCenteredArea, canRenderVegaCenteredAreaSpec } from './VegaLiteCenteredArea';
import { buildVegaTooltip, renderVegaTooltip } from './VegaLiteTooltip';
import type { useVegaDeclarativeChartStyles } from './useVegaDeclarativeChartStyles.styles';
import type { ResponsiveChildProps } from '../ResponsiveContainer/ResponsiveContainer.types';
import { withResponsiveContainer } from '../ResponsiveContainer/withResponsiveContainer';
import { Legends } from '../Legends/index';
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
import type { Chart } from '../../types/index';

type ViewClasses = ReturnType<typeof useVegaDeclarativeChartStyles>;
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

// Strip ResponsiveContainer's native-only metadata before the geometry DOM boundary.
const ResponsiveRangedContent: ForwardRefComponent<VegaLiteRangedChartProps & ResponsiveChildProps> = React.forwardRef(
  ({ spec, width, height, styles: _styles, shouldResize: _shouldResize, ...props }, ref) => {
    const renderTooltip = React.useCallback(
      (row: Record<string, unknown>, unitSpec?: VegaLiteSpec) => renderVegaTooltip(unitSpec ?? spec, row),
      [spec],
    );
    const getAriaLabel = React.useCallback(
      (row: Record<string, unknown>, unitSpec?: VegaLiteSpec) => buildVegaTooltip(unitSpec ?? spec, row).ariaLabel,
      [spec],
    );
    const Renderer = canRenderVegaCenteredAreaSpec(spec) ? VegaLiteCenteredArea : VegaLiteRangedChart;
    return (
      <Renderer
        {...props}
        spec={spec}
        width={width}
        height={height}
        ref={ref}
        renderTooltip={renderTooltip}
        getAriaLabel={getAriaLabel}
      />
    );
  },
);
ResponsiveRangedContent.displayName = 'ResponsiveRangedContent';
const ResponsiveRangedChart = withResponsiveContainer(ResponsiveRangedContent);

/** Module-owned responsive factories do not change identity between renders. */
const vegaChartMap = {
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

type UnitProps = {
  view: VegaUnitViewPlan;
  mode: VegaLiteSemanticMode;
  isDarkTheme: boolean;
  legendProps: VegaLegendProps;
};

/** Memoize only semantic transformations, not interaction props: callbacks always reach the current host. */
const VegaNativeUnit: ForwardRefComponent<UnitProps> = React.forwardRef(
  ({ view, mode, isDarkTheme, legendProps }, _ref) => {
    const chartRef = React.useRef<Chart>(null);
    const { ChartRenderer, chartProps } = React.useMemo(() => {
      try {
        // Native adapters need encoding operations, not projected aggregate/timeUnit aliases.
        const chartType = getChartType(view.nativeSpec);
        const config = vegaChartMap[chartType.type];
        if (!config) {
          throw new Error(`VegaDeclarativeChart: Unsupported chart type '${chartType.type}'`);
        }
        const transformed = config.transformer(view.nativeSpec, view.colorMap, isDarkTheme, { mode }) as Record<
          string,
          unknown
        >;
        if (
          chartType.type === 'stacked-bar' &&
          !transformed.isCalloutForStack &&
          transformed.onRenderCalloutPerDataPoint
        ) {
          delete transformed.onRenderCalloutPerStack;
        }
        // Preserve unauthored native captions for ordinary legacy units.
        if (view.legacySource) {
          const encoding = { ...view.legacySource.encoding, ...view.legacySource.layer?.[0]?.encoding };
          for (const channel of ['x', 'y'] as const) {
            const definition = encoding[channel];
            if (
              definition &&
              definition.aggregate === undefined &&
              definition.timeUnit === undefined &&
              typeof definition.field === 'string' &&
              !/[.\[\]\\]/.test(definition.field)
            ) {
              transformed[channel === 'x' ? 'xAxisTitle' : 'yAxisTitle'] =
                definition.title ?? definition.axis?.title ?? undefined;
            }
          }
        }
        if (view.hideLegend) {
          transformed.hideLegend = true;
        }
        return { ChartRenderer: config.renderer, chartProps: transformed };
      } catch (error) {
        throw new Error(`Failed to transform Vega-Lite spec: ${error}`);
      }
    }, [view, mode, isDarkTheme]);
    // Each native unit owns its imperative ref; composed siblings never overwrite each other.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- The factory selects heterogeneous native props.
    return <ChartRenderer {...(chartProps as any)} componentRef={chartRef} legendProps={legendProps} />;
  },
);
VegaNativeUnit.displayName = 'VegaNativeUnit';

/** Hide all leaf legends through explicit internal options, never private properties on caller specs. */
function withoutGeometryLegends(spec: VegaLiteSpec): VegaLiteSpec {
  return {
    ...spec,
    ...(spec.encoding?.color
      ? {
          encoding: { ...spec.encoding, color: { ...spec.encoding.color, legend: null } },
        }
      : {}),
    ...(spec.layer ? { layer: spec.layer.map(layer => withoutGeometryLegends(layer) as typeof layer) } : {}),
  };
}

const VegaGeometryUnit: ForwardRefComponent<UnitProps> = React.forwardRef(({ view, legendProps }, _ref) => {
  const spec = React.useMemo(() => (view.hideLegend ? withoutGeometryLegends(view.spec) : view.spec), [view]);
  return (
    <ResponsiveRangedChart
      spec={spec}
      hideTitle={view.composed}
      width={typeof spec.width === 'number' ? spec.width : undefined}
      height={typeof spec.height === 'number' ? spec.height : undefined}
      selectedLegends={legendProps.selectedLegends}
      onLegendChange={legendProps.onChange}
    />
  );
});
VegaGeometryUnit.displayName = 'VegaGeometryUnit';

/** Recursive JSX consumes an immutable plan. It neither prepares specs nor calls state hooks. */
function renderView(view: VegaViewPlan, state: VegaDeclarativeChartState, classes: ViewClasses): React.ReactElement {
  if (view.type === 'unit') {
    if (view.empty && view.composed) {
      return (
        <section
          data-vega-view={view.path}
          role="region"
          aria-label={view.title ?? 'Empty chart'}
          className={classes.cell}
        >
          {view.title && <h3 className={classes.header}>{view.title}</h3>}
          <p className={classes.message}>No data</p>
        </section>
      );
    }
    const Renderer =
      canRenderVegaRangedSpec(view.spec) || canRenderVegaCenteredAreaSpec(view.spec)
        ? VegaGeometryUnit
        : VegaNativeUnit;
    const chart = (
      <Renderer view={view} mode={state.mode} isDarkTheme={state.isDarkTheme} legendProps={state.legendProps} />
    );
    return view.composed ? (
      <div data-vega-view={view.path} className={classes.cell}>
        {view.title && <h3 className={classes.header}>{view.title}</h3>}
        {chart}
      </div>
    ) : (
      chart
    );
  }
  return (
    <React.Fragment>
      {view.title && <h2 className={classes.header}>{view.title}</h2>}
      <div className={classes.grid} style={{ gridTemplateColumns: `repeat(${view.columns}, minmax(0, 1fr))` }}>
        {view.children.map(child => (
          <React.Fragment key={child.path}>{renderView(child, state, classes)}</React.Fragment>
        ))}
      </div>
      {!view.hideLegend && view.legends.length > 0 && (
        <Legends legends={[...view.legends]} centerLegends enabledWrapLines {...state.legendProps} />
      )}
    </React.Fragment>
  );
}

/** Preserve the ordinary unit root, hierarchy, headings and accessible resource messages. */
export function renderVegaDeclarativeChart(state: VegaDeclarativeChartState, classes: ViewClasses): React.ReactElement {
  assertSlots<VegaDeclarativeChartSlots>(state);
  // This package uses classic React JSX. Normalize the root slot through the existing Fluent
  // factory without switching all intrinsic JSX to the runtime's React-18 global JSX typings.
  return createSlotElement(
    state.root,
    undefined,
    state.error ? (
      <div role="alert" className={classes.message}>
        {state.error.message}
      </div>
    ) : state.loading ? (
      <div role="status" aria-live="polite" className={classes.message}>
        Loading chart data…
      </div>
    ) : state.plan ? (
      renderView(state.plan, state, classes)
    ) : null,
  );
}
