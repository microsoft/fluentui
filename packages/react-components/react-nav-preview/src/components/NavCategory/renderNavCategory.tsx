/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavCategoryState, NavCategorySlots } from './NavCategory.types';

/**
 * Render the final JSX of NavCategory
 */
export const renderNavCategory_unstable = (state: NavCategoryState) => {
  assertSlots<NavCategorySlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
