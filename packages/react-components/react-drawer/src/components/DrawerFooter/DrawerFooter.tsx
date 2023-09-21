import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerFooter_unstable } from './useDrawerFooter';
import { renderDrawerFooter_unstable } from './renderDrawerFooter';
import { useDrawerFooterStyles_unstable } from './useDrawerFooterStyles.styles';
import type { DrawerFooterProps } from './DrawerFooter.types';

/**
 * DrawerFooter component - TODO: add more docs
 */
export const DrawerFooter: ForwardRefComponent<DrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useDrawerFooter_unstable(props, ref);

  useDrawerFooterStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerFooterStyles_unstable')(state);

  return renderDrawerFooter_unstable(state);
});

DrawerFooter.displayName = 'DrawerFooter';
