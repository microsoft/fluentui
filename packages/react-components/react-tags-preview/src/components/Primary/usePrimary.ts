import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { PrimaryProps, PrimaryState } from './Primary.types';
import { useInteractionTagContext_unstable } from '../../contexts/InteractionTagContext';

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
 * TODO comments
 * Create the state required to render Primary.
 *
 * The returned state can be modified with hooks such as usePrimaryStyles_unstable,
 * before being passed to renderPrimary_unstable.
 *
 * @param props - props from this instance of Primary
 * @param ref - reference to root HTMLElement of Primary
 */
export const usePrimary_unstable = (props: PrimaryProps, ref: React.Ref<HTMLElement>): PrimaryState => {
  const { appearance, disabled, hasSecondary, shape, size } = useInteractionTagContext_unstable();

  return {
    appearance,
    avatarShape: avatarShapeMap[shape],
    avatarSize: avatarSizeMap[size],
    disabled,
    hasSecondary,
    shape,
    size,

    components: {
      root: 'button',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
    },

    root: getNativeElementProps('div', {
      ref,
      disabled,
      ...props,
    }),

    media: resolveShorthand(props.media),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText, { required: true }),
    secondaryText: resolveShorthand(props.secondaryText),
  };
};
