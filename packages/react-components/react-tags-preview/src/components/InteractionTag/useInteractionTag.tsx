import * as React from 'react';
import { getNativeElementProps, useEventCallback, useId, slot } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { Delete, Backspace } from '@fluentui/keyboard-keys';
import { useTagGroupContext_unstable } from '../../contexts/TagGroupContext';

const interactionTagAvatarSizeMap = {
  medium: 28,
  small: 20,
  'extra-small': 16,
} as const;

const interactionTagAvatarShapeMap = {
  rounded: 'square',
  circular: 'circular',
} as const;

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

/**
 * Create the state required to render InteractionTag.
 *
 * The returned state can be modified with hooks such as useInteractionTagStyles_unstable,
 * before being passed to renderInteractionTag_unstable.
 *
 * @param props - props from this instance of InteractionTag
 * @param ref - reference to root HTMLElement of InteractionTag
 */
export const useInteractionTag_unstable = (
  props: InteractionTagProps,
  ref: React.Ref<HTMLElement>,
): InteractionTagState => {
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

  const dismissButtonShorthand = slot.optional(props.dismissButton, {
    renderByDefault: dismissible,
    defaultProps: {
      disabled,
      type: 'button',
      children: <DismissIcon />,
    },
    elementType: 'button',
  });
  return {
    appearance,
    avatarShape: interactionTagAvatarShapeMap[shape],
    avatarSize: interactionTagAvatarSizeMap[size],
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

    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
        id,
      }),
      { elementType: 'div' },
    ),

    content: slot.always(props.content, {
      defaultProps: {
        disabled,
        type: 'button',
      },
      elementType: 'button',
    }),
    media: slot.optional(props.media, { elementType: 'span' }),
    icon: slot.optional(props.icon, { elementType: 'span' }),
    primaryText: slot.optional(props.primaryText, { renderByDefault: true, elementType: 'span' }),
    secondaryText: slot.optional(props.secondaryText, { elementType: 'span' }),

    dismissButton: slot.always(
      {
        ...dismissButtonShorthand,
        onClick: onDismissButtonClick,
        onKeyDown: onDismissButtonKeyDown,
      },
      { elementType: 'button' },
    ),
  };
};
