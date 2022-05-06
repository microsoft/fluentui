import * as React from 'react';
import { useComboboxBase_unstable } from './useComboboxBase';
import { renderComboboxBase_unstable } from './renderComboboxBase';
import { useComboboxBaseStyles_unstable } from './useComboboxBaseStyles';
import type { ComboboxBaseProps } from './ComboboxBase.types';
import { useComboboxContextValues } from '../../contexts/useComboboxContextValues';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ComboboxBase component - TODO: add more docs
 */
export const ComboboxBase: ForwardRefComponent<ComboboxBaseProps> = React.forwardRef((props, ref) => {
  const state = useComboboxBase_unstable(props, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxBaseStyles_unstable(state);
  return renderComboboxBase_unstable(state, contextValues);
});

ComboboxBase.displayName = 'ComboboxBase';
