import * as React from 'react';
import { useComboButton } from './useComboButton';
import { renderComboButton } from './renderComboButton';
import { useComboButtonStyles } from './useComboButtonStyles';
import type { ComboButtonProps } from './ComboButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ComboButton component
 */
export const ComboButton: ForwardRefComponent<ComboButtonProps> = React.forwardRef((props, ref) => {
  const state = useComboButton(props, ref);

  useComboButtonStyles(state);
  return renderComboButton(state);
});

ComboButton.displayName = 'ComboButton';
