import { makeStyles, mergeClasses } from '@griffel/react';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import { type ToolbarDividerState } from '@fluentui/react-toolbar';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useBaseStyles = makeStyles({
  // Base styles
  root: {
    display: 'inline-flex',
    maxWidth: semanticTokens.strokeWidthDefault,
    padding: `${semanticTokens.paddingContentNone} ${semanticTokens.paddingCtrlHorizontalDefault}`,
  },
  vertical: {
    maxWidth: 'initial',
  },
});

/**
 * Apply styling to the ToolbarDivider slots based on the state
 */
export const useSemanticToolbarDividerStyles = (_state: unknown): ToolbarDividerState => {
  'use no memo';

  const state = _state as ToolbarDividerState;

  useDividerStyles_unstable(state);
  const { vertical } = state;
  const toolbarDividerStyles = useBaseStyles();
  state.root.className = mergeClasses(
    state.root.className,
    toolbarDividerStyles.root,
    !vertical && toolbarDividerStyles.vertical,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
