'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TagPickerOptionGroupProps } from './TagPickerOptionGroup.types';
import { renderTagPickerOptionGroup } from './renderTagPickerOptionGroup';
import { useTagPickerOptionGroup } from './useTagPickerOptionGroup';
import { useTagPickerOptionGroupStyles } from './useTagPickerOptionGroupStyles.styles';

export const TagPickerOptionGroup: ForwardRefComponent<TagPickerOptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOptionGroup(props, ref);
  useTagPickerOptionGroupStyles(state);
  return renderTagPickerOptionGroup(state);
});

TagPickerOptionGroup.displayName = 'TagPickerOptionGroup';
