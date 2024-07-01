/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { DrawerContextValue, DrawerProvider } from '../../contexts/drawerContext';

import { InlineDrawerMotion } from '../../shared/drawerMotions';
import type { InlineDrawerState, InlineDrawerSlots } from './InlineDrawer.types';

/**
 * Render the final JSX of InlineDrawer
 */
export const renderInlineDrawer_unstable = (state: InlineDrawerState, contextValue: DrawerContextValue) => {
  assertSlots<InlineDrawerSlots>(state);
  const { open, size, position } = state;

  return (
    <DrawerProvider value={contextValue}>
      <InlineDrawerMotion position={position} size={size} visible={open} unmountOnExit>
        <state.root />
      </InlineDrawerMotion>
    </DrawerProvider>
  );
};
