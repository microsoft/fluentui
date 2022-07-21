import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { typographyStyles } from '@fluentui/react-theme';
import { gridArea } from '../../utils/localShorthands';
import { CLOSE_BUTTON_GRID_AREA, TITLE_GRID_AREA } from '../../contexts/constants';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
  closeButton: 'fui-DialogTitle__closeButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...typographyStyles.subtitle1,
    ...gridArea(TITLE_GRID_AREA),
  },
  rootWithoutCloseButton: {
    // ...shorthands.padding(DIALOG_CONTENT_PADDING, DIALOG_CONTENT_PADDING, '8px', DIALOG_CONTENT_PADDING),
  },
  rootWithCloseButton: {
    // ...shorthands.padding(DIALOG_CONTENT_PADDING, '20px', '8px', DIALOG_CONTENT_PADDING),
  },
  closeButton: {
    position: 'relative',
    lineHeight: '0',
    cursor: 'pointer',
    alignSelf: 'start',
    ...gridArea(CLOSE_BUTTON_GRID_AREA),
  },
  closeButtonFocusIndicator: createFocusOutlineStyle(),
  // TODO: this should be extracted to another package
  resetButton: {
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    WebkitAppearance: 'button',
    textAlign: 'unset',
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
    state.closeButton && styles.rootWithCloseButton,
    !state.closeButton && styles.rootWithoutCloseButton,
    state.root.className,
  );
  if (state.closeButton) {
    state.closeButton.className = mergeClasses(
      dialogTitleClassNames.closeButton,
      styles.resetButton,
      styles.closeButton,
      styles.closeButtonFocusIndicator,
      state.closeButton.className,
    );
  }
  return state;
};
