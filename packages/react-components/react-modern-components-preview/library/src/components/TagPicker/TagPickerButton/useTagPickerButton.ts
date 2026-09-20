'use client';

import type * as React from 'react';
import {
  useTagPickerButton as useTagPickerButtonBase,
  useTagPickerContext_unstable,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerButtonProps, TagPickerButtonState } from './TagPickerButton.types';

export const useTagPickerButton = (
  props: TagPickerButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): TagPickerButtonState => {
  const { appearance: _appearance, size: _size, ...rest } = props;
  const size = useTagPickerContext_unstable(context => context.size);
  const state = useTagPickerButtonBase(rest, ref);
  return { ...state, root: { ...state.root, 'data-size': size }, size };
};
