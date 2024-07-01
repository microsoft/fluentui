import { mergeClasses, makeStyles } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createSlideStyles } from '@fluentui/react-positioning';

export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = {
  root: 'fui-MenuPopover',
};

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    boxSizing: 'border-box',
    minWidth: '138px',
    maxWidth: '300px',
    overflowX: 'hidden',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    padding: '4px',
    border: `1px solid ${tokens.colorTransparentStroke}`,
    ...typographyStyles.body1,
    ...createSlideStyles(10),
  },
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuPopoverStyles_unstable = (state: MenuPopoverState): MenuPopoverState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuPopoverClassNames.root, styles.root, state.root.className);
  return state;
};
