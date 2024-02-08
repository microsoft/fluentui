import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNav_unstable } from './useNav';
import { renderNav_unstable } from './renderNav';
import { useNavStyles_unstable } from './useNavStyles.styles';
import { useNavContextValues_unstable } from '../useNavContextValues';
import type { NavProps } from './Nav.types';

/**
 * Nav component - provides 2 layers of nesting for navigation items.
 */
export const Nav: ForwardRefComponent<NavProps> = React.forwardRef((props, ref) => {
  const state = useNav_unstable(props, ref);

  const contextValues = useNavContextValues_unstable(state);

  useNavStyles_unstable(state);
  return renderNav_unstable(state, contextValues);
});

Nav.displayName = 'Nav';
