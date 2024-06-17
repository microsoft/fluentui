import { mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
  root: 'fui-MenuGroupHeader',
};

const useStyles = makeStyles({
  root: {
    fontSize: `var(--1301, var(--1302, ${tokens.fontSizeBase200}))`,
    color: `var(--1303, var(--1304, ${tokens.colorNeutralForeground3}))`,
    paddingLeft: '8px',
    paddingRight: '8px',
    fontWeight: `var(--1305, var(--1306, ${tokens.fontWeightSemibold}))`,
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  },
});

export const useMenuGroupHeaderStyles_unstable = (state: MenuGroupHeaderState) => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuGroupHeaderClassNames.root, styles.root, state.root.className);

  return state;
};
