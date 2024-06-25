import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePromptInput_unstable } from './usePromptInput';
import { renderPromptInput_unstable } from './renderPromptInput';
import { usePromptInputStyles_unstable } from './usePromptInputStyles.styles';
import type { PromptInputProps } from './PromptInput.types';
import { usePromptInputContextValues } from '../../contexts/usePromptInputContextValues';

/**
 * PromptInput component - TODO: add more docs
 */
export const PromptInput: ForwardRefComponent<PromptInputProps> = React.forwardRef((props, ref) => {
  const state = usePromptInput_unstable(props, ref);
  const contextValues = usePromptInputContextValues(state);

  usePromptInputStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('usePromptInputStyles_unstable')(state);
  return renderPromptInput_unstable(state, contextValues);
});

PromptInput.displayName = 'PromptInput';
