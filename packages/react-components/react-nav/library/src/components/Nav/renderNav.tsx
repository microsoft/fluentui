/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { NavProvider } from '../NavContext';
import type { NavState, NavSlots } from './Nav.types';
import type { NavContextValues } from '../NavContext.types';

export const renderNav_unstable = (state: NavState, contextValues: NavContextValues) => {
  assertSlots<NavSlots>(state);

  return (
    <NavProvider value={contextValues.nav}>
      <state.root />
    </NavProvider>
  );
};
