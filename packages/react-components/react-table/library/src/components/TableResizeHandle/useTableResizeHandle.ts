import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
import type { TableResizeHandleProps, TableResizeHandleState } from './TableResizeHandle.types';

/**
 * Create the state required to render TableResizeHandle.
 *
 * The returned state can be modified with hooks such as useTableResizeHandleStyles_unstable,
 * before being passed to renderTableResizeHandle_unstable.
 *
 * @param props - props from this instance of TableResizeHandle
 * @param ref - reference to root HTMLElement of TableResizeHandle
 */
export const useTableResizeHandle_unstable = (
  props: TableResizeHandleProps,
  ref: React.Ref<HTMLElement>,
): TableResizeHandleState => {
  const onClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(event);
    event.stopPropagation();
  });
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
        onClick,
      }),
      { elementType: 'div' },
    ),
  };
};
