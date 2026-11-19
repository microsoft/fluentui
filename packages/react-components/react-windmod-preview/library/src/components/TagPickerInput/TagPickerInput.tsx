'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTagPickerInput, useTagPickerInput } from '@fluentui/react-headless-components-preview/tag-picker';

import type { TagPickerInputProps } from './TagPickerInput.types';
import { useTagPickerInputStyles } from './useTagPickerInputStyles';

/**
 * The text trigger of a TagPicker, used to filter options and open the surface. Windmod
 * TagPickerInput: the headless input decorated with the Fluent visual contract (Tailwind v4 + CSS
 * Modules).
 */
export const TagPickerInput: ForwardRefComponent<TagPickerInputProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerInput(props, ref);
  const styled = useTagPickerInputStyles(state);

  return renderTagPickerInput(styled);
});

TagPickerInput.displayName = 'TagPickerInput';
