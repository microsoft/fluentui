import { mergeClasses, makeStyles } from '@griffel/react';
import { menuGroupHeaderClassNames, type MenuGroupHeaderState } from '@fluentui/react-menu';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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

export const useSemanticMenuGroupHeaderStyles = (_state: unknown): MenuGroupHeaderState => {
  'use no memo';

  const state = _state as MenuGroupHeaderState;
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuGroupHeaderClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
