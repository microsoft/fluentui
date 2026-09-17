'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTagPickerOptionGroup,
  useTagPickerOptionGroup,
} from '@fluentui/react-headless-components-preview/tag-picker';

import type { TagPickerOptionGroupProps } from './TagPickerOptionGroup.types';
import { useTagPickerOptionGroupStyles } from './useTagPickerOptionGroupStyles';

/**
 * Labels and separates a run of TagPickerOptions inside a TagPickerList. Windmod
 * TagPickerOptionGroup: the headless group — which is the shared OptionGroup under three aliases —
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TagPickerOptionGroup: ForwardRefComponent<TagPickerOptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerOptionGroup(props, ref);
  const styled = useTagPickerOptionGroupStyles(state);

  return renderTagPickerOptionGroup(styled);
});

TagPickerOptionGroup.displayName = 'TagPickerOptionGroup';
