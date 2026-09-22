import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';
import styles from './MenuItem.module.css';

export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  content: 'fui-MenuItem__content',
  secondaryContent: 'fui-MenuItem__secondaryContent',
  subText: 'fui-MenuItem__subText',
};

/**
 * Applies the shared MenuItem CSS Modules classes to a state's slots. Reused by
 * MenuItemCheckbox, MenuItemLink, MenuItemRadio, and MenuItemSwitch, which all build on MenuItem's base styling.
 */
export const styleMenuItemSlots = (state: MenuItemState): void => {
  state.root.className = clsx(menuItemClassNames.root, styles.menuItem, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(menuItemClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.checkmark) {
    state.checkmark.className = clsx(menuItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }
  if (state.content) {
    state.content.className = clsx(
      menuItemClassNames.content,
      styles.content,
      state.subText && styles.multilineContent,
      state.content.className,
    );
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(
      menuItemClassNames.secondaryContent,
      styles.secondaryContent,
      state.subText && styles.centeredSlot,
      state.secondaryContent.className,
    );
  }
  if (state.submenuIndicator) {
    state.submenuIndicator.className = clsx(
      menuItemClassNames.submenuIndicator,
      styles.submenuIndicator,
      state.subText && styles.centeredSlot,
      state.submenuIndicator.className,
    );
  }
  if (state.subText) {
    state.subText.className = clsx(menuItemClassNames.subText, styles.subText, state.subText.className);
  }
};

/**
 * Applies a sibling component's own semantic classNames (e.g. MenuItemCheckbox's `fui-MenuItemCheckbox*`) on top of
 * the shared MenuItem slots. Reused by MenuItemCheckbox and MenuItemRadio.
 */
export const applyOwnMenuItemClasses = (state: MenuItemState, classNames: Record<string, string>): void => {
  state.root.className = clsx(classNames.root, state.root.className);
  for (const slotName of ['icon', 'checkmark', 'content', 'secondaryContent', 'subText'] as const) {
    const slot = state[slotName];
    if (slot && classNames[slotName]) {
      slot.className = clsx(classNames[slotName], slot.className);
    }
  }
};

export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
  styleMenuItemSlots(state);
  return state;
};
