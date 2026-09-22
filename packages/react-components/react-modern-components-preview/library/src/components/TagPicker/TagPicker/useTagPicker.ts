'use client';

import { useTagPicker as useTagPickerBase } from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerProps, TagPickerState } from './TagPicker.types';

export const useTagPicker = (props: TagPickerProps): TagPickerState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useTagPickerBase(rest);

  return { ...state, appearance, size };
};
