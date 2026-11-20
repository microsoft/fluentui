'use client';

import type * as React from 'react';
import { mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import type {
  InteractionTagPrimaryBaseProps,
  InteractionTagPrimaryBaseState,
  InteractionTagPrimaryProps,
  InteractionTagPrimaryState,
} from './InteractionTagPrimary.types';
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
 * Create the base state required to render InteractionTagPrimary, without design-only props.
 *
 * @param props - props from this instance of InteractionTagPrimary
 * @param ref - reference to root HTMLButtonElement of InteractionTagPrimary
 */
export const useInteractionTagPrimaryBase_unstable = (
  props: InteractionTagPrimaryBaseProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagPrimaryBaseState => {
  const {
    disabled,
    handleTagSelect,
    interactionTagPrimaryId,
    selected: contextSelected,
    selectedValues,
    value,
  } = useInteractionTagContext_unstable();
  const { hasSecondaryAction = false, media, icon, primaryText, secondaryText, ...rest } = props;

  const onClick = useEventCallback(
    mergeCallbacks(props?.onClick, (event: React.MouseEvent<HTMLButtonElement>) =>
      handleTagSelect?.(event, { type: 'click', event, value, selectedValues }),
    ),
  );

  return {
    disabled,
    hasSecondaryAction,
    selected: contextSelected,

    components: {
      root: 'button',
      media: 'span',
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
    },

    root: slot.always(
      {
        ref,
        disabled,
        id: interactionTagPrimaryId,
        ...(handleTagSelect !== undefined && { 'aria-pressed': contextSelected }),
        onClick,
        ...rest,
      },
      { elementType: 'button' },
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
  };
};

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
  const { appearance, shape, size } = useInteractionTagContext_unstable();

  return {
    ...useInteractionTagPrimaryBase_unstable(props, ref),
    appearance,
    avatarShape: avatarShapeMap[shape],
    avatarSize: avatarSizeMap[size],
    shape,
    size,
  };
};
