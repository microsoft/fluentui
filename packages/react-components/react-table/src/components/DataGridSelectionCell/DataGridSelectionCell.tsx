import * as React from 'react';
import { useDataGridSelectionCell_unstable } from './useDataGridSelectionCell';
import { renderDataGridSelectionCell_unstable } from './renderDataGridSelectionCell';
import { useDataGridSelectionCellStyles_unstable } from './useDataGridSelectionCellStyles';
import type { DataGridSelectionCellProps } from './DataGridSelectionCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridSelectionCell component
 */
export const DataGridSelectionCell: ForwardRefComponent<DataGridSelectionCellProps> = React.forwardRef((props, ref) => {
  const state = useDataGridSelectionCell_unstable(props, ref);

  useDataGridSelectionCellStyles_unstable(state);

  const { useDataGridSelectionCellStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDataGridSelectionCell_unstable(state);
});

DataGridSelectionCell.displayName = 'DataGridSelectionCell';
