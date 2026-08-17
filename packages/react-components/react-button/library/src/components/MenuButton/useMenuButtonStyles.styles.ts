'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks are `clsx` plus a CSS-Modules import, call nothing, and carry no
 * directive at all; see useSplitButtonStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { MenuButtonState } from './MenuButton.types';

import styles from './MenuButton.module.css';

/**
 * Public identity classes for MenuButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The per-slot `icon` / `menuIcon` keys were removed in D16.5;
 * there is no public class-name handle on component internals.
 *
 * `'.' + menuButtonClassNames.root` is an invalid *selector* — the `/` terminates the class
 * name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuButtonClassNames: { root: string } = {
  root: 'group/fui-menu-button',
};

export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
  const expanded = state.root['aria-expanded'];

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        menuButtonClassNames.root,
        expanded && styles.expanded,
        expanded && styles[`expanded-${state.appearance}`],
        state.root.className,
      ),
    },
  };

  // PRESERVED VERBATIM, including its quirk. The Griffel source reads
  //
  //   state.root['aria-expanded'] && iconExpandedStyles[state.appearance] && iconExpandedStyles.highContrast
  //
  // — an `&&` chain, not a comma-separated argument list — so the APPEARANCE colour is
  // never applied; the expression evaluates to `highContrast` alone, and only when the
  // appearance slice is a non-empty class string. `primary` is the one empty slice
  // (`{}` → `''` → falsy), so `appearance === 'primary'` suppresses the whole thing.
  // That is a behaviour contract for this conversion, not a bug to fix while migrating
  // styling: `appearance !== 'primary'` is the exact, readable form of the same guard.
  if (state.icon) {
    state = {
      ...state,
      icon: {
        ...state.icon,
        className: clsx(
          expanded && state.appearance !== 'primary' && styles['icon-expanded-high-contrast'],
          state.icon.className,
        ),
      },
    };
  }

  if (state.menuIcon) {
    state = {
      ...state,
      menuIcon: {
        ...state.menuIcon,
        className: clsx(
          styles['menu-icon'],
          styles[`menu-icon-${state.size}`],
          !state.iconOnly && styles['menu-icon-not-icon-only'],
          state.menuIcon.className,
        ),
      },
    };
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made MenuButton win under Griffel. The
  // `fui.components.l2` altitude reproduces that winner now, but the call order still has
  // to stand so the consumer className stays last in the rendered class attribute.
  // The `iconPosition: 'before'` override is unchanged — it is a shallow copy, so the
  // shared `root` / `icon` slot objects (and the data attributes Button stamps on them)
  // are still the ones this component renders.
  // Thread the composed result instead of discarding it (F1 of the D14 mutation removal). The
  // delegate is handed a shallow copy carrying `iconPosition: 'before'`, so `iconPosition` is
  // dropped off its return before the merge — MenuButtonState deliberately `Omit`s that key,
  // and re-merging it would put a property on the rendered state that this component's own
  // type says is absent. The cast re-narrows `components` back to MenuButtonSlots, which the
  // delegate's ButtonState view does not know about; the object and every slot object on it is
  // still the one MenuButton renders.
  const { iconPosition, ...composedButton } = useButtonStyles_unstable({ ...state, iconPosition: 'before' });
  state = { ...state, ...composedButton } as MenuButtonState;

  return state;
};
