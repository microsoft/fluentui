import { scaleBand, scaleLinear, scaleTime, scaleUtc } from 'd3-scale';
import { format } from 'd3-format';
import { timeFormat, utcFormat } from 'd3-time-format';
import type { VegaLiteEncoding, VegaLitePositionEncoding, VegaLiteSpec } from './VegaLiteTypes';
import { readVegaField } from './VegaLiteField';
import { getVegaCenterStack } from './VegaLiteStackGeometry';
import type { VegaCenterStackSegment } from './VegaLiteStackGeometry';

export { readVegaField } from './VegaLiteField';

export type VegaRangedRow = Record<string, unknown>;
type Position = Omit<VegaLitePositionEncoding, 'scale'> & {
  scale?:
    | (NonNullable<VegaLitePositionEncoding['scale']> & {
        paddingInner?: number;
        paddingOuter?: number;
        clamp?: boolean;
      })
    | null;
};
type Encoding = Omit<VegaLiteEncoding, 'x' | 'y' | 'xOffset'> & {
  x?: Position;
  y?: Position;
  xOffset?: Position;
  yOffset?: Position;
};
type RangedMark = {
  type: string;
  orient?: 'horizontal' | 'vertical';
  cornerRadiusEnd?: number;
  width?: number;
  height?: number;
  size?: number;
  thickness?: number;
  color?: string;
  opacity?: number;
};
type End = 'left' | 'right' | 'top' | 'bottom';
export type VegaRangedAxis = {
  title?: string;
  ticks: { label: string; position: number }[];
};
export type VegaRangedGeometry = {
  width: number;
  height: number;
  axes: { x: VegaRangedAxis; y: VegaRangedAxis };
  /** Effective inherited unit specs, including empty layers needed for legends. */
  units?: VegaLiteSpec[];
  marks: {
    key: string;
    row: VegaRangedRow;
    /** Layer-local tooltip/color/mark metadata. Unit marks keep the existing callback contract. */
    spec?: VegaLiteSpec;
    x: number;
    y: number;
    width: number;
    height: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    roundedEnd?: End;
    d: string;
    ariaLabel: string;
    legend?: string;
  }[];
};

const markDefinition = (spec: VegaLiteSpec): RangedMark =>
  typeof spec.mark === 'string' ? { type: spec.mark } : (spec.mark as RangedMark | undefined) ?? { type: '' };
const channelValue = (channel: Position | undefined, row: VegaRangedRow): unknown =>
  channel?.value !== undefined
    ? channel.value
    : channel?.datum !== undefined
    ? channel.datum
    : channel?.field
    ? readVegaField(row, channel.field)
    : undefined;
const isDiscrete = (channel: Position | undefined): boolean =>
  channel?.type === 'nominal' ||
  channel?.type === 'ordinal' ||
  channel?.scale?.type === 'band' ||
  channel?.scale?.type === 'ordinal' ||
  (!!channel?.field && channel.type === undefined);
const numeric = (value: unknown, temporal: boolean = false): number => {
  if (temporal && value instanceof Date) {
    return Date.prototype.getTime.call(value);
  }
  if ((typeof value !== 'number' && typeof value !== 'string') || (typeof value === 'string' && !value.trim())) {
    return NaN;
  }
  return temporal ? new Date(value).getTime() : Number(value);
};
// Scalar labels only: String(object) could execute valueOf/toString/Symbol.toPrimitive.
const scalarText = (value: unknown): string | undefined => {
  if (value instanceof Date) {
    const timestamp = Date.prototype.getTime.call(value);
    return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
  }
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
    ? String(value)
    : undefined;
};
const labelValue = (value: unknown): string =>
  scalarText(value) ?? (value === null || value === undefined ? String(value) : '[Object]');

const valueAxisFor = (encoding: Encoding, mark: RangedMark): 'x' | 'y' =>
  mark.orient
    ? mark.orient === 'horizontal'
      ? 'x'
      : 'y'
    : (!isDiscrete(encoding.x) && isDiscrete(encoding.y)) || (encoding.x2 && !encoding.y2)
    ? 'x'
    : 'y';

function hasCenterStack(spec: VegaLiteSpec): boolean {
  return spec.encoding?.x?.stack === 'center' || spec.encoding?.y?.stack === 'center';
}

function supportedCenterStack(spec: VegaLiteSpec): boolean {
  const encoding = spec.encoding as Encoding | undefined;
  if (!encoding || markDefinition(spec).type !== 'bar') {
    return false;
  }
  const axis = valueAxisFor(encoding, markDefinition(spec));
  const value = encoding[axis];
  const category = encoding[axis === 'x' ? 'y' : 'x'];
  const order = encoding.order ? (Array.isArray(encoding.order) ? encoding.order : [encoding.order]) : [];
  return (
    value?.stack === 'center' &&
    value.type === 'quantitative' &&
    !!value.field &&
    value.scale !== null &&
    (!value.scale?.type || value.scale.type === 'linear') &&
    !!category?.field &&
    isDiscrete(category) &&
    category.scale !== null &&
    category.stack !== 'center' &&
    !!encoding.color?.field &&
    (!encoding.color.type || encoding.color.type === 'nominal') &&
    !encoding.x2 &&
    !encoding.y2 &&
    !encoding.xOffset &&
    !encoding.yOffset &&
    !encoding.detail &&
    order.every(item => !!item.field && (!item.sort || item.sort === 'ascending' || item.sort === 'descending'))
  );
}

function supportedUnit(spec: VegaLiteSpec, allowOrdinaryBar = false): boolean {
  if (spec.layer || spec.concat || spec.hconcat || spec.vconcat || spec.facet || spec.repeat) {
    return false;
  }
  const encoding = spec.encoding as Encoding | undefined;
  const mark = markDefinition(spec);
  const type = mark.type;
  if (hasCenterStack(spec) && !supportedCenterStack(spec)) {
    return false;
  }
  if (
    !['bar', 'rect', 'tick'].includes(type) ||
    !encoding ||
    !(encoding.x || encoding.y) ||
    !(
      allowOrdinaryBar ||
      hasCenterStack(spec) ||
      type === 'tick' ||
      (type === 'bar' && Object.prototype.hasOwnProperty.call(mark, 'cornerRadiusEnd')) ||
      encoding.x2 ||
      encoding.y2 ||
      encoding.xOffset ||
      encoding.yOffset
    )
  ) {
    return false;
  }
  return [encoding.x, encoding.y, encoding.xOffset, encoding.yOffset].every(channel => {
    const scaleType = channel?.scale?.type;
    return !scaleType || ['linear', 'band', 'ordinal', 'time', 'utc'].includes(scaleType);
  });
}

/** Prepared flat layers inherit data, encodings and config; no transforms are executed here. */
function layerUnits(spec: VegaLiteSpec): VegaLiteSpec[] {
  return (
    spec.layer?.map(layer => ({
      ...layer,
      data: layer.data ?? spec.data,
      encoding: { ...spec.encoding, ...layer.encoding },
      config: { ...spec.config, ...(layer as VegaLiteSpec).config },
    })) ?? [spec]
  );
}

/** Ordinary simple/zero/normalized stacks stay native. Only compatible flat ranged overlays are claimed. */
export function canRenderVegaRangedSpec(spec: VegaLiteSpec): boolean {
  if (!spec.layer) {
    return supportedUnit(spec);
  }
  if (
    !spec.layer.length ||
    spec.concat ||
    spec.hconcat ||
    spec.vconcat ||
    spec.facet ||
    spec.repeat ||
    spec.resolve?.scale?.x === 'independent' ||
    spec.resolve?.scale?.y === 'independent' ||
    spec.resolve?.axis?.x === 'independent' ||
    spec.resolve?.axis?.y === 'independent' ||
    spec.resolve?.scale?.color === 'independent' ||
    spec.resolve?.legend?.color === 'independent'
  ) {
    return false;
  }
  const units = layerUnits(spec);
  if (!units.some(unit => supportedUnit(unit)) || !units.every(unit => supportedUnit(unit, true))) {
    return false;
  }
  if (
    units.some(unit => {
      const encoding = unit.encoding as Encoding;
      return (
        (!hasCenterStack(unit) &&
          [encoding.x, encoding.y].some(channel => channel?.stack !== undefined && channel.stack !== null)) ||
        (encoding.color?.field && encoding.color.type && !['nominal', 'ordinal'].includes(encoding.color.type))
      );
    })
  ) {
    return false;
  }
  // A plain colored bar may imply native stacking. Do not silently turn it into an overlay.
  if (
    units.some(unit => {
      const encoding = unit.encoding as Encoding;
      const axis = valueAxisFor(encoding, markDefinition(unit));
      return (
        !hasCenterStack(unit) &&
        markDefinition(unit).type === 'bar' &&
        encoding.color?.field &&
        !encoding.x2 &&
        !encoding.y2 &&
        !encoding.xOffset &&
        !encoding.yOffset &&
        encoding[axis]?.stack !== null
      );
    })
  ) {
    return false;
  }
  return (['x', 'y', 'color'] as const).every(axis => {
    const definitions = units.map(unit => unit.encoding?.[axis]);
    const first = definitions.find(Boolean);
    if (!first) {
      return true;
    }
    // One common axis/legend needs compatible scale semantics. Domains may differ and are unioned.
    return definitions.every(definition => {
      if (!definition) {
        return axis === 'color';
      }
      if ((definition.scale === null) !== (first.scale === null)) {
        return false;
      }
      if (axis !== 'color' && (definition.value !== undefined || first.value !== undefined)) {
        return false;
      }
      const signature = (item: typeof first) =>
        JSON.stringify({
          type: item.type ?? 'nominal',
          scaleType:
            item.scale?.type ?? (item.type === 'quantitative' ? 'linear' : item.type === 'temporal' ? 'time' : 'band'),
          reverse: item.scale?.reverse ?? false,
          range: item.scale?.range,
          clamp: (item.scale as Position['scale'])?.clamp ?? false,
          paddingInner: (item.scale as Position['scale'])?.paddingInner ?? 0.1,
          paddingOuter: (item.scale as Position['scale'])?.paddingOuter ?? 0.05,
          scheme: item.scale?.scheme,
          sort: axis === 'color' ? undefined : (item as VegaLitePositionEncoding).sort,
          descendingDomain:
            axis !== 'color' && item.type === 'quantitative' && item.scale?.domain
              ? numeric(item.scale.domain[0]) > numeric(item.scale.domain[1])
              : false,
        });
      return signature(definition) === signature(first);
    });
  });
}

function discreteDomain(channel: Position, rows: VegaRangedRow[]): string[] {
  let values =
    channel.scale?.domain?.flatMap(value => scalarText(value) ?? []) ??
    Array.from(new Set(rows.flatMap(row => scalarText(channelValue(channel, row)) ?? [])));
  if (Array.isArray(channel.sort)) {
    const sort = channel.sort;
    values = [...values].sort((a, b) => {
      const ai = sort.indexOf(a);
      const bi = sort.indexOf(b);
      return (ai < 0 ? sort.length : ai) - (bi < 0 ? sort.length : bi);
    });
  } else if (channel.sort === 'ascending' || channel.sort === 'descending') {
    values = [...values].sort();
    if (channel.sort === 'descending') {
      values.reverse();
    }
  }
  return values;
}

type PositionScale = {
  axis: VegaRangedAxis;
  bandwidth: number;
  discrete: boolean;
  position: (channel: Position | undefined, row: VegaRangedRow) => number;
};

function positionScale(
  channel: Position | undefined,
  secondary: Position | undefined,
  rows: VegaRangedRow[],
  size: number,
  vertical: boolean,
  extraValues: number[] = [],
  sharedDomain?: (string | number | Date)[],
): PositionScale {
  const title = channel?.axis === null ? undefined : channel?.axis?.title ?? channel?.title ?? channel?.field;
  if (!channel) {
    return { axis: { ticks: [] }, bandwidth: size, discrete: true, position: () => 0 };
  }
  const customRange = channel.scale?.range;
  const range =
    customRange?.length === 2 && customRange.every(value => Number.isFinite(numeric(value)))
      ? customRange.map(value => numeric(value))
      : vertical && !isDiscrete(channel)
      ? [size, 0]
      : [0, size];
  if (channel.scale?.reverse) {
    range.reverse();
  }
  if (isDiscrete(channel) && channel.scale !== null && channel.value === undefined) {
    const scale = scaleBand<string>()
      .domain(sharedDomain?.map(labelValue) ?? discreteDomain(channel, rows))
      .range(range as [number, number])
      .paddingInner(channel.scale?.paddingInner ?? 0.1)
      .paddingOuter(channel.scale?.paddingOuter ?? 0.05);
    const ticks =
      channel.axis === null
        ? []
        : (channel.axis?.values?.flatMap(value => scalarText(value) ?? []) ?? scale.domain())
            .filter(value => scale(value) !== undefined)
            .map(value => ({ label: value, position: scale(value)! + scale.bandwidth() / 2 }));
    return {
      axis: { title: title ?? undefined, ticks },
      bandwidth: scale.bandwidth(),
      discrete: true,
      position: (definition, row) => {
        const value = scalarText(channelValue(definition, row));
        return value === undefined ? NaN : scale(value) ?? NaN;
      },
    };
  }
  const temporal = channel.type === 'temporal' || channel.scale?.type === 'time' || channel.scale?.type === 'utc';
  const values = (
    extraValues.length
      ? extraValues
      : rows.flatMap(row => [
          numeric(channelValue(channel, row), temporal),
          numeric(channelValue(secondary, row), temporal),
        ])
  ).filter(Number.isFinite);
  // Domains consume already-prepared rows, including BOTH endpoints, without mutating or reaggregating them.
  const domain = (sharedDomain ?? channel.scale?.domain)?.map(value => numeric(value, temporal)) ?? [
    Math.min(...values, ...(!temporal && channel.scale?.zero !== false ? [0] : [])),
    Math.max(...values, ...(!temporal && channel.scale?.zero !== false ? [0] : [])),
  ];
  if (domain.length < 2 || !domain.every(Number.isFinite)) {
    domain.splice(0, domain.length, 0, 1);
  }
  const scale = scaleLinear()
    .domain(domain)
    .range(range)
    .clamp(channel.scale?.clamp ?? false);
  const utc = channel.scale?.type === 'utc';
  const tickValues =
    channel.axis?.values ??
    (temporal
      ? (utc ? scaleUtc() : scaleTime())
          .domain(domain.map(value => new Date(value)))
          .ticks(channel.axis?.tickCount ?? 5)
      : scale.ticks(channel.axis?.tickCount ?? 5));
  const ticks =
    channel.axis === null || channel.scale === null || channel.value !== undefined
      ? []
      : tickValues.map(value => ({
          position: scale(numeric(value, temporal)),
          label: temporal
            ? (utc ? utcFormat : timeFormat)(channel.axis?.format ?? '%Y-%m-%d')(new Date(numeric(value, true)))
            : channel.axis?.format
            ? format(channel.axis.format)(numeric(value))
            : String(Number(numeric(value).toPrecision(12))),
        }));
  return {
    axis: { title: title ?? undefined, ticks },
    bandwidth: 5,
    discrete: false,
    position: (definition, row) => {
      const value = numeric(channelValue(definition, row), temporal);
      return definition?.value !== undefined || channel.scale === null ? value : scale(value);
    },
  };
}

/** Offset scales are local to their channel and range, never reused from x/y or color. */
function offsetScale(channel: Position | undefined, rows: VegaRangedRow[], span: number, vertical: boolean) {
  if (!channel) {
    return { bandwidth: undefined, offset: (_row: VegaRangedRow) => 0 };
  }
  if (isDiscrete(channel) && channel.scale !== null && channel.value === undefined) {
    const range: [number, number] = channel.scale?.reverse ? [span, 0] : [0, span];
    const scale = scaleBand<string>()
      .domain(discreteDomain(channel, rows))
      .range(range)
      .paddingInner(channel.scale?.paddingInner ?? 0)
      .paddingOuter(channel.scale?.paddingOuter ?? 0);
    // Categorical y bands are top-to-bottom; numeric y offsets below are upward-positive.
    return {
      bandwidth: scale.bandwidth(),
      offset: (row: VegaRangedRow) => {
        const value = scalarText(channelValue(channel, row));
        return value === undefined ? NaN : scale(value) ?? NaN;
      },
    };
  }
  const values = rows.map(row => numeric(channelValue(channel, row))).filter(Number.isFinite);
  const domain = channel.scale?.domain?.map(value => numeric(value)) ?? [
    Math.min(0, ...values),
    Math.max(0, ...values),
  ];
  if (domain.length < 2 || !domain.every(Number.isFinite)) {
    domain.splice(0, domain.length, 0, 1);
  }
  const range = channel.scale?.range?.map(value => numeric(value)) ?? [0, span];
  if (channel.scale?.reverse) {
    range.reverse();
  }
  const scale = scaleLinear()
    .domain(domain)
    .range(range)
    .clamp(channel.scale?.clamp ?? false);
  return {
    bandwidth: undefined,
    offset: (row: VegaRangedRow) => {
      const value = numeric(channelValue(channel, row));
      const displacement = channel.value !== undefined || channel.scale === null ? value : scale(value);
      return vertical ? -displacement : displacement;
    },
  };
}

function rectanglePath(x: number, y: number, width: number, height: number, end?: End, radius: number = 0): string {
  const coordinate = (value: number) => Number(value.toFixed(9));
  const right = coordinate(x + width);
  const bottom = coordinate(y + height);
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  if (!end || !r) {
    return `M${x},${y}L${right},${y}L${right},${bottom}L${x},${bottom}Z`;
  }
  const innerLeft = coordinate(x + r);
  const innerRight = coordinate(right - r);
  const innerTop = coordinate(y + r);
  const innerBottom = coordinate(bottom - r);
  switch (end) {
    case 'top':
      return `M${x},${innerTop}Q${x},${y} ${innerLeft},${y}L${innerRight},${y}Q${right},${y} ${right},${innerTop}L${right},${bottom}L${x},${bottom}Z`;
    case 'bottom':
      return `M${x},${y}L${right},${y}L${right},${innerBottom}Q${right},${bottom} ${innerRight},${bottom}L${innerLeft},${bottom}Q${x},${bottom} ${x},${innerBottom}Z`;
    case 'right':
      return `M${x},${y}L${innerRight},${y}Q${right},${y} ${right},${innerTop}L${right},${innerBottom}Q${right},${bottom} ${innerRight},${bottom}L${x},${bottom}Z`;
    case 'left':
      return `M${innerLeft},${y}L${right},${y}L${right},${bottom}L${innerLeft},${bottom}Q${x},${bottom} ${x},${innerBottom}L${x},${innerTop}Q${x},${y} ${innerLeft},${y}Z`;
  }
}

function dataRows(spec: VegaLiteSpec): VegaRangedRow[] {
  // Accessor rows in arrays are excluded too; prepared rows may be frozen.
  const values = spec.data?.values ?? [];
  return Object.keys(values)
    .filter(key => /^(0|[1-9]\d*)$/.test(key))
    .flatMap(key => {
      const row = readVegaField(values, `[${key}]`);
      return row && typeof row === 'object' && !Array.isArray(row) ? [row as VegaRangedRow] : [];
    });
}

type UnitLayout = {
  spec: VegaLiteSpec;
  rows: VegaRangedRow[];
  center: Map<number, VegaCenterStackSegment>;
  valueAxis: 'x' | 'y';
};
function unitLayout(spec: VegaLiteSpec): UnitLayout {
  const rows = dataRows(spec);
  const encoding = spec.encoding as Encoding;
  const valueAxis = valueAxisFor(encoding, markDefinition(spec));
  const order = encoding.order ? (Array.isArray(encoding.order) ? encoding.order : [encoding.order]) : [];
  const segments = hasCenterStack(spec)
    ? getVegaCenterStack(rows, {
        groupField: encoding[valueAxis === 'x' ? 'y' : 'x']!.field!,
        valueField: encoding[valueAxis]!.field!,
        seriesField: encoding.color!.field!,
        sort: order.length
          ? order.map(item => ({ field: item.field!, descending: item.sort === 'descending' }))
          : [{ field: encoding.color!.field!, descending: valueAxis === 'y' }],
      })
    : [];
  return { spec, rows, valueAxis, center: new Map(segments.map(segment => [segment.index, segment])) };
}

function layoutValues(layout: UnitLayout, axis: 'x' | 'y'): number[] {
  if (hasCenterStack(layout.spec) && layout.valueAxis === axis) {
    return Array.from(layout.center.values()).flatMap(segment => [segment.start, segment.end]);
  }
  const encoding = layout.spec.encoding as Encoding;
  const channel = encoding[axis];
  const temporal = channel?.type === 'temporal' || channel?.scale?.type === 'time' || channel?.scale?.type === 'utc';
  return layout.rows
    .flatMap(row => [
      numeric(channelValue(channel, row), temporal),
      numeric(channelValue(axis === 'x' ? encoding.x2 : encoding.y2, row), temporal),
    ])
    .filter(Number.isFinite);
}

function sharedPositionDomain(layouts: UnitLayout[], axis: 'x' | 'y'): (string | number | Date)[] {
  const first = layouts.find(layout => layout.spec.encoding?.[axis])!.spec.encoding![axis] as Position;
  if (isDiscrete(first)) {
    return Array.from(
      new Set(
        layouts.flatMap(layout => {
          const channel = layout.spec.encoding![axis] as Position | undefined;
          return channel ? discreteDomain(channel, layout.rows) : [];
        }),
      ),
    );
  }
  const temporal = first.type === 'temporal' || first.scale?.type === 'time' || first.scale?.type === 'utc';
  const values = layouts
    .flatMap(layout => {
      const channel = layout.spec.encoding![axis] as Position | undefined;
      return (
        channel?.scale?.domain?.map(value => numeric(value, temporal)) ?? [
          ...layoutValues(layout, axis),
          ...(!temporal && channel?.scale?.zero !== false ? [0] : []),
        ]
      );
    })
    .filter(Number.isFinite);
  const domain = values.length ? [Math.min(...values), Math.max(...values)] : [0, 1];
  if (first.scale?.domain && numeric(first.scale.domain[0], temporal) > numeric(first.scale.domain[1], temporal)) {
    domain.reverse();
  }
  return temporal ? domain.map(value => new Date(value)) : domain;
}

function unitGeometry(
  layout: UnitLayout,
  width: number,
  height: number,
  domains?: Partial<Record<'x' | 'y', (string | number | Date)[]>>,
): VegaRangedGeometry {
  const { spec, rows, center, valueAxis } = layout;
  const encoding = spec.encoding as Encoding;
  const mark = markDefinition(spec);
  const xScale = positionScale(
    encoding.x,
    encoding.x2,
    rows,
    width,
    false,
    valueAxis === 'x' && hasCenterStack(spec) ? layoutValues(layout, 'x') : [],
    domains?.x,
  );
  const yScale = positionScale(
    encoding.y,
    encoding.y2,
    rows,
    height,
    true,
    valueAxis === 'y' && hasCenterStack(spec) ? layoutValues(layout, 'y') : [],
    domains?.y,
  );
  const xOffset = offsetScale(encoding.xOffset, rows, xScale.discrete ? xScale.bandwidth : width, false);
  const yOffset = offsetScale(encoding.yOffset, rows, yScale.discrete ? yScale.bandwidth : height, true);

  const marks: VegaRangedGeometry['marks'] = [];
  rows.forEach((row, index) => {
    const segment = center.get(index);
    if (hasCenterStack(spec) && !segment) {
      return;
    }
    const dx = xOffset.offset(row);
    const dy = yOffset.offset(row);
    let x1 = xScale.position(encoding.x, row) + dx;
    let y1 = yScale.position(encoding.y, row) + dy;
    let x2 = encoding.x2 ? xScale.position(encoding.x2, row) + dx : x1;
    let y2 = encoding.y2 ? yScale.position(encoding.y2, row) + dy : y1;
    const barWidth =
      mark.width ?? (mark.type === 'tick' ? mark.size : undefined) ?? xOffset.bandwidth ?? xScale.bandwidth;
    const barHeight =
      mark.height ?? (mark.type === 'tick' ? mark.size : undefined) ?? yOffset.bandwidth ?? yScale.bandwidth;
    if (!encoding.x2 && xScale.discrete) {
      x2 = x1 + barWidth;
    } else if (!encoding.x2 && valueAxis !== 'x') {
      x1 -= barWidth / 2;
      x2 = x1 + barWidth;
    } else if (!encoding.x2 && mark.type === 'bar') {
      x2 = xScale.position({ datum: 0 }, row) + dx;
    }
    if (!encoding.y2 && yScale.discrete) {
      y2 = y1 + barHeight;
    } else if (!encoding.y2 && valueAxis !== 'y') {
      y1 -= barHeight / 2;
      y2 = y1 + barHeight;
    } else if (!encoding.y2 && mark.type === 'bar') {
      y2 = yScale.position({ datum: 0 }, row) + dy;
    }
    if (segment) {
      if (valueAxis === 'y') {
        y1 = yScale.position({ datum: segment.end }, row);
        y2 = yScale.position({ datum: segment.start }, row);
      } else {
        x1 = xScale.position({ datum: segment.end }, row);
        x2 = xScale.position({ datum: segment.start }, row);
      }
    }
    if (mark.type === 'tick') {
      const thickness = mark.thickness ?? 1;
      const horizontalTick = mark.orient ? mark.orient === 'horizontal' : valueAxis === 'y';
      if (horizontalTick && !encoding.y2) {
        y1 = yScale.position(encoding.y, row) + dy + (yScale.discrete ? yScale.bandwidth / 2 : 0) - thickness / 2;
        y2 = y1 + thickness;
      } else if (!horizontalTick && !encoding.x2) {
        x1 = xScale.position(encoding.x, row) + dx + (xScale.discrete ? xScale.bandwidth / 2 : 0) - thickness / 2;
        x2 = x1 + thickness;
      }
      if (horizontalTick && xScale.discrete && !encoding.x2) {
        x1 += ((xOffset.bandwidth ?? xScale.bandwidth) - barWidth) / 2;
        x2 = x1 + barWidth;
      } else if (!horizontalTick && yScale.discrete && !encoding.y2) {
        y1 += ((yOffset.bandwidth ?? yScale.bandwidth) - barHeight) / 2;
        y2 = y1 + barHeight;
      }
    }
    if (![x1, y1, x2, y2].every(Number.isFinite)) {
      return;
    }
    // D3 interpolation can leave floating-point tails at exact SVG coordinates.
    // Keep subpixel geometry while serializing deterministic, compact paths.
    [x1, y1, x2, y2] = [x1, y1, x2, y2].map(value => Number(value.toFixed(9)));
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Number(Math.abs(x2 - x1).toFixed(9));
    const h = Number(Math.abs(y2 - y1).toFixed(9));
    const roundedEnd =
      mark.cornerRadiusEnd && mark.type !== 'tick'
        ? valueAxis === 'x'
          ? x1 < x2
            ? 'left'
            : 'right'
          : y1 < y2
          ? 'top'
          : 'bottom'
        : undefined;
    const labels = (['x', 'y'] as const).flatMap(axis => {
      const channel = encoding[axis];
      if (!channel) {
        return [];
      }
      const secondary = axis === 'x' ? encoding.x2 : encoding.y2;
      const value = channelValue(channel, row);
      return [
        `${channel.title ?? channel.field ?? axis}: ${labelValue(value)}${
          secondary ? ` to ${labelValue(channelValue(secondary, row))}` : ''
        }`,
      ];
    });
    for (const channel of [encoding.xOffset, encoding.yOffset, encoding.color]) {
      if (channel?.field) {
        labels.push(`${channel.field}: ${labelValue(readVegaField(row, channel.field))}`);
      }
    }
    marks.push({
      key: String(index),
      row,
      x,
      y,
      width: w,
      height: h,
      x1,
      x2,
      y1,
      y2,
      roundedEnd,
      d: rectanglePath(x, y, w, h, roundedEnd, mark.cornerRadiusEnd),
      ariaLabel: labels.join(', '),
      legend: encoding.color?.field ? scalarText(readVegaField(row, encoding.color.field)) : undefined,
    });
  });
  return { width, height, axes: { x: xScale.axis, y: yScale.axis }, marks };
}

/** Plot-space geometry on shared layer scales; no data preparation or row mutation. */
export function getVegaRangedGeometry(spec: VegaLiteSpec, width: number, height: number): VegaRangedGeometry {
  const empty: VegaRangedGeometry = { width, height, axes: { x: { ticks: [] }, y: { ticks: [] } }, marks: [] };
  if (
    !canRenderVegaRangedSpec(spec) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return empty;
  }
  const units = layerUnits(spec);
  const layouts = units.map(unitLayout);
  if (!spec.layer) {
    return unitGeometry(layouts[0], width, height);
  }
  const domains = Object.fromEntries(
    (['x', 'y'] as const).flatMap(axis =>
      layouts.some(layout => layout.spec.encoding?.[axis]) ? [[axis, sharedPositionDomain(layouts, axis)]] : [],
    ),
  );
  const geometries = layouts.map(layout => unitGeometry(layout, width, height, domains));
  return {
    width,
    height,
    units,
    axes: {
      x: geometries.find((_, index) => units[index].encoding?.x)?.axes.x ?? { ticks: [] },
      y: geometries.find((_, index) => units[index].encoding?.y)?.axes.y ?? { ticks: [] },
    },
    marks: geometries.flatMap((geometry, index) =>
      geometry.marks.map(mark => ({
        ...mark,
        key: `layer-${index}-${mark.key}`,
        spec: units[index],
      })),
    ),
  };
}
