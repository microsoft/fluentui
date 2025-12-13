import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuItemSlots } from '../index';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const menuItemCheckboxClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemCheckbox',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  content: 'fui-MenuItemCheckbox__content',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
  subText: 'fui-MenuItemCheckbox__subText',
};

export const useMenuItemCheckboxStyles_unstable = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  state.root.className = getComponentSlotClassName(menuItemCheckboxClassNames.root, state.root, state);

  if (state.content) {
    state.content.className = getComponentSlotClassName(menuItemCheckboxClassNames.content, state.content);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = getComponentSlotClassName(
      menuItemCheckboxClassNames.secondaryContent,
      state.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(menuItemCheckboxClassNames.icon, state.icon);
  }

  if (state.checkmark) {
    state.checkmark.className = getComponentSlotClassName(menuItemCheckboxClassNames.checkmark, state.checkmark);
  }

  if (state.subText) {
    state.subText.className = getComponentSlotClassName(menuItemCheckboxClassNames.subText, state.subText);
  }

  return state;
};
