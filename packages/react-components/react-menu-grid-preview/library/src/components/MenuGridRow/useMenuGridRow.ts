import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useMenuGridContext_unstable } from '../../contexts/menuGridContext';
import { MenuGridRowProps, MenuGridRowState } from './MenuGridRow.types';
import { MenuGridCell } from './../MenuGridCell/MenuGridCell';

/**
 * Given user props, returns state and render function for a MenuGridRow.
 */
export function useMenuGridRow_unstable(props: MenuGridRowProps, ref: React.Ref<HTMLDivElement>): MenuGridRowState {
  // const {
  // content: _content, // `content` is a slot and it's type clashes with the HTMLElement `content` attribute
  // ...rest
  // } = props;
  const { tableRowTabsterAttribute } = useMenuGridContext_unstable();

  return {
    components: {
      root: 'div',
      iconCell: MenuGridCell,
      contentCell: MenuGridCell,
      subText: 'span',
      secondActionCell: MenuGridCell,
      thirdActionCell: MenuGridCell,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'row',
        tabIndex: 0,
        ...tableRowTabsterAttribute,
        ...props,
      }),
      { elementType: 'div' },
    ),
    iconCell: slot.optional(props.iconCell, { elementType: MenuGridCell }),
    contentCell: slot.optional(props.content, {
      renderByDefault: !!props.children,
      defaultProps: { children: props.children },
      elementType: MenuGridCell,
    }),
    subText: slot.optional(props.subText, { elementType: 'span' }),
    secondActionCell: slot.optional(props.secondActionCell, { elementType: MenuGridCell }),
    thirdActionCell: slot.optional(props.thirdActionCell, { elementType: MenuGridCell }),
  };
}
