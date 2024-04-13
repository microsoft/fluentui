import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerButton } from './useTagPickerButton';
import { renderTagPickerButton } from './renderTagPickerButton';
import { useTagPickerButtonStyles } from './useTagPickerButtonStyles.styles';
import type { TagPickerButtonProps } from './TagPickerButton.types';

/**
 * PickerButton component - TODO: add more docs
 */
export const TagPickerButton: ForwardRefComponent<TagPickerButtonProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerButton(props, ref);

  useTagPickerButtonStyles(state);
  return renderTagPickerButton(state);
});

TagPickerButton.displayName = 'TagPickerButton';
