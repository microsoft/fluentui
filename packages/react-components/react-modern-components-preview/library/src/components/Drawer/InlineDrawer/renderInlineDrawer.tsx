/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { DrawerProvider } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { InlineDrawerInternalSlots, InlineDrawerState } from './InlineDrawer.types';

export const renderInlineDrawer = (state: InlineDrawerState, contextValue: DrawerContextValue): JSXElement => {
  assertSlots<InlineDrawerInternalSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.surfaceMotion>
        <state.root />
      </state.surfaceMotion>
    </DrawerProvider>
  );
};
