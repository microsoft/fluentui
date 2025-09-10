import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { NavCategoryContextValues, NavCategoryProvider } from '../NavCategoryContext';

import type { NavCategoryState } from './NavCategory.types';

/**
 * Render the final JSX of NavCategory
 */
export const renderNavCategory_unstable = (
  state: NavCategoryState,
  contextValues: NavCategoryContextValues,
): JSXElement => {
  return <NavCategoryProvider value={contextValues.categoryValue}>{state.children}</NavCategoryProvider>;
};
