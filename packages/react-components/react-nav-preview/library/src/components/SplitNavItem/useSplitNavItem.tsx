import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SplitNavItemProps, SplitNavItemState } from './SplitNavItem.types';
import { Button } from '@fluentui/react-button';
import { Pin20Regular } from '@fluentui/react-icons';

/**
 * Create the state required to render SplitNavItem.
 *
 * The returned state can be modified with hooks such as useSplitNavItemStyles_unstable,
 * before being passed to renderSplitNavItem_unstable.
 *
 * @param props - props from this instance of SplitNavItem
 * @param ref - reference to root HTMLDivElement of SplitNavItem
 */
export const useSplitNavItem_unstable = (
  props: SplitNavItemProps,
  ref: React.Ref<HTMLDivElement>,
): SplitNavItemState => {
  const { secondaryActionButton, children } = props;

  const secondaryActionButtonShorthand = slot.optional(secondaryActionButton, {
    defaultProps: {
      icon: <Pin20Regular />,
      appearance: 'transparent',
    },
    elementType: Button,
  });

  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
      secondaryActionButton: Button,
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        children,
        ...props,
      }),
      { elementType: 'div' },
    ),
    secondaryActionButton: secondaryActionButtonShorthand,
  };
};
