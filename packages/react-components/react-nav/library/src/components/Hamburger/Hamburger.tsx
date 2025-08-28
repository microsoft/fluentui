import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderButton_unstable } from '@fluentui/react-button';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useHamburger_unstable } from './useHamburger';
import { useHamburgerStyles_unstable } from './useHamburgerStyles.styles';
import type { HamburgerProps } from './Hamburger.types';

/**
 * Hamburger component - a button that toggles a menu or navigation drawer.
 */
export const Hamburger: ForwardRefComponent<HamburgerProps> = React.forwardRef((props, ref) => {
  const state = useHamburger_unstable(props, ref);

  useHamburgerStyles_unstable(state);
  useCustomStyleHook_unstable('useHamburgerStyles_unstable')(state);

  return renderButton_unstable(state);
}) as ForwardRefComponent<HamburgerProps>;

Hamburger.displayName = 'Hamburger';
