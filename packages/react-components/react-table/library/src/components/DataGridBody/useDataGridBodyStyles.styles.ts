import { makeStyles, mergeClasses } from '@griffel/react';
import type { DataGridBodySlots, DataGridBodyState } from './DataGridBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableBodyStyles_unstable } from '../TableBody/useTableBodyStyles.styles';
import { dataGridRowClassNames } from '../DataGridRow/useDataGridRowStyles.styles';

export const dataGridBodyClassNames: SlotClassNames<DataGridBodySlots> = {
  root: 'fui-DataGridBody',
};

const useStyles = makeStyles({
  root: {
    /* Tabster creates a dummy element that acts as a table cell, making the table shifting its position */
    [`& .${dataGridRowClassNames.root} > [data-tabster-dummy]`]: {
      display: 'contents',
    },
  },
});

/**
 * Apply styling to the DataGridBody slots based on the state
 */
export const useDataGridBodyStyles_unstable = (state: DataGridBodyState): DataGridBodyState => {
  'use no memo';

  const styles = useStyles();

  useTableBodyStyles_unstable(state);
  state.root.className = mergeClasses(
    dataGridBodyClassNames.root,
    state.root.as === 'tbody' && styles.root,
    state.root.className,
  );

  return state;
};
