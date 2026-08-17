/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `ChartAnnotationLayer.tsx`, which
 * does use hooks, keeps its own.
 */

import { clsx } from 'clsx';
import { tokens } from '@fluentui/react-theme';
import { color as d3Color } from 'd3-color';
import type { ChartAnnotationArrowHead } from '../../../types/ChartAnnotation';

import styles from './ChartAnnotationLayer.module.css';

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
 * Public identity class for ChartAnnotationLayer.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics
 * (`fui-chartAnnotationLayer__*`) were removed with the D16 sweep: there is no public
 * class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + chartAnnotationLayerClassNames.root` is an invalid selector. Use
 * `fuiSelector(chartAnnotationLayerClassNames.root)` from `@fluentui/react-utilities` at
 * every selector site (DECISIONS.md D16.5).
 *
 * NOT covered by this constant: the `data-chart-annotation*` attributes the component
 * renders — they predate the migration and are consumer/test seams, not styling identity.
 */
export const chartAnnotationLayerClassNames: { root: string } = {
  root: 'group/fui-chart-annotation-layer',
};

/**
 * Apply styling to the ChartAnnotationLayer slots based on the state.
 *
 * `styles.root` is what guarantees the marker is never `classList[0]` — nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom.
 */
export const useChartAnnotationLayerStyles = (props: ChartAnnotationLayerStyleProps): ChartAnnotationLayerStyles => {
  return {
    root: clsx(styles.root, chartAnnotationLayerClassNames.root, props.className, props.styles?.root),
    annotation: clsx(styles.annotation, props.styles?.annotation),
    connectorLayer: clsx(styles['connector-layer'], props.styles?.connectorLayer),
    measurement: clsx(styles.measurement, props.styles?.measurement),
    annotationContent: clsx(styles['annotation-content'], props.styles?.annotationContent),
    annotationForeignObject: clsx(styles['annotation-foreign-object'], props.styles?.annotationForeignObject),
    annotationContentInteractive: clsx(
      styles['annotation-content-interactive'],
      props.styles?.annotationContentInteractive,
    ),
    annotationForeignObjectInteractive: clsx(
      styles['annotation-foreign-object-interactive'],
      props.styles?.annotationForeignObjectInteractive,
    ),
    connectorGroup: clsx(styles['connector-group'], props.styles?.connectorGroup),
  };
};
