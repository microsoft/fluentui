import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
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
  const { position = 'start', sizing = 'fixed' } = props;
  const numTextLines =
    (props.primaryText ? 1 : 0) +
    (props.secondaryText ? 1 : 0) +
    (props.tertiaryText ? 1 : 0) +
    (props.quaternaryText ? 1 : 0);

  const state: PersonaState = {
    numTextLines,
    position,
    sizing,

    components: {
      root: 'div',
      avatar: Avatar,
      presence: PresenceBadge,
      primaryText: 'span',
      secondaryText: 'span',
      tertiaryText: 'span',
      quaternaryText: 'span',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    avatar: resolveShorthand(props.avatar, {
      required: false,
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

  if (state.avatar && state.presence) {
    state.avatar.badge = state.presence;
    state.presence = undefined;
  }

  if (sizing === 'scaled') {
    if (state.avatar) {
      if (numTextLines === 1) {
        state.avatar.size = 16;
      } else if (numTextLines === 2) {
        state.avatar.size = 32;
      } else if (numTextLines === 3) {
        state.avatar.size = 56;
      } else {
        state.avatar.size = 72;
      }
    } else if (state.presence) {
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
