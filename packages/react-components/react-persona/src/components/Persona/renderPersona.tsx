import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { PersonaState, PersonaSlots } from './Persona.types';

/**
 * Render the final JSX of Persona
 */
export const renderPersona_unstable = (state: PersonaState) => {
  const { presenceOnly } = state;
  const { slots, slotProps } = getSlots<PersonaSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {!presenceOnly && <slots.avatar {...slotProps.avatar} />}
      {slots.presence && <slots.presence {...slotProps.presence} />}
      {slots.primaryText && <slots.primaryText {...slotProps.primaryText} />}
      {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
      {slots.tertiaryText && <slots.tertiaryText {...slotProps.tertiaryText} />}
      {slots.quaternaryText && <slots.quaternaryText {...slotProps.quaternaryText} />}
    </slots.root>
  );
};
