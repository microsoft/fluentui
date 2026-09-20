import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  MenuDividerSlots,
  MenuDividerState,
  MenuGroupHeaderSlots,
  MenuGroupHeaderState,
  MenuGroupSlots,
  MenuGroupState,
  MenuItemCheckboxState,
  MenuItemLinkSlots,
  MenuItemLinkState,
  MenuItemRadioState,
  MenuItemSlots,
  MenuItemState,
  MenuItemSwitchSlots,
  MenuItemSwitchState,
  MenuListSlots,
  MenuListState,
  MenuPopoverSlots,
  MenuPopoverState,
  MenuSplitGroupSlots,
  MenuSplitGroupState,
} from './Menu.types';
import styles from './Menu.module.css';

export const menuListClassNames: SlotClassNames<MenuListSlots> = { root: 'fui-MenuList' };
export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  content: 'fui-MenuItem__content',
  secondaryContent: 'fui-MenuItem__secondaryContent',
  subText: 'fui-MenuItem__subText',
};
export const menuItemCheckboxClassNames = {
  root: 'fui-MenuItemCheckbox',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  content: 'fui-MenuItemCheckbox__content',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
  subText: 'fui-MenuItemCheckbox__subText',
};
export const menuItemRadioClassNames = {
  root: 'fui-MenuItemRadio',
  icon: 'fui-MenuItemRadio__icon',
  checkmark: 'fui-MenuItemRadio__checkmark',
  content: 'fui-MenuItemRadio__content',
  secondaryContent: 'fui-MenuItemRadio__secondaryContent',
  subText: 'fui-MenuItemRadio__subText',
};
export const menuItemLinkClassNames: SlotClassNames<MenuItemLinkSlots> = {
  root: 'fui-MenuItemLink',
  icon: 'fui-MenuItemLink__icon',
  checkmark: 'fui-MenuItemLink__checkmark',
  content: 'fui-MenuItemLink__content',
  secondaryContent: 'fui-MenuItemLink__secondaryContent',
};
export const menuItemSwitchClassNames: SlotClassNames<MenuItemSwitchSlots> = {
  root: 'fui-MenuItemSwitch',
  icon: 'fui-MenuItemSwitch__icon',
  content: 'fui-MenuItemSwitch__content',
  secondaryContent: 'fui-MenuItemSwitch__secondaryContent',
  switchIndicator: 'fui-MenuItemSwitch__switchIndicator',
  subText: 'fui-MenuItemSwitch__subText',
};
export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = { root: 'fui-MenuDivider' };
export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = { root: 'fui-MenuPopover' };
export const menuGroupClassNames: SlotClassNames<MenuGroupSlots> = { root: 'fui-MenuGroup' };
export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = { root: 'fui-MenuGroupHeader' };
export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = { root: 'fui-MenuSplitGroup' };
export const menuSplitGroupMultilineAttr = 'data-multiline';

const styleMenuItemSlots = (state: MenuItemState): void => {
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

export const useMenuListStyles = (state: MenuListState): MenuListState => {
  state.root.className = clsx(
    menuListClassNames.root,
    styles.menuList,
    state.hasMenuContext && styles.menuListWithContext,
    state.root.className,
  );
  return state;
};

export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
  styleMenuItemSlots(state);
  return state;
};

const applyOwnMenuItemClasses = (state: MenuItemState, classNames: Record<string, string>): void => {
  state.root.className = clsx(classNames.root, state.root.className);
  for (const slotName of ['icon', 'checkmark', 'content', 'secondaryContent', 'subText'] as const) {
    const slot = state[slotName];
    if (slot && classNames[slotName]) {
      slot.className = clsx(classNames[slotName], slot.className);
    }
  }
};

export const useMenuItemCheckboxStyles = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  applyOwnMenuItemClasses(state, menuItemCheckboxClassNames);
  styleMenuItemSlots(state);
  return state;
};

export const useMenuItemRadioStyles = (state: MenuItemRadioState): MenuItemRadioState => {
  applyOwnMenuItemClasses(state, menuItemRadioClassNames);
  styleMenuItemSlots(state);
  return state;
};

export const useMenuItemLinkStyles = (state: MenuItemLinkState): MenuItemLinkState => {
  styleMenuItemSlots(state as MenuItemState);
  state.root.className = clsx(menuItemLinkClassNames.root, styles.menuItemLink, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(menuItemLinkClassNames.icon, state.icon.className);
  }
  if (state.checkmark) {
    state.checkmark.className = clsx(menuItemLinkClassNames.checkmark, state.checkmark.className);
  }
  if (state.content) {
    state.content.className = clsx(menuItemLinkClassNames.content, state.content.className);
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(menuItemLinkClassNames.secondaryContent, state.secondaryContent.className);
  }
  return state;
};

export const useMenuItemSwitchStyles = (state: MenuItemSwitchState): MenuItemSwitchState => {
  styleMenuItemSlots(state as unknown as MenuItemState);
  state.root.className = clsx(menuItemSwitchClassNames.root, state.root.className);
  if (state.icon) {
    state.icon.className = clsx(menuItemSwitchClassNames.icon, state.icon.className);
  }
  if (state.content) {
    state.content.className = clsx(menuItemSwitchClassNames.content, state.content.className);
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = clsx(
      menuItemSwitchClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }
  if (state.subText) {
    state.subText.className = clsx(menuItemSwitchClassNames.subText, state.subText.className);
  }
  if (state.switchIndicator) {
    state.switchIndicator.className = clsx(
      menuItemSwitchClassNames.switchIndicator,
      styles.switchIndicator,
      state.checked && styles.switchIndicatorChecked,
      state.subText && styles.centeredSlot,
      state.switchIndicator.className,
    );
  }
  return state;
};

export const useMenuDividerStyles = (state: MenuDividerState): MenuDividerState => {
  state.root.className = clsx(menuDividerClassNames.root, styles.menuDivider, state.root.className);
  return state;
};

export const useMenuPopoverStyles = (state: MenuPopoverState): MenuPopoverState => {
  state.root.className = clsx(menuPopoverClassNames.root, styles.menuPopover, state.root.className);
  return state;
};

export const useMenuGroupStyles = (state: MenuGroupState): MenuGroupState => {
  state.root.className = clsx(menuGroupClassNames.root, state.root.className);
  return state;
};

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState): MenuGroupHeaderState => {
  state.root.className = clsx(menuGroupHeaderClassNames.root, styles.menuGroupHeader, state.root.className);
  return state;
};

export const useMenuSplitGroupStyles = (state: MenuSplitGroupState): MenuSplitGroupState => {
  state.root.className = clsx(menuSplitGroupClassNames.root, styles.menuSplitGroup, state.root.className);
  return state;
};
