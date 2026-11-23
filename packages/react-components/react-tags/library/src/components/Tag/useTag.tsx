'use client';

import * as React from 'react';
import { useEventCallback, useId, slot } from '@fluentui/react-utilities';
import { DismissRegular } from '@fluentui/react-icons';
import type { TagBaseProps, TagBaseState, TagProps, TagState } from './Tag.types';
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
 * Create the base state required to render Tag, without design-only props.
 *
 * @param props - props from this instance of Tag (without appearance, size, shape)
 * @param ref - reference to root HTMLSpanElement or HTMLButtonElement of Tag
 */
export const useTagBase_unstable = (
  props: TagBaseProps,
  ref: React.Ref<HTMLSpanElement | HTMLButtonElement>,
): TagBaseState => {
  const {
    handleTagDismiss,
    disabled: contextDisabled,
    dismissible: contextDismissible,
    role: tagGroupRole,
  } = useTagGroupContext_unstable();

  const id = useId('fui-Tag', props.id);

  const {
    disabled = false,
    dismissible = contextDismissible ?? false,
    selected,
    value = id,
    media,
    icon,
    primaryText,
    secondaryText,
    dismissIcon,
    ...rest
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

  const defaultElementType = dismissible ? 'button' : 'span';
  const elementType = rest.as ?? defaultElementType;
  const selectedProp = tagGroupRole === 'listbox' ? 'aria-selected' : 'aria-pressed';
  const selectable = typeof selected === 'boolean' || tagGroupRole === 'listbox';

  return {
    disabled: contextDisabled ? true : disabled,
    dismissible,
    selected: !!selected,

    components: {
      root: elementType,
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissIcon: 'span',
    },

    root: slot.always(
      {
        ref: ref as React.Ref<HTMLButtonElement & HTMLSpanElement>,
        role: tagGroupRole === 'listbox' ? 'option' : undefined,
        [selectedProp]: selectable ? selected : undefined,
        ...rest,
        // `disabled` is only a valid attribute when the root renders as a button
        disabled: elementType === 'button' ? (contextDisabled ? true : disabled) : undefined,
        id,
        ...(dismissible && { onClick: dismissOnClick, onKeyDown: dismissOnKeyDown }),
      },
      {
        defaultProps: {
          type: elementType === 'button' ? 'button' : undefined,
        },
        elementType,
      },
    ),

    media: slot.optional(media, { elementType: 'span' }),
    icon: slot.optional(icon, { elementType: 'span' }),
    primaryText: slot.optional(primaryText, {
      renderByDefault: true,
      defaultProps: {
        children: props.children,
      },
      elementType: 'span',
    }),
    secondaryText: slot.optional(secondaryText, { elementType: 'span' }),
    dismissIcon: slot.optional(dismissIcon, {
      renderByDefault: dismissible,
      elementType: 'span',
    }),
  };
};

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
  const { size: contextSize, appearance: contextAppearance } = useTagGroupContext_unstable();

  const { appearance = contextAppearance ?? 'filled', shape = 'rounded', size = contextSize, ...baseProps } = props;

  const baseState = useTagBase_unstable(baseProps, ref);

  if (baseState.dismissIcon) {
    baseState.dismissIcon.children ??= <DismissRegular />;
  }

  return {
    ...baseState,
    appearance,
    avatarShape: tagAvatarShapeMap[shape],
    avatarSize: tagAvatarSizeMap[size],
    shape,
    size,
  };
};
