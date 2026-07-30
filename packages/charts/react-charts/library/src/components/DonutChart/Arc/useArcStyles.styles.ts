import { clsx } from 'clsx';
import type { ArcProps, ArcStyles } from './Arc.types';

import styles from './Arc.module.css';

/**
 * Public identity class for the DonutChart Arc.
 *
 * DEPRECATED FOR STYLING INTERNALS — deliberately NOT tagged `@deprecated` (see
 * useDonutChartStyles.styles.ts for why). `root` is retained as the component's identity class — the
 * Tailwind named-group marker (DECISIONS.md D15.1). The `focusRing` and `arcLabel` BEM
 * statics were removed with the statics sweep (DECISIONS.md D16.1 / D16.5): there is no
 * public class-name handle on component internals.
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
    // Unconditional module class FIRST, then the named group marker, then the consumer's own
    // strings last (DECISIONS.md D16.2). Cascade priority is decided by the `@layer fui.*`
    // order in Arc.module.css, not by the order of these arguments.
    root: clsx(styles.root, 'group/fui-donut-arc', className, props.styles?.root),
    focusRing: clsx(styles['focus-ring'], props.styles?.focusRing),
    arcLabel: clsx(styles['arc-label'], props.styles?.arcLabel),
  };
};
