import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import { ArrowUpRegular, ArrowDownRegular } from '@fluentui/react-icons';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import type { TableHeaderCellProps, TableHeaderCellState } from './TableHeaderCell.types';
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
  const { noNativeElements, sortable: contextSortable } = useTableContext();
  const { sortable = contextSortable } = props;

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'th';

  const buttonSlot = slot.always<ARIAButtonSlotProps>(props.button, {
    elementType: 'div',
    defaultProps: {
      as: 'div',
      ...(!sortable && {
        role: 'presentation',
        tabIndex: undefined,
      }),
    },
  });

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
        ref: useMergedRefs(ref, useFocusWithin()) as React.Ref<HTMLDivElement>,
        role: rootComponent === 'div' ? 'columnheader' : undefined,
        'aria-sort': sortable ? props.sortDirection ?? 'none' : undefined,
        ...props,
      } as const),
      { elementType: rootComponent },
    ),
    aside: slot.optional(props.aside, { elementType: 'span' }),
    sortIcon: slot.optional(props.sortIcon, {
      renderByDefault: !!props.sortDirection,
      defaultProps: { children: props.sortDirection ? sortIcons[props.sortDirection] : undefined },
      elementType: 'span',
    }),
    button: useARIAButtonProps(buttonSlot.as, buttonSlot),
    sortable,
    noNativeElements,
  };
};
