import * as React from 'react';
import { getIntrinsicElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TeachingBubbleBodyProps, TeachingBubbleBodyState } from './TeachingBubbleBody.types';
/**
 * Returns the props and state required to render the component
 * @param props - TeachingBubbleBody properties
 * @param ref - reference to root HTMLElement of TeachingBubbleBody
 */
export const useTeachingBubbleBody_unstable = (
  props: TeachingBubbleBodyProps,
  ref: React.Ref<HTMLElement>,
): TeachingBubbleBodyState => {
  const { as, media, mediaLength } = props;

  let mediaShorthand = resolveShorthand(media, {
    required: false,
    defaultProps: {
      alt: '',
      role: 'presentation',
      'aria-hidden': true,
    },
  });

  // Image shouldn't be rendered if its src is not set
  if (!media?.src) {
    mediaShorthand = undefined;
  }

  return {
    components: {
      root: 'div',
      media: 'img',
    },
    root: getIntrinsicElementProps(as || 'div', {
      ref: ref as React.Ref<HTMLDivElement>,
      ...props,
    }),
    media: mediaShorthand,
    mediaLength: mediaLength ?? 'medium',
  };
};
