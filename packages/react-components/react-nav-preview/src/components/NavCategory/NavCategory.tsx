import * as React from 'react';
import { useNavCategory_unstable } from './useNavCategory';
import { renderNavCategory_unstable } from './renderNavCategory';
import { useNavCategoryContextValues_unstable } from '../useNavCategoryContextValues_unstable';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavCategoryProps } from './NavCategory.types';

/**
 * NavCategory component - TODO: add more docs
 */
export const NavCategory: ForwardRefComponent<NavCategoryProps> = React.forwardRef((props, ref) => {
  const state = useNavCategory_unstable(props, ref);
  const contextValues = useNavCategoryContextValues_unstable(state);

  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // useNavCategoryStyles_unstable(state);

  return renderNavCategory_unstable(state, contextValues);
});

NavCategory.displayName = 'NavCategory';
