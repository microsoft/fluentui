import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import { PresenceBadge } from '@fluentui/react-badge';
import type { PersonaProps, PersonaState } from './Persona.types';

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
  const { name, presenceOnly = false, size = 'medium', textAlignment = 'start', textPosition = 'after' } = props;

  const primaryText = slot(props.primaryText, {
    required: true,
    defaultProps: {
      children: name,
    },
    elementType: 'span',
  });
  const secondaryText = slot(props.secondaryText, { elementType: 'span' });
  const tertiaryText = slot(props.tertiaryText, { elementType: 'span' });
  const quaternaryText = slot(props.quaternaryText, { elementType: 'span' });
  const numTextLines = [primaryText, secondaryText, tertiaryText, quaternaryText].filter(Boolean).length;
  return {
    numTextLines,
    presenceOnly,
    size,
    textAlignment,
    textPosition,
    components: {
      root: 'div',
      avatar: Avatar,
      presence: PresenceBadge,
      primaryText: 'span',
      secondaryText: 'span',
      tertiaryText: 'span',
      quaternaryText: 'span',
    },

    root: slot(
      getNativeElementProps(
        'div',
        {
          ...props,
          ref,
        },
        /* excludedPropNames */ ['name'],
      ),
      { required: true, elementType: 'div' },
    ),
    avatar: !presenceOnly
      ? slot(props.avatar, {
          required: true,
          defaultProps: {
            name,
            badge: props.presence,
            size: avatarSizes[size],
          },
          elementType: Avatar,
        })
      : undefined,
    presence: presenceOnly
      ? slot(props.presence, {
          defaultProps: {
            size: presenceSizes[size],
          },
          elementType: PresenceBadge,
        })
      : undefined,
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
