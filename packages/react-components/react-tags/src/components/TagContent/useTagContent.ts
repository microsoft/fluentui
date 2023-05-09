import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TagContentProps, TagContentState } from './TagContent.types';
import { useTagContext_unstable } from '../Tag/index';

const tagContentAvatarSizeMap = {
  medium: 28,
  small: 24,
  'extra-small': 20,
} as const;

const tagContentAvatarShapeMap = {
  rounded: 'square',
  circular: 'circular',
} as const;

/**
 * Create the state required to render TagContent.
 *
 * The returned state can be modified with hooks such as useTagContentStyles_unstable,
 * before being passed to renderTagContent_unstable.
 *
 * @param props - props from this instance of TagContent
 * @param ref - reference to root HTMLElement of TagContent
 */
export const useTagContent_unstable = (props: TagContentProps, ref: React.Ref<HTMLElement>): TagContentState => {
  const { dismissible, shape, size, interactive } = useTagContext_unstable();

  return {
    components: {
      root: interactive ? 'button' : 'div',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
    },

    avatarShape: tagContentAvatarShapeMap[shape],
    avatarSize: tagContentAvatarSizeMap[size],
    dismissible,
    interactive,
    shape,

    media: resolveShorthand(props.media),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, { required: true, defaultProps: { children: props.children } }),
    secondaryText: resolveShorthand(props.secondaryText),
    root: getNativeElementProps(interactive ? 'button' : 'div', {
      ref,
      ...(interactive && { type: 'button' }),
      ...props,
    }),
  };
};
