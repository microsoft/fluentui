import * as React from 'react';
import { useDataGridHeader_unstable } from './useDataGridHeader';
import { renderDataGridHeader_unstable } from './renderDataGridHeader';
import { useDataGridHeaderStyles_unstable } from './useDataGridHeaderStyles.styles';
import type { DataGridHeaderProps } from './DataGridHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridHeader component
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const DataGridHeader: ForwardRefComponent<DataGridHeaderProps> = React.forwardRef((props, ref) => {
  const state = useDataGridHeader_unstable(props, ref);

  useDataGridHeaderStyles_unstable(state);

  useCustomStyleHook_unstable('useDataGridHeaderStyles_unstable')(state);

  return renderDataGridHeader_unstable(state);
});

DataGridHeader.displayName = 'DataGridHeader';
