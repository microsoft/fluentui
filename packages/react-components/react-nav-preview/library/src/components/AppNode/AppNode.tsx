import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAppNode_unstable } from './useAppNode';
import { renderAppNode_unstable } from './renderAppNode';
import { useAppNodeStyles_unstable } from './useAppNodeStyles.styles';
import type { AppNodeProps } from './AppNode.types';

/**
 * AppNode component - TODO: add more docs
 */
export const AppNode: ForwardRefComponent<AppNodeProps> = React.forwardRef((props, ref) => {
  const state = useAppNode_unstable(props, ref);

  useAppNodeStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useAppNodeStyles_unstable')(state);
  return renderAppNode_unstable(state);
});

AppNode.displayName = 'AppNode';
