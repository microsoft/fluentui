import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardPreviewProps, CardPreviewSlots, CardPreviewState } from './CardPreview.types';

/**
 * Array of all shorthand properties listed in CardPreviewShorthandProps
 */
export const cardPreviewShorthandProps: Array<keyof CardPreviewSlots> = ['root', 'logo'];

/**
 * Create the state required to render CardPreview.
 *
 * The returned state can be modified with hooks such as useCardPreviewStyles,
 * before being passed to renderCardPreview.
 *
 * @param props - props from this instance of CardPreview
 * @param ref - reference to root HTMLElement of CardPreview
 */
export const useCardPreview = (props: CardPreviewProps, ref: React.Ref<HTMLElement>): CardPreviewState => {
  const { logo } = props;
  return {
    components: {
      root: 'div',
      logo: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    logo: resolveShorthand(logo),
  };
};
