import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';
import styles from '../Dialog/Dialog.module.css';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
};

/**
 * Apply styling to the DialogSurface slots based on the state.
 */
export const useDialogSurfaceStyles = (state: DialogSurfaceState): DialogSurfaceState => {
  state.root.className = clsx(dialogSurfaceClassNames.root, styles.surface, state.root.className);

  return state;
};
