'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks are `clsx` plus a CSS-Modules import, call nothing, and carry no
 * directive at all; see useSplitButtonStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { ToggleButtonState } from './ToggleButton.types';

import styles from './ToggleButton.module.css';

/**
 * Public identity classes for ToggleButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target; react-toolbar's ToolbarToggleButton / ToolbarRadioButton compound
 * it for specificity. The per-slot `icon` key was removed in D16.5; there is no public
 * class-name handle on component internals.
 *
 * `'.' + toggleButtonClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const toggleButtonClassNames: { root: string } = {
  root: 'group/fui-toggle-button',
};

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  const { appearance, checked, disabled, disabledFocusable, isAccessible } = state;
  const disabledAny = disabled || disabledFocusable;

  // Named group marker first, consumer className last. Every module class here is
  // conditional (`checked`, `disabled`, `appearance === 'primary'`), so this hook alone
  // cannot put a selector-safe token ahead of the marker — and it does not have to:
  // `useButtonStyles_unstable` is called LAST and prepends Button's own unconditional
  // `styles.root`, so the token this string ultimately renders at `classList[0]` is
  // Button's hashed root class, never a marker (DECISIONS.md D15.1 / D16.2; asserted by
  // `component-has-group-marker`). §4b's empty `.root {}` is NOT usable here — a rule with
  // no declarations is dropped before the class map is extracted; see the note at the top
  // of ToggleButton.module.css.
  //
  // The marker is a literal, unhashed, GLOBAL token — after D16 the SOLE public identity
  // class — and it is deliberately ToggleButton's OWN identity even though this element is
  // also a Button: `useButtonStyles_unstable` adds `group/fui-button` to the same element,
  // so this root carries two markers by design and a descendant — or a wrapping component
  // such as react-toolbar's ToolbarToggleButton — can address whichever identity it means.
  // ToolbarToggleButton/ToolbarRadioButton compound `:global(.group\/fui-toggle-button)`
  // for exactly that reason; see their modules.
  //
  // No state mirrors are needed (DECISIONS.md D15, Tier 0): every condition below is a
  // JS-side gate that selects a module class, exactly as the mergeClasses arguments it
  // replaces did. Cascade priority is decided by the `@layer fui.*` order and by file
  // position inside ToggleButton.module.css — see that file's header for the mapping back
  // to the mergeClasses() argument order, including why its blocks are bucket-major
  // rather than slice-major.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
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
      ),
    },
  };

  // `styles.icon` is unconditional (it carries the forced-colors `forced-color-adjust`
  // reset), which is also what makes it a stable private handle for the
  // `.accessible-checked-subtle` hover rule in the module.
  if (state.icon) {
    state = {
      ...state,
      icon: {
        ...state.icon,
        className: clsx(
          checked &&
            !isAccessible &&
            (appearance === 'subtle' || appearance === 'transparent') &&
            styles['checked-icon'],
          styles.icon,
          state.icon.className,
        ),
      },
    };
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made ToggleButton win under Griffel.
  // The `fui.components.l2` altitude reproduces that winner now, but the call order still
  // has to stand so the consumer className stays last in the rendered class attribute.
  // ToggleButtonState widens ButtonState with `checked` / `isAccessible`, so the delegate's
  // narrower return is re-merged onto this component's own shape (F1 of the D14 mutation removal — thread the composed result, do not discard it).
  state = { ...state, ...useButtonStyles_unstable(state) };

  return state;
};
