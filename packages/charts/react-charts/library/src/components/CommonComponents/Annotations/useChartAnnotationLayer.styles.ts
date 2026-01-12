'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { color as d3Color } from 'd3-color';
import { ChartAnnotationArrowHead } from '../../../types/ChartAnnotation';

export interface ChartAnnotationLayerStyles {
  root?: string;
  annotation?: string;
  annotationNoDefaults?: string;
  connectorLayer?: string;
  measurement?: string;
  annotationContent?: string;
  annotationForeignObject?: string;
  annotationContentInteractive?: string;
  annotationForeignObjectInteractive?: string;
  connectorGroup?: string;
}

export interface ChartAnnotationLayerStyleProps {
  className?: string;
  styles?: Partial<ChartAnnotationLayerStyles>;
}

export const DEFAULT_ANNOTATION_BACKGROUND_OPACITY = 0.8;
export const DEFAULT_ANNOTATION_PADDING = '4px 8px';
export const DEFAULT_CONNECTOR_START_PADDING = 12;
export const DEFAULT_CONNECTOR_END_PADDING = 0;
export const DEFAULT_CONNECTOR_STROKE_WIDTH = 2;
export const DEFAULT_CONNECTOR_ARROW: ChartAnnotationArrowHead = 'end';

export const applyOpacityToColor = (
  color: string | undefined,
  opacity: number,
  options?: {
    preserveOriginalOpacity?: boolean;
  },
): string | undefined => {
  if (!color) {
    return undefined;
  }

  const parsed = d3Color(color);
  if (!parsed) {
    return color;
  }

  const originalOpacity = typeof parsed.opacity === 'number' ? parsed.opacity : 1;
  const preserveOriginalOpacity = options?.preserveOriginalOpacity ?? true;

  if (preserveOriginalOpacity && originalOpacity < 1) {
    return parsed.toString();
  }

  parsed.opacity = Math.max(0, Math.min(1, opacity));
  return parsed.toString();
};

/**
 * Get default annotation background color with opacity applied
 * Updated for v9 - uses tokens instead of theme
 */
export const getDefaultAnnotationBackgroundColor = (): string | undefined =>
  applyOpacityToColor(tokens.colorNeutralBackground1, DEFAULT_ANNOTATION_BACKGROUND_OPACITY);

/**
 * Get default connector stroke color
 * Updated for v9 - uses tokens instead of theme
 */
export const getDefaultConnectorStrokeColor = (): string => tokens.colorNeutralForeground1;

/**
 * @internal
 */
export const chartAnnotationLayerClassNames: SlotClassNames<ChartAnnotationLayerStyles> = {
  root: 'fui-chartAnnotationLayer__root',
  annotation: 'fui-chartAnnotationLayer__annotation',
  annotationNoDefaults: 'fui-chartAnnotationLayer__annotationNoDefaults',
  connectorLayer: 'fui-chartAnnotationLayer__connectorLayer',
  measurement: 'fui-chartAnnotationLayer__measurement',
  annotationContent: 'fui-chartAnnotationLayer__annotationContent',
  annotationForeignObject: 'fui-chartAnnotationLayer__annotationForeignObject',
  annotationContentInteractive: 'fui-chartAnnotationLayer__annotationContentInteractive',
  annotationForeignObjectInteractive: 'fui-chartAnnotationLayer__annotationForeignObjectInteractive',
  connectorGroup: 'fui-chartAnnotationLayer__connectorGroup',
};

/**
 * Base Styles
 */
const annotationBaseStyles = {
  ...typographyStyles.caption1,
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: tokens.colorNeutralForeground1,
  paddingTop: '4px',
  paddingBottom: '4px',
  paddingLeft: '8px',
  paddingRight: '8px',
  borderRadius: tokens.borderRadiusMedium,
  whiteSpace: 'pre-wrap',
  zIndex: 2,
} as const;

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'visible',
    zIndex: 1,
  },
  annotation: {
    ...annotationBaseStyles,
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  annotationNoDefaults: {
    ...annotationBaseStyles,
  },
  connectorLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'visible',
  },
  measurement: {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
  },
  annotationContent: {
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  annotationForeignObject: {
    overflow: 'visible',
    pointerEvents: 'none',
  },
  annotationContentInteractive: {
    pointerEvents: 'auto',
  },
  annotationForeignObjectInteractive: {
    pointerEvents: 'auto',
  },
  connectorGroup: {
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the ChartAnnotationLayer slots based on the state
 */
export const useChartAnnotationLayerStyles = (props: ChartAnnotationLayerStyleProps): ChartAnnotationLayerStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(chartAnnotationLayerClassNames.root, baseStyles.root, props.className, props.styles?.root),
    annotation: mergeClasses(
      chartAnnotationLayerClassNames.annotation,
      baseStyles.annotation,
      props.styles?.annotation,
    ),
    connectorLayer: mergeClasses(
      chartAnnotationLayerClassNames.connectorLayer,
      baseStyles.connectorLayer,
      props.styles?.connectorLayer,
    ),
    measurement: mergeClasses(
      chartAnnotationLayerClassNames.measurement,
      baseStyles.measurement,
      props.styles?.measurement,
    ),
    annotationContent: mergeClasses(
      chartAnnotationLayerClassNames.annotationContent,
      baseStyles.annotationContent,
      props.styles?.annotationContent,
    ),
    annotationForeignObject: mergeClasses(
      chartAnnotationLayerClassNames.annotationForeignObject,
      baseStyles.annotationForeignObject,
      props.styles?.annotationForeignObject,
    ),
    annotationContentInteractive: mergeClasses(
      chartAnnotationLayerClassNames.annotationContentInteractive,
      baseStyles.annotationContentInteractive,
      props.styles?.annotationContentInteractive,
    ),
    annotationForeignObjectInteractive: mergeClasses(
      chartAnnotationLayerClassNames.annotationForeignObjectInteractive,
      baseStyles.annotationForeignObjectInteractive,
      props.styles?.annotationForeignObjectInteractive,
    ),
    connectorGroup: mergeClasses(
      chartAnnotationLayerClassNames.connectorGroup,
      baseStyles.connectorGroup,
      props.styles?.connectorGroup,
    ),
  };
};
