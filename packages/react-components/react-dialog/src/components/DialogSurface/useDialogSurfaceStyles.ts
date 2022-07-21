import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import {
  TITLE_GRID_AREA,
  ACTIONS_END_GRID_AREA,
  ACTIONS_START_GRID_AREA,
  SURFACE_BORDER_RADIUS,
  SURFACE_BORDER_WIDTH,
  SURFACE_PADDING,
  DIALOG_GAP,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  BODY_GRID_AREA,
  CLOSE_BUTTON_GRID_AREA,
} from '../../contexts/constants';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: 'fit-content',
    maxWidth: '600px',
    maxHeight: '100vh',
    boxSizing: 'border-box',
    boxShadow: tokens.shadow64,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.gap(DIALOG_GAP),
    ...shorthands.border(SURFACE_BORDER_WIDTH, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius(SURFACE_BORDER_RADIUS),
    ...shorthands.margin('auto'),
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '1fr 1fr auto',
    gridTemplateAreas: `
      "${TITLE_GRID_AREA} ${TITLE_GRID_AREA} ${CLOSE_BUTTON_GRID_AREA}"
      "${BODY_GRID_AREA} ${BODY_GRID_AREA} ${BODY_GRID_AREA}"
      "${ACTIONS_START_GRID_AREA} ${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA}"
    `,
    ...shorthands.padding(SURFACE_PADDING),
    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
      gridTemplateRows: 'auto 1fr auto auto',
      gridTemplateAreas: `
        "${TITLE_GRID_AREA} ${TITLE_GRID_AREA} ${CLOSE_BUTTON_GRID_AREA}"
        "${BODY_GRID_AREA} ${BODY_GRID_AREA} ${BODY_GRID_AREA}"
        "${ACTIONS_START_GRID_AREA} ${ACTIONS_START_GRID_AREA} ${ACTIONS_START_GRID_AREA}"
        "${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA} ${ACTIONS_END_GRID_AREA}"
      `,
    },
  },
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogSurfaceClassNames.root, styles.root, state.root.className);
  return state;
};
