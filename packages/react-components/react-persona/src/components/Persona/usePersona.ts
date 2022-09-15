import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { resolveShorthand } from '@fluentui/react-utilities';
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
  const {
    className,
    presenceOnly = false,
    sizing = 'fixed',
    style,
    textPosition = 'after',
    ...avatarSlotProps
  } = props;
  const numTextLines =
    (props.primaryText ? 1 : 0) +
    (props.secondaryText ? 1 : 0) +
    (props.tertiaryText ? 1 : 0) +
    (props.quaternaryText ? 1 : 0);

  let avatarSize = avatarSlotProps.size;
  if (sizing === 'scaled') {
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

  const state: PersonaState = {
    numTextLines,
    presenceOnly,
    sizing,
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

    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        style,
        className,
      },
    }),
    avatar: resolveShorthand(props.avatar, {
      required: true,
      defaultProps: {
        ref,
        size: avatarSize,
        ...avatarSlotProps,
      },
    }),
    presence: resolveShorthand(props.presence, {
      required: false,
    }),
    primaryText: resolveShorthand(props.primaryText, {
      required: false,
    }),
    secondaryText: resolveShorthand(props.secondaryText, {
      required: false,
    }),
    tertiaryText: resolveShorthand(props.tertiaryText, {
      required: false,
    }),
    quaternaryText: resolveShorthand(props.quaternaryText, {
      required: false,
    }),
  };

  if (!presenceOnly && state.avatar && state.presence) {
    state.avatar.badge = state.presence;
    state.presence = undefined;
  } else if (state.presence) {
    if (sizing === 'scaled') {
      if (numTextLines === 1) {
        state.presence.size = 'small';
      } else if (numTextLines === 2) {
        state.presence.size = 'large';
      } else {
        state.presence.size = 'extra-large';
      }
    }
  }

  return state;
};
