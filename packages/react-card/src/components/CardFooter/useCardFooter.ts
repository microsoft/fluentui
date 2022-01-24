import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardFooterProps, CardFooterState } from './CardFooter.types';

/**
 * Create the state required to render CardFooter.
 *
 * The returned state can be modified with hooks such as useCardFooterStyles,
 * before being passed to renderCardFooter.
 *
 * @param props - props from this instance of CardFooter
 * @param ref - reference to root HTMLElement of CardFooter
 */
export const useCardFooter = (props: CardFooterProps, ref: React.Ref<HTMLElement>): CardFooterState => {
  const { action } = props;

  return {
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
};
