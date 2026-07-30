'use client';

import * as React from 'react';
import { renderDrawerBody_unstable } from '@fluentui/react-drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useNavDrawerBody_unstable } from './useNavDrawerBody';
import { useNavDrawerBodyStyles_unstable } from './useNavDrawerBodyStyles.styles';
import type { NavDrawerBodyProps } from './NavDrawerBody.types';

/**
 * NavDrawerBody component
 */
export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = React.forwardRef((props, ref) => {
  let state = useNavDrawerBody_unstable(props, ref);

  state = useNavDrawerBodyStyles_unstable(state);
  state = useCustomStyleHook_unstable('useNavDrawerBodyStyles_unstable')(state);

  return renderDrawerBody_unstable(state);
});

NavDrawerBody.displayName = 'NavDrawerBody';
