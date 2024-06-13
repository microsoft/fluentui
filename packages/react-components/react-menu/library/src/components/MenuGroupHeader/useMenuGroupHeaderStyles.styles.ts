import { mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
  root: 'fui-MenuGroupHeader',
};

const useStyles = makeStyles({
  root: {
    fontSize: `var(--ctrl-token-MenuGroupHeader-1301, var(--semantic-token-MenuGroupHeader-1302, ${tokens.fontSizeBase200}))`,
    color: `var(--ctrl-token-MenuGroupHeader-1303, var(--semantic-token-MenuGroupHeader-1304, ${tokens.colorNeutralForeground3}))`,
    paddingLeft: '8px',
    paddingRight: '8px',
    fontWeight: `var(--ctrl-token-MenuGroupHeader-1305, var(--semantic-token-MenuGroupHeader-1306, ${tokens.fontWeightSemibold}))`,
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
