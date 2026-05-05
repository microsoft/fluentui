'use client';

import * as React from 'react';
import { ChartAnnotationLayer } from '../CommonComponents/Annotations/ChartAnnotationLayer';
import { useRtl } from '../../utilities';
import { useAnnotationOnlyChartStyles } from './useAnnotationOnlyChartStyles.styles';
import type { AnnotationOnlyChartProps } from './AnnotationOnlyChart.types';
import type { ChartAnnotationContext } from '../CommonComponents/Annotations/ChartAnnotationLayer.types';
import { useImageExport } from '../../utilities/hooks';

const DEFAULT_HEIGHT = 650;
const FALLBACK_WIDTH = 400;

const buildPadding = (margin: AnnotationOnlyChartProps['margin']): string | undefined => {
  if (!margin) {
    return undefined;
  }

  const top = margin.t ?? 0;
  const right = margin.r ?? 0;
  const bottom = margin.b ?? 0;
  const left = margin.l ?? 0;

  if (top === 0 && right === 0 && bottom === 0 && left === 0) {
    return undefined;
  }

  return `${top}px ${right}px ${bottom}px ${left}px`;
};

export const AnnotationOnlyChart: React.FC<AnnotationOnlyChartProps> = props => {
  const {
    annotations,
    chartTitle,
    description,
    width,
    height,
    paperBackgroundColor,
    plotBackgroundColor,
    fontColor,
    fontFamily,
    margin,
    componentRef,
  } = props;

  const isRtl = useRtl();
  const classes = useAnnotationOnlyChartStyles();
  const { chartContainerRef: containerRef } = useImageExport(componentRef, true, false);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [measuredWidth, setMeasuredWidth] = React.useState<number>(width ?? 0);
  const [contentHeight, setContentHeight] = React.useState<number>(height ?? DEFAULT_HEIGHT);

  React.useEffect(() => {
    if (typeof width === 'number' && width > 0) {
      setMeasuredWidth(width);
      return;
    }

    const node = containerRef.current;
    if (!node || typeof ResizeObserver === 'undefined') {
      const rect = node?.getBoundingClientRect();
      if (rect && rect.width > 0) {
        setMeasuredWidth(rect.width);
      } else {
        setMeasuredWidth(prev => (prev > 0 ? prev : FALLBACK_WIDTH));
      }
      return;
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const newWidth = entry.contentRect.width;
      if (newWidth > 0 && Math.abs(newWidth - measuredWidth) > 0.5) {
        setMeasuredWidth(newWidth);
      }
    });

    const rect = node.getBoundingClientRect();
    if (rect.width > 0) {
      setMeasuredWidth(rect.width);
    }

    observer.observe(node);
    return () => observer.disconnect();
  }, [width, measuredWidth]);

  const resolvedWidth = Math.max(measuredWidth || FALLBACK_WIDTH, 1);
  const resolvedHeight = Math.max(height ?? DEFAULT_HEIGHT, 1);

  React.useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      setContentHeight(prev => (prev > 0 ? prev : resolvedHeight));
      return;
    }

    if (typeof ResizeObserver === 'undefined') {
      const rect = node.getBoundingClientRect();
      setContentHeight(prev => (rect.height > 0 ? rect.height : prev > 0 ? prev : resolvedHeight));
      return;
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const newHeight = entry.contentRect.height;
      if (newHeight > 0) {
        setContentHeight(prev => (Math.abs(prev - newHeight) > 0.5 ? newHeight : prev));
      }
    });

    const rect = node.getBoundingClientRect();
    setContentHeight(prev => (rect.height > 0 ? rect.height : prev > 0 ? prev : resolvedHeight));

    observer.observe(node);
    return () => observer.disconnect();
  }, [
    resolvedHeight,
    resolvedWidth,
    annotations,
    chartTitle,
    description,
    margin,
    plotBackgroundColor,
    paperBackgroundColor,
    fontColor,
    fontFamily,
  ]);

  const svgHeight = Math.max(Math.ceil(contentHeight || 0), resolvedHeight);

  const context: ChartAnnotationContext = {
    plotRect: { x: 0, y: 0, width: resolvedWidth, height: resolvedHeight },
    svgRect: { width: resolvedWidth, height: resolvedHeight },
    isRtl,
  };

  const padding = buildPadding(margin);

  // Inline styles for dynamic values that can't be in makeStyles
  const rootStyle: React.CSSProperties = React.useMemo(
    () => ({
      width: width ? `${width}px` : '100%',
      minHeight: resolvedHeight,
      ...(paperBackgroundColor && { backgroundColor: paperBackgroundColor }),
      ...(fontColor && { color: fontColor }),
      ...(fontFamily && { fontFamily }),
      ...(padding && { padding }),
    }),
    [fontColor, fontFamily, paperBackgroundColor, padding, resolvedHeight, width],
  );

  const contentStyle: React.CSSProperties = React.useMemo(
    () => ({
      ...(plotBackgroundColor && { backgroundColor: plotBackgroundColor }),
    }),
    [plotBackgroundColor],
  );

  const resolvedAnnotations = annotations ?? [];
  const hasAnnotations = resolvedAnnotations.length > 0;
  const ariaLabel = hasAnnotations ? description ?? chartTitle : undefined;

  return (
    <div ref={containerRef} data-chart-annotation-container="true">
      <svg
        width={resolvedWidth}
        height={svgHeight}
        viewBox={`0 0 ${resolvedWidth} ${svgHeight}`}
        style={{ width: width ? `${width}px` : '100%', height: `${svgHeight}px`, display: 'block' }}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
      >
        <foreignObject x={0} y={0} width={resolvedWidth} height={svgHeight}>
          <div
            ref={contentRef}
            className={classes.root}
            style={rootStyle}
            data-chart-annotation-only="true"
            aria-label={ariaLabel}
          >
            {chartTitle && (
              <span className={classes.title} aria-hidden="true">
                {chartTitle}
              </span>
            )}
            <div className={classes.content} style={contentStyle} role="presentation">
              {hasAnnotations ? (
                <ChartAnnotationLayer annotations={resolvedAnnotations} context={context} hideDefaultStyles={true} />
              ) : null}
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

AnnotationOnlyChart.displayName = 'AnnotationOnlyChart';
