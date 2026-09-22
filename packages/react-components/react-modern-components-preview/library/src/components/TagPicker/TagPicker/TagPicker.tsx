'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import { useTagPickerContextValues } from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps } from './TagPicker.types';
import { renderTagPicker } from './renderTagPicker';
import { useTagPicker } from './useTagPicker';

export const TagPicker = (props: TagPickerProps): JSXElement => {
  const state = useTagPicker(props);
  const contextValues = useTagPickerContextValues(state);
  return renderTagPicker(state, contextValues);
};

TagPicker.displayName = 'TagPicker';
