import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogBodySlots, DialogBodyState } from './DialogBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import {
  ACTIONS_END_GRID_AREA,
  ACTIONS_START_GRID_AREA,
  CONTENT_GRID_AREA,
  DIALOG_GAP,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  SURFACE_PADDING,
  TITLE_ACTION_GRID_AREA,
  TITLE_GRID_AREA,
} from '../../contexts';

export const dialogBodyClassNames: SlotClassNames<DialogBodySlots> = {
  root: 'fui-DialogBody',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'grid',
    '&::backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    maxHeight: `calc(100vh - 2 * ${SURFACE_PADDING})`,
    boxSizing: 'border-box',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '1fr 1fr auto',
    gridTemplateAreas: `
    "${TITLE_GRID_AREA} ${TITLE_GRID_AREA} ${TITLE_ACTION_GRID_AREA}"
    "${CONTENT_GRID_AREA} ${CONTENT_GRID_AREA} ${CONTENT_GRID_AREA}"
    "${ACTIONS_START_GRID_AREA} ${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA}"
    `,
    ...shorthands.overflow('unset'),
    ...shorthands.gap(DIALOG_GAP),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
      gridTemplateRows: 'auto 1fr auto auto',
      gridTemplateAreas: `
        "${TITLE_GRID_AREA} ${TITLE_GRID_AREA} ${TITLE_ACTION_GRID_AREA}"
        "${CONTENT_GRID_AREA} ${CONTENT_GRID_AREA} ${CONTENT_GRID_AREA}"
        "${ACTIONS_START_GRID_AREA} ${ACTIONS_START_GRID_AREA} ${ACTIONS_START_GRID_AREA}"
        "${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA}"
      `,
    },
  },
});

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogBodyClassNames.root, styles.root, state.root.className);

  return state;
};
