'use client';

/*
 * NOTE on the directive above:
 * `makeStyles` is gone, but this file still re-exports and calls
 * `useTabAnimatedIndicatorStyles_unstable`, which is a real React hook, so
 * `enforce-use-client` does not consider the directive unnecessary and it stays. Converted
 * styles files that call nothing carry no directive at all.
 */

import { clsx } from 'clsx';
import type { TabState } from './Tab.types';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator.styles';

import styles from './Tab.module.css';

/**
 * Public identity class for Tab.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The per-slot keys (`icon`, `content`) were removed together with
 * the `fui-Tab__*` BEM statics (DECISIONS.md D16.1/D16.5): there is no public class-name
 * handle on component internals.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * NOTE: this is NOT the package's runtime-styling contract. The
 * `--fui-Tab__indicator--offset` / `--fui-Tab__indicator--scale` custom properties written by
 * `useTabAnimatedIndicatorStyles_unstable` as inline styles are unchanged, and remain the way
 * the measured selection-indicator animation is driven.
 */
export const tabClassNames: { root: string } = {
  root: 'group/fui-tab',
};

/**
 * Data attributes rendered on the element each style hook decorates, and matched by the shared
 * `@custom-variant` catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * These two are the ONLY attributes this conversion adds, and both are genuine fallbacks under
 * DECISIONS.md D15.6 — no native selector expresses either one:
 *
 * • `data-size` replaces `rootStyles[size + orientation]`, `pendingIndicatorStyles[…]`,
 *   `activeIndicatorStyles[…]` and `circularStyles[size]`'s selection halves.
 * • `data-orientation` replaces every `vertical ? … : …` ternary, and reuses the headless
 *   vocabulary's existing `vertical` / `horizontal` pair (reports/headless-precedent.md).
 *   It is ALWAYS stamped — both branches have styles.
 *
 * Together they collapse twenty Griffel slices into six nested `@variant` blocks. Everything
 * else Tab styles on — `disabled`, `:hover`, `:active`, `[data-fui-focus-visible]` — already
 * has a native or catalog selector, and `selected` / `appearance` / the animation's
 * `animating` flag stay CONDITIONAL MODULE CLASSES (see Tab.module.css's header for why
 * `selected` in particular must not become an attribute or read `aria-selected`).
 *
 * They are stamped by BOTH `useTabIndicatorStyles_unstable` (on `state.root`) and
 * `useTabButtonStyles_unstable` (on the `slot` it is handed). In the default composition those
 * are the same object and the second write is idempotent; when a custom Tab points the button
 * hook at a different element, each hook stamps the element whose rules read the attribute.
 */
type TabRootDataAttributes = {
  'data-size': TabState['size'];
  'data-orientation': 'horizontal' | 'vertical';
};

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
  'use no memo'; // justified: compiler would optimize useTabStyles_unstable — manual opt-out to preserve runtime behavior

  state = useTabIndicatorStyles_unstable(state);

  state = useTabButtonStyles_unstable(state, state.root);

  state = useTabContentStyles_unstable(state);

  return state;
};

/**
 * Applies styles for the Tab indicator based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The `Tab` component's current state
 * @returns The state object with updated button styles
 */
export const useTabIndicatorStyles_unstable = (state: TabState): TabState => {
  const { appearance, selected, size, vertical } = state;

  const rootDataAttributes: TabRootDataAttributes = {
    'data-size': size,
    'data-orientation': vertical ? 'vertical' : 'horizontal',
  };

  // The two indicator pseudo-elements are suppressed entirely for the circular appearances,
  // exactly as the Griffel original's `if (appearance !== 'subtle-circular' && …)` guard did.
  const isCircular = appearance === 'subtle-circular' || appearance === 'filled-circular';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(
        styles.root,
        tabClassNames.root,
        !isCircular && styles['pending-indicator'],
        !isCircular && selected && styles['active-indicator'],
        state.root.className,
      ),
    },
  };

  state = useTabAnimatedIndicatorStyles_unstable(state);

  return state;
};

/**
 * Applies styles to the Tab button slot based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The Tab component's current state
 * @param slot - The button slot of the Tab component
 * @returns The state object with updated button styles
 */
export const useTabButtonStyles_unstable = (state: TabState, slot: TabState['root']): TabState => {
  const { appearance, disabled, selected, size, vertical } = state;

  const isSubtleCircular = appearance === 'subtle-circular';
  const isFilledCircular = appearance === 'filled-circular';
  const isCircular = isSubtleCircular || isFilledCircular;

  const button = slot as TabState['root'] & TabRootDataAttributes;

  button['data-size'] = size;
  button['data-orientation'] = vertical ? 'vertical' : 'horizontal';

  const circularAppearance = [
    styles.circular,
    styles['focus-circular'],
    // sizes
    size === 'small' && styles['circular-small'],
    size === 'medium' && styles['circular-medium'],
    size === 'large' && styles['circular-large'],
    // subtle-circular appearance
    isSubtleCircular && styles['circular-subtle'],
    selected && isSubtleCircular && styles['circular-subtle-selected'],
    disabled && isSubtleCircular && styles['circular-subtle-disabled'],
    selected && disabled && isSubtleCircular && styles['circular-subtle-disabled-selected'],
    // filled-circular appearance
    isFilledCircular && styles['circular-filled'],
    selected && isFilledCircular && styles['circular-filled-selected'],
    disabled && isFilledCircular && styles['circular-filled-disabled'],
    selected && disabled && isFilledCircular && styles['circular-filled-disabled-selected'],
  ];

  const regularAppearance = [
    styles['focus-base'],
    !disabled && appearance === 'subtle' && styles.subtle,
    !disabled && appearance === 'transparent' && styles.transparent,
    !disabled && selected && styles.selected,
    disabled && styles.disabled,
  ];

  // The orientation and size slices this call used to carry are gone: they are `data-size` /
  // `data-orientation` variants nested inside `.button` now. See the header of
  // Tab.module.css.
  slot.className = clsx(
    styles.button,
    ...(isCircular ? circularAppearance : regularAppearance),
    disabled && styles['disabled-cursor'],
    slot.className,
  );

  return state;
};

/**
 * Applies styles to the Tab content slot based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The Tab component's current state
 * @returns The state object with updated content styles
 */
export const useTabContentStyles_unstable = (state: TabState): TabState => {
  const { selected, size } = state;

  if (state.icon) {
    // The icon's own size and glyph swap stay DIRECT classes rather than moving to the root's
    // `data-size` — this hook is exported and independently callable, so it may run without
    // `useTabIndicatorStyles_unstable` ever having stamped the root.
    state.icon.className = clsx(
      styles.icon,
      size === 'small' && styles['icon-small'],
      size === 'medium' && styles['icon-medium'],
      size === 'large' && styles['icon-large'],
      selected && styles['icon-selected'],
      state.icon.className,
    );
  }

  // This needs to be before state.content.className is updated
  if (state.contentReservedSpace) {
    // The `fui-Tab__content--reserved-space` static this list used to lead with is gone
    // (D16.1), and with it the `tabReservedSpaceClassNames` export that published it: the
    // object held nothing but a slot key, and under D16.5 slot keys are removed rather than
    // re-pointed. `styles.content` is the unconditional lead token now.
    state.contentReservedSpace.className = clsx(
      styles.content,
      size === 'large' ? styles['content-large-selected'] : styles['content-selected'],
      state.icon ? styles['content-icon-before'] : styles['content-no-icon-before'],
      styles['content-placeholder'],
      state.content.className,
    );
    // FIXME: this is a deprecated API
    // should be removed in the next major version
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    state.contentReservedSpaceClassName = state.contentReservedSpace.className;
  }

  state.content.className = clsx(
    styles.content,
    size === 'large' && styles['content-large'],
    selected && (size === 'large' ? styles['content-large-selected'] : styles['content-selected']),
    state.icon ? styles['content-icon-before'] : styles['content-no-icon-before'],
    state.content.className,
  );

  return state;
};
