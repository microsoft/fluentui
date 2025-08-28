import { mergeClasses } from '@griffel/react';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
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
  'use no memo';

  state.root.className = mergeClasses(menuItemRadioClassNames.root, state.root.className);

  if (state.content) {
    state.content.className = mergeClasses(menuItemRadioClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemRadioClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemRadioClassNames.icon, state.icon.className);
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemRadioClassNames.checkmark, state.checkmark.className);
  }

  if (state.subText) {
    state.subText.className = mergeClasses(menuItemRadioClassNames.subText, state.subText.className);
  }

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);
};
