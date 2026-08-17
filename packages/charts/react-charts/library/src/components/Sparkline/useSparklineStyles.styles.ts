import { clsx } from 'clsx';
import type { SparklineProps, SparklineStyles } from './Sparkline.types';

import styles from './Sparkline.module.css';

/**
 * Public identity class for Sparkline.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    inlineBlock: clsx(styles['inline-block'], sparklineClassNames.root, props.styles?.inlineBlock),
    valueText: clsx(styles['value-text'], props.styles?.valueText),
  };
};
