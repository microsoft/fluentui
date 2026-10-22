'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import { ArrowUpRegular, ArrowDownRegular } from '@fluentui/react-icons';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { useARIAButtonProps } from '@fluentui/react-aria';
import type { TableHeaderCellBaseState, TableHeaderCellProps, TableHeaderCellState } from './TableHeaderCell.types';
import { useTableContext } from '../../contexts/tableContext';

const sortIcons = {
  ascending: <ArrowUpRegular fontSize={12} />,
  descending: <ArrowDownRegular fontSize={12} />,
};

/**
 * Create the state required to render TableHeaderCell.
 *
 * The returned state can be modified with hooks such as useTableHeaderCellStyles_unstable,
 * before being passed to renderTableHeaderCell_unstable.
 *
 * @param props - props from this instance of TableHeaderCell
 * @param ref - reference to root HTMLElement of TableHeaderCell
 */
export const useTableHeaderCell_unstable = (
  props: TableHeaderCellProps,
  ref: React.Ref<HTMLElement>,
): TableHeaderCellState => {
  const baseState = useTableHeaderCellBase_unstable(props, useMergedRefs(ref, useFocusWithin()));

  return {
    ...baseState,
    sortIcon: slot.optional(props.sortIcon, {
      renderByDefault: !!props.sortDirection,
      defaultProps: { children: props.sortDirection ? sortIcons[props.sortDirection] : undefined },
      elementType: 'span',
    }),
  };
};

/**
 * Base state hook for TableHeaderCell, free of focus runtime. The sort icon is only rendered
 * when the consumer provides one.
 *
 * @param props - props from this instance of TableHeaderCell
 * @param ref - reference to root HTMLElement of TableHeaderCell
 */
export const useTableHeaderCellBase_unstable = (
  props: TableHeaderCellProps,
  ref: React.Ref<HTMLElement>,
): TableHeaderCellBaseState => {
  const { noNativeElements, sortable: contextSortable } = useTableContext();
  const { sortable = contextSortable } = props;

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'th';

  // The sort button is rendered as a div when not sortable, and as an ARIA button when sortable.
  const buttonSlot = slot.always<ARIAButtonSlotProps>(props.button, {
    elementType: 'div',
    defaultProps: {
      as: 'div',
    },
  });
  const ariaButtonProps = useARIAButtonProps(buttonSlot.as, buttonSlot);

  return {
    components: {
      root: rootComponent,
      button: 'div',
      sortIcon: 'span',
      aside: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps(rootComponent, {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: rootComponent === 'div' ? 'columnheader' : undefined,
        'aria-sort': sortable ? props.sortDirection ?? 'none' : undefined,
        ...props,
      } as const),
      { elementType: rootComponent },
    ),
    aside: slot.optional(props.aside, { elementType: 'span' }),
    sortIcon: slot.optional(props.sortIcon, { elementType: 'span' }),
    button: sortable ? ariaButtonProps : buttonSlot,
    sortable,
    sortDirection: props.sortDirection,
    noNativeElements,
  };
};
