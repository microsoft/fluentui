'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { getIntrinsicElementProps, useId } from '@fluentui/react-utilities';
import {
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import { mergeClasses } from '@griffel/react';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { Legends } from '../Legends/Legends';
import { getVegaColor } from './VegaLiteColorAdapter';
import type { VegaLitePositionEncoding, VegaLiteSpec } from './VegaLiteTypes';
import { getVegaRangedGeometry } from './VegaLiteRangedGeometry';
import type { VegaRangedGeometry, VegaRangedRow } from './VegaLiteRangedGeometry';
import { useIsDarkTheme } from './VegaDeclarativeChartHooks';
import { buildVegaTooltip } from './VegaLiteTooltip';
import { useVegaLiteRangedStyles } from './useVegaLiteRangedStyles.styles';
import {
  getVegaLiteChartTitle,
  getVegaLiteChartDescription,
  VegaLiteChartTitle,
  VegaLiteTooltipContainer,
  vegaLiteChartPresentation,
  renderVegaLiteAxes,
} from './VegaLiteChartPresentation';

export { canRenderVegaRangedSpec, getVegaRangedGeometry } from './VegaLiteRangedGeometry';
export type { VegaRangedGeometry, VegaRangedRow } from './VegaLiteRangedGeometry';

export type VegaLiteRangedChartProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Inline, cloned data with engine transforms/aggregates already applied. */
  spec: VegaLiteSpec;
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
type Anchor = { mark: GeometryMark; target: SVGPathElement };
// Never search a document for an SVG: derive the owning chart from the DIRECT event target.
const getSVG = (target: SVGElement) => target.ownerSVGElement;

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

/** Native Fluent SVG renderer for prepared P2 ranged and offset geometry. */
export const VegaLiteRangedChart: ForwardRefComponent<VegaLiteRangedChartProps> = React.forwardRef((props, ref) => {
  const {
    spec,
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
  const groupAttributes = useFocusableGroup();
  const arrowAttributes = useArrowNavigationGroup({ axis: 'both', circular: true });
  const navigationAttributes = useMergedTabsterAttributes_unstable(groupAttributes, arrowAttributes);
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
  const [hovered, setHovered] = React.useState<Anchor>();
  const [focused, setFocused] = React.useState<Anchor>();
  const [localSelection, setLocalSelection] = React.useState<string[]>([]);
  const selected = selectedLegends ?? localSelection;
  const activeAnchor = hovered ?? focused;
  // A changed prepared spec must not leave an old row/removed SVG anchor in a callout.
  const active =
    activeAnchor && activeAnchor.target.ownerSVGElement && geometry.marks.includes(activeAnchor.mark)
      ? activeAnchor
      : undefined;
  React.useEffect(() => {
    setHovered(previous => (previous && geometry.marks.includes(previous.mark) ? previous : undefined));
    setFocused(previous => (previous && geometry.marks.includes(previous.mark) ? previous : undefined));
  }, [geometry]);
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
  const activeTooltip = active ? buildVegaTooltip(active.mark.spec ?? spec, active.mark.row) : undefined;
  let content: React.ReactNode = null;
  if (active && activeTooltip && !activeTooltip.disabled) {
    content = renderTooltip
      ? active.mark.spec
        ? renderTooltip(active.mark.row, active.mark.spec)
        : renderTooltip(active.mark.row)
      : activeTooltip.fields.length
      ? activeTooltip.ariaLabel
      : null;
  }
  const showTooltip = active && content !== null && content !== undefined && content !== false;
  const title = getVegaLiteChartTitle(spec, 'Ranged chart');

  const captureAnchor = (event: React.SyntheticEvent<SVGPathElement>, mark: GeometryMark): Anchor | undefined => {
    const target = event.currentTarget;
    return getSVG(target) ? { mark, target } : undefined;
  };
  const onKeyDown = (event: React.KeyboardEvent<SVGPathElement>) => {
    if (event.key === 'Escape') {
      setHovered(undefined);
      setFocused(undefined);
      return;
    }
    if (event.key.startsWith('Arrow') || event.key === 'Home' || event.key === 'End' || event.key === 'Tab') {
      setHovered(undefined);
    }
    // Tabster owns movement, including circular arrows/Home/End and non-trapping Tab/Shift+Tab.
  };
  const handleLegendChange = React.useCallback(
    (keys: string[]) => {
      setLocalSelection(keys);
      onLegendChange?.(keys);
    },
    [onLegendChange],
  );

  return (
    <div
      {...getIntrinsicElementProps('div', rootProps)}
      ref={ref}
      className={mergeClasses(classes.root, className)}
      style={{ ...style, width, ...(spec.title ? {} : { height }) }}
      role="group"
      aria-label={rootProps['aria-label'] ?? title}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHovered(undefined);
          setFocused(undefined);
        }
        onBlur?.(event);
      }}
      onMouseLeave={event => {
        setHovered(undefined);
        onMouseLeave?.(event);
      }}
    >
      <VegaLiteChartTitle spec={spec} hideTitle={hideTitle} />
      <div {...navigationAttributes} data-ranged-navigation="true">
        <svg
          id={id}
          className={classes.svg}
          width={width}
          height={height}
          viewBox={`${vegaLiteChartPresentation.viewBox.x} ${vegaLiteChartPresentation.viewBox.y} ${width} ${height}`}
          role="group"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-description`}>{getVegaLiteChartDescription(spec, 'marks')}</desc>
          <defs>
            <clipPath id={`${id}-clip`}>
              <rect width={plotWidth} height={plotHeight} />
            </clipPath>
          </defs>
          {/* Independent namespaces also when x, y and offsets happen to use the same field. */}
          <g id={`${id}-xOffset`} aria-hidden="true" />
          <g id={`${id}-yOffset`} aria-hidden="true" />
          {renderVegaLiteAxes({ id, axes: geometry.axes, plotWidth, plotHeight, showXAxis, showYAxis, classes })}
          <g clipPath={`url(#${id}-clip)`}>
            {geometry.marks.map(mark => {
              const isSelected = !selected.length || mark.legend === undefined || selected.includes(mark.legend);
              const unitSpec = mark.spec ?? spec;
              const markDefinition = typeof unitSpec.mark === 'object' ? unitSpec.mark : undefined;
              const tooltip = buildVegaTooltip(unitSpec, mark.row);
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
                    (mark.spec ? getAriaLabel?.(mark.row, mark.spec) : getAriaLabel?.(mark.row)) ??
                    (tooltip.disabled ? tooltip.ariaLabel || mark.ariaLabel : mark.ariaLabel)
                  }
                  tabIndex={0}
                  aria-describedby={showTooltip && active.mark === mark ? `${id}-tooltip` : undefined}
                  onFocus={event => {
                    setHovered(undefined);
                    setFocused(captureAnchor(event, mark));
                  }}
                  onMouseEnter={event => setHovered(captureAnchor(event, mark))}
                  onMouseLeave={() => setHovered(previous => (previous?.mark === mark ? undefined : previous))}
                  onKeyDown={onKeyDown}
                />
              );
            })}
          </g>
        </svg>
      </div>
      {colorEncoding?.legend !== null && !colorEncoding?.legend?.disable && legends.length > 0 && (
        <Legends
          legends={legends.map(legend => ({ title: legend, color: colorFor(legend) }))}
          selectedLegends={selected}
          canSelectMultipleLegends
          onChange={handleLegendChange}
        />
      )}
      {showTooltip && (
        <ChartPopover
          isPopoverOpen
          positioning={{ target: active.target }}
          customCallout={{
            customizedCallout: (
              <VegaLiteTooltipContainer id={`${id}-tooltip`} className={classes.tooltip}>
                {content}
              </VegaLiteTooltipContainer>
            ),
          }}
        />
      )}
    </div>
  );
});
VegaLiteRangedChart.displayName = 'VegaLiteRangedChart';
