import { mergeClasses } from '@griffel/react';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSlots } from '../index';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const menuItemCheckboxClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemCheckbox',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  content: 'fui-MenuItemCheckbox__content',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
};

export const useMenuItemCheckboxStyles_unstable = (state: MenuItemCheckboxState): MenuItemCheckboxState => {
  'use no memo';

  state.root.className = mergeClasses(menuItemCheckboxClassNames.root, state.root.className);

  if (state.content) {
    state.content.className = mergeClasses(menuItemCheckboxClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemCheckboxClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemCheckboxClassNames.icon, state.icon.className);
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemCheckboxClassNames.checkmark, state.checkmark.className);
  }

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);

  return state;
};
