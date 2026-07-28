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
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';

import styles from './ToggleButton.module.css';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  const { appearance, checked, disabled, disabledFocusable, isAccessible } = state;
  const disabledAny = disabled || disabledFocusable;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. Every module class
  // below is conditional, so `toggleButtonClassNames.root` is currently the ONLY thing
  // satisfying that invariant here; see the note at the top of ToggleButton.module.css
  // for what the statics-removal phase has to replace it with (§4b's empty `.root {}`
  // does not survive this build).
  //
  // The marker is a literal, unhashed, GLOBAL token and it is deliberately ToggleButton's
  // OWN identity even though this element is also a Button: `useButtonStyles_unstable`
  // (called last) adds `fui-Button` and `group/fui-button` to the same element, and a
  // descendant — or a wrapping component such as react-toolbar's ToolbarToggleButton —
  // can then address whichever identity it means. ToolbarToggleButton/ToolbarRadioButton
  // compound `:global(.group\/fui-toggle-button)` for exactly that reason; see their
  // modules.
  //
  // No state mirrors are needed (DECISIONS.md D15, Tier 0): every condition below is a
  // JS-side gate that selects a module class, exactly as the mergeClasses arguments it
  // replaces did. Cascade priority is decided by the `@layer fui.*` order and by file
  // position inside ToggleButton.module.css — see that file's header for the mapping back
  // to the mergeClasses() argument order, including why its blocks are bucket-major
  // rather than slice-major.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    toggleButtonClassNames.root,
    'group/fui-toggle-button',

    // Primary high contrast styles
    appearance === 'primary' && styles['primary-high-contrast'],
    appearance === 'primary' && disabledAny && styles['primary-high-contrast-disabled'],

    // Checked styles
    checked && styles.checked,
    checked && styles['checked-high-contrast'],
    appearance && checked && styles[`checked-${appearance}`],

    // Opt-in accessible checked styles
    isAccessible && checked && styles['accessible-checked'],
    isAccessible && appearance && checked && styles[`accessible-checked-${appearance}`],

    // Disabled styles
    disabledAny && styles.disabled,
    appearance && disabledAny && styles[`disabled-${appearance}`],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    // `styles.icon` is unconditional (it carries the forced-colors `forced-color-adjust`
    // reset), which is also what makes it a stable private handle for the
    // `.accessible-checked-subtle` hover rule in the module.
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      toggleButtonClassNames.icon,
      checked && !isAccessible && (appearance === 'subtle' || appearance === 'transparent') && styles['checked-icon'],
      styles.icon,
      state.icon.className,
    );
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made ToggleButton win under Griffel.
  // The `fui.components.l2` altitude reproduces that winner now, but the call order still
  // has to stand so the consumer className stays last in the rendered class attribute.
  useButtonStyles_unstable(state);

  return state;
};
