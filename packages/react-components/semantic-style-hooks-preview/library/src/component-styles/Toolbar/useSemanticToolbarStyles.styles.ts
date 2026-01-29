import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { toolbarClassNames, type ToolbarState } from '@fluentui/react-toolbar';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: `4px ${semanticTokens.ctrlChoicePaddingHorizontal}`,
  },
  vertical: {
    flexDirection: 'column',
    width: 'fit-content',
  },
  small: { padding: '0px 4px' },
  medium: { padding: `4px ${semanticTokens.ctrlChoicePaddingHorizontal}` },
  large: { padding: '4px 20px' },
});

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useSemanticToolbarStyles = (_state: unknown): ToolbarState => {
  'use no memo';

  const state = _state as ToolbarState;

  const styles = useStyles();
  const { vertical, size } = state;
  state.root.className = mergeClasses(
    state.root.className,
    toolbarClassNames.root,
    styles.root,
    vertical && styles.vertical,
    size === 'small' && !vertical && styles.small,
    size === 'medium' && !vertical && styles.medium,
    size === 'large' && !vertical && styles.large,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
