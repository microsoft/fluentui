'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { usePersona } from './usePersona';
import { renderPersona } from './renderPersona';
import type { PersonaProps } from './Persona.types';

/**
 * Represents a person or with an avatar, primary text, and optional secondary text.
 */
export const Persona: ForwardRefComponent<PersonaProps> = React.forwardRef((props, ref) => {
  const state = usePersona(props, ref);

  return renderPersona(state);
});

Persona.displayName = 'Persona';
