import * as React from 'react';
import { renderPersona_unstable } from './renderPersona';
import { usePersona_unstable } from './usePersona';
import { usePersonaStyles_unstable } from './usePersonaStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PersonaProps } from './Persona.types';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * A Persona is a visual representation of a person or status that showcases an Avatar, PresenceBadge,
 * or an Avatar with a PresenceBadge.
 */
export const Persona: ForwardRefComponent<PersonaProps> = React.forwardRef((props, ref) => {
  const state = usePersona_unstable(props, ref);

  usePersonaStyles_unstable(state);

  const { usePersonaStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderPersona_unstable(state);
});

Persona.displayName = 'Persona';
