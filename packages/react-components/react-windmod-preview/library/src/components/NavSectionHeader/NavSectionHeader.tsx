'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavSectionHeader, useNavSectionHeader } from '@fluentui/react-headless-components-preview/nav';

import type { NavSectionHeaderProps } from './NavSectionHeader.types';
import { useNavSectionHeaderStyles } from './useNavSectionHeaderStyles';

/**
 * A NavSectionHeader labels a group of nav items. Windmod NavSectionHeader: the headless nav
 * section header decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavSectionHeader: ForwardRefComponent<NavSectionHeaderProps> = React.forwardRef((props, ref) => {
  return renderNavSectionHeader(
    useNavSectionHeaderStyles(useNavSectionHeader(props, ref as React.Ref<HTMLDivElement>)),
  );
});

NavSectionHeader.displayName = 'NavSectionHeader';
