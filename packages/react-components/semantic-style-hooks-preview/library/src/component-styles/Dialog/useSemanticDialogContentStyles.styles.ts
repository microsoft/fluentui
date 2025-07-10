import { makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { dialogContentClassNames, type DialogContentState, MEDIA_QUERY_SHORT_SCREEN } from '@fluentui/react-dialog';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  padding: tokens.strokeWidthThick,
  margin: `calc(${tokens.strokeWidthThick} * -1)`,
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens.textRampReadingBodyFontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textRampReadingBodyLineHeight,
  overflowY: 'auto',
  minHeight: '32px',
  boxSizing: 'border-box',
  gridRowStart: 2,
  gridRowEnd: 2,
  gridColumnStart: 1,
  gridColumnEnd: 4,

  [MEDIA_QUERY_SHORT_SCREEN]: {
    overflowY: 'unset',
  },
});

/**
 * Apply styling to the DialogContent slots based on the state
 */
export const useSemanticDialogContentStyles = (_state: unknown): DialogContentState => {
  'use no memo';

  const state = _state as DialogContentState;
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    dialogContentClassNames.root,
    styles,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
