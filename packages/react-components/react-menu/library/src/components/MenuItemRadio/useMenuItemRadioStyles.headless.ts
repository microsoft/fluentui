import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuItemSlots } from '../index';
import type { MenuItemRadioState } from './MenuItemRadio.types';

export const menuItemRadioClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemRadio',
  icon: 'fui-MenuItemRadio__icon',
  checkmark: 'fui-MenuItemRadio__checkmark',
  content: 'fui-MenuItemRadio__content',
  secondaryContent: 'fui-MenuItemRadio__secondaryContent',
  subText: 'fui-MenuItemRadio__subText',
};

export const useMenuItemRadioStyles_unstable = (state: MenuItemRadioState): void => {
  state.root.className = getComponentSlotClassName(menuItemRadioClassNames.root, state.root, state);

  if (state.content) {
    state.content.className = getComponentSlotClassName(menuItemRadioClassNames.content, state.content);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = getComponentSlotClassName(
      menuItemRadioClassNames.secondaryContent,
      state.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(menuItemRadioClassNames.icon, state.icon);
  }

  if (state.checkmark) {
    state.checkmark.className = getComponentSlotClassName(menuItemRadioClassNames.checkmark, state.checkmark);
  }

  if (state.subText) {
    state.subText.className = getComponentSlotClassName(menuItemRadioClassNames.subText, state.subText);
  }
};
