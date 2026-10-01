'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TagPickerButtonProps } from './TagPickerButton.types';
import { renderTagPickerButton } from './renderTagPickerButton';
import { useTagPickerButton } from './useTagPickerButton';
import { useTagPickerButtonStyles } from './useTagPickerButtonStyles.styles';

export const TagPickerButton: ForwardRefComponent<TagPickerButtonProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerButton(props, ref);
  useTagPickerButtonStyles(state);
  return renderTagPickerButton(state);
});

TagPickerButton.displayName = 'TagPickerButton';
