import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerContextValue } from '../../contexts/drawerContext';

import { useDrawer_unstable } from './useDrawer';
import { renderDrawer_unstable } from './renderDrawer';
import { useDrawerStyles_unstable } from './useDrawerStyles.styles';
import type { DrawerProps } from './Drawer.types';

/**
 * Drawer contains supplementary content and are used for complex creation, edit, or management experiences.
 */
export const Drawer: ForwardRefComponent<DrawerProps> = React.forwardRef((props, ref) => {
  const state = useDrawer_unstable(props, ref);
  const contextValue = useDrawerContextValue();

  useDrawerStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerStyles_unstable')(state);

  return renderDrawer_unstable(state, contextValue);
});

Drawer.displayName = 'Drawer';
