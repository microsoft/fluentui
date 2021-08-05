import * as React from 'react';
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import { IBasePickerSuggestionsProps, ISuggestionItemProps } from '../../../../Pickers';
import * as stylesImport from '../PeoplePicker.scss';

export const SuggestionItemNormal: (
  persona: IPersonaProps,
  suggestionProps?: IBasePickerSuggestionsProps,
) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<IPersonaProps>) => {
  return (
    <div className={css('ms-PeoplePicker-personaContent', stylesImport.peoplePickerPersonaContent)}>
      <Persona
        presence={personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none}
        size={PersonaSize.size40}
        className={css('ms-PeoplePicker-Persona', stylesImport.peoplePickerPersona)}
        showSecondaryText={true}
        {...personaProps}
      />
    </div>
  );
};
