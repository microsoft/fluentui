/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavDrawerState } from './NavDrawer.types';
import { NavContextValues } from '../NavContext.types';
import { NavProvider } from '../NavContext';
import { InlineDrawerSlots } from '@fluentui/react-drawer';
import { CustomStyleHooksContext_unstable as CustomStyleHooksContext } from '@fluentui/react-shared-contexts';

/**
 * Render the final JSX of NavDrawer
 */
export const renderNavDrawer_unstable = (state: NavDrawerState, contextValues: NavContextValues) => {
  assertSlots<InlineDrawerSlots>(state);

  return (
    <NavProvider value={contextValues.nav}>
      <CustomStyleHooksContext.Provider value={state.customStyleHooks}>
        <state.root />
      </CustomStyleHooksContext.Provider>
    </NavProvider>
  );
};
