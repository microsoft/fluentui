import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavCategory_unstable } from './useNavCategory';
import { renderNavCategory_unstable } from './renderNavCategory';
import { useNavCategoryStyles_unstable } from './useNavCategoryStyles.styles';
import type { NavCategoryProps } from './NavCategory.types';
import { useNavCategoryContextValues_unstable } from '../useNavCategoryContextValues_unstable';

/**
 * NavCategory component - TODO: add more docs
 */
export const NavCategory: ForwardRefComponent<NavCategoryProps> = React.forwardRef((props, ref) => {
  const state = useNavCategory_unstable(props, ref);
  const contextValues = useNavCategoryContextValues_unstable(state);

  useNavCategoryStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavCategoryStyles_unstable')(state);

  return renderNavCategory_unstable(state, contextValues);
});

NavCategory.displayName = 'NavCategory';
