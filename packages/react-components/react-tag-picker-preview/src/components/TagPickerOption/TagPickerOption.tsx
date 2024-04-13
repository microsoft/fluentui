import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerOption } from './useTagPickerOption';
import { renderTagPickerOption } from './renderTagPickerOption';
import { useTagPickerOptionStyles } from './useTagPickerOptionStyles.styles';
import type { TagPickerOptionProps } from './TagPickerOption.types';

/**
 * TagPickerOption component - TODO: add more docs
 */
export const TagPickerOption: ForwardRefComponent<TagPickerOptionProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOption(props, ref);

  useTagPickerOptionStyles(state);
  return renderTagPickerOption(state);
});

TagPickerOption.displayName = 'TagPickerOption';
