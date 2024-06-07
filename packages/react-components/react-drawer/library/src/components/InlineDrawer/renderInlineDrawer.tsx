/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { DrawerContextValue, DrawerProvider } from '../../contexts/drawerContext';

import type { InlineDrawerState, InlineDrawerSlots } from './InlineDrawer.types';

/**
 * Render the final JSX of InlineDrawer
 */
export const renderInlineDrawer_unstable = (state: InlineDrawerState, contextValue: DrawerContextValue) => {
  if (!state.motion.canRender) {
    return null;
  }

  assertSlots<InlineDrawerSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.root />
    </DrawerProvider>
  );
};
