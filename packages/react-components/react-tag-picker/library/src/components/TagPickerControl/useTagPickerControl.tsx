'use client';

import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { useTagPickerControlBase_unstable } from './useTagPickerControlBase';
import { useTagPickerContext_unstable } from '../../contexts/TagPickerContext';

/**
 * Create the state required to render PickerControl.
 *
 * The returned state can be modified with hooks such as usePickerControlStyles_unstable,
 * before being passed to renderPickerControl_unstable.
 *
 * @param props - props from this instance of PickerControl
 * @param ref - reference to root HTMLDivElement of PickerControl
 */
export const useTagPickerControl_unstable = (
  props: TagPickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlState => {
  const noPopover = useTagPickerContext_unstable(ctx => ctx.noPopover ?? false);
  const baseProps =
    !noPopover && props.expandIcon === undefined
      ? {
          ...props,
          expandIcon: {},
        }
      : props;
  const baseState = useTagPickerControlBase_unstable(baseProps, ref);
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const appearance = useTagPickerContext_unstable(ctx => ctx.appearance);

  if (baseState.expandIcon) {
    baseState.expandIcon.children ??= <ChevronDownRegular />;
  }

  return {
    ...baseState,
    size,
    appearance,
  };
};
