import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
  action: 'fui-DialogTitle__action',
};

/**
 * Styles for the root slot
 */
const useRootResetStyles = makeResetStyles({
  ...typographyStyles.subtitle1,
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
export const useDialogTitleStyles_unstable = (state: DialogTitleState): DialogTitleState => {
  'use no memo';

  const rootResetStyles = useRootResetStyles();
  const actionResetStyles = useActionResetStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    dialogTitleClassNames.root,
    rootResetStyles,
    !state.action && styles.rootWithoutAction,
    state.root.className,
  );

  if (state.action) {
    state.action.className = mergeClasses(dialogTitleClassNames.action, actionResetStyles, state.action.className);
  }

  return state;
};
