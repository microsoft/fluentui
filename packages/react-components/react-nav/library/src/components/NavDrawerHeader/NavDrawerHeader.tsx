'use client';

import * as React from 'react';
import { renderDrawerHeader_unstable } from '@fluentui/react-drawer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawerHeaderStyles_unstable } from './useNavDrawerHeaderStyles.styles';
import { useNavDrawerHeader_unstable } from './useNavDrawerHeader';
import type { NavDrawerHeaderProps } from './NavDrawerHeader.types';

/**
 * NavDrawerHeader component
 */
export const NavDrawerHeader: ForwardRefComponent<NavDrawerHeaderProps> = React.forwardRef((props, ref) => {
  let state = useNavDrawerHeader_unstable(props, ref);

  state = useNavDrawerHeaderStyles_unstable(state);
  state = useCustomStyleHook_unstable('useNavDrawerHeaderStyles_unstable')(state);

  return renderDrawerHeader_unstable(state);
});

NavDrawerHeader.displayName = 'NavDrawerHeader';
