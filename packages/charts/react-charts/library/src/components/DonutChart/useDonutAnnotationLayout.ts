import * as React from 'react';
import type { ChartAnnotation } from '../../types/ChartAnnotation';
import type { ChartAnnotationContext } from '../CommonComponents';
import {
  DEFAULT_ANNOTATION_PADDING,
  DEFAULT_CONNECTOR_END_PADDING,
  DEFAULT_CONNECTOR_START_PADDING,
} from '../CommonComponents/Annotations/useChartAnnotationLayer.styles';

const CSS_SIZE_REGEX = /^(-?\d*\.?\d+)(px|em|rem)?$/i;
const DEFAULT_PADDING_SIDES = Object.freeze({ top: 4, right: 8, bottom: 4, left: 8 });
const DEFAULT_VIEWPORT_FONT_SIZE = 14;
const DEFAULT_LINE_HEIGHT_RATIO = 1.35;
const DEFAULT_VIEWPORT_MAX_WIDTH = 180;
const APPROX_CHAR_WIDTH_RATIO = 0.55;
const ADDITIONAL_MARGIN_SAFETY = 12;
const CONNECTOR_MIN_ARROW_CLEARANCE = 6;
const CONNECTOR_FALLBACK_DIRECTION = Object.freeze({ x: 0, y: -1 });
const LINE_BREAK_REGEX = /<br\s*\/?>(?=\s*)|\n/gi;
const EMPTY_ANNOTATIONS: readonly ChartAnnotation[] = Object.freeze([]);

export type AnnotationViewportPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const ZERO_ANNOTATION_VIEWPORT_PADDING: AnnotationViewportPadding = Object.freeze({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

type AnnotationOverflow = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type DonutViewportLayout = {
  padding: AnnotationViewportPadding;
  svgWidth: number | undefined;
  svgHeight: number | undefined;
  outerRadius: number;
};

type UseDonutAnnotationLayoutOptions = {
  annotations?: readonly ChartAnnotation[];
  width: number | undefined;
  height: number | undefined;
  hideLabels?: boolean;
  isRtl: boolean;
};

export type UseDonutAnnotationLayoutResult = {
  annotationContext?: ChartAnnotationContext;
  annotationViewportPadding: AnnotationViewportPadding;
  hasAnnotationViewportPadding: boolean;
  outerRadius: number;
  plotContainerStyle: React.CSSProperties;
  resolvedSvgWidth: number;
  resolvedSvgHeight: number;
  svgStyle?: React.CSSProperties;
};

const sanitizeAnnotationSegment = (segment: string): string =>
  segment
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const parseCssSizeToPixels = (value: string | undefined): number | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const match = CSS_SIZE_REGEX.exec(value.trim());
  if (!match) {
    return undefined;
  }

  const numeric = Number.parseFloat(match[1]);
  if (!Number.isFinite(numeric)) {
    return undefined;
  }

  const unit = match[2]?.toLowerCase();
  if (!unit || unit === 'px') {
    return numeric;
  }
  if (unit === 'em' || unit === 'rem') {
    return numeric * 16;
  }
  return undefined;
};

const resolvePaddingSides = (padding: string | undefined) => {
  if (typeof padding !== 'string' || padding.trim().length === 0) {
    return { ...DEFAULT_PADDING_SIDES };
  }

  const tokens = padding.trim().split(/\s+/);
  if (tokens.length === 0 || tokens.length > 4) {
    return { ...DEFAULT_PADDING_SIDES };
  }

  const values = tokens.map(token => parseCssSizeToPixels(token));
  if (values.some(value => value === undefined)) {
    return { ...DEFAULT_PADDING_SIDES };
  }

  switch (values.length) {
    case 1: {
      const v = values[0]!;
      return { top: v, right: v, bottom: v, left: v };
    }
    case 2: {
      const [vertical, horizontal] = values as number[];
      return { top: vertical, right: horizontal, bottom: vertical, left: horizontal };
    }
    case 3: {
      const [top, horizontal, bottom] = values as number[];
      return { top, right: horizontal, bottom, left: horizontal };
    }
    case 4: {
      const [top, right, bottom, left] = values as number[];
      return { top, right, bottom, left };
    }
    default:
      return { ...DEFAULT_PADDING_SIDES };
  }
};

const getAnnotationSegments = (text: string): string[] => {
  const rawSegments = text.split(LINE_BREAK_REGEX);
  if (rawSegments.length === 0) {
    return [''];
  }

  const sanitized = rawSegments.map(segment => sanitizeAnnotationSegment(segment));
  return sanitized.length > 0 ? sanitized : [''];
};

const estimateAnnotationSize = (annotation: ChartAnnotation): { width: number; height: number } => {
  const fontSize = parseCssSizeToPixels(annotation.style?.fontSize) ?? DEFAULT_VIEWPORT_FONT_SIZE;
  const maxWidth =
    typeof annotation.layout?.maxWidth === 'number' && Number.isFinite(annotation.layout.maxWidth)
      ? Math.max(annotation.layout.maxWidth, fontSize * 2)
      : DEFAULT_VIEWPORT_MAX_WIDTH;

  const paddingSides = resolvePaddingSides(annotation.style?.padding ?? DEFAULT_ANNOTATION_PADDING);
  const totalHorizontalPadding = paddingSides.left + paddingSides.right;
  const totalVerticalPadding = paddingSides.top + paddingSides.bottom;

  const charWidth = Math.max(fontSize * APPROX_CHAR_WIDTH_RATIO, 4);
  const approxCharsPerLine = Math.max(Math.floor(maxWidth / charWidth), 1);

  const text = typeof annotation.text === 'string' ? annotation.text : String(annotation.text ?? '');
  const segments = getAnnotationSegments(text);
  let lineCount = 0;
  let longestSegmentLength = 0;

  segments.forEach(segment => {
    const length = segment.length;
    longestSegmentLength = Math.max(longestSegmentLength, length);
    if (length === 0) {
      lineCount += 1;
      return;
    }
    lineCount += Math.max(1, Math.ceil(length / approxCharsPerLine));
  });

  if (lineCount === 0) {
    lineCount = 1;
  }

  const lineHeight = Math.max(fontSize * DEFAULT_LINE_HEIGHT_RATIO, fontSize);
  const estimatedContentWidth = Math.min(
    maxWidth,
    Math.max(charWidth * Math.min(longestSegmentLength || approxCharsPerLine, approxCharsPerLine), fontSize * 2),
  );

  return {
    width: Math.max(estimatedContentWidth + totalHorizontalPadding, fontSize * 2 + totalHorizontalPadding),
    height: Math.max(lineCount * lineHeight + totalVerticalPadding, fontSize + totalVerticalPadding),
  };
};

const isViewportRelativeAnnotation = (annotation: ChartAnnotation): boolean => {
  const layout = annotation.layout;
  const coordinates = annotation.coordinates;
  return !!layout && layout.clipToBounds === false && coordinates?.type === 'relative';
};

const normalizeViewportPadding = (value: number | undefined): number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

const resolveViewportAnchor = (
  relative: number,
  containerSize: number,
  paddingStart: number,
  paddingEnd: number,
): number => {
  const effectiveSize = Math.max(containerSize - paddingStart - paddingEnd, 0);
  if (!Number.isFinite(relative)) {
    return paddingStart + effectiveSize / 2;
  }
  if (effectiveSize === 0) {
    return paddingStart;
  }
  return paddingStart + relative * effectiveSize;
};

const estimateViewportAnnotationOverflow = (
  annotation: ChartAnnotation,
  containerWidth: number,
  containerHeight: number,
  padding: AnnotationViewportPadding,
): AnnotationOverflow | undefined => {
  const layout = annotation.layout;
  const coordinates = annotation.coordinates;

  if (!layout || layout.clipToBounds !== false || coordinates?.type !== 'relative') {
    return undefined;
  }

  if (
    typeof containerWidth !== 'number' ||
    !Number.isFinite(containerWidth) ||
    containerWidth <= 0 ||
    typeof containerHeight !== 'number' ||
    !Number.isFinite(containerHeight) ||
    containerHeight <= 0
  ) {
    return undefined;
  }

  if (
    typeof coordinates.x !== 'number' ||
    !Number.isFinite(coordinates.x) ||
    typeof coordinates.y !== 'number' ||
    !Number.isFinite(coordinates.y)
  ) {
    return undefined;
  }

  const { width, height } = estimateAnnotationSize(annotation);

  const offsetX = typeof layout.offsetX === 'number' && Number.isFinite(layout.offsetX) ? layout.offsetX : 0;
  const offsetY = typeof layout.offsetY === 'number' && Number.isFinite(layout.offsetY) ? layout.offsetY : 0;

  const paddingLeft = normalizeViewportPadding(padding.left);
  const paddingRight = normalizeViewportPadding(padding.right);
  const paddingTop = normalizeViewportPadding(padding.top);
  const paddingBottom = normalizeViewportPadding(padding.bottom);

  const anchorX = resolveViewportAnchor(coordinates.x, containerWidth, paddingLeft, paddingRight);
  const anchorY = resolveViewportAnchor(coordinates.y, containerHeight, paddingTop, paddingBottom);

  const pointX = anchorX + offsetX;
  const pointY = anchorY + offsetY;

  const horizontalAlign = layout.align ?? 'center';
  const verticalAlign = layout.verticalAlign ?? 'middle';

  const alignOffsetX = horizontalAlign === 'center' ? -width / 2 : horizontalAlign === 'end' ? -width : 0;
  const alignOffsetY = verticalAlign === 'middle' ? -height / 2 : verticalAlign === 'bottom' ? -height : 0;

  let topLeftX = pointX + alignOffsetX;
  let topLeftY = pointY + alignOffsetY;

  let displayX = topLeftX - alignOffsetX;
  let displayY = topLeftY - alignOffsetY;

  if (annotation.connector) {
    const startPadding =
      typeof annotation.connector.startPadding === 'number' && Number.isFinite(annotation.connector.startPadding)
        ? annotation.connector.startPadding
        : DEFAULT_CONNECTOR_START_PADDING;
    const endPadding =
      typeof annotation.connector.endPadding === 'number' && Number.isFinite(annotation.connector.endPadding)
        ? annotation.connector.endPadding
        : DEFAULT_CONNECTOR_END_PADDING;

    const minDistance = Math.max(startPadding + endPadding + CONNECTOR_MIN_ARROW_CLEARANCE, startPadding);
    const dx = displayX - anchorX;
    const dy = displayY - anchorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      const unitX = distance === 0 ? CONNECTOR_FALLBACK_DIRECTION.x : dx / distance;
      const unitY = distance === 0 ? CONNECTOR_FALLBACK_DIRECTION.y : dy / distance;

      displayX = anchorX + unitX * minDistance;
      displayY = anchorY + unitY * minDistance;

      topLeftX = displayX + alignOffsetX;
      topLeftY = displayY + alignOffsetY;
    }
  }

  const left = topLeftX;
  const right = topLeftX + width;
  const top = topLeftY;
  const bottom = topLeftY + height;

  return {
    left: left < 0 ? -left : 0,
    right: right > containerWidth ? right - containerWidth : 0,
    top: top < 0 ? -top : 0,
    bottom: bottom > containerHeight ? bottom - containerHeight : 0,
  };
};

const hasViewportAnnotation = (annotations: readonly ChartAnnotation[] | undefined): boolean => {
  if (!annotations || annotations.length === 0) {
    return false;
  }

  return annotations.some(annotation => isViewportRelativeAnnotation(annotation));
};

const computeAnnotationViewportPadding = (
  annotations: readonly ChartAnnotation[] | undefined,
  width: number | undefined,
  height: number | undefined,
  outerRadius: number,
): AnnotationViewportPadding => {
  if (!hasViewportAnnotation(annotations)) {
    return ZERO_ANNOTATION_VIEWPORT_PADDING;
  }

  if (
    typeof width !== 'number' ||
    width <= 0 ||
    typeof height !== 'number' ||
    height <= 0 ||
    !Number.isFinite(outerRadius) ||
    outerRadius <= 0
  ) {
    return ZERO_ANNOTATION_VIEWPORT_PADDING;
  }

  let minRelativeX = Number.POSITIVE_INFINITY;
  let maxRelativeX = Number.NEGATIVE_INFINITY;
  let minRelativeY = Number.POSITIVE_INFINITY;
  let maxRelativeY = Number.NEGATIVE_INFINITY;

  annotations?.forEach(annotation => {
    const layout = annotation.layout;
    const coordinates = annotation.coordinates;

    if (!layout || layout.clipToBounds !== false || coordinates?.type !== 'relative') {
      return;
    }

    const { x, y } = coordinates;
    if (typeof x === 'number' && Number.isFinite(x)) {
      minRelativeX = Math.min(minRelativeX, x);
      maxRelativeX = Math.max(maxRelativeX, x);
    }
    if (typeof y === 'number' && Number.isFinite(y)) {
      minRelativeY = Math.min(minRelativeY, y);
      maxRelativeY = Math.max(maxRelativeY, y);
    }
  });

  const hasViewportAnchors = Number.isFinite(minRelativeX) && Number.isFinite(maxRelativeX);
  if (!hasViewportAnchors) {
    return ZERO_ANNOTATION_VIEWPORT_PADDING;
  }

  const clampedDiameter = Math.min(outerRadius * 2, Math.min(width, height));
  const currentVerticalMargin = Math.max((height - clampedDiameter) / 2, 0);
  const currentHorizontalMargin = Math.max((width - clampedDiameter) / 2, 0);

  const desiredTopMargin = Math.max(outerRadius * 0.75, 48);
  const desiredBottomMargin = Math.max(outerRadius * 0.5, 32);
  const desiredHorizontalMargin = Math.max(outerRadius * 0.85, 56);

  const needsTop = minRelativeY < 0;
  const needsBottom = maxRelativeY > 1;
  const needsLeft = minRelativeX < 0.25;
  const needsRight = maxRelativeX > 0.75;

  const extraTop = needsTop ? Math.max(0, desiredTopMargin - currentVerticalMargin) : 0;
  const extraBottom = needsBottom ? Math.max(0, desiredBottomMargin - currentVerticalMargin) : 0;
  const extraHorizontal = Math.max(0, desiredHorizontalMargin - currentHorizontalMargin);

  const basePadding: AnnotationViewportPadding = {
    top: extraTop,
    right: needsRight ? extraHorizontal : 0,
    bottom: extraBottom,
    left: needsLeft ? extraHorizontal : 0,
  };

  let padding: AnnotationViewportPadding = { ...basePadding };

  for (let iteration = 0; iteration < 4; iteration++) {
    let overflowTop = 0;
    let overflowRight = 0;
    let overflowBottom = 0;
    let overflowLeft = 0;

    annotations?.forEach(annotation => {
      const overflow = estimateViewportAnnotationOverflow(annotation, width, height, padding);
      if (!overflow) {
        return;
      }

      if (overflow.top > 0) {
        overflowTop = Math.max(overflowTop, overflow.top);
      }
      if (overflow.right > 0) {
        overflowRight = Math.max(overflowRight, overflow.right);
      }
      if (overflow.bottom > 0) {
        overflowBottom = Math.max(overflowBottom, overflow.bottom);
      }
      if (overflow.left > 0) {
        overflowLeft = Math.max(overflowLeft, overflow.left);
      }
    });

    const overflowPaddingTop = overflowTop > 0 ? overflowTop + ADDITIONAL_MARGIN_SAFETY : 0;
    const overflowPaddingRight = overflowRight > 0 ? overflowRight + ADDITIONAL_MARGIN_SAFETY : 0;
    const overflowPaddingBottom = overflowBottom > 0 ? overflowBottom + ADDITIONAL_MARGIN_SAFETY : 0;
    const overflowPaddingLeft = overflowLeft > 0 ? overflowLeft + ADDITIONAL_MARGIN_SAFETY : 0;

    const nextPadding: AnnotationViewportPadding = {
      top: Math.max(basePadding.top, padding.top, overflowPaddingTop),
      right: Math.max(basePadding.right, padding.right, overflowPaddingRight),
      bottom: Math.max(basePadding.bottom, padding.bottom, overflowPaddingBottom),
      left: Math.max(basePadding.left, padding.left, overflowPaddingLeft),
    };

    const converged =
      Math.abs(nextPadding.top - padding.top) < 0.5 &&
      Math.abs(nextPadding.right - padding.right) < 0.5 &&
      Math.abs(nextPadding.bottom - padding.bottom) < 0.5 &&
      Math.abs(nextPadding.left - padding.left) < 0.5;

    padding = nextPadding;

    if (converged) {
      break;
    }
  }

  if (padding.top < 0.5 && padding.right < 0.5 && padding.bottom < 0.5 && padding.left < 0.5) {
    return ZERO_ANNOTATION_VIEWPORT_PADDING;
  }

  return {
    top: Math.max(padding.top, 0),
    right: Math.max(padding.right, 0),
    bottom: Math.max(padding.bottom, 0),
    left: Math.max(padding.left, 0),
  };
};

const isFiniteNumber = (value: number | undefined): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const resolveOuterRadius = (width: number, height: number, hideLabels: boolean | undefined): number => {
  const donutMarginHorizontal = hideLabels ? 0 : 80;
  const donutMarginVertical = hideLabels ? 0 : 40;
  const usableWidth = Math.max(width - donutMarginHorizontal, 0);
  const usableHeight = Math.max(height - donutMarginVertical, 0);
  return Math.max(Math.min(usableWidth, usableHeight) / 2, 0);
};

const resolveDonutViewportLayout = (
  annotations: readonly ChartAnnotation[] | undefined,
  width: number | undefined,
  height: number | undefined,
  hideLabels: boolean | undefined,
): DonutViewportLayout => {
  if (!isFiniteNumber(width) || width <= 0 || !isFiniteNumber(height) || height <= 0) {
    return {
      padding: ZERO_ANNOTATION_VIEWPORT_PADDING,
      svgWidth: isFiniteNumber(width) ? Math.max(width, 0) : undefined,
      svgHeight: isFiniteNumber(height) ? Math.max(height, 0) : undefined,
      outerRadius: 0,
    };
  }

  const safeWidth = Math.max(width, 0);
  const safeHeight = Math.max(height, 0);
  let outerRadius = resolveOuterRadius(safeWidth, safeHeight, hideLabels);

  if (!hasViewportAnnotation(annotations)) {
    return {
      padding: ZERO_ANNOTATION_VIEWPORT_PADDING,
      svgWidth: safeWidth,
      svgHeight: safeHeight,
      outerRadius,
    };
  }

  for (let iteration = 0; iteration < 3; iteration++) {
    const nextPadding = computeAnnotationViewportPadding(annotations, safeWidth, safeHeight, outerRadius);
    const innerWidth = Math.max(safeWidth - nextPadding.left - nextPadding.right, 0);
    const innerHeight = Math.max(safeHeight - nextPadding.top - nextPadding.bottom, 0);
    const nextOuterRadius = resolveOuterRadius(innerWidth, innerHeight, hideLabels);

    if (Math.abs(nextOuterRadius - outerRadius) < 0.5) {
      outerRadius = nextOuterRadius;
      break;
    }

    outerRadius = nextOuterRadius;
  }

  const finalPadding = computeAnnotationViewportPadding(annotations, safeWidth, safeHeight, outerRadius);
  const innerWidth = Math.max(safeWidth - finalPadding.left - finalPadding.right, 0);
  const innerHeight = Math.max(safeHeight - finalPadding.top - finalPadding.bottom, 0);
  const finalOuterRadius = resolveOuterRadius(innerWidth, innerHeight, hideLabels);

  return {
    padding: finalPadding,
    svgWidth: safeWidth,
    svgHeight: safeHeight,
    outerRadius: finalOuterRadius,
  };
};

const createAnnotationContext = (
  svgWidth: number | undefined,
  svgHeight: number | undefined,
  outerRadiusValue: number,
  padding: AnnotationViewportPadding,
  isRtl: boolean,
): ChartAnnotationContext => {
  const safeWidth = typeof svgWidth === 'number' && svgWidth > 0 ? svgWidth : 1;
  const safeHeight = typeof svgHeight === 'number' && svgHeight > 0 ? svgHeight : 1;

  const paddingLeft = Number.isFinite(padding.left) && padding.left > 0 ? padding.left : 0;
  const paddingRight = Number.isFinite(padding.right) && padding.right > 0 ? padding.right : 0;
  const paddingTop = Number.isFinite(padding.top) && padding.top > 0 ? padding.top : 0;
  const paddingBottom = Number.isFinite(padding.bottom) && padding.bottom > 0 ? padding.bottom : 0;

  const fallbackDiameter = Math.max(Math.min(safeWidth, safeHeight), 1);
  const safeOuterRadius = typeof outerRadiusValue === 'number' && outerRadiusValue > 0 ? outerRadiusValue : 0;
  const desiredDiameter = safeOuterRadius > 0 ? safeOuterRadius * 2 : 0;
  const diameter = desiredDiameter > 0 ? Math.min(desiredDiameter, fallbackDiameter) : fallbackDiameter;
  const plotWidth = diameter;
  const plotHeight = diameter;
  const plotX = paddingLeft + (safeWidth - plotWidth) / 2;
  const plotY = paddingTop + (safeHeight - plotHeight) / 2;
  const svgViewportWidth = safeWidth + paddingLeft + paddingRight;
  const svgViewportHeight = safeHeight + paddingTop + paddingBottom;

  return {
    plotRect: {
      x: plotX,
      y: plotY,
      width: plotWidth,
      height: plotHeight,
    },
    svgRect: {
      width: svgViewportWidth,
      height: svgViewportHeight,
    },
    viewportPadding: {
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft,
    },
    isRtl,
  };
};

const createPlotContainerStyle = (
  width: number | undefined,
  height: number | undefined,
  resolvedSvgWidth: number,
  resolvedSvgHeight: number,
  padding: AnnotationViewportPadding,
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  const totalHorizontalPadding = normalizeViewportPadding(padding.left) + normalizeViewportPadding(padding.right);
  const totalVerticalPadding = normalizeViewportPadding(padding.top) + normalizeViewportPadding(padding.bottom);

  const baseWidth = typeof width === 'number' && Number.isFinite(width) ? Math.max(width, 0) : undefined;
  const baseHeight = typeof height === 'number' && Number.isFinite(height) ? Math.max(height, 0) : undefined;
  const innerWidth = Math.max(resolvedSvgWidth, 0);
  const innerHeight = Math.max(resolvedSvgHeight, 0);

  const finalWidth = Math.max(baseWidth ?? innerWidth, innerWidth) + totalHorizontalPadding;
  const finalHeight = Math.max(baseHeight ?? innerHeight, innerHeight) + totalVerticalPadding;

  if (finalWidth > 0) {
    style.width = finalWidth;
  }

  if (finalHeight > 0) {
    style.height = finalHeight;
  }

  return style;
};

export const useDonutAnnotationLayout = ({
  annotations,
  width,
  height,
  hideLabels,
  isRtl,
}: UseDonutAnnotationLayoutOptions): UseDonutAnnotationLayoutResult => {
  return React.useMemo<UseDonutAnnotationLayoutResult>(() => {
    const annotationList = annotations ?? EMPTY_ANNOTATIONS;
    const layout = resolveDonutViewportLayout(annotationList, width, height, hideLabels);
    const fallbackSvgWidth = typeof width === 'number' && Number.isFinite(width) ? Math.max(width, 0) : 0;
    const fallbackSvgHeight = typeof height === 'number' && Number.isFinite(height) ? Math.max(height, 0) : 0;

    const resolvedSvgWidth =
      typeof layout.svgWidth === 'number' && Number.isFinite(layout.svgWidth)
        ? Math.max(layout.svgWidth, 0)
        : fallbackSvgWidth;

    const resolvedSvgHeight =
      typeof layout.svgHeight === 'number' && Number.isFinite(layout.svgHeight)
        ? Math.max(layout.svgHeight, 0)
        : fallbackSvgHeight;

    const annotationViewportPadding = layout.padding;
    const hasAnnotationViewportPadding =
      annotationViewportPadding.top > 0 ||
      annotationViewportPadding.right > 0 ||
      annotationViewportPadding.bottom > 0 ||
      annotationViewportPadding.left > 0;

    const normalizedPaddingTop = normalizeViewportPadding(annotationViewportPadding.top);
    const normalizedPaddingLeft = normalizeViewportPadding(annotationViewportPadding.left);

    const svgStyle: React.CSSProperties | undefined = hasAnnotationViewportPadding
      ? {
          position: 'absolute',
          top: normalizedPaddingTop,
          left: normalizedPaddingLeft,
        }
      : undefined;

    const annotationContext =
      annotationList.length > 0
        ? createAnnotationContext(
            resolvedSvgWidth,
            resolvedSvgHeight,
            layout.outerRadius,
            annotationViewportPadding,
            isRtl,
          )
        : undefined;

    return {
      annotationContext,
      annotationViewportPadding,
      hasAnnotationViewportPadding,
      outerRadius: layout.outerRadius,
      plotContainerStyle: createPlotContainerStyle(
        width,
        height,
        resolvedSvgWidth,
        resolvedSvgHeight,
        annotationViewportPadding,
      ),
      resolvedSvgWidth,
      resolvedSvgHeight,
      svgStyle,
    };
  }, [annotations, width, height, hideLabels, isRtl]);
};

export { computeAnnotationViewportPadding, resolveDonutViewportLayout };
