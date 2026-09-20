'use client';

import type * as React from 'react';
import {
  useTagPickerContext_unstable,
  useTagPickerGroup as useTagPickerGroupBase,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerGroupProps, TagPickerGroupState } from './TagPickerGroup.types';

const tagSizeMap = { medium: 'extra-small', large: 'small', 'extra-large': 'medium' } as const;

export const useTagPickerGroup = (props: TagPickerGroupProps, ref: React.Ref<HTMLDivElement>): TagPickerGroupState => {
  const pickerSize = useTagPickerContext_unstable(context => context.size);
  const pickerAppearance = useTagPickerContext_unstable(context => context.appearance);
  const size = tagSizeMap[pickerSize];
  const appearance = pickerAppearance === 'filled-darker' ? 'outline' : 'filled';
  const state = useTagPickerGroupBase({ role: 'listbox', ...props }, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-picker-size': pickerSize,
      'data-size': size,
    },
    appearance,
    pickerSize,
    size,
  };
};
