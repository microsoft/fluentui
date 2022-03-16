import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { MenuItemSlots } from '../index';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles';
import type { MenuItemRadioState } from './MenuItemRadio.types';

/**
 * @deprecated Use `menuItemRadioClassNames.root` instead.
 */
export const menuItemRadioClassName = 'fui-MenuItemRadio';
export const menuItemRadioClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemRadio',
  icon: 'fui-MenuItemRadio__icon',
  checkmark: 'fui-MenuItemRadio__checkmark',
  content: 'fui-MenuItemRadio__content',
  secondaryContent: 'fui-MenuItemRadio__secondaryContent',
};

export const useMenuItemRadioStyles_unstable = (state: MenuItemRadioState) => {
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

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);
};
