import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardFooterProps, CardFooterState, CardFooterRender } from './CardFooter.types';
import { renderCardFooter_unstable } from './renderCardFooter';

/**
 * Create the state required to render CardFooter.
 *
 * The returned state can be modified with hooks such as useCardFooterStyles_unstable,
 * before being passed to renderCardFooter_unstable.
 *
 * @param props - props from this instance of CardFooter
 * @param ref - reference to root HTMLElement of CardFooter
 */
export const useCardFooter_unstable = (
  props: CardFooterProps,
  ref: React.Ref<HTMLElement>,
): [CardFooterState, CardFooterRender] => {
  const { action } = props;

  const state: CardFooterState = {
    components: {
      root: 'div',
      action: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    action: resolveShorthand(action),
  };

  return [state, renderCardFooter_unstable];
};
