import { clsx } from 'clsx';
import type { PieProps, PieStyles } from './Pie.types';

import styles from './Pie.module.css';

/**
 * Public identity class for the DonutChart Pie.
 *
 * DEPRECATED FOR STYLING INTERNALS — deliberately NOT tagged `@deprecated` (see
 * useDonutChartStyles.styles.ts for why). `root` is retained as the component's identity class — the
 * Tailwind named-group marker (DECISIONS.md D15.1) — and is now the ONLY handle by which a
 * test or another module can address anything Pie renders, because the module locals are
 * hashed. The `insideDonutString` BEM static was removed with the statics sweep
 * (DECISIONS.md D16.1 / D16.5).
 *
 * The marker keeps the `donut-pie` qualifier the old statics carried (`fui-donut-pie__*`)
 * rather than the bare `Pie` displayName, for the same reason as Arc: `group/fui-pie` would
 * be an unqualified token in a GLOBAL namespace shared by every converted package
 * (`{@docCategory PieDonutChart}`).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + donutPieClassNames.root` is an invalid selector. Use
 * `fuiSelector(donutPieClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 *
 * @internal
 */
export const donutPieClassNames: { root: string } = {
  root: 'group/fui-donut-pie',
};

/**
 * Apply styling to the Pie inside donut chart component
 */
export const usePieStyles = (props: PieProps): PieStyles => {
  const { className } = props;

  return {
    // `styles.root` is the identity-only local declared in Pie.module.css. It carries no
    // declarations and exists solely so this slot emits a selector-safe leading token ahead
    // of the group marker — the marker must never be `classList[0]` (DECISIONS.md D15.1 /
    // D16.2, nwsapi `:scope` polyfill under jsdom).
    root: clsx(styles.root, 'group/fui-donut-pie', className, props.styles?.root),
    // `className` is applied to BOTH slots, as it was before the conversion. Preserved
    // deliberately: DonutChart renders <Pie> without a className, so no call site observes
    // it, and changing it would be a behaviour change unrelated to the styling migration.
    insideDonutString: clsx(styles['inside-donut-string'], className, props.styles?.insideDonutString),
  };
};
