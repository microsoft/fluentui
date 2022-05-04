import * as React from 'react';
import { useComboButton_unstable } from './useComboButton';
import { renderComboButton_unstable } from './renderComboButton';
import { useComboButtonStyles_unstable } from './useComboButtonStyles';
import type { ComboButtonProps } from './ComboButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ComboButton component: the faceplate for a select-only Combobox
 */
export const ComboButton: ForwardRefComponent<ComboButtonProps> = React.forwardRef((props, ref) => {
  const state = useComboButton_unstable(props, ref);

  useComboButtonStyles_unstable(state);
  return renderComboButton_unstable(state);
});

ComboButton.displayName = 'ComboButton';
