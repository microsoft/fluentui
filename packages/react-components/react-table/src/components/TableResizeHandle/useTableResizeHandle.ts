import * as React from 'react';
import { getNativeElementProps, useEventCallback } from '@fluentui/react-utilities';
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
    root: getNativeElementProps('div', {
      ref,
      ...props,
      onClick,
    }),
  };
};
