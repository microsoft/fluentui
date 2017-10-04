/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import { IBasePickerSuggestionsProps, ISuggestionItemProps } from 'office-ui-fabric-react/lib/Pickers';
import * as stylesImport from '../PeoplePicker.scss';
const styles: any = stylesImport;

export const SuggestionItemNormal: (persona: IPersonaProps, suggestionProps?: IBasePickerSuggestionsProps) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <Persona
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraExtraSmall }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
        showSecondaryText={ true }
        { ...personaProps }
      />
    </div>
  );
};

export const SuggestionItemSmall: (persona: IPersonaProps, suggestionProps?: IBasePickerSuggestionsProps) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <Persona
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraExtraSmall }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
        { ...personaProps }
      />
    </div>
  );
};