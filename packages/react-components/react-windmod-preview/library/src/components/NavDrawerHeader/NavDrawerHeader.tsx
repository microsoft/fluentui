'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavDrawerHeader, useNavDrawerHeader } from '@fluentui/react-headless-components-preview/nav';

import type { NavDrawerHeaderProps } from './NavDrawerHeader.types';
import { useNavDrawerHeaderStyles } from './useNavDrawerHeaderStyles';

/**
 * A NavDrawerHeader holds a nav drawer's title and navigation. Windmod NavDrawerHeader: the
 * headless part decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavDrawerHeader: ForwardRefComponent<NavDrawerHeaderProps> = React.forwardRef((props, ref) =>
  renderNavDrawerHeader(useNavDrawerHeaderStyles(useNavDrawerHeader(props, ref))),
);

NavDrawerHeader.displayName = 'NavDrawerHeader';
