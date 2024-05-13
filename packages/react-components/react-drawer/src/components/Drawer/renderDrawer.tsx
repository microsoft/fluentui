/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { DrawerContextValue, DrawerProvider } from '../../contexts/drawerContext';

import type { DrawerState, DrawerSlots } from './Drawer.types';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState, contextValue: DrawerContextValue) => {
  assertSlots<DrawerSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.root />
    </DrawerProvider>
  );
};
