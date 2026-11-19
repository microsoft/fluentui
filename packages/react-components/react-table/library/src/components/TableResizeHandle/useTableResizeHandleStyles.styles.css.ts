import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableResizeHandleSlots, TableResizeHandleState } from './TableResizeHandle.types';
import styles from './TableResizeHandle.module.css';

export const tableResizeHandleClassNames: SlotClassNames<TableResizeHandleSlots> = {
  root: 'fui-TableResizeHandle',
};

export const useTableResizeHandleStyles_unstable = (state: TableResizeHandleState): TableResizeHandleState => {
  state.root.className = clsx(tableResizeHandleClassNames.root, styles.root, state.root.className);
  return state;
};
