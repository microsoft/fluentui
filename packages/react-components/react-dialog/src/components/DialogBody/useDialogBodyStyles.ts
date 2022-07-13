import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogBodySlots, DialogBodyState } from './DialogBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { typographyStyles } from '@fluentui/react-theme';
import { DIALOG_CONTENT_PADDING } from '../../contexts/constants';

export const dialogBodyClassName = 'fui-DialogBody';
export const dialogBodyClassNames: SlotClassNames<DialogBodySlots> = {
  root: 'fui-DialogBody',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    width: '100%',
    height: 'fit-content',
    minHeight: '32px',
    ...shorthands.padding('0', DIALOG_CONTENT_PADDING),
    ...typographyStyles.body1,
  },
});

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogBodyClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
