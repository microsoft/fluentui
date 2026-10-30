'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { getIntrinsicElementProps, useId } from '@fluentui/react-utilities';
import { getVegaColor } from './VegaLiteColorAdapter';
import type { VegaLitePositionEncoding, VegaLiteSemanticMode, VegaLiteSpec } from './VegaLiteTypes';
import { getVegaRangedGeometry } from './VegaLiteRangedGeometry';
import type { VegaRangedGeometry, VegaRangedRow } from './VegaLiteRangedGeometry';
import { useIsDarkTheme } from './VegaDeclarativeChartHooks';
import { buildVegaTooltip } from './VegaLiteTooltip';
import { useVegaLiteRangedStyles } from './useVegaLiteRangedStyles.styles';
import { getVegaLiteChartTitle, vegaLiteChartPresentation } from './VegaLiteChartPresentation';
import { VegaLiteChartShell } from './VegaLiteChartShell';
import { useVegaLiteChartInteraction } from './useVegaLiteChartInteraction';

export { canRenderVegaRangedSpec, getVegaRangedGeometry } from './VegaLiteRangedGeometry';
export type { VegaRangedGeometry, VegaRangedRow } from './VegaLiteRangedGeometry';

export type VegaLiteRangedChartProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Inline, cloned data with engine transforms/aggregates already applied. */
  spec: VegaLiteSpec;
  /** Internal tooltip policy, matching the owning declarative view. */
  semanticMode?: VegaLiteSemanticMode;
  /** Internal composition option: the owning view renders the heading, but not the subtitle. */
  hideTitle?: boolean;
  /** Total SVG dimensions from the responsive wrapper, including the internal axis gutters. */
  width?: number;
  height?: number;
  selectedLegends?: string[];
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- The engine adapter contract passes legend keys, not a DOM event.
  onLegendChange?: (keys: string[]) => void;
  /** Integration seam for the shared declarative tooltip module; receives the prepared row unchanged. */
  renderTooltip?: (dataRow: VegaRangedRow, unitSpec?: VegaLiteSpec) => React.ReactNode;
  getAriaLabel?: (row: VegaRangedRow, unitSpec?: VegaLiteSpec) => string;
};

type GeometryMark = VegaRangedGeometry['marks'][number];

const axisEncoding = (units: VegaLiteSpec[], axis: 'x' | 'y'): VegaLitePositionEncoding | undefined => {
  const visible = units.flatMap(unit => {
    const channel = unit.encoding?.[axis];
    return channel && channel.axis !== null ? [channel] : [];
  });
  return visible.find(channel => channel.axis !== undefined) ?? visible[0];
};

/** Axis declarations are presentation only: retain the original shared-domain marks and unit provenance. */
function renderedGeometry(spec: VegaLiteSpec, width: number, height: number): VegaRangedGeometry {
  const geometry = getVegaRangedGeometry(spec, width, height);
  const units = geometry.units ?? [spec];
  const x = axisEncoding(units, 'x');
  const y = axisEncoding(units, 'y');
  const needsSharedAxis = geometry.units && (x !== units[0].encoding?.x || y !== units[0].encoding?.y);
  const axes = needsSharedAxis
    ? getVegaRangedGeometry(
        {
          ...spec,
          layer: units.map(unit => ({
            ...unit,
            mark: unit.mark!, // Geometry units exist only after the ranged capability check accepts every mark.
            encoding: {
              ...unit.encoding,
              ...(x && { x: { ...unit.encoding?.x, axis: x.axis, title: x.title ?? x.field } }),
              ...(y && { y: { ...unit.encoding?.y, axis: y.axis, title: y.title ?? y.field } }),
            },
          })),
        },
        width,
        height,
      ).axes
    : geometry.axes;
  const axis = (channel: VegaLitePositionEncoding | undefined, ticks: typeof axes.x.ticks) => ({
    title: !channel || channel.axis?.title === null ? undefined : channel.axis?.title ?? channel.title ?? channel.field,
    ticks: channel ? ticks : [],
  });
  return { ...geometry, axes: { x: axis(x, axes.x.ticks), y: axis(y, axes.y.ticks) } };
}

/** Native Fluent SVG renderer for prepared ranged and offset geometry. */
export const VegaLiteRangedChart: ForwardRefComponent<VegaLiteRangedChartProps> = React.forwardRef((props, ref) => {
  const {
    spec,
    semanticMode = 'strict',
    hideTitle,
    width: measuredWidth,
    height: measuredHeight,
    className,
    style,
    onLegendChange,
    renderTooltip,
    getAriaLabel,
    selectedLegends,
    onBlur,
    onMouseLeave,
    ...rootProps
  } = props;
  const classes = useVegaLiteRangedStyles();
  const id = useId('vega-ranged');
  const isDarkTheme = useIsDarkTheme();
  const width =
    measuredWidth ?? (typeof spec.width === 'number' ? spec.width : vegaLiteChartPresentation.viewport.width);
  const height =
    measuredHeight ?? (typeof spec.height === 'number' ? spec.height : vegaLiteChartPresentation.viewport.height);
  // The geometry helper still accepts plot dimensions only. Gutters fit INSIDE the requested viewport.
  const plotWidth = Math.max(0, width - vegaLiteChartPresentation.gutters.horizontal);
  const plotHeight = Math.max(0, height - vegaLiteChartPresentation.gutters.vertical);
  const geometry = React.useMemo(() => renderedGeometry(spec, plotWidth, plotHeight), [spec, plotWidth, plotHeight]);
  const showXAxis = !!axisEncoding(geometry.units ?? [spec], 'x');
  const showYAxis = !!axisEncoding(geometry.units ?? [spec], 'y');
  const interaction = useVegaLiteChartInteraction<GeometryMark, SVGPathElement>(geometry.marks, {
    onBlur,
    onMouseLeave,
    selectedLegends,
    onLegendChange,
  });
  const { active, selected } = interaction;
  const colorEncoding =
    geometry.units?.find(unit => unit.encoding?.color?.field)?.encoding?.color ?? spec.encoding?.color;
  const domain = React.useMemo(() => {
    if (!geometry.units) {
      return colorEncoding?.scale?.domain;
    }
    const values = Array.from(new Set(geometry.units.flatMap(unit => unit.encoding?.color?.scale?.domain ?? [])));
    return values.length ? values : undefined;
  }, [geometry.units, colorEncoding]);
  const scheme = colorEncoding?.scale?.scheme;
  const range = colorEncoding?.scale?.range as string[] | undefined;
  const reverse = colorEncoding?.scale?.reverse ?? false;
  const legends = Array.from(
    new Set(
      domain?.flatMap(value => (typeof value === 'string' || typeof value === 'number' ? [String(value)] : [])) ??
        geometry.marks.flatMap(mark => (mark.legend === undefined ? [] : [mark.legend])),
    ),
  );
  // Cache only within this mounted view; explicit domains seed colors even for categories with no rows.
  // Recreate for scale/theme changes, never for a hover/focus or selection change.
  const colors = React.useMemo(() => {
    const cache = new Map<string, string>();
    const categories = Array.from(
      new Set(
        domain?.flatMap(value => (typeof value === 'string' || typeof value === 'number' ? [String(value)] : [])) ?? [],
      ),
    );
    categories.forEach((legend, index) => {
      cache.set(legend, getVegaColor(reverse ? categories.length - 1 - index : index, scheme, range, isDarkTheme));
    });
    return cache;
  }, [domain, scheme, range, reverse, isDarkTheme]);
  for (const legend of legends) {
    if (!colors.has(legend)) {
      const index = reverse ? legends.length - 1 - colors.size : colors.size;
      colors.set(legend, getVegaColor(index, scheme, range, isDarkTheme));
    }
  }
  const colorFor = (legend?: string, unitSpec: VegaLiteSpec = spec): string =>
    unitSpec.encoding?.color?.value ??
    (typeof unitSpec.mark === 'object' ? unitSpec.mark.color : undefined) ??
    (legend === undefined ? undefined : colors.get(legend)) ??
    getVegaColor(0, scheme, range, isDarkTheme);
  const activeTooltip = active
    ? buildVegaTooltip(active.item.spec ?? spec, active.item.row, { mode: semanticMode })
    : undefined;
  let content: React.ReactNode = null;
  if (active && activeTooltip && !activeTooltip.disabled) {
    content = renderTooltip
      ? active.item.spec
        ? renderTooltip(active.item.row, active.item.spec)
        : renderTooltip(active.item.row)
      : activeTooltip.fields.length
      ? activeTooltip.ariaLabel
      : null;
  }
  const showTooltip = active && content !== null && content !== undefined && content !== false;
  const title = getVegaLiteChartTitle(spec, 'Ranged chart');

  return (
    <VegaLiteChartShell
      {...getIntrinsicElementProps('div', rootProps)}
      {...interaction.rootProps}
      ref={ref}
      className={className}
      style={{ ...style, width, ...(spec.title ? {} : { height }) }}
      spec={spec}
      hideTitle={hideTitle}
      chartTitle={title}
      svgId={id}
      width={width}
      height={height}
      plotWidth={plotWidth}
      plotHeight={plotHeight}
      axes={geometry.axes}
      showXAxis={showXAxis}
      showYAxis={showYAxis}
      classes={classes}
      subject="marks"
      navigationKind="ranged"
      navigationAttributes={interaction.navigationAttributes}
      beforeAxes={
        <>
          {/* Independent namespaces also when x, y and offsets happen to use the same field. */}
          <g id={`${id}-xOffset`} aria-hidden="true" />
          <g id={`${id}-yOffset`} aria-hidden="true" />
        </>
      }
      legendProps={
        colorEncoding?.legend !== null && !colorEncoding?.legend?.disable && legends.length > 0
          ? {
              legends: legends.map(legend => ({ title: legend, color: colorFor(legend) })),
              selectedLegends: selected,
              canSelectMultipleLegends: true,
              onChange: interaction.onLegendChange,
            }
          : undefined
      }
      tooltip={showTooltip ? { target: active.target, content } : undefined}
    >
      {geometry.marks.map(mark => {
        const isSelected = !selected.length || mark.legend === undefined || selected.includes(mark.legend);
        const unitSpec = mark.spec ?? spec;
        const markDefinition = typeof unitSpec.mark === 'object' ? unitSpec.mark : undefined;
        const tooltip = buildVegaTooltip(unitSpec, mark.row, { mode: semanticMode });
        return (
          <path
            id={`${id}-mark-${mark.key}`}
            key={mark.key}
            className={classes.mark}
            data-ranged-mark={mark.key}
            data-selected={isSelected}
            d={mark.d}
            fill={colorFor(mark.legend, unitSpec)}
            opacity={isSelected ? markDefinition?.opacity ?? 1 : 0.25}
            role="img"
            aria-label={
              (mark.spec ? getAriaLabel?.(mark.row, mark.spec) : getAriaLabel?.(mark.row)) ||
              (tooltip.disabled ? tooltip.ariaLabel || mark.ariaLabel : mark.ariaLabel) ||
              'Data point'
            }
            tabIndex={0}
            aria-describedby={showTooltip && active.item === mark ? `${id}-tooltip` : undefined}
            onFocus={event => interaction.focus(event, mark)}
            onMouseEnter={event => interaction.hover(event, mark)}
            onMouseLeave={() => interaction.leave(mark)}
            onKeyDown={interaction.onKeyDown}
          />
        );
      })}
    </VegaLiteChartShell>
  );
});
VegaLiteRangedChart.displayName = 'VegaLiteRangedChart';
