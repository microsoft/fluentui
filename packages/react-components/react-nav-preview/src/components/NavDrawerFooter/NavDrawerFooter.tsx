import * as React from 'react';
import { renderDrawerFooter_unstable } from '@fluentui/react-drawer';
import { useNavDrawerFooter_unstable } from './useNavDrawerFooter';
import { useNavDrawerFooterStyles_unstable } from './useNavDrawerFooterStyles.styles';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDrawerFooterProps } from './NavDrawerFooter.types';

/**
 * NavDrawerFooter component
 */
export const NavDrawerFooter: ForwardRefComponent<NavDrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerFooter_unstable(props, ref);

  useNavDrawerFooterStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavDrawerFooterStyles_unstable')(state);
  return renderDrawerFooter_unstable(state);
});

NavDrawerFooter.displayName = 'NavDrawerFooter';
