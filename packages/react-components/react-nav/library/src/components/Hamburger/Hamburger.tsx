import * as React from 'react';
import { useHamburger_unstable } from './useHamburger';
import { renderButton_unstable } from '@fluentui/react-button';
import { useHamburgerStyles_unstable } from './useHamburgerStyles.styles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { HamburgerProps } from './Hamburger.types';

/**
 * Hamburger component - TODO: add more docs
 */
export const Hamburger: ForwardRefComponent<HamburgerProps> = React.forwardRef((props, ref) => {
  const state = useHamburger_unstable(props, ref);

  useHamburgerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useHamburgerStyles_unstable')(state);
  return renderButton_unstable(state);
}) as ForwardRefComponent<HamburgerProps>;

Hamburger.displayName = 'Hamburger';
