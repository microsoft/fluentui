'use client';

import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { slot } from '@fluentui/react-utilities';
import { PresenceBadge } from '@fluentui/react-badge';
import type { PersonaBaseProps, PersonaBaseState, PersonaProps, PersonaState } from './Persona.types';

/**
 * Create the state required to render Persona.
 *
 * The returned state can be modified with hooks such as usePersonaStyles_unstable,
 * before being passed to renderPersona_unstable.
 *
 * @param props - props from this instance of Persona
 * @param ref - reference to root HTMLElement of Persona
 */
export const usePersona_unstable = (props: PersonaProps, ref: React.Ref<HTMLElement>): PersonaState => {
  const {
    avatar,
    presenceOnly = false,
    size = 'medium',
    textAlignment = 'start',
    textPosition = 'after',
    presence,
    ...baseProps
  } = props;

  const state = usePersonaBase_unstable(baseProps, ref);

  return {
    ...state,
    presenceOnly,
    size,
    textAlignment,
    textPosition,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      avatar: Avatar,
      presence: PresenceBadge,
    },
    avatar: !presenceOnly
      ? slot.optional(avatar, {
          renderByDefault: true,
          defaultProps: {
            name: props.name,
            badge: presence,
            size: avatarSizes[size],
          },
          elementType: Avatar,
        })
      : undefined,
    presence: presenceOnly
      ? slot.optional(presence, {
          defaultProps: {
            size: presenceSizes[size],
          },
          elementType: PresenceBadge,
        })
      : undefined,
  };
};

/**
 * Base hook for Persona component, manages state and structure common to all variants of Persona
 */
export const usePersonaBase_unstable = (props: PersonaBaseProps, ref?: React.Ref<HTMLElement>): PersonaBaseState => {
  const {
    name,
    primaryText: primaryTextProp,
    secondaryText: secondaryTextProp,
    tertiaryText: tertiaryTextProp,
    quaternaryText: quaternaryTextProp,
    ...rest
  } = props;

  const primaryText = slot.optional(primaryTextProp, {
    renderByDefault: true,
    defaultProps: {
      children: name,
    },
    elementType: 'span',
  });
  const secondaryText = slot.optional(secondaryTextProp, { elementType: 'span' });
  const tertiaryText = slot.optional(tertiaryTextProp, { elementType: 'span' });
  const quaternaryText = slot.optional(quaternaryTextProp, { elementType: 'span' });
  const numTextLines = [primaryText, secondaryText, tertiaryText, quaternaryText].filter(Boolean).length;

  return {
    numTextLines,
    components: {
      root: 'div',
      primaryText: 'span',
      secondaryText: 'span',
      tertiaryText: 'span',
      quaternaryText: 'span',
    },
    root: slot.always(
      {
        ref: ref as React.Ref<HTMLDivElement>,
        ...rest,
      },
      { elementType: 'div' },
    ),
    primaryText,
    secondaryText,
    tertiaryText,
    quaternaryText,
  };
};

const presenceSizes = {
  'extra-small': 'tiny',
  small: 'extra-small',
  medium: 'small',
  large: 'medium',
  'extra-large': 'large',
  huge: 'large',
} as const;

const avatarSizes = {
  'extra-small': 20,
  small: 28,
  medium: 32,
  large: 36,
  'extra-large': 40,
  huge: 56,
} as const;
