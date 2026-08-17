import { clsx } from 'clsx';
import type { PieProps, PieStyles } from './Pie.types';

import styles from './Pie.module.css';

/**
 * Public identity class for the DonutChart Pie.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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
 * The single module-local token carried by Pie's centred `<text>` slot, exposed on its own so
 * `wrapTextInsideDonut` can build a d3 selector from it.
 *
 * WHY NOT `usePieStyles(props).insideDonutString`. That value is a `clsx` COMPOSITION —
 * `styles['inside-donut-string']` plus `props.className` plus `props.styles?.insideDonutString`.
 * `wrapTextInsideDonut` interpolates its argument into `` `.${selectorClass}` `` (utilities.ts),
 * so the moment a consumer supplies either of those props the composition becomes multi-token and
 * the interpolation degrades into a descendant chain (`.a .b`) that matches nothing — the text
 * wrapping silently stops running. DonutChart renders `<Pie>` without both props today, so the
 * composition happens to be single-token and the selector happens to work; this const removes the
 * dependence on that accident. Same token either way, so no rendered class and no pixel changes.
 *
 * @internal
 */
export const pieInsideDonutStringClassName: string = styles['inside-donut-string'];

/**
 * Apply styling to the Pie inside donut chart component
 */
export const usePieStyles = (props: PieProps): PieStyles => {
  const { className } = props;

  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(styles.root, donutPieClassNames.root, className, props.styles?.root),
    // `className` is applied to BOTH slots, as it was before the conversion. Preserved
    // deliberately: DonutChart renders <Pie> without a className, so no call site observes
    // it, and changing it would be a behaviour change unrelated to the styling migration.
    insideDonutString: clsx(styles['inside-donut-string'], className, props.styles?.insideDonutString),
  };
};
