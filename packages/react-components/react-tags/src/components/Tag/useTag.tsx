import * as React from 'react';
import { getIntrinsicElementProps, useEventCallback, useId, slot } from '@fluentui/react-utilities';
import { DismissRegular } from '@fluentui/react-icons';
import type { TagProps, TagState } from './Tag.types';
import { Delete, Backspace } from '@fluentui/keyboard-keys';
import { useTagGroupContext_unstable } from '../../contexts/tagGroupContext';

const tagAvatarSizeMap = {
  medium: 28,
  small: 20,
  'extra-small': 16,
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
 * @param ref - reference to root HTMLSpanElement or HTMLButtonElement of Tag
 */
export const useTag_unstable = (props: TagProps, ref: React.Ref<HTMLSpanElement | HTMLButtonElement>): TagState => {
  const {
    handleTagDismiss,
    size: contextSize,
    appearance: contextAppearance,
    dismissible: contextDismissible,
    role: tagGroupRole,
  } = useTagGroupContext_unstable();

  const id = useId('fui-Tag', props.id);

  const {
    appearance = contextAppearance ?? 'filled',
    disabled = false,
    dismissible = contextDismissible ?? false,
    shape = 'rounded',
    size = contextSize,
    value = id,
  } = props;

  const dismissOnClick = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(ev);
    if (!ev.defaultPrevented) {
      handleTagDismiss?.(ev, { value });
    }
  });

  const dismissOnKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLButtonElement>) => {
    props?.onKeyDown?.(ev);
    if (!ev.defaultPrevented && (ev.key === Delete || ev.key === Backspace)) {
      handleTagDismiss?.(ev, { value });
    }
  });

  const elementType = dismissible ? 'button' : 'span';

  return {
    appearance,
    avatarShape: tagAvatarShapeMap[shape],
    avatarSize: tagAvatarSizeMap[size],
    disabled,
    dismissible,
    shape,
    size,

    components: {
      root: elementType,
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissIcon: 'span',
    },

    root: slot.always(
      getIntrinsicElementProps(elementType, {
        ref,
        role: tagGroupRole === 'listbox' ? 'option' : undefined,
        ...props,
        id,
        ...(dismissible && { onClick: dismissOnClick, onKeyDown: dismissOnKeyDown }),
      }),
      { elementType },
    ),

    media: slot.optional(props.media, { elementType: 'span' }),
    icon: slot.optional(props.icon, { elementType: 'span' }),
    primaryText: slot.optional(props.primaryText, {
      renderByDefault: true,
      defaultProps: {
        children: props.children,
      },
      elementType: 'span',
    }),
    secondaryText: slot.optional(props.secondaryText, { elementType: 'span' }),
    dismissIcon: slot.optional(props.dismissIcon, {
      renderByDefault: dismissible,
      defaultProps: {
        children: <DismissRegular />,
        role: 'img',
      },
      elementType: 'span',
    }),
  };
};
