import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { dialogTitleClassNames, type DialogTitleState } from '@fluentui/react-dialog';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useRootResetStyles = makeResetStyles({
  fontFamily: semanticTokens.textStyleDefaultHeaderFontFamily,
  fontSize: semanticTokens.textRampSectionHeaderFontSize,
  fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
  lineHeight: semanticTokens.textRampSectionHeaderLineHeight,
  margin: 0,
  gridRowStart: 1,
  gridRowEnd: 1,
  gridColumnStart: 1,
  gridColumnEnd: 3,
});

const useStyles = makeStyles({
  rootWithoutAction: {
    gridColumnEnd: 4,
  },
});

/**
 * Styles for the action slot
 */
const useActionResetStyles = makeResetStyles({
  gridRowStart: 1,
  gridRowEnd: 1,
  gridColumnStart: 3,
  justifySelf: 'end',
  alignSelf: 'start',
});

/**
 * Styles to be applied on internal elements used by default action on non-modal Dialog
 * @internal
 */
export const useDialogTitleInternalStyles = makeResetStyles({
  ...createFocusOutlineStyle(),
  overflow: 'visible',
  padding: 0,
  borderStyle: 'none',
  position: 'relative',
  boxSizing: 'content-box',
  backgroundColor: 'inherit',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  cursor: 'pointer',
  lineHeight: 0,
  WebkitAppearance: 'button',
  textAlign: 'unset',
});

/**
 * Apply styling to the DialogTitle slots based on the state
 */
export const useSemanticDialogTitleStyles = (_state: unknown): DialogTitleState => {
  'use no memo';

  const state = _state as DialogTitleState;
  const rootResetStyles = useRootResetStyles();
  const actionResetStyles = useActionResetStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    dialogTitleClassNames.root,
    rootResetStyles,
    !state.action && styles.rootWithoutAction,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.action) {
    state.action.className = mergeClasses(
      state.action.className,
      dialogTitleClassNames.action,
      actionResetStyles,
      getSlotClassNameProp_unstable(state.action),
    );
  }

  return state;
};
