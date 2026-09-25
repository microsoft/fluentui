'use client';

import type * as React from 'react';
import {
  useTagPickerContext_unstable,
  useTagPickerInput as useTagPickerInputBase,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerInputProps, TagPickerInputState } from './TagPickerInput.types';

export const useTagPickerInput = (
  props: TagPickerInputProps,
  ref: React.Ref<HTMLInputElement>,
): TagPickerInputState => {
  const { appearance: _appearance, ...rest } = props;
  const size = useTagPickerContext_unstable(context => context.size);
  const state = useTagPickerInputBase(rest, ref);
  return { ...state, root: { ...state.root, 'data-size': size }, size };
};
