import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ListItemButtonProps, ListItemButtonState } from './ListItemButton.types';

/**
 * Create the state required to render ListItemButton.
 *
 * The returned state can be modified with hooks such as useListItemButtonStyles_unstable,
 * before being passed to renderListItemButton_unstable.
 *
 * @param props - props from this instance of ListItemButton
 * @param ref - reference to root HTMLDivElement of ListItemButton
 */
export const useListItemButton_unstable = (
  props: ListItemButtonProps,
  ref: React.Ref<HTMLDivElement>,
): ListItemButtonState => {
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
