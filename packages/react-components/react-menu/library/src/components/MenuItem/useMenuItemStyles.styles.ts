'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useCheckmarkStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Converted leaf hooks are `clsx` plus a CSS-Modules import, call nothing, and carry no
 * directive at all; see useMenuListStyles.styles.ts.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        menuItemClassNames.root,
        state.submenuOpen && styles['submenu-open'],
        state.disabled && styles.disabled,
        state.root.className,
      ),
    },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  if (state.content) {
    state = {
      ...state,
      content: {
        ...state.content,
        className: clsx(styles.content, multiline && styles['content-multiline'], state.content.className),
      },
    };
  }

  if (state.checkmark) {
    state = {
      ...state,
      checkmark: { ...state.checkmark, className: clsx(styles.checkmark, state.checkmark.className) },
    };
  }

  if (state.secondaryContent) {
    state = {
      ...state,
      secondaryContent: {
        ...state.secondaryContent,
        className: clsx(
          styles['secondary-content'],
          state.disabled && styles.disabled,
          multiline && styles['secondary-content-multiline'],
          state.secondaryContent.className,
        ),
      },
    };
  }

  if (state.icon) {
    state = { ...state, icon: { ...state.icon, className: clsx(styles.icon, state.icon.className) } };
  }

  if (state.submenuIndicator) {
    state = {
      ...state,
      submenuIndicator: {
        ...state.submenuIndicator,
        className: clsx(
          styles['submenu-indicator'],
          multiline && styles['submenu-indicator-multiline'],
          state.submenuIndicator.className,
        ),
      },
    };
  }

  if (state.subText) {
    state = {
      ...state,
      subText: {
        ...state.subText,
        className: clsx(styles['sub-text'], state.disabled && styles['sub-text-disabled'], state.subText.className),
      },
    };
  }

  // The checkmark helper composes exactly one slot, so only that slot is threaded back — its
  // parameter type (`MenuItemSelectableState & Pick<MenuItemState, 'checkmark'>`) is wider than
  // MenuItemState in the `checked` direction and narrower everywhere else, so re-merging the
  // whole object would not type. Taking `checkmark` alone is the precise data flow (F1 of the
  // D14 mutation removal — thread the composed result, do not discard it).
  state = { ...state, checkmark: useCheckmarkStyles_unstable(state as MenuItemCheckboxState).checkmark };

  return state;
};
