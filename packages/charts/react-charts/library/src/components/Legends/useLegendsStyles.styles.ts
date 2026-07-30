import { clsx } from 'clsx';
import type { LegendsProps, LegendsStyles } from './Legends.types';

import styles from './Legends.module.css';

// Constants needed to create legends using SVG for image export
export const LEGEND_CONTAINER_MARGIN_TOP = 8;
export const LEGEND_CONTAINER_MARGIN_START = 12;
export const LEGEND_PADDING = 8;
export const LEGEND_HEIGHT = 32;
export const LEGEND_SHAPE_BORDER = 1;
const LEGEND_SHAPE_SIZE_WITHOUT_BORDER = 12;
// SVG strokes are drawn centered around the path, with half of the stroke width extending inward
// (overlapping the fill area) and half outward. To ensure the filled area maintains its intended size,
// expand the shape accordingly.
export const LEGEND_SHAPE_SIZE = LEGEND_SHAPE_SIZE_WITHOUT_BORDER + LEGEND_SHAPE_BORDER;
export const LEGEND_SHAPE_MARGIN_END = 8;
export const INACTIVE_LEGEND_TEXT_OPACITY = 0.67;

/**
 * Public identity class for Legends.
 *
 * @internal
 *
 * @deprecated for styling. The only supported way to style this component's internals is the
 * per-slot `styles` prop. `root` is retained as the component's identity class — the Tailwind
 * named-group marker (DECISIONS.md D15.1) — usable as a selector and as a `group-*` variant
 * target. The nine BEM slot keys were removed with the statics (DECISIONS.md D16.1 / D16.5):
 * there is no class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + legendClassNames.root` is an invalid selector. Use `fuiSelector(legendClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const legendClassNames: { root: string } = {
  root: 'group/fui-legends',
};

export const useLegendStyles = (props: LegendsProps): LegendsStyles => {
  const { className } = props; // ToDo - width, barHeight is non enumerable. Need to be used inline.

  // Unconditional module class FIRST, then the named group marker, then the consumer's own
  // strings last (DECISIONS.md D15.1 / D16.2). The marker must never be `classList[0]` —
  // nwsapi's `:scope` polyfill throws on the `/` under jsdom — and `styles.root` is the token
  // that guarantees it, since clsx never drops an unconditional argument. The BEM static that
  // used to hold that position is gone (DECISIONS.md D16.1).
  //
  // Only the root carries the marker: `.legend`, `.rect`, `.text` … are descendants of it, so
  // `@variant group-*/fui-legends` reaches them for free (DECISIONS.md D15, "No other slot
  // gets a marker").
  //
  // Cascade priority is decided by the `@layer fui.*` order in Legends.module.css, not by the
  // order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for why `.legend` / `.resizable-area`
  // sit at `fui.components.l2` rather than `.l1`.
  return {
    root: clsx(styles.root, 'group/fui-legends', className, props.styles?.root),
    legend: clsx(styles.legend, props.styles?.legend),
    rect: clsx(styles.rect, props.styles?.rect),
    shape: clsx(styles.shape, props.styles?.shape),
    triangle: clsx(styles.triangle, props.styles?.triangle),
    text: clsx(styles.text, props.styles?.text),
    hoverChange: clsx(styles['hover-change'], props.styles?.hoverChange),
    resizableArea: clsx(styles['resizable-area'], props.styles?.resizableArea),
    legendContainer: clsx(styles['legend-container'], props.styles?.legendContainer),
    annotation: clsx(styles.annotation, props.styles?.annotation),
  };
};
