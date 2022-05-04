import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardPreviewProps, CardPreviewState } from './CardPreview.types';

/**
 * Create the state required to render CardPreview.
 *
 * The returned state can be modified with hooks such as useCardPreviewStyles_unstable,
 * before being passed to renderCardPreview_unstable.
 *
 * @param props - props from this instance of CardPreview
 * @param ref - reference to root HTMLElement of CardPreview
 */
export const useCardPreview_unstable = (props: CardPreviewProps, ref: React.Ref<HTMLElement>): CardPreviewState => {
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
