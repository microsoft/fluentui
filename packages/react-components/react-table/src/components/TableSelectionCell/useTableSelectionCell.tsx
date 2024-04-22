import * as React from 'react';
import { useId, slot } from '@fluentui/react-utilities';
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
  const {
    type = 'checkbox',
    checked = false,
    subtle = false,
    // eslint-disable-next-line deprecation/deprecation
    hidden = false,
    invisible = false,
  } = props;

  return {
    ...tableCellState,
    components: {
      ...tableCellState.components,
      checkboxIndicator: Checkbox,
      radioIndicator: Radio,
    },
    checkboxIndicator: slot.optional(props.checkboxIndicator, {
      renderByDefault: type === 'checkbox' && !invisible,
      defaultProps: { checked: props.checked },
      elementType: Checkbox,
    }),
    radioIndicator: slot.optional(props.radioIndicator, {
      renderByDefault: type === 'radio' && !invisible,
      defaultProps: { checked: !!checked, input: { name: useId('table-selection-radio') } },
      elementType: Radio,
    }),
    type,
    checked,
    noNativeElements,
    subtle,
    hidden: invisible || hidden,
  };
};
