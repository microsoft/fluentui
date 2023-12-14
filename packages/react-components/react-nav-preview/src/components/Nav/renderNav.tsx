/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavState, NavSlots } from './Nav.types';
import type { NavContextValues } from '../NavContext.types';
import { NavProvider } from '../NavContext';

export const renderNav_unstable = (state: NavState, contextValues: NavContextValues) => {
  assertSlots<NavSlots>(state);

  return (
    <state.root>
      <NavProvider value={contextValues.nav}>{state.root.children}</NavProvider>
    </state.root>
  );
};
