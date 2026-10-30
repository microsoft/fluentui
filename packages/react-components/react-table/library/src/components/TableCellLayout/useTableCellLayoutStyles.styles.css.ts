import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableCellLayoutSlots, TableCellLayoutState } from './TableCellLayout.types';
import styles from './TableCellLayout.module.css';

export const tableCellLayoutClassNames: SlotClassNames<TableCellLayoutSlots> = {
  root: 'fui-TableCellLayout',
  media: 'fui-TableCellLayout__media',
  main: 'fui-TableCellLayout__main',
  description: 'fui-TableCellLayout__description',
  content: 'fui-TableCellLayout__content',
};

export const useTableCellLayoutStyles_unstable = (state: TableCellLayoutState): TableCellLayoutState => {
  state.root.className = clsx(
    tableCellLayoutClassNames.root,
    styles.root,
    styles[state.size],
    state.appearance && styles[state.appearance],
    state.truncate && styles.truncate,
    state.root.className,
  );
  if (state.media) {
    state.media.className = clsx(tableCellLayoutClassNames.media, styles.media, state.media.className);
  }
  if (state.main) {
    state.main.className = clsx(tableCellLayoutClassNames.main, styles.main, state.main.className);
  }
  if (state.description) {
    state.description.className = clsx(
      tableCellLayoutClassNames.description,
      styles.description,
      state.description.className,
    );
  }
  if (state.content) {
    state.content.className = clsx(tableCellLayoutClassNames.content, styles.content, state.content.className);
  }
  return state;
};
