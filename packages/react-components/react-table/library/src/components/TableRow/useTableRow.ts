'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useFocusVisible, useFocusWithin } from '@fluentui/react-tabster';
import type { TableRowBaseProps, TableRowBaseState, TableRowProps, TableRowState } from './TableRow.types';
import { useTableContext } from '../../contexts/tableContext';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';

/**
 * Create the base state required to render TableRow, without design-only props.
 *
 * @param props - props from this instance of TableRow (without appearance)
 * @param ref - reference to root HTMLElement of TableRow
 */
export const useTableRowBase_unstable = (props: TableRowBaseProps, ref: React.Ref<HTMLElement>): TableRowBaseState => {
  const { noNativeElements } = useTableContext();
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'tr';
  const focusVisibleRef = useFocusVisible();
  const focusWithinRef = useFocusWithin();
  const isHeaderRow = useIsInTableHeader();

  return {
    components: {
      root: rootComponent,
    },
    root: slot.always(
      getIntrinsicElementProps(rootComponent, {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, focusVisibleRef, focusWithinRef) as React.Ref<HTMLDivElement>,
        role: rootComponent === 'div' ? 'row' : undefined,
        ...props,
      }),
      { elementType: rootComponent },
    ),
    noNativeElements,
    isHeaderRow,
  };
};

/**
 * Create the state required to render TableRow.
 *
 * The returned state can be modified with hooks such as useTableRowStyles_unstable,
 * before being passed to renderTableRow_unstable.
 *
 * @param props - props from this instance of TableRow
 * @param ref - reference to root HTMLElement of TableRow
 */
export const useTableRow_unstable = (props: TableRowProps, ref: React.Ref<HTMLElement>): TableRowState => {
  const { size } = useTableContext();
  return {
    ...useTableRowBase_unstable(props, ref),
    size,
    appearance: props.appearance ?? 'none',
  };
};
