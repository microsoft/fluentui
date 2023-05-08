/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';
import { Dialog, DialogSurface, DialogSurfaceProps } from '@fluentui/react-dialog';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  const { slots, slotProps } = getSlotsNext<DrawerSlots>(state);

  const dialogSurfaceProps = {
    ...slotProps.root,
    ...state.dialogSurface,
  } as DialogSurfaceProps;

  if (state.type === 'inline' && !state.open) {
    return null;
  }

  if (state.type === 'overlay') {
    return (
      <Dialog {...state.dialog}>
        <DialogSurface {...dialogSurfaceProps} />
      </Dialog>
    );
  }

  return <slots.root {...slotProps.root} />;
};
