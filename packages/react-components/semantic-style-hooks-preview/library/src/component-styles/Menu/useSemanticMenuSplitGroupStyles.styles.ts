import { makeStyles, mergeClasses } from '@griffel/react';
import { menuItemClassNames, menuSplitGroupClassNames, type MenuSplitGroupState } from '@fluentui/react-menu';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

export const menuSplitGroupMultilineAttr = 'data-multiline';

/**
 * Styles for the root slot
 * TODO - remove the use of nested combinators to style child menu items
 */
const useStyles = makeStyles({
  root: {
    [`[${menuSplitGroupMultilineAttr}]`]: {
      [`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
        alignSelf: 'center',
      },
    },
    display: 'flex',
    [`& > .${menuItemClassNames.root}:nth-of-type(1)`]: {
      flex: 1,
    },
    [`& > .${menuItemClassNames.root}:nth-of-type(2)`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingLeft: 0,
      '::before': {
        content: '""',
        width: semanticTokens.strokeWidthDefault,
        height: '20px',
        backgroundColor: semanticTokens.strokeCtrlOnNeutralRest,
      },
    },
  },
});

/**
 * Apply styling to the MenuSplitGroup slots based on the state
 */
export const useSemanticMenuSplitGroupStyles = (_state: unknown): MenuSplitGroupState => {
  'use no memo';

  const state = _state as MenuSplitGroupState;
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuSplitGroupClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
