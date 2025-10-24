import * as React from 'react';
import { useTheme } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { ChartAnnotationLayer } from '../CommonComponents/Annotations/ChartAnnotationLayer';
import type { IAnnotationOnlyChartProps } from './AnnotationOnlyChart.types';
import type { IChartAnnotationContext } from '../CommonComponents/Annotations/ChartAnnotationLayer.types';

const DEFAULT_HEIGHT = 240;
const DEFAULT_WIDTH = 400;

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
    width = DEFAULT_WIDTH,
    height,
    paperBackgroundColor,
    plotBackgroundColor,
    fontColor,
    fontFamily,
    margin,
  } = props;

  const theme = useTheme();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const resolvedWidth = Math.max(width, 1);
  const resolvedHeight = Math.max(height ?? DEFAULT_HEIGHT, 1);

  const context = React.useMemo<IChartAnnotationContext>(
    () => ({
      plotRect: { x: 0, y: 0, width: resolvedWidth, height: resolvedHeight },
      svgRect: { width: resolvedWidth, height: resolvedHeight },
      isRtl: theme?.rtl,
    }),
    [resolvedHeight, resolvedWidth, theme?.rtl],
  );

  const padding = React.useMemo(() => buildPadding(margin), [margin]);

  const rootClassName = React.useMemo(
    () =>
      mergeStyles({
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: resolvedHeight,
        backgroundColor: paperBackgroundColor ?? theme.semanticColors.bodyBackground,
        color: fontColor ?? theme.semanticColors.bodyText,
        fontFamily: fontFamily ?? theme.fonts.medium.fontFamily,
        padding,
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
      }),
    [fontColor, fontFamily, paperBackgroundColor, padding, resolvedHeight, theme],
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
      mergeStyles(theme.fonts.large, {
        textAlign: 'center',
      }),
    [theme.fonts.large],
  );

  if (!annotations || annotations.length === 0) {
    return (
      <div ref={containerRef} className={rootClassName} data-chart-annotation-only="true">
        {chartTitle && (
          <span className={titleClassName} aria-hidden="true">
            {chartTitle}
          </span>
        )}
        <div className={contentClassName} role="presentation" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      aria-label={description ?? chartTitle}
      data-chart-annotation-only="true"
    >
      {chartTitle && (
        <span className={titleClassName} aria-hidden="true">
          {chartTitle}
        </span>
      )}
      <div className={contentClassName} role="presentation">
        <ChartAnnotationLayer annotations={annotations} context={context} theme={theme} />
      </div>
    </div>
  );
};

AnnotationOnlyChart.displayName = 'AnnotationOnlyChart';
