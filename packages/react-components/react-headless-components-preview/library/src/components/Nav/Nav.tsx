'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNav } from './useNav';
import { renderNav } from './renderNav';
import { useNavContextValues } from './useNavContextValues';
import type { NavProps } from './Nav.types';

/**
 * Nav - A headless component that provides up to two levels of nesting for navigation.
 */
export const Nav: ForwardRefComponent<NavProps> = React.forwardRef((props, ref) => {
  const state = useNav(props, ref);
  const contextValues = useNavContextValues(state);

  return renderNav(state, contextValues);
});

Nav.displayName = 'Nav';
