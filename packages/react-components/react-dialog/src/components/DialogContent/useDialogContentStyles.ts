import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogContentSlots, DialogContentState } from './DialogContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { CONTENT_GRID_AREA } from '../../contexts/constants';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const dialogContentClassNames: SlotClassNames<DialogContentSlots> = {
  root: 'fui-DialogContent',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    minHeight: '32px',
    boxSizing: 'border-box',
    ...shorthands.padding(tokens.strokeWidthThick),
    ...shorthands.margin(`calc(${tokens.strokeWidthThick} * -1)`),
    ...shorthands.gridArea(CONTENT_GRID_AREA),
    ...typographyStyles.body1,
  },
});

/**
 * Apply styling to the DialogContent slots based on the state
 */
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogContentClassNames.root, styles.root, state.root.className);
  return state;
};
