import { mergeClasses, makeStyles } from '@griffel/react';
import { menuDividerClassNames, type MenuDividerState } from '@fluentui/react-menu';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    margin: '4px -5px 4px -5px',
    width: 'auto',
    borderBottom: `${semanticTokens.strokeWidthDividerDefault} solid ${semanticTokens.strokeDividerDefault}`,
  },
});

export const useSemanticMenuDividerStyles = (_state: unknown): MenuDividerState => {
  'use no memo';

  const state = _state as MenuDividerState;
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuDividerClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
