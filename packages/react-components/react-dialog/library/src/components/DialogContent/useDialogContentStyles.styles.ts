import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { DialogContentSlots, DialogContentState } from './DialogContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { MEDIA_QUERY_SHORT_SCREEN } from '../../contexts';

export const dialogContentClassNames: SlotClassNames<DialogContentSlots> = {
  root: 'fui-DialogContent',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  padding: tokens.strokeWidthThick,
  margin: `calc(${tokens.strokeWidthThick} * -1)`,
  ...typographyStyles.body1,
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
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles, state.root.className);
  return state;
};
