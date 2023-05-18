import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { TagProps, TagState } from './Tag.types';
import { useTagGroupContext_unstable } from '../../contexts/TagGroupContext';

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
  const { size: contextSize } = useTagGroupContext_unstable();

  const {
    appearance = 'filled-lighter',
    disabled = false,
    dismissible = false,
    shape = 'rounded',
    size = contextSize,
  } = props;

  return {
    appearance,
    avatarShape: tagAvatarShapeMap[shape],
    avatarSize: tagAvatarSizeMap[size],
    disabled,
    dismissible,
    shape,
    size,

    components: {
      root: 'button',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissIcon: 'span',
    },

    root: getNativeElementProps('button', {
      ref,
      ...props,
    }),

    media: resolveShorthand(props.media),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, {
      required: true,
      defaultProps: {
        children: props.children,
      },
    }),
    secondaryText: resolveShorthand(props.secondaryText),
    dismissIcon: resolveShorthand(props.dismissIcon, {
      required: props.dismissible,
      defaultProps: {
        children: <DismissIcon />,
      },
    }),
  };
};
