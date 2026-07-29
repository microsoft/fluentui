'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useButtonStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useSplitButtonStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { CompoundButtonState } from './CompoundButton.types';

import styles from './CompoundButton.module.css';

/**
 * Public identity classes for CompoundButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The per-slot `icon` / `contentContainer` / `secondaryContent`
 * keys were removed in D16.5; there is no public class-name handle on component internals.
 *
 * `'.' + compoundButtonClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const compoundButtonClassNames: { root: string } = {
  root: 'group/fui-compound-button',
};

export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;
  const disabledAny = disabled || disabledFocusable;

  // Module class FIRST, then the named group marker, consumer className LAST (D16.2).
  // `styles.root` is unconditional, so it is always the selector-safe `classList[0]` the
  // marker must never occupy (nwsapi's `:scope` polyfill throws on it under jsdom;
  // DECISIONS.md D15.1). `useButtonStyles_unstable` (called last) prepends its own
  // `styles.root` ahead of all of this, so the rendered leading token is Button's.
  //
  // The marker is CompoundButton's OWN identity on an element that is also a Button:
  // `useButtonStyles_unstable` adds `group/fui-button` to the same element, so this root
  // carries two markers by design and a descendant can address whichever identity it means.
  //
  // Cascade priority is decided by the `@layer fui.*` order and by file position inside
  // CompoundButton.module.css — see that file's header for the mapping back to the
  // mergeClasses() argument order, including why its blocks are bucket-major.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    // Root styles
    styles.root,
    'group/fui-compound-button',
    styles['high-contrast'],
    appearance && styles[appearance],
    styles[size],

    // Disabled styles
    disabledAny && styles.disabled,
    disabledAny && styles['disabled-high-contrast'],

    // Icon-only styles
    iconOnly && styles[`icon-only-${size}`],

    // User provided class name
    state.root.className,
  );

  // eslint-disable-next-line react-hooks/immutability
  state.contentContainer.className = clsx(styles['content-container'], state.contentContainer.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      styles.icon,
      state.root.children !== undefined && state.root.children !== null && styles[`icon-${iconPosition}`],
      state.icon.className,
    );
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      styles['secondary-content'],
      styles[`secondary-content-${size}`],
      state.secondaryContent.className,
    );
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made CompoundButton win under Griffel.
  // The `fui.components.l2` altitude reproduces that winner now, but the call order still
  // has to stand so the consumer className stays last in the rendered class attribute.
  useButtonStyles_unstable(state);

  return state;
};
