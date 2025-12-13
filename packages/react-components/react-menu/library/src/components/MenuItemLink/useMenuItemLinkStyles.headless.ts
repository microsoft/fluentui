import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuItemLinkSlots, MenuItemLinkState } from './MenuItemLink.types';

export const menuItemLinkClassNames: SlotClassNames<MenuItemLinkSlots> = {
  root: 'fui-MenuItemLink',
  icon: 'fui-MenuItemLink__icon',
  checkmark: 'fui-MenuItemLink__checkmark',
  content: 'fui-MenuItemLink__content',
  secondaryContent: 'fui-MenuItemLink__secondaryContent',
};

export const useMenuItemLinkStyles_unstable = (state: MenuItemLinkState): MenuItemLinkState => {
  state.root.className = getComponentSlotClassName(menuItemLinkClassNames.root, state.root, state);

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(menuItemLinkClassNames.icon, state.icon);
  }

  if (state.content) {
    state.content.className = getComponentSlotClassName(menuItemLinkClassNames.content, state.content);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = getComponentSlotClassName(
      menuItemLinkClassNames.secondaryContent,
      state.secondaryContent,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = getComponentSlotClassName(menuItemLinkClassNames.checkmark, state.checkmark);
  }

  return state;
};
