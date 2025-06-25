import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
  root: 'fui-MenuGroupHeader',
};

const useStyles = makeStyles({
  root: {
    fontSize: semanticTokens.textRampMetadataFontSize,
    color: semanticTokens._ctrlMenuGroupHeaderColor,
    paddingLeft: semanticTokens._ctrlMenuGroupHeaderPaddingHorizontal,
    paddingRight: semanticTokens._ctrlMenuGroupHeaderPaddingHorizontal,
    fontWeight: semanticTokens._ctrlMenuGroupHeaderFontWeight,
    height: semanticTokens._ctrlMenuGroupHeaderHeight,
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
