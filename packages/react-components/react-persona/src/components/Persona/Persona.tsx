import * as React from 'react';
import { usePersona_unstable } from './usePersona';
import { renderPersona_unstable } from './renderPersona';
import { usePersonaStyles_unstable } from './usePersonaStyles';
import type { PersonaProps } from './Persona.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Persona component - TODO: add more docs
 */
export const Persona: ForwardRefComponent<PersonaProps> = React.forwardRef((props, ref) => {
  const state = usePersona_unstable(props, ref);

  usePersonaStyles_unstable(state);
  return renderPersona_unstable(state);
});

Persona.displayName = 'Persona';
