import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { DismissRegular } from '@fluentui/react-icons';
import type { TagProps, TagState } from './Tag.types';
import { Button } from '@fluentui/react-button';

// TODO verify map
const tagAvatarSizeMap = {
  medium: 28,
  small: 24,
  'extra-small': 20,
} as const;

const tagAvatarShapeMap = {
  rounded: 'square',
  circular: 'circular',
} as const;

/**
 * Create the state required to render Tag.
 *
 * The returned state can be modified with hooks such as useTagStyles_unstable,
 * before being passed to renderTag_unstable.
 *
 * @param props - props from this instance of Tag
 * @param ref - reference to root HTMLElement of Tag
 */
export const useTag_unstable = (props: TagProps, ref: React.Ref<HTMLElement>): TagState => {
  const {
    checked = false,
    disabled = false,
    dismissable = false,
    shape = 'rounded',
    size = 'medium',
    appearance = 'filled-lighter',
  } = props;

  return {
    components: {
      root: 'div',
      content: 'div',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissButton: Button,
    },
    checked,
    disabled,
    dismissable,
    shape,
    size,
    appearance,
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    avatarSize: tagAvatarSizeMap[size],
    avatarShape: tagAvatarShapeMap[shape],
    media: resolveShorthand(props.media),

    content: resolveShorthand(props.content, { required: !!props.primaryText || !!props.children }),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, { required: true }),
    secondaryText: resolveShorthand(props.secondaryText),

    dismissButton: resolveShorthand(props.dismissButton, {
      required: props.dismissable,
      defaultProps: {
        disabled,
        appearance: 'transparent',
        type: 'button',
        icon: <DismissRegular />,
      },
    }),
  };
};
