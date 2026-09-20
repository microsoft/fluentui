'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PersonaProps } from './Persona.types';
import { renderPersona } from './renderPersona';
import { usePersona } from './usePersona';
import { usePersonaStyles } from './usePersonaStyles.styles';

/**
 * A Persona represents a person or entity with an avatar and text.
 */
export const Persona: ForwardRefComponent<PersonaProps> = React.forwardRef((props, ref) => {
  const state = usePersona(props, ref);
  usePersonaStyles(state);
  return renderPersona(state);
});

Persona.displayName = 'Persona';
