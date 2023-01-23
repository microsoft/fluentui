import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';
import { TITLE_ACTION_GRID_AREA, TITLE_GRID_AREA } from '../../contexts/constants';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
  action: 'fui-DialogTitle__action',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...typographyStyles.subtitle1,
    ...shorthands.gridArea(TITLE_GRID_AREA),
  },
  rootWithoutCloseButton: {
    ...shorthands.gridArea(TITLE_GRID_AREA, TITLE_GRID_AREA, TITLE_ACTION_GRID_AREA, TITLE_ACTION_GRID_AREA),
  },
  action: {
    ...shorthands.gridArea(TITLE_ACTION_GRID_AREA),
  },
});

/**
 * Styles to be applied on internal elements used by default action on non-modal Dialog
 * @internal
 */
export const useDialogTitleInternalStyles = makeStyles({
  button: {
    position: 'relative',
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    cursor: 'pointer',
    lineHeight: 0,
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    WebkitAppearance: 'button',
    textAlign: 'unset',
    ...createFocusOutlineStyle(),
  },
});

/**
 * Apply styling to the DialogTitle slots based on the state
 */
export const useDialogTitleStyles_unstable = (state: DialogTitleState): DialogTitleState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    dialogTitleClassNames.root,
    styles.root,
    !state.action && styles.rootWithoutCloseButton,
    state.root.className,
  );
  if (state.action) {
    state.action.className = mergeClasses(dialogTitleClassNames.action, styles.action, state.action.className);
  }
  return state;
};
