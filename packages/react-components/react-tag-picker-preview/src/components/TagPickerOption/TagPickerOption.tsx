import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerOption_unstable } from './useTagPickerOption';
import { renderTagPickerOption_unstable } from './renderTagPickerOption';
import { useTagPickerOptionStyles_unstable } from './useTagPickerOptionStyles.styles';
import type { TagPickerOptionProps } from './TagPickerOption.types';

/**
 * TagPickerOption component - TODO: add more docs
 */
export const TagPickerOption: ForwardRefComponent<TagPickerOptionProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOption_unstable(props, ref);

  useTagPickerOptionStyles_unstable(state);
  return renderTagPickerOption_unstable(state);
});

TagPickerOption.displayName = 'TagPickerOption';
