import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSectionHeader_unstable } from './useNavSectionHeader';
import { renderNavSectionHeader_unstable } from './renderNavSectionHeader';
import { useNavSectionHeaderStyles_unstable } from './useNavSectionHeaderStyles.styles';
import type { NavSectionHeaderProps } from './NavSectionHeader.types';

/**
 * NavSectionHeader component
 */
export const NavSectionHeader: ForwardRefComponent<NavSectionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useNavSectionHeader_unstable(props, ref);

  useNavSectionHeaderStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavSectionHeaderStyles_unstable')(state);
  return renderNavSectionHeader_unstable(state);
});

NavSectionHeader.displayName = 'NavSectionHeader';
