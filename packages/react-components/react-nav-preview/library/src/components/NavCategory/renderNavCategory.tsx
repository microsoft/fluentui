/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { NavCategoryContextValues, NavCategoryProvider } from '../NavCategoryContext';

import type { NavCategoryState } from './NavCategory.types';

/**
 * Render the final JSX of NavCategory
 */
export const renderNavCategory_unstable = (state: NavCategoryState, contextValues: NavCategoryContextValues) => {
  return <NavCategoryProvider value={contextValues.categoryValue}>{state.children}</NavCategoryProvider>;
};
