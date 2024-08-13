import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TableCellLayoutProps, TableCellLayoutState } from './TableCellLayout.types';
import { useTableContext } from '../../contexts/tableContext';

const tableAvatarSizeMap = {
  medium: 32,
  small: 24,
  'extra-small': 20,
} as const;

/**
 * Create the state required to render TableCellLayout.
 *
 * The returned state can be modified with hooks such as useTableCellLayoutStyles_unstable,
 * before being passed to renderTableCellLayout_unstable.
 *
 * @param props - props from this instance of TableCellLayout
 * @param ref - reference to root HTMLElement of TableCellLayout
 */
export const useTableCellLayout_unstable = (
  props: TableCellLayoutProps,
  ref: React.Ref<HTMLElement>,
): TableCellLayoutState => {
  const { size } = useTableContext();

  return {
    components: {
      root: 'div',
      main: 'span',
      description: 'span',
      content: 'div',
      media: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    appearance: props.appearance,
    truncate: props.truncate,
    main: slot.optional(props.main, { renderByDefault: true, elementType: 'span' }),
    media: slot.optional(props.media, { elementType: 'span' }),
    description: slot.optional(props.description, { elementType: 'span' }),
    content: slot.optional(props.content, {
      renderByDefault: !!props.description || !!props.children,
      elementType: 'div',
    }),
    avatarSize: tableAvatarSizeMap[size],
    size,
  };
};
