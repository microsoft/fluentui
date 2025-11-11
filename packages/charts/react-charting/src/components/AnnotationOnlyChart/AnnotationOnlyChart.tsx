import * as React from 'react';
import { getRTL, useTheme } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { ChartAnnotationLayer } from '../CommonComponents/Annotations/ChartAnnotationLayer';
import { exportChartsAsImage } from '../../utilities/image-export-utils';
import type { IAnnotationOnlyChartProps } from './AnnotationOnlyChart.types';
import type { IChart, IImageExportOptions } from '../../types/index';
import type { IChartAnnotationContext } from '../CommonComponents/Annotations/ChartAnnotationLayer.types';

const DEFAULT_HEIGHT = 650;
const FALLBACK_WIDTH = 400;

const buildPadding = (margin: IAnnotationOnlyChartProps['margin']): string | undefined => {
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

export const AnnotationOnlyChart: React.FC<IAnnotationOnlyChartProps> = props => {
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

  const theme = useTheme();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
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
    theme,
  ]);

  const svgHeight = Math.max(Math.ceil(contentHeight || 0), resolvedHeight);

  const context: IChartAnnotationContext = {
    plotRect: { x: 0, y: 0, width: resolvedWidth, height: resolvedHeight },
    svgRect: { width: resolvedWidth, height: resolvedHeight },
    isRtl: theme?.rtl,
  };

  const padding = buildPadding(margin);

  const rootClassName = React.useMemo(
    () =>
      mergeStyles({
        position: 'relative',
        width: width ? `${width}px` : '100%',
        minHeight: resolvedHeight,
        backgroundColor: paperBackgroundColor ?? theme.semanticColors.bodyBackground,
        color: fontColor ?? theme.semanticColors.bodyText,
        fontFamily: fontFamily ?? theme.fonts.medium.fontFamily,
        padding,
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
      }),
    [fontColor, fontFamily, paperBackgroundColor, padding, resolvedHeight, theme, width],
  );

  const contentClassName = React.useMemo(
    () =>
      mergeStyles({
        position: 'relative',
        flexGrow: 1,
        backgroundColor: plotBackgroundColor ?? 'transparent',
        borderRadius: theme.effects.roundedCorner2 ?? 4,
        boxSizing: 'border-box',
      }),
    [plotBackgroundColor, theme.effects.roundedCorner2],
  );

  const titleClassName = React.useMemo(
    () =>
      mergeStyles({
        textAlign: 'center',
      }),
    [],
  );

  const resolvedAnnotations = annotations ?? [];
  const hasAnnotations = resolvedAnnotations.length > 0;
  const ariaLabel = hasAnnotations ? description ?? chartTitle : undefined;

  React.useImperativeHandle(
    componentRef,
    () => {
      const chartHandle: IChart = {
        chartContainer: containerRef.current,
        toImage: (opts?: IImageExportOptions) => {
          return exportChartsAsImage([{ container: containerRef.current }], undefined, getRTL(), opts);
        },
      };

      return chartHandle;
    },
    [],
  );

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
          <div ref={contentRef} className={rootClassName} data-chart-annotation-only="true" aria-label={ariaLabel}>
            {chartTitle && (
              <span className={titleClassName} aria-hidden="true">
                {chartTitle}
              </span>
            )}
            <div className={contentClassName} role="presentation">
              {hasAnnotations ? (
                <ChartAnnotationLayer annotations={resolvedAnnotations} context={context} theme={theme} />
              ) : null}
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

AnnotationOnlyChart.displayName = 'AnnotationOnlyChart';
