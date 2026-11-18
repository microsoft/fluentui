import { line as d3Line } from 'd3-shape';
import { tokens } from '@fluentui/react-theme';
import { getColorFromToken, getCurveFactory, getNextColor } from '../../utilities/index';
import type { LineChartGap, LineChartPoints } from '../../types/index';
import type {
  LineChartCurveHit,
  LineChartCurvePiece,
  LineChartCurveRepresentation,
  LineChartPlotContext,
  LineChartPosition,
  LineChartProps,
  LineChartRect,
  LineChartResolvedBaselineFill,
  LineChartResolvedPoint,
  LineChartResolvedSegment,
  LineChartResolvedSeries,
  LineChartXValue,
} from './LineChart.types';

const parameterTolerance = 1e-12;

type Polynomial = readonly number[];
type Bounds = { left: number; top: number; right: number; bottom: number };
type PieceData = {
  piece: LineChartCurvePiece;
  x: Polynomial;
  y: Polynomial;
  bounds: Bounds;
};
type HitCandidate = {
  order: number;
  segmentKey?: string;
  piece?: PieceData;
  point?: LineChartPosition;
  start: number;
  end: number;
  bounds: Bounds;
};
type HitNode = { bounds: Bounds; candidates?: HitCandidate[]; left?: HitNode; right?: HitNode };
type HitIndex = { rect: LineChartRect; root?: HitNode };
type SeriesIndex = {
  pointsByX: Map<number | string, LineChartResolvedPoint>;
  pointsByKey: Map<string, LineChartResolvedPoint>;
  hits?: HitIndex;
};

const pieceData = new WeakMap<LineChartCurvePiece, PieceData>();
// Reveal-only frames replace presentation wrappers, not these geometry arrays.
const seriesIndexes = new WeakMap<readonly LineChartResolvedSegment[], SeriesIndex>();
const normalizedGaps = new WeakMap<Readonly<LineChartPoints>, LineChartGap[]>();

function evaluate(polynomial: Polynomial, t: number): number {
  let value = 0;
  for (let i = polynomial.length - 1; i >= 0; i--) {
    value = value * t + polynomial[i];
  }
  return value;
}

function derivative(polynomial: Polynomial): number[] {
  const result: number[] = [];
  for (let i = 1; i < polynomial.length; i++) {
    result.push(i * polynomial[i]);
  }
  return result;
}

/** Isolates all roots, including repeated roots, by the derivative's monotone intervals. */
function roots(polynomial: Polynomial, start: number, end: number): number[] {
  let degree = polynomial.length - 1;
  while (degree > 0 && polynomial[degree] === 0) {
    degree--;
  }
  if (degree === 0) {
    return [];
  }
  if (degree === 1) {
    const root = -polynomial[0] / polynomial[1];
    return root >= start && root <= end ? [root] : [];
  }
  const coefficients = polynomial.slice(0, degree + 1);
  const critical = roots(derivative(coefficients), start, end);
  const boundaries = [start, ...critical, end];
  const result: number[] = [];
  const tolerance = coefficients.reduce((sum, value) => sum + Math.abs(value), 0) * Number.EPSILON * 64;
  const append = (root: number) => {
    if (!result.length || Math.abs(result[result.length - 1] - root) > parameterTolerance) {
      result.push(root);
    }
  };
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    const value = evaluate(coefficients, boundary);
    if (Math.abs(value) <= tolerance) {
      append(boundary);
    }
    if (i === boundaries.length - 1) {
      break;
    }
    let low = boundary;
    let high = boundaries[i + 1];
    let lowValue = value;
    const highValue = evaluate(coefficients, high);
    if ((lowValue < 0 && highValue > 0) || (lowValue > 0 && highValue < 0)) {
      for (let iteration = 0; iteration < 60 && high - low > parameterTolerance; iteration++) {
        const middle = (low + high) / 2;
        const middleValue = evaluate(coefficients, middle);
        if (middleValue === 0) {
          low = high = middle;
        } else if (lowValue < 0 === middleValue < 0) {
          low = middle;
          lowValue = middleValue;
        } else {
          high = middle;
        }
      }
      append((low + high) / 2);
    }
  }
  return result;
}

function coordinatePolynomial(piece: LineChartCurvePiece, coordinate: 'x' | 'y'): number[] {
  const start = piece.start[coordinate];
  const end = piece.end[coordinate];
  if (piece.kind === 'line') {
    return [start, end - start];
  }
  const first = piece.control1[coordinate];
  const second = piece.control2[coordinate];
  return [start, 3 * (first - start), 3 * (start - 2 * first + second), end - start + 3 * (first - second)];
}

function coordinateBounds(polynomial: Polynomial, start: number, end: number): [number, number] {
  let minimum = Math.min(evaluate(polynomial, start), evaluate(polynomial, end));
  let maximum = Math.max(evaluate(polynomial, start), evaluate(polynomial, end));
  for (const t of roots(derivative(polynomial), start, end)) {
    const value = evaluate(polynomial, t);
    minimum = Math.min(minimum, value);
    maximum = Math.max(maximum, value);
  }
  return [minimum, maximum];
}

function intervalBounds(x: Polynomial, y: Polynomial, start: number, end: number): Bounds {
  const [left, right] = coordinateBounds(x, start, end);
  const [top, bottom] = coordinateBounds(y, start, end);
  return { left, right, top, bottom };
}

function getPieceData(piece: LineChartCurvePiece): PieceData {
  let data = pieceData.get(piece);
  if (!data) {
    const x = coordinatePolynomial(piece, 'x');
    const y = coordinatePolynomial(piece, 'y');
    data = { piece, x, y, bounds: intervalBounds(x, y, 0, 1) };
    pieceData.set(piece, data);
  }
  return data;
}

/** Classifies the entire native traversal, not the ordering of cubic control points. */
export function resolveLineChartCurve(pieces: readonly LineChartCurvePiece[]): LineChartCurveRepresentation {
  let increasing = false;
  let decreasing = false;
  for (const piece of pieces) {
    const x = getPieceData(piece).x;
    const extrema = [0, ...roots(derivative(x), 0, 1), 1];
    for (let i = 1; i < extrema.length; i++) {
      const difference = evaluate(x, extrema[i]) - evaluate(x, extrema[i - 1]);
      increasing = increasing || difference > 0;
      decreasing = decreasing || difference < 0;
    }
  }
  return increasing && decreasing
    ? { status: 'unsupported', xDirection: 'unsupported', reason: 'non-monotone-x', pieces }
    : { status: 'supported', xDirection: increasing ? 'increasing' : decreasing ? 'decreasing' : 'constant', pieces };
}

/** Exact bounds include interior extrema of every cubic. */
export function getLineChartCurveBounds(pieces: readonly LineChartCurvePiece[]): LineChartRect {
  if (!pieces.length) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  let bounds = getPieceData(pieces[0]).bounds;
  for (let i = 1; i < pieces.length; i++) {
    bounds = unionBounds(bounds, getPieceData(pieces[i]).bounds);
  }
  return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top };
}

function samePosition(first: LineChartPosition, second: LineChartPosition): boolean {
  return first.x === second.x && first.y === second.y;
}

/** Serializes recorded pieces without rounding, sampling or parsing an SVG path. */
export function getLineChartPath(pieces: readonly LineChartCurvePiece[]): string {
  let path = '';
  let current: LineChartPosition | undefined;
  for (const piece of pieces) {
    if (!current || !samePosition(current, piece.start)) {
      path += `M${piece.start.x},${piece.start.y}`;
    }
    path +=
      piece.kind === 'line'
        ? `L${piece.end.x},${piece.end.y}`
        : `C${piece.control1.x},${piece.control1.y},${piece.control2.x},${piece.control2.y},${piece.end.x},${piece.end.y}`;
    current = piece.end;
  }
  return path;
}

/** D3 writes the actual native commands into this context before any SVG is produced. */
function recordCurve(points: readonly LineChartResolvedPoint[], source: Readonly<LineChartPoints>) {
  const pieces: LineChartCurvePiece[] = [];
  let current: LineChartPosition | undefined;
  let first: LineChartPosition | undefined;
  let path = '';
  const position = (x: number, y: number): LineChartPosition => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error('LineChart curves must emit finite line or cubic coordinates.');
    }
    return { x, y };
  };
  const requireCurrent = () => {
    if (!current) {
      throw new Error('LineChart curves must begin each subpath with moveTo.');
    }
    return current;
  };
  const unsupported = () => {
    throw new Error('The LineChart scene supports only exact line, cubic and quadratic curve commands.');
  };
  const context = {
    moveTo(x: number, y: number) {
      current = first = position(x, y);
      path += `M${x},${y}`;
    },
    lineTo(x: number, y: number) {
      const start = requireCurrent();
      current = position(x, y);
      pieces.push({ kind: 'line', start, end: current });
      path += `L${x},${y}`;
    },
    bezierCurveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
      const start = requireCurrent();
      const control1 = position(x1, y1);
      const control2 = position(x2, y2);
      current = position(x, y);
      pieces.push({ kind: 'cubic', start, control1, control2, end: current });
      path += `C${x1},${y1},${x2},${y2},${x},${y}`;
    },
    quadraticCurveTo(x1: number, y1: number, x: number, y: number) {
      const start = requireCurrent();
      const control = position(x1, y1);
      const end = position(x, y);
      this.bezierCurveTo(
        start.x + (2 / 3) * (control.x - start.x),
        start.y + (2 / 3) * (control.y - start.y),
        end.x + (2 / 3) * (control.x - end.x),
        end.y + (2 / 3) * (control.y - end.y),
        x,
        y,
      );
    },
    closePath() {
      if (first && current && !samePosition(current, first)) {
        pieces.push({ kind: 'line', start: current, end: first });
      }
      current = first;
      path += 'Z';
    },
    arc: unsupported,
    arcTo: unsupported,
    ellipse: unsupported,
    rect: unsupported,
  };
  d3Line<LineChartResolvedPoint>()
    .x(point => point.position.x)
    .y(point => point.position.y)
    .curve(getCurveFactory(source.lineOptions?.curve))
    .context(context as unknown as CanvasRenderingContext2D)(points);
  return { path, pieces };
}

function createSegment(
  key: string,
  points: readonly LineChartResolvedPoint[],
  source: Readonly<LineChartPoints>,
): LineChartResolvedSegment {
  const recorded = recordCurve(points, source);
  const bounds = recorded.pieces.length ? getLineChartCurveBounds(recorded.pieces) : undefined;
  const x = points[0].position.x;
  return {
    key,
    path: recorded.path,
    pointKeys: points.map(point => point.key),
    screenXBounds: bounds ? [bounds.x, bounds.x + bounds.width] : [x, x],
    curve: resolveLineChartCurve(recorded.pieces),
  };
}

function normalizeGaps(source: Readonly<LineChartPoints>): LineChartGap[] {
  const cached = normalizedGaps.get(source);
  if (cached) {
    return cached;
  }
  const gaps = (source.gaps ?? []).map(gap => ({ ...gap }));
  if (source.lineOptions?.connectGaps !== undefined) {
    for (const gap of gaps) {
      if (
        !Number.isInteger(gap.startIndex) ||
        !Number.isInteger(gap.endIndex) ||
        gap.startIndex < 0 ||
        gap.startIndex > gap.endIndex ||
        gap.endIndex >= source.data.length
      ) {
        throw new Error('LineChart gaps must use valid original point index intervals.');
      }
    }
  }
  gaps.sort((first, second) => first.startIndex - second.startIndex);
  const merged: LineChartGap[] = [];
  for (const gap of gaps) {
    const previous = merged[merged.length - 1];
    if (previous && gap.startIndex <= previous.endIndex) {
      previous.endIndex = Math.max(previous.endIndex, gap.endIndex);
    } else {
      merged.push(gap);
    }
  }
  normalizedGaps.set(source, merged);
  return merged;
}

function drawsLines(source: Readonly<LineChartPoints>): boolean {
  return source.lineOptions?.mode === undefined || source.lineOptions.mode.includes('lines');
}

function hasPointTargets(source: Readonly<LineChartPoints>): boolean {
  const mode = source.lineOptions?.mode;
  return mode === undefined || mode.includes('lines') || mode.includes('markers') || mode.includes('text');
}

function identity(key: string, keys: Set<string>, entity: string): string {
  if (typeof key !== 'string' || !key.length || keys.has(key)) {
    throw new Error(`LineChart ${entity} keys must be nonempty and unique.`);
  }
  keys.add(key);
  return key;
}

/** Uses original input indexes and splits edges before any native interpolation. */
export function createLineChartGeometry(
  props: LineChartProps,
  layout: LineChartPlotContext,
  idPrefix: string,
): readonly LineChartResolvedSeries[] {
  const seriesKeys = new Set<string>();
  return (props.data.lineChartData ?? []).map((source, seriesIndex) => {
    const key = identity(props.getSeriesKey?.(source, seriesIndex) ?? `series-${seriesIndex}`, seriesKeys, 'series');
    const scaleKey =
      props.getSeriesYScaleKey?.(source, seriesIndex) ?? (source.useSecondaryYScale ? 'secondaryY' : 'y');
    if (!layout.yScales.some(scale => scale.key === scaleKey)) {
      throw new Error(`Unknown LineChart y scale: ${scaleKey}.`);
    }
    const pointKeys = new Set<string>();
    const points: LineChartResolvedPoint[] = [];
    const segments: LineChartResolvedSegment[] = [];
    const gaps = normalizeGaps(source);
    const cutGaps =
      source.lineOptions?.connectGaps === false ||
      (source.lineOptions?.connectGaps === undefined && !props.optimizeLargeData && !source.lineOptions?.curve);
    let gapIndex = 0;
    let run: LineChartResolvedPoint[] = [];
    const finishRun = () => {
      if (run.length && drawsLines(source)) {
        segments.push(createSegment(`${key}:segment:${run[0].key}`, run, source));
      }
      run = [];
    };
    source.data.forEach((data, dataIndex) => {
      const pointKey = identity(
        props.getPointKey?.(data, source, dataIndex) ?? `point-${dataIndex}`,
        pointKeys,
        'point',
      );
      while (gapIndex < gaps.length && dataIndex > gaps[gapIndex].endIndex) {
        gapIndex++;
      }
      const gap = gaps[gapIndex];
      if (cutGaps && gap && gap.startIndex < dataIndex && dataIndex <= gap.endIndex) {
        finishRun();
      }
      const x = layout.projectX(data.x);
      const y = layout.projectY(scaleKey, data.y);
      if (x === undefined || y === undefined || !Number.isFinite(x) || !Number.isFinite(y)) {
        finishRun();
        return;
      }
      const point = { key: pointKey, dataIndex, data, position: { x, y } };
      points.push(point);
      run.push(point);
    });
    finishRun();
    const color = source.color === undefined ? getNextColor(seriesIndex, 0) : getColorFromToken(source.color);
    const result: LineChartResolvedSeries = {
      key,
      scaleKey,
      data: source,
      phase: 'present',
      capturedLayoutEpoch: layout.layoutEpoch,
      transition: { startMs: 0, durationMs: 0, progress: 1, revealProgress: 1, entranceEndMs: 0, exitDelayMs: 0 },
      stroke: {
        color,
        width: source.lineOptions?.strokeWidth ?? props.strokeWidth ?? 4,
        dashArray: source.lineOptions?.strokeDasharray,
        dashOffset: source.lineOptions?.strokeDashoffset,
        lineCap: source.lineOptions?.strokeLinecap ?? 'round',
        lineJoin: source.lineOptions?.strokeLinejoin ?? 'miter',
        borderWidth: source.lineOptions?.lineBorderWidth,
        borderColor: source.lineOptions?.lineBorderColor ?? tokens.colorNeutralBackground1,
        opacity: source.lineOptions?.strokeOpacity === undefined ? 1 : Number(source.lineOptions.strokeOpacity),
      },
      path: segments.map(segment => segment.path).join(''),
      points,
      segments,
      baselineFill: resolveBaselineFill(
        source,
        segments,
        points,
        layout,
        scaleKey,
        color,
        `${idPrefix}-gradient-${Array.from(key, character => character.codePointAt(0)!.toString(16)).join('-')}`,
      ),
    };
    getSeriesIndex(result, layout.plotRect);
    return result;
  });
}

function resolveBaselineFill(
  source: Readonly<LineChartPoints>,
  segments: readonly LineChartResolvedSegment[],
  points: readonly LineChartResolvedPoint[],
  layout: LineChartPlotContext,
  scaleKey: string,
  color: string,
  gradientId: string | undefined,
): LineChartResolvedBaselineFill | undefined {
  const fill = source.baselineFill;
  if (!fill) {
    return undefined;
  }
  const baseline = layout.projectY(scaleKey, fill.value);
  if (!Number.isFinite(fill.value) || baseline === undefined || !Number.isFinite(baseline)) {
    throw new Error('LineChart baseline fill must have a finite value valid for its y scale.');
  }
  if (fill.opacity !== undefined && (!Number.isFinite(fill.opacity) || fill.opacity < 0 || fill.opacity > 1)) {
    throw new Error('LineChart baseline fill opacity must be between zero and one.');
  }
  if (fill.gradient) {
    const { direction, stops } = fill.gradient;
    if ((direction !== 'horizontal' && direction !== 'vertical') || stops.length < 2) {
      throw new Error('LineChart fill gradients need a direction and at least two ordered stops.');
    }
    let previous = -Infinity;
    for (const stop of stops) {
      if (
        !Number.isFinite(stop.offset) ||
        stop.offset < previous ||
        stop.offset < 0 ||
        stop.offset > 1 ||
        typeof stop.color !== 'string' ||
        !stop.color.length ||
        (stop.opacity !== undefined && (!Number.isFinite(stop.opacity) || stop.opacity < 0 || stop.opacity > 1))
      ) {
        throw new Error('LineChart fill gradients must have valid ordered offsets, colors and opacities.');
      }
      previous = stop.offset;
    }
  }
  const runs = segments
    .filter(segment => segment.screenXBounds[0] !== segment.screenXBounds[1])
    .map(segment => {
      const pieces = segment.curve.pieces;
      const first = pieces[0].start;
      const last = pieces[pieces.length - 1].end;
      return {
        key: `${segment.key}:baseline`,
        path: `${segment.path}L${last.x},${baseline}L${first.x},${baseline}Z`,
        sourceSegmentKeys: [segment.key],
        screenXBounds: segment.screenXBounds,
      };
    });
  return {
    baselineValue: fill.value,
    baselinePosition: baseline,
    color: fill.color === undefined ? color : getColorFromToken(fill.color),
    opacity: fill.opacity ?? 0.2,
    gradientId: fill.gradient ? gradientId : undefined,
    geometry: runs.length
      ? { status: 'ready', runs }
      : {
          status: 'empty',
          reason: points.length ? 'zero-width' : 'no-observations',
        },
  };
}

/** Rebuilds a motion frame from the same native curve and original run topology. */
export function reprojectLineChartSeries(
  series: LineChartResolvedSeries,
  points: readonly LineChartResolvedPoint[],
  layout: LineChartPlotContext,
): LineChartResolvedSeries {
  const byKey = new Map(points.map(point => [point.key, point]));
  const segments = series.segments.map(segment =>
    createSegment(
      segment.key,
      segment.pointKeys.map(key => {
        const point = byKey.get(key);
        if (!point) {
          throw new Error('LineChart motion frames must retain the segment point topology.');
        }
        return point;
      }),
      series.data,
    ),
  );
  return {
    ...series,
    points,
    segments,
    path: segments.map(segment => segment.path).join(''),
    baselineFill: resolveBaselineFill(
      series.data,
      segments,
      points,
      layout,
      series.scaleKey,
      series.stroke.color,
      series.baselineFill?.gradientId,
    ),
  };
}

function unionBounds(first: Bounds, second: Bounds): Bounds {
  return {
    left: Math.min(first.left, second.left),
    right: Math.max(first.right, second.right),
    top: Math.min(first.top, second.top),
    bottom: Math.max(first.bottom, second.bottom),
  };
}

function inside(point: LineChartPosition, rect: LineChartRect): boolean {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

function clippedIntervals(data: PieceData, rect: LineChartRect): [number, number][] {
  const { bounds } = data;
  const right = rect.x + rect.width;
  const bottom = rect.y + rect.height;
  if (bounds.right < rect.x || bounds.left > right || bounds.bottom < rect.y || bounds.top > bottom) {
    return [];
  }
  if (bounds.left >= rect.x && bounds.right <= right && bounds.top >= rect.y && bounds.bottom <= bottom) {
    return [[0, 1]];
  }
  const boundaries = [0, 1];
  for (const [polynomial, edges] of [
    [data.x, [rect.x, rect.x + rect.width]],
    [data.y, [rect.y, rect.y + rect.height]],
  ] as const) {
    for (const edge of edges) {
      const shifted = [...polynomial];
      shifted[0] -= edge;
      boundaries.push(...roots(shifted, 0, 1));
    }
  }
  boundaries.sort((first, second) => first - second);
  const unique = boundaries.filter((value, index) => index === 0 || value - boundaries[index - 1] > parameterTolerance);
  const intervals: [number, number][] = [];
  const isInside = (t: number) => inside({ x: evaluate(data.x, t), y: evaluate(data.y, t) }, rect);
  for (let i = 0; i < unique.length; i++) {
    const start = unique[i];
    const end = unique[i + 1];
    if (end !== undefined && isInside((start + end) / 2)) {
      intervals.push([start, end]);
    } else if (isInside(start)) {
      // A tangent touching the clip edge is still a rendered, eligible position.
      intervals.push([start, start]);
    }
  }
  return intervals;
}

function buildTree(candidates: HitCandidate[]): HitNode | undefined {
  if (!candidates.length) {
    return undefined;
  }
  let bounds = candidates[0].bounds;
  for (let i = 1; i < candidates.length; i++) {
    bounds = unionBounds(bounds, candidates[i].bounds);
  }
  if (candidates.length <= 8) {
    return { bounds, candidates };
  }
  const horizontal = bounds.right - bounds.left >= bounds.bottom - bounds.top;
  candidates.sort((first, second) =>
    horizontal
      ? first.bounds.left + first.bounds.right - second.bounds.left - second.bounds.right
      : first.bounds.top + first.bounds.bottom - second.bounds.top - second.bounds.bottom,
  );
  const middle = Math.floor(candidates.length / 2);
  return { bounds, left: buildTree(candidates.slice(0, middle)), right: buildTree(candidates.slice(middle)) };
}

function xIdentity(x: LineChartXValue): number | string {
  return x instanceof Date ? x.getTime() : x;
}

function getSeriesIndex(series: LineChartResolvedSeries, rect: LineChartRect): SeriesIndex {
  let index = seriesIndexes.get(series.segments);
  if (!index) {
    const pointsByX = new Map<number | string, LineChartResolvedPoint>();
    const pointsByKey = new Map<string, LineChartResolvedPoint>();
    for (const point of series.points) {
      pointsByKey.set(point.key, point);
      const key = xIdentity(point.data.x);
      if (!pointsByX.has(key)) {
        pointsByX.set(key, point);
      }
    }
    index = { pointsByX, pointsByKey };
    seriesIndexes.set(series.segments, index);
  }
  const old = index.hits?.rect;
  if (old && old.x === rect.x && old.y === rect.y && old.width === rect.width && old.height === rect.height) {
    return index;
  }
  const candidates: HitCandidate[] = [];
  let order = 0;
  if (drawsLines(series.data)) {
    for (const segment of series.segments) {
      for (const piece of segment.curve.pieces) {
        const data = getPieceData(piece);
        for (const [start, end] of clippedIntervals(data, rect)) {
          candidates.push({
            order: order++,
            segmentKey: segment.key,
            piece: data,
            start,
            end,
            bounds: intervalBounds(data.x, data.y, start, end),
          });
        }
      }
      if (segment.pointKeys.length === 1) {
        const point = index.pointsByKey.get(segment.pointKeys[0]);
        if (point && inside(point.position, rect)) {
          const { x, y } = point.position;
          candidates.push({
            order: order++,
            point: point.position,
            start: 0,
            end: 0,
            bounds: { left: x, right: x, top: y, bottom: y },
          });
        }
      }
    }
  } else if (hasPointTargets(series.data)) {
    for (const point of series.points) {
      if (inside(point.position, rect)) {
        const { x, y } = point.position;
        candidates.push({
          order: order++,
          point: point.position,
          start: 0,
          end: 0,
          bounds: { left: x, right: x, top: y, bottom: y },
        });
      }
    }
  }
  index.hits = { rect, root: buildTree(candidates) };
  return index;
}

function boundsDistanceSquared(pointer: LineChartPosition, bounds: Bounds): number {
  const x = Math.max(bounds.left - pointer.x, 0, pointer.x - bounds.right);
  const y = Math.max(bounds.top - pointer.y, 0, pointer.y - bounds.bottom);
  return x * x + y * y;
}

function distanceSquared(first: LineChartPosition, second: LineChartPosition): number {
  return (first.x - second.x) ** 2 + (first.y - second.y) ** 2;
}

function equalDistance(first: number, second: number): boolean {
  return (
    first === second ||
    (Number.isFinite(first) &&
      Number.isFinite(second) &&
      Math.abs(first - second) <= Number.EPSILON * 64 * Math.max(1, first, second))
  );
}

function closestPosition(candidate: HitCandidate, pointer: LineChartPosition): LineChartPosition {
  if (!candidate.piece) {
    return candidate.point!;
  }
  const { x, y, piece } = candidate.piece;
  if (piece.kind === 'line') {
    const dx = piece.end.x - piece.start.x;
    const dy = piece.end.y - piece.start.y;
    const lengthSquared = dx * dx + dy * dy;
    const t = lengthSquared
      ? Math.max(
          candidate.start,
          Math.min(
            candidate.end,
            ((pointer.x - piece.start.x) * dx + (pointer.y - piece.start.y) * dy) / lengthSquared,
          ),
        )
      : candidate.start;
    return { x: evaluate(x, t), y: evaluate(y, t) };
  }
  // Stationary squared distance is degree five. Solve all roots, not one Newton basin.
  const stationary = new Array<number>(6).fill(0);
  for (const [polynomial, coordinate] of [
    [x, pointer.x],
    [y, pointer.y],
  ] as const) {
    for (let i = 0; i < polynomial.length; i++) {
      const value = polynomial[i] - (i === 0 ? coordinate : 0);
      for (let j = 1; j < polynomial.length; j++) {
        stationary[i + j - 1] += value * j * polynomial[j];
      }
    }
  }
  let t = candidate.start;
  let best = distanceSquared({ x: evaluate(x, t), y: evaluate(y, t) }, pointer);
  for (const value of [...roots(stationary, candidate.start, candidate.end), candidate.end]) {
    const distance = distanceSquared({ x: evaluate(x, value), y: evaluate(y, value) }, pointer);
    if (distance < best) {
      best = distance;
      t = value;
    }
  }
  return { x: evaluate(x, t), y: evaluate(y, t) };
}

/** Nearest semantic centerline/point in the plot clip, independent of the threshold. */
export function hitTestLineChart(
  series: readonly LineChartResolvedSeries[],
  pointer: LineChartPosition,
  hitRadius: number,
  plotRect: LineChartRect,
  activeX?: LineChartXValue,
): LineChartCurveHit | undefined {
  if (!Number.isFinite(pointer.x) || !Number.isFinite(pointer.y)) {
    return undefined;
  }
  let bestDistance = Infinity;
  let bestOrder = Infinity;
  let bestSeriesIndex = Infinity;
  let hit: LineChartCurveHit | undefined;
  series.forEach((current, currentSeriesIndex) => {
    if (current.phase === 'exit') {
      return;
    }
    const index = getSeriesIndex(current, plotRect);
    const visit = (node: HitNode | undefined) => {
      if (!node) {
        return;
      }
      const nodeDistance = boundsDistanceSquared(pointer, node.bounds);
      if (nodeDistance > bestDistance && !equalDistance(nodeDistance, bestDistance)) {
        return;
      }
      if (node.candidates) {
        for (const candidate of node.candidates) {
          const lowerBound = boundsDistanceSquared(pointer, candidate.bounds);
          if (lowerBound > bestDistance && !equalDistance(lowerBound, bestDistance)) {
            continue;
          }
          const position = closestPosition(candidate, pointer);
          const distance = distanceSquared(position, pointer);
          const tied = equalDistance(distance, bestDistance);
          if (
            !hit ||
            (distance < bestDistance && !tied) ||
            (tied &&
              (currentSeriesIndex < bestSeriesIndex ||
                (currentSeriesIndex === bestSeriesIndex && candidate.order < bestOrder)))
          ) {
            bestDistance = distance;
            bestOrder = candidate.order;
            bestSeriesIndex = currentSeriesIndex;
            hit = {
              seriesKey: current.key,
              segmentKey: candidate.segmentKey,
              pointKey: activeX === undefined ? undefined : index.pointsByX.get(xIdentity(activeX))?.key,
              position,
              distance: Math.sqrt(distance),
              withinRadius: distance <= hitRadius * hitRadius,
            };
          }
        }
      } else {
        const leftDistance = node.left ? boundsDistanceSquared(pointer, node.left.bounds) : Infinity;
        const rightDistance = node.right ? boundsDistanceSquared(pointer, node.right.bounds) : Infinity;
        visit(leftDistance <= rightDistance ? node.left : node.right);
        visit(leftDistance <= rightDistance ? node.right : node.left);
      }
    };
    visit(index.hits?.root);
  });
  return hit;
}
