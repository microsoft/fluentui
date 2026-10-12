// Using custom VegaLiteTypes for internal adapter logic
// For public API, VegaDeclarativeChart accepts vega-lite's TopLevelSpec
import type {
  VegaLiteSpec,
  VegaLiteUnitSpec,
  VegaLiteMarkDef,
  VegaLiteData,
  VegaLiteInterpolate,
  VegaLiteType,
  VegaLiteEncoding,
  VegaLiteSort,
  VegaLiteTitleParams,
} from './VegaLiteTypes';
import type { LineChartProps } from '../LineChart/index';
import type { VerticalBarChartProps } from '../VerticalBarChart/index';
import type { VerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import type { GroupedVerticalBarChartProps } from '../GroupedVerticalBarChart/index';
import type { HorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import type { AreaChartProps } from '../AreaChart/index';
import type { DonutChartProps } from '../DonutChart/index';
import type { ScatterChartProps } from '../ScatterChart/index';
import type { HeatMapChartProps } from '../HeatMapChart/index';
import type { PolarChartProps, PolarAxisProps } from '../PolarChart/index';
import type {
  ChartProps,
  LineChartPoints,
  LineChartDataPoint,
  VerticalBarChartDataPoint,
  VerticalStackedChartProps,
  HorizontalBarChartWithAxisDataPoint,
  ChartDataPoint,
  ScatterChartDataPoint,
  HeatMapChartData,
  HeatMapChartDataPoint,
  ChartAnnotation,
  LineDataInVerticalStackedBarChart,
  AxisCategoryOrder,
  PolarDataPoint,
  LinePolarSeries,
  AreaPolarSeries,
  ScatterPolarSeries,
  LineChartLineOptions,
} from '../../types/index';
import type { ColorFillBarsProps } from '../LineChart/index';
import type { Legend, LegendsProps } from '../Legends/index';
import type { TitleStyles } from '../../utilities/Common.styles';
import { getVegaColorFromMap, getVegaColor, getSequentialSchemeColors } from './VegaLiteColorAdapter';
import type { ColorMapRef } from './VegaLiteColorAdapter';
import { bin as d3Bin, extent as d3Extent, min as d3Min, max as d3Max } from 'd3-array';
import type { Bin } from 'd3-array';
import { format as d3Format } from 'd3-format';
import { isInvalidValue } from '@fluentui/chart-utilities';
import * as React from 'react';
import { tokens } from '@fluentui/react-theme';
import {
  prepareVegaLiteSpec,
  applyVegaTransforms,
  aggregateVegaValues,
  evaluateVegaPredicate,
} from './VegaLiteDataTransforms';
import { readVegaField } from './VegaLiteField';
import type { VegaSemanticOptions, VegaDataRow } from './VegaLiteData.types';
import { buildVegaTooltip, renderVegaTooltip } from './VegaLiteTooltip';
import { parseVegaDataValues } from './VegaLiteResourceLoader';

/**
 * Vega-Lite to Fluent Charts adapter for line/point charts.
 *
 * Transforms Vega-Lite JSON specifications into Fluent LineChart props.
 * Supports basic line charts with temporal/quantitative axes and color-encoded series.
 *
 * TODO: Future enhancements
 * - Multi-view layouts (facet, concat, repeat)
 * - Selection interactions
 * - Remote data loading (url)
 * - Transform pipeline (filter, aggregate, calculate)
 * - Conditional encodings
 * - Additional mark types (area, bar, etc.)
 * - Tooltip customization
 */

/**
 * Default configuration values for VegaLite charts
 */
const DEFAULT_CHART_HEIGHT = 350;
const DEFAULT_MAX_BAR_WIDTH = 50;
const DEFAULT_TRUNCATE_CHARS = 20;

type AdapterKind = ChartTypeResult['type'];
const preparedSpecs = new WeakSet<object>();
const tooltipSpecs = new WeakMap<object, VegaLiteSpec>();
const aggregateFields = new WeakMap<object, Set<string>>();
const histogramTooltips = new WeakMap<object, { spec: VegaLiteSpec; row: VegaDataRow }>();
const nativeTooltips = new WeakMap<object, { spec: VegaLiteSpec; row: VegaDataRow }>();
const nativeSourceRows = new WeakMap<object, VegaDataRow>();
const isRecord = (value: unknown): value is VegaDataRow =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const ownValue = (value: unknown, key: string): unknown => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && 'value' in descriptor ? descriptor.value : undefined;
};

function encodingTitle(definition: VegaDataRow): string {
  const field = typeof definition.field === 'string' ? definition.field : '';
  const op = definition.aggregate;
  if (op === 'count') {
    return 'Count of Records';
  }
  if (typeof op === 'string') {
    return `${op[0].toUpperCase()}${op.slice(1)} of ${field}`;
  }
  if (isRecord(op)) {
    const name = Object.keys(op)[0];
    if (name === 'exponential' || name === 'exponentialb') {
      return `EMA of ${field}`;
    }
  }
  return field;
}

/** Source-field sorts are evaluated before aggregate projection discards those fields. */
function resolveSourceSorts(encoding: VegaLiteEncoding, rows: VegaDataRow[], options: VegaSemanticOptions): void {
  for (const channel of ['x', 'y'] as const) {
    const definition = encoding[channel];
    const sort = definition?.sort;
    if (!definition?.field || !sort || typeof sort !== 'object' || Array.isArray(sort) || !sort.field) {
      continue;
    }
    const categories = new Map<unknown, VegaDataRow[]>();
    for (const row of rows) {
      const category = readVegaField(row, definition.field);
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(row);
    }
    const values = [...categories].map(([category, data]) => ({
      category,
      value: aggregateVegaValues(data, sort.field, sort.op ?? 'sum', options),
    }));
    values.sort((left, right) => {
      const a = left.value;
      const b = right.value;
      const order =
        a === b
          ? 0
          : a === null || a === undefined
          ? -1
          : b === null || b === undefined
          ? 1
          : typeof a === 'string' && typeof b === 'string'
          ? a < b
            ? -1
            : 1
          : Number(a) - Number(b);
      return sort.order === 'descending' ? -order : order;
    });
    definition.sort = values.map(entry => String(entry.category));
  }
}

/** Descriptor-safe cloning and shared preparation are the only raw-spec boundary. */
function prepareAdapterSpec(spec: VegaLiteSpec, options?: VegaSemanticOptions, kind?: AdapterKind): VegaLiteSpec {
  const policy: VegaSemanticOptions = { mode: 'legacy', ...options };
  const copy = applyVegaTransforms([spec as unknown as VegaDataRow], undefined, policy)[0] as unknown as VegaLiteSpec;
  const deferred: Array<{ definition: VegaDataRow; aggregate: unknown }> = [];
  const temporal: Array<{ definition: VegaDataRow; timeUnit: unknown }> = [];
  const visit = (
    node: VegaLiteSpec,
    inheritedRows: VegaDataRow[],
    inheritedEncoding: VegaLiteEncoding,
    depth = 0,
  ): void => {
    if (depth > 100) {
      throw new Error('VegaLiteSchemaAdapter: composition depth limit exceeded');
    }
    const source = node.data;
    const values = source
      ? source.values ?? (source.name ? ownValue(copy.datasets, source.name) : undefined)
      : inheritedRows;
    // Parse inline/named resources before any transform can inspect or coerce a field.
    // Resolved resources have no format left, so this is also safe for pre-parsed inputs.
    const rows =
      source && values !== undefined
        ? parseVegaDataValues({ ...source, values } as VegaLiteData)
        : Array.isArray(values)
        ? values.filter(isRecord)
        : [];
    // The shared pipeline applies parent transforms before child transforms. Clear consumed transforms.
    const data = applyVegaTransforms(rows, node.transform, policy);
    if (values !== undefined || !source) {
      node.data = { ...source, values: data };
      delete node.data.format;
      delete node.transform;
    }
    const encoding = applyVegaTransforms(
      [{ ...inheritedEncoding, ...node.encoding }],
      undefined,
      policy,
    )[0] as VegaLiteEncoding;
    if (node.layer?.length) {
      node.layer.forEach(child => visit(child as VegaLiteSpec, data, encoding, depth + 1));
      return;
    }
    node.encoding = encoding;
    resolveSourceSorts(encoding, data, policy);
    const seen = new Set<object>();
    const metadata = (value: unknown): void => {
      if (!value || typeof value !== 'object' || seen.has(value)) {
        return;
      }
      seen.add(value);
      if (Array.isArray(value)) {
        value.forEach(metadata);
        return;
      }
      const definition = value as VegaDataRow;
      if ((definition.field !== undefined || definition.aggregate !== undefined) && definition.title === undefined) {
        const axisTitle = ownValue(definition.axis, 'title');
        definition.title = typeof axisTitle === 'string' ? axisTitle : encodingTitle(definition);
      }
      if (definition.timeUnit !== undefined) {
        temporal.push({ definition, timeUnit: definition.timeUnit });
      }
      if (kind === 'histogram' && definition.aggregate !== undefined) {
        deferred.push({ definition, aggregate: definition.aggregate });
        delete definition.aggregate;
      }
      metadata(definition.condition);
    };
    Object.values(encoding).forEach(metadata);
  };
  visit(copy, [], {});
  // Capture metadata separately: generated aliases are never used as display titles.
  const sourceUnits = normalizeSpec(copy);
  const result = prepareVegaLiteSpec(copy, policy);
  const units = normalizeSpec(result);
  const tooltipCopy = applyVegaTransforms(
    [result as unknown as VegaDataRow],
    undefined,
    policy,
  )[0] as unknown as VegaLiteSpec;
  const tooltipUnits = normalizeSpec(tooltipCopy);
  const fields = new Set<string>();
  sourceUnits.forEach((unit, index) => {
    const restored = new Set<object>();
    const restore = (source: unknown, target: unknown, tooltipTarget: unknown): void => {
      if (source && typeof source === 'object') {
        if (restored.has(source)) {
          return;
        }
        restored.add(source);
      }
      if (Array.isArray(source) && Array.isArray(target) && Array.isArray(tooltipTarget)) {
        source.forEach((entry, i) => restore(entry, target[i], tooltipTarget[i]));
      } else if (isRecord(source) && isRecord(target) && isRecord(tooltipTarget)) {
        if (source.aggregate !== undefined && typeof target.field === 'string') {
          fields.add(target.field);
        }
        const unitMetadata = temporal.find(entry => entry.definition === source);
        if (unitMetadata) {
          tooltipTarget.timeUnit = unitMetadata.timeUnit;
        }
        const aggregate = deferred.find(entry => entry.definition === source);
        if (aggregate) {
          target.aggregate = aggregate.aggregate;
          tooltipTarget.aggregate = aggregate.aggregate;
        }
        restore(source.condition, target.condition, tooltipTarget.condition);
      }
    };
    Object.entries(unit.encoding ?? {}).forEach(([channel, definition]) => {
      restore(definition, ownValue(units[index]?.encoding, channel), ownValue(tooltipUnits[index]?.encoding, channel));
    });
    if (unit.data?.format && tooltipUnits[index]?.data) {
      tooltipUnits[index].data!.format = unit.data.format;
    }
  });
  for (const unit of units) {
    const encoding = unit.encoding;
    const condition = encoding?.color?.condition;
    // Only the supported single test/value color condition is materialized here.
    if (condition && typeof condition.test === 'string' && typeof condition.value === 'string') {
      const fallback = encoding!.color!.value ?? tokens.colorNeutralForeground3;
      const rows = extractDataValues(unit.data);
      let field = '__conditional_color__';
      while (rows.some(row => Object.prototype.hasOwnProperty.call(row, field))) {
        field += '_';
      }
      rows.forEach(row => {
        Object.defineProperty(row, field, {
          value: evaluateVegaPredicate(condition.test, row, policy) ? condition.value : fallback,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      });
      encoding!.color = {
        field,
        type: 'nominal',
        scale: { domain: [condition.value, fallback], range: [condition.value, fallback] },
        legend: null,
      };
    }
  }
  preparedSpecs.add(result);
  tooltipSpecs.set(result, tooltipCopy);
  aggregateFields.set(result, fields);
  return result;
}

function transformPrepared<T extends object>(
  kind: AdapterKind,
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme: boolean | undefined,
  options: VegaSemanticOptions | undefined,
  render: (input: VegaLiteSpec, colors: ColorMapRef, dark?: boolean) => T,
): T {
  const prepared = prepareAdapterSpec(spec, options, kind);
  if (
    (kind === 'area' || kind === 'stacked-bar') &&
    normalizeSpec(prepared).some(unit => unit.encoding?.y?.stack === 'center')
  ) {
    throw new Error('VegaLiteSchemaAdapter: center stack is unsupported by the native zero-baseline renderer');
  }
  // Temporal declarations must be validated, never silently routed as categories.
  for (const unit of normalizeSpec(prepared)) {
    const data = extractDataValues(unit.data ?? prepared.data);
    for (const channel of ['x', 'y'] as const) {
      const definition = unit.encoding?.[channel];
      if (definition?.type === 'temporal' && definition.field) {
        validateEncodingType(data, definition.field, definition.type);
      }
    }
  }
  autoCorrectEncodingTypes(prepared);
  const result = render(prepared, colorMap, isDarkTheme);
  applyNativeScaleDomains(result, prepared, kind);
  attachSemanticTooltips(result, prepared, kind);
  applyNativeSemanticOrderAndStack(result, prepared, kind);
  return result;
}

function equalCoordinate(left: unknown, right: unknown): boolean {
  if (left instanceof Date || right instanceof Date) {
    const date = (value: unknown): number =>
      value instanceof Date
        ? value.getTime()
        : typeof value === 'string' || typeof value === 'number'
        ? new Date(value).getTime()
        : NaN;
    return date(left) === date(right);
  }
  return (
    left === right ||
    (left !== null && left !== undefined && right !== null && right !== undefined && String(left) === String(right))
  );
}

type TooltipBinding = { point: VegaDataRow; x: unknown; legend: unknown; row: VegaDataRow; spec: VegaLiteSpec };

/** Native callout arguments contain coordinates, not the original tuple. Keep the tuple with each point. */
function attachSemanticTooltips<T extends object>(result: T, prepared: VegaLiteSpec, kind: AdapterKind): void {
  const tooltipSpec = tooltipSpecs.get(prepared) ?? prepared;
  const units = normalizeSpec(prepared);
  const tooltipUnits = normalizeSpec(tooltipSpec);
  const explicit = tooltipUnits.some(unit => {
    const mark = unit.mark;
    const type = getMarkType(mark);
    return (
      ownValue(unit.encoding, 'tooltip') !== undefined ||
      ownValue(mark, 'tooltip') !== undefined ||
      Object.values(unit.encoding ?? {}).some(definition => ownValue(definition, 'tooltip') === false) ||
      ownValue(ownValue(tooltipSpec.config, type ?? ''), 'tooltip') !== undefined ||
      ownValue(ownValue(tooltipSpec.config, 'mark'), 'tooltip') !== undefined
    );
  });
  if (!explicit) {
    return;
  } // Preserve native backward-compatible default callouts.
  const props = result as unknown as VegaDataRow;
  const bindings: TooltipBinding[] = [];
  let hasTooltipContent = false;
  const key = (x: unknown, y: unknown, legend: unknown): string =>
    JSON.stringify(
      [x, y, legend].map(value =>
        value instanceof Date ? `date:${value.getTime()}` : value === undefined ? 'undefined' : String(value),
      ),
    );
  type Source = { row: VegaDataRow; spec: VegaLiteSpec };
  const source = new Map<string, { rows: Source[]; next: number }>();
  const categoricalX =
    (kind === 'line' || kind === 'area') &&
    units.some(unit => unit.encoding?.x?.type === 'nominal' || unit.encoding?.x?.type === 'ordinal');
  units.forEach((unit, index) => {
    const encoding = unit.encoding ?? {};
    const rows = extractDataValues(unit.data);
    const yField =
      kind === 'donut' ? encoding.theta?.field : kind === 'polar' ? encoding.radius?.field : encoding.y?.field;
    const yLabels = new Map<string, number>();
    if (
      (kind === 'line' || kind === 'area' || kind === 'scatter') &&
      (encoding.y?.type === 'nominal' || encoding.y?.type === 'ordinal')
    ) {
      categoricalDomain(encoding.y).forEach(value => yLabels.set(String(value), yLabels.size));
      rows.forEach(row => {
        const value = yField ? readVegaField(row, yField) : undefined;
        if (typeof value === 'string' && !yLabels.has(value)) {
          yLabels.set(value, yLabels.size);
        }
      });
    }
    const xField = kind === 'donut' ? undefined : kind === 'polar' ? encoding.theta?.field : encoding.x?.field;
    rows.forEach(row => {
      let x = xField ? readVegaField(row, xField) : undefined;
      let y = yField ? readVegaField(row, yField) : undefined;
      if ((kind === 'line' || kind === 'area' || kind === 'scatter') && encoding.x?.type === 'temporal') {
        x = parseValue(x, true);
      }
      if (typeof y === 'string' && yLabels.has(y)) {
        y = yLabels.get(y);
      }
      const legend = encoding.color?.field ? readVegaField(row, encoding.color.field) : undefined;
      const id = key(x, y, kind === 'heatmap' ? undefined : legend);
      if (!source.has(id)) {
        source.set(id, { rows: [], next: 0 });
      }
      source.get(id)!.rows.push({ row, spec: { ...tooltipSpec, ...tooltipUnits[index] } as VegaLiteSpec });
    });
  });
  const bind = (point: VegaDataRow, x: unknown, y: unknown, legend: unknown): void => {
    const coordinate =
      categoricalX && typeof x === 'number' && Array.isArray(props.tickValues) ? props.tickValues[x] : x;
    const bucket = source.get(key(coordinate, y, legend)) ?? source.get(key(coordinate, y, undefined));
    const match = histogramTooltips.get(point) ?? nativeTooltips.get(point) ?? (bucket && bucket.rows[bucket.next++]);
    if (!match) {
      return;
    }
    const tooltip = buildVegaTooltip(match.spec, match.row);
    hasTooltipContent ||= tooltip.fields.length > 0;
    // An empty string triggers the native renderer's unfiltered ARIA fallback.
    point.callOutAccessibilityData = { ariaLabel: tooltip.ariaLabel || 'Data point' };
    if (tooltip.disabled) {
      props.hideTooltip = true;
    }
    bindings.push({ point, x, legend, row: match.row, spec: match.spec });
  };
  const records = (value: unknown): VegaDataRow[] => (Array.isArray(value) ? value.filter(isRecord) : []);
  const chart = props.data;
  if (kind === 'line' || kind === 'area' || kind === 'scatter') {
    const series = records(ownValue(chart, kind === 'scatter' ? 'scatterChartData' : 'lineChartData'));
    series.forEach(group => records(group.data).forEach(point => bind(point, point.x, point.y, group.legend)));
  } else if (kind === 'stacked-bar') {
    records(chart).forEach(stack => {
      records(stack.chartData).forEach(point => bind(point, stack.xAxisPoint, point.data, point.legend));
      records(stack.lineData).forEach(point => bind(point, stack.xAxisPoint, point.y, point.legend));
      stack.stackCallOutAccessibilityData = {
        ariaLabel: records(stack.chartData)
          .map(point => ownValue(point.callOutAccessibilityData, 'ariaLabel'))
          .filter(Boolean)
          .join('; '),
      };
    });
  } else if (kind === 'grouped-bar') {
    records(chart).forEach(group => {
      records(group.series).forEach(point => bind(point, group.name, point.data, point.legend));
      group.stackCallOutAccessibilityData = {
        ariaLabel: records(group.series)
          .map(point => ownValue(point.callOutAccessibilityData, 'ariaLabel'))
          .filter(Boolean)
          .join('; '),
      };
    });
  } else if (kind === 'heatmap') {
    records(chart).forEach(group => records(group.data).forEach(point => bind(point, point.x, point.y, undefined)));
  } else if (kind === 'polar') {
    records(chart).forEach(group =>
      records(group.data).forEach(point => bind(point, point.theta, point.r, group.legend)),
    );
  } else if (kind === 'donut') {
    records(ownValue(chart, 'chartData')).forEach(point => bind(point, undefined, point.data, point.legend));
  } else {
    records(chart).forEach(point => bind(point, point.x, point.y, point.legend));
  }
  // Null custom content otherwise falls back to the native unfiltered callout.
  if (bindings.length > 0 && !hasTooltipContent) {
    props.hideTooltip = true;
  }
  if (props.hideTooltip) {
    return;
  }
  const content = (input: unknown): React.ReactElement | null => {
    if (!isRecord(input)) {
      return null;
    }
    let selected: TooltipBinding[];
    const direct = bindings.find(binding => binding.point === input);
    if (direct) {
      selected = [direct];
    } else if (Array.isArray(input.values)) {
      selected = records(input.values).flatMap(value => {
        const binding = bindings.find(
          entry =>
            equalCoordinate(entry.point.x ?? entry.x, input.x) &&
            equalCoordinate(entry.legend, value.legend) &&
            equalCoordinate(entry.point.y ?? entry.point.data, value.y),
        );
        return binding ? [binding] : [];
      });
    } else if (Array.isArray(input.chartData)) {
      selected = bindings.filter(binding => equalCoordinate(binding.x, input.xAxisPoint));
    } else if (Array.isArray(input.series)) {
      selected = records(input.series).flatMap(point => {
        const binding = bindings.find(
          entry =>
            equalCoordinate(entry.x, input.name) &&
            (entry.point === point ||
              (equalCoordinate(entry.legend, point.legend) && equalCoordinate(entry.point.data, point.data))),
        );
        return binding ? [binding] : [];
      });
    } else {
      selected = bindings.filter(
        binding =>
          equalCoordinate(binding.point.x ?? binding.x, input.x) &&
          equalCoordinate(binding.legend, input.legend) &&
          equalCoordinate(binding.point.y ?? binding.point.data, input.y ?? input.data),
      );
    }
    const elements = selected
      .map(binding => renderVegaTooltip(binding.spec, binding.row))
      .filter((entry): entry is React.ReactElement => entry !== null);
    return elements.length === 0
      ? null
      : elements.length === 1
      ? elements[0]
      : React.createElement(
          React.Fragment,
          null,
          ...elements.map((element, index) => React.cloneElement(element, { key: index })),
        );
  };
  props.onRenderCalloutPerDataPoint = content;
  if (kind === 'line' || kind === 'area' || kind === 'scatter' || kind === 'stacked-bar' || kind === 'grouped-bar') {
    props.onRenderCalloutPerStack = content;
  }
}

/** Only authored/shared categorical domains override legacy first-seen category order. */
function categoricalDomain(definition: VegaLiteEncoding['x']): string[] {
  if (definition?.type !== 'nominal' && definition?.type !== 'ordinal') {
    return [];
  }
  const domain = definition.scale?.domain;
  if (!Array.isArray(domain)) {
    return [];
  }
  const labels = [...new Set(domain.map(value => String(value)))];
  return definition.scale?.reverse ? labels.reverse() : labels;
}

/** Translate view-tree scale domains into actual native coordinate/axis props. */
function applyNativeScaleDomains<T extends object>(result: T, prepared: VegaLiteSpec, kind: AdapterKind): void {
  if (kind === 'donut' || kind === 'polar') {
    return;
  }
  const units = normalizeSpec(prepared);
  const encoding = (kind === 'line' || kind === 'area' ? findPrimaryLineSpec(units) : units[0])?.encoding;
  if (!encoding) {
    return;
  }
  const props = result as unknown as VegaDataRow;
  for (const channel of ['x', 'y'] as const) {
    const definition = encoding[channel];
    const domain = definition?.scale?.domain;
    if (!Array.isArray(domain)) {
      continue;
    }
    if (definition?.type === 'nominal' || definition?.type === 'ordinal') {
      const labels = categoricalDomain(definition);
      props[channel === 'x' ? 'xAxisCategoryOrder' : 'yAxisCategoryOrder'] = labels;
      // Line/area coordinates and categorical scatter y are already seeded below.
      if (channel === 'x' && kind !== 'line' && kind !== 'area') {
        props.tickValues = labels;
      }
      if (channel === 'y' && kind !== 'line' && kind !== 'area' && kind !== 'scatter') {
        props.yAxisTickValues = labels;
      }
    } else if (domain.length >= 2) {
      const bounds = domain.map((value: unknown) =>
        definition?.type === 'temporal'
          ? value instanceof Date
            ? Date.prototype.getTime.call(value)
            : typeof value === 'string' || typeof value === 'number'
            ? new Date(value).getTime()
            : NaN
          : typeof value === 'number'
          ? value
          : NaN,
      );
      if (!bounds.every(Number.isFinite)) {
        continue;
      }
      props[channel === 'x' ? 'xMinValue' : 'yMinValue'] = Math.min(...bounds);
      props[channel === 'x' ? 'xMaxValue' : 'yMaxValue'] = Math.max(...bounds);
      // Native temporal x scales read tickValues, not xMinValue/xMaxValue. Keep
      // declared ticks and add domain endpoints so empty facet scopes share extent.
      if (
        channel === 'x' &&
        definition?.type === 'temporal' &&
        (kind === 'line' || kind === 'area' || kind === 'scatter')
      ) {
        const ticks = Array.isArray(props.tickValues) ? props.tickValues : [];
        const times = [
          ...new Set([
            ...bounds,
            ...ticks.map(value =>
              value instanceof Date ? Date.prototype.getTime.call(value) : new Date(value as string | number).getTime(),
            ),
          ]),
        ]
          .filter(Number.isFinite)
          .sort((a, b) => a - b);
        props.tickValues = times.map(value => new Date(value));
      }
    }
  }
}

/** Reorder actual native nodes, not just legends, and pass normalized contributions to native stacking. */
function applyNativeSemanticOrderAndStack<T extends object>(
  result: T,
  prepared: VegaLiteSpec,
  kind: AdapterKind,
): void {
  const units = normalizeSpec(prepared);
  const unit =
    kind === 'area' || kind === 'line'
      ? findPrimaryLineSpec(units)
      : units.find(candidate => (kind === 'stacked-bar' ? getMarkType(candidate.mark) === 'bar' : true)) ?? units[0];
  const encoding = unit?.encoding;
  if (!encoding) {
    return;
  }
  const props = result as unknown as VegaDataRow;
  const records = (value: unknown): VegaDataRow[] => (Array.isArray(value) ? (value as VegaDataRow[]) : []);
  const order = (nodes: VegaDataRow[], values: unknown[], key: string): void => {
    const ranks = new Map<string, number>();
    values.forEach((value, index) => {
      if (!ranks.has(String(value))) {
        ranks.set(String(value), index);
      }
    });
    const rank = (value: unknown): number => {
      return ranks.get(String(value)) ?? values.length;
    };
    nodes.sort((a, b) => rank(a[key]) - rank(b[key]));
  };
  const chart = props.data;
  for (const channel of ['x', 'y'] as const) {
    const definition = encoding[channel];
    const sort =
      Array.isArray(definition?.scale?.domain) && (definition?.type === 'nominal' || definition?.type === 'ordinal')
        ? categoricalDomain(definition)
        : definition?.sort;
    if (!Array.isArray(sort)) {
      continue;
    }
    props[channel === 'x' ? 'xAxisCategoryOrder' : 'yAxisCategoryOrder'] = sort;
    if (kind === 'bar' || kind === 'horizontal-bar') {
      order(records(chart), sort, channel);
    }
    if (channel === 'x' && kind === 'stacked-bar') {
      order(records(chart), sort, 'xAxisPoint');
    }
    if (channel === 'x' && kind === 'grouped-bar') {
      order(records(chart), sort, 'name');
    }
    if (
      (kind === 'line' || kind === 'area') &&
      channel === 'x' &&
      Array.isArray(props.tickValues) &&
      (encoding.x?.type === 'nominal' || encoding.x?.type === 'ordinal')
    ) {
      const labels = props.tickValues;
      const sorted = labels.map(label => ({ label }));
      order(sorted, sort, 'label');
      const nextLabels = sorted.map(entry => entry.label);
      const indices = new Map(nextLabels.map((label, index) => [String(label), index]));
      records(ownValue(chart, 'lineChartData')).forEach(series => {
        const points = records(series.data);
        points.forEach(point => {
          if (typeof point.x === 'number') {
            point.x = indices.get(String(labels[point.x])) ?? point.x;
          }
        });
        points.sort((a, b) => Number(a.x) - Number(b.x));
      });
      props.tickValues = nextLabels;
    }
  }
  const domain = encoding.color?.type === 'nominal' ? encoding.color.scale?.domain : undefined;
  const stacked = kind === 'stacked-bar' || (kind === 'area' && encoding.y?.stack !== null && !!encoding.color?.field);
  const stacks = kind === 'stacked-bar' ? records(chart).map(stack => records(stack.chartData)) : [];
  const series = kind === 'area' ? records(ownValue(chart, 'lineChartData')) : [];
  const orderEncoding = encoding.order;
  const definitions = (Array.isArray(orderEncoding) ? orderEncoding : [orderEncoding]).filter(isRecord);
  const preserveInsertion = definitions.some(definition => definition.sort === false || definition.sort === null);
  const orderFields = definitions.filter(definition => typeof definition.field === 'string');
  if (stacked && !preserveInsertion && orderFields.length) {
    // The prepared order field may be a nested-field or aggregate alias. Retain
    // each source tuple on the actual native point, before normalization changes y.
    const value = (node: VegaDataRow, field: string): unknown => {
      const point = kind === 'area' ? records(node.data)[0] : node;
      const row = point && (nativeSourceRows.get(point) ?? nativeTooltips.get(point)?.row);
      return row ? readVegaField(row, field) : undefined;
    };
    const compare = (left: unknown, right: unknown): number => {
      if (equalCoordinate(left, right)) {
        return 0;
      }
      if (left === null || left === undefined) {
        return -1;
      }
      if (right === null || right === undefined) {
        return 1;
      }
      if (typeof left === 'number' && typeof right === 'number') {
        return left - right;
      }
      if (left instanceof Date && right instanceof Date) {
        return left.getTime() - right.getTime();
      }
      return String(left) < String(right) ? -1 : 1;
    };
    const bySourceOrder = (left: VegaDataRow, right: VegaDataRow): number => {
      for (const definition of orderFields) {
        const result = compare(value(left, definition.field as string), value(right, definition.field as string));
        if (result) {
          return definition.sort === 'descending' ? -result : result;
        }
      }
      return 0; // Native Array.sort is stable: ties retain tuple insertion order, including mixed signs.
    };
    stacks.forEach(nodes => nodes.sort(bySourceOrder));
    series.sort(bySourceOrder);
  } else if (stacked && !preserveInsertion && Array.isArray(domain)) {
    stacks.forEach(nodes => order(nodes, domain, 'legend'));
    order(series, domain, 'legend');
  }
  if (!stacked || encoding.y?.stack !== 'normalize') {
    return;
  }
  if (kind === 'area') {
    const byX = new Map<string, VegaDataRow[]>();
    series.forEach(group =>
      records(group.data).forEach(point => {
        const key = point.x instanceof Date ? `date:${point.x.getTime()}` : `${typeof point.x}:${String(point.x)}`;
        if (!byX.has(key)) {
          byX.set(key, []);
        }
        byX.get(key)!.push(point);
      }),
    );
    stacks.push(...byX.values());
  }
  let negative = false;
  const field = kind === 'area' ? 'y' : 'data';
  const formatter = createValueFormatter(encoding.y?.axis?.format);
  stacks.forEach(nodes => {
    const positives = nodes.reduce((sum, node) => sum + Math.max(0, Number(node[field]) || 0), 0);
    const negatives = nodes.reduce((sum, node) => sum + Math.max(0, -Number(node[field]) || 0), 0);
    negative ||= negatives > 0;
    nodes.forEach(node => {
      const value = Number(node[field]) || 0;
      const total = value < 0 ? negatives : positives;
      node[field] = total ? value / total : 0;
      if (formatter) {
        node.yAxisCalloutData = formatter(Number(node[field]));
        node.barLabel = node.yAxisCalloutData;
      }
    });
  });
  props.yMinValue = negative ? -1 : 0;
  props.yMaxValue = 1;
}

export function transformVegaLiteToLineChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): LineChartProps {
  return transformPrepared('line', spec, colorMap, isDarkTheme, options, renderLineChartProps);
}
export function transformVegaLiteToVerticalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): VerticalBarChartProps {
  return transformPrepared('bar', spec, colorMap, isDarkTheme, options, renderVerticalBarChartProps);
}
export function transformVegaLiteToVerticalStackedBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): VerticalStackedBarChartProps {
  return transformPrepared('stacked-bar', spec, colorMap, isDarkTheme, options, renderVerticalStackedBarChartProps);
}
export function transformVegaLiteToGroupedVerticalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): GroupedVerticalBarChartProps {
  return transformPrepared('grouped-bar', spec, colorMap, isDarkTheme, options, renderGroupedVerticalBarChartProps);
}
export function transformVegaLiteToHorizontalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): HorizontalBarChartWithAxisProps {
  return transformPrepared('horizontal-bar', spec, colorMap, isDarkTheme, options, renderHorizontalBarChartProps);
}
export function transformVegaLiteToAreaChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): AreaChartProps {
  return transformPrepared('area', spec, colorMap, isDarkTheme, options, renderAreaChartProps);
}
export function transformVegaLiteToScatterChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): ScatterChartProps {
  return transformPrepared('scatter', spec, colorMap, isDarkTheme, options, renderScatterChartProps);
}
export function transformVegaLiteToDonutChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): DonutChartProps {
  return transformPrepared('donut', spec, colorMap, isDarkTheme, options, renderDonutChartProps);
}
export function transformVegaLiteToHeatMapChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): HeatMapChartProps {
  return transformPrepared('heatmap', spec, colorMap, isDarkTheme, options, renderHeatMapChartProps);
}
export function transformVegaLiteToHistogramProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): VerticalBarChartProps {
  return transformPrepared('histogram', spec, colorMap, isDarkTheme, options, renderHistogramProps);
}
export function transformVegaLiteToPolarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
  options?: VegaSemanticOptions,
): PolarChartProps {
  return transformPrepared('polar', spec, colorMap, isDarkTheme, options, renderPolarChartProps);
}

/**
 * Determines if a spec is a layered specification
 */
function isLayerSpec(spec: VegaLiteSpec): spec is VegaLiteSpec & { layer: VegaLiteUnitSpec[] } {
  return Array.isArray(spec.layer) && spec.layer.length > 0;
}

/**
 * Determines if a spec is a single unit specification
 */
function isUnitSpec(spec: VegaLiteSpec): boolean {
  return spec.mark !== undefined && spec.encoding !== undefined;
}

/**
 * Extracts the mark type string from a VegaLiteMarkDef (string or object with type property)
 */
export function getMarkType(mark: VegaLiteMarkDef | string | undefined): string | undefined {
  if (!mark) {
    return undefined;
  }
  return typeof mark === 'string' ? mark : (mark as { type?: string }).type;
}

/**
 * Resolves the color for a legend label using the priority chain:
 * 1. Explicit color value from encoding
 * 2. Mark-level color
 * 3. Cached color from the shared color map
 * 4. New color via local index for deterministic per-chart assignment
 */
function resolveColor(
  legend: string,
  index: number,
  colorValue: string | undefined,
  markColor: string | undefined,
  colorMap: ColorMapRef,
  colorScheme: string | undefined,
  colorRange: string[] | undefined,
  isDarkTheme?: boolean,
): string {
  if (colorValue) {
    return colorValue;
  }
  if (markColor) {
    return markColor;
  }
  // Check colorMap cache first for cross-chart consistency
  if (colorMap.current?.has(legend)) {
    return colorMap.current.get(legend)!;
  }
  // Use local index (not colorMap.size) for deterministic per-chart color assignment
  const color = getVegaColor(index, colorScheme, colorRange, isDarkTheme);
  colorMap.current?.set(legend, color);
  return color;
}

/**
 * Extracts inline data values from a Vega-Lite data specification
 * TODO: Add support for URL-based data loading
 * TODO: Add support for named dataset resolution
 * TODO: Add support for data format parsing (csv, tsv)
 */
function extractDataValues(data: VegaLiteData | undefined): Array<Record<string, unknown>> {
  if (!data) {
    return [];
  }

  if (data.values && Array.isArray(data.values)) {
    return data.values;
  }

  // TODO: Handle data.url - load remote data
  if (data.url) {
    // Remote data URLs are not yet supported
    return [];
  }

  // TODO: Handle data.name - resolve named datasets
  if (data.name) {
    // Named datasets are not yet supported
    return [];
  }

  return [];
}

/**
 * Normalizes a Vega-Lite spec into an array of unit specs with resolved data and encoding
 * Handles both single-view and layered specifications
 */
function normalizeSpec(spec: VegaLiteSpec): VegaLiteUnitSpec[] {
  if (isLayerSpec(spec)) {
    // Layered spec: merge shared data and encoding with each layer
    const sharedData = spec.data;
    const sharedEncoding = spec.encoding;

    return spec.layer.map(layer => ({
      ...layer,
      data: layer.data || sharedData,
      encoding: {
        ...sharedEncoding,
        ...layer.encoding,
      },
    }));
  }

  if (isUnitSpec(spec)) {
    // Single unit spec
    return [
      {
        mark: spec.mark!,
        encoding: spec.encoding,
        data: spec.data,
      },
    ];
  }

  // Unsupported spec structure
  return [];
}

/**
 * Parses a value to a Date if it's temporal, otherwise returns as number or string
 */
function parseValue(value: unknown, isTemporalType: boolean): Date | number | string {
  if (value === null || value === undefined) {
    return '';
  }

  if (isTemporalType) {
    // Try parsing as date
    const dateValue = new Date(value as string | number);
    if (!isNaN(dateValue.getTime())) {
      return dateValue;
    }
  }

  if (typeof value === 'number') {
    return value;
  }

  return String(value);
}

/**
 * Maps Vega-Lite interpolate to Fluent curve options
 * Note: Only maps to curve types supported by LineChartLineOptions
 */
function mapInterpolateToCurve(
  interpolate: VegaLiteInterpolate | undefined,
): 'linear' | 'natural' | 'step' | 'stepAfter' | 'stepBefore' | undefined {
  if (!interpolate) {
    return undefined;
  }

  switch (interpolate) {
    case 'linear':
    case 'linear-closed':
      return 'linear';
    case 'step':
      return 'step';
    case 'step-before':
      return 'stepBefore';
    case 'step-after':
      return 'stepAfter';
    case 'natural':
      return 'natural';
    case 'monotone':
      return 'linear';
    // Note: basis, cardinal, catmull-rom are not supported by LineChartLineOptions
    default:
      return 'linear';
  }
}

/**
 * Extracts mark properties from VegaLiteMarkDef
 */
function getMarkProperties(mark: VegaLiteMarkDef): {
  color?: string;
  interpolate?: VegaLiteInterpolate;
  strokeWidth?: number;
  strokeDash?: number[];
  point?: boolean | { filled?: boolean; size?: number };
} {
  if (typeof mark === 'string') {
    return {};
  }
  return {
    color: mark.color,
    interpolate: mark.interpolate,
    strokeWidth: mark.strokeWidth,
    strokeDash: mark.strokeDash,
    point: mark.point,
  };
}

/**
 * Extracts annotations from Vega-Lite layers with text or rule marks
 * Text marks become text annotations, rule marks become reference lines
 */
function extractAnnotations(spec: VegaLiteSpec): ChartAnnotation[] {
  const annotations: ChartAnnotation[] = [];

  if (!spec.layer || !Array.isArray(spec.layer)) {
    return annotations;
  }

  spec.layer.forEach((layer, index) => {
    const mark = getMarkType(layer.mark);
    const encoding = layer.encoding || {};

    // Text marks become annotations
    if (mark === 'text' && encoding.x && encoding.y) {
      const textValue = encoding.text?.datum || encoding.text?.value || encoding.text?.field || '';
      const xValue = encoding.x.datum || encoding.x.value || encoding.x.field;
      const yValue = encoding.y.datum || encoding.y.value || encoding.y.field;

      if (
        textValue &&
        (xValue !== undefined || encoding.x.datum !== undefined) &&
        (yValue !== undefined || encoding.y.datum !== undefined)
      ) {
        annotations.push({
          id: `text-annotation-${index}`,
          text: String(textValue),
          coordinates: {
            type: 'data',
            x: encoding.x.datum || xValue || 0,
            y: encoding.y.datum || yValue || 0,
          },
          style: {
            textColor: typeof layer.mark === 'object' ? layer.mark.color : undefined,
          },
        });
      }
    }

    // Rule marks can become reference lines (horizontal or vertical)
    if (mark === 'rule') {
      const markColor = typeof layer.mark === 'object' ? layer.mark.color : '#000';
      const markStrokeWidth = typeof layer.mark === 'object' ? layer.mark.strokeWidth || 1 : 1;
      const markStrokeDash =
        typeof layer.mark === 'object' ? (layer.mark as Record<string, unknown>).strokeDash : undefined;

      // Horizontal rule (y value constant)
      if (encoding.y && (encoding.y.value !== undefined || encoding.y.datum !== undefined)) {
        const yValue = encoding.y.value ?? encoding.y.datum;
        // Look for a companion text annotation at the same y-value
        const companionText = spec.layer?.find((l, i) => {
          if (i === index) {
            return false;
          }
          const m = getMarkType(l.mark);
          return m === 'text' && l.encoding?.y && (l.encoding.y.datum ?? l.encoding.y.value) === yValue;
        });
        const ruleText = companionText
          ? String(companionText.encoding?.text?.datum || companionText.encoding?.text?.value || yValue)
          : String(yValue);

        annotations.push({
          id: `rule-h-${index}`,
          text: ruleText,
          coordinates: {
            type: 'data',
            x: 0,
            y: yValue as number,
          },
          style: {
            textColor: markColor,
            borderColor: markColor,
            borderWidth: markStrokeWidth,
            ...(markStrokeDash && Array.isArray(markStrokeDash)
              ? { borderRadius: 0 } // Indicate dashed style
              : {}),
          },
        });
      }
      // Vertical rule (x value constant)
      else if (encoding.x && (encoding.x.value !== undefined || encoding.x.datum !== undefined)) {
        const xValue = encoding.x.value ?? encoding.x.datum;
        annotations.push({
          id: `rule-v-${index}`,
          text: String(xValue),
          coordinates: {
            type: 'data',
            x: xValue as number | string | Date,
            y: 0,
          },
          style: {
            textColor: markColor,
            borderColor: markColor,
            borderWidth: markStrokeWidth,
          },
        });
      }
    }
  });

  return annotations;
}

/**
 * Extracts color fill bars (background regions) from rect marks with x/x2 or y/y2 encodings
 */
function extractColorFillBars(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): ColorFillBarsProps[] {
  const colorFillBars: ColorFillBarsProps[] = [];

  if (!spec.layer || !Array.isArray(spec.layer)) {
    return colorFillBars;
  }

  // Detect if x-axis is temporal by checking the primary data layer (non-rect layer)
  const isXTemporal = spec.layer.some(layer => {
    const layerMark = getMarkType(layer.mark);
    // Skip rect layers, look at line/point/area layers
    if (layerMark === 'rect') {
      return false;
    }
    return layer.encoding?.x?.type === 'temporal';
  });

  spec.layer.forEach((layer, index) => {
    const mark = getMarkType(layer.mark);
    const encoding = layer.encoding || {};

    // Rect marks with x and x2 become color fill bars (vertical regions)
    if (mark === 'rect' && encoding.x && encoding.x2) {
      const legend = `region-${index}`;
      const color =
        typeof layer.mark === 'object' && layer.mark.color
          ? layer.mark.color
          : getVegaColorFromMap(legend, colorMap, undefined, undefined, isDarkTheme);

      // Extract start and end x values
      const rawStartX = encoding.x.datum || encoding.x.value;
      const rawEndX = encoding.x2.datum || encoding.x2.value;

      if (rawStartX !== undefined && rawEndX !== undefined) {
        // Convert to Date if x-axis is temporal and values are date-like strings
        let startX: number | Date = rawStartX as number | Date;
        let endX: number | Date = rawEndX as number | Date;

        if (isXTemporal) {
          const parsedStart = new Date(rawStartX as string | number);
          const parsedEnd = new Date(rawEndX as string | number);
          if (!isNaN(parsedStart.getTime())) {
            startX = parsedStart;
          }
          if (!isNaN(parsedEnd.getTime())) {
            endX = parsedEnd;
          }
        }

        colorFillBars.push({
          legend,
          color,
          data: [{ startX, endX }],
          applyPattern: false,
        });
      }
    }
  });

  return colorFillBars;
}

/**
 * Extracts tick configuration from axis properties
 */
function extractTickConfig(spec: VegaLiteSpec): {
  tickValues?: (number | Date | string)[];
  xAxisTickCount?: number;
  yAxisTickCount?: number;
} {
  const config: {
    tickValues?: (number | Date | string)[];
    xAxisTickCount?: number;
    yAxisTickCount?: number;
  } = {};

  const encoding = spec.encoding || {};

  if (encoding.x?.axis) {
    if (encoding.x.axis.values) {
      config.tickValues = encoding.x.axis.values as (number | string)[];
    }
    if (encoding.x.axis.tickCount) {
      config.xAxisTickCount = encoding.x.axis.tickCount;
    }
  }

  if (encoding.y?.axis) {
    if (encoding.y.axis.tickCount) {
      config.yAxisTickCount = encoding.y.axis.tickCount;
    }
  }

  return config;
}

/**
 * Validates that data array is not empty and contains valid values for the specified field
 * @param data - Array of data objects
 * @param field - Field name to validate
 * @param chartType - Chart type for error message context
 * @throws Error if data is empty or field has no valid values
 */
function validateDataArray(data: Array<Record<string, unknown>>, field: string, chartType: string): void {
  if (!data || data.length === 0) {
    throw new Error(`VegaLiteSchemaAdapter: Empty data array for ${chartType}`);
  }

  const hasValidValues = data.some(row => row[field] !== undefined && row[field] !== null);
  if (!hasValidValues) {
    throw new Error(`VegaLiteSchemaAdapter: No valid values found for field '${field}' in ${chartType}`);
  }
}

/**
 * Validates that nested arrays are not present in the data field (unsupported)
 * @param data - Array of data objects
 * @param field - Field name to validate
 * @throws Error if nested arrays are detected
 */
function validateNoNestedArrays(data: Array<Record<string, unknown>>, field: string): void {
  const hasNestedArrays = data.some(row => Array.isArray(row[field]));
  if (hasNestedArrays) {
    throw new Error(
      `VegaLiteSchemaAdapter: Nested arrays not supported for field '${field}'. ` + `Use flat data structures only.`,
    );
  }
}

/**
 * Validates data type compatibility with encoding type
 * @param data - Array of data objects
 * @param field - Field name to validate
 * @param expectedType - Expected Vega-Lite type (quantitative, temporal, nominal, ordinal)
 * @throws Error if data type doesn't match encoding type
 */
/**
 * Validates and potentially auto-corrects encoding types based on actual data
 * Returns the corrected type if auto-correction was applied
 *
 * @param data - Array of data values
 * @param field - Field name to validate
 * @param expectedType - Expected Vega-Lite type from schema
 * @param encoding - Encoding object to potentially modify
 * @param channelName - Name of encoding channel (x, y, etc.) for auto-correction
 * @returns Corrected type if auto-correction was applied, otherwise undefined
 */
function validateEncodingType(
  data: Array<Record<string, unknown>>,
  field: string,
  expectedType: VegaLiteType | undefined,
  encoding?: VegaLiteEncoding,
  channelName?: 'x' | 'y',
): VegaLiteType | undefined {
  if (!expectedType || expectedType === 'nominal' || expectedType === 'ordinal' || expectedType === 'geojson') {
    return; // Nominal, ordinal, and geojson accept any type
  }

  // Find first non-null value to check type
  const sampleValue = data.map(row => row[field]).find(v => v !== null && v !== undefined);

  if (!sampleValue) {
    return; // No values to validate
  }

  if (expectedType === 'quantitative') {
    if (typeof sampleValue !== 'number' && !isFinite(Number(sampleValue))) {
      // Type mismatch: quantitative declared but data is not numeric
      const actualType = typeof sampleValue;

      if (actualType === 'string') {
        // Auto-correct: treat as nominal for categorical string data
        // This matches Plotly behavior - render as categorical chart

        // Modify encoding to use nominal type
        if (encoding && channelName && encoding[channelName]) {
          encoding[channelName]!.type = 'nominal';
        }

        return 'nominal';
      }

      // For non-string types, still throw error (truly invalid)
      throw new Error(
        `VegaLiteSchemaAdapter: Field '${field}' marked as quantitative but contains non-numeric values (${actualType}).`,
      );
    }
  } else if (expectedType === 'temporal') {
    const isValidDate =
      sampleValue instanceof Date || (typeof sampleValue === 'string' && !isNaN(Date.parse(sampleValue)));
    if (!isValidDate) {
      let suggestion = '';
      if (typeof sampleValue === 'number') {
        suggestion = ' The data contains numbers. Change the type to "quantitative" instead.';
      } else if (typeof sampleValue === 'string') {
        suggestion = ` The data contains strings that are not valid dates (e.g., "${sampleValue}"). Ensure dates are in ISO format (YYYY-MM-DD) or valid date strings.`;
      }

      throw new Error(
        `VegaLiteSchemaAdapter: Field '${field}' marked as temporal but contains invalid date values.${suggestion}`,
      );
    }
  }

  return undefined;
}

/**
 * Validates X and Y encodings for charts requiring both axes
 * Performs comprehensive validation including data array, nested arrays, and encoding types
 * Can auto-correct type mismatches (e.g., quantitative with string data → nominal)
 *
 * @param data - Array of data objects
 * @param xField - X field name
 * @param yField - Y field name
 * @param xType - Expected X encoding type
 * @param yType - Expected Y encoding type
 * @param chartType - Chart type for error message context
 * @param encoding - Encoding object (optional, for auto-correction)
 * @throws Error if validation fails
 */
function validateXYEncodings(
  data: Array<Record<string, unknown>>,
  xField: string,
  yField: string,
  xType: VegaLiteType | undefined,
  yType: VegaLiteType | undefined,
  chartType: string,
  encoding?: VegaLiteEncoding,
): void {
  validateDataArray(data, xField, chartType);
  validateDataArray(data, yField, chartType);
  validateNoNestedArrays(data, xField);
  validateNoNestedArrays(data, yField);

  // Validate types with auto-correction support
  validateEncodingType(data, xField, xType, encoding, 'x');
  validateEncodingType(data, yField, yType, encoding, 'y');
}

/**
 * Extracts Y-axis scale type from encoding
 * Returns 'log' if logarithmic scale is specified, undefined otherwise
 */
function extractYAxisType(encoding: VegaLiteEncoding): 'log' | undefined {
  const yScale = encoding?.y?.scale;
  return yScale?.type === 'log' ? 'log' : undefined;
}

/**
 * Extracts y-axis min/max considering both scale.domain and scale.zero.
 * When scale.zero is false and no explicit domain, yMinValue is computed from data.
 */
function extractYMinMax(
  encoding: VegaLiteEncoding,
  dataValues: Array<Record<string, unknown>>,
): { yMinValue?: number; yMaxValue?: number } {
  const yScale = encoding?.y?.scale;
  const domain = yScale?.domain;

  // Explicit domain takes priority
  if (Array.isArray(domain)) {
    return {
      yMinValue: domain[0] as number,
      yMaxValue: domain[1] as number,
    };
  }

  // When zero is explicitly false, compute min from data so y-axis doesn't start at 0
  if (yScale?.zero === false) {
    const yField = encoding?.y?.field;
    if (yField) {
      const yValues = dataValues.map(row => Number(row[yField])).filter(v => !isNaN(v));
      if (yValues.length > 0) {
        const dataMin = d3Min(yValues) ?? 0;
        const dataMax = d3Max(yValues) ?? 0;
        const padding = (dataMax - dataMin) * 0.05;
        return { yMinValue: dataMin - padding };
      }
    }
  }

  return {};
}

/**
 * Creates a value formatter from a d3-format specifier string.
 * Returns undefined if no format is specified or if the format is invalid.
 */
function createValueFormatter(formatSpec: string | undefined): ((value: number) => string) | undefined {
  if (!formatSpec) {
    return undefined;
  }
  try {
    const formatter = d3Format(formatSpec);
    return formatter;
  } catch {
    return undefined;
  }
}

/**
 * Converts Vega-Lite sort specification to Fluent Charts AxisCategoryOrder
 * Supports: 'ascending', 'descending', null, array, or object with op/order
 * @param sort - Vega-Lite sort specification
 * @returns AxisCategoryOrder compatible value
 */
function convertVegaSortToAxisCategoryOrder(sort: VegaLiteSort): AxisCategoryOrder | undefined {
  if (!sort) {
    return undefined;
  }

  // Handle string sorts: 'ascending' | 'descending'
  if (typeof sort === 'string') {
    if (sort === 'ascending') {
      return 'category ascending';
    }
    if (sort === 'descending') {
      return 'category descending';
    }
    return undefined;
  }

  // Handle array sort (explicit ordering)
  if (Array.isArray(sort)) {
    return sort as string[];
  }

  // Handle object sort with op and order
  if (typeof sort === 'object' && sort.op && sort.order) {
    const op = sort.op === 'average' ? 'mean' : sort.op; // Map 'average' to 'mean'
    const order = sort.order === 'ascending' ? 'ascending' : 'descending';
    return `${op} ${order}` as AxisCategoryOrder;
  }

  return undefined;
}

/**
 * Extracts axis category ordering from Vega-Lite encoding
 * Returns props for xAxisCategoryOrder and yAxisCategoryOrder
 */
function extractAxisCategoryOrderProps(encoding: VegaLiteEncoding): {
  xAxisCategoryOrder?: AxisCategoryOrder;
  yAxisCategoryOrder?: AxisCategoryOrder;
} {
  const result: {
    xAxisCategoryOrder?: AxisCategoryOrder;
    yAxisCategoryOrder?: AxisCategoryOrder;
  } = {};

  if (encoding?.x?.sort) {
    const xOrder = convertVegaSortToAxisCategoryOrder(encoding.x.sort);
    if (xOrder) {
      result.xAxisCategoryOrder = xOrder;
    }
  }

  if (encoding?.y?.sort) {
    const yOrder = convertVegaSortToAxisCategoryOrder(encoding.y.sort);
    if (yOrder) {
      result.yAxisCategoryOrder = yOrder;
    }
  }

  return result;
}

/**
 * Initializes the transformation context by normalizing spec and extracting common data
 * This reduces boilerplate across all transformer functions
 *
 * @param spec - Vega-Lite specification
 * @returns Normalized context with unit specs, data values, encoding, and mark properties
 */
function initializeTransformContext(spec: VegaLiteSpec) {
  if (!preparedSpecs.has(spec)) {
    spec = prepareAdapterSpec(spec);
  }
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};

  const markProps = getMarkProperties(primarySpec.mark);

  return {
    unitSpecs,
    primarySpec,
    dataValues,
    encoding,
    markProps,
  };
}

/**
 * Extracts common encoding fields and aggregates from Vega-Lite encoding
 *
 * @param encoding - Vega-Lite encoding specification
 * @returns Object containing extracted field names and aggregates
 */
function extractEncodingFields(encoding: VegaLiteEncoding) {
  return {
    xField: encoding.x?.field,
    yField: encoding.y?.field,
    x2Field: encoding.x2?.field,
    colorField: encoding.color?.field,
    sizeField: encoding.size?.field,
    thetaField: encoding.theta?.field,
    radiusField: encoding.radius?.field,
    xAggregate: encoding.x?.aggregate,
    yAggregate: encoding.y?.aggregate,
  };
}

/**
 * Computes aggregate values for bar charts
 * Supports count, sum, mean, min, max aggregations
 *
 * @param data - Array of data values
 * @param groupField - Field to group by (x-axis field)
 * @param valueField - Field to aggregate (y-axis field, optional for count)
 * @param aggregate - Aggregate function (count, sum, mean, min, max)
 * @returns Array of {category, value} objects
 */
function computeAggregateData(
  data: Array<Record<string, unknown>>,
  groupField: string,
  valueField: string | undefined,
  aggregate: string,
): Array<{ category: string; value: number }> {
  // Group data by category
  const groups = new Map<string, number[]>();

  data.forEach(row => {
    const category = String(row[groupField]);

    if (aggregate === 'count') {
      // For count, just track the count
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(1);
    } else if (valueField && row[valueField] !== undefined && row[valueField] !== null) {
      // For other aggregates, collect values
      const value = Number(row[valueField]);
      if (!isNaN(value)) {
        if (!groups.has(category)) {
          groups.set(category, []);
        }
        groups.get(category)!.push(value);
      }
    }
  });

  // Compute aggregate for each group
  const result: Array<{ category: string; value: number }> = [];

  groups.forEach((values, category) => {
    let aggregatedValue: number;

    switch (aggregate) {
      case 'count':
        aggregatedValue = values.length;
        break;
      case 'sum':
        aggregatedValue = values.reduce((a, b) => a + b, 0);
        break;
      case 'mean':
      case 'average':
        aggregatedValue = values.reduce((a, b) => a + b, 0) / values.length;
        break;
      case 'min':
        aggregatedValue = d3Min(values) ?? 0;
        break;
      case 'max':
        aggregatedValue = d3Max(values) ?? 0;
        break;
      default:
        aggregatedValue = values.length; // Default to count
    }

    result.push({ category, value: aggregatedValue });
  });

  return result;
}

/**
 * Counts rows per x-category, optionally grouped by a secondary (color) field.
 * Returns a Map<xKey, Map<legend, count>>.
 */
function countByCategory(
  dataValues: Array<Record<string, unknown>>,
  xField: string,
  colorField: string | undefined,
  defaultLegend: string,
): Map<string, Map<string, number>> {
  const countMap = new Map<string, Map<string, number>>();
  dataValues.forEach(row => {
    const xValue = row[xField];
    if (xValue === undefined) {
      return;
    }
    const xKey = String(xValue);
    const legend = colorField && row[colorField] !== undefined ? String(row[colorField]) : defaultLegend;
    if (!countMap.has(xKey)) {
      countMap.set(xKey, new Map());
    }
    const legendMap = countMap.get(xKey)!;
    legendMap.set(legend, (legendMap.get(legend) || 0) + 1);
  });
  return countMap;
}

/**
 * Extracts color configuration from Vega-Lite encoding
 *
 * @param encoding - Vega-Lite encoding specification
 * @returns Color scheme and range configuration
 */
function extractColorConfig(encoding: VegaLiteEncoding) {
  return {
    colorScheme: encoding.color?.scale?.scheme,
    colorRange: encoding.color?.scale?.range as string[] | undefined,
  };
}

/**
 * Groups data rows into series based on color encoding field
 * Returns a map of series name to data points and ordinal mapping for categorical x-axis
 */
function groupDataBySeries(
  dataValues: Array<Record<string, unknown>>,
  xField: string | undefined,
  yField: string | undefined,
  colorField: string | undefined,
  isXTemporal: boolean,
  isYTemporal: boolean,
  xType?: VegaLiteType,
  sizeField?: string | undefined,
  yType?: VegaLiteType,
  xDomain?: string[],
  yDomain?: string[],
  tooltipSpec?: VegaLiteSpec,
): {
  seriesMap: Map<string, LineChartDataPoint[]>;
  ordinalMapping?: Map<string, number>;
  ordinalLabels?: string[];
  yOrdinalLabels?: string[];
} {
  const seriesMap = new Map<string, LineChartDataPoint[]>();

  if (!xField || !yField) {
    return { seriesMap };
  }

  // Check if x-axis is ordinal/nominal (categorical)
  const isXOrdinal = xType === 'ordinal' || xType === 'nominal';
  const ordinalMapping = isXOrdinal ? new Map<string, number>() : undefined;
  const ordinalLabels: string[] = [];

  // Check if y-axis is ordinal/nominal (categorical)
  const isYOrdinal = yType === 'ordinal' || yType === 'nominal';
  const yOrdinalMapping = isYOrdinal ? new Map<string, number>() : undefined;
  const yOrdinalLabels: string[] = [];
  xDomain?.forEach(label => {
    ordinalMapping?.set(label, ordinalLabels.length);
    ordinalLabels.push(label);
  });
  yDomain?.forEach(label => {
    yOrdinalMapping?.set(label, yOrdinalLabels.length);
    yOrdinalLabels.push(label);
  });

  dataValues.forEach(row => {
    const xValue = parseValue(row[xField], isXTemporal);
    const yValue = parseValue(row[yField], isYTemporal);

    // Skip invalid values using chart-utilities validation
    if (isInvalidValue(xValue) || isInvalidValue(yValue)) {
      return;
    }

    // Skip if x or y is empty string (from null/undefined) or y is not a valid number/string
    if (xValue === '' || yValue === '' || (typeof yValue !== 'number' && typeof yValue !== 'string')) {
      return;
    }

    const seriesName = colorField && row[colorField] !== undefined ? String(row[colorField]) : 'default';

    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }

    // Handle x-value based on type
    let numericX: number | Date;
    if (isXOrdinal) {
      const label = String(xValue);
      if (xDomain && !ordinalMapping!.has(label)) {
        return;
      }
      // For ordinal data, map each unique string to a sequential index
      if (!ordinalMapping!.has(label)) {
        ordinalMapping!.set(label, ordinalMapping!.size);
        ordinalLabels.push(label);
      }
      numericX = ordinalMapping!.get(label)!;
    } else if (typeof xValue === 'string') {
      // For non-ordinal strings, try to parse as float (fallback to 0)
      const parsed = parseFloat(xValue);
      if (isNaN(parsed)) {
        return;
      }
      numericX = parsed;
    } else {
      numericX = xValue;
    }

    const markerSize = sizeField && row[sizeField] !== undefined ? Number(row[sizeField]) : undefined;

    // Handle y-value: numeric or ordinal mapping
    let numericY: number;
    if (isYOrdinal) {
      const label = String(yValue);
      if (yDomain && !yOrdinalMapping!.has(label)) {
        return;
      }
      if (!yOrdinalMapping!.has(label)) {
        yOrdinalMapping!.set(label, yOrdinalMapping!.size);
        yOrdinalLabels.push(label);
      }
      numericY = yOrdinalMapping!.get(label)!;
    } else {
      numericY = typeof yValue === 'number' ? yValue : 0;
    }

    const point: LineChartDataPoint = {
      x: numericX,
      y: numericY,
      ...(markerSize !== undefined && !isNaN(markerSize) && { markerSize }),
    };
    if (tooltipSpec) {
      nativeTooltips.set(point, { spec: tooltipSpec, row });
    }
    seriesMap.get(seriesName)!.push(point);
  });

  return {
    seriesMap,
    ordinalMapping,
    ordinalLabels: ordinalLabels.length > 0 ? ordinalLabels : undefined,
    yOrdinalLabels: yOrdinalLabels.length > 0 ? yOrdinalLabels : undefined,
  };
}

/**
 * Finds the primary data layer from unit specs for line/area charts
 * Skips rect layers (used for color fill bars) and finds the actual line/point/area layer
 *
 * @param unitSpecs - Array of normalized unit specs
 * @returns The primary spec containing the actual chart data, or undefined if not found
 */
function findPrimaryLineSpec(unitSpecs: VegaLiteUnitSpec[]): VegaLiteUnitSpec | undefined {
  // First, try to find a line, point, or area layer
  const lineSpec = unitSpecs.find(spec => {
    const markType = getMarkType(spec.mark);
    return markType === 'line' || markType === 'area';
  });

  if (lineSpec) {
    return lineSpec;
  }
  const pointSpec = unitSpecs.find(spec => getMarkType(spec.mark) === 'point');
  if (pointSpec) {
    return pointSpec;
  }

  // If no line/point/area layer, find first layer with actual field encodings (not just datum)
  const dataSpec = unitSpecs.find(spec => {
    const encoding = spec.encoding || {};
    return encoding.x?.field || encoding.y?.field;
  });

  return dataSpec || unitSpecs[0];
}

/**
 * Transforms Vega-Lite specification to Fluent LineChart props
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns LineChartProps for rendering with Fluent LineChart component
 */

/**
 * Auto-corrects encoding types in a Vega-Lite spec based on actual data values.
 * Call this before chart type detection so routing decisions use corrected types.
 *
 * Corrections applied:
 * - quantitative + string data → nominal (render as categorical)
 *
 * This mutates the spec encoding in place.
 */
export function autoCorrectEncodingTypes(spec: VegaLiteSpec): void {
  const unitSpec = spec.layer ? spec.layer[0] : spec;
  if (!unitSpec) {
    return;
  }

  const encoding = unitSpec.encoding;
  const data = extractDataValues(unitSpec.data ?? spec.data);

  if (!encoding || data.length === 0) {
    return;
  }

  // Check x encoding
  if (encoding.x?.field) {
    const sample = data.map(row => row[encoding.x!.field!]).find(v => v !== null && v !== undefined);
    if (sample !== undefined) {
      if (encoding.x.type === 'quantitative') {
        if (typeof sample === 'string' && !isFinite(Number(sample))) {
          encoding.x.type = 'nominal';
        } else if (typeof sample === 'object') {
          encoding.x.type = 'nominal';
        }
      }
    }
  }

  // Check y encoding
  if (encoding.y?.field) {
    const sample = data.map(row => row[encoding.y!.field!]).find(v => v !== null && v !== undefined);
    if (sample !== undefined) {
      if (encoding.y.type === 'quantitative') {
        if (typeof sample === 'string' && !isFinite(Number(sample))) {
          encoding.y.type = 'nominal';
        } else if (
          typeof sample === 'object' &&
          sample !== null &&
          !Array.isArray(sample) &&
          !(sample instanceof Date)
        ) {
          // Try to extract a numeric value from the object
          const numericKeys = Object.keys(sample as Record<string, unknown>).filter(
            k => typeof (sample as Record<string, unknown>)[k] === 'number',
          );
          if (numericKeys.length === 1) {
            // Object has exactly one numeric property - use it as the value
            const numericKey = numericKeys[0];
            const yField = encoding.y.field!;
            data.forEach(row => {
              const obj = row[yField];
              if (typeof obj === 'object' && obj !== null) {
                row[yField] = (obj as Record<string, unknown>)[numericKey];
              }
            });
            // Keep type as quantitative since we extracted numeric values
          } else {
            encoding.y.type = 'nominal';
          }
        } else if (typeof sample === 'object') {
          encoding.y.type = 'nominal';
        }
      }
    }
  }
}

export type ChartTypeResult = {
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
    | 'histogram'
    | 'polar';
  mark: string;
};

/**
 * Determines the chart type based on Vega-Lite spec
 */
export function getChartType(spec: VegaLiteSpec): ChartTypeResult {
  spec = prepareAdapterSpec(spec);
  // Auto-correct encoding types based on actual data BEFORE chart type detection
  autoCorrectEncodingTypes(spec);

  // Handle layered specs - check if it's a bar+line combo for stacked bar with lines
  if (spec.layer && spec.layer.length > 1) {
    const marks = spec.layer.map((layer: VegaLiteUnitSpec) => getMarkType(layer.mark));
    const hasBar = marks.includes('bar');
    const hasLine = marks.includes('line') || marks.includes('point');

    // Bar + line combo should use stacked bar chart (which supports line overlays)
    if (hasBar && hasLine) {
      const barLayer = spec.layer.find((layer: VegaLiteUnitSpec) => getMarkType(layer.mark) === 'bar');

      if (barLayer?.encoding?.color?.field) {
        return { type: 'stacked-bar', mark: 'bar' };
      }
      return { type: 'stacked-bar', mark: 'bar' };
    }
  }

  // Handle layered specs - use first layer's mark for other cases
  const mark = spec.layer ? spec.layer[0]?.mark : spec.mark;
  const markType = getMarkType(mark);

  const encoding = spec.layer ? spec.layer[0]?.encoding : spec.encoding;
  const hasColorEncoding = !!encoding?.color?.field;

  // Polar charts with arc marks: theta AND radius encodings
  if (markType === 'arc' && encoding?.theta && encoding?.radius) {
    return { type: 'polar', mark: markType };
  }

  // Arc marks for pie/donut charts (theta only, no radius)
  if (markType === 'arc' && encoding?.theta) {
    return { type: 'donut', mark: markType };
  }

  // Polar charts: non-arc marks with theta and radius encodings
  if (encoding?.theta && encoding?.radius) {
    return { type: 'polar', mark: markType! };
  }

  // Rect marks for heatmaps (quantitative or nominal color)
  if (markType === 'rect' && encoding?.x?.field && encoding?.y?.field && encoding?.color?.field) {
    return { type: 'heatmap', mark: markType };
  }

  // Bar charts
  if (markType === 'bar') {
    const bin = ownValue(encoding?.x, 'bin');
    // 'binned' declares existing interval endpoints; it must never trigger rebinning.
    if (bin === true || isRecord(bin)) {
      return { type: 'histogram', mark: markType };
    }

    const isXNominal = encoding?.x?.type === 'nominal' || encoding?.x?.type === 'ordinal';
    const isYNominal = encoding?.y?.type === 'nominal' || encoding?.y?.type === 'ordinal';

    if (isYNominal && !isXNominal) {
      return { type: 'horizontal-bar', mark: markType };
    }

    if (hasColorEncoding) {
      const hasXOffset = !!encoding?.xOffset;
      if (hasXOffset) {
        return { type: 'grouped-bar', mark: markType };
      }
      return { type: 'stacked-bar', mark: markType };
    }

    const xField = encoding?.x?.field;
    const dataValues = spec.data?.values;
    if (xField && Array.isArray(dataValues) && dataValues.length > 0) {
      const xValues = dataValues.map((row: Record<string, unknown>) => row[xField]);
      const uniqueXValues = new Set(xValues);
      if (uniqueXValues.size < xValues.length) {
        return { type: 'stacked-bar', mark: markType };
      }
    }

    return { type: 'bar', mark: markType };
  }

  if (markType === 'area') {
    return { type: 'area', mark: markType };
  }

  if (markType === 'point' || markType === 'circle' || markType === 'square' || markType === 'tick') {
    return { type: 'scatter', mark: markType };
  }

  // Trail marks rendered as line charts (size encoding as markerSize)
  if (markType === 'trail') {
    return { type: 'line', mark: 'line' };
  }

  // Error bar/band marks rendered as line charts
  if (markType === 'errorbar' || markType === 'errorband') {
    return { type: 'line', mark: 'line' };
  }

  return { type: 'line', mark: markType || 'line' };
}

function renderLineChartProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): LineChartProps {
  // Initialize transformation context, but find the primary line/point layer for layered specs
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  // For layered specs, find the actual line/point layer (not rect layers for color fill bars)
  const primarySpec = findPrimaryLineSpec(unitSpecs);
  if (!primarySpec) {
    throw new Error('VegaLiteSchemaAdapter: No valid line/point layer found in specification');
  }

  // Check if there's a point layer in addition to line layer (for line+point combo charts)
  const hasPointLayer = unitSpecs.some(unitSpec => getMarkType(unitSpec.mark) === 'point');
  const hasLineLayer = unitSpecs.some(unitSpec => getMarkType(unitSpec.mark) === 'line');
  const shouldShowPoints = hasPointLayer && hasLineLayer;

  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);
  const lineUnits = unitSpecs.filter(unit => getMarkType(unit.mark) === 'line');
  const tooltipSpec = tooltipSpecs.get(spec) ?? spec;
  const primaryTooltip = normalizeSpec(tooltipSpec)[unitSpecs.indexOf(primarySpec)];
  // Every line unit keeps its own transforms/fields. A point companion only
  // enables markers; it must not duplicate the matching line's tuples.
  if (lineUnits.length > 1) {
    for (const channel of ['x', 'y'] as const) {
      const definition = encoding[channel];
      if (definition?.type !== 'nominal' && definition?.type !== 'ordinal') {
        continue;
      }
      const domain = Array.isArray(definition.scale?.domain)
        ? categoricalDomain(definition)
        : [
            ...new Set(
              lineUnits.flatMap(unit =>
                extractDataValues(unit.data).map(row =>
                  String(readVegaField(row, unit.encoding?.[channel]?.field ?? '')),
                ),
              ),
            ),
          ];
      lineUnits.forEach(unit => {
        const field = unit.encoding?.[channel];
        if (field && !Array.isArray(field.scale?.domain)) {
          field.scale = { ...field.scale, domain };
        }
      });
    }
  }

  // Extract field names
  const { xField, yField, colorField } = extractEncodingFields(encoding);

  // Check for size encoding from any layer (e.g., point layer with size in line+point combo)
  let sizeField: string | undefined;
  if (unitSpecs.length > 1) {
    for (const unitSpec of unitSpecs) {
      const unitEncoding = unitSpec.encoding || {};
      if (unitEncoding.size?.field) {
        sizeField = unitEncoding.size.field;
        break;
      }
    }
  } else {
    sizeField = encoding.size?.field;
  }

  // Validate data and encodings
  if (!xField || !yField) {
    throw new Error('VegaLiteSchemaAdapter: Line chart requires both x and y encodings with field names');
  }

  validateXYEncodings(dataValues, xField, yField, encoding.x?.type, encoding.y?.type, 'LineChart', encoding);

  const isXTemporal = encoding.x?.type === 'temporal';
  const isYTemporal = encoding.y?.type === 'temporal';

  // Group data into series
  const { seriesMap, ordinalLabels, yOrdinalLabels } = groupDataBySeries(
    dataValues,
    xField,
    yField,
    colorField,
    isXTemporal,
    isYTemporal,
    encoding.x?.type,
    sizeField,
    encoding.y?.type,
    Array.isArray(encoding.x?.scale?.domain) && (encoding.x?.type === 'nominal' || encoding.x?.type === 'ordinal')
      ? categoricalDomain(encoding.x)
      : undefined,
    Array.isArray(encoding.y?.scale?.domain) && (encoding.y?.type === 'nominal' || encoding.y?.type === 'ordinal')
      ? categoricalDomain(encoding.y)
      : undefined,
    { ...tooltipSpec, ...primaryTooltip },
  );

  // Extract color configuration
  const { colorScheme, colorRange } = extractColorConfig(encoding);

  // Convert series map to LineChartPoints array
  const lineChartData: LineChartPoints[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  seriesMap.forEach((dataPoints, seriesName) => {
    if (!colorIndex.has(seriesName)) {
      colorIndex.set(seriesName, currentColorIndex++);
    }
    const color = resolveColor(
      seriesName,
      colorIndex.get(seriesName)!,
      undefined,
      markProps.color,
      colorMap,
      colorScheme,
      colorRange,
      isDarkTheme,
    );

    const curveOption = mapInterpolateToCurve(markProps.interpolate);

    // Build line options with curve, strokeDash, and strokeWidth
    const lineOptions: Partial<LineChartLineOptions> = {};
    if (curveOption) {
      lineOptions.curve = curveOption;
    }
    if (markProps.strokeDash) {
      lineOptions.strokeDasharray = markProps.strokeDash.join(' ');
    }
    if (markProps.strokeWidth) {
      lineOptions.strokeWidth = markProps.strokeWidth;
    }

    lineChartData.push({
      legend: seriesName,
      data: dataPoints,
      color,
      hideNonActiveDots: !shouldShowPoints,
      ...(Object.keys(lineOptions).length > 0 && { lineOptions }),
    });
  });

  if (lineUnits.length > 1) {
    lineChartData.forEach(series => {
      if (!encoding.color?.field) {
        series.legend = 'Line 1';
        series.color = resolveColor(
          series.legend,
          0,
          encoding.color?.value as string | undefined,
          markProps.color,
          colorMap,
          colorScheme,
          colorRange,
          isDarkTheme,
        );
      }
    });
    lineUnits
      .filter(unit => unit !== primarySpec)
      .forEach((unit, index) => {
        const input = { ...spec, ...unit, layer: undefined } as VegaLiteSpec;
        const unitTooltip = normalizeSpec(tooltipSpec)[unitSpecs.indexOf(unit)];
        tooltipSpecs.set(input, { ...tooltipSpec, ...unitTooltip, layer: undefined } as VegaLiteSpec);
        const extra = renderLineChartProps(input, colorMap, isDarkTheme).data?.lineChartData ?? [];
        extra.forEach(series => {
          if (!unit.encoding?.color?.field) {
            series.legend = `Line ${index + 2}`;
            const mark = getMarkProperties(unit.mark);
            const color = extractColorConfig(unit.encoding ?? {});
            series.color = resolveColor(
              series.legend,
              index + 1,
              unit.encoding?.color?.value as string | undefined,
              mark.color,
              colorMap,
              color.colorScheme,
              color.colorRange,
              isDarkTheme,
            );
          }
          series.hideNonActiveDots = !shouldShowPoints;
        });
        lineChartData.push(...extra);
      });
  }

  // Extract chart title
  const chartTitle = typeof spec.title === 'string' ? spec.title : spec.title?.text;

  // Extract axis titles and formats
  const xAxisTitle = encoding.x?.title ?? encoding.x?.axis?.title ?? undefined;
  const yAxisTitle = encoding.y?.title ?? encoding.y?.axis?.title ?? undefined;
  const tickFormat = encoding.x?.axis?.format;
  const yAxisTickFormat = encoding.y?.axis?.format;

  // Extract tick values and counts
  // Use ordinalLabels for ordinal x-axis, otherwise use explicit values from spec
  const tickValues = ordinalLabels || encoding.x?.axis?.values;
  const yAxisTickCount = encoding.y?.axis?.tickCount;

  // Extract domain/range for min/max values
  const { yMinValue, yMaxValue } = extractYMinMax(encoding, dataValues);

  // Extract annotations and color fill bars from layers
  const annotations = extractAnnotations(spec);
  const colorFillBars = extractColorFillBars(spec, colorMap, isDarkTheme);

  // Convert rule marks in layered specs to reference line series
  // Each horizontal rule becomes a 2-point line at constant y spanning the data x-range
  if (spec.layer && Array.isArray(spec.layer) && lineChartData.length > 0) {
    const allXValues = lineChartData.flatMap(series => series.data.map(p => p.x));
    const xMin = allXValues.length > 0 ? allXValues.reduce((a, b) => (a < b ? a : b)) : 0;
    const xMax = allXValues.length > 0 ? allXValues.reduce((a, b) => (a > b ? a : b)) : 0;

    spec.layer.forEach((layer, layerIndex) => {
      const layerMark = getMarkType(layer.mark);
      if (layerMark !== 'rule') {
        return;
      }

      const ruleEncoding = layer.encoding || {};
      const yDatum = ruleEncoding.y?.datum ?? ruleEncoding.y?.value;
      if (yDatum === undefined) {
        return;
      }

      const ruleMarkProps = getMarkProperties(layer.mark);
      const ruleColor = ruleMarkProps.color || '#d62728';

      // Find companion text annotation for legend name
      const textLayer = spec.layer!.find(l => {
        const m = getMarkType(l.mark);
        return m === 'text' && l.encoding?.y && (l.encoding.y.datum ?? l.encoding.y.value) === yDatum;
      });
      const ruleLegend = textLayer
        ? String(textLayer.encoding?.text?.datum || textLayer.encoding?.text?.value || `y=${yDatum}`)
        : `y=${yDatum}`;

      const ruleLineOptions: Partial<LineChartLineOptions> = {};
      if (ruleMarkProps.strokeDash) {
        ruleLineOptions.strokeDasharray = ruleMarkProps.strokeDash.join(' ');
      }
      if (ruleMarkProps.strokeWidth) {
        ruleLineOptions.strokeWidth = ruleMarkProps.strokeWidth;
      }

      lineChartData.push({
        legend: ruleLegend,
        data: [
          { x: xMin as number | Date, y: yDatum as number },
          { x: xMax as number | Date, y: yDatum as number },
        ],
        color: ruleColor,
        hideNonActiveDots: true,
        ...(Object.keys(ruleLineOptions).length > 0 && { lineOptions: ruleLineOptions }),
      });
    });
  }

  // Check for log scale on Y-axis
  const yAxisType = extractYAxisType(encoding);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  // Build LineChartProps
  const chartProps: ChartProps = {
    lineChartData,
    ...(chartTitle && { chartTitle }),
  };

  return {
    data: chartProps,
    width: typeof spec.width === 'number' ? spec.width : undefined,
    height: typeof spec.height === 'number' ? spec.height : undefined,
    ...(xAxisTitle && { xAxisTitle }),
    ...(yAxisTitle && { yAxisTitle }),
    ...(tickFormat && { tickFormat }),
    ...(yAxisTickFormat && { yAxisTickFormat }),
    ...(tickValues && { tickValues }),
    ...(ordinalLabels &&
      Array.isArray(encoding.x?.scale?.domain) && { xMinValue: 0, xMaxValue: Math.max(0, ordinalLabels.length - 1) }),
    ...(yAxisTickCount && { yAxisTickCount }),
    ...(yMinValue !== undefined && { yMinValue }),
    ...(yMaxValue !== undefined && { yMaxValue }),
    ...(annotations.length > 0 && { annotations }),
    ...(colorFillBars.length > 0 && { colorFillBars }),
    ...(yAxisType && { yScaleType: yAxisType }),
    // For nominal y-axis, provide tick values and labels
    ...(yOrdinalLabels &&
      yOrdinalLabels.length > 0 && {
        yAxisTickValues: Array.from({ length: yOrdinalLabels.length }, (_, i) => i),
        yAxisTickFormat: (val: number) => yOrdinalLabels[val] ?? String(val),
        yMinValue: -0.5,
        yMaxValue: yOrdinalLabels.length - 0.5,
      }),
    ...categoryOrderProps,
    hideLegend: encoding.color?.legend?.disable ?? false,
  };
}

/**
 * Generates legend props from Vega-Lite specification
 * Used for multi-plot scenarios where legends are rendered separately
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns LegendsProps for rendering legends
 */
export function getVegaLiteLegendsProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
): LegendsProps {
  const unitSpecs = normalizeSpec(spec);
  const legends: Legend[] = [];

  if (unitSpecs.length === 0) {
    return {
      legends,
      centerLegends: true,
      enabledWrapLines: true,
      canSelectMultipleLegends: true,
    };
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const colorField = encoding.color?.field;

  if (!colorField) {
    return {
      legends,
      centerLegends: true,
      enabledWrapLines: true,
      canSelectMultipleLegends: true,
    };
  }

  // Extract unique series names
  const seriesNames = new Set<string>();
  dataValues.forEach(row => {
    if (row[colorField] !== undefined) {
      seriesNames.add(String(row[colorField]));
    }
  });

  // Generate legends
  seriesNames.forEach(seriesName => {
    const color = getVegaColorFromMap(seriesName, colorMap, undefined, undefined, isDarkTheme);
    legends.push({
      title: seriesName,
      color,
    });
  });

  return {
    legends,
    centerLegends: true,
    enabledWrapLines: true,
    canSelectMultipleLegends: true,
  };
}

/**
 * Extracts chart titles and title styles from Vega-Lite specification
 */
export function getVegaLiteTitles(spec: VegaLiteSpec): {
  chartTitle?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  titleStyles?: TitleStyles;
} {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    return {};
  }

  const primarySpec = unitSpecs[0];
  const encoding = primarySpec.encoding || {};

  // Extract chart title
  const chartTitle = typeof spec.title === 'string' ? spec.title : spec.title?.text;

  // Extract title styles if title is an object
  let titleStyles: TitleStyles | undefined;
  if (typeof spec.title === 'object' && spec.title !== null) {
    const titleObj = spec.title as VegaLiteTitleParams;

    // Build titleFont object if any font properties are present
    const titleFont: TitleStyles['titleFont'] = {};
    if (titleObj.font) {
      titleFont.family = titleObj.font;
    }
    if (titleObj.fontSize) {
      titleFont.size = titleObj.fontSize;
    }
    if (titleObj.fontWeight) {
      // Convert string weights to numbers (Font interface expects number)
      const weight = titleObj.fontWeight;
      if (typeof weight === 'string') {
        const weightMap: Record<string, number> = {
          normal: 400,
          bold: 700,
          lighter: 300,
          bolder: 600,
        };
        titleFont.weight = weightMap[weight.toLowerCase()] || 400;
      } else {
        titleFont.weight = weight;
      }
    }
    if (titleObj.color) {
      titleFont.color = titleObj.color;
    }

    // Map Vega-Lite anchor values to TitleStyles anchor values
    const anchorMap: Record<string, TitleStyles['titleXAnchor']> = {
      start: 'left',
      middle: 'center',
      end: 'right',
    };

    titleStyles = {
      ...(Object.keys(titleFont).length > 0 ? { titleFont } : {}),
      ...(titleObj.anchor && anchorMap[titleObj.anchor] ? { titleXAnchor: anchorMap[titleObj.anchor] } : {}),
      ...(titleObj.offset !== undefined || titleObj.subtitlePadding !== undefined
        ? {
            titlePad: {
              t: titleObj.offset,
              b: titleObj.subtitlePadding,
            },
          }
        : {}),
    };

    // Only include titleStyles if it has properties
    if (Object.keys(titleStyles).length === 0) {
      titleStyles = undefined;
    }
  }

  return {
    chartTitle,
    xAxisTitle: encoding.x?.title ?? encoding.x?.axis?.title ?? undefined,
    yAxisTitle: encoding.y?.title ?? encoding.y?.axis?.title ?? undefined,
    ...(titleStyles ? { titleStyles } : {}),
  };
}

/**
 * Transforms Vega-Lite specification to Fluent VerticalBarChart props
 *
 * Supports bar mark with quantitative y-axis and nominal/ordinal x-axis
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns VerticalBarChartProps for rendering
 */
function renderVerticalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
): VerticalBarChartProps {
  // Initialize transformation context
  const { dataValues, encoding, markProps } = initializeTransformContext(spec);

  // Extract field names and aggregates
  const { xField, yField, colorField, yAggregate } = extractEncodingFields(encoding);

  // Check if this is an aggregate bar chart
  // Aggregate can be: count (no field needed) or sum/mean/etc (with field)
  const isAggregate = !!yAggregate;

  if (!xField && !isAggregate) {
    throw new Error('VegaLiteSchemaAdapter: x encoding is required for bar charts');
  }

  // For aggregate charts, compute aggregated data
  let aggregatedData: Array<{ category: string; value: number }> | undefined;
  if (isAggregate && xField) {
    aggregatedData = computeAggregateData(dataValues, xField, yField, yAggregate as string);
  }

  // Validate data and encodings (skip for aggregate charts)
  const missingAggregate =
    yField &&
    aggregateFields.get(spec)?.has(yField) &&
    dataValues.every(row => row[yField] === null || row[yField] === undefined);
  if (!isAggregate && !missingAggregate && xField && yField) {
    validateXYEncodings(dataValues, xField, yField, encoding.x?.type, encoding.y?.type, 'VerticalBarChart', encoding);
  }

  // Extract color configuration
  const { colorScheme, colorRange } = extractColorConfig(encoding);
  const colorValue = encoding.color?.value as string | undefined;

  const barData: VerticalBarChartDataPoint[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  // When there's no color field, all bars share a single legend
  const useSingleLegendForAggregate = !colorField;

  if (aggregatedData) {
    // Use aggregated data
    aggregatedData.forEach(({ category, value }) => {
      const legend = useSingleLegendForAggregate ? 'Bar' : String(category);

      if (!colorIndex.has(legend)) {
        colorIndex.set(legend, currentColorIndex++);
      }

      const color = resolveColor(
        legend,
        colorIndex.get(legend)!,
        colorValue,
        markProps.color,
        colorMap,
        colorScheme,
        colorRange,
        isDarkTheme,
      );

      barData.push({
        x: category,
        y: value,
        legend,
        color,
      });
    });
  } else if (xField && yField) {
    // Check if y values are numeric; if not, fall back to count aggregation
    const firstYValue = dataValues.find(r => r[yField] !== undefined)?.[yField];
    const yIsNumeric = encoding.y?.type === 'quantitative' || typeof firstYValue === 'number';

    if (!yIsNumeric) {
      // y values are non-numeric: compute count per x category
      const counts = countByCategory(dataValues, xField, undefined, '');
      counts.forEach((legendMap, xKey) => {
        // No color grouping - each xKey gets one bar; use xKey as legend
        const totalCount = Array.from(legendMap.values()).reduce((a, b) => a + b, 0);
        const legend = xKey;
        if (!colorIndex.has(legend)) {
          colorIndex.set(legend, currentColorIndex++);
        }
        const color = resolveColor(
          legend,
          colorIndex.get(legend)!,
          colorValue,
          markProps.color,
          colorMap,
          colorScheme,
          colorRange,
          isDarkTheme,
        );
        barData.push({ x: xKey, y: totalCount, legend, color });
      });
    } else {
      // When there's no color field encoding, use a single legend name for all bars
      // This ensures: uniform bar color, single legend entry, no tooltip duplication
      const useSingleLegend = !colorField;

      // Create value formatter for bar data labels
      const yFormatter = createValueFormatter(encoding.y?.axis?.format);

      // Use raw data (normal numeric y values)
      dataValues.forEach(row => {
        const xValue = row[xField];
        const yValue = row[yField];

        // Use chart-utilities validation
        if (isInvalidValue(xValue) || isInvalidValue(yValue) || typeof yValue !== 'number') {
          return;
        }

        const legend =
          colorField && row[colorField] !== undefined
            ? String(row[colorField])
            : useSingleLegend
            ? 'Bar'
            : String(xValue);

        if (!colorIndex.has(legend)) {
          colorIndex.set(legend, currentColorIndex++);
        }

        const color = resolveColor(
          legend,
          colorIndex.get(legend)!,
          colorValue,
          markProps.color,
          colorMap,
          colorScheme,
          colorRange,
          isDarkTheme,
        );

        // For bar charts, x-axis values are treated as categories (even if numeric)
        // Convert to string to ensure consistent categorical positioning
        const xCategory = typeof xValue === 'number' ? String(xValue) : (xValue as string);

        barData.push({
          x: xCategory,
          y: yValue,
          legend,
          color,
          ...(yFormatter && { yAxisCalloutData: yFormatter(yValue), barLabel: yFormatter(yValue) }),
        });
      });
    }
  }

  const titles = getVegaLiteTitles(spec);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  // Extract tick configuration
  const tickConfig = extractTickConfig(spec);

  // Extract y-axis formatting and scale props
  const yAxisTickFormat = encoding.y?.axis?.format;
  const { yMinValue, yMaxValue } = extractYMinMax(encoding, dataValues);
  const yAxisType = extractYAxisType(encoding);

  // Compute truncation based on number of unique x-axis categories
  const uniqueXCount = new Set(barData.map(d => String(d.x))).size;
  const barTruncateChars = uniqueXCount > 20 ? 6 : uniqueXCount > 10 ? 10 : DEFAULT_TRUNCATE_CHARS;

  const result: VerticalBarChartProps = {
    data: barData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(titles.titleStyles ? titles.titleStyles : {}),
    roundCorners: true,
    wrapXAxisLables: typeof barData[0]?.x === 'string',
    hideTickOverlap: true,
    noOfCharsToTruncate: barTruncateChars,
    xAxis: { tickLayout: 'auto' },
    ...(yAxisTickFormat && { yAxisTickFormat }),
    ...(yMinValue !== undefined && { yMinValue }),
    ...(yMaxValue !== undefined && { yMaxValue }),
    ...(yAxisType && { yScaleType: yAxisType }),
    ...categoryOrderProps,
    // Hide legend for single-series bar charts (no color encoding) to avoid showing "Bar" legend
    hideLegend: !colorField ? true : encoding.color?.legend?.disable ?? false,
  };

  if (tickConfig.tickValues) {
    result.tickValues = tickConfig.tickValues as number[] | Date[];
  }

  if (tickConfig.xAxisTickCount) {
    result.xAxisTickCount = tickConfig.xAxisTickCount;
  }

  return result;
}

/**
 * Transforms Vega-Lite specification to Fluent VerticalStackedBarChart props
 *
 * Supports stacked bar charts with color encoding for stacking
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns VerticalStackedBarChartProps for rendering
 */
function renderVerticalStackedBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
): VerticalStackedBarChartProps {
  // Initialize transformation context (skip warnings as we handle layered spec differently)
  const { unitSpecs } = initializeTransformContext(spec);

  // Separate bar, line, and rule specs from layered specifications
  const barSpecs = unitSpecs.filter(s => getMarkType(s.mark) === 'bar');

  const lineSpecs = unitSpecs.filter(s => {
    const mark = getMarkType(s.mark);
    return mark === 'line' || mark === 'point';
  });

  const ruleSpecs = unitSpecs.filter(s => getMarkType(s.mark) === 'rule');

  // Use bar specs if available, otherwise fall back to first unit spec
  const primarySpec = barSpecs.length > 0 ? barSpecs[0] : unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);

  // Extract field names and aggregates
  const { xField, yField, colorField, yAggregate } = extractEncodingFields(encoding);
  const colorValue = encoding.color?.value; // Static color value

  // Support aggregate encodings (e.g., count, sum)
  const isAggregate = !!yAggregate;

  if (!xField) {
    throw new Error('VegaLiteSchemaAdapter: x encoding is required for stacked bar charts');
  }

  // For aggregate charts, compute aggregated data
  let aggregatedData: Array<{ category: string; value: number }> | undefined;
  if (isAggregate) {
    aggregatedData = computeAggregateData(dataValues, xField, yField, yAggregate as string);
  } else if (!yField) {
    throw new Error('VegaLiteSchemaAdapter: y encoding is required for stacked bar charts');
  }

  // Extract color configuration
  const { colorScheme, colorRange } = extractColorConfig(encoding);

  // Group data by x value, then by color (stack)
  // Null-prototype object so data-derived keys (e.g. "__proto__") cannot pollute Object.prototype.
  const mapXToDataPoints: { [key: string]: VerticalStackedChartProps } = Object.create(null);
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  if (aggregatedData) {
    // Use aggregated data
    aggregatedData.forEach(({ category, value }) => {
      const xKey = String(category);
      const legend = 'Bar';

      if (!mapXToDataPoints[xKey]) {
        mapXToDataPoints[xKey] = {
          xAxisPoint: category,
          chartData: [],
          lineData: [],
        };
      }

      if (!colorIndex.has(legend)) {
        colorIndex.set(legend, currentColorIndex++);
      }

      const color = resolveColor(
        legend,
        colorIndex.get(legend)!,
        colorValue as string | undefined,
        markProps.color,
        colorMap,
        colorScheme,
        colorRange,
        isDarkTheme,
      );

      mapXToDataPoints[xKey].chartData.push({
        legend,
        data: value,
        color,
      });
    });
  } else {
    // Check if y values are actually numeric; if not, fall back to count aggregation
    const firstYValue = dataValues.find(r => r[yField!] !== undefined)?.[yField!];
    const yIsNumeric = encoding.y?.type === 'quantitative' || typeof firstYValue === 'number';

    if (!yIsNumeric && yField) {
      // y values are non-numeric (e.g., strings after auto-correction from quantitative to nominal)
      // Fall back to count aggregation: count rows per x category and color
      const counts = countByCategory(dataValues, xField, colorField, 'Bar');
      counts.forEach((legendMap, xKey) => {
        mapXToDataPoints[xKey] = {
          xAxisPoint: xKey,
          chartData: [],
          lineData: [],
        };
        legendMap.forEach((count, legend) => {
          if (!colorIndex.has(legend)) {
            colorIndex.set(legend, currentColorIndex++);
          }
          const color = resolveColor(
            legend,
            colorIndex.get(legend)!,
            colorValue as string | undefined,
            markProps.color,
            colorMap,
            colorScheme,
            colorRange,
            isDarkTheme,
          );
          mapXToDataPoints[xKey].chartData.push({
            legend,
            data: count,
            color,
          });
        });
      });
    } else {
      // Process bar data (normal numeric y values)
      dataValues.forEach(row => {
        const xValue = row[xField];
        const yValue = row[yField!];
        const stackValue = colorField ? row[colorField] : 'Bar'; // Default legend if no color field

        if (isInvalidValue(xValue) || isInvalidValue(yValue) || typeof yValue !== 'number') {
          return;
        }

        const xKey = String(xValue);
        const legend = stackValue !== undefined ? String(stackValue) : 'Bar';

        if (!mapXToDataPoints[xKey]) {
          // For bar charts, x-axis values are treated as categories (even if numeric)
          const xCategory = typeof xValue === 'number' ? String(xValue) : (xValue as string);
          mapXToDataPoints[xKey] = {
            xAxisPoint: xCategory,
            chartData: [],
            lineData: [],
          };
        }

        if (!colorIndex.has(legend)) {
          colorIndex.set(legend, currentColorIndex++);
        }

        // Use static color if provided, otherwise use color scheme/scale
        const color = resolveColor(
          legend,
          colorIndex.get(legend)!,
          colorValue as string | undefined,
          markProps.color,
          colorMap,
          colorScheme,
          colorRange,
          isDarkTheme,
        );

        const stackYFormatter = createValueFormatter(encoding.y?.axis?.format);
        const point: VerticalStackedChartProps['chartData'][number] = {
          legend,
          data: yValue,
          color,
          ...(stackYFormatter && { yAxisCalloutData: stackYFormatter(yValue), barLabel: stackYFormatter(yValue) }),
        };
        nativeSourceRows.set(point, row);
        mapXToDataPoints[xKey].chartData.push(point);
      });
    }
  } // end else (non-aggregate)

  // Process line data from additional layers (if any)
  lineSpecs.forEach((lineSpec, lineIndex) => {
    const lineDataValues = extractDataValues(lineSpec.data);
    const lineEncoding = lineSpec.encoding || {};
    const lineMarkProps = getMarkProperties(lineSpec.mark);

    const lineXField = lineEncoding.x?.field;
    const lineYField = lineEncoding.y?.field;
    const lineColorField = lineEncoding.color?.field;

    if (!lineXField || !lineYField) {
      return; // Skip if required fields are missing
    }

    const lineLegendBase = lineColorField ? 'Line' : `Line ${lineIndex + 1}`;

    lineDataValues.forEach(row => {
      const xValue = row[lineXField];
      const yValue = row[lineYField];

      if (isInvalidValue(xValue) || isInvalidValue(yValue)) {
        return;
      }

      const xKey = String(xValue);
      const lineLegend =
        lineColorField && row[lineColorField] !== undefined ? String(row[lineColorField]) : lineLegendBase;

      // Ensure x-axis point exists
      if (!mapXToDataPoints[xKey]) {
        mapXToDataPoints[xKey] = {
          xAxisPoint: xValue as number | string,
          chartData: [],
          lineData: [],
        };
      }

      // Determine line color
      if (!colorIndex.has(lineLegend)) {
        colorIndex.set(lineLegend, currentColorIndex++);
      }
      let lineColor: string;
      if (lineMarkProps.color) {
        lineColor = lineMarkProps.color;
      } else {
        // Use lineLegend for consistent color assignment
        lineColor = resolveColor(
          lineLegend,
          colorIndex.get(lineLegend)!,
          undefined,
          undefined,
          colorMap,
          undefined,
          undefined,
          isDarkTheme,
        );
      }

      // Determine if this line should use secondary Y-axis
      // Check if spec has independent Y scales AND line uses different Y field than bars
      const hasIndependentYScales = spec.resolve?.scale?.y === 'independent';
      const useSecondaryYScale = hasIndependentYScales && lineYField !== yField;

      const lineData: LineDataInVerticalStackedBarChart = {
        y: yValue as number,
        color: lineColor,
        legend: lineLegend,
        legendShape: 'triangle',
        data: typeof yValue === 'number' ? yValue : undefined,
        useSecondaryYScale,
      };

      // Add line options if available
      if (lineMarkProps.strokeWidth || lineMarkProps.strokeDash) {
        lineData.lineOptions = {
          ...(lineMarkProps.strokeWidth && { strokeWidth: lineMarkProps.strokeWidth }),
          ...(lineMarkProps.strokeDash && { strokeDasharray: lineMarkProps.strokeDash.join(' ') }),
        };
      }

      mapXToDataPoints[xKey].lineData!.push(lineData);
    });
  });

  // Process rule specs as horizontal reference lines
  // Each rule with a constant y-value becomes a flat line across all x-axis points
  ruleSpecs.forEach((ruleSpec, ruleIndex) => {
    const ruleEncoding = ruleSpec.encoding || {};
    const ruleMarkProps = getMarkProperties(ruleSpec.mark);
    const yDatum = ruleEncoding.y?.datum ?? ruleEncoding.y?.value;

    if (yDatum !== undefined) {
      const ruleLegend = `Reference_${ruleIndex}`;
      const ruleColor = ruleMarkProps.color || '#d62728';

      if (!colorIndex.has(ruleLegend)) {
        colorIndex.set(ruleLegend, currentColorIndex++);
      }

      const lineOptions: Partial<LineChartLineOptions> = {};
      if (ruleMarkProps.strokeDash) {
        lineOptions.strokeDasharray = ruleMarkProps.strokeDash.join(' ');
      }
      if (ruleMarkProps.strokeWidth) {
        lineOptions.strokeWidth = ruleMarkProps.strokeWidth;
      }

      // Look for companion text annotation at the same y-value
      const textSpec = unitSpecs.find((s, i) => {
        return getMarkType(s.mark) === 'text' && s.encoding?.y && (s.encoding.y.datum ?? s.encoding.y.value) === yDatum;
      });
      const ruleText = textSpec
        ? String(textSpec.encoding?.text?.datum || textSpec.encoding?.text?.value || yDatum)
        : String(yDatum);

      // Add the constant y-value line to every x-axis point
      Object.keys(mapXToDataPoints).forEach(xKey => {
        mapXToDataPoints[xKey].lineData!.push({
          y: yDatum as number,
          legend: ruleText,
          color: ruleColor,
          ...(Object.keys(lineOptions).length > 0 && { lineOptions }),
          useSecondaryYScale: false,
        });
      });
    }
  });

  const chartData = Object.values(mapXToDataPoints);
  const titles = getVegaLiteTitles(spec);

  // Check if we have secondary Y-axis data
  const hasSecondaryYAxis = chartData.some(point => point.lineData?.some(line => line.useSecondaryYScale));

  // Extract secondary Y-axis properties from line layers
  const secondaryYAxisProps: Record<string, unknown> = {};
  if (hasSecondaryYAxis && lineSpecs.length > 0) {
    const lineSpec = lineSpecs[0];
    const lineEncoding = lineSpec.encoding || {};
    const lineYAxis = lineEncoding.y?.axis;

    if (lineYAxis?.title) {
      secondaryYAxisProps.secondaryYAxistitle = lineYAxis.title;
    }

    // Compute secondary Y scale domain from line data values
    const allLineYValues: number[] = [];
    chartData.forEach(point => {
      point.lineData?.forEach(line => {
        if (line.useSecondaryYScale && typeof line.y === 'number') {
          allLineYValues.push(line.y);
        }
      });
    });

    if (allLineYValues.length > 0) {
      // Use explicit domain from line encoding if available, otherwise compute from data
      const lineDomain = lineEncoding.y?.scale?.domain;
      const secYMin = Array.isArray(lineDomain) ? (lineDomain[0] as number) : d3Min(allLineYValues) ?? 0;
      const secYMax = Array.isArray(lineDomain) ? (lineDomain[1] as number) : d3Max(allLineYValues) ?? 0;
      secondaryYAxisProps.secondaryYScaleOptions = {
        yMinValue: secYMin,
        yMaxValue: secYMax,
      };
    }
  }

  // Check for log scale on primary Y-axis
  const yAxisType = extractYAxisType(encoding);

  // Extract y-axis formatting and domain props
  const yAxisTickFormat = encoding.y?.axis?.format;
  const { yMinValue, yMaxValue } = extractYMinMax(encoding, dataValues);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  return {
    data: chartData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(titles.titleStyles ? titles.titleStyles : {}),
    width: spec.width as number | undefined,
    height: (spec.height as number | undefined) ?? DEFAULT_CHART_HEIGHT,
    hideLegend: encoding.color?.legend?.disable ?? false,
    showYAxisLables: true,
    roundCorners: true,
    hideTickOverlap: true,
    barGapMax: 2,
    noOfCharsToTruncate: DEFAULT_TRUNCATE_CHARS,
    showYAxisLablesTooltip: true,
    wrapXAxisLables: typeof chartData[0]?.xAxisPoint === 'string',
    xAxis: { tickLayout: 'auto' },
    ...(yAxisTickFormat && { yAxisTickFormat }),
    ...(yMinValue !== undefined && { yMinValue }),
    ...(yMaxValue !== undefined && { yMaxValue }),
    ...(yAxisType && { yScaleType: yAxisType }),
    ...secondaryYAxisProps,
    ...categoryOrderProps,
  };
}

/**
 * Transforms Vega-Lite specification to Fluent GroupedVerticalBarChart props
 *
 * Supports grouped bar charts with color encoding for grouping
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns GroupedVerticalBarChartProps for rendering
 */
function renderGroupedVerticalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
): GroupedVerticalBarChartProps {
  // Initialize transformation context
  const { dataValues, encoding } = initializeTransformContext(spec);

  // Extract field names
  const { xField, yField, colorField } = extractEncodingFields(encoding);

  if (!xField || !yField || !colorField) {
    throw new Error('VegaLiteSchemaAdapter: x, y, and color encodings are required for grouped bar charts');
  }

  // Extract color configuration
  const { colorScheme, colorRange } = extractColorConfig(encoding);

  // Group data by x value (name), then by color (series)
  // Null-prototype objects so data-derived keys (e.g. "__proto__") cannot pollute Object.prototype.
  const groupedData: { [key: string]: { [legend: string]: number } } = Object.create(null);
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];
    const groupValue = row[colorField];

    if (isInvalidValue(xValue) || isInvalidValue(yValue) || typeof yValue !== 'number' || isInvalidValue(groupValue)) {
      return;
    }

    const xKey = String(xValue);
    const legend = String(groupValue);

    if (!groupedData[xKey]) {
      groupedData[xKey] = Object.create(null);
    }

    groupedData[xKey][legend] = yValue;

    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }
  });

  // Convert to GroupedVerticalBarChartData format
  const chartData = Object.keys(groupedData).map(name => {
    const series = Object.keys(groupedData[name]).map(legend => ({
      key: legend,
      data: groupedData[name][legend],
      legend,
      color: resolveColor(
        legend,
        colorIndex.get(legend)!,
        undefined,
        undefined,
        colorMap,
        colorScheme,
        colorRange,
        isDarkTheme,
      ),
    }));

    return {
      name,
      series,
    };
  });

  const titles = getVegaLiteTitles(spec);

  // Extract y-axis formatting and scale props
  const yAxisTickFormat = encoding.y?.axis?.format;
  const { yMinValue, yMaxValue } = extractYMinMax(encoding, dataValues);
  const yAxisType = extractYAxisType(encoding);

  return {
    data: chartData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(titles.titleStyles ? titles.titleStyles : {}),
    ...(yAxisTickFormat && { yAxisTickFormat }),
    ...(yMinValue !== undefined && { yMinValue }),
    ...(yMaxValue !== undefined && { yMaxValue }),
    ...(yAxisType && { yScaleType: yAxisType }),
  };
}

/**
 * Transforms Vega-Lite specification to Fluent HorizontalBarChartWithAxis props
 *
 * Supports horizontal bar charts with quantitative x-axis and nominal/ordinal y-axis
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns HorizontalBarChartWithAxisProps for rendering
 */
function renderHorizontalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: ColorMapRef,
  isDarkTheme?: boolean,
): HorizontalBarChartWithAxisProps {
  // Initialize transformation context
  const { dataValues, encoding, markProps } = initializeTransformContext(spec);

  // Extract field names and aggregates
  const { xField, yField, colorField, xAggregate, x2Field } = extractEncodingFields(encoding);

  // Check if this is an aggregate bar chart
  // Aggregate can be: count (no field needed) or sum/mean/etc (with field)
  const isAggregate = !!xAggregate;

  if (!yField && !isAggregate) {
    throw new Error('VegaLiteSchemaAdapter: y encoding is required for horizontal bar charts');
  }

  // For aggregate charts, compute aggregated data
  let aggregatedData: Array<{ category: string; value: number }> | undefined;
  if (isAggregate && yField) {
    aggregatedData = computeAggregateData(dataValues, yField, xField, xAggregate as string);
  }

  const colorValue = encoding.color?.value as string | undefined;
  const barData: HorizontalBarChartWithAxisDataPoint[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  if (aggregatedData) {
    // Use aggregated data
    aggregatedData.forEach(({ category, value }) => {
      const legend = String(category);

      if (!colorIndex.has(legend)) {
        colorIndex.set(legend, currentColorIndex++);
      }

      const color = resolveColor(
        legend,
        colorIndex.get(legend)!,
        colorValue,
        markProps.color,
        colorMap,
        undefined,
        undefined,
        isDarkTheme,
      );

      barData.push({
        x: value,
        y: category,
        legend,
        color,
      });
    });
  } else if (x2Field && xField && yField) {
    // Gantt chart: bar mark with x/x2 temporal range encoding
    const isXTemporal = encoding.x?.type === 'temporal';
    dataValues.forEach(row => {
      const startVal = row[xField];
      const endVal = row[x2Field];
      const yValue = row[yField];
      if (startVal === undefined || endVal === undefined || yValue === undefined) {
        return;
      }

      let xNumeric: number;
      if (isXTemporal) {
        const startDate = new Date(startVal as string | number);
        const endDate = new Date(endVal as string | number);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return;
        }
        xNumeric = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      } else {
        xNumeric = Number(endVal) - Number(startVal);
        if (isNaN(xNumeric)) {
          return;
        }
      }

      const legend = colorField && row[colorField] !== undefined ? String(row[colorField]) : String(yValue);
      if (!colorIndex.has(legend)) {
        colorIndex.set(legend, currentColorIndex++);
      }
      const color = resolveColor(
        legend,
        colorIndex.get(legend)!,
        colorValue,
        markProps.color,
        colorMap,
        undefined,
        undefined,
        isDarkTheme,
      );
      barData.push({ x: xNumeric, y: yValue as number | string, legend, color });
    });
  } else if (xField && yField) {
    // Use raw data
    dataValues.forEach(row => {
      const xValue = row[xField];
      const yValue = row[yField];

      if (isInvalidValue(xValue) || isInvalidValue(yValue) || typeof xValue !== 'number') {
        return;
      }

      // When no color field, use single legend to avoid tooltip duplication with y-axis labels
      const legend =
        colorField && row[colorField] !== undefined ? String(row[colorField]) : !colorField ? 'Bar' : String(yValue);

      if (!colorIndex.has(legend)) {
        colorIndex.set(legend, currentColorIndex++);
      }

      const color = resolveColor(
        legend,
        colorIndex.get(legend)!,
        colorValue,
        markProps.color,
        colorMap,
        undefined,
        undefined,
        isDarkTheme,
      );

      barData.push({
        x: xValue,
        y: yValue as number | string,
        legend,
        color,
      });
    });
  }

  const titles = getVegaLiteTitles(spec);
  const annotations = extractAnnotations(spec);
  const tickConfig = extractTickConfig(spec);

  const result: HorizontalBarChartWithAxisProps = {
    data: barData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(titles.titleStyles ? titles.titleStyles : {}),
    // Hide legend for single-series horizontal bars (no color encoding)
    hideLegend: !colorField ? true : encoding.color?.legend?.disable ?? false,
  };

  if (annotations.length > 0) {
    result.annotations = annotations;
  }

  if (tickConfig.tickValues) {
    result.tickValues = tickConfig.tickValues as number[] | string[] | Date[];
  }

  if (tickConfig.xAxisTickCount) {
    result.xAxisTickCount = tickConfig.xAxisTickCount;
  }

  if (tickConfig.yAxisTickCount) {
    result.yAxisTickCount = tickConfig.yAxisTickCount;
  }

  return result;
}

/**
 * Transforms Vega-Lite specification to Fluent AreaChart props
 *
 * Area charts use the same data structure as line charts but with filled areas.
 * Supports temporal/quantitative x-axis and quantitative y-axis with color-encoded series
 *
 * Vega-Lite Stacking Behavior:
 * - If y.stack is null or undefined with no color encoding: mode = 'tozeroy' (fill to zero baseline)
 * - If y.stack is 'zero' or color encoding exists: mode = 'tonexty' (stacked areas)
 * - Multiple series with color encoding automatically stack
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns AreaChartProps for rendering
 */
function renderAreaChartProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): AreaChartProps {
  // Area charts use the same structure as line charts in Fluent Charts
  // The only difference is the component renders with filled areas
  const lineChartProps = renderLineChartProps(spec, colorMap, isDarkTheme);

  // Determine stacking mode based on Vega-Lite spec
  const unitSpecs = normalizeSpec(spec);
  // Use findPrimaryLineSpec to skip auxiliary layers (like rect for color fill bars)
  const primarySpec = findPrimaryLineSpec(unitSpecs);
  const encoding = primarySpec?.encoding || {};

  // Check if stacking is enabled
  // In Vega-Lite, area charts stack by default when color encoding is present
  // stack can be explicitly set to null to disable stacking
  const hasColorEncoding = !!encoding.color?.field;
  const stackConfig = encoding.y?.stack;
  const isStacked = stackConfig !== null && (stackConfig === 'zero' || hasColorEncoding);

  // Set mode: 'tozeroy' for single series, 'tonexty' for stacked
  const mode: 'tozeroy' | 'tonexty' = isStacked ? 'tonexty' : 'tozeroy';

  return {
    ...lineChartProps,
    mode,
    // Cast needed: AreaChartProps and LineChartProps share the same base but have
    // incompatible style types. The spread is safe because styles are not set here.
  } as AreaChartProps;
}

/**
 * Transforms Vega-Lite specification to Fluent ScatterChart props
 *
 * Supports scatter plots with quantitative x and y axes and color-encoded series
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns ScatterChartProps for rendering
 */
function renderScatterChartProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): ScatterChartProps {
  // Initialize transformation context
  const { dataValues, encoding, markProps } = initializeTransformContext(spec);

  // Extract field names
  const { xField, yField, colorField, sizeField } = extractEncodingFields(encoding);

  if (!xField || !yField) {
    throw new Error('VegaLiteSchemaAdapter: Both x and y encodings are required for scatter charts');
  }

  const isXTemporal = encoding.x?.type === 'temporal';
  const isYTemporal = encoding.y?.type === 'temporal';

  // Check if y-values are strings (nominal/ordinal) and build ordinal mapping
  const yIsNominal = encoding.y?.type === 'nominal' || encoding.y?.type === 'ordinal';
  const yOrdinalMap = new Map<string, number>();
  const yOrdinalLabels: string[] = [];
  categoricalDomain(encoding.y).forEach(label => {
    yOrdinalMap.set(label, yOrdinalLabels.length);
    yOrdinalLabels.push(label);
  });

  if (yIsNominal && !Array.isArray(encoding.y?.scale?.domain)) {
    // Collect unique y-values in order
    dataValues.forEach(row => {
      const yVal = row[yField];
      if (yVal !== undefined) {
        const key = String(yVal);
        if (!yOrdinalMap.has(key)) {
          yOrdinalMap.set(key, yOrdinalMap.size);
          yOrdinalLabels.push(key);
        }
      }
    });
  }

  // Group data by series (color encoding)
  // Null-prototype object so data-derived keys (e.g. "__proto__") cannot pollute Object.prototype.
  const groupedData: Record<string, Array<Record<string, unknown>>> = Object.create(null);

  dataValues.forEach(row => {
    if (yIsNominal && Array.isArray(encoding.y?.scale?.domain) && !yOrdinalMap.has(String(row[yField]))) {
      return;
    }
    const seriesName = colorField && row[colorField] !== undefined ? String(row[colorField]) : 'default';

    if (!groupedData[seriesName]) {
      groupedData[seriesName] = [];
    }

    groupedData[seriesName].push(row);
  });

  const seriesNames = Object.keys(groupedData);
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  const tooltipSpec = tooltipSpecs.get(spec) ?? spec;
  const chartData: LineChartPoints[] = seriesNames.map((seriesName, index) => {
    if (!colorIndex.has(seriesName)) {
      colorIndex.set(seriesName, currentColorIndex++);
    }
    const seriesData = groupedData[seriesName];

    const points: ScatterChartDataPoint[] = seriesData.map(row => {
      const xValue = parseValue(row[xField], isXTemporal);
      const yValue = parseValue(row[yField], isYTemporal);
      const markerSize = sizeField && row[sizeField] !== undefined ? Number(row[sizeField]) : undefined;

      // Map nominal y-values to numeric indices
      let numericY: number;
      if (yIsNominal && typeof yValue === 'string') {
        numericY = yOrdinalMap.get(yValue) ?? 0;
      } else {
        numericY = typeof yValue === 'number' ? yValue : 0;
      }

      const point: ScatterChartDataPoint = {
        x: typeof xValue === 'number' || xValue instanceof Date ? xValue : String(xValue),
        y: numericY,
        ...(markerSize !== undefined && { markerSize }),
      };
      nativeTooltips.set(point, { spec: tooltipSpec, row });
      return point;
    });

    // Get color for this series
    const colorValue =
      colorField && encoding.color?.scale?.range && Array.isArray(encoding.color.scale.range)
        ? encoding.color.scale.range[index]
        : markProps.color;
    const color =
      typeof colorValue === 'string'
        ? colorValue
        : resolveColor(
            seriesName,
            colorIndex.get(seriesName)!,
            undefined,
            undefined,
            colorMap,
            undefined,
            undefined,
            isDarkTheme,
          );

    return {
      legend: seriesName,
      data: points,
      color,
      legendShape: 'circle' as const,
    };
  });

  const titles = getVegaLiteTitles(spec);
  const annotations = extractAnnotations(spec);
  const tickConfig = extractTickConfig(spec);

  // Check for log scale on Y-axis
  const yAxisType = extractYAxisType(encoding);

  // Extract y-axis formatting and domain props
  const yAxisTickFormat = encoding.y?.axis?.format;
  const { yMinValue, yMaxValue } = extractYMinMax(encoding, dataValues);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  const result: ScatterChartProps = {
    data: {
      chartTitle: titles.chartTitle,
      scatterChartData: chartData,
    },
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(titles.titleStyles ? titles.titleStyles : {}),
    ...(yAxisTickFormat && { yAxisTickFormat }),
    ...(yMinValue !== undefined && { yMinValue }),
    ...(yMaxValue !== undefined && { yMaxValue }),
    ...(yAxisType && { yScaleType: yAxisType }),
    // For nominal y-axis, provide tick values and labels
    ...(yIsNominal &&
      yOrdinalLabels.length > 0 && {
        yAxisTickValues: Array.from({ length: yOrdinalLabels.length }, (_, i) => i),
        yAxisTickFormat: (val: number) => yOrdinalLabels[val] ?? String(val),
        yMinValue: -0.5,
        yMaxValue: yOrdinalLabels.length - 0.5,
      }),
    ...categoryOrderProps,
    hideLegend: encoding.color?.legend?.disable ?? false,
  };

  if (annotations.length > 0) {
    result.annotations = annotations;
  }

  if (tickConfig.tickValues) {
    result.tickValues = tickConfig.tickValues as number[] | string[] | Date[];
  }

  if (tickConfig.xAxisTickCount) {
    result.xAxisTickCount = tickConfig.xAxisTickCount;
  }

  if (tickConfig.yAxisTickCount) {
    result.yAxisTickCount = tickConfig.yAxisTickCount;
  }

  return result;
}

/**
 * Transforms Vega-Lite specification to Fluent DonutChart props
 *
 * Supports pie/donut charts with arc marks and theta encoding
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns DonutChartProps for rendering
 */
function renderDonutChartProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): DonutChartProps {
  // Initialize transformation context
  const { dataValues, encoding, primarySpec } = initializeTransformContext(spec);

  // Extract field names
  const { thetaField, colorField } = extractEncodingFields(encoding);

  if (!thetaField) {
    throw new Error('VegaLiteSchemaAdapter: Theta encoding is required for donut charts');
  }

  // Extract color configuration
  const { colorScheme, colorRange } = extractColorConfig(encoding);

  // Extract innerRadius from mark properties if available
  const mark = primarySpec.mark;
  const innerRadius = typeof mark === 'object' && mark?.innerRadius !== undefined ? mark.innerRadius : 0;

  const chartData: ChartDataPoint[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const value = row[thetaField];
    const legend = colorField && row[colorField] !== undefined ? String(row[colorField]) : String(value);

    if (value === undefined || typeof value !== 'number') {
      return;
    }

    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }

    chartData.push({
      legend,
      data: value,
      color: resolveColor(
        legend,
        colorIndex.get(legend)!,
        undefined,
        undefined,
        colorMap,
        colorScheme,
        colorRange,
        isDarkTheme,
      ),
    });
  });

  const titles = getVegaLiteTitles(spec);

  return {
    data: {
      chartTitle: titles.chartTitle,
      chartData,
    },
    innerRadius,
    width: typeof spec.width === 'number' ? spec.width : undefined,
    height: typeof spec.height === 'number' ? spec.height : undefined,
    ...(titles.titleStyles ? titles.titleStyles : {}),
  };
}

/**
 * Transforms Vega-Lite specification to Fluent HeatMapChart props
 *
 * Supports heatmaps with rect marks and x/y/color encodings
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns HeatMapChartProps for rendering
 */
function renderHeatMapChartProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): HeatMapChartProps {
  // Initialize transformation context
  const { dataValues, encoding } = initializeTransformContext(spec);

  // Extract field names
  const { xField, yField, colorField } = extractEncodingFields(encoding);

  if (!xField || !yField || !colorField) {
    throw new Error('VegaLiteSchemaAdapter: x, y, and color encodings are required for heatmap charts');
  }

  const heatmapDataPoints: HeatMapChartDataPoint[] = [];
  let minValue = Number.POSITIVE_INFINITY;
  let maxValue = Number.NEGATIVE_INFINITY;

  // Check if color values are nominal (strings) rather than quantitative (numbers)
  const isNominalColor =
    encoding.color?.type === 'nominal' ||
    encoding.color?.type === 'ordinal' ||
    dataValues.some(row => row[colorField] !== undefined && typeof row[colorField] !== 'number');
  const nominalColorMap = new Map<string, number>();

  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];
    const colorValue = row[colorField];

    if (isInvalidValue(xValue) || isInvalidValue(yValue) || isInvalidValue(colorValue)) {
      return;
    }

    let value: number;
    if (isNominalColor) {
      // Map nominal color values to sequential numeric indices
      const key = String(colorValue);
      if (!nominalColorMap.has(key)) {
        nominalColorMap.set(key, nominalColorMap.size);
      }
      value = nominalColorMap.get(key)!;
    } else {
      value = typeof colorValue === 'number' ? colorValue : 0;
    }

    minValue = Math.min(minValue, value);
    maxValue = Math.max(maxValue, value);

    heatmapDataPoints.push({
      x: xValue as string | Date | number,
      y: yValue as string | Date | number,
      value,
      rectText: isNominalColor ? String(colorValue) : value,
    });
  });

  // Validate that we have complete grid data
  if (heatmapDataPoints.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: Heatmap requires data points with x, y, and color values');
  }

  // Extract unique x and y values and create complete grid
  const uniqueXValues = new Set(heatmapDataPoints.map(p => String(p.x)));
  const uniqueYValues = new Set(heatmapDataPoints.map(p => String(p.y)));

  // Build a map of existing data points for quick lookup
  const dataPointMap = new Map<string, number>();
  const rectTextMap = new Map<string, number | string>();
  heatmapDataPoints.forEach(point => {
    const key = `${String(point.x)}|${String(point.y)}`;
    dataPointMap.set(key, point.value);
    rectTextMap.set(key, point.rectText ?? point.value);
  });

  // Generate complete grid - fill missing cells with 0
  const completeGridDataPoints: HeatMapChartDataPoint[] = [];
  let xValuesArray = Array.from(uniqueXValues);
  const yValuesArray = Array.from(uniqueYValues);

  // Sort x-values chronologically if they appear to be dates
  const isXTemporal = encoding.x?.type === 'temporal' || encoding.x?.type === 'ordinal';
  if (isXTemporal) {
    const firstX = xValuesArray[0];
    const parsedDate = new Date(firstX);
    if (!isNaN(parsedDate.getTime())) {
      // Values are parseable as dates — sort chronologically
      xValuesArray = xValuesArray.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    }
  }

  yValuesArray.forEach(yVal => {
    xValuesArray.forEach(xVal => {
      const key = `${xVal}|${yVal}`;
      const value = dataPointMap.get(key) ?? 0; // Use 0 for missing cells

      // Update min/max to include filled values
      if (value !== 0 || dataPointMap.has(key)) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
      }

      completeGridDataPoints.push({
        x: xVal,
        y: yVal,
        value,
        rectText: rectTextMap.get(key) ?? value,
      });
    });
  });

  const heatmapData: HeatMapChartData = {
    legend: '',
    data: completeGridDataPoints,
    value: 0,
  };

  const titles = getVegaLiteTitles(spec);

  // Create color scale domain and range
  let domainValues: number[] = [];
  let rangeValues: string[] = [];

  // Check for named color scheme or custom range from encoding
  const colorScheme = encoding.color?.scale?.scheme as string | undefined;
  const customRange = encoding.color?.scale?.range as string[] | undefined;

  if (isNominalColor && nominalColorMap.size > 0) {
    // For nominal colors, use categorical color scale
    const numCategories = nominalColorMap.size;
    domainValues = Array.from({ length: numCategories }, (_, i) => i);

    if (customRange && customRange.length >= numCategories) {
      rangeValues = customRange.slice(0, numCategories);
    } else {
      // Use distinct categorical colors for each category
      for (let i = 0; i < numCategories; i++) {
        rangeValues.push(getVegaColor(i, colorScheme, customRange, isDarkTheme ?? false));
      }
    }
  } else {
    // Quantitative color scale
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      domainValues.push(minValue + (maxValue - minValue) * t);
    }

    if (customRange && customRange.length > 0) {
      rangeValues = customRange.length >= steps ? customRange.slice(0, steps) : customRange;
    } else if (colorScheme) {
      const schemeColors = getSequentialSchemeColors(colorScheme, steps);
      if (schemeColors) {
        const isReversed =
          (encoding.color as Record<string, unknown>)?.sort === 'descending' || encoding.color?.scale?.reverse === true;
        rangeValues = isReversed ? schemeColors.reverse() : schemeColors;
      }
    }

    // Fall back to default blue-to-red gradient if no scheme matched
    if (rangeValues.length === 0) {
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        if (isDarkTheme) {
          const r = Math.round(0 + 255 * t);
          const g = Math.round(100 + (165 - 100) * t);
          const b = Math.round(255 - 255 * t);
          rangeValues.push(`rgb(${r}, ${g}, ${b})`);
        } else {
          const r = Math.round(0 + 255 * t);
          const g = Math.round(150 - 150 * t);
          const b = Math.round(255 - 255 * t);
          rangeValues.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
    }
  }

  return {
    chartTitle: titles.chartTitle,
    data: [heatmapData],
    domainValuesForColorScale: domainValues,
    rangeValuesForColorScale: rangeValues,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(titles.titleStyles ? titles.titleStyles : {}),
    width: spec.width as number | undefined,
    height: (spec.height as number | undefined) ?? DEFAULT_CHART_HEIGHT,
    hideLegend: true,
    showYAxisLables: true,
    sortOrder: 'none',
    hideTickOverlap: true,
    noOfCharsToTruncate: xValuesArray.length > 20 ? 6 : xValuesArray.length > 10 ? 10 : DEFAULT_TRUNCATE_CHARS,
    showYAxisLablesTooltip: true,
    wrapXAxisLables: true,
  };
}

/**
 * Helper function to get bin center for display
 */
function getBinCenter(bin: Bin<VegaDataRow, number>): number {
  return (bin.x0! + bin.x1!) / 2;
}

/**
 * Helper function to calculate histogram aggregation function
 *
 * @param aggregate - Aggregation type (count, sum, mean, min, max)
 * @param bin - Binned data values
 * @returns Aggregated value
 */
function calculateHistogramAggregate(aggregate: unknown, bin: VegaDataRow[], field?: string): number {
  const value = aggregateVegaValues(bin, field, aggregate ?? 'count', { mode: 'strict' });
  if (value !== undefined && typeof value !== 'number') {
    throw new Error('VegaLiteSchemaAdapter: Histogram requires a scalar numeric aggregate');
  }
  return value === undefined ? NaN : value;
}

/**
 * Transforms Vega-Lite specification to Fluent VerticalBarChart props for histogram rendering
 *
 * Supports histograms with binned x-axis and aggregated y-axis
 * Vega-Lite syntax: `{ "mark": "bar", "encoding": { "x": { "field": "value", "bin": true }, "y": { "aggregate": "count" } } }`
 *
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns VerticalBarChartProps for rendering histogram
 */
function renderHistogramProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): VerticalBarChartProps {
  // Initialize transformation context
  const { dataValues, encoding } = initializeTransformContext(spec);

  // Extract field names
  const { xField } = extractEncodingFields(encoding);
  const yAggregate = encoding.y?.aggregate || 'count';
  const binConfig = encoding.x?.bin;

  if (!xField || !binConfig) {
    throw new Error('VegaLiteSchemaAdapter: Histogram requires x encoding with bin property');
  }

  // Validate data
  validateDataArray(dataValues, xField, 'Histogram');
  validateNoNestedArrays(dataValues, xField);

  // Extract numeric values from the field
  const allValues = dataValues.map(row => row[xField]).filter(val => !isInvalidValue(val));
  const values = allValues.filter(val => typeof val === 'number') as number[];

  if (values.length === 0) {
    // Provide helpful error message based on actual data type
    const sampleValue = allValues[0];
    const actualType = typeof sampleValue;
    let suggestion = '';

    if (actualType === 'string') {
      // Check if strings contain numbers
      const hasEmbeddedNumbers = allValues.some(val => typeof val === 'string' && /\d/.test(val));
      if (hasEmbeddedNumbers) {
        suggestion =
          ' The data contains strings with embedded numbers (e.g., "40 salads"). ' +
          'Consider extracting the numeric values first, or change the encoding type to "nominal" or "ordinal" for a categorical bar chart.';
      } else {
        suggestion =
          ` The data contains categorical strings (e.g., "${sampleValue}"). ` +
          'Change the x encoding type to "nominal" or "ordinal" for a categorical bar chart, ' +
          'or remove bin: true to create a simple bar chart.';
      }
    } else if (actualType === 'undefined') {
      suggestion = ' The field may not exist in the data.';
    }

    throw new Error(
      `VegaLiteSchemaAdapter: No numeric values found for histogram binning on field "${xField}". ` +
        `Found ${actualType} values instead.${suggestion}`,
    );
  }

  // Create bins using d3
  const [minVal, maxVal] = d3Extent(values) as [number, number];
  const binGenerator = d3Bin<VegaDataRow, number>()
    .value(row => Number(row[xField]))
    .domain([minVal, maxVal]);

  // Apply bin configuration
  if (typeof binConfig === 'object') {
    if (binConfig.maxbins) {
      binGenerator.thresholds(binConfig.maxbins);
    }
    if (binConfig.extent) {
      binGenerator.domain(binConfig.extent);
    }
    if (binConfig.step !== undefined) {
      const [start, end] = binConfig.extent ?? [minVal, maxVal];
      const step = binConfig.step;
      const count = Math.ceil((end - start) / step);
      if (!Number.isFinite(step) || step <= 0 || !Number.isFinite(count) || count > 10000) {
        throw new Error('VegaLiteSchemaAdapter: Invalid histogram step or bin work limit exceeded');
      }
      binGenerator.thresholds(Array.from({ length: Math.max(0, count - 1) }, (_, i) => start + (i + 1) * step));
    }
  }

  const bins = binGenerator(dataValues.filter(row => typeof row[xField] === 'number' && !isInvalidValue(row[xField])));

  // Calculate histogram data points
  const legend = encoding.color?.field ? String(dataValues[0]?.[encoding.color.field]) : 'Frequency';
  const color = resolveColor(legend, 0, undefined, undefined, colorMap, undefined, undefined, isDarkTheme);
  const yField = encoding.y?.field;

  const histogramData: VerticalBarChartDataPoint[] = bins.map(bin => {
    const x = getBinCenter(bin);
    const y = calculateHistogramAggregate(yAggregate, bin, yField);

    const xAxisCalloutData = `[${bin.x0} - ${bin.x1})`;

    const point: VerticalBarChartDataPoint = {
      x,
      y,
      legend,
      color,
      xAxisCalloutData,
    };
    const tooltipSpec = tooltipSpecs.get(spec) ?? spec;
    const tooltipUnit = normalizeSpec(tooltipSpec)[0];
    const row: VegaDataRow = { ...bin[0], [xField]: x };
    const seen = new Set<object>();
    const materialize = (definition: unknown): void => {
      if (definition && typeof definition === 'object') {
        if (seen.has(definition)) {
          return;
        }
        seen.add(definition);
      }
      if (Array.isArray(definition)) {
        definition.forEach(materialize);
      } else if (isRecord(definition)) {
        if (definition.aggregate !== undefined) {
          const op = definition.aggregate;
          const name = typeof op === 'string' ? op : isRecord(op) ? Object.keys(op)[0] : undefined;
          const field = typeof definition.field === 'string' ? definition.field : undefined;
          const alias = name === 'count' ? '__count' : `${name}_${field}`;
          Object.defineProperty(row, alias, {
            value: aggregateVegaValues(bin, field, op, { mode: 'strict' }),
            enumerable: true,
            writable: true,
            configurable: true,
          });
        }
        materialize(definition.condition);
      }
    };
    Object.values(tooltipUnit?.encoding ?? {}).forEach(materialize);
    histogramTooltips.set(point, { spec: { ...tooltipSpec, ...tooltipUnit, data: { values: bin } }, row });
    return point;
  });

  const titles = getVegaLiteTitles(spec);
  const annotations = extractAnnotations(spec);
  const yAxisTickFormat = encoding.y?.axis?.format;

  return {
    data: histogramData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle || xField,
    yAxisTitle: titles.yAxisTitle || (typeof yAggregate === 'string' ? yAggregate : encoding.y?.field ?? 'Value'),
    ...(titles.titleStyles ? titles.titleStyles : {}),
    roundCorners: true,
    hideTickOverlap: true,
    maxBarWidth: DEFAULT_MAX_BAR_WIDTH,
    ...(annotations.length > 0 && { annotations }),
    ...(yAxisTickFormat && { yAxisTickFormat }),
    mode: 'histogram',
  };
}

/**
 * Transforms Vega-Lite specification with theta/radius encodings to Fluent PolarChart props
 * Supports line, point, and area marks with polar coordinates
 *
 * @param spec - Vega-Lite specification with theta and radius encodings
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns PolarChartProps for rendering with Fluent PolarChart component
 */
function renderPolarChartProps(spec: VegaLiteSpec, colorMap: ColorMapRef, isDarkTheme?: boolean): PolarChartProps {
  // Initialize transformation context
  const { dataValues, encoding, markProps, primarySpec } = initializeTransformContext(spec);

  // Extract field names
  const { thetaField, radiusField, colorField } = extractEncodingFields(encoding);

  // Validate polar encodings
  if (!thetaField || !radiusField) {
    throw new Error('VegaLiteSchemaAdapter: Both theta and radius encodings are required for polar charts');
  }

  validateDataArray(dataValues, thetaField, 'PolarChart');
  validateDataArray(dataValues, radiusField, 'PolarChart');

  // Determine mark type for polar chart series type
  const mark = primarySpec.mark;
  const markType = typeof mark === 'string' ? mark : mark?.type;
  // Arc marks with theta+radius should be treated as area polar (radial/rose charts)
  const isAreaMark = markType === 'area' || (markType as string) === 'arc';
  const isLineMark = markType === 'line';

  // Extract color configuration
  const { colorScheme, colorRange } = extractColorConfig(encoding);

  // Group data by series (color field)
  const seriesMap = new Map<string, PolarDataPoint[]>();
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const thetaValue = row[thetaField];
    const radiusValue = row[radiusField];

    // Skip invalid values
    if (isInvalidValue(thetaValue) || isInvalidValue(radiusValue)) {
      return;
    }

    const seriesName = colorField && row[colorField] !== undefined ? String(row[colorField]) : 'default';

    if (!colorIndex.has(seriesName)) {
      colorIndex.set(seriesName, currentColorIndex++);
    }

    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }

    // Convert theta value - handle different types
    let theta: string | number;
    if (typeof thetaValue === 'number') {
      // Numeric theta - assume degrees
      theta = thetaValue;
    } else {
      // Categorical theta
      theta = String(thetaValue);
    }

    // Convert radius value
    const r = typeof radiusValue === 'number' ? radiusValue : Number(radiusValue);

    seriesMap.get(seriesName)!.push({
      theta,
      r,
    });
  });

  // Convert series map to polar chart data array
  const polarData: (AreaPolarSeries | LinePolarSeries | ScatterPolarSeries)[] = [];

  seriesMap.forEach((dataPoints, seriesName) => {
    const color = resolveColor(
      seriesName,
      colorIndex.get(seriesName)!,
      undefined,
      markProps.color,
      colorMap,
      colorScheme,
      colorRange,
      isDarkTheme,
    );
    const curveOption = mapInterpolateToCurve(markProps.interpolate);

    // Build line options with curve, strokeDash, and strokeWidth
    const lineOptions: Partial<LineChartLineOptions> = {};
    if (curveOption) {
      lineOptions.curve = curveOption;
    }
    if (markProps.strokeDash) {
      lineOptions.strokeDasharray = markProps.strokeDash.join(' ');
    }
    if (markProps.strokeWidth) {
      lineOptions.strokeWidth = markProps.strokeWidth;
    }

    if (isAreaMark) {
      const series: AreaPolarSeries = {
        type: 'areapolar',
        legend: seriesName,
        color,
        data: dataPoints,
        ...(Object.keys(lineOptions).length > 0 && { lineOptions }),
      };
      polarData.push(series);
    } else if (isLineMark) {
      const series: LinePolarSeries = {
        type: 'linepolar',
        legend: seriesName,
        color,
        data: dataPoints,
        ...(Object.keys(lineOptions).length > 0 && { lineOptions }),
      };
      polarData.push(series);
    } else {
      // Default to scatter polar for point marks
      const series: ScatterPolarSeries = {
        type: 'scatterpolar',
        legend: seriesName,
        color,
        data: dataPoints,
      };
      polarData.push(series);
    }
  });

  // Extract chart titles
  const titles = getVegaLiteTitles(spec);

  // Build axis props from encoding
  const radialAxis: PolarAxisProps = {};
  const angularAxis: PolarAxisProps & { unit?: 'radians' | 'degrees' } = {};

  // Determine angular axis category order if theta is categorical
  const thetaType = encoding.theta?.type;
  if (thetaType === 'nominal' || thetaType === 'ordinal') {
    // Get unique theta values in order for category order
    const thetaValues = Array.from(new Set(dataValues.map(row => String(row[thetaField]))));
    angularAxis.categoryOrder = thetaValues as unknown as AxisCategoryOrder;
  }

  return {
    data: polarData,
    ...(titles.chartTitle && { chartTitle: titles.chartTitle }),
    ...(titles.titleStyles ? titles.titleStyles : {}),
    width: typeof spec.width === 'number' ? spec.width : undefined,
    height: typeof spec.height === 'number' ? spec.height : 400,
    hideLegend: encoding.color?.legend?.disable ?? false,
    radialAxis,
    angularAxis,
  };
}
