/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { IBasePickerSuggestionsProps, ISuggestionItemProps } from 'office-ui-fabric-react/lib/Pickers';
import * as stylesImport from '../PeoplePicker.scss';

export const SuggestionItemNormal: (persona: IPersonaProps, suggestionProps?: IBasePickerSuggestionsProps) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
  return (
    <div className={ css('ms-PeoplePicker-personaContent', stylesImport.peoplePickerPersonaContent) }>
      <Persona
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraExtraSmall }
        className={ css('ms-PeoplePicker-Persona', stylesImport.peoplePickerPersona) }
        showSecondaryText={ true }
        { ...personaProps }
      />
    </div>
  );
};