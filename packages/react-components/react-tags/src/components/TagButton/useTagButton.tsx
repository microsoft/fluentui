import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback, useId } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { TagButtonProps, TagButtonState } from './TagButton.types';
import { Delete, Backspace } from '@fluentui/keyboard-keys';
import { useTagGroupContext_unstable } from '../../contexts/TagGroupContext';

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
  const { dismissible: contextDismissible, handleTagDismiss, size: contextSize } = useTagGroupContext_unstable();

  const id = useId('fui-Tag', props.id);

  const {
    appearance = 'filled-lighter',
    disabled = false,
    dismissible = contextDismissible,
    shape = 'rounded',
    size = contextSize,
    value = id,
  } = props;

  const onDismissButtonClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(ev);
    if (!ev.defaultPrevented) {
      handleTagDismiss?.(ev, value);
    }
  });

  const onDismissButtonKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLButtonElement>) => {
    props?.onKeyDown?.(ev);
    if (!ev.defaultPrevented && (ev.key === Delete || ev.key === Backspace)) {
      handleTagDismiss?.(ev, value);
    }
  });

  const dismissButtonShorthand = resolveShorthand(props.dismissButton, {
    required: dismissible,
    defaultProps: {
      disabled,
      type: 'button',
      children: <DismissIcon />,
    },
  });

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
      content: 'button',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissButton: 'button',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
      id,
    }),

    content: resolveShorthand(props.content, {
      required: true,
      defaultProps: {
        disabled,
        type: 'button',
      },
    }),
    media: resolveShorthand(props.media),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, { required: true }),
    secondaryText: resolveShorthand(props.secondaryText),

    dismissButton: {
      ...dismissButtonShorthand,
      onClick: onDismissButtonClick,
      onKeyDown: onDismissButtonKeyDown,
    },
  };
};
