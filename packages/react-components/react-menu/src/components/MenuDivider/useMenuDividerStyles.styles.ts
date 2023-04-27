import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
  root: 'fui-MenuDivider',
};

const useStyles = makeStyles({
  root: {
    ...shorthands.margin('4px', '-5px', '4px', '-5px'),
    width: 'auto',
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
  },
});

export const useMenuDividerStyles_unstable = (state: MenuDividerState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuDividerClassNames.root, styles.root, state.root.className);

  return state;
};
