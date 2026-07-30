import { clsx } from 'clsx';
import type { SparklineProps, SparklineStyles } from './Sparkline.types';

import styles from './Sparkline.module.css';

/**
 * Public identity class for Sparkline.
 *
 * DEPRECATED FOR STYLING INTERNALS — deliberately NOT tagged `@deprecated` (see
 * useDonutChartStyles.styles.ts for why). `root` is retained as the component's public identity class — the
 * Tailwind named-group marker (DECISIONS.md D15.1). The `inlineBlock` / `valueText` BEM
 * statics (`fui-sprk__*`) were removed with the statics sweep (DECISIONS.md D16.1 / D16.5):
 * there is no public class-name handle on component internals.
 *
 * The key is `root` even though Sparkline declares no slot by that name — the marker names
 * the COMPONENT and is stamped on its OUTERMOST node, which here is the `inlineBlock` wrapper
 * `<div>`. Same shape as react-tooltip, which portals and has no `root` slot either (§3b).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + sparklineClassNames.root` is an invalid selector. Use
 * `fuiSelector(sparklineClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 *
 * @internal
 */
export const sparklineClassNames: { root: string } = {
  root: 'group/fui-sparkline',
};

/**
 * Apply styling to the Sparkline slots based on the state
 */
export const useSparklineStyles = (props: SparklineProps): SparklineStyles => {
  return {
    // Unconditional module class FIRST, then the named group marker, then the consumer's own
    // string last (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's
    // `:scope` polyfill throws on the `/` under jsdom (DECISIONS.md D15.1).
    //
    // Cascade priority is decided by the `@layer fui.*` order in Sparkline.module.css, not by
    // the order of these arguments.
    inlineBlock: clsx(styles['inline-block'], 'group/fui-sparkline', props.styles?.inlineBlock),
    valueText: clsx(styles['value-text'], props.styles?.valueText),
  };
};
