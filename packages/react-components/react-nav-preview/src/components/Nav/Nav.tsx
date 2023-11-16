import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNav } from './useNav';
import { renderNav } from './renderNav';
import { useNavStyles } from './useNavStyles.styles';
import type { NavProps } from './Nav.types';
import { useNavContextValues } from '../useNavContrectValues';

/**
 * Nav component - TODO: add more docs
 */
export const Nav: ForwardRefComponent<NavProps> = React.forwardRef((props, ref) => {
  const state = useNav(props, ref);

  const contextValues = useNavContextValues(state);

  useNavStyles(state);
  return renderNav(state, contextValues);
});

Nav.displayName = 'Nav';
