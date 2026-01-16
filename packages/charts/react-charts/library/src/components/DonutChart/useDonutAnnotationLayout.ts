'use client';

import * as React from 'react';
import type { ChartAnnotation } from '../../types/ChartAnnotation';
import type { ChartAnnotationContext } from '../CommonComponents';
import {
  DEFAULT_ANNOTATION_PADDING,
  DEFAULT_CONNECTOR_END_PADDING,
  DEFAULT_CONNECTOR_START_PADDING,
} from '../CommonComponents/Annotations/useChartAnnotationLayer.styles';
import {
  normalizeViewportPadding,
  normalizePaddingRect,
  isFiniteNumber,
  applyToAllSides,
  parseCssSizeToPixels,
  resolvePaddingSides,
  splitTextIntoSegments,
  enforceConnectorMinDistance,
  resolveViewportRelativePosition,
  OverflowRect,
  aggregateMaxOverflow,
  addMarginToOverflow,
  hasPaddingConverged,
  maxSides,
  DEFAULT_ANNOTATION_MAX_WIDTH,
} from '../../utilities/annotationUtils';

const DEFAULT_VIEWPORT_FONT_SIZE = 14;
const DEFAULT_LINE_HEIGHT_RATIO = 1.35;
const DEFAULT_VIEWPORT_MAX_WIDTH = DEFAULT_ANNOTATION_MAX_WIDTH;
const APPROX_CHAR_WIDTH_RATIO = 0.55;
const ADDITIONAL_MARGIN_SAFETY = 12;
const EMPTY_ANNOTATIONS: readonly ChartAnnotation[] = Object.freeze([]);

export type AnnotationViewportPadding = OverflowRect;

const ZERO_ANNOTATION_VIEWPORT_PADDING: AnnotationViewportPadding = Object.freeze({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

type AnnotationOverflow = OverflowRect;

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

const estimateAnnotationSize = (annotation: ChartAnnotation): { width: number; height: number } => {
  const fontSize = parseCssSizeToPixels(annotation.style?.fontSize) ?? DEFAULT_VIEWPORT_FONT_SIZE;
  const maxWidth = isFiniteNumber(annotation.layout?.maxWidth)
    ? Math.max(annotation.layout.maxWidth, fontSize * 2)
    : DEFAULT_VIEWPORT_MAX_WIDTH;

  const paddingSides = resolvePaddingSides(annotation.style?.padding ?? DEFAULT_ANNOTATION_PADDING);
  const totalHorizontalPadding = paddingSides.left + paddingSides.right;
  const totalVerticalPadding = paddingSides.top + paddingSides.bottom;

  const charWidth = Math.max(fontSize * APPROX_CHAR_WIDTH_RATIO, 4);
  const approxCharsPerLine = Math.max(Math.floor(maxWidth / charWidth), 1);

  const text = typeof annotation.text === 'string' ? annotation.text : String(annotation.text ?? '');
  const segments = splitTextIntoSegments(text);
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
    !isFiniteNumber(containerWidth) ||
    containerWidth <= 0 ||
    !isFiniteNumber(containerHeight) ||
    containerHeight <= 0
  ) {
    return undefined;
  }

  if (!isFiniteNumber(coordinates.x) || !isFiniteNumber(coordinates.y)) {
    return undefined;
  }

  const { width, height } = estimateAnnotationSize(annotation);

  const offsetX = isFiniteNumber(layout.offsetX) ? layout.offsetX : 0;
  const offsetY = isFiniteNumber(layout.offsetY) ? layout.offsetY : 0;

  const {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom,
  } = normalizePaddingRect(padding);

  const anchorX = resolveViewportRelativePosition(coordinates.x, containerWidth, paddingLeft, paddingRight);
  const anchorY = resolveViewportRelativePosition(coordinates.y, containerHeight, paddingTop, paddingBottom);

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
    const startPadding = isFiniteNumber(annotation.connector.startPadding)
      ? annotation.connector.startPadding
      : DEFAULT_CONNECTOR_START_PADDING;
    const endPadding = isFiniteNumber(annotation.connector.endPadding)
      ? annotation.connector.endPadding
      : DEFAULT_CONNECTOR_END_PADDING;

    const adjustedDisplay = enforceConnectorMinDistance(
      { x: anchorX, y: anchorY },
      { x: displayX, y: displayY },
      startPadding,
      endPadding,
    );
    displayX = adjustedDisplay.x;
    displayY = adjustedDisplay.y;
    topLeftX = displayX + alignOffsetX;
    topLeftY = displayY + alignOffsetY;
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
    !isFiniteNumber(width) ||
    width <= 0 ||
    !isFiniteNumber(height) ||
    height <= 0 ||
    !isFiniteNumber(outerRadius) ||
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
    if (isFiniteNumber(x)) {
      minRelativeX = Math.min(minRelativeX, x);
      maxRelativeX = Math.max(maxRelativeX, x);
    }
    if (isFiniteNumber(y)) {
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
    const overflows: OverflowRect[] = [];

    annotations?.forEach(annotation => {
      const overflow = estimateViewportAnnotationOverflow(annotation, width, height, padding);
      if (overflow) {
        overflows.push(overflow);
      }
    });

    const aggregatedOverflow = aggregateMaxOverflow(overflows);
    const overflowPadding = addMarginToOverflow(aggregatedOverflow, ADDITIONAL_MARGIN_SAFETY);

    const nextPadding: AnnotationViewportPadding = maxSides(basePadding, padding, overflowPadding);

    if (hasPaddingConverged(padding, nextPadding)) {
      padding = nextPadding;
      break;
    }

    padding = nextPadding;
  }

  if (padding.top < 0.5 && padding.right < 0.5 && padding.bottom < 0.5 && padding.left < 0.5) {
    return ZERO_ANNOTATION_VIEWPORT_PADDING;
  }

  return applyToAllSides(side => Math.max(padding[side], 0)) as AnnotationViewportPadding;
};

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
  const finalSvgWidth = Math.max(safeWidth - finalPadding.left - finalPadding.right, 0);
  const finalSvgHeight = Math.max(safeHeight - finalPadding.top - finalPadding.bottom, 0);
  const finalOuterRadius = resolveOuterRadius(finalSvgWidth, finalSvgHeight, hideLabels);

  return {
    padding: finalPadding,
    svgWidth: finalSvgWidth,
    svgHeight: finalSvgHeight,
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

  const {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom,
  } = normalizePaddingRect(padding);

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
  const normalizedPadding = normalizePaddingRect(padding);
  const totalHorizontalPadding = normalizedPadding.left + normalizedPadding.right;
  const totalVerticalPadding = normalizedPadding.top + normalizedPadding.bottom;

  const desiredWidth = Math.max(resolvedSvgWidth + totalHorizontalPadding, 0);
  const desiredHeight = Math.max(resolvedSvgHeight + totalVerticalPadding, 0);

  if (isFiniteNumber(width)) {
    style.width = Math.max(width, desiredWidth);
  } else if (desiredWidth > 0) {
    style.width = desiredWidth;
  }

  if (isFiniteNumber(height)) {
    style.height = Math.max(height, desiredHeight);
  } else if (desiredHeight > 0) {
    style.height = desiredHeight;
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
    const fallbackSvgWidth = isFiniteNumber(width) ? Math.max(width, 0) : 0;
    const fallbackSvgHeight = isFiniteNumber(height) ? Math.max(height, 0) : 0;

    const resolvedSvgWidth = isFiniteNumber(layout.svgWidth) ? Math.max(layout.svgWidth, 0) : fallbackSvgWidth;

    const resolvedSvgHeight = isFiniteNumber(layout.svgHeight) ? Math.max(layout.svgHeight, 0) : fallbackSvgHeight;

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
