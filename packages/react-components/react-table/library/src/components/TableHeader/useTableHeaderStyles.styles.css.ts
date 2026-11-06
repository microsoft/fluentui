import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableHeaderSlots, TableHeaderState } from './TableHeader.types';
import styles from './TableHeader.module.css';

export const tableHeaderClassName = 'fui-TableHeader';

export const tableHeaderClassNames: SlotClassNames<TableHeaderSlots> = {
  root: 'fui-TableHeader',
};

export const useTableHeaderStyles_unstable = (state: TableHeaderState): TableHeaderState => {
  state.root.className = clsx(
    tableHeaderClassNames.root,
    styles[state.noNativeElements ? 'flex' : 'table'],
    state.root.className,
  );
  return state;
};
