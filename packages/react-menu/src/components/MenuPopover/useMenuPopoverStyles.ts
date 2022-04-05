import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `menuPopoverClassNames.root` instead.
 */
export const menuPopoverClassName = 'fui-MenuPopover';
export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = {
  root: 'fui-MenuPopover',
};

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
  state.root.className = mergeClasses(menuPopoverClassNames.root, styles.root, state.root.className);
  return state;
};
