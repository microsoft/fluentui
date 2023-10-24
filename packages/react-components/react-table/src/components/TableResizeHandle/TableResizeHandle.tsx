import * as React from 'react';
import { useTableResizeHandle_unstable } from './useTableResizeHandle';
import { renderTableResizeHandle_unstable } from './renderTableResizeHandle';
import { useTableResizeHandleStyles_unstable } from './useTableResizeHandleStyles.styles';
import type { TableResizeHandleProps } from './TableResizeHandle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableResizeHandle component - TODO: add more docs
 */
export const TableResizeHandle: ForwardRefComponent<TableResizeHandleProps> = React.forwardRef((props, ref) => {
  const state = useTableResizeHandle_unstable(props, ref);

  useTableResizeHandleStyles_unstable(state);

  useCustomStyleHook_unstable('useTableResizeHandleStyles_unstable')(state);

  return renderTableResizeHandle_unstable(state);
});

TableResizeHandle.displayName = 'TableResizeHandle';
