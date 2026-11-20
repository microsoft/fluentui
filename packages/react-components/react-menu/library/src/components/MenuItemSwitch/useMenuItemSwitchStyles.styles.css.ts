'use client';

import { clsx } from 'clsx';
import { type SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSwitchSlots, MenuItemSwitchState } from './MenuItemSwitch.types';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles.css';
import styles from './MenuItemSwitch.module.css';

export const menuItemSwitchClassNames: SlotClassNames<MenuItemSwitchSlots> = {
  root: 'fui-MenuItemSwitch',
  icon: 'fui-MenuItemSwitch__icon',
  content: 'fui-MenuItemSwitch__content',
  secondaryContent: 'fui-MenuItemSwitch__secondaryContent',
  switchIndicator: 'fui-MenuItemSwitch__switchIndicator',
  subText: 'fui-MenuItemSwitch__subText',
};

export const circleFilledClassName = 'fui-MenuItemSwitch__switchIndicator__circleFilled';

/**
 * Apply styling to the MenuItemSwitch slots based on the state
 */
export const useMenuItemSwitchStyles_unstable = (state: MenuItemSwitchState): MenuItemSwitchState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    menuItemSwitchClassNames.root,
    state.checked && styles.checked,
    state.subText && styles.multiline,
    state.root.className,
  );
  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = clsx(menuItemSwitchClassNames.content, state.content.className);
  }
  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(
      menuItemSwitchClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(menuItemSwitchClassNames.icon, state.icon.className);
  }
  if (state.subText) {
    // eslint-disable-next-line react-hooks/immutability
    state.subText.className = clsx(menuItemSwitchClassNames.subText, state.subText.className);
  }
  if (state.switchIndicator) {
    // eslint-disable-next-line react-hooks/immutability
    state.switchIndicator.className = clsx(
      menuItemSwitchClassNames.switchIndicator,
      styles.switchIndicator,
      state.switchIndicator.className,
    );
  }
  useMenuItemStyles_unstable({
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      checkmark: 'span',
      submenuIndicator: 'span',
    },
    checkmark: undefined,
    submenuIndicator: undefined,
    hasSubmenu: false,
    submenuOpen: false,
    persistOnClick: true,
  });
  return state;
};
