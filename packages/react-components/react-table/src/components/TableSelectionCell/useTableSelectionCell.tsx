import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';
import type { TableSelectionCellProps, TableSelectionCellState } from './TableSelectionCell.types';
import { useTableCell_unstable } from '../TableCell/useTableCell';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render TableSelectionCell.
 *
 * The returned state can be modified with hooks such as useTableSelectionCellStyles_unstable,
 * before being passed to renderTableSelectionCell_unstable.
 *
 * @param props - props from this instance of TableSelectionCell
 * @param ref - reference to root HTMLElement of TableSelectionCell
 */
export const useTableSelectionCell_unstable = (
  props: TableSelectionCellProps,
  ref: React.Ref<HTMLElement>,
): TableSelectionCellState => {
  const tableCellState = useTableCell_unstable(props, ref);
  const { noNativeElements } = useTableContext();
  const { type = 'checkbox', checked = false, subtle = false, hidden = false } = props;

  return {
    ...tableCellState,
    components: {
      ...tableCellState.components,
      checkboxIndicator: Checkbox,
      radioIndicator: Radio,
    },
    checkboxIndicator: resolveShorthand(props.checkboxIndicator, {
      required: type === 'checkbox',
      defaultProps: { checked: props.checked },
    }),
    radioIndicator: resolveShorthand(props.radioIndicator, {
      required: type === 'radio',
      defaultProps: { checked: !!checked },
    }),
    type,
    checked,
    noNativeElements,
    subtle,
    hidden,
  };
};
