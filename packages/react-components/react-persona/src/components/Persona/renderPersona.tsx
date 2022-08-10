import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { PersonaState, PersonaSlots } from './Persona.types';

/**
 * Render the final JSX of Persona
 */
export const renderPersona_unstable = (state: PersonaState) => {
  const { slots, slotProps } = getSlots<PersonaSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
