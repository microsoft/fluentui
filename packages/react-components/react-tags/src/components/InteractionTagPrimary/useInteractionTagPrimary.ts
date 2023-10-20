import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { InteractionTagPrimaryProps, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import { useInteractionTagContext_unstable } from '../../contexts/interactionTagContext';

const avatarSizeMap = {
  medium: 28,
  small: 20,
  'extra-small': 16,
} as const;

const avatarShapeMap = {
  rounded: 'square',
  circular: 'circular',
} as const;

/**
 * Create the state required to render InteractionTagPrimary.
 *
 * The returned state can be modified with hooks such as useInteractionTagPrimaryStyles_unstable,
 * before being passed to renderInteractionTagPrimary_unstable.
 *
 * @param props - props from this instance of InteractionTagPrimary
 * @param ref - reference to root HTMLButtonElement of InteractionTagPrimary
 */
export const useInteractionTagPrimary_unstable = (
  props: InteractionTagPrimaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagPrimaryState => {
  const { appearance, disabled, interactionTagPrimaryId, shape, size } = useInteractionTagContext_unstable();
  const { hasSecondaryAction = false } = props;

  return {
    appearance,
    avatarShape: avatarShapeMap[shape],
    avatarSize: avatarSizeMap[size],
    disabled,
    hasSecondaryAction,
    shape,
    size,

    components: {
      root: 'button',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
    },

    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        disabled,
        id: interactionTagPrimaryId,
        ...props,
      }),
      { elementType: 'button' },
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
  };
};
