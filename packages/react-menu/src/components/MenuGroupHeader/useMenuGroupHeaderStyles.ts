import { mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `menuGroupHeaderClassNames.root` instead.
 */
export const menuGroupHeaderClassName = 'fui-MenuGroupHeader';
export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
  root: 'fui-MenuGroupHeader',
};

const useStyles = makeStyles({
  root: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    paddingLeft: '12px',
    paddingRight: '12px',
    fontWeight: tokens.fontWeightSemibold,
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  },
});

export const useMenuGroupHeaderStyles_unstable = (state: MenuGroupHeaderState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuGroupHeaderClassNames.root, styles.root, state.root.className);

  return state;
};
