import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { TagProps, TagState } from './Tag.types';
import { useARIAButtonShorthand } from '@fluentui/react-aria';

const tagAvatarSizeMap = {
  medium: 28,
  small: 24,
  'extra-small': 20,
} as const;

const tagAvatarShapeMap = {
  rounded: 'square',
  circular: 'circular',
} as const;

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

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
    appearance = 'filled-lighter',
    disabled = false,
    dismissible = false,
    interactive = false,
    shape = 'rounded',
    size = 'medium',
  } = props;

  const contentButton = useARIAButtonShorthand(props.content, {
    required: true,
    defaultProps: {
      disabled,
      type: 'button',
    },
  });

  return {
    appearance,
    avatarShape: tagAvatarShapeMap[shape],
    avatarSize: tagAvatarSizeMap[size],
    disabled,
    dismissible,
    interactive,
    shape,
    size,

    components: {
      root: 'div',
      content: interactive ? 'button' : 'div',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissButton: 'button',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),

    content: interactive ? contentButton : resolveShorthand(props.content, { required: true }),
    media: resolveShorthand(props.media),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, { required: true, defaultProps: { children: props.children } }),
    secondaryText: resolveShorthand(props.secondaryText),
    dismissButton: useARIAButtonShorthand(props.dismissButton, {
      required: props.dismissible,
      defaultProps: {
        disabled,
        type: 'button',
        children: <DismissIcon />,
      },
    }),
  };
};
