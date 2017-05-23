/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import * as stylesImport from '../PeoplePicker.scss';
const styles: any = stylesImport;

export const SuggestionItemNormal: (persona: IPersonaProps, suggestionProps: any) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps: any) => {
  let { onRemoveItem, onClick, showRemoveButton, showRemoveButtons } = suggestionItemProps;
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraExtraSmall }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
      />
    </div>
  );
};

export const SuggestionItemSmall: (persona: IPersonaProps, suggestionProps: any) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps: any) => {
  let { onRemoveItem, onClick } = suggestionItemProps;
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraExtraSmall }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
      />
    </div>
  );
};