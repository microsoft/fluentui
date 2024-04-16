import * as React from 'react';
import { useToolbar_unstable } from './useToolbar';
import { renderToolbar_unstable } from './renderToolbar';
import { useToolbarStyles_unstable } from './useToolbarStyles.styles';
import type { ToolbarProps } from './Toolbar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToolbarContextValues_unstable } from './useToolbarContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Toolbar component
 */
export const Toolbar: ForwardRefComponent<ToolbarProps> = React.forwardRef((props, ref) => {
  const state = useToolbar_unstable(props, ref);
  const contextValues = useToolbarContextValues_unstable(state);

  useToolbarStyles_unstable(state);

  useCustomStyleHook_unstable('useToolbarStyles_unstable')(state);

  return renderToolbar_unstable(state, contextValues);
});

Toolbar.displayName = 'Toolbar';
