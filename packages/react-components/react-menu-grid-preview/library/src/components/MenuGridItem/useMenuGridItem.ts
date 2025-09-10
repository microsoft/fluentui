import * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import { MenuGridItemProps, MenuGridItemState } from './MenuGridItem.types';
import { MenuGridCell } from './../MenuGridCell/MenuGridCell';
import { MenuGridRow } from './../MenuGridRow/MenuGridRow';

/**
 * Given user props, returns state and render function for a MenuGridItem.
 */
export function useMenuGridItem_unstable(props: MenuGridItemProps, ref: React.Ref<HTMLDivElement>): MenuGridItemState {
  const {
    icon,
    content: _content, // `content` is a slot and it's type clashes with the HTMLElement `content` attribute
    subText,
    firstSubAction,
    secondSubAction,
    ...rest
  } = props;

  return {
    components: {
      root: MenuGridRow,
      icon: MenuGridCell,
      content: MenuGridCell,
      subText: 'span',
      firstSubAction: MenuGridCell,
      secondSubAction: MenuGridCell,
    },
    root: slot.always(
      {
        ref,
        ...rest,
      },
      { elementType: MenuGridRow },
    ),
    icon: slot.optional(props.icon, { elementType: MenuGridCell }),
    content: slot.optional(props.content, {
      renderByDefault: !!props.children,
      defaultProps: { children: props.children },
      elementType: MenuGridCell,
    }),
    subText: slot.optional(props.subText, { elementType: 'span' }),
    firstSubAction: slot.optional(props.firstSubAction, { elementType: MenuGridCell }),
    secondSubAction: slot.optional(props.secondSubAction, { elementType: MenuGridCell }),
  };
}
