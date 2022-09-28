import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { PersonaState, PersonaSlots } from './Persona.types';

/**
 * Render the final JSX of Persona
 */
export const renderPersona_unstable = (state: PersonaState) => {
  const { presenceOnly, textPosition } = state;
  const { slots, slotProps } = getSlots<PersonaSlots>(state);

  const coin = presenceOnly
    ? slots.presence && <slots.presence {...slotProps.presence} />
    : slots.avatar && <slots.avatar {...slotProps.avatar} />;

  return (
    <slots.root {...slotProps.root}>
      {(textPosition === 'after' || textPosition === 'below') && coin}
      {slots.primaryText && <slots.primaryText {...slotProps.primaryText} />}
      {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
      {slots.tertiaryText && <slots.tertiaryText {...slotProps.tertiaryText} />}
      {slots.quaternaryText && <slots.quaternaryText {...slotProps.quaternaryText} />}
      {textPosition === 'before' && coin}
    </slots.root>
  );
};
