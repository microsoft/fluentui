import * as React from 'react';
import { useHamburgerInNavStyles_unstable } from './useHamburgerInNavStyles.styles';
import { renderButton_unstable } from '@fluentui/react-button';
import type { HamburgerInNavProps } from './HamburgerInNav.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useHamburgerInNav_unstable } from './useHamburgerInNav';

/**
 * HamburgerInNav component
 */
export const HamburgerInNav: ForwardRefComponent<HamburgerInNavProps> = React.forwardRef((props, ref) => {
  const state = useHamburgerInNav_unstable(props, ref);

  useHamburgerInNavStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useHamburgerInNavStyles_unstable')(state);
  return renderButton_unstable(state);
}) as ForwardRefComponent<HamburgerInNavProps>;

HamburgerInNav.displayName = 'HamburgerInNav';
