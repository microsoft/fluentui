/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { DrawerContextValue, DrawerProvider } from '../../contexts/drawerContext';
import { DialogBackdropProvider } from '@fluentui/react-dialog';

import type { OverlayDrawerState, OverlayDrawerInternalSlots } from './OverlayDrawer.types';

/**
 * Render the final JSX of OverlayDrawer
 */
export const renderOverlayDrawer_unstable = (
  state: OverlayDrawerState,
  contextValue: DrawerContextValue,
): JSXElement => {
  assertSlots<OverlayDrawerInternalSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <DialogBackdropProvider value={false}>
        <state.dialog>
          <state.root />
        </state.dialog>
      </DialogBackdropProvider>
    </DrawerProvider>
  );
};
