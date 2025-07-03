import * as React from 'react';
import { NavCategoryContextValues, NavCategoryProvider } from '../NavCategoryContext';

import type { NavCategoryState } from './NavCategory.types';

/**
 * Render the final JSX of NavCategory
 */
export const renderNavCategory_unstable = (
  state: NavCategoryState,
  contextValues: NavCategoryContextValues,
): // eslint-disable-next-line @typescript-eslint/no-deprecated
JSX.Element => {
  return <NavCategoryProvider value={contextValues.categoryValue}>{state.children}</NavCategoryProvider>;
};
