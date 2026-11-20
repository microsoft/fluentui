import {
  curveLinear,
  curveStep,
  curveStepBefore,
  curveStepAfter,
  curveBasis,
  curveCardinal,
  curveMonotoneX,
  curveNatural,
} from 'd3-shape';
import type { VegaLitePositionEncoding, VegaLiteSpec } from './VegaLiteTypes';
import { readVegaField } from './VegaLiteField';

export type VegaCenteredAreaPosition = VegaLitePositionEncoding & {
  impute?: null;
  scale?: VegaLitePositionEncoding['scale'] & { clamp?: boolean };
};

/** Shared with geometry so admission and the actual curve implementation cannot drift. */
export const vegaCenteredAreaCurves = {
  linear: curveLinear,
  step: curveStep,
  'step-before': curveStepBefore,
  'step-after': curveStepAfter,
  basis: curveBasis,
  cardinal: curveCardinal,
  monotone: curveMonotoneX,
  natural: curveNatural,
};
type AreaMark = Partial<Exclude<NonNullable<VegaLiteSpec['mark']>, string>>;
export const getVegaCenteredAreaMark = (spec: VegaLiteSpec): AreaMark =>
  typeof spec.mark === 'object' ? spec.mark : { type: spec.mark };
const composition = (spec: VegaLiteSpec) =>
  !!(spec.concat || spec.hconcat || spec.vconcat || spec.facet || spec.repeat || spec.spec);
export const getVegaCenteredAreaOrder = (spec: VegaLiteSpec): VegaLitePositionEncoding[] => {
  const order = spec.encoding?.order;
  return order ? (Array.isArray(order) ? order : [order]) : [];
};
export const getVegaCenteredAreaUnits = (spec: VegaLiteSpec): VegaLiteSpec[] =>
  spec.layer?.map(layer => ({
    ...layer,
    data: layer.data ?? spec.data,
    encoding: { ...spec.encoding, ...layer.encoding },
    config: { ...spec.config, ...(layer as VegaLiteSpec).config },
  })) ?? [spec];

function supportedUnit(spec: VegaLiteSpec): boolean {
  const encoding = spec.encoding;
  const x = encoding?.x;
  const y = encoding?.y as VegaCenteredAreaPosition | undefined;
  const color = encoding?.color;
  const definition = getVegaCenteredAreaMark(spec);
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
    (definition.interpolate && !(definition.interpolate in vegaCenteredAreaCurves))
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
  return getVegaCenteredAreaOrder(spec).every(
    item =>
      typeof item.field === 'string' &&
      (item.sort === undefined || item.sort === 'ascending' || item.sort === 'descending'),
  );
}

/** Pure structural predicate shared by preflight, routing and geometry; it never prepares data. */
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
  const units = getVegaCenteredAreaUnits(spec);
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
        clamp: (definition as VegaCenteredAreaPosition).scale?.clamp ?? false,
        range: definition.scale?.range,
        scheme: definition.scale?.scheme,
        sort: channel === 'x' ? (definition as VegaCenteredAreaPosition).sort : undefined,
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
