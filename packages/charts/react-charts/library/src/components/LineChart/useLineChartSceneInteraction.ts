'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { hitTestLineChart } from './lineChartGeometry';
import type {
  LineChartCurveHit,
  LineChartInteractionChange,
  LineChartInteractionState,
  LineChartPlotContext,
  LineChartPointReference,
  LineChartPosition,
  LineChartProps,
  LineChartResolvedInspection,
  LineChartResolvedPoint,
  LineChartResolvedSeries,
  LineChartXValue,
} from './LineChart.types';

type IndexedPoint = {
  reference: LineChartPointReference;
  point: LineChartResolvedPoint;
  series: LineChartResolvedSeries;
};

type InteractionIndex = {
  series: readonly LineChartResolvedSeries[];
  points: readonly IndexedPoint[];
  bySeries: ReadonlyMap<string, ReadonlyMap<string, IndexedPoint>>;
  byX: ReadonlyMap<string, readonly IndexedPoint[]>;
  hitCache: WeakMap<Pointer, { radius: number; hit: LineChartCurveHit | undefined }>;
  slots: readonly LineChartXValue[];
  slotKeys: ReadonlySet<string>;
};

type ClientTransform = Pick<DOMMatrix, 'a' | 'b' | 'c' | 'd' | 'e' | 'f'>;

type Pointer = { svg: LineChartPosition; client: LineChartPosition };
type FocusedPoint = {
  reference: LineChartPointReference;
  x: LineChartXValue;
  slots: readonly LineChartXValue[];
  node: SVGGElement;
  inspecting: boolean;
};

const emptyState: LineChartInteractionState = {};

function xKey(value: LineChartXValue): string {
  return value instanceof Date ? `date:${value.getTime()}` : `${typeof value}:${value}`;
}

function equalX(a: LineChartXValue | undefined, b: LineChartXValue | undefined): boolean {
  return a === b || (a instanceof Date && b instanceof Date && a.getTime() === b.getTime());
}

function equalReference(a: LineChartPointReference | undefined, b: LineChartPointReference | undefined): boolean {
  return a === b || (!!a && !!b && a.seriesKey === b.seriesKey && a.pointKey === b.pointKey);
}

function equalState(a: LineChartInteractionState, b: LineChartInteractionState): boolean {
  const aKeys = a.emphasizedSeriesKeys ?? [];
  const bKeys = b.emphasizedSeriesKeys ?? [];
  return (
    equalX(a.activeX, b.activeX) &&
    equalReference(a.activePoint, b.activePoint) &&
    aKeys.length === bKeys.length &&
    aKeys.every((key, index) => key === bKeys[index])
  );
}

function findPoint(index: InteractionIndex, reference: LineChartPointReference | undefined): IndexedPoint | undefined {
  return reference ? index.bySeries.get(reference.seriesKey)?.get(reference.pointKey) : undefined;
}

function createIndex(plot: LineChartPlotContext, xValues: LineChartXValue[] | undefined): InteractionIndex {
  const series = plot.series.filter(item => item.phase !== 'exit');
  const points: IndexedPoint[] = [];
  const bySeries = new Map<string, Map<string, IndexedPoint>>();
  const byX = new Map<string, IndexedPoint[]>();
  const observations = new Map<string, LineChartXValue>();
  for (const item of series) {
    const pointMap = new Map<string, IndexedPoint>();
    bySeries.set(item.key, pointMap);
    for (const point of item.points) {
      const indexed = { reference: { seriesKey: item.key, pointKey: point.key }, point, series: item };
      points.push(indexed);
      pointMap.set(point.key, indexed);
      const key = xKey(point.data.x);
      const atX = byX.get(key);
      if (atX) {
        atX.push(indexed);
      } else {
        byX.set(key, [indexed]);
      }
      observations.set(xKey(point.data.x), point.data.x);
    }
  }
  let slots: LineChartXValue[];
  if (xValues !== undefined) {
    slots = [...xValues];
  } else if (plot.xScale.kind === 'category') {
    slots = plot.xScale.domain.filter(value => observations.has(xKey(value)));
  } else {
    slots = [...observations.values()].sort((a, b) => Number(a) - Number(b));
  }
  return { series, points, bySeries, byX, hitCache: new WeakMap(), slots, slotKeys: new Set(slots.map(xKey)) };
}

function normalizeState(state: LineChartInteractionState, index: InteractionIndex): LineChartInteractionState {
  let point = findPoint(index, state.activePoint);
  let activeX = state.activeX;
  if (activeX !== undefined && !index.slotKeys.has(xKey(activeX))) {
    activeX = undefined;
  }
  if (
    point &&
    (!index.slotKeys.has(xKey(point.point.data.x)) ||
      (state.activeX !== undefined && !equalX(state.activeX, point.point.data.x)))
  ) {
    point = undefined;
  }
  if (point && state.activeX === undefined) {
    activeX = point.point.data.x;
  }
  const emphasizedSeriesKeys = state.emphasizedSeriesKeys?.filter(
    (key, position, keys) => index.bySeries.has(key) && keys.indexOf(key) === position,
  );
  const normalized = {
    ...(activeX !== undefined && { activeX }),
    ...(point && { activePoint: point.reference }),
    ...(emphasizedSeriesKeys?.length && { emphasizedSeriesKeys }),
  };
  return equalState(state, normalized) ? state : normalized;
}

function needsStateRepair(state: LineChartInteractionState, normalized: LineChartInteractionState): boolean {
  // A point-only controlled value is valid: its x is implied, not a stale selection.
  return !equalState(
    state.activeX === undefined && state.activePoint && normalized.activePoint
      ? { ...state, activeX: normalized.activeX }
      : state,
    normalized,
  );
}

function equalPosition(a: LineChartPosition | undefined, b: LineChartPosition | undefined): boolean {
  return a === b || (!!a && !!b && a.x === b.x && a.y === b.y);
}

function equalInspection(a: LineChartResolvedInspection, b: LineChartResolvedInspection): boolean {
  return (
    equalPosition(a.pointer, b.pointer) &&
    equalPosition(a.clientPointer, b.clientPointer) &&
    equalPosition(a.anchor?.svg, b.anchor?.svg) &&
    equalPosition(a.anchor?.client, b.anchor?.client) &&
    equalReference(a.focusedPoint, b.focusedPoint) &&
    equalPosition(a.hit?.position, b.hit?.position) &&
    a.hit?.seriesKey === b.hit?.seriesKey &&
    a.hit?.pointKey === b.hit?.pointKey &&
    a.hit?.segmentKey === b.hit?.segmentKey &&
    a.hit?.distance === b.hit?.distance &&
    a.hit?.withinRadius === b.hit?.withinRadius
  );
}

function equalOptions(a: LineChartProps['interactionOptions'], b: LineChartProps['interactionOptions']): boolean {
  const aValues = a?.xValues;
  const bValues = b?.xValues;
  return (
    a?.mode === b?.mode &&
    a?.hitRadius === b?.hitRadius &&
    (aValues === bValues ||
      (!!aValues &&
        !!bValues &&
        aValues.length === bValues.length &&
        aValues.every((value, index) => equalX(value, bValues[index]))))
  );
}

function equalObservations(a: InteractionIndex, b: InteractionIndex): boolean {
  return (
    a.series.length === b.series.length &&
    a.series.every((series, index) => series.key === b.series[index].key) &&
    a.points.length === b.points.length &&
    a.points.every((point, index) => {
      const other = b.points[index];
      return (
        equalReference(point.reference, other.reference) &&
        equalX(point.point.data.x, other.point.data.x) &&
        point.point.data.y === other.point.data.y
      );
    })
  );
}

/** Binary search projected continuous slots; data-order ties remain unchanged in RTL. */
function nearestSlot(
  index: InteractionIndex,
  plot: LineChartPlotContext,
  screenX: number,
): LineChartXValue | undefined {
  const { slots } = index;
  if (!slots.length) {
    return undefined;
  }
  if (plot.xScale.kind === 'category') {
    let result: LineChartXValue | undefined;
    let distance = Infinity;
    for (const slot of slots) {
      const position = plot.projectX(slot);
      if (position !== undefined && Math.abs(position - screenX) < distance) {
        result = slot;
        distance = Math.abs(position - screenX);
      }
    }
    return result;
  }
  const sign = plot.xScale.range[1] >= plot.xScale.range[0] ? 1 : -1;
  let low = 0;
  let high = slots.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const position = plot.projectX(slots[middle]);
    if (position !== undefined && sign * position < sign * screenX) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  const before = low > 0 ? slots[low - 1] : undefined;
  const after = low < slots.length ? slots[low] : undefined;
  const beforePosition = before === undefined ? undefined : plot.projectX(before);
  const afterPosition = after === undefined ? undefined : plot.projectX(after);
  if (beforePosition === undefined) {
    return afterPosition === undefined ? undefined : after;
  }
  return afterPosition === undefined || Math.abs(beforePosition - screenX) <= Math.abs(afterPosition - screenX)
    ? before
    : after;
}

function nearestPointAtX(
  index: InteractionIndex,
  x: LineChartXValue | undefined,
  y?: number,
  seriesKey?: string,
): IndexedPoint | undefined {
  if (x === undefined) {
    return undefined;
  }
  let nearest: IndexedPoint | undefined;
  let distance = Infinity;
  for (const candidate of index.byX.get(xKey(x)) ?? []) {
    if (seriesKey === undefined || seriesKey === candidate.series.key) {
      const nextDistance = y === undefined ? 0 : Math.abs(candidate.point.position.y - y);
      if (nextDistance < distance) {
        nearest = candidate;
        distance = nextDistance;
      }
    }
  }
  return nearest;
}

function insidePlot(position: LineChartPosition, plot: LineChartPlotContext): boolean {
  const rect = plot.plotRect;
  return (
    position.x >= rect.x &&
    position.x <= rect.x + rect.width &&
    position.y >= rect.y &&
    position.y <= rect.y + rect.height
  );
}

function transform(position: LineChartPosition, matrix: ClientTransform): LineChartPosition | undefined {
  const x = matrix.a * position.x + matrix.c * position.y + matrix.e;
  const y = matrix.b * position.x + matrix.d * position.y + matrix.f;
  return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : undefined;
}

function toSvg(svg: SVGSVGElement | null, client: LineChartPosition): LineChartPosition | undefined {
  const matrix = svg?.getScreenCTM?.();
  if (!matrix) {
    return undefined;
  }
  try {
    return transform(client, matrix.inverse());
  } catch {
    // A detached or singular SVG has no usable coordinate conversion.
    return undefined;
  }
}

function curveHit(
  props: LineChartProps,
  plot: LineChartPlotContext,
  index: InteractionIndex,
  pointer: Pointer,
): LineChartCurveHit | undefined {
  const radius = props.interactionOptions?.hitRadius ?? 12;
  const cached = index.hitCache.get(pointer);
  if (cached && cached.radius === radius) {
    return cached.hit;
  }
  const hit = hitTestLineChart(plot.series, pointer.svg, radius, plot.plotRect);
  index.hitCache.set(pointer, { radius, hit });
  return hit;
}

function resolvePointer(
  props: LineChartProps,
  plot: LineChartPlotContext,
  index: InteractionIndex,
  pointer: Pointer | undefined,
  state: LineChartInteractionState,
): LineChartInteractionState {
  const emphasizedSeriesKeys = state.emphasizedSeriesKeys;
  if (!pointer || !insidePlot(pointer.svg, plot)) {
    return emphasizedSeriesKeys?.length ? { emphasizedSeriesKeys } : emptyState;
  }
  const hit = props.interactionOptions?.mode === 'nearest-series' ? curveHit(props, plot, index, pointer) : undefined;
  if (props.interactionOptions?.mode === 'nearest-series' && !hit) {
    return emphasizedSeriesKeys?.length ? { emphasizedSeriesKeys } : emptyState;
  }
  const activeX = nearestSlot(index, plot, pointer.svg.x);
  const point = nearestPointAtX(index, activeX, pointer.svg.y, hit?.seriesKey);
  return {
    ...(activeX !== undefined && { activeX }),
    ...(point && { activePoint: point.reference }),
    ...(emphasizedSeriesKeys?.length && { emphasizedSeriesKeys }),
  };
}

function resolveInspection(
  props: LineChartProps,
  plot: LineChartPlotContext,
  index: InteractionIndex,
  state: LineChartInteractionState,
  pointer: Pointer | undefined,
  focused: FocusedPoint | undefined,
  clientTransform: ClientTransform | undefined,
): LineChartResolvedInspection {
  let hit: LineChartCurveHit | undefined;
  if (pointer && insidePlot(pointer.svg, plot)) {
    hit = curveHit(props, plot, index, pointer);
    const measured = hit && nearestPointAtX(index, state.activeX, undefined, hit.seriesKey);
    if (hit && measured) {
      hit = { ...hit, pointKey: measured.point.key };
    }
  }
  const physicalPoint = findPoint(index, focused?.reference);
  const point = focused?.inspecting ? physicalPoint : findPoint(index, state.activePoint);
  let anchorPosition = point && insidePlot(point.point.position, plot) ? point.point.position : undefined;
  if (!anchorPosition && hit) {
    const x =
      props.interactionOptions?.mode !== 'nearest-series' && state.activeX !== undefined
        ? plot.projectX(state.activeX)
        : undefined;
    const slotAnchor = x === undefined ? undefined : { x, y: hit.position.y };
    anchorPosition = slotAnchor && insidePlot(slotAnchor, plot) ? slotAnchor : hit.position;
  }
  const client = anchorPosition && clientTransform ? transform(anchorPosition, clientTransform) : undefined;
  return {
    ...(hit && { hit }),
    ...(pointer && { pointer: pointer.svg, clientPointer: pointer.client }),
    ...(anchorPosition && client && { anchor: { svg: anchorPosition, client } }),
    ...(physicalPoint && { focusedPoint: physicalPoint.reference }),
  };
}

function pointHost(svg: SVGSVGElement | null, reference: LineChartPointReference): SVGGElement | undefined {
  const nodes = svg?.querySelectorAll<SVGGElement>('[data-line-chart-series-key][data-line-chart-point-key]');
  if (nodes) {
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (
        node.getAttribute('data-line-chart-series-key') === reference.seriesKey &&
        node.getAttribute('data-line-chart-point-key') === reference.pointKey &&
        node.tabIndex >= 0 &&
        !node.closest('[aria-hidden="true"]')
      ) {
        return node;
      }
    }
  }
  return undefined;
}

function eligiblePoints(index: InteractionIndex, svg: SVGSVGElement | null): readonly IndexedPoint[] {
  const eligible = new Set<IndexedPoint>();
  const nodes = svg?.querySelectorAll<SVGGElement>('[data-line-chart-series-key][data-line-chart-point-key]');
  if (nodes) {
    for (let position = 0; position < nodes.length; position++) {
      const node = nodes[position];
      if (node.tabIndex < 0 || node.closest('[aria-hidden="true"]')) {
        continue;
      }
      const point = index.bySeries
        .get(node.getAttribute('data-line-chart-series-key')!)
        ?.get(node.getAttribute('data-line-chart-point-key')!);
      if (point) {
        eligible.add(point);
      }
    }
  }
  return index.points.filter(point => eligible.has(point));
}

function nearestSurvivor(
  index: InteractionIndex,
  focused: FocusedPoint,
  svg: SVGSVGElement | null,
): IndexedPoint | undefined {
  const surviving = findPoint(index, focused.reference);
  if (surviving && pointHost(svg, surviving.reference)) {
    return surviving;
  }
  const eligible = eligiblePoints(index, svg);
  const sameSeries = eligible.filter(point => point.series.key === focused.reference.seriesKey);
  const candidates = sameSeries.length ? sameSeries : eligible;
  let result: IndexedPoint | undefined;
  let distance = Infinity;
  let order = Infinity;
  for (const candidate of candidates) {
    const value = candidate.point.data.x;
    const position = index.slots.findIndex(slot => equalX(slot, value));
    const oldPosition = focused.slots.findIndex(slot => equalX(slot, value));
    const origin = focused.slots.findIndex(slot => equalX(slot, focused.x));
    const nextDistance =
      typeof value === 'string' || typeof focused.x === 'string'
        ? Math.abs((oldPosition < 0 ? position : oldPosition) - origin)
        : Math.abs(Number(value) - Number(focused.x));
    if (nextDistance < distance || (nextDistance === distance && position < order)) {
      result = candidate;
      distance = nextDistance;
      order = position;
    }
  }
  return result;
}

function isCalloutTarget(svg: SVGSVGElement | null, node: Node | null): boolean {
  if (!node || typeof node.nodeType !== 'number') {
    return false;
  }
  const element = node.nodeType === 1 ? (node as Element) : node.parentElement;
  const callout = element?.closest('[data-line-chart-callout]');
  const root = svg?.closest('[data-line-chart-root]');
  return !!callout && !!root && callout.closest('[data-line-chart-root]') === root;
}

/** Owns logical inspection and physical native point focus without adding DOM surfaces. */
export function useLineChartSceneInteraction(
  props: LineChartProps,
  plot: LineChartPlotContext,
  svgRef: React.RefObject<SVGSVGElement | null>,
): {
  state: LineChartInteractionState;
  inspection: LineChartResolvedInspection;
  onPointerMove: React.PointerEventHandler<SVGSVGElement>;
  onPointerLeave: React.PointerEventHandler<SVGSVGElement>;
  onKeyDown: React.KeyboardEventHandler<SVGSVGElement>;
  onPointFocus: (point: LineChartPointReference, event: React.FocusEvent<SVGGElement>) => void;
  onPointBlur: React.FocusEventHandler<SVGGElement>;
  onChartBlur: React.FocusEventHandler<HTMLDivElement>;
  onChartPointerLeave: React.PointerEventHandler<HTMLDivElement>;
  clearInspection: () => void;
} {
  const index = React.useMemo(
    () => createIndex(plot, props.interactionOptions?.xValues),
    [plot.series, plot.xScale, plot.plotRect, props.interactionOptions?.xValues],
  );
  const [uncontrolled, setUncontrolled] = React.useState<LineChartInteractionState>(emptyState);
  const [pointer, setPointer] = React.useState<Pointer>();
  const [focused, setFocused] = React.useState<FocusedPoint>();
  const [, refreshAnchor] = React.useReducer((value: number) => value + 1, 0);
  const [clientTransform, setClientTransform] = React.useState<ClientTransform>();
  const clientTransformRef = React.useRef<ClientTransform | undefined>(undefined);
  const pointerRef = React.useRef(pointer);
  const focusedRef = React.useRef(focused);
  const reconciling = React.useRef(false);
  const rawState = props.interactionState === undefined ? uncontrolled : props.interactionState;
  const state = normalizeState(rawState, index);
  const inspection = resolveInspection(props, plot, index, state, pointer, focused, clientTransform);
  const previous = React.useRef<
    | {
        plot: LineChartPlotContext;
        index: InteractionIndex;
        options: LineChartProps['interactionOptions'];
      }
    | undefined
  >(undefined);
  const invalidState = React.useRef<
    | {
        raw: LineChartInteractionState;
        normalized: LineChartInteractionState;
      }
    | undefined
  >(undefined);
  const lastNotification = React.useRef<
    | {
        state: LineChartInteractionState;
        inspection: LineChartResolvedInspection;
      }
    | undefined
  >(undefined);
  const committedInspection = React.useRef<LineChartResolvedInspection | undefined>(undefined);

  const updateClientTransform = useEventCallback(() => {
    const matrix = svgRef.current?.getScreenCTM?.();
    const previousTransform = clientTransformRef.current;
    if (
      (!matrix && !previousTransform) ||
      (matrix &&
        previousTransform &&
        matrix.a === previousTransform.a &&
        matrix.b === previousTransform.b &&
        matrix.c === previousTransform.c &&
        matrix.d === previousTransform.d &&
        matrix.e === previousTransform.e &&
        matrix.f === previousTransform.f)
    ) {
      return previousTransform;
    }
    const next = matrix ? { a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f } : undefined;
    clientTransformRef.current = next;
    setClientTransform(next);
    return next;
  });

  const emit = useEventCallback(
    (
      next: LineChartInteractionState,
      reason: LineChartInteractionChange['reason'],
      nextPointer: Pointer | undefined = pointerRef.current,
      nextFocused: FocusedPoint | undefined = focusedRef.current,
    ) => {
      const normalized = normalizeState(next, index);
      if (props.interactionState === undefined) {
        setUncontrolled(current => (equalState(current, normalized) ? current : normalized));
      }
      const nextInspection = resolveInspection(
        props,
        plot,
        index,
        normalized,
        nextPointer,
        nextFocused,
        svgRef.current?.getScreenCTM?.() ?? undefined,
      );
      lastNotification.current = { state: normalized, inspection: nextInspection };
      props.onInteractionChange?.({
        frameId: plot.frameId,
        geometryVersion: plot.geometryVersion,
        layoutEpoch: plot.layoutEpoch,
        state: normalized,
        reason,
        inspection: nextInspection,
      });
    },
  );

  const storePointer = useEventCallback((next: Pointer | undefined) => {
    pointerRef.current = next;
    setPointer(next);
  });
  const refreshPointerTransform = useEventCallback(() => {
    const current = pointerRef.current;
    if (!current) {
      return false;
    }
    const position = toSvg(svgRef.current, current.client);
    if (equalPosition(position, current.svg)) {
      return false;
    }
    storePointer(position ? { svg: position, client: current.client } : undefined);
    return true;
  });
  const storeFocus = useEventCallback((next: FocusedPoint | undefined) => {
    focusedRef.current = next;
    setFocused(next);
  });
  const focusState = useEventCallback(
    (point: IndexedPoint): LineChartInteractionState => ({
      activeX: point.point.data.x,
      activePoint: point.reference,
      ...(state.emphasizedSeriesKeys?.length && { emphasizedSeriesKeys: state.emphasizedSeriesKeys }),
    }),
  );

  const onPointerMove = useEventCallback((event: React.PointerEvent<SVGSVGElement>) => {
    const client = { x: event.clientX, y: event.clientY };
    const position = toSvg(svgRef.current, client);
    if (!position) {
      return;
    }
    const next = { svg: position, client };
    storePointer(next);
    emit(resolvePointer(props, plot, index, next, state), 'pointer', next);
  });

  const leaveInspection = useEventCallback((retainCallout: boolean) => {
    storePointer(undefined);
    const physical = focusedRef.current;
    const point =
      physical?.inspecting && pointHost(svgRef.current, physical.reference)
        ? findPoint(index, physical.reference)
        : undefined;
    const next = point
      ? focusState(point)
      : retainCallout
      ? state
      : resolvePointer(props, plot, index, undefined, state);
    const nextInspection = resolveInspection(
      props,
      plot,
      index,
      next,
      undefined,
      physical,
      svgRef.current?.getScreenCTM?.() ?? undefined,
    );
    const last = lastNotification.current;
    if (!last || !equalState(last.state, next) || !equalInspection(last.inspection, nextInspection)) {
      emit(next, 'leave', undefined);
    }
  });

  const onPointerLeave = useEventCallback((event: React.PointerEvent<SVGSVGElement>) => {
    const related = event.relatedTarget as Node | null;
    if (related && typeof related.nodeType === 'number' && svgRef.current?.contains(related)) {
      return;
    }
    leaveInspection(
      isCalloutTarget(svgRef.current, related) ||
        isCalloutTarget(svgRef.current, svgRef.current?.ownerDocument.activeElement ?? null),
    );
  });

  const onChartPointerLeave = useEventCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const related = event.relatedTarget as Node | null;
    if (related && typeof related.nodeType === 'number' && event.currentTarget.contains(related)) {
      return;
    }
    leaveInspection(isCalloutTarget(svgRef.current, svgRef.current?.ownerDocument.activeElement ?? null));
  });

  const onPointFocus = useEventCallback((reference: LineChartPointReference, event: React.FocusEvent<SVGGElement>) => {
    const point = findPoint(index, reference);
    if (!point || pointHost(svgRef.current, reference) !== event.currentTarget) {
      return;
    }
    const next = {
      reference: point.reference,
      x: point.point.data.x,
      slots: index.slots,
      node: event.currentTarget,
      inspecting: true,
    };
    storeFocus(next);
    if (!reconciling.current) {
      emit(focusState(point), 'focus', pointerRef.current, next);
    }
  });

  const onPointBlur = useEventCallback((event: React.FocusEvent<SVGGElement>) => {
    const related = event.relatedTarget as Element | null;
    if (related && typeof related.nodeType === 'number' && event.currentTarget.contains(related)) {
      return;
    }
    if (reconciling.current) {
      return;
    }
    // Native focus of another point immediately supplies the replacement proposal.
    if (
      related &&
      typeof related.nodeType === 'number' &&
      svgRef.current?.contains(related) &&
      related.closest?.('[data-line-chart-point-key]')
    ) {
      return;
    }
    const root = svgRef.current?.closest('[data-line-chart-root]');
    // The chart-root blur handler owns actual departure, avoiding duplicate proposals.
    if (root && (!related || typeof related.nodeType !== 'number' || !root.contains(related))) {
      return;
    }
    storeFocus(undefined);
    const retainedPointer =
      related && typeof related.nodeType === 'number' && svgRef.current?.contains(related)
        ? pointerRef.current
        : undefined;
    if (!isCalloutTarget(svgRef.current, related)) {
      storePointer(retainedPointer);
    }
    emit(
      isCalloutTarget(svgRef.current, related) ? state : resolvePointer(props, plot, index, retainedPointer, state),
      'blur',
      isCalloutTarget(svgRef.current, related) ? pointerRef.current : retainedPointer,
      undefined,
    );
  });

  const clearChartInspection = useEventCallback((reason: 'escape' | 'blur' | 'leave') => {
    storePointer(undefined);
    const nextFocused = focusedRef.current ? { ...focusedRef.current, inspecting: false } : undefined;
    storeFocus(nextFocused);
    const next = state.emphasizedSeriesKeys?.length ? { emphasizedSeriesKeys: state.emphasizedSeriesKeys } : emptyState;
    const nextInspection = resolveInspection(
      props,
      plot,
      index,
      next,
      undefined,
      nextFocused,
      svgRef.current?.getScreenCTM?.() ?? undefined,
    );
    const last = lastNotification.current;
    if (!last || !equalState(last.state, next) || !equalInspection(last.inspection, nextInspection)) {
      emit(next, reason, undefined, nextFocused);
    }
  });

  const clearInspection = useEventCallback(() => clearChartInspection('leave'));

  const onChartBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const related = event.relatedTarget as Node | null;
    if (reconciling.current) {
      return;
    }
    if (related && typeof related.nodeType === 'number' && event.currentTarget.contains(related)) {
      const element = related.nodeType === 1 ? (related as Element) : related.parentElement;
      const point = element?.closest<SVGGElement>('[data-line-chart-point-key]');
      if (
        !isCalloutTarget(svgRef.current, event.target as Node) ||
        isCalloutTarget(svgRef.current, related) ||
        (point && point.tabIndex >= 0 && !point.closest('[aria-hidden="true"]'))
      ) {
        return;
      }
    }
    storeFocus(undefined);
    clearChartInspection('blur');
  });

  const onKeyDown = useEventCallback((event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === 'Escape') {
      clearChartInspection('escape');
      return;
    }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      return;
    }
    const targetElement = event.target as Element;
    if (targetElement !== svgRef.current && !targetElement.closest?.('[data-line-chart-point-key]')) {
      return;
    }
    const current = findPoint(index, focusedRef.current?.reference);
    let target: IndexedPoint | undefined;
    const eligible = eligiblePoints(index, svgRef.current);
    const ordered = current ? eligible.filter(point => point.series.key === current.series.key) : eligible;
    const currentIndex = current ? ordered.indexOf(current) : -1;
    if (event.key === 'Home' || event.key === 'End') {
      target = ordered[event.key === 'Home' ? 0 : ordered.length - 1];
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const seriesWithPoints = index.series.filter(series => eligible.some(point => point.series === series));
      const seriesIndex = current ? seriesWithPoints.indexOf(current.series) : -1;
      const series =
        seriesWithPoints[
          Math.max(0, Math.min(seriesWithPoints.length - 1, seriesIndex + (event.key === 'ArrowDown' ? 1 : -1)))
        ];
      const candidates = eligible.filter(point => point.series === series);
      target = current
        ? candidates.find(point => equalX(point.point.data.x, current.point.data.x)) ?? candidates[0]
        : eligible[0];
    } else {
      const direction = (event.key === 'ArrowRight' ? 1 : -1) * (plot.isRtl ? -1 : 1);
      target = ordered[Math.max(0, Math.min(ordered.length - 1, currentIndex < 0 ? 0 : currentIndex + direction))];
    }
    const node = target && pointHost(svgRef.current, target.reference);
    if (node) {
      event.preventDefault();
      node.focus();
    }
  });

  useIsomorphicLayoutEffect(() => {
    const old = previous.current;
    previous.current = { plot, index, options: props.interactionOptions };
    const pointerChanged = refreshPointerTransform();
    const committedTransform = updateClientTransform();
    committedInspection.current = resolveInspection(
      props,
      plot,
      index,
      state,
      pointerRef.current,
      focusedRef.current,
      committedTransform,
    );
    if (!equalInspection(inspection, committedInspection.current)) {
      refreshAnchor();
    }
    const currentFocus = focusedRef.current;
    if (
      currentFocus &&
      (!findPoint(index, currentFocus.reference) ||
        pointHost(svgRef.current, currentFocus.reference) !== currentFocus.node)
    ) {
      const replacement = nearestSurvivor(index, currentFocus, svgRef.current);
      const node = replacement && pointHost(svgRef.current, replacement.reference);
      reconciling.current = true;
      try {
        (node ?? svgRef.current)?.focus();
      } finally {
        reconciling.current = false;
      }
      const actual =
        node && (node.ownerDocument.activeElement === node || node.contains(node.ownerDocument.activeElement))
          ? replacement
          : undefined;
      const nextFocus =
        actual && node
          ? { reference: actual.reference, x: actual.point.data.x, slots: index.slots, node, inspecting: true }
          : undefined;
      storeFocus(nextFocus);
      emit(
        actual ? focusState(actual) : resolvePointer(props, plot, index, pointerRef.current, state),
        'focus-reconcile',
        pointerRef.current,
        nextFocus,
      );
      invalidState.current = needsStateRepair(rawState, state) ? { raw: rawState, normalized: state } : undefined;
      return;
    }
    const survivingFocus = findPoint(index, currentFocus?.reference);
    if (
      currentFocus &&
      survivingFocus &&
      (!equalX(currentFocus.x, survivingFocus.point.data.x) ||
        currentFocus.slots.length !== index.slots.length ||
        currentFocus.slots.some((value, position) => !equalX(value, index.slots[position])))
    ) {
      storeFocus({ ...currentFocus, x: survivingFocus.point.data.x, slots: index.slots });
    }
    if (needsStateRepair(rawState, state)) {
      const invalid = invalidState.current;
      invalidState.current = { raw: rawState, normalized: state };
      if (!invalid || !equalState(invalid.raw, rawState) || !equalState(invalid.normalized, state)) {
        const next =
          currentFocus?.inspecting && survivingFocus
            ? focusState(survivingFocus)
            : pointerRef.current
            ? resolvePointer(props, plot, index, pointerRef.current, state)
            : state;
        emit(next, 'data-change');
      }
      return;
    }
    invalidState.current = undefined;
    if (
      old &&
      (pointerChanged ||
        old.plot.geometryVersion !== plot.geometryVersion ||
        old.plot.layoutEpoch !== plot.layoutEpoch ||
        !equalObservations(old.index, index) ||
        !equalOptions(old.options, props.interactionOptions))
    ) {
      const reason =
        !equalObservations(old.index, index) || !equalOptions(old.options, props.interactionOptions)
          ? 'data-change'
          : 'layout';
      const point = currentFocus?.inspecting ? findPoint(index, currentFocus.reference) : undefined;
      const next =
        reason === 'layout'
          ? state
          : point
          ? focusState(point)
          : pointerRef.current
          ? resolvePointer(props, plot, index, pointerRef.current, state)
          : state;
      const nextInspection = resolveInspection(
        props,
        plot,
        index,
        next,
        pointerRef.current,
        focusedRef.current,
        committedTransform,
      );
      const last = lastNotification.current;
      if (
        (pointerChanged ||
          pointerRef.current ||
          currentFocus?.inspecting ||
          inspection.anchor ||
          !equalState(state, next)) &&
        (!last || !equalState(last.state, next) || !equalInspection(last.inspection, nextInspection))
      ) {
        emit(next, reason);
      }
    }
  });

  const onLayout = useEventCallback(() => {
    refreshPointerTransform();
    const committedTransform = updateClientTransform();
    const nextInspection = resolveInspection(
      props,
      plot,
      index,
      state,
      pointerRef.current,
      focusedRef.current,
      committedTransform,
    );
    if (
      (nextInspection.anchor || nextInspection.pointer || committedInspection.current?.pointer) &&
      (!committedInspection.current || !equalInspection(committedInspection.current, nextInspection))
    ) {
      committedInspection.current = nextInspection;
      refreshAnchor();
      emit(state, 'layout');
    }
  });
  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    const document = svg?.ownerDocument;
    const window = document?.defaultView;
    if (!svg || !document || !window) {
      return;
    }
    const onVisibility = () => {
      if (document.hidden) {
        clearChartInspection('blur');
      }
    };
    const onWindowBlur = () => clearChartInspection('blur');
    window.addEventListener('resize', onLayout);
    document.addEventListener('scroll', onLayout, true);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onWindowBlur);
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(onLayout);
    observer?.observe(svg);
    return () => {
      window.removeEventListener('resize', onLayout);
      document.removeEventListener('scroll', onLayout, true);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onWindowBlur);
      observer?.disconnect();
    };
  }, [svgRef, onLayout, clearChartInspection]);

  return {
    state,
    inspection,
    onPointerMove,
    onPointerLeave,
    onKeyDown,
    onPointFocus,
    onPointBlur,
    onChartBlur,
    onChartPointerLeave,
    clearInspection,
  };
}
