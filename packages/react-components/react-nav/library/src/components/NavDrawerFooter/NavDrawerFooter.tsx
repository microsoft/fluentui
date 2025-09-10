import * as React from 'react';
import { renderDrawerFooter_unstable } from '@fluentui/react-drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useNavDrawerFooter_unstable } from './useNavDrawerFooter';
import { useNavDrawerFooterStyles_unstable } from './useNavDrawerFooterStyles.styles';
import type { NavDrawerFooterProps } from './NavDrawerFooter.types';

/**
 * NavDrawerFooter component
 */
export const NavDrawerFooter: ForwardRefComponent<NavDrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerFooter_unstable(props, ref);

  useNavDrawerFooterStyles_unstable(state);
  useCustomStyleHook_unstable('useNavDrawerFooterStyles_unstable')(state);

  return renderDrawerFooter_unstable(state);
});

NavDrawerFooter.displayName = 'NavDrawerFooter';
