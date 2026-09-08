'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerButton } from './useTagPickerButton';
import { renderTagPickerButton } from './renderTagPickerButton';
import type { TagPickerButtonProps } from './TagPickerButton.types';

/**
 * A button trigger for a TagPicker, used as an alternative to `TagPickerInput` when the
 * picker does not need free-text filtering.
 */
export const TagPickerButton: ForwardRefComponent<TagPickerButtonProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerButton(props, ref);

  return renderTagPickerButton(state);
});

TagPickerButton.displayName = 'TagPickerButton';
