import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AppItemProps, AppItemState } from './AppItem.types';

/**
 * Create the state required to render AppItem.
 *
 * The returned state can be modified with hooks such as useAppItemStyles_unstable,
 * before being passed to renderAppItem_unstable.
 *
 * @param props - props from this instance of AppItem
 * @param ref - reference to root HTMLDivElement of AppItem
 */
export const useAppItem_unstable = (props: AppItemProps, ref: React.Ref<HTMLDivElement>): AppItemState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
