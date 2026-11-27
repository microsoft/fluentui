'use client';

import * as React from 'react';
import type { ForwardRefComponent, RefAttributes } from '@fluentui/react-utilities';
import type { VegaDeclarativeChartProps } from './VegaDeclarativeChart.types';
import { useVegaDeclarativeChart } from './useVegaDeclarativeChart';
import { useVegaDeclarativeChartStyles } from './useVegaDeclarativeChartStyles.styles';
import { renderVegaDeclarativeChart } from './renderVegaDeclarativeChart';

// Preserve direct-file and package imports without introducing a public-barrel dependency.
export type { VegaSchema, VegaDeclarativeChartProps } from './VegaDeclarativeChart.types';
export type { VegaLiteSpec } from './VegaLiteTypes';

/** Render Vega-Lite specifications with Fluent UI styling and host-owned resource loading. */
// Preserve the original intersection: custom schema props must not widen the ref to HTMLElement.
export const VegaDeclarativeChart: ForwardRefComponent<VegaDeclarativeChartProps> &
  React.ForwardRefExoticComponent<VegaDeclarativeChartProps & RefAttributes<HTMLDivElement>> = React.forwardRef<
  HTMLDivElement,
  VegaDeclarativeChartProps
>((props, ref) => {
  const state = useVegaDeclarativeChart(props, ref);
  const classes = useVegaDeclarativeChartStyles();
  return renderVegaDeclarativeChart(state, classes);
});

VegaDeclarativeChart.displayName = 'VegaDeclarativeChart';
