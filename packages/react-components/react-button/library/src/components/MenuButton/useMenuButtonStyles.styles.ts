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

  // Named group marker first, consumer className last. Every module class here is
  // conditional on `aria-expanded`, so this hook alone cannot put a selector-safe token
  // ahead of the marker — and it does not have to: `useButtonStyles_unstable` is called
  // LAST and prepends Button's own unconditional `styles.root`, so the token this string
  // ultimately renders at `classList[0]` is Button's hashed root class, never a marker
  // (DECISIONS.md D15.1 / D16.2; asserted by `component-has-group-marker`). §4b's empty
  // `.root {}` is NOT usable here — a rule with no declarations is dropped before the
  // class map is extracted, so `styles.root` would come back `undefined`; see the note at
  // the top of MenuButton.module.css.
  //
  // The marker is MenuButton's OWN identity on an element that is also a Button:
  // `useButtonStyles_unstable` adds `group/fui-button` to the same element, so this root
  // carries two markers by design and a descendant can address whichever identity it means.
  //
  // The `aria-expanded` gates stay in JS rather than moving to the shared `expanded`
  // variant: they are the Griffel source's own conditions, they select whole slices
  // rather than states inside one, and keeping them here preserves the 1:1 mapping the
  // module header documents. Cascade priority is decided by the `@layer fui.*` order in
  // MenuButton.module.css.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        'group/fui-menu-button',
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
