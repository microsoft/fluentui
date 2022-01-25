import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuPopoverState } from './MenuPopover.types';

export const menuPopoverClassName = 'fui-MenuPopover';

const useStyles = makeStyles({
  root: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    ...shorthands.padding('4px'),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
  },
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuPopoverStyles_unstable = (state: MenuPopoverState): MenuPopoverState => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuPopoverClassName, styles.root, state.root.className);
  return state;
};
