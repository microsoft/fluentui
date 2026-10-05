'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerOption } from './useTagPickerOption';
import { renderTagPickerOption } from './renderTagPickerOption';
import type { TagPickerOptionProps } from './TagPickerOption.types';

/**
 * An option within a TagPickerList.
 */
export const TagPickerOption: ForwardRefComponent<TagPickerOptionProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOption(props, ref);

  return renderTagPickerOption(state);
});

TagPickerOption.displayName = 'TagPickerOption';
