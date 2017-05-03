/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import { IconButton } from '../../../../Button';
import * as stylesImport from '../PeoplePicker.scss';
const styles: any = stylesImport;

export const SuggestionItemNormal: (persona: IPersonaProps) => JSX.Element = (personaProps: IPersonaProps) => {
  return (
    <div className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.size28 }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
      />
    </div>
  );
};

export const SuggestionItemSmall: (persona: IPersonaProps) => JSX.Element = (personaProps: IPersonaProps) => {
  return (
    <div className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraSmall }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
      />
    </div>
  );
};

export const SuggestionItemRemove: (persona: IPersonaProps) => JSX.Element = (personaProps: IPersonaProps) => {
  return (
    <div className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.size28 }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
      />
      <IconButton
        icon='Cancel'
        title='Remove'
        ariaLabel='Remove' />
    </div>
  );
};