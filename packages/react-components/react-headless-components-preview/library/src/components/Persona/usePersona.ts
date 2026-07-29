'use client';

import type * as React from 'react';
import { usePersonaBase_unstable } from '@fluentui/react-persona';
import { slot } from '@fluentui/react-utilities';
import type { PersonaProps, PersonaState } from './Persona.types';
import { Avatar } from '../Avatar';

/**
 * Create the state required to render Persona.
 *
 * The returned state can be modified with hooks such as usePersonaStyles_unstable,
 * before being passed to renderPersona_unstable.
 *
 * @param props - props from this instance of Persona
 * @param ref - reference to root HTMLDivElement of Persona
 */
export const usePersona = (props: PersonaProps, ref: React.Ref<HTMLDivElement>): PersonaState => {
  const { textPosition = 'after', ...baseProps } = props;
  const baseState = usePersonaBase_unstable(baseProps, ref);

  return {
    ...baseState,
    textPosition,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      avatar: Avatar,
    },
    avatar: slot.optional(props.avatar, {
      renderByDefault: true,
      defaultProps: {
        name: props.name,
      },
      elementType: Avatar,
    }),
  };
};
