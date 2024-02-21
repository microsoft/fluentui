import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { PickerControlProps, PickerControlState } from './PickerControl.types';
import { usePickerContext_unstable } from '../../contexts/PickerContext';

/**
 * Create the state required to render PickerControl.
 *
 * The returned state can be modified with hooks such as usePickerControlStyles_unstable,
 * before being passed to renderPickerControl_unstable.
 *
 * @param props - props from this instance of PickerControl
 * @param ref - reference to root HTMLDivElement of PickerControl
 */
export const usePickerControl_unstable = (
  props: PickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): PickerControlState => {
  const { appearance = 'outline', size = 'medium', disabled = false, clearable = false } = props;
  const targetRef = usePickerContext_unstable(ctx => ctx.targetRef) as React.RefObject<HTMLDivElement>;
  const setOpen = usePickerContext_unstable(ctx => ctx.setOpen);
  const open = usePickerContext_unstable(ctx => ctx.open);
  const triggerRef = usePickerContext_unstable(ctx => ctx.triggerRef);
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, targetRef),
        // TODO merge
        onMouseDown: (e: React.MouseEvent<HTMLElement>) => {
          if (e.target !== triggerRef.current) {
            e.preventDefault();
          }
        },
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          if (!e.defaultPrevented && e.target !== triggerRef.current) {
            triggerRef.current?.focus();
            setOpen(e, !open);
          }
        },
        ...props,
      }),
      { elementType: 'div' },
    ),

    appearance,
    size,
    disabled,
    clearable,
  };
};
