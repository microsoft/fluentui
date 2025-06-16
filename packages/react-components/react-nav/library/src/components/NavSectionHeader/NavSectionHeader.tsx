import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

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
  useCustomStyleHook_unstable('useNavSectionHeaderStyles_unstable')(state);

  return renderNavSectionHeader_unstable(state);
});

NavSectionHeader.displayName = 'NavSectionHeader';
