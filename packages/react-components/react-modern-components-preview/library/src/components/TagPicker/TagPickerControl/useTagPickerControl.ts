'use client';

import * as React from 'react';
import {
  useTagPickerContext_unstable,
  useTagPickerControl as useTagPickerControlBase,
} from '@fluentui/react-headless-components-preview/tag-picker';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';

export const useTagPickerControl = (
  props: TagPickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlState => {
  const appearance = useTagPickerContext_unstable(context => context.appearance);
  const size = useTagPickerContext_unstable(context => context.size);
  const noPopover = useTagPickerContext_unstable(context => context.noPopover);
  const expandIcon =
    !noPopover && props.expandIcon === undefined
      ? { children: React.createElement('span', { 'aria-hidden': true, 'data-default-icon': '' }) }
      : props.expandIcon;
  const state = useTagPickerControlBase({ ...props, expandIcon }, ref);

  return {
    ...state,
    root: { ...state.root, 'data-appearance': appearance, 'data-size': size },
    appearance,
    size,
  };
};
