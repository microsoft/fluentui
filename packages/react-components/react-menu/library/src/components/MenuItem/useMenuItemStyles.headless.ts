import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';

export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  content: 'fui-MenuItem__content',
  secondaryContent: 'fui-MenuItem__secondaryContent',
  subText: 'fui-MenuItem__subText',
};

export const useMenuItemStyles_unstable = (state: MenuItemState): MenuItemState => {
  state.root.className = getComponentSlotClassName(menuItemClassNames.root, state.root, state);

  if (state.content) {
    state.content.className = getComponentSlotClassName(menuItemClassNames.content, state.content);
  }

  if (state.checkmark) {
    state.checkmark.className = getComponentSlotClassName(menuItemClassNames.checkmark, state.checkmark);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = getComponentSlotClassName(
      menuItemClassNames.secondaryContent,
      state.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(menuItemClassNames.icon, state.icon);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = getComponentSlotClassName(
      menuItemClassNames.submenuIndicator,
      state.submenuIndicator,
    );
  }

  if (state.subText) {
    state.subText.className = getComponentSlotClassName(menuItemClassNames.subText, state.subText);
  }

  return state;
};
