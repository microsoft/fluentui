import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerOptionGroup } from './useTagPickerOptionGroup';
import { renderTagPickerOptionGroup } from './renderTagPickerOptionGroup';
import { useTagPickerOptionGroupStyles } from './useTagPickerOptionGroupStyles.styles';
import type { TagPickerOptionGroupProps } from './TagPickerOptionGroup.types';

/**
 * TagPickerOptionGroup component - TODO: add more docs
 */
export const TagPickerOptionGroup: ForwardRefComponent<TagPickerOptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOptionGroup(props, ref);

  useTagPickerOptionGroupStyles(state);
  return renderTagPickerOptionGroup(state);
});

TagPickerOptionGroup.displayName = 'TagPickerOptionGroup';
