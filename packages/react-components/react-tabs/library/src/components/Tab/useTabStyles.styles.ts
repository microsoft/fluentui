'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike most converted styles files this one keeps a BARE `'use client'` with no
 * `enforce-use-client` suppression. `makeStyles` is gone, but the file still re-exports and
 * calls `useTabAnimatedIndicatorStyles_unstable`, which is a real React hook, so the rule
 * does not consider the directive unnecessary and a suppression here would be reported as an
 * unused disable directive.
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
 * The value is a class TOKEN, not a selector — `'.' + tabClassNames.root` is invalid CSS,
 * because the `/` must be escaped in a selector. Use `fuiSelector(tabClassNames.root)` from
 * `@fluentui/react-utilities` (DECISIONS.md D16.5).
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

  useTabIndicatorStyles_unstable(state);

  useTabButtonStyles_unstable(state, state.root);

  useTabContentStyles_unstable(state);

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

  const root = state.root as TabState['root'] & TabRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability
  root['data-size'] = size;
  // eslint-disable-next-line react-hooks/immutability
  root['data-orientation'] = vertical ? 'vertical' : 'horizontal';

  // The two indicator pseudo-elements are suppressed entirely for the circular appearances,
  // exactly as the Griffel original's `if (appearance !== 'subtle-circular' && …)` guard did.
  const isCircular = appearance === 'subtle-circular' || appearance === 'filled-circular';

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `fui-Tab` BEM
  // static that used to lead this list is gone (D16.1); the marker is Tab's sole public
  // identity CLASS now.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Tab.module.css and by block
  // order within it, not by the order of these arguments — see that file's header for the
  // mapping back to the mergeClasses() argument order this replaces, including the two places
  // where block order restores a specificity win that `:where()` flattening would have lost.
  //
  // The state mutation is preserved deliberately (DECISIONS.md D14 defers the pure-builder
  // rewrite to a single Phase 3 sweep), so the Griffel original's `react-hooks/immutability`
  // suppressions are retained wherever the rule still reports — here and on the two data
  // attributes above, which are the same kind of write. The equivalent writes in
  // `useTabButtonStyles_unstable` and `useTabContentStyles_unstable` carry none because the
  // rule does not report on them; an unused disable directive is itself a lint warning.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    styles.root,
    'group/fui-tab',
    !isCircular && styles['pending-indicator'],
    !isCircular && selected && styles['active-indicator'],
    state.root.className,
  );

  useTabAnimatedIndicatorStyles_unstable(state);

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
