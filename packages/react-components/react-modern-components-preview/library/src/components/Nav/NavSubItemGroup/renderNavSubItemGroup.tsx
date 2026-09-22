/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { NavSubItemGroupSlots, NavSubItemGroupState } from './NavSubItemGroup.types';

export const renderNavSubItemGroup = (state: NavSubItemGroupState): JSXElement => {
  assertSlots<NavSubItemGroupSlots>(state);

  return state.collapseMotion ? (
    <state.collapseMotion>
      <state.root />
    </state.collapseMotion>
  ) : (
    <state.root />
  );
};
