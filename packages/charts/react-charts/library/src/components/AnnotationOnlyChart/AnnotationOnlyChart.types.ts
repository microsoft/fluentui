import * as React from 'react';
import type { ChartAnnotation } from '../../types/ChartAnnotation';
import type { Chart } from '../../types/index';
import type { Margin } from '@fluentui/chart-utilities';

/**
 * Props for the annotation-only chart renderer.
 */
export interface AnnotationOnlyChartProps {
  /**
   * Collection of annotations to render.
   */
  annotations: ChartAnnotation[];
  /** Optional layout title extracted from the Plotly schema. */
  chartTitle?: string;
  /** Optional descriptive text for accessibility. */
  description?: string;
  /** Desired width in pixels (if absent the chart will grow to fit the container). */
  width?: number;
  /** Desired height in pixels. */
  height?: number;
  /** Paper/background colour specified in the Plotly layout. */
  paperBackgroundColor?: string;
  /** Plot area background colour specified in the Plotly layout. */
  plotBackgroundColor?: string;
  /** Global layout font colour. */
  fontColor?: string;
  /** Global layout font family. */
  fontFamily?: string;
  /** Layout margin converted to padding for the outer wrapper. */
  margin?: Partial<Margin>;
  /** Component ref propagated by the DeclarativeChart surface. */
  componentRef?: React.Ref<Chart>;
}
