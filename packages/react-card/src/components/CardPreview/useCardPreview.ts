import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { CardPreviewProps, CardPreviewState, CardPreviewRender } from './CardPreview.types';
import { renderCardPreview_unstable } from './renderCardPreview';

/**
 * Create the state required to render CardPreview.
 *
 * The returned state can be modified with hooks such as useCardPreviewStyles_unstable,
 * before being passed to renderCardPreview_unstable.
 *
 * @param props - props from this instance of CardPreview
 * @param ref - reference to root HTMLElement of CardPreview
 */
export const useCardPreview_unstable = (
  props: CardPreviewProps,
  ref: React.Ref<HTMLElement>,
): [CardPreviewState, CardPreviewRender] => {
  const { logo } = props;
  const state: CardPreviewState = {
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

  return [state, renderCardPreview_unstable];
};
