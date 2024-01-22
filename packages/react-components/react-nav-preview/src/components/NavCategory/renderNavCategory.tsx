/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavCategoryState, NavCategorySlots } from './NavCategory.types';
import { NavCategoryContextValues, NavCategoryProvider } from '../NavCategoryContext';

/**
 * Render the final JSX of NavCategory
 */
export const renderNavCategory_unstable = (state: NavCategoryState, contextValues: NavCategoryContextValues) => {
  assertSlots<NavCategorySlots>(state);

  return (
    <NavCategoryProvider value={contextValues.categoryValue}>
      <state.root />
    </NavCategoryProvider>
  );
};
