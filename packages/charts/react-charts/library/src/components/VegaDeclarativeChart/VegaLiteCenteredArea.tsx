'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { getIntrinsicElementProps, useId } from '@fluentui/react-utilities';
import {
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import { mergeClasses } from '@griffel/react';
import { scaleLinear, scalePoint, scaleTime, scaleUtc } from 'd3-scale';
import { format } from 'd3-format';
import { timeFormat, utcFormat } from 'd3-time-format';
import {
  area,
  curveLinear,
  curveStep,
  curveStepBefore,
  curveStepAfter,
  curveBasis,
  curveCardinal,
  curveMonotoneX,
  curveNatural,
} from 'd3-shape';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { Legends } from '../Legends/Legends';
import type { VegaLitePositionEncoding, VegaLiteSpec } from './VegaLiteTypes';
import { readVegaField } from './VegaLiteField';
import { getVegaCenterStack } from './VegaLiteStackGeometry';
import { getVegaColor } from './VegaLiteColorAdapter';
import { buildVegaTooltip, renderVegaTooltip } from './VegaLiteTooltip';
import { useIsDarkTheme } from './VegaDeclarativeChartHooks';
import { useVegaLiteCenteredAreaStyles } from './useVegaLiteCenteredAreaStyles.styles';
import {
  getVegaLiteChartTitle,
  getVegaLiteChartDescription,
  VegaLiteChartTitle,
  VegaLiteTooltipContainer,
  vegaLiteChartPresentation,
  renderVegaLiteAxes,
} from './VegaLiteChartPresentation';

export type VegaCenteredAreaRow = Record<string, unknown>;
type Scalar = string | number | boolean;
type Position = VegaLitePositionEncoding & {
  impute?: null;
  scale?: VegaLitePositionEncoding['scale'] & { clamp?: boolean };
};
export type VegaCenteredAreaPoint = {
  key: string;
  /** Source tuples are never changed; an imputed vertex has no source row and is not interactive. */
  row?: VegaCenteredAreaRow;
  spec?: VegaLiteSpec;
  legend?: string;
  imputed: boolean;
  value: number;
  lower: number;
  upper: number;
  x: number;
  yLower: number;
  yUpper: number;
};
export type VegaCenteredAreaGeometry = {
  width: number;
  height: number;
  xDomain: Scalar[];
  yDomain: [number, number];
  axes: {
    x: { title?: string; ticks: { label: string; position: number }[] };
    y: { title?: string; ticks: { label: string; position: number }[] };
  };
  units: VegaLiteSpec[];
  series: { key: string; legend?: string; spec: VegaLiteSpec; d: string; points: VegaCenteredAreaPoint[] }[];
  points: VegaCenteredAreaPoint[];
  /** Pure capability warnings, not console side effects. Unsupported specs produce no fallback path. */
  warnings: string[];
};

const curves = {
  linear: curveLinear,
  step: curveStep,
  'step-before': curveStepBefore,
  'step-after': curveStepAfter,
  basis: curveBasis,
  cardinal: curveCardinal,
  monotone: curveMonotoneX,
  natural: curveNatural,
};
const scalar = (value: unknown): Scalar | undefined => {
  if (value instanceof Date) {
    const timestamp = Date.prototype.getTime.call(value);
    return Number.isFinite(timestamp) ? timestamp : undefined;
  }
  return typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
    ? value
    : undefined;
};
const scalarKey = (value: Scalar): string => `${typeof value}:${value}`;
const numeric = (value: unknown, temporal = false): number => {
  if (temporal && value instanceof Date) {
    return Date.prototype.getTime.call(value);
  }
  if ((typeof value !== 'number' && typeof value !== 'string') || (typeof value === 'string' && !value.trim())) {
    return NaN;
  }
  return temporal ? new Date(value).getTime() : Number(value);
};
type AreaMark = Partial<Exclude<NonNullable<VegaLiteSpec['mark']>, string>>;
const mark = (spec: VegaLiteSpec): AreaMark => (typeof spec.mark === 'object' ? spec.mark : { type: spec.mark });
const composition = (spec: VegaLiteSpec) =>
  !!(spec.concat || spec.hconcat || spec.vconcat || spec.facet || spec.repeat || spec.spec);
const orderFields = (spec: VegaLiteSpec) => {
  const order = spec.encoding?.order;
  return order ? (Array.isArray(order) ? order : [order]) : [];
};
const unitsFor = (spec: VegaLiteSpec): VegaLiteSpec[] =>
  spec.layer?.map(layer => ({
    ...layer,
    data: layer.data ?? spec.data,
    encoding: { ...spec.encoding, ...layer.encoding },
    config: { ...spec.config, ...(layer as VegaLiteSpec).config },
  })) ?? [spec];

function supportedUnit(spec: VegaLiteSpec): boolean {
  const encoding = spec.encoding;
  const x = encoding?.x;
  const y = encoding?.y as Position | undefined;
  const color = encoding?.color;
  const definition = mark(spec);
  if (
    composition(spec) ||
    spec.layer ||
    definition.type !== 'area' ||
    definition.orient === 'horizontal' ||
    !x?.field ||
    !y?.field ||
    y.type !== 'quantitative' ||
    y.stack !== 'center' ||
    !['quantitative', 'temporal', 'ordinal'].includes(x.type ?? '') ||
    x.stack ||
    x.bin ||
    y.bin ||
    x.scale === null ||
    y.scale === null ||
    (y.scale?.type && y.scale.type !== 'linear') ||
    (y.impute !== undefined && y.impute !== null) ||
    (definition.interpolate && !(definition.interpolate in curves))
  ) {
    return false;
  }
  if (
    x.scale?.type &&
    !(x.type === 'quantitative'
      ? x.scale.type === 'linear'
      : x.type === 'temporal'
      ? ['time', 'utc'].includes(x.scale.type)
      : ['point', 'ordinal'].includes(x.scale.type))
  ) {
    return false;
  }
  if (x.sort && typeof x.sort === 'object' && !Array.isArray(x.sort)) {
    return false;
  }
  if (
    color &&
    (color.condition ||
      (color.field && color.type !== 'nominal') ||
      (!color.field && typeof color.value !== 'string') ||
      color.scale === null ||
      (color.scale?.type && color.scale.type !== 'ordinal'))
  ) {
    return false;
  }
  const channels = new Set(['x', 'y', 'color', 'order', 'tooltip']);
  if (
    Object.keys(encoding!).some(channel => !channels.has(channel) && readVegaField(encoding, channel) !== undefined)
  ) {
    return false;
  }
  return orderFields(spec).every(
    item =>
      typeof item.field === 'string' &&
      (item.sort === undefined || item.sort === 'ascending' || item.sort === 'descending'),
  );
}

/** Only prepared scalar vertical center areas and flat compatible all-center-area layers are claimed. */
export function canRenderVegaCenteredAreaSpec(spec: VegaLiteSpec): boolean {
  if (!spec.layer) {
    return supportedUnit(spec);
  }
  if (
    !spec.layer.length ||
    composition(spec) ||
    ['x', 'y', 'color'].some(channel => readVegaField(spec.resolve?.scale, channel) === 'independent') ||
    ['x', 'y'].some(channel => readVegaField(spec.resolve?.axis, channel) === 'independent') ||
    spec.resolve?.legend?.color === 'independent'
  ) {
    return false;
  }
  const units = unitsFor(spec);
  if (!units.every(supportedUnit)) {
    return false;
  }
  return (['x', 'y', 'color'] as const).every(channel => {
    const definitions = units.map(unit => unit.encoding?.[channel]);
    const first = definitions.find(Boolean);
    if (!first) {
      return true;
    }
    const signature = (definition: NonNullable<typeof first>) =>
      JSON.stringify({
        type: definition.type,
        scaleType:
          definition.scale?.type ??
          (channel === 'color'
            ? 'ordinal'
            : definition.type === 'temporal'
            ? 'time'
            : definition.type === 'ordinal'
            ? 'point'
            : 'linear'),
        reverse: definition.scale?.reverse ?? false,
        zero: definition.scale?.zero ?? definition.type === 'quantitative',
        clamp: (definition as Position).scale?.clamp ?? false,
        range: definition.scale?.range,
        scheme: definition.scale?.scheme,
        sort: channel === 'x' ? (definition as Position).sort : undefined,
      });
    const domains = definitions.flatMap(definition => (definition?.scale?.domain ? [definition.scale.domain] : []));
    return (
      definitions.every(definition =>
        definition ? signature(definition) === signature(first) : channel === 'color',
      ) &&
      (channel === 'color' || domains.every(domain => JSON.stringify(domain) === JSON.stringify(domains[0])))
    );
  });
}

type Vertex = {
  category: Scalar;
  series: Scalar;
  value: number;
  row?: VegaCenteredAreaRow;
  orders: unknown[];
  index: number;
  lower: number;
  upper: number;
};
function stackedVertices(spec: VegaLiteSpec): Vertex[] {
  const x = spec.encoding!.x!;
  const y = spec.encoding!.y! as Position;
  const color = spec.encoding!.color;
  const order = orderFields(spec);
  const vertices: Vertex[] = [];
  const values = spec.data?.values ?? [];
  for (const key of Object.keys(values).filter(item => /^(0|[1-9]\d*)$/.test(item))) {
    const row = readVegaField(values, `[${key}]`);
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      continue;
    }
    const rawX = readVegaField(row, x.field!);
    const category = x.type === 'ordinal' ? scalar(rawX) : numeric(rawX, x.type === 'temporal');
    const categoryValid = category !== undefined && (typeof category !== 'number' || Number.isFinite(category));
    const seriesValue = color?.field ? scalar(readVegaField(row, color.field)) : '';
    const value = numeric(readVegaField(row, y.field!));
    if (!categoryValid || seriesValue === undefined || !Number.isFinite(value)) {
      continue;
    }
    vertices.push({
      category: category!,
      series: seriesValue,
      value,
      row: row as VegaCenteredAreaRow,
      orders: order.map(item => readVegaField(row, item.field!)),
      index: vertices.length,
      lower: 0,
      upper: 0,
    });
  }
  // Vega-Lite path stacks impute the observed cross-product (not empty scale-domain categories).
  if (y.impute !== null) {
    const categories = new Map(vertices.map(vertex => [scalarKey(vertex.category), vertex.category]));
    const seriesValues = new Map(vertices.map(vertex => [scalarKey(vertex.series), vertex.series]));
    const present = new Set(
      vertices.map(vertex => JSON.stringify([scalarKey(vertex.category), scalarKey(vertex.series)])),
    );
    for (const category of categories.values()) {
      for (const seriesValue of seriesValues.values()) {
        if (!present.has(JSON.stringify([scalarKey(category), scalarKey(seriesValue)]))) {
          vertices.push({
            category,
            series: seriesValue,
            value: 0,
            orders: [],
            index: vertices.length,
            lower: 0,
            upper: 0,
          });
        }
      }
    }
  }
  // Canonical temporary fields allow nested/escaped aliases without ever adding layout fields to source rows.
  const rows = vertices.map(vertex => {
    const row: VegaCenteredAreaRow = { category: vertex.category, series: vertex.series, value: vertex.value };
    vertex.orders.forEach((value, index) => {
      row[`order${index}`] = value;
    });
    return row;
  });
  const segments = getVegaCenterStack(rows, {
    groupField: 'category',
    seriesField: 'series',
    valueField: 'value',
    sort: order.length
      ? order.map((item, index) => ({ field: `order${index}`, descending: item.sort === 'descending' }))
      : [{ field: 'series', descending: true }],
  });
  return segments.map(segment => ({ ...vertices[segment.index], lower: segment.start, upper: segment.end }));
}

const extent = (values: number[], includeZero: boolean): [number, number] => {
  let minimum = includeZero ? 0 : Infinity;
  let maximum = includeZero ? 0 : -Infinity;
  for (const value of values) {
    minimum = Math.min(minimum, value);
    maximum = Math.max(maximum, value);
  }
  return Number.isFinite(minimum) && Number.isFinite(maximum) ? [minimum, maximum] : [0, 1];
};
const titleFor = (channel: Position): string | undefined =>
  channel.axis === null
    ? undefined
    : channel.axis?.title === null
    ? undefined
    : channel.axis?.title ?? channel.title ?? channel.field;

const axisEncoding = (units: VegaLiteSpec[], axis: 'x' | 'y'): Position | undefined => {
  const visible = units.flatMap(unit => {
    const channel = unit.encoding?.[axis];
    return channel && channel.axis !== null ? [channel as Position] : [];
  });
  return visible.find(channel => channel.axis !== undefined) ?? visible[0];
};

/** Pure plot-space geometry. Width/height exclude gutters; rows must already be prepared by the engine. */
export function getVegaCenteredAreaGeometry(
  spec: VegaLiteSpec,
  width: number,
  height: number,
): VegaCenteredAreaGeometry {
  width = Number.isFinite(width) ? Math.max(0, width) : 0;
  height = Number.isFinite(height) ? Math.max(0, height) : 0;
  const result: VegaCenteredAreaGeometry = {
    width,
    height,
    xDomain: [],
    yDomain: [0, 1],
    axes: { x: { ticks: [] }, y: { ticks: [] } },
    units: [],
    series: [],
    points: [],
    warnings: [],
  };
  if (!canRenderVegaCenteredAreaSpec(spec)) {
    result.warnings.push(
      'Centered areas require compatible vertical area units with linear y, numeric/temporal/ordinal x and nominal color.',
    );
    return result;
  }
  const units = unitsFor(spec);
  result.units = units;
  const stacks = units.map(stackedVertices);
  const vertices = stacks.flat();
  const x = units[0].encoding!.x! as Position;
  const y = units[0].encoding!.y! as Position;
  const xAxis = axisEncoding(units, 'x');
  const yAxis = axisEncoding(units, 'y');
  const xAuthored = units.find(unit => unit.encoding?.x?.scale?.domain)?.encoding!.x!.scale!.domain;
  const yAuthored = units.find(unit => unit.encoding?.y?.scale?.domain)?.encoding!.y!.scale!.domain;
  const temporal = x.type === 'temporal';
  const discrete = x.type === 'ordinal';
  let xDomain: Scalar[];
  if (discrete) {
    xDomain =
      xAuthored?.flatMap(value => scalar(value) ?? []) ??
      Array.from(new Map(vertices.map(vertex => [scalarKey(vertex.category), vertex.category])).values());
    if (!xAuthored && x.sort !== null) {
      const explicit = Array.isArray(x.sort) ? x.sort : undefined;
      xDomain.sort((a, b) =>
        explicit
          ? (explicit.indexOf(String(a)) < 0 ? explicit.length : explicit.indexOf(String(a))) -
            (explicit.indexOf(String(b)) < 0 ? explicit.length : explicit.indexOf(String(b)))
          : a < b
          ? -1
          : a > b
          ? 1
          : 0,
      );
      if (x.sort === 'descending') {
        xDomain.reverse();
      }
    }
  } else {
    xDomain =
      xAuthored?.map(value => numeric(value, temporal)) ??
      extent(
        vertices.map(vertex => vertex.category as number),
        !temporal && x.scale?.zero !== false,
      );
  }
  if (!discrete && (xDomain.length !== 2 || !xDomain.every(value => Number.isFinite(value)))) {
    result.warnings.push('Centered area x domain must contain two finite endpoints.');
    return result;
  }
  const yDomain =
    yAuthored?.map(value => numeric(value)) ??
    extent(
      vertices.flatMap(vertex => [vertex.lower, vertex.upper]),
      y.scale?.zero !== false,
    );
  if (yDomain.length !== 2 || !yDomain.every(Number.isFinite)) {
    result.warnings.push('Centered area y domain must contain two finite endpoints.');
    return result;
  }
  result.xDomain = xDomain;
  result.yDomain = yDomain as [number, number];
  const rangeFor = (channel: Position, fallback: number[]) => {
    const authored = channel.scale?.range;
    const range =
      authored?.length === 2 && authored.every(value => Number.isFinite(numeric(value)))
        ? authored.map(value => numeric(value))
        : fallback;
    return channel.scale?.reverse ? [...range].reverse() : range;
  };
  const xRange = rangeFor(x, [0, width]);
  const xLinear = scaleLinear()
    .domain(xDomain as number[])
    .range(xRange)
    .clamp(x.scale?.clamp ?? false);
  const xPoint = scalePoint<string>()
    .domain(xDomain.map(scalarKey))
    .range(xRange as [number, number])
    .padding(0.5);
  const xPosition = (value: Scalar) => (discrete ? xPoint(scalarKey(value)) ?? NaN : xLinear(value as number));
  const yScale = scaleLinear()
    .domain(yDomain)
    .range(rangeFor(y, [height, 0]))
    .clamp(y.scale?.clamp ?? false);
  const tickValues =
    xAxis?.axis?.values ??
    (discrete
      ? xDomain
      : temporal
      ? (x.scale?.type === 'utc' ? scaleUtc() : scaleTime())
          .domain((xDomain as number[]).map(value => new Date(value)))
          .ticks(xAxis?.axis?.tickCount ?? 5)
      : xLinear.ticks(xAxis?.axis?.tickCount ?? 5));
  const formatXDate = temporal
    ? (x.scale?.type === 'utc' ? utcFormat : timeFormat)(xAxis?.axis?.format ?? '%Y-%m-%d %H:%M:%S')
    : undefined;
  const formatXNumber = !temporal && !discrete && xAxis?.axis?.format ? format(xAxis.axis.format) : undefined;
  result.axes.x = {
    title: xAxis && titleFor(xAxis),
    ticks: !xAxis
      ? []
      : tickValues.flatMap(value => {
          const category = discrete ? scalar(value) : numeric(value, temporal);
          const position = category === undefined ? NaN : xPosition(category);
          const label = formatXDate
            ? formatXDate(new Date(numeric(value, true)))
            : formatXNumber
            ? formatXNumber(numeric(value))
            : String(value);
          return Number.isFinite(position) ? [{ label, position }] : [];
        }),
  };
  const formatY = yAxis?.axis?.format
    ? format(yAxis.axis.format)
    : (value: number) => String(Number(value.toPrecision(12)));
  result.axes.y = {
    title: yAxis && titleFor(yAxis),
    ticks: !yAxis
      ? []
      : (yAxis.axis?.values ?? yScale.ticks(yAxis.axis?.tickCount ?? 5))
          .map(value => ({ label: formatY(numeric(value)), position: yScale(numeric(value)) }))
          .filter(tick => Number.isFinite(tick.position)),
  };
  stacks.forEach((stack, layerIndex) => {
    const unit = units[layerIndex];
    const groups = new Map<string, Vertex[]>();
    for (const vertex of stack) {
      const key = scalarKey(vertex.series);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(vertex);
    }
    for (const [key, group] of groups) {
      group.sort((a, b) =>
        discrete
          ? xDomain.findIndex(value => scalarKey(value) === scalarKey(a.category)) -
            xDomain.findIndex(value => scalarKey(value) === scalarKey(b.category))
          : (a.category as number) - (b.category as number),
      );
      const legend = unit.encoding!.color?.field ? String(group[0].series) : undefined;
      const points = group
        .map(vertex => ({
          key: `${layerIndex}-${vertex.index}`,
          row: vertex.row,
          spec: spec.layer ? unit : undefined,
          legend,
          imputed: !vertex.row,
          value: vertex.value,
          lower: vertex.lower,
          upper: vertex.upper,
          x: xPosition(vertex.category),
          yLower: yScale(vertex.lower),
          yUpper: yScale(vertex.upper),
        }))
        .filter(point => [point.x, point.yLower, point.yUpper].every(Number.isFinite));
      const interpolate = mark(unit).interpolate ?? 'linear';
      const d =
        area<VegaCenteredAreaPoint>()
          .x(point => point.x)
          .y0(point => point.yLower)
          .y1(point => point.yUpper)
          .curve(curves[interpolate as keyof typeof curves])(points) ?? '';
      result.series.push({ key: `${layerIndex}-${key}`, legend, spec: unit, points, d });
      result.points.push(...points);
    }
  });
  return result;
}

export type VegaLiteCenteredAreaProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Prepared inline rows; no transforms/aggregates are run by this renderer. */
  spec: VegaLiteSpec;
  /** Internal composition option: the owning view renders the heading, but not the subtitle. */
  hideTitle?: boolean;
  /** Total SVG viewport including internal axis gutters. */
  width?: number;
  height?: number;
  selectedLegends?: string[];
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- Engine callback accepts legend keys, not a DOM event.
  onLegendChange?: (keys: string[]) => void;
  renderTooltip?: (row: VegaCenteredAreaRow, spec?: VegaLiteSpec) => React.ReactNode;
  getAriaLabel?: (row: VegaCenteredAreaRow, spec?: VegaLiteSpec) => string;
};
type Anchor = { point: VegaCenteredAreaPoint; target: SVGCircleElement };

/** Native filled SVG areas with semantic per-tuple focus targets and event-owned Fluent callouts. */
export const VegaLiteCenteredArea: ForwardRefComponent<VegaLiteCenteredAreaProps> = React.forwardRef((props, ref) => {
  const {
    spec,
    hideTitle,
    width: measuredWidth,
    height: measuredHeight,
    selectedLegends,
    onLegendChange,
    renderTooltip,
    getAriaLabel,
    className,
    style,
    onBlur,
    onMouseLeave,
    ...rest
  } = props;
  const classes = useVegaLiteCenteredAreaStyles();
  const id = useId('vega-centered-area');
  const dark = useIsDarkTheme();
  const groupAttributes = useFocusableGroup();
  const arrowAttributes = useArrowNavigationGroup({ axis: 'both', circular: true });
  const navigationAttributes = useMergedTabsterAttributes_unstable(groupAttributes, arrowAttributes);
  const width = Math.max(
    0,
    measuredWidth ?? (typeof spec.width === 'number' ? spec.width : vegaLiteChartPresentation.viewport.width),
  );
  const height = Math.max(
    0,
    measuredHeight ?? (typeof spec.height === 'number' ? spec.height : vegaLiteChartPresentation.viewport.height),
  );
  const plotWidth = Math.max(0, width - vegaLiteChartPresentation.gutters.horizontal);
  const plotHeight = Math.max(0, height - vegaLiteChartPresentation.gutters.vertical);
  const geometry = React.useMemo(
    () => getVegaCenteredAreaGeometry(spec, plotWidth, plotHeight),
    [spec, plotWidth, plotHeight],
  );
  const showXAxis = !!axisEncoding(geometry.units, 'x');
  const showYAxis = !!axisEncoding(geometry.units, 'y');
  const [hovered, setHovered] = React.useState<Anchor>();
  const [focused, setFocused] = React.useState<Anchor>();
  const [localSelection, setLocalSelection] = React.useState<string[]>([]);
  const selected = selectedLegends ?? localSelection;
  const candidate = hovered ?? focused;
  const active =
    candidate && candidate.target.ownerSVGElement && geometry.points.includes(candidate.point) ? candidate : undefined;
  React.useEffect(() => {
    setHovered(previous => (previous && geometry.points.includes(previous.point) ? previous : undefined));
    setFocused(previous => (previous && geometry.points.includes(previous.point) ? previous : undefined));
  }, [geometry]);
  const legends = Array.from(
    new Set([
      ...geometry.units.flatMap(unit => unit.encoding?.color?.scale?.domain?.map(String) ?? []),
      ...geometry.series.flatMap(item => (item.legend === undefined ? [] : [item.legend])),
    ]),
  );
  const colorEncoding = geometry.units.find(unit => unit.encoding?.color?.field)?.encoding?.color;
  const colorFor = (legend: string | undefined, unit: VegaLiteSpec = geometry.units[0] ?? spec) => {
    const color = unit.encoding?.color;
    const index = legend === undefined ? 0 : Math.max(0, legends.indexOf(legend));
    return (
      color?.value ??
      mark(unit).color ??
      getVegaColor(
        color?.scale?.reverse ? legends.length - 1 - index : index,
        color?.scale?.scheme,
        color?.scale?.range as string[] | undefined,
        dark,
      )
    );
  };
  const selectedPoint = (legend?: string) => !selected.length || legend === undefined || selected.includes(legend);
  const title = getVegaLiteChartTitle(spec, 'Centered area chart');
  let content: React.ReactNode = null;
  if (active?.point.row) {
    const point = active.point;
    const unit = point.spec ?? spec;
    const tooltip = buildVegaTooltip(unit, point.row!);
    if (!tooltip.disabled) {
      content = renderTooltip
        ? point.spec
          ? renderTooltip(point.row!, point.spec)
          : renderTooltip(point.row!)
        : renderVegaTooltip(unit, point.row!);
    }
  }
  const showTooltip = !!active && content !== null && content !== undefined && content !== false;
  const handleLegendChange = React.useCallback(
    (keys: string[]) => {
      setLocalSelection(keys);
      onLegendChange?.(keys);
    },
    [onLegendChange],
  );
  const capture = (event: React.SyntheticEvent<SVGCircleElement>, point: VegaCenteredAreaPoint): Anchor | undefined =>
    event.currentTarget.ownerSVGElement ? { point, target: event.currentTarget } : undefined;

  return (
    <div
      {...getIntrinsicElementProps('div', rest)}
      ref={ref}
      style={{ ...style, width }}
      className={mergeClasses(classes.root, className)}
      role="group"
      aria-label={rest['aria-label'] ?? title}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(undefined);
          setHovered(undefined);
        }
        onBlur?.(event);
      }}
      onMouseLeave={event => {
        setHovered(undefined);
        onMouseLeave?.(event);
      }}
    >
      <VegaLiteChartTitle spec={spec} hideTitle={hideTitle} />
      {geometry.warnings.length > 0 && <div role="status">{geometry.warnings.join(' ')}</div>}
      <div {...navigationAttributes} data-centered-navigation="true">
        <svg
          id={id}
          className={classes.svg}
          width={width}
          height={height}
          viewBox={`${vegaLiteChartPresentation.viewBox.x} ${vegaLiteChartPresentation.viewBox.y} ${width} ${height}`}
          role="group"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-description`}>{getVegaLiteChartDescription(spec, 'points')}</desc>
          <defs>
            <clipPath id={`${id}-clip`}>
              <rect width={plotWidth} height={plotHeight} />
            </clipPath>
          </defs>
          {renderVegaLiteAxes({ id, axes: geometry.axes, plotWidth, plotHeight, showXAxis, showYAxis, classes })}
          <g clipPath={`url(#${id}-clip)`}>
            {geometry.series.map(item => (
              <path
                key={item.key}
                id={`${id}-series-${item.key}`}
                className={classes.area}
                data-centered-series={item.key}
                data-legend={item.legend}
                data-selected={selectedPoint(item.legend)}
                d={item.d}
                fill={colorFor(item.legend, item.spec)}
                aria-hidden="true"
                opacity={
                  selectedPoint(item.legend)
                    ? (mark(item.spec).opacity ?? 1) * (mark(item.spec).fillOpacity ?? 1)
                    : 0.25
                }
              />
            ))}
            {geometry.points
              .filter(point => !!point.row)
              .map(point => {
                const row = point.row!;
                const unit = point.spec ?? spec;
                const aria =
                  (point.spec ? getAriaLabel?.(row, point.spec) : getAriaLabel?.(row)) ??
                  buildVegaTooltip(unit, row).ariaLabel;
                return (
                  <circle
                    key={point.key}
                    id={`${id}-point-${point.key}`}
                    className={classes.point}
                    data-centered-point={point.key}
                    data-value={point.value}
                    data-lower={point.lower}
                    data-upper={point.upper}
                    data-selected={selectedPoint(point.legend)}
                    cx={point.x}
                    cy={(point.yLower + point.yUpper) / 2}
                    r={vegaLiteChartPresentation.pointRadius}
                    fill={colorFor(point.legend, unit)}
                    role="img"
                    aria-label={aria || 'Data point'}
                    tabIndex={0}
                    aria-describedby={showTooltip && active?.point === point ? `${id}-tooltip` : undefined}
                    onFocus={event => {
                      setHovered(undefined);
                      setFocused(capture(event, point));
                    }}
                    onMouseEnter={event => setHovered(capture(event, point))}
                    onMouseLeave={() => setHovered(previous => (previous?.point === point ? undefined : previous))}
                    onKeyDown={event => {
                      if (event.key === 'Escape') {
                        setHovered(undefined);
                        setFocused(undefined);
                      } else if (
                        event.key.startsWith('Arrow') ||
                        event.key === 'Home' ||
                        event.key === 'End' ||
                        event.key === 'Tab'
                      ) {
                        setHovered(undefined);
                      }
                    }}
                  />
                );
              })}
          </g>
        </svg>
      </div>
      {colorEncoding?.legend !== null && !colorEncoding?.legend?.disable && legends.length > 0 && (
        <Legends
          legends={legends.map(legend => ({ title: legend, color: colorFor(legend) }))}
          selectedLegends={selected}
          canSelectMultipleLegends
          onChange={handleLegendChange}
        />
      )}
      {showTooltip && active && (
        <ChartPopover
          isPopoverOpen
          positioning={{ target: active.target }}
          customCallout={{
            customizedCallout: (
              <VegaLiteTooltipContainer id={`${id}-tooltip`} className={classes.tooltip}>
                {content}
              </VegaLiteTooltipContainer>
            ),
          }}
        />
      )}
    </div>
  );
});
VegaLiteCenteredArea.displayName = 'VegaLiteCenteredArea';
