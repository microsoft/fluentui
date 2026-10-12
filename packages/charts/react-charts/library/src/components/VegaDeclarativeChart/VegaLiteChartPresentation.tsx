'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { useVegaLiteChartPresentationStyles } from './VegaLiteChartPresentation.styles';

/**
 * SVG user-space units, NOT CSS typography/spacing. These preserve the renderers' existing
 * plot dimensions, viewBox and tick coordinates. CSS token variables must never be parsed
 * as geometry numbers; axis text and visible headings use theme tokens in styles instead.
 */
export const vegaLiteChartPresentation = {
  viewport: { width: 640, height: 400 },
  gutters: { horizontal: 72, vertical: 72 },
  viewBox: { x: -56, y: -24 },
  xAxis: { tickLabelOffset: 18, titleOffset: 38 },
  yAxis: { tickLabelX: -8, titleX: -44 },
  pointRadius: 5,
} as const;

export const getVegaLiteChartTitle = (spec: VegaLiteSpec, fallback: string): string =>
  (typeof spec.title === 'string' ? spec.title : spec.title?.text) ?? spec.description ?? fallback;

export function getVegaLiteChartDescription(spec: VegaLiteSpec, subject: 'marks' | 'points'): string {
  return [
    spec.description,
    `Use arrow keys to navigate data ${subject}. Home and End move to the first and last ${
      subject === 'marks' ? 'mark' : 'point'
    }. ` + 'Tab or Shift+Tab leaves the data marks. Escape dismisses the tooltip.',
  ]
    .filter(Boolean)
    .join(' ');
}

type TitleProps = React.ComponentPropsWithoutRef<'h3'> & { spec: VegaLiteSpec; hideTitle?: boolean };

/** Only authored titles are visible; fallback accessible names do not become extra headings. */
export const VegaLiteChartTitle: ForwardRefComponent<TitleProps> = React.forwardRef((props, ref) => {
  const { spec, hideTitle, className, ...rest } = props;
  const classes = useVegaLiteChartPresentationStyles();
  const title = typeof spec.title === 'string' ? spec.title : spec.title?.text;
  const subtitle = typeof spec.title === 'object' ? spec.title.subtitle : undefined;
  return (
    <>
      {title && !hideTitle && (
        <h3 {...rest} ref={ref} className={mergeClasses(classes.title, className)}>
          {title}
        </h3>
      )}
      {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
    </>
  );
});
VegaLiteChartTitle.displayName = 'VegaLiteChartTitle';

type Axis = { title?: string; ticks: { label: string; position: number }[] };
type AxesProps = {
  id: string;
  axes: { x: Axis; y: Axis };
  plotWidth: number;
  plotHeight: number;
  showXAxis: boolean;
  showYAxis: boolean;
  classes: { axis: string; axisLine: string };
};

/** Presentation-only: accepts plot-space metadata without importing either geometry module. */
export function renderVegaLiteAxes({
  id,
  axes,
  plotWidth,
  plotHeight,
  showXAxis,
  showYAxis,
  classes,
}: AxesProps): React.ReactElement {
  const { xAxis, yAxis } = vegaLiteChartPresentation;
  return (
    <>
      {showXAxis && (
        <g id={`${id}-x`} className={classes.axis} aria-hidden="true">
          <path className={classes.axisLine} d={`M0,${plotHeight}L${plotWidth},${plotHeight}`} fill="none" />
          {axes.x.ticks.map((tick, index) => (
            <text key={index} x={tick.position} y={plotHeight + xAxis.tickLabelOffset} textAnchor="middle">
              {tick.label}
            </text>
          ))}
          {axes.x.title && (
            <text x={plotWidth / 2} y={plotHeight + xAxis.titleOffset} textAnchor="middle">
              {axes.x.title}
            </text>
          )}
        </g>
      )}
      {showYAxis && (
        <g id={`${id}-y`} className={classes.axis} aria-hidden="true">
          <path className={classes.axisLine} d={`M0,0L0,${plotHeight}`} fill="none" />
          {axes.y.ticks.map((tick, index) => (
            <text key={index} x={yAxis.tickLabelX} y={tick.position} dominantBaseline="middle" textAnchor="end">
              {tick.label}
            </text>
          ))}
          {axes.y.title && (
            <text transform={`translate(${yAxis.titleX},${plotHeight / 2}) rotate(-90)`} textAnchor="middle">
              {axes.y.title}
            </text>
          )}
        </g>
      )}
    </>
  );
}

/**
 * The shared semantic content (and arbitrary consumer components) may already render a tooltip.
 * Inspect only this owned content boundary after commit, never a document/global or focus targets.
 * Raw content gets a fallback role; semantic content keeps its single role on the inner dl.
 */
export const VegaLiteTooltipContainer: ForwardRefComponent<React.ComponentPropsWithoutRef<'div'>> = React.forwardRef(
  (props, ref) => {
    const { children, ...rest } = props;
    const contentRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs(ref, contentRef);
    const [semantic, setSemantic] = React.useState(typeof children === 'object');
    useIsomorphicLayoutEffect(() => {
      setSemantic(!!contentRef.current?.querySelector('[role="tooltip"]'));
    }, [children]);
    return (
      <div {...rest} ref={mergedRef} role={semantic ? undefined : 'tooltip'}>
        {children}
      </div>
    );
  },
);
VegaLiteTooltipContainer.displayName = 'VegaLiteTooltipContainer';
