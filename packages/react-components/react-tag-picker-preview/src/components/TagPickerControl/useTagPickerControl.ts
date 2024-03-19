import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
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
  const targetRef = useTagPickerContext_unstable(ctx => ctx.targetRef) as React.RefObject<HTMLDivElement>;
  const setOpen = useTagPickerContext_unstable(ctx => ctx.setOpen);
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const triggerRef = useTagPickerContext_unstable(ctx => ctx.triggerRef);
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const appearance = useTagPickerContext_unstable(ctx => ctx.appearance);
  const handleMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== triggerRef.current) {
      event.preventDefault();
    }
  });
  const handleClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!event.defaultPrevented && event.target !== triggerRef.current) {
      triggerRef.current?.focus();
      setOpen(event, !open);
    }
  });
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, targetRef),
        onMouseDown: handleMouseDown,
        onClick: handleClick,
        ...props,
      }),
      { elementType: 'div' },
    ),
    size,
    appearance,
  };
};
