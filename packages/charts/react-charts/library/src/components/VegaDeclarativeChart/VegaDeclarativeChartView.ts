import type * as React from 'react';
import type { VegaViewPlan, VegaLegendItems } from './VegaDeclarativeChart.types';
import type { VegaLiteSpec, VegaLiteSemanticMode } from './VegaLiteTypes';
import type { VegaViewNode } from './VegaLiteViewTree';
import { getVegaViewSourceSpec } from './VegaLiteViewTree';
import { readVegaField } from './VegaLiteField';
import { getVegaColorFromMap } from './VegaLiteColorAdapter';

const own = (value: unknown, key: string): unknown =>
  value && typeof value === 'object' ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;

function sourceContextAtPath(spec: VegaLiteSpec, path: string): VegaLiteSpec {
  let current = spec;
  const parts = path.split('/').slice(1);
  for (let index = 0; index < parts.length; ) {
    const kind = parts[index++];
    if (kind === 'facet' || kind === 'repeat') {
      current = own(current, 'spec') as VegaLiteSpec;
      index += 2;
    } else {
      current = own(own(current, kind), parts[index++]) as VegaLiteSpec;
    }
  }
  return current;
}

/** Restore author-facing metadata on copies, retaining both input trees and semantic provenance. */
function restoreViewMetadata(
  spec: VegaLiteSpec,
  source: VegaLiteSpec,
  inherited: Record<string, unknown> = {},
): VegaLiteSpec {
  const annotate = (target: unknown, original: unknown): unknown => {
    if (Array.isArray(target)) {
      return target.map((entry, index) =>
        annotate(entry, Array.isArray(original) ? own(original, String(index)) : undefined),
      );
    }
    if (!target || typeof target !== 'object' || !original || typeof original !== 'object') {
      return target;
    }
    const field = own(original, 'field');
    const aggregate = own(original, 'aggregate');
    const unit = own(original, 'timeUnit');
    const definition = { ...(target as Record<string, unknown>) };
    const axisTitle = own(own(original, 'axis'), 'title');
    if (definition.title === undefined && axisTitle !== undefined) {
      definition.title = axisTitle;
    }
    if (
      definition.title === undefined &&
      (aggregate !== undefined || unit !== undefined || (typeof field === 'string' && /[.\[\]\\]/.test(field)))
    ) {
      definition.title =
        aggregate === 'count'
          ? 'Count of Records'
          : typeof aggregate === 'string'
          ? `${aggregate[0].toUpperCase()}${aggregate.slice(1)} of ${typeof field === 'string' ? field : ''}`
          : typeof field === 'string'
          ? field
          : definition.field;
    }
    const unitName = typeof unit === 'string' ? unit : own(unit, 'unit');
    if (definition.format === undefined && typeof unitName === 'string') {
      if (unitName.replace(/^utc/, '') === 'month') {
        definition.format = '%B';
      }
      if (unitName.replace(/^utc/, '') === 'year') {
        definition.format = '%Y';
      }
    }
    if (own(target, 'condition') !== undefined) {
      definition.condition = annotate(own(target, 'condition'), own(original, 'condition'));
    }
    return definition;
  };
  const encoding = { ...inherited, ...(own(source, 'encoding') as Record<string, unknown>) };
  const restored = { ...spec.encoding };
  Object.keys(restored).forEach(channel => {
    Object.defineProperty(restored, channel, {
      value: annotate(own(restored, channel), encoding[channel]),
      enumerable: true,
      configurable: true,
      writable: true,
    });
  });
  return {
    ...spec,
    encoding: restored,
    ...(spec.layer
      ? {
          // Metadata changes do not remove the required mark on a layered unit.
          layer: spec.layer.map(
            (layer, index) => restoreViewMetadata(layer, source.layer?.[index] ?? {}, encoding) as typeof layer,
          ),
        }
      : {}),
  };
}

/** Legacy root units retain native automatic domains; composed views keep the engine's shared domains. */
function legacyUnitSpec(
  spec: VegaLiteSpec,
  original: VegaLiteSpec,
  inherited: Record<string, unknown> = {},
): VegaLiteSpec {
  const authored = { ...inherited, ...(own(original, 'encoding') as Record<string, unknown>) };
  let encoding = { ...spec.encoding };
  for (const channel of ['x', 'y', 'color'] as const) {
    const definition = encoding[channel];
    if (definition?.scale && own(own(authored[channel], 'scale'), 'domain') === undefined) {
      const scale = { ...definition.scale };
      delete scale.domain;
      encoding = { ...encoding, [channel]: { ...definition, scale: Object.keys(scale).length ? scale : undefined } };
    }
  }
  return {
    ...spec,
    encoding,
    ...(spec.layer
      ? {
          layer: spec.layer.map(
            (layer, index) => legacyUnitSpec(layer, original.layer?.[index] ?? {}, authored) as typeof layer,
          ),
        }
      : {}),
  };
}

/** Layer parents are pipeline inputs; rendered data and series belong to the leaf units. */
function viewUnits(spec: VegaLiteSpec): VegaLiteSpec[] {
  return spec.layer?.length ? spec.layer.flatMap(viewUnits) : [spec];
}

/** Union exposed series without crossing an independent color-scale boundary. No input spec is modified. */
export function planVegaDeclarativeChartViews(
  node: VegaViewNode,
  source: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  dark: boolean,
  mode: VegaLiteSemanticMode,
  hideLegend = false,
  composed = false,
): VegaViewPlan {
  if (node.type === 'unit') {
    // Presentation copies are not WeakMap keys. Capture the source first and carry it explicitly.
    const sourceSpec = getVegaViewSourceSpec(node.spec);
    const restored = restoreViewMetadata(node.spec, sourceSpec);
    const units = viewUnits(restored);
    const legends: VegaLegendItems = [];
    if (composed) {
      units.forEach(unit => {
        const color = unit.encoding?.color;
        if (!color?.field || color.legend === null || color.legend?.disable) {
          return;
        }
        const domain = color.type === 'quantitative' || color.type === 'temporal' ? undefined : color.scale?.domain;
        const names = Array.from(
          new Set(
            (domain ?? unit.data?.values?.map(row => readVegaField(row, color.field!)) ?? [])
              .filter(value => value !== undefined && value !== null)
              .map(String),
          ),
        );
        names.forEach(title => {
          legends.push({
            title,
            color: getVegaColorFromMap(
              title,
              colorMap,
              color.scale?.scheme,
              color.scale?.range as string[] | undefined,
              dark,
            ),
          });
        });
      });
    }
    const spec = composed
      ? { ...restored, height: typeof restored.height === 'number' ? restored.height : 300 }
      : restored;
    const legacySource = !composed && mode === 'legacy' ? source : undefined;
    return {
      type: 'unit',
      path: node.path,
      colorMap,
      legends,
      hideLegend: hideLegend || (composed && !units.some(unit => unit.encoding?.color?.field)),
      sourceSpec,
      spec: legacySource ? legacyUnitSpec(spec, legacySource) : spec,
      nativeSpec: composed
        ? { ...sourceSpec, height: spec.height }
        : legacySource
        ? legacyUnitSpec(sourceSpec, legacySource)
        : sourceSpec,
      legacySource,
      composed,
      title: typeof spec.title === 'string' ? spec.title : spec.title?.text,
      empty: !units.some(unit => unit.data?.values?.length),
    };
  }
  const independent =
    own(own(own(sourceContextAtPath(source, node.path), 'resolve'), 'scale'), 'color') === 'independent';
  const children = node.children.map(child =>
    planVegaDeclarativeChartViews(
      child,
      source,
      independent ? { current: new Map<string, string>() } : colorMap,
      dark,
      mode,
      !independent,
      true,
    ),
  );
  const union = new Map<string, VegaLegendItems[number]>();
  if (!independent) {
    children.forEach(child => child.legends.forEach(legend => union.set(legend.title, legend)));
  }
  const columns =
    node.direction === 'horizontal'
      ? node.children.length
      : node.direction === 'vertical'
      ? 1
      : node.columns ?? Math.max(1, node.children.length);
  return {
    type: 'concat',
    path: node.path,
    title: node.title,
    columns: Math.max(1, columns),
    colorMap,
    hideLegend,
    legends: Array.from(union.values()),
    children,
  };
}
