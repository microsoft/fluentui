import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useHamburgerInNav_unstable } from './useHamburgerInNav';
import { renderHamburgerInNav_unstable } from './renderHamburgerInNav';
import { useHamburgerInNavStyles_unstable } from './useHamburgerInNavStyles.styles';
import type { HamburgerInNavProps } from './HamburgerInNav.types';

/**
 * HamburgerInNav component - TODO: add more docs
 */
export const HamburgerInNav: ForwardRefComponent<HamburgerInNavProps> = React.forwardRef((props, ref) => {
  const state = useHamburgerInNav_unstable(props, ref);

  useHamburgerInNavStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useHamburgerInNavStyles_unstable')(state);
  return renderHamburgerInNav_unstable(state);
});

HamburgerInNav.displayName = 'HamburgerInNav';
