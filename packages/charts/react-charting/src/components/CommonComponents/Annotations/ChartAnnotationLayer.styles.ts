import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export interface IChartAnnotationLayerStyleProps {
  theme: ITheme;
  className?: string;
}
import { color as d3Color } from 'd3-color';
import { ChartAnnotationArrowHead } from '../../../types/IChartAnnotation';

export interface IChartAnnotationLayerStyles {
  root?: IStyle;
  annotation?: IStyle;
  connectorLayer?: IStyle;
  measurement?: IStyle;
  annotationContent?: IStyle;
  annotationForeignObject?: IStyle;
  annotationContentInteractive?: IStyle;
  annotationForeignObjectInteractive?: IStyle;
  connectorGroup?: IStyle;
}

export const DEFAULT_ANNOTATION_BACKGROUND_OPACITY = 0.8;
export const DEFAULT_ANNOTATION_PADDING = '4px 8px';
export const DEFAULT_CONNECTOR_START_PADDING = 12;
export const DEFAULT_CONNECTOR_END_PADDING = 0;
export const DEFAULT_CONNECTOR_STROKE_WIDTH = 2;
export const DEFAULT_CONNECTOR_ARROW: ChartAnnotationArrowHead = 'end';

export const applyOpacityToColor = (color: string | undefined, opacity: number): string | undefined => {
  if (!color) {
    return undefined;
  }

  const parsed = d3Color(color);
  if (!parsed) {
    return color;
  }

  parsed.opacity = Math.max(0, Math.min(1, opacity));
  return parsed.toString();
};

export const getDefaultAnnotationBackgroundColor = (theme: ITheme): string | undefined =>
  applyOpacityToColor(theme.semanticColors.bodyBackground, DEFAULT_ANNOTATION_BACKGROUND_OPACITY);

export const getDefaultConnectorStrokeColor = (theme: ITheme): string => theme.palette.neutralPrimary;

export const getStyles: IStyleFunctionOrObject<IChartAnnotationLayerStyleProps, IChartAnnotationLayerStyles> = (
  props: IChartAnnotationLayerStyleProps,
) => {
  const { theme, className } = props;
  const defaultBackground = getDefaultAnnotationBackgroundColor(theme);
  const defaultTextColor = theme.semanticColors.bodyText;
  const defaultBorderColor = theme.semanticColors.bodyDivider;

  return {
    root: [
      {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 1,
      },
      className,
    ],
    annotation: [
      theme.fonts.small,
      {
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: defaultBackground,
        color: defaultTextColor,
        padding: DEFAULT_ANNOTATION_PADDING,
        borderRadius: 4,
        boxShadow: theme.effects.elevation4,
        border: `1px solid ${defaultBorderColor}`,
        whiteSpace: 'pre-wrap',
        zIndex: 2,
      },
    ],
    connectorLayer: [
      {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      },
    ],
    measurement: [
      {
        position: 'absolute',
        visibility: 'hidden',
        pointerEvents: 'none',
      },
    ],
    annotationContent: [
      {
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      },
    ],
    annotationForeignObject: [
      {
        overflow: 'visible',
        pointerEvents: 'none',
      },
    ],
    annotationContentInteractive: [
      {
        pointerEvents: 'auto',
      },
    ],
    annotationForeignObjectInteractive: [
      {
        pointerEvents: 'auto',
      },
    ],
    connectorGroup: [
      {
        pointerEvents: 'none',
      },
    ],
  };
};
