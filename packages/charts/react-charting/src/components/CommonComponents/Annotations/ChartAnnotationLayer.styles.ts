import { getColorFromString } from '@fluentui/react/lib/Color';
import type { ITheme } from '@fluentui/react';
import type { IStyle } from '@fluentui/react/lib/Styling';
import type { IChartAnnotationLayerStyleProps, IChartAnnotationLayerStyles } from './ChartAnnotationLayer.types';

export const DEFAULT_ANNOTATION_BACKGROUND_OPACITY = 0.9;
export const DEFAULT_CONNECTOR_START_PADDING = 16;
export const DEFAULT_CONNECTOR_END_PADDING = 4;
export const DEFAULT_CONNECTOR_STROKE_WIDTH = 2;
export const DEFAULT_CONNECTOR_ARROW: 'end' = 'end';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const toRgbaString = (color: string, opacity: number) => {
  const parsed = getColorFromString(color);
  if (!parsed) {
    return color;
  }
  const alpha = clamp(opacity, 0, 1);
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${alpha})`;
};

export const applyOpacityToColor = (color: string | undefined, opacity: number): string | undefined => {
  if (!color) {
    return color;
  }
  return toRgbaString(color, opacity);
};

export const getDefaultConnectorStrokeColor = (theme: ITheme): string => {
  return theme.palette?.neutralPrimary ?? theme.palette?.neutralDark ?? theme.semanticColors.bodyText;
};

const baseFlex: IStyle = {
  display: 'flex',
};

export const getStyles = (props: IChartAnnotationLayerStyleProps): IChartAnnotationLayerStyles => {
  const { theme, className } = props;

  return {
    root: [
      {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
      className,
    ],
    connectorLayer: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
    },
    connectorGroup: {
      pointerEvents: 'none',
      fill: 'none',
      strokeLinejoin: 'round',
    },
    annotationForeignObject: {
      overflow: 'visible',
      pointerEvents: 'none',
    },
    annotation: [
      baseFlex,
      {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        color: theme.semanticColors.bodyText,
        backgroundColor: theme.semanticColors.bodyBackground,
        borderRadius: theme.effects.roundedCorner2 ?? 4,
      },
    ],
    annotationContent: {
      width: '100%',
      height: '100%',
      display: 'block',
    },
    measurement: {
      position: 'absolute',
      left: 0,
      top: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
      zIndex: -1,
    },
  };
};
