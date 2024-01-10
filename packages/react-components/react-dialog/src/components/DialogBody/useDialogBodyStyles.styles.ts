import { makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogBodySlots, DialogBodyState } from './DialogBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { DIALOG_GAP, MEDIA_QUERY_BREAKPOINT_SELECTOR, SURFACE_PADDING } from '../../contexts';

export const dialogBodyClassNames: SlotClassNames<DialogBodySlots> = {
  root: 'fui-DialogBody',
};

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  ...shorthands.overflow('unset'),
  ...shorthands.gap(DIALOG_GAP),
  display: 'grid',
  maxHeight: `calc(100vh - 2 * ${SURFACE_PADDING})`,
  boxSizing: 'border-box',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '1fr 1fr auto',

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
    gridTemplateRows: 'auto 1fr auto',
  },
});

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  const resetStyles = useResetStyles();

  state.root.className = mergeClasses(dialogBodyClassNames.root, resetStyles, state.root.className);

  return state;
};
