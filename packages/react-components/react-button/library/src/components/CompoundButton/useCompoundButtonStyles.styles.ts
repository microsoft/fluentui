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
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';

import styles from './CompoundButton.module.css';

export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;
  const disabledAny = disabled || disabledFocusable;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. `styles.root` is
  // unconditional, so it will keep a selector-safe token ahead of the marker once the
  // statics are removed (statics-removal-design.md §4a).
  //
  // The marker is CompoundButton's OWN identity on an element that is also a Button:
  // `useButtonStyles_unstable` (called last) adds `fui-Button` and `group/fui-button` to
  // the same element, and a descendant can address whichever identity it means.
  //
  // Cascade priority is decided by the `@layer fui.*` order and by file position inside
  // CompoundButton.module.css — see that file's header for the mapping back to the
  // mergeClasses() argument order, including why its blocks are bucket-major.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    compoundButtonClassNames.root,
    'group/fui-compound-button',

    // Root styles
    styles.root,
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
  state.contentContainer.className = clsx(
    compoundButtonClassNames.contentContainer,
    styles['content-container'],
    state.contentContainer.className,
  );

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      compoundButtonClassNames.icon,
      styles.icon,
      state.root.children !== undefined && state.root.children !== null && styles[`icon-${iconPosition}`],
      state.icon.className,
    );
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      compoundButtonClassNames.secondaryContent,
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
