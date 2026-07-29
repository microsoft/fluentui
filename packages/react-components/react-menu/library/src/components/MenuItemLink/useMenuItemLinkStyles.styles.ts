'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuItemLinkSlots, MenuItemLinkState } from './MenuItemLink.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import type { MenuItemState } from '../MenuItem/MenuItem.types';

export const menuItemLinkClassNames: SlotClassNames<MenuItemLinkSlots> = {
  root: 'fui-MenuItemLink',
  icon: 'fui-MenuItemLink__icon',
  checkmark: 'fui-MenuItemLink__checkmark',
  content: 'fui-MenuItemLink__content',
  secondaryContent: 'fui-MenuItemLink__secondaryContent',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  resetLink: {
    textDecorationLine: 'none',
    textDecorationThickness: 'initial',
    textDecorationStyle: 'initial',
    textDecorationColor: 'initial',
  },
});

/**
 * Apply styling to the MenuItemLink slots based on the state
 */
export const useMenuItemLinkStyles_unstable = (state: MenuItemLinkState): MenuItemLinkState => {
  useMenuItemStyles_unstable(state as MenuItemState);
  const styles = useStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(menuItemLinkClassNames.root, styles.resetLink, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = mergeClasses(menuItemLinkClassNames.icon, state.icon.className);
  }

  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = mergeClasses(menuItemLinkClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = mergeClasses(
      menuItemLinkClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.checkmark) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkmark.className = mergeClasses(menuItemLinkClassNames.checkmark, state.checkmark.className);
  }

  return state;
};
