'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavSectionHeaderProps } from './NavSectionHeader.types';
import { renderNavSectionHeader } from './renderNavSectionHeader';
import { useNavSectionHeader } from './useNavSectionHeader';
import { useNavSectionHeaderStyles } from './useNavSectionHeaderStyles.styles';

export const NavSectionHeader: ForwardRefComponent<NavSectionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useNavSectionHeader(props, ref);

  useNavSectionHeaderStyles(state);

  return renderNavSectionHeader(state);
});

NavSectionHeader.displayName = 'NavSectionHeader';
