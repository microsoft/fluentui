/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { NavSectionHeaderState, NavSectionHeaderSlots } from './NavSectionHeader.types';

/**
 * Render the final JSX of NavSectionHeader
 */
export const renderNavSectionHeader_unstable = (state: NavSectionHeaderState): JSXElement => {
  assertSlots<NavSectionHeaderSlots>(state);

  return <state.root />;
};
