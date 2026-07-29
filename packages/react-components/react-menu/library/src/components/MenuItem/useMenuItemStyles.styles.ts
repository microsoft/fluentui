'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks this file needs NO `enforce-use-client` suppression —
 * it still calls `useCheckmarkStyles_unstable`, so the rule agrees the directive is
 * required. Converted hooks that call nothing carry a trailing `eslint-disable-line`
 * instead; see useMenuListStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemState } from './MenuItem.types';

import styles from './MenuItem.module.css';

/**
 * Public identity class for MenuItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The `icon` / `checkmark` / `submenuIndicator` / `content` /
 * `secondaryContent` / `subText` keys were removed with the BEM statics (DECISIONS.md D16.1 /
 * D16.5): there is no public class-name handle on component internals.
 *
 * Every menu item variant — MenuItemLink, MenuItemCheckbox, MenuItemRadio, MenuItemSwitch —
 * routes through `useMenuItemStyles_unstable`, so all of them carry this marker alongside
 * their own. That is what keeps `MenuSplitGroup`'s child selectors matching every variant,
 * exactly as `fui-MenuItem` did (D16.3).
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuItemClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuItemClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const menuItemClassNames: { root: string } = {
  root: 'group/fui-menu-item',
};

/** Applies style classnames to slots */
export const useMenuItemStyles_unstable = (state: MenuItemState): MenuItemState => {
  const multiline = !!state.subText;

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in MenuItem.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // Griffel mergeClasses argument list.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    styles.root,
    'group/fui-menu-item',
    state.submenuOpen && styles['submenu-open'],
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.content) {
    // The Griffel source put `multiline && multilineStyles.content` AFTER the consumer
    // className. Class-attribute position carries no cascade meaning here (mergeClasses
    // only ever reordered ATOMICS, and a consumer string was passed through untouched), so
    // the conditional class moves ahead of the consumer's — which is what
    // `classname-overrides-win` asserts and what unlayered-beats-layered guarantees
    // (DECISIONS.md D7 revision / D9). Same move on every slot below.
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = clsx(styles.content, multiline && styles['content-multiline'], state.content.className);
  }

  if (state.checkmark) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkmark.className = clsx(styles.checkmark, state.checkmark.className);
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      styles['secondary-content'],
      state.disabled && styles.disabled,
      multiline && styles['secondary-content-multiline'],
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  if (state.submenuIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.submenuIndicator.className = clsx(
      styles['submenu-indicator'],
      multiline && styles['submenu-indicator-multiline'],
      state.submenuIndicator.className,
    );
  }

  if (state.subText) {
    // eslint-disable-next-line react-hooks/immutability
    state.subText.className = clsx(
      styles['sub-text'],
      state.disabled && styles['sub-text-disabled'],
      state.subText.className,
    );
  }

  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);

  return state;
};
