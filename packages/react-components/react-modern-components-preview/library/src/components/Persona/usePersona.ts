'use client';

import type * as React from 'react';
import { usePersona as usePersonaBase } from '@fluentui/react-headless-components-preview/persona';
import { slot } from '@fluentui/react-utilities';
import { Avatar } from '../Avatar';
import type { PersonaProps, PersonaState } from './Persona.types';

const avatarSizes = {
  'extra-small': 20,
  small: 28,
  medium: 32,
  large: 36,
  'extra-large': 40,
  huge: 56,
} as const;

/**
 * Create the state required to render Persona.
 */
export const usePersona = (props: PersonaProps, ref: React.Ref<HTMLDivElement>): PersonaState => {
  const { size = 'medium', textAlignment = 'start', ...rest } = props;
  const baseState = usePersonaBase(rest, ref);
  const avatar = slot.optional(props.avatar, {
    renderByDefault: true,
    defaultProps: {
      name: props.name,
      size: avatarSizes[size],
    },
    elementType: Avatar,
  });

  return {
    ...baseState,
    avatar,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      avatar: Avatar,
    },
    root: {
      ...baseState.root,
      'data-size': size,
      'data-text-alignment': textAlignment,
    },
    size,
    textAlignment,
  };
};
