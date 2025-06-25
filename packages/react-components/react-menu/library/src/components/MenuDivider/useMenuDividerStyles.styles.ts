import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
  root: 'fui-MenuDivider',
};

const useStyles = makeStyles({
  root: {
    margin: '4px -5px 4px -5px',
    width: 'auto',
    borderBottom: `${semanticTokens.strokeWidthDividerDefault} solid ${semanticTokens.strokeDividerDefault}`,
  },
});

export const useMenuDividerStyles_unstable = (state: MenuDividerState) => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuDividerClassNames.root, styles.root, state.root.className);

  return state;
};
