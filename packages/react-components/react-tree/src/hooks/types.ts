import * as React from 'react';
import { SelectionMode } from '@fluentui/react-utilities';

export type TreeItemId = string | number;

export interface TreeSelectionState {
  /**
   * Selects single row
   */
  selectTreeItem: (e: React.SyntheticEvent, treeItemId: TreeItemId) => void;
  /**
   * De-selects single row
   */
  deselectTreeItem: (e: React.SyntheticEvent, rowId: TreeItemId) => void;

  selectionMode: SelectionMode;
}
