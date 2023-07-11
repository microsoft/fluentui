import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback, useId } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { TagProps, TagState } from './Tag.types';
import { Delete, Backspace } from '@fluentui/keyboard-keys';
import { useTagGroupContext_unstable } from '../../contexts/TagGroupContext';

const tagAvatarSizeMap = {
  medium: 28,
  small: 20,
  'extra-small': 16,
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
  const { dismissible: contextDismissible, handleTagDismiss, size: contextSize } = useTagGroupContext_unstable();

  const id = useId('fui-Tag', props.id);

  const {
    appearance = 'filled',
    disabled = false,
    dismissible = contextDismissible,
    shape = 'rounded',
    size = contextSize,
    value = id,
  } = props;

  const handleClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(ev);
    if (!ev.defaultPrevented) {
      handleTagDismiss?.(ev, value);
    }
  });

  const handleKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLButtonElement>) => {
    props?.onKeyDown?.(ev);
    if (!ev.defaultPrevented && (ev.key === Delete || ev.key === Backspace)) {
      handleTagDismiss?.(ev, value);
    }
  });

  return {
    appearance,
    avatarShape: tagAvatarShapeMap[shape],
    avatarSize: tagAvatarSizeMap[size],
    disabled,
    dismissible,
    shape,
    size,

    components: {
      root: dismissible ? 'button' : 'span',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissIcon: 'span',
    },

    root: getNativeElementProps('button', {
      ref,
      ...props,
      id,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
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
      required: dismissible,
      defaultProps: {
        children: <DismissIcon />,
      },
    }),
  };
};
