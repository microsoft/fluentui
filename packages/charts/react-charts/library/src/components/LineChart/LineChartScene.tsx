'use client';

import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import { useId, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ScaleTime } from 'd3-scale';
import { tokens } from '@fluentui/react-theme';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';
import type { CustomizedCalloutData, LineChartPoints } from '../../types/index';
import type {
  LineChartMarkerProps,
  LineChartPlotContext,
  LineChartProps,
  LineChartRect,
  LineChartResolvedPoint,
  LineChartResolvedSegment,
  LineChartResolvedSeries,
  LineChartSeriesProps,
} from './LineChart.types';
import { ChartAnnotationLayer } from '../CommonComponents/Annotations/ChartAnnotationLayer';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { useCartesianChartStyles } from '../CommonComponents/useCartesianChartStyles.styles';
import { Legends } from '../Legends/Legends';
import type { Legend } from '../Legends/Legends.types';
import {
  calculateMarkerRadius,
  getColorFromToken,
  getNextColor,
  pointTypes,
  Points,
  useRtl,
} from '../../utilities/index';
import { useImageExport } from '../../utilities/hooks';
import {
  createLineChartLayout,
  getLineChartXAxisTicks,
  getLineChartYScaleTicks,
  setLineChartXAxisTicks,
  setLineChartYScaleTicks,
} from './lineChartScales';
import { createLineChartGeometry } from './lineChartGeometry';
import {
  getLineChartMotionStage,
  getLineChartSeriesPresentation,
  useLineChartSceneMotion,
} from './useLineChartSceneMotion';
import { useLineChartSceneInteraction } from './useLineChartSceneInteraction';
import { LineChartSceneAxis, LineChartSceneRules } from './LineChartSceneAxes';
import { LineChartSceneColorFillBars } from './LineChartSceneColorFillBars';
import { LineChartSceneCaptions } from './LineChartSceneCaptions';
import { getLineChartMarkerPath } from './lineChartMarker';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';
import { useLineChartStyles } from './useLineChartStyles.styles';

const emptyRows: NonNullable<LineChartProps['xAxisLabelRows']> = [];
const emptyLines: LineChartPoints[] = [];
const emptyAnnotations: NonNullable<LineChartProps['annotations']> = [];
const sameX = (left: unknown, right: unknown): boolean =>
  left instanceof Date && right instanceof Date ? +left === +right : left === right;

interface SeriesRecipe {
  stroke: JSXElement | null;
  markers: ReadonlyMap<string, JSXElement | null>;
  gradient?: JSXElement;
  opacity: number;
}

type PointIndex = {
  order: Map<string, number>;
  byX: Map<string, LineChartResolvedPoint[]>;
};
const pointIndexes = new WeakMap<readonly LineChartResolvedPoint[], PointIndex>();
const xKey = (value: unknown): string =>
  value instanceof Date ? `date:${+value}` : `${typeof value}:${String(value)}`;

function getPointIndex(points: readonly LineChartResolvedPoint[]): PointIndex {
  const existing = pointIndexes.get(points);
  if (existing) {
    return existing;
  }
  const result: PointIndex = { order: new Map(), byX: new Map() };
  points.forEach((point, index) => {
    result.order.set(point.key, index);
    const key = xKey(point.data.x);
    const atX = result.byX.get(key);
    if (atX) {
      atX.push(point);
    } else {
      result.byX.set(key, [point]);
    }
  });
  pointIndexes.set(points, result);
  return result;
}

const connectedPointKeys = new WeakMap<readonly LineChartResolvedSegment[], ReadonlySet<string>>();

function connectedPoints(segments: readonly LineChartResolvedSegment[]): ReadonlySet<string> {
  const cached = connectedPointKeys.get(segments);
  if (cached) {
    return cached;
  }
  const result = new Set<string>();
  for (const segment of segments) {
    if (segment.curve.pieces.length) {
      for (const key of segment.pointKeys) {
        result.add(key);
      }
    }
  }
  connectedPointKeys.set(segments, result);
  return result;
}

function supportsPointInteraction(series: LineChartResolvedSeries): boolean {
  return series.data.lineOptions?.mode !== 'none';
}

function inPlot(point: LineChartResolvedPoint, rect: LineChartRect): boolean {
  return (
    point.position.x >= rect.x &&
    point.position.x <= rect.x + rect.width &&
    point.position.y >= rect.y &&
    point.position.y <= rect.y + rect.height
  );
}

function pointXLabel(point: LineChartResolvedPoint, props: LineChartProps): string {
  return (
    point.data.xAxisCalloutData ??
    (point.data.x instanceof Date
      ? formatDateToLocaleString(point.data.x, props.culture, props.useUTC === true || props.useUTC === 'utc')
      : String(point.data.x))
  );
}

function translatedRect(rect: LineChartRect, x: number, y: number): LineChartRect {
  return { ...rect, x: rect.x + x, y: rect.y + y };
}

function requireSeriesPresentation(
  series: LineChartResolvedSeries,
): NonNullable<ReturnType<typeof getLineChartSeriesPresentation>> {
  const presentation = getLineChartSeriesPresentation(series);
  if (!presentation) {
    throw new Error('LineChart: current series presentation metadata is missing.');
  }
  return presentation;
}

/** A nonzero viewBox origin changes the root coordinate basis, not the data domain. */
function translateLayout(layout: LineChartPlotContext, x: number, y: number): LineChartPlotContext {
  if (!x && !y) {
    return layout;
  }
  const result: LineChartPlotContext = {
    ...layout,
    svgRect: translatedRect(layout.svgRect, x, y),
    plotRect: translatedRect(layout.plotRect, x, y),
    markerClipRect: translatedRect(layout.markerClipRect, x, y),
    xScale: { ...layout.xScale, range: [layout.xScale.range[0] + x, layout.xScale.range[1] + x] },
    yScales: layout.yScales.map(scale => ({ ...scale, range: [scale.range[0] + y, scale.range[1] + y] })),
    axes: layout.axes.map(axis => ({
      ...axis,
      rect: translatedRect(axis.rect, x, y),
      ticks: axis.ticks.map(tick => ({ ...tick, position: tick.position + (axis.orientation === 'x' ? x : y) })),
    })),
    xAxisLabelRows: layout.xAxisLabelRows.map(row => ({ ...row, rect: translatedRect(row.rect, x, y) })),
    projectX: value => {
      const position = layout.projectX(value);
      return position === undefined ? undefined : position + x;
    },
    projectY: (key, value) => {
      const position = layout.projectY(key, value);
      return position === undefined ? undefined : position + y;
    },
  };
  setLineChartXAxisTicks(
    result,
    getLineChartXAxisTicks(layout).map(tick => ({ ...tick, position: tick.position + x })),
  );
  for (const scale of layout.yScales) {
    setLineChartYScaleTicks(
      result,
      scale.key,
      getLineChartYScaleTicks(layout, scale.key).map(tick => ({ ...tick, position: tick.position + y })),
    );
  }
  return result;
}

function getViewBox(value: string | undefined, width: number, height: number): [number, number, number, number] {
  if (value === undefined) {
    return [0, 0, width, height];
  }
  const parts = value
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (parts.length !== 4 || parts.some(part => !Number.isFinite(part)) || parts[2] <= 0 || parts[3] <= 0) {
    throw new Error('LineChart: viewBox must contain a finite origin and positive dimensions.');
  }
  return parts as [number, number, number, number];
}

function pointLabel(series: LineChartResolvedSeries, point: LineChartResolvedPoint, props: LineChartProps): string {
  const data = point.data;
  const x = pointXLabel(point, props);
  const y = data.yAxisCalloutData ?? data.y;
  return (
    data.callOutAccessibilityData?.ariaLabel ??
    `${x}. ${series.data.legend}, ${typeof y === 'object' ? Object.values(y).join(', ') : y}.`
  );
}

function defaultSeriesVisual({ series }: LineChartSeriesProps, borderClassName?: string): JSXElement | null {
  const mode = series.data.lineOptions?.mode;
  if (!series.path || (mode !== undefined && !mode.includes('lines'))) {
    return null;
  }
  const options = series.data.lineOptions;
  const path = {
    d: series.path,
    fill: 'none',
    strokeDasharray: series.stroke.dashArray,
    strokeDashoffset: series.stroke.dashOffset,
    strokeLinecap: series.stroke.lineCap,
    strokeLinejoin: series.stroke.lineJoin,
  } as const;
  return (
    <>
      {series.stroke.borderWidth !== undefined && Number.parseFloat(String(series.stroke.borderWidth)) > 0 && (
        <path
          {...path}
          className={borderClassName}
          stroke={series.stroke.borderColor ?? tokens.colorNeutralBackground1}
          strokeWidth={
            Number.parseFloat(String(series.stroke.width)) + 2 * Number.parseFloat(String(series.stroke.borderWidth))
          }
        />
      )}
      <path
        {...path}
        stroke={series.stroke.color}
        strokeWidth={series.stroke.width}
        opacity={series.stroke.opacity}
        className={options?.className}
        style={options?.style}
      />
    </>
  );
}

/** Additive renderer; the exported LineChart keeps its original DOM path when extensions are omitted. */
export const LineChartScene = React.forwardRef<HTMLDivElement, LineChartProps>((props, forwardedRef) => {
  const id = useId('line-scene');
  const rootRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const mergedSvgRef = useMergedRefs(svgRef, props.svgProps?.ref);
  const legendElementRef = React.useRef<HTMLDivElement>(null);
  const rootRefs = useMergedRefs(rootRef, forwardedRef);
  const isRtl = useRtl();
  const cartesianClasses = useCartesianChartStyles(props);
  const lineClasses = useLineChartStyles(props);
  const { chartContainerRef, legendsRef } = useImageExport(props.componentRef, props.hideLegend, false);
  const mergedRootRef = useMergedRefs(rootRefs, chartContainerRef);
  const [size, setSize] = React.useState({ width: props.width ?? 0, height: props.height ?? 350 });
  const [rowHeights, setRowHeights] = React.useState<ReadonlyMap<string, number>>(() => new Map());
  const [axisWidths, setAxisWidths] = React.useState<ReadonlyMap<string, number>>(() => new Map());
  const axisWidthsRef = React.useRef(axisWidths);
  const [selectedTitles, setSelectedTitles] = React.useState<string[]>(() =>
    props.legendProps?.canSelectMultipleLegends
      ? props.legendProps.defaultSelectedLegends ?? []
      : props.legendProps?.defaultSelectedLegend
      ? [props.legendProps.defaultSelectedLegend]
      : [],
  );
  const [hoverTitle, setHoverTitle] = React.useState('');
  const committedRecipes = React.useRef<ReadonlyMap<string, SeriesRecipe>>(new Map());
  const rowRefs = React.useRef(new Map<string, HTMLDivElement>());
  const rows = props.xAxisLabelRows ?? emptyRows;
  const legendProps = props.legendProps;
  const controlledTitles = React.useMemo(
    () =>
      legendProps?.canSelectMultipleLegends
        ? legendProps.selectedLegends
        : legendProps?.selectedLegend === undefined
        ? undefined
        : legendProps.selectedLegend === ''
        ? []
        : [legendProps.selectedLegend],
    [legendProps?.canSelectMultipleLegends, legendProps?.selectedLegends, legendProps?.selectedLegend],
  );
  const titles = controlledTitles ?? selectedTitles;

  const seriesInput = React.useMemo<
    Pick<LineChartProps, 'getSeriesKey' | 'getPointKey' | 'getSeriesYScaleKey'> & {
      lineChartData: LineChartPoints[];
    }
  >(() => {
    const input = props.data.lineChartData ?? emptyLines;
    if (!legendProps?.canSelectMultipleLegends || !titles.length) {
      return {
        lineChartData: input,
        getSeriesKey: props.getSeriesKey,
        getPointKey: props.getPointKey,
        getSeriesYScaleKey: props.getSeriesYScaleKey,
      };
    }
    const indexes = new Map<LineChartPoints, number>();
    const visible: LineChartPoints[] = [];
    input.forEach((series, index) => {
      if (titles.includes(series.legend)) {
        const normalized = series.color === undefined ? { ...series, color: getNextColor(index, 0) } : series;
        indexes.set(normalized, index);
        visible.push(normalized);
      }
    });
    return {
      lineChartData: visible,
      getSeriesKey: series => {
        const index = indexes.get(series)!;
        return props.getSeriesKey?.(input[index], index) ?? `series-${index}`;
      },
      getSeriesYScaleKey: series => {
        const index = indexes.get(series)!;
        return props.getSeriesYScaleKey?.(input[index], index) ?? (series.useSecondaryYScale ? 'secondaryY' : 'y');
      },
      getPointKey: (point, series, index) =>
        props.getPointKey?.(point, input[indexes.get(series)!], index) ?? `point-${index}`,
    };
  }, [
    props.data.lineChartData,
    props.getSeriesKey,
    props.getPointKey,
    props.getSeriesYScaleKey,
    legendProps?.canSelectMultipleLegends,
    titles,
  ]);
  const activeProps: LineChartProps = {
    ...props,
    data: { ...props.data, lineChartData: seriesInput.lineChartData },
    getSeriesKey: seriesInput.getSeriesKey,
    getPointKey: seriesInput.getPointKey,
    getSeriesYScaleKey: seriesInput.getSeriesYScaleKey,
  };
  // Inspection and render-function changes are not geometric inputs. A controlled
  // echo must not rebuild scales, points or paths merely because props is new.
  const geometryProps = React.useMemo(
    () => activeProps,
    [
      activeProps.data.lineChartData,
      activeProps.getSeriesKey,
      activeProps.getPointKey,
      activeProps.getSeriesYScaleKey,
      props.culture,
      props.customDateTimeFormatter,
      props.dateLocalizeOptions,
      props.hideTickOverlap,
      props.margins,
      props.markerClipPadding,
      props.optimizeLargeData,
      props.roundedTicks,
      props.secondaryYAxistitle,
      props.secondaryYScaleOptions,
      props.secondaryYScaleType,
      props.strokeWidth,
      props.tickFormat,
      props.tickValues,
      props.timeFormatLocale,
      props.useUTC,
      props.xAxis,
      props.xAxisCategoryOrder,
      props.xAxisLabelRows,
      props.xAxisTickCount,
      props.xAxisTitle,
      props.xMaxValue,
      props.xMinValue,
      props.xScaleType,
      props.yAxis,
      props.yAxisTickCount,
      props.yAxisTickFormat,
      props.yAxisTickValues,
      props.yAxisTitle,
      props.yMaxValue,
      props.yMinValue,
      props.yScaleType,
      props.yScales,
      props.xAxisAnnotation,
      props.yAxisAnnotation,
      props.titleStyles,
    ],
  );

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const host = props.parentRef ?? root;
    if (!root || !host) {
      return;
    }
    const measure = () => {
      const box = host.getBoundingClientRect();
      const legend = legendElementRef.current;
      const legendStyle = legend ? host.ownerDocument.defaultView?.getComputedStyle(legend) : undefined;
      const legendHeight = props.hideLegend
        ? 0
        : (legend?.getBoundingClientRect().height ?? 0) +
          (Number.parseFloat(legendStyle?.marginTop ?? '0') || 0) +
          (Number.parseFloat(legendStyle?.marginBottom ?? '0') || 0);
      const width = props.width ?? box.width;
      const fullHeight = props.height ?? (box.height > legendHeight ? box.height : 350);
      const height = Math.max(0, fullHeight - legendHeight);
      setSize(previous => (previous.width === width && previous.height === height ? previous : { width, height }));
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    observer?.observe(host);
    if (legendElementRef.current) {
      observer?.observe(legendElementRef.current);
    }
    const ownerWindow = host.ownerDocument.defaultView;
    ownerWindow?.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      ownerWindow?.removeEventListener('resize', measure);
    };
  }, [props.width, props.height, props.parentRef, props.hideLegend]);

  const viewBox = getViewBox(props.svgProps?.viewBox, size.width, size.height);
  const basis = `${size.width}:${size.height}:${viewBox.join(':')}:${isRtl}`;
  const epoch = React.useRef({ basis, value: 0 });
  if (epoch.current.basis !== basis) {
    epoch.current = { basis, value: epoch.current.value + 1 };
  }
  const target = React.useMemo(() => {
    const layout = translateLayout(
      createLineChartLayout(geometryProps, viewBox[2], viewBox[3], isRtl, id, rowHeights, axisWidths),
      viewBox[0],
      viewBox[1],
    );
    const base: LineChartPlotContext = { ...layout, layoutEpoch: epoch.current.value };
    setLineChartXAxisTicks(base, getLineChartXAxisTicks(layout));
    for (const scale of layout.yScales) {
      setLineChartYScaleTicks(base, scale.key, getLineChartYScaleTicks(layout, scale.key));
    }
    const result: LineChartPlotContext = { ...base, series: createLineChartGeometry(geometryProps, base, id) };
    setLineChartXAxisTicks(result, getLineChartXAxisTicks(base));
    for (const scale of result.yScales) {
      setLineChartYScaleTicks(result, scale.key, getLineChartYScaleTicks(base, scale.key));
    }
    return result;
  }, [geometryProps, viewBox[0], viewBox[1], viewBox[2], viewBox[3], isRtl, id, rowHeights, axisWidths, basis]);
  const frame = useLineChartSceneMotion(target, props.motion);
  const semanticPointKeys = React.useMemo(() => {
    const result = new Map<string, ReadonlySet<string>>();
    for (const series of target.series) {
      if (!supportsPointInteraction(series)) {
        continue;
      }
      const keys = new Set<string>();
      for (const point of series.points) {
        if (inPlot(point, target.plotRect)) {
          keys.add(point.key);
        }
      }
      result.set(series.key, keys);
    }
    return result;
  }, [target]);
  const renderFrameId = React.useRef(0);
  const interactionFrame = { ...frame, frameId: ++renderFrameId.current };
  const interaction = useLineChartSceneInteraction(activeProps, interactionFrame, svgRef);
  const plot: LineChartPlotContext = {
    ...interactionFrame,
    interaction: interaction.state,
    inspection: interaction.inspection,
  };
  setLineChartXAxisTicks(plot, getLineChartXAxisTicks(frame));
  for (const scale of frame.yScales) {
    setLineChartYScaleTicks(plot, scale.key, getLineChartYScaleTicks(frame, scale.key));
  }
  const generatedAnnotations = props.getAnnotations?.(plot);
  const annotations = generatedAnnotations?.length
    ? [...(props.annotations ?? emptyAnnotations), ...generatedAnnotations]
    : props.annotations ?? emptyAnnotations;

  const measureAxis = React.useCallback((key: string, value: number, ticks?: ReadonlyMap<string, number>) => {
    const previous = axisWidthsRef.current;
    let changed = Math.abs((previous.get(key) ?? -1) - value) > 0.25;
    if (ticks) {
      for (const [tick, width] of ticks) {
        changed = changed || Math.abs((previous.get(tick) ?? -1) - width) > 0.25;
      }
    }
    if (!changed) {
      return;
    }
    const next = new Map(previous);
    next.set(key, value);
    ticks?.forEach((width, tick) => next.set(tick, width));
    // Several axis effects can report in one commit. Compare with the latest
    // observation before scheduling; updater-only bailouts can still re-render.
    axisWidthsRef.current = next;
    setAxisWidths(next);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      setRowHeights(previous => {
        let next: Map<string, number> | undefined;
        for (const row of rows) {
          if (row.layout !== 'measured') {
            continue;
          }
          const node = rowRefs.current.get(row.key);
          if (!node) {
            continue;
          }
          const height = Math.max(node.scrollHeight, node.getBoundingClientRect().height);
          if (Math.abs((previous.get(row.key) ?? -1) - height) > 0.25) {
            next = next ?? new Map(previous);
            next.set(row.key, height);
          }
        }
        return next ?? previous;
      });
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    rowRefs.current.forEach(node => observer?.observe(node));
    const fonts = rootRef.current?.ownerDocument.fonts;
    fonts?.addEventListener('loadingdone', measure);
    return () => {
      observer?.disconnect();
      fonts?.removeEventListener('loadingdone', measure);
    };
  }, [rows, size.width, props.className]);

  const currentSeries = React.useMemo(() => frame.series.filter(series => series.phase !== 'exit'), [frame.series]);
  const seriesIndexes = React.useMemo(
    () =>
      new Map(
        (props.data.lineChartData ?? []).map((series, index) => [
          props.getSeriesKey?.(series, index) ?? `series-${index}`,
          index,
        ]),
      ),
    [props.data.lineChartData, props.getSeriesKey],
  );
  const maxMarkerSize = React.useMemo(() => {
    let maximum = 0;
    for (const series of activeProps.data.lineChartData ?? []) {
      for (const point of series.data) {
        maximum = Math.max(maximum, point.markerSize ?? 0);
      }
    }
    return maximum;
  }, [activeProps.data.lineChartData]);
  const defaultMarker = (visual: LineChartMarkerProps): JSXElement | null => {
    const { point, series, active, focused } = visual;
    const mode = series.data.lineOptions?.mode;
    if (mode === 'none') {
      return null;
    }
    const index = getPointIndex(series.points).order.get(point.key)!;
    const boundary = index === 0 || index === series.points.length - 1 || series.points.length === 1;
    const isolated = (mode === undefined || mode.includes('lines')) && !connectedPoints(series.segments).has(point.key);
    const inspect = props.interactionOptions?.showDefaultHighlight !== false && (active || focused);
    const show =
      inspect ||
      (!series.data.hideNonActiveDots &&
        (mode?.includes('markers') || isolated || (props.allowMultipleShapesForPoints && boundary)));
    if (!show && !(mode?.includes('text') && point.data.text)) {
      return null;
    }
    const radius = calculateMarkerRadius({
      pointMarkerSize: point.data.markerSize,
      minMarkerSize: 0,
      maxMarkerSize,
      extraMaxPixels: Math.max(0, Math.min(frame.plotRect.width, frame.plotRect.height) / 2),
      isContinuousXY: frame.xScale.kind !== 'category',
      isActive: inspect,
    });
    const color = point.data.markerColor ?? series.stroke.color;
    const seriesIndex = seriesIndexes.get(series.key) ?? 0;
    const shape = props.allowMultipleShapesForPoints ? Math.max(0, seriesIndex) % Object.keys(pointTypes).length : 0;
    const width = (radius * 2) / Math.max(1, pointTypes[shape].widthRatio);
    return (
      <>
        {show &&
          (shape === 0 ? (
            <circle
              cx={point.position.x}
              cy={point.position.y}
              r={radius}
              fill={color}
              stroke={tokens.colorNeutralBackground1}
              strokeWidth={1}
            />
          ) : (
            <path
              d={getLineChartMarkerPath(point.position.x, point.position.y, width, shape)}
              fill={color}
              stroke={tokens.colorNeutralBackground1}
              strokeWidth={1}
            />
          ))}
        {mode?.includes('text') && point.data.text && (
          <text
            x={point.position.x}
            y={point.position.y + radius + 12}
            textAnchor="middle"
            fill={color}
            className={mergeClasses(lineClasses.markerLabel, props.styles?.markerLabel)}
            opacity={getLineChartMotionStage(frame, 'labels', series).revealProgress}
          >
            {point.data.text}
          </text>
        )}
      </>
    );
  };

  const singleTitle = !legendProps?.canSelectMultipleLegends ? titles[0] : undefined;
  const candidateTitle = singleTitle ?? hoverTitle;
  const emphasizedTitle =
    candidateTitle &&
    ((props.data.lineChartData ?? []).some(series => series.legend === candidateTitle) ||
      (props.colorFillBars ?? []).some(bar => bar.legend === candidateTitle))
      ? candidateTitle
      : undefined;
  const emphasis = (series: LineChartResolvedSeries): number =>
    emphasizedTitle && series.data.legend !== emphasizedTitle ? 0.1 : 1;
  const recipes = new Map<string, SeriesRecipe>();
  for (const series of frame.series) {
    const presentation = requireSeriesPresentation(series);
    const old = committedRecipes.current.get(presentation.key);
    if (series.phase === 'exit') {
      if (old) {
        recipes.set(presentation.key, old);
      }
      continue;
    }
    const visual: LineChartSeriesProps = { series, plot };
    const borderClassName = mergeClasses(lineClasses.lineBorder, props.styles?.lineBorder);
    const stroke = props.onRenderSeries
      ? props.onRenderSeries(visual, candidate => (candidate ? defaultSeriesVisual(candidate, borderClassName) : null))
      : defaultSeriesVisual(visual, borderClassName);
    const markers = new Map<string, JSXElement | null>();
    for (const point of series.points) {
      const marker: LineChartMarkerProps = {
        point,
        series,
        plot,
        active: interaction.state.activeX !== undefined && sameX(point.data.x, interaction.state.activeX),
        focused:
          interaction.inspection.focusedPoint?.seriesKey === series.key &&
          interaction.inspection.focusedPoint.pointKey === point.key,
      };
      markers.set(
        point.key,
        props.onRenderMarker
          ? props.onRenderMarker(marker, candidate => (candidate ? defaultMarker(candidate) : null))
          : defaultMarker(marker),
      );
    }
    const gradient =
      series.baselineFill?.gradientId && series.data.baselineFill?.gradient ? (
        <linearGradient
          id={series.baselineFill.gradientId}
          gradientUnits="userSpaceOnUse"
          x1={frame.plotRect.x}
          y1={frame.plotRect.y}
          x2={
            frame.plotRect.x + (series.data.baselineFill.gradient.direction === 'horizontal' ? frame.plotRect.width : 0)
          }
          y2={
            frame.plotRect.y + (series.data.baselineFill.gradient.direction === 'vertical' ? frame.plotRect.height : 0)
          }
        >
          {series.data.baselineFill.gradient.stops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity ?? 1} />
          ))}
        </linearGradient>
      ) : undefined;
    recipes.set(presentation.key, { stroke, markers, gradient, opacity: emphasis(series) });
  }
  useIsomorphicLayoutEffect(() => {
    committedRecipes.current = recipes;
  });

  const strokeHost = (series: LineChartResolvedSeries): JSXElement => {
    const presentation = requireSeriesPresentation(series);
    return (
      <g
        key={`stroke:${presentation.key}`}
        opacity={recipes.get(presentation.key)?.opacity}
        data-line-chart-series={series.key}
        clipPath={`url(#${presentation.plotClipPathId})`}
        mask={series.revealMaskId ? `url(#${series.revealMaskId})` : undefined}
        pointerEvents="none"
        aria-hidden="true"
      >
        {recipes.get(presentation.key)?.stroke}
      </g>
    );
  };
  const fillHost = (series: LineChartResolvedSeries): JSXElement | null => {
    const fill = series.baselineFill;
    if (!fill || fill.geometry.status !== 'ready') {
      return null;
    }
    const presentation = requireSeriesPresentation(series);
    return (
      <g
        key={`fill:${presentation.key}`}
        opacity={recipes.get(presentation.key)?.opacity}
        clipPath={`url(#${presentation.plotClipPathId})`}
        mask={series.revealMaskId ? `url(#${series.revealMaskId})` : undefined}
        pointerEvents="none"
        aria-hidden="true"
      >
        {fill.geometry.runs.map(run => (
          <path
            key={run.key}
            d={run.path}
            fillRule="evenodd"
            fill={fill.gradientId ? `url(#${fill.gradientId})` : fill.color}
            opacity={fill.opacity}
          />
        ))}
      </g>
    );
  };
  const markerHosts = (series: LineChartResolvedSeries): JSXElement => {
    const presentation = requireSeriesPresentation(series);
    const exit = series.phase === 'exit';
    const semanticKeys = semanticPointKeys.get(series.key);
    const hasPoints = !exit && (semanticKeys?.size ?? 0) > 0;
    return (
      <g
        key={`markers:${presentation.key}`}
        clipPath={`url(#${presentation.markerClipPathId})`}
        opacity={recipes.get(presentation.key)?.opacity}
        role={hasPoints ? 'listbox' : undefined}
        aria-label={hasPoints ? series.data.legend : undefined}
        aria-hidden={exit || undefined}
        pointerEvents={exit ? 'none' : undefined}
      >
        {series.points.map(point => {
          const focused =
            !exit &&
            interaction.inspection.focusedPoint?.seriesKey === series.key &&
            interaction.inspection.focusedPoint.pointKey === point.key;
          const reference = { seriesKey: series.key, pointKey: point.key };
          const visible = semanticKeys?.has(point.key) ?? false;
          return (
            <g
              key={point.key}
              data-line-chart-series-key={exit ? undefined : series.key}
              data-line-chart-point-key={exit ? undefined : point.key}
              role={exit || !visible ? undefined : 'option'}
              aria-hidden={exit || !visible || undefined}
              aria-label={exit || !visible ? undefined : pointLabel(series, point, props)}
              aria-selected={
                exit || !visible
                  ? undefined
                  : interaction.state.activePoint?.seriesKey === series.key &&
                    interaction.state.activePoint.pointKey === point.key
              }
              tabIndex={!exit && visible ? 0 : undefined}
              onFocus={exit ? undefined : event => interaction.onPointFocus(reference, event)}
              onBlur={exit ? undefined : interaction.onPointBlur}
              onClick={exit ? undefined : point.data.onDataPointClick}
              onKeyDown={
                exit || !point.data.onDataPointClick
                  ? undefined
                  : event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        point.data.onDataPointClick?.();
                      }
                    }
              }
            >
              <g
                mask={series.revealMaskId ? `url(#${series.revealMaskId})` : undefined}
                pointerEvents="none"
                aria-hidden="true"
              >
                {recipes.get(presentation.key)?.markers.get(point.key)}
              </g>
              {!exit && visible && (
                <circle
                  cx={point.position.x}
                  cy={point.position.y}
                  r={8}
                  fill="transparent"
                  stroke="none"
                  aria-hidden="true"
                />
              )}
              {focused && (
                <circle
                  data-line-chart-focus-ring="true"
                  cx={point.position.x}
                  cy={point.position.y}
                  r={9}
                  fill="none"
                  stroke={tokens.colorStrokeFocus2}
                  strokeWidth={2}
                  pointerEvents="none"
                  aria-hidden="true"
                />
              )}
            </g>
          );
        })}
      </g>
    );
  };

  const layers = props.onRenderPlotLayers?.(plot);
  const activeX = interaction.state.activeX;
  const activePoints =
    activeX === undefined
      ? []
      : currentSeries.flatMap(series =>
          supportsPointInteraction(series)
            ? (getPointIndex(series.points).byX.get(xKey(activeX)) ?? []).map(point => ({ series, point }))
            : [],
        );
  const selectedPoint =
    activePoints.find(
      ({ series, point }) =>
        interaction.state.activePoint?.seriesKey === series.key && interaction.state.activePoint.pointKey === point.key,
    ) ?? activePoints[0];
  const calloutData: CustomizedCalloutData | undefined =
    activeX === undefined
      ? undefined
      : {
          x: activeX,
          values: activePoints.map(({ series, point }) => ({
            legend: series.data.legend,
            y: point.data.y,
            color: series.stroke.color,
            xAxisCalloutData: point.data.xAxisCalloutData,
            yAxisCalloutData: point.data.yAxisCalloutData,
          })),
        };
  const customData: CustomizedCalloutData | undefined =
    props.isCalloutForStack === false && selectedPoint && calloutData
      ? {
          x: calloutData.x,
          values: [
            {
              legend: selectedPoint.series.data.legend,
              y: selectedPoint.point.data.y,
              color: selectedPoint.series.stroke.color,
              xAxisCalloutData: selectedPoint.point.data.xAxisCalloutData,
              yAxisCalloutData: selectedPoint.point.data.yAxisCalloutData,
            },
          ],
        }
      : calloutData;
  const customCallout =
    !props.hideTooltip && customData && activePoints.length
      ? (props.isCalloutForStack === false
          ? props.onRenderCalloutPerDataPoint
          : props.onRenderCalloutPerStack ?? props.onRenderCalloutPerDataPoint)?.(customData)
      : undefined;
  const legendItems = React.useMemo(() => {
    const byTitle = new Map<string, Legend>();
    (props.data.lineChartData ?? []).forEach((series, index) => {
      if (!byTitle.has(series.legend)) {
        byTitle.set(series.legend, {
          title: series.legend,
          color: series.color === undefined ? getNextColor(index, 0) : getColorFromToken(series.color),
          shape:
            series.legendShape ??
            (props.allowMultipleShapesForPoints
              ? (Points[index % Object.keys(pointTypes).length] as Legend['shape'])
              : undefined),
          hoverAction: () => {
            setHoverTitle(series.legend);
            interaction.clearInspection();
          },
          onMouseOutAction: () => setHoverTitle(''),
        });
      }
    });
    (props.colorFillBars ?? []).forEach(bar => {
      byTitle.set(bar.legend, {
        title: bar.legend,
        color: getColorFromToken(bar.color),
        stripePattern: bar.applyPattern,
        hoverAction: () => {
          setHoverTitle(bar.legend);
          interaction.clearInspection();
        },
        onMouseOutAction: () => setHoverTitle(''),
      });
    });
    return [...byTitle.values()];
  }, [props.data.lineChartData, props.allowMultipleShapesForPoints, props.colorFillBars, interaction.clearInspection]);
  const eventScale = React.useMemo(
    () =>
      Object.assign((value: Date | number) => frame.projectX(value) ?? NaN, {
        range: () => [Math.min(...frame.xScale.range), Math.max(...frame.xScale.range)],
      }) as unknown as ScaleTime<number, number>,
    [frame.projectX, frame.xScale],
  );
  const chartLabel =
    props.data.chartTitleAccessibilityData?.ariaLabel ??
    props.data.chartTitle ??
    legendItems.map(legend => legend.title).join(', ');
  const visibleFillBars = React.useMemo(() => {
    const bars = props.colorFillBars ?? [];
    return legendProps?.canSelectMultipleLegends && titles.length
      ? bars.filter(bar => titles.includes(bar.legend))
      : bars;
  }, [props.colorFillBars, legendProps?.canSelectMultipleLegends, titles]);

  // One keyed sibling list preserves the mounted custom subtrees when paint
  // order changes on exit/re-entry. Separate React parents would remount them.
  const seriesPaint: React.ReactNode[] = [
    ...currentSeries.map(fillHost),
    <g key="below-series" aria-hidden="true" pointerEvents="none">
      {layers?.belowSeries}
    </g>,
    ...currentSeries.map(strokeHost),
    ...currentSeries.map(markerHosts),
  ];
  for (const series of frame.series) {
    if (series.phase === 'exit' && recipes.has(requireSeriesPresentation(series).key)) {
      seriesPaint.push(fillHost(series), strokeHost(series), markerHosts(series));
    }
  }

  return (
    <div
      ref={mergedRootRef}
      data-line-chart-root="true"
      onBlur={interaction.onChartBlur}
      onPointerLeave={event => {
        setHoverTitle('');
        interaction.onChartPointerLeave(event);
      }}
      className={mergeClasses(cartesianClasses.root, props.className)}
      role="presentation"
      style={{
        height: props.height === undefined ? undefined : props.height,
        width: props.width === undefined ? '100%' : props.width,
      }}
    >
      <div ref={wrapperRef} className={cartesianClasses.chartWrapper} style={{ position: 'relative' }}>
        <svg
          {...props.svgProps}
          style={{ ...props.svgProps?.style, display: props.svgProps?.style?.display ?? 'block' }}
          ref={mergedSvgRef}
          width={size.width}
          height={size.height}
          viewBox={props.svgProps?.viewBox ?? `0 0 ${size.width} ${size.height}`}
          className={mergeClasses(cartesianClasses.chart, props.svgProps?.className)}
          role={props.svgProps?.role ?? 'region'}
          aria-label={props.svgProps?.['aria-label'] ?? chartLabel}
          tabIndex={props.svgProps?.tabIndex ?? 0}
          onPointerMove={event => {
            interaction.onPointerMove(event);
            props.svgProps?.onPointerMove?.(event);
          }}
          onPointerLeave={event => {
            interaction.onPointerLeave(event);
            props.svgProps?.onPointerLeave?.(event);
          }}
          onKeyDown={event => {
            interaction.onKeyDown(event);
            props.svgProps?.onKeyDown?.(event);
          }}
          onClick={event => {
            const target = event.target as Element;
            const pointHost =
              typeof target.closest === 'function' ? target.closest('[data-line-chart-point-key]') : null;
            if (!pointHost && interaction.inspection.hit?.withinRadius) {
              currentSeries.find(series => series.key === interaction.inspection.hit?.seriesKey)?.data.onLineClick?.();
            }
            props.svgProps?.onClick?.(event);
          }}
        >
          <defs>
            <clipPath id={frame.plotClipPathId}>
              <rect {...frame.plotRect} />
            </clipPath>
            <clipPath id={frame.markerClipPathId}>
              <rect {...frame.markerClipRect} />
            </clipPath>
            {frame.series.map(series => {
              const presentation = requireSeriesPresentation(series);
              const bounds = presentation.markerClipRect;
              const progress = series.transition.revealProgress;
              return (
                <React.Fragment key={presentation.key}>
                  <clipPath id={presentation.plotClipPathId}>
                    <rect {...presentation.plotClipRect} />
                  </clipPath>
                  <clipPath id={presentation.markerClipPathId}>
                    <rect {...presentation.markerClipRect} />
                  </clipPath>
                  {series.revealMaskId && (
                    <mask id={series.revealMaskId} maskUnits="userSpaceOnUse" {...bounds}>
                      <rect
                        x={frame.isRtl ? bounds.x + bounds.width * (1 - progress) : bounds.x}
                        y={bounds.y}
                        width={bounds.width * progress}
                        height={bounds.height}
                        fill="white"
                      />
                    </mask>
                  )}
                  {recipes.get(presentation.key)?.gradient}
                </React.Fragment>
              );
            })}
            {layers?.defs}
          </defs>
          <rect {...frame.plotRect} fill="transparent" pointerEvents="all" aria-hidden="true" />
          <g aria-hidden="true" pointerEvents="none">
            {layers?.belowGrid}
          </g>
          <LineChartSceneRules
            plot={plot}
            options={activeProps}
            gridOpacity={getLineChartMotionStage(frame, 'grid').revealProgress}
            axisOpacity={getLineChartMotionStage(frame, 'axes').revealProgress}
          />
          <LineChartSceneColorFillBars bars={visibleFillBars} plot={plot} id={id} baseline={props.yMinValue ?? 0} />
          <g data-line-chart-series-paint="true">{seriesPaint}</g>
          {activeX !== undefined &&
            props.interactionOptions?.showDefaultGuide !== false &&
            frame.projectX(activeX) !== undefined && (
              <line
                x1={frame.projectX(activeX)}
                x2={frame.projectX(activeX)}
                y1={frame.plotRect.y}
                y2={frame.plotRect.y + frame.plotRect.height}
                clipPath={`url(#${frame.plotClipPathId})`}
                stroke={tokens.colorNeutralForeground1}
                strokeDasharray="5 5"
                pointerEvents="none"
                aria-hidden="true"
              />
            )}
          {props.interactionOptions?.showDefaultHighlight !== false && (
            <g pointerEvents="none" aria-hidden="true" clipPath={`url(#${frame.markerClipPathId})`}>
              {activePoints.map(({ series, point }) => (
                <circle
                  key={`${series.key}:${point.key}`}
                  cx={point.position.x}
                  cy={point.position.y}
                  r={5.5}
                  fill={tokens.colorNeutralBackground1}
                  stroke={point.data.markerColor ?? series.stroke.color}
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
          <g aria-hidden="true" pointerEvents="none">
            {layers?.aboveSeries}
          </g>
          <g opacity={getLineChartMotionStage(frame, 'labels').revealProgress}>
            {frame.axes.map(axis => (
              <LineChartSceneAxis
                key={`${axis.orientation}:${axis.scaleKey}`}
                axis={axis}
                options={activeProps}
                plot={plot}
                titleClassName={mergeClasses(cartesianClasses.axisTitle, props.styles?.axisTitle)}
                onMeasure={measureAxis}
                className={mergeClasses(
                  axis.orientation === 'x' ? cartesianClasses.xAxis : cartesianClasses.yAxis,
                  axis.orientation === 'x' ? props.styles?.xAxis : props.styles?.yAxis,
                )}
              />
            ))}
            {rows.map(row => {
              const resolved = frame.xAxisLabelRows.find(candidate => candidate.key === row.key);
              if (!resolved) {
                return null;
              }
              const visual = { row: resolved, plot, ticks: getLineChartXAxisTicks(frame), pass: 'paint' as const };
              return row.layout === 'reserved' ? (
                <g key={row.key} pointerEvents="none" aria-hidden="true">
                  {row.onRender(visual)}
                </g>
              ) : (
                <foreignObject
                  key={row.key}
                  {...resolved.rect}
                  pointerEvents="none"
                  aria-hidden="true"
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ width: '100%' }}>{row.onRender(visual)}</div>
                </foreignObject>
              );
            })}
          </g>
          {props.eventAnnotationProps && (
            <EventsAnnotation
              {...props.eventAnnotationProps}
              scale={eventScale}
              chartYTop={frame.plotRect.y + (props.eventAnnotationProps.labelHeight ?? 36)}
              chartYBottom={frame.plotRect.y + frame.plotRect.height}
            />
          )}
          <LineChartSceneCaptions
            options={activeProps}
            plot={plot}
            className={mergeClasses(cartesianClasses.axisAnnotation, props.styles?.axisAnnotation)}
          />
        </svg>
        <ChartAnnotationLayer
          annotations={annotations}
          context={{
            plotRect: plot.plotRect,
            svgRect: plot.svgRect,
            isRtl,
            xScale: value => plot.projectX(value) ?? NaN,
            yScalePrimary: value => plot.projectY('y', Number(value)) ?? NaN,
            yScaleSecondary: value => plot.projectY('secondaryY', Number(value)) ?? NaN,
            projectY: plot.projectY,
            yScales: plot.yScales,
            frameId: plot.frameId,
            layoutEpoch: plot.layoutEpoch,
          }}
          plot={plot}
          chartRef={svgRef}
          annotationLayout={props.annotationLayout}
          onRenderAnnotationContent={props.onRenderAnnotationContent}
          onRenderAnnotationConnector={props.onRenderAnnotationConnector}
          className={mergeClasses(cartesianClasses.annotationLayer, props.styles?.annotationLayer)}
        />
        {rows.some(row => row.layout === 'measured') && (
          <div
            aria-hidden="true"
            ref={element => element?.setAttribute('inert', '')}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              pointerEvents: 'none',
              top: 0,
              left: 0,
              width: frame.plotRect.width,
            }}
          >
            {rows
              .filter(row => row.layout === 'measured')
              .map(row => {
                const resolved = frame.xAxisLabelRows.find(candidate => candidate.key === row.key)!;
                return (
                  <div
                    key={row.key}
                    ref={element => {
                      if (element) {
                        rowRefs.current.set(row.key, element);
                      } else {
                        rowRefs.current.delete(row.key);
                      }
                    }}
                    style={{ width: frame.plotRect.width }}
                  >
                    {row.onRender({ row: resolved, ticks: getLineChartXAxisTicks(frame), plot, pass: 'measure' })}
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {!props.hideLegend && (
        <div
          ref={legendElementRef}
          className={mergeClasses(cartesianClasses.legendContainer, props.styles?.legendContainer)}
        >
          <Legends
            legends={legendItems}
            enabledWrapLines={props.enabledLegendsWrapLines}
            overflowText={props.legendsOverflowText}
            {...legendProps}
            legendRef={legendsRef}
            onChange={(selected, event, legend) => {
              const next = selected.slice();
              if (controlledTitles === undefined) {
                setSelectedTitles(next);
              }
              if (legend) {
                const selection = legendProps?.canSelectMultipleLegends ? next : next[0] ?? null;
                (props.data.lineChartData ?? [])
                  .filter(series => series.legend === legend.title)
                  .forEach(series => series.onLegendClick?.(Array.isArray(selection) ? selection.slice() : selection));
                (props.colorFillBars ?? [])
                  .filter(bar => bar.legend === legend.title)
                  .forEach(bar => bar.onLegendClick?.(Array.isArray(selection) ? selection.slice() : selection));
              }
              legendProps?.onChange?.(selected, event, legend);
            }}
          />
        </div>
      )}
      {!props.hideTooltip && selectedPoint && interaction.inspection.anchor && (
        <div data-line-chart-callout="true" className={lineClasses.tooltip}>
          <ChartPopover
            {...props.calloutProps}
            isPopoverOpen
            clickPosition={{ x: interaction.inspection.anchor.client.x, y: interaction.inspection.anchor.client.y }}
            isCalloutForStack={props.isCalloutForStack ?? true}
            isCartesian
            culture={props.culture}
            hoverXValue={pointXLabel(selectedPoint.point, props)}
            XValue={pointXLabel(selectedPoint.point, props)}
            legend={selectedPoint.series.data.legend}
            YValue={
              typeof selectedPoint.point.data.yAxisCalloutData === 'string'
                ? selectedPoint.point.data.yAxisCalloutData
                : selectedPoint.point.data.y
            }
            color={selectedPoint.series.stroke.color}
            descriptionMessage={calloutData ? props.getCalloutDescriptionMessage?.(calloutData) : undefined}
            YValueHover={activePoints.map(({ series, point }) => ({
              legend: series.data.legend,
              y: point.data.y,
              color: series.stroke.color,
              yAxisCalloutData: point.data.yAxisCalloutData,
              callOutAccessibilityData: point.data.callOutAccessibilityData,
            }))}
            customCallout={{
              customizedCallout: customCallout ?? undefined,
              customCalloutProps: customData ? props.calloutPropsPerDataPoint?.(customData) : undefined,
            }}
          />
        </div>
      )}
    </div>
  );
});
LineChartScene.displayName = 'LineChartScene';
