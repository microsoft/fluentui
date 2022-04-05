import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { MenuItemSlots } from '../index';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

/**
 * @deprecated Use `menuItemCheckboxClassNames.root` instead.
 */
export const menuItemCheckboxClassName = 'fui-MenuItemCheckbox';
export const menuItemCheckboxClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemCheckbox',
  icon: 'fui-MenuItemCheckbox__icon',
  checkmark: 'fui-MenuItemCheckbox__checkmark',
  content: 'fui-MenuItemCheckbox__content',
  secondaryContent: 'fui-MenuItemCheckbox__secondaryContent',
};

export const useMenuItemCheckboxStyles_unstable = (state: MenuItemCheckboxState) => {
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
};
