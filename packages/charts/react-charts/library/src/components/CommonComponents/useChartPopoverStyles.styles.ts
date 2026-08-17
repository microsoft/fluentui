/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary. Same split as react-badge's Badge (no directive) vs CounterBadge (kept it
 * because it still calls a hook). `ChartPopover.tsx`, which does use hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { ChartPopoverProps, PopoverComponentStyles } from './ChartPopover.types';

import styles from './ChartPopover.module.css';

/**
 * Public identity class for ChartPopover.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5), stamped on the
 * `calloutContainer` `<div>` (ChartPopover's outermost element) — usable as a selector and
 * as a `group-*` variant target. The per-slot BEM statics (`fui-cart__calloutContentRoot`,
 * `fui-cart__calloutContainer`, …) were removed with the D16 sweep: there is no public
 * class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + popoverClassNames.root` is an invalid selector. Use
 * `fuiSelector(popoverClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const popoverClassNames: { root: string } = {
  root: 'group/fui-chart-popover',
};

/**
 * Apply styling to the ChartPopover slots based on the props.
 */
export const usePopoverStyles_unstable = (props: ChartPopoverProps): PopoverComponentStyles => {
  const { isCartesian } = props;
  return {
    calloutContentRoot: clsx(styles['callout-content-root'], props.styles?.calloutContentRoot),
    calloutDateTimeContainer: clsx(styles['callout-date-time-container'] /*props.styles?.calloutDateTimeContainer*/),
    calloutContentX: clsx(styles['callout-content-x'] /*props.styles?.calloutContentX*/),
    calloutBlockContainer: clsx(
      styles['callout-block-container'] /*props.styles?.calloutBlockContainerCartesian*/,
      isCartesian ? styles['callout-block-container-cartesian'] : styles['callout-block-container-non-cartesian'],
    ),
    calloutBlockContainertoDrawShapefalse: clsx(
      styles['callout-block-container-to-draw-shape-false'] /*props.styles?.calloutBlockContainertoDrawShapefalse*/,
    ),
    calloutBlockContainertoDrawShapetrue: clsx(
      styles['callout-block-container-to-draw-shape-true'] /*props.styles?.calloutBlockContainertoDrawShapetrue*/,
    ),
    shapeStyles: clsx(styles['shape-styles'] /*props.styles?.shapeStyles*/),
    calloutlegendText: clsx(styles['callout-legend-text'] /*props.styles?.calloutlegendText*/),
    calloutContentY: clsx(
      styles['callout-content-y'] /*props.styles?.calloutContentYNonCartesian*/,
      isCartesian ? styles['callout-content-y-cartesian'] : styles['callout-content-y-non-cartesian'],
    ),
    descriptionMessage: clsx(styles['description-message'] /*props.styles?. descriptionMessage*/),
    ratio: clsx(styles.ratio /*props.styles?.ratio*/),
    numerator: clsx(styles.numerator /*props.styles?.numerator*/),
    denominator: clsx(styles.denominator /*props.styles?.denominator*/),
    calloutInfoContainer: clsx(styles['callout-info-container']),
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    calloutContainer: clsx(styles['callout-container'], popoverClassNames.root),
  };
};
