'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import { useTagPickerContextValues } from '@fluentui/react-tag-picker';

import { useTagPicker } from './useTagPicker';
import { renderTagPicker } from './renderTagPicker';
import type { TagPickerProps } from './TagPicker.types';

/**
 * Headless TagPicker component.
 */
export const TagPicker = (props: TagPickerProps): JSXElement => {
  const state = useTagPicker(props);
  const contextValues = useTagPickerContextValues(state);

  return renderTagPicker(state, contextValues);
};

TagPicker.displayName = 'TagPicker';
