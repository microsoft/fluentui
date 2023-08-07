import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { PrimaryProps, PrimaryState } from './Primary.types';
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
 * Create the state required to render Primary.
 *
 * The returned state can be modified with hooks such as usePrimaryStyles_unstable,
 * before being passed to renderPrimary_unstable.
 *
 * @param props - props from this instance of Primary
 * @param ref - reference to root HTMLElement of Primary
 */
export const usePrimary_unstable = (props: PrimaryProps, ref: React.Ref<HTMLElement>): PrimaryState => {
  const { appearance, disabled, shape, size } = useInteractionTagContext_unstable();
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
      getNativeElementProps('button', {
        ref,
        disabled,
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
