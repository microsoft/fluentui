import * as React from 'react';
import { getNativeElementProps, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusVisible, useFocusWithin } from '@fluentui/react-tabster';
import type { TableRowProps, TableRowState } from './TableRow.types';
import { useTableContext } from '../../contexts/tableContext';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';

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
  const { noNativeElements, size } = useTableContext();
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'tr';
  const focusVisibleRef = useFocusVisible();
  const focusWithinRef = useFocusWithin();
  const isHeaderRow = useIsInTableHeader();

  return {
    components: {
      root: rootComponent,
    },
    root: getNativeElementProps(rootComponent, {
      ref: useMergedRefs(ref, focusVisibleRef, focusWithinRef),
      role: rootComponent === 'div' ? 'row' : undefined,
      ...props,
    }),
    size,
    noNativeElements,
    appearance: props.appearance ?? 'none',
    isHeaderRow,
  };
};
