/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import { IBasePickerSuggestionsProps, ISuggestionItemProps } from 'office-ui-fabric-react/lib/Pickers';
import stylesImport from '../PeoplePicker.scss';
const styles: any = stylesImport;

export const SuggestionItemNormal: (persona: IPersonaProps, suggestionProps?: IBasePickerSuggestionsProps) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
  let { onRemoveItem, onClick, showRemoveButton } = suggestionItemProps;
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
        size={ PersonaSize.extraExtraSmall }
        className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
        showSecondaryText={ true }
      />
    </div>
  );
};

export const SuggestionItemSmall: (persona: IPersonaProps, suggestionProps?: IBasePickerSuggestionsProps) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
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