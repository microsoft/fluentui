'use client';

import * as React from 'react';
import { useId, slot, useMergedRefs } from '@fluentui/react-utilities';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';
import type {
  TableSelectionCellBaseProps,
  TableSelectionCellBaseState,
  TableSelectionCellProps,
  TableSelectionCellState,
} from './TableSelectionCell.types';
import { useTableCellBase_unstable } from '../TableCell/useTableCell';
import { useFocusWithin } from '@fluentui/react-tabster';

// The selection is toggled by the row or the cell, the native inputs only reflect it
const noop = () => undefined;

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
  // The Fluent indicators replace the native ones that the base hook renders
  const { checkboxIndicator, radioIndicator, ...baseProps } = props;
  const baseState = useTableSelectionCellBase_unstable(
    { ...baseProps, checkboxIndicator: undefined, radioIndicator: undefined },
    useMergedRefs(ref, useFocusWithin()),
  );
  const { type, checked } = baseState;
  const { subtle = false, invisible = false } = props;

  return {
    ...baseState,
    subtle,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      checkboxIndicator: Checkbox,
      radioIndicator: Radio,
    },
    checkboxIndicator: slot.optional(checkboxIndicator, {
      renderByDefault: type === 'checkbox',
      defaultProps: { checked: props.checked },
      elementType: Checkbox,
    }),
    radioIndicator: slot.optional(radioIndicator, {
      renderByDefault: type === 'radio' && !invisible,
      defaultProps: { checked: !!checked, input: { name: baseState.radioIndicator?.name } },
      elementType: Radio,
    }),
  };
};

/**
 * Base state hook for TableSelectionCell, free of focus runtime and of the Fluent `Checkbox` and `Radio`.
 * The selection indicators are native inputs and the mixed state is set through `indeterminate`.
 *
 * @param props - props from this instance of TableSelectionCell
 * @param ref - reference to root HTMLElement of TableSelectionCell
 */
export const useTableSelectionCellBase_unstable = (
  props: TableSelectionCellBaseProps,
  ref: React.Ref<HTMLElement>,
): TableSelectionCellBaseState => {
  const tableCellState = useTableCellBase_unstable(props, ref);
  const {
    type = 'checkbox',
    checked = false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    hidden = false,
    invisible = false,
  } = props;

  const radioName = useId('table-selection-radio');
  const indeterminate = checked === 'mixed';
  const checkboxRef = React.useCallback(
    (element: HTMLInputElement | null) => {
      if (element) {
        element.indeterminate = indeterminate;
      }
    },
    [indeterminate],
  );

  const checkboxIndicator = slot.optional(props.checkboxIndicator, {
    renderByDefault: type === 'checkbox',
    defaultProps: { type: 'checkbox', checked: checked === true, onChange: noop },
    elementType: 'input',
  });
  const mergedCheckboxRef = useMergedRefs(checkboxIndicator?.ref, checkboxRef);
  if (checkboxIndicator) {
    checkboxIndicator.ref = mergedCheckboxRef;
  }

  return {
    ...tableCellState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...tableCellState.components,
      checkboxIndicator: 'input',
      radioIndicator: 'input',
    },
    checkboxIndicator,
    radioIndicator: slot.optional(props.radioIndicator, {
      renderByDefault: type === 'radio' && !invisible,
      defaultProps: { type: 'radio', checked: !!checked, name: radioName, onChange: noop },
      elementType: 'input',
    }),
    type,
    checked,
    hidden: invisible || hidden,
  };
};
