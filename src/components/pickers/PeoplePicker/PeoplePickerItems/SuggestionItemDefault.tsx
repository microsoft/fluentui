import * as React from 'react';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../Persona';
export const SuggestionItemDefault: (persona: IPersonaProps) => JSX.Element = (personaProps: IPersonaProps) => {
  return (
    <div className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence ? personaProps.presence : PersonaPresence.online }
        size={ PersonaSize.small }
        />
    </div>
  );
};