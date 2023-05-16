import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { TagButtonProps, TagButtonState } from './TagButton.types';
import { useARIAButtonShorthand } from '@fluentui/react-aria';

const tagButtonAvatarSizeMap = {
  medium: 28,
  small: 24,
  'extra-small': 20,
} as const;

const tagButtonAvatarShapeMap = {
  rounded: 'square',
  circular: 'circular',
} as const;

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

/**
 * Create the state required to render TagButton.
 *
 * The returned state can be modified with hooks such as useTagButtonStyles_unstable,
 * before being passed to renderTagButton_unstable.
 *
 * @param props - props from this instance of TagButton
 * @param ref - reference to root HTMLElement of TagButton
 */
export const useTagButton_unstable = (props: TagButtonProps, ref: React.Ref<HTMLElement>): TagButtonState => {
  const {
    appearance = 'filled-lighter',
    disabled = false,
    dismissible = false,
    shape = 'rounded',
    size = 'medium',
  } = props;

  return {
    appearance,
    avatarShape: tagButtonAvatarShapeMap[shape],
    avatarSize: tagButtonAvatarSizeMap[size],
    disabled,
    dismissible,
    shape,
    size,

    components: {
      root: 'div',
      content: 'div',
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

    content: useARIAButtonShorthand(props.content, {
      required: true,
      defaultProps: {
        disabled,
        tabIndex: 0,
        type: 'button',
      },
    }),
    media: resolveShorthand(props.media),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, { required: true }),
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
