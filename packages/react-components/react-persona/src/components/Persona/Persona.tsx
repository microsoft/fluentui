import * as React from 'react';
import { usePersona_unstable } from './usePersona';
import { renderPersona_unstable } from './renderPersona';
import { usePersonaStyles_unstable } from './usePersonaStyles';
import type { PersonaProps } from './Persona.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Persona is a visual representation of a person or status that showcases an Avatar, PresenceBadge,
 * or an Avatar with a PresenceBadge.
 */
export const Persona: ForwardRefComponent<PersonaProps> = React.forwardRef((props, ref) => {
  const state = usePersona_unstable(props, ref);

  usePersonaStyles_unstable(state);
  return renderPersona_unstable(state);
});

Persona.displayName = 'Persona';
