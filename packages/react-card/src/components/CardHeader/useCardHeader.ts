import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardHeaderProps, CardHeaderSlots, CardHeaderState } from './CardHeader.types';

export const cardHeaderShorthandProps: Array<keyof CardHeaderSlots> = [
  'root',
  'image',
  'content',
  'header',
  'description',
  'action',
];

/**
 * Create the state required to render CardHeader.
 *
 * The returned state can be modified with hooks such as useCardHeaderStyles,
 * before being passed to renderCardHeader.
 *
 * @param props - props from this instance of CardHeader
 * @param ref - reference to root HTMLElement of CardHeader
 */
export const useCardHeader = (props: CardHeaderProps, ref: React.Ref<HTMLElement>): CardHeaderState => {
  const { image, content, header, description, action } = props;

  return {
    components: {
      root: 'div',
      image: 'div',
      content: 'div',
      header: React.Fragment,
      description: React.Fragment,
      action: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    image: resolveShorthand(image, {
      required: true,
    }),
    content: resolveShorthand(content || {}),
    header: resolveShorthand(header, {
      required: true,
    }),
    description: resolveShorthand(description, {
      required: true,
    }),
    action: resolveShorthand(action),
  };
};
