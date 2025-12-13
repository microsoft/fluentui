import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuItemSwitchSlots, MenuItemSwitchState } from './MenuItemSwitch.types';

export const menuItemSwitchClassNames: SlotClassNames<MenuItemSwitchSlots> = {
  root: 'fui-MenuItemSwitch',
  icon: 'fui-MenuItemSwitch__icon',
  content: 'fui-MenuItemSwitch__content',
  secondaryContent: 'fui-MenuItemSwitch__secondaryContent',
  switchIndicator: 'fui-MenuItemSwitch__switchIndicator',
  subText: 'fui-MenuItemSwitch__subText',
};

export const circleFilledClassName = 'fui-MenuItemSwitch__switchIndicator__circleFilled';

export const useMenuItemSwitchStyles_unstable = (state: MenuItemSwitchState): MenuItemSwitchState => {
  state.root.className = getComponentSlotClassName(menuItemSwitchClassNames.root, state.root, state);

  if (state.content) {
    state.content.className = getComponentSlotClassName(menuItemSwitchClassNames.content, state.content);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = getComponentSlotClassName(
      menuItemSwitchClassNames.secondaryContent,
      state.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(menuItemSwitchClassNames.icon, state.icon);
  }

  if (state.subText) {
    state.subText.className = getComponentSlotClassName(menuItemSwitchClassNames.subText, state.subText);
  }

  if (state.switchIndicator) {
    state.switchIndicator.className = getComponentSlotClassName(
      menuItemSwitchClassNames.switchIndicator,
      state.switchIndicator,
    );
  }

  return state;
};
