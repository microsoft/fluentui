import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableBodySlots, TableBodyState } from './TableBody.types';
import styles from './TableBody.module.css';

export const tableBodyClassName = 'fui-TableBody';

export const tableBodyClassNames: SlotClassNames<TableBodySlots> = {
  root: 'fui-TableBody',
};

export const useTableBodyStyles_unstable = (state: TableBodyState): TableBodyState => {
  state.root.className = clsx(
    tableBodyClassNames.root,
    styles[state.noNativeElements ? 'flex' : 'table'],
    state.root.className,
  );
  return state;
};
