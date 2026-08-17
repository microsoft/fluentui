import { clsx } from 'clsx';
import type { ArcProps, ArcStyles } from './Arc.types';

import styles from './Arc.module.css';

/**
 * Public identity class for the DonutChart Arc.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * The marker keeps the `donut-arc` qualifier the old statics carried (`fui-donut-arc__*`)
 * rather than the bare `Arc` displayName. `group/fui-arc` would be an unqualified token in a
 * GLOBAL, unhashed namespace shared by every converted package, and `Arc` is a generic name;
 * `donut-arc` is this component's effective name in the package (`{@docCategory ArcDonutChart}`).
 *
 * Note that the marker sits on the arc `<path>` — the element `ArcStyles.root` has always
 * named — not on the wrapping `<g>`, which is a class-less grouping node Arc does not expose
 * as a slot. `focusRing` and `arcLabel` are that path's SIBLINGS, so no `group-*` variant can
 * reach them from here; none is needed today, and stamping the `<g>` instead would add a DOM
 * node's worth of public surface for no consumer.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + donutArcClassNames.root` is an invalid selector. Use
 * `fuiSelector(donutArcClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 *
 * @internal
 */
export const donutArcClassNames: { root: string } = {
  root: 'group/fui-donut-arc',
};

/**
 * Apply styling to the Arc components
 */
export const useArcStyles = (props: ArcProps): ArcStyles => {
  const { className } = props;

  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(styles.root, donutArcClassNames.root, className, props.styles?.root),
    focusRing: clsx(styles['focus-ring'], props.styles?.focusRing),
    arcLabel: clsx(styles['arc-label'], props.styles?.arcLabel),
  };
};
