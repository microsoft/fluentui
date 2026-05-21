'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSectionHeader } from './useNavSectionHeader';
import { renderNavSectionHeader } from './renderNavSectionHeader';
import type { NavSectionHeaderProps } from './NavSectionHeader.types';

/**
 * NavSectionHeader component - a heading for a section within navigation.
 */
export const NavSectionHeader: ForwardRefComponent<NavSectionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useNavSectionHeader(props, ref);
  return renderNavSectionHeader(state);
});

NavSectionHeader.displayName = 'NavSectionHeader';
