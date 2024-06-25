import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuItemLinkSlots, MenuItemLinkState } from './MenuItemLink.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles';
import { MenuItemState } from '../MenuItem/MenuItem.types';

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
  'use no memo';

  useMenuItemStyles_unstable(state as MenuItemState);
  const styles = useStyles();
  state.root.className = mergeClasses(menuItemLinkClassNames.root, styles.resetLink, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemLinkClassNames.icon, state.icon.className);
  }

  if (state.content) {
    state.content.className = mergeClasses(menuItemLinkClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemLinkClassNames.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemLinkClassNames.checkmark, state.checkmark.className);
  }

  return state;
};
