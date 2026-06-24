'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import { useTagPickerContextValues } from './useTagPickerContextValues';
import type { TagPickerProps } from './TagPicker.types';

export const TagPicker: ForwardRefComponent<TagPickerProps> = React.forwardRef((props, _ref) => {
  const state = useTagPicker(props);
  const contextValues = useTagPickerContextValues(state);

  return renderTagPicker(state, contextValues);
});

TagPicker.displayName = 'TagPicker';
