import { makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogContentSlots, DialogContentState } from './DialogContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const dialogContentClassNames: SlotClassNames<DialogContentSlots> = {
  root: 'fui-DialogContent',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  ...shorthands.padding(tokens.strokeWidthThick),
  ...shorthands.margin(`calc(${tokens.strokeWidthThick} * -1)`),
  ...typographyStyles.body1,
  overflowY: 'auto',
  minHeight: '32px',
  boxSizing: 'border-box',
  gridRowStart: 2,
  gridRowEnd: 2,
  gridColumnStart: 1,
  gridColumnEnd: 4,
});

/**
 * Apply styling to the DialogContent slots based on the state
 */
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles, state.root.className);
  return state;
};
