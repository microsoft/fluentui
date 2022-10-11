import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { PresenceBadge } from '@fluentui/react-badge';
import type { AvatarProps } from '@fluentui/react-avatar';
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
  const { presenceOnly = false, textPosition = 'after', name } = props;

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

  let fixed = false;
  if (!presenceOnly && props.avatar) {
    fixed = !!(props.avatar as AvatarProps).size;
  } else if (props.presence && props.presence) {
    fixed = !!(props.presence as PresenceBadgeProps).size;
  }

  let avatarSize: AvatarProps['size'] = undefined;
  let presenceSize: PresenceBadgeProps['size'] = undefined;
  if (presenceOnly && !fixed) {
    if (numTextLines === 1) {
      presenceSize = 'small';
    } else if (numTextLines === 2) {
      presenceSize = 'large';
    } else {
      presenceSize = 'extra-large';
    }
  } else if (!fixed) {
    if (numTextLines === 1) {
      avatarSize = 16;
    } else if (numTextLines === 2) {
      avatarSize = 32;
    } else if (numTextLines === 3) {
      avatarSize = 56;
    } else {
      avatarSize = 72;
    }
  }

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
    fixed,
    numTextLines,
    presenceOnly,
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
