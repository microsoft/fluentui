'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useButtonStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useSplitButtonStyles.styles.ts.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { MenuButtonSlots, MenuButtonState } from './MenuButton.types';

import styles from './MenuButton.module.css';

export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
  root: 'fui-MenuButton',
  icon: 'fui-MenuButton__icon',
  menuIcon: 'fui-MenuButton__menuIcon',
};

export const useMenuButtonStyles_unstable = (state: MenuButtonState): MenuButtonState => {
  const expanded = state.root['aria-expanded'];

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. Every module class
  // below is conditional on `aria-expanded`, so `menuButtonClassNames.root` is currently
  // the ONLY thing satisfying that invariant here; see the note at the top of
  // MenuButton.module.css for what the statics-removal phase has to replace it with
  // (§4b's empty `.root {}` does not survive this build).
  //
  // The marker is MenuButton's OWN identity on an element that is also a Button:
  // `useButtonStyles_unstable` (called last) adds `fui-Button` and `group/fui-button` to
  // the same element, and a descendant can address whichever identity it means.
  //
  // The `aria-expanded` gates stay in JS rather than moving to the shared `expanded`
  // variant: they are the Griffel source's own conditions, they select whole slices
  // rather than states inside one, and keeping them here preserves the 1:1 mapping the
  // module header documents. Cascade priority is decided by the `@layer fui.*` order in
  // MenuButton.module.css.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    menuButtonClassNames.root,
    'group/fui-menu-button',
    expanded && styles.expanded,
    expanded && styles[`expanded-${state.appearance}`],
    state.root.className,
  );

  if (state.icon) {
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
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(
      menuButtonClassNames.icon,
      expanded && state.appearance !== 'primary' && styles['icon-expanded-high-contrast'],
      state.icon.className,
    );
  }

  if (state.menuIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.menuIcon.className = clsx(
      menuButtonClassNames.menuIcon,
      styles['menu-icon'],
      styles[`menu-icon-${state.size}`],
      !state.iconOnly && styles['menu-icon-not-icon-only'],
      state.menuIcon.className,
    );
  }

  // Called LAST, exactly as before: `useButtonStyles_unstable` composes its own classes
  // ahead of the incoming className, which is what made MenuButton win under Griffel. The
  // `fui.components.l2` altitude reproduces that winner now, but the call order still has
  // to stand so the consumer className stays last in the rendered class attribute.
  // The `iconPosition: 'before'` override is unchanged — it is a shallow copy, so the
  // shared `root` / `icon` slot objects (and the data attributes Button stamps on them)
  // are still the ones this component renders.
  useButtonStyles_unstable({ ...state, iconPosition: 'before' });

  return state;
};
