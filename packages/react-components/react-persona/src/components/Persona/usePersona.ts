import * as React from 'react';
import { Avatar, AvatarSizes } from '@fluentui/react-avatar';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { PresenceBadge } from '@fluentui/react-badge';
import type { PersonaProps, PersonaState } from './Persona.types';
import type { PresenceBadgeProps } from '@fluentui/react-badge';

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

  const primaryText = resolveShorthand(props.primaryText, {
    required: true,
    defaultProps: {
      children: name,
    },
  });
  const secondaryText = resolveShorthand(props.secondaryText);
  const tertiaryText = resolveShorthand(props.tertiaryText);
  const quaternaryText = resolveShorthand(props.quaternaryText);

  const numTextLines = [primaryText, secondaryText, tertiaryText, quaternaryText].filter(Boolean).length;

  const presenceSize: PresenceBadgeProps['size'] = presenceSizes[size];
  const avatarSize: AvatarSizes = avatarSizes[size];

  const avatar: PersonaState['avatar'] = !presenceOnly
    ? resolveShorthand(props.avatar, {
        required: true,
        defaultProps: {
          name,
          badge: props.presence,
          size: avatarSize,
        },
      })
    : undefined;

  const presence: PersonaState['presence'] = presenceOnly
    ? resolveShorthand(props.presence, {
        defaultProps: {
          size: presenceSize,
        },
      })
    : undefined;

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

    root: getNativeElementProps(
      'div',
      {
        ...props,
        ref,
      },
      /* excludedPropNames */ ['name'],
    ),
    avatar,
    presence,
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
  '2-extra-large': 'extra-large',
} as const;

const avatarSizes = {
  'extra-small': 20,
  small: 28,
  medium: 32,
  large: 36,
  'extra-large': 40,
  '2-extra-large': 56,
} as const;
