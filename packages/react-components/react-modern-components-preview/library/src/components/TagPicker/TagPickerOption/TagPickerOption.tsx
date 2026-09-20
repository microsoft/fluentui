'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TagPickerOptionProps } from './TagPickerOption.types';
import { renderTagPickerOption } from './renderTagPickerOption';
import { useTagPickerOption } from './useTagPickerOption';
import { useTagPickerOptionStyles } from './useTagPickerOptionStyles.styles';

export const TagPickerOption: ForwardRefComponent<TagPickerOptionProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOption(props, ref);
  useTagPickerOptionStyles(state);
  return renderTagPickerOption(state);
});

TagPickerOption.displayName = 'TagPickerOption';
