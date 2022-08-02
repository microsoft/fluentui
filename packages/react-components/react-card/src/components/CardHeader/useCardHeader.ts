import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardHeaderProps, CardHeaderState } from './CardHeader.types';

/**
 * Create the state required to render CardHeader.
 *
 * The returned state can be modified with hooks such as useCardHeaderStyles_unstable,
 * before being passed to renderCardHeader_unstable.
 *
 * @param props - props from this instance of CardHeader
 * @param ref - reference to root HTMLElement of CardHeader
 */
export const useCardHeader_unstable = (props: CardHeaderProps, ref: React.Ref<HTMLElement>): CardHeaderState => {
  const { image, header, description, action } = props;

  return {
    components: {
      root: 'div',
      image: 'div',
      header: 'span',
      description: 'span',
      action: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    image: resolveShorthand(image),
    header: resolveShorthand(header, {
      required: true,
    }),
    description: resolveShorthand(description),
    action: resolveShorthand(action),
  };
};
