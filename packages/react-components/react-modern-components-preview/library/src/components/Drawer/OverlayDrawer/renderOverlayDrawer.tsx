/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { OverlayDrawerInternalSlots, OverlayDrawerState } from './OverlayDrawer.types';

export const renderOverlayDrawer = (state: OverlayDrawerState, contextValue: DrawerContextValue): JSXElement => {
  assertSlots<OverlayDrawerInternalSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.dialog>
        <state.surfaceMotion>
          <MotionRefForwarder>
            <state.root />
          </MotionRefForwarder>
        </state.surfaceMotion>
      </state.dialog>
    </DrawerProvider>
  );
};
