/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { DrawerProvider } from '@fluentui/react-drawer';
import type { DrawerContextValue } from '@fluentui/react-drawer';

import type { InlineDrawerSlots, InlineDrawerState } from './InlineDrawer.types';

/**
 * Renders the final JSX of the InlineDrawer component, given the state.
 * Returns null when the drawer is closed and unmountOnClose is true.
 */
export const renderInlineDrawer = (state: InlineDrawerState, contextValue: DrawerContextValue): JSXElement | null => {
  if (state.unmountOnClose && !state.open) {
    return null;
  }

  assertSlots<InlineDrawerSlots>(state);

  return (
    <DrawerProvider value={contextValue}>
      <state.root />
    </DrawerProvider>
  );
};
