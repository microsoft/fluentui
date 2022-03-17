import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `menuDividerClassNames.root` instead.
 */
export const menuDividerClassName = 'fui-MenuDivider';
export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
  root: 'fui-MenuDivider',
};

const useStyles = makeStyles({
  root: {
    height: '1px',
    ...shorthands.margin('4px', '-5px', '4px', '-5px'),
    width: 'auto',
    backgroundColor: tokens.colorNeutralStroke2,
  },
});

export const useMenuDividerStyles_unstable = (state: MenuDividerState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuDividerClassNames.root, styles.root, state.root.className);

  return state;
};
