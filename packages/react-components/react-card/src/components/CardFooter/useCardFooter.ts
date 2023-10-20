import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CardFooterProps, CardFooterState } from './CardFooter.types';

/**
 * Create the state required to render CardFooter.
 *
 * The returned state can be modified with hooks such as useCardFooterStyles_unstable,
 * before being passed to renderCardFooter_unstable.
 *
 * @param props - props from this instance of CardFooter
 * @param ref - reference to root HTMLElement of CardFooter
 */
export const useCardFooter_unstable = (props: CardFooterProps, ref: React.Ref<HTMLElement>): CardFooterState => {
  const { action } = props;

  return {
    components: {
      root: 'div',
      action: 'div',
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
    action: slot.optional(action, { elementType: 'div' }),
  };
};
