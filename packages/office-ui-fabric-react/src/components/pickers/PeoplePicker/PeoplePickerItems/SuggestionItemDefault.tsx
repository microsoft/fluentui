import * as React from 'react';

import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import { ISuggestionItemProps } from '../../../../Pickers';

import * as stylesImport from './SuggestionItemDefault.scss';
const styles: any = stylesImport;

/**
 * @deprecated Use the exported from the package level 'PeoplePickerItemSuggestion'. Will be removed in Fabric 7.0
 */
export const SuggestionItemNormal = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
  return (
    <div className={css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent)}>
      <Persona
        presence={personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none}
        size={PersonaSize.size24}
        className={css('ms-PeoplePicker-Persona', styles.peoplePickerPersona)}
        showSecondaryText={true}
        {...personaProps}
      />
    </div>
  );
};

/**
 *  Will be removed in Fabric 7.0
 * @deprecated Use the exported from the package level 'PeoplePickerItemSuggestion' with compact prop set to true.
 */
export const SuggestionItemSmall = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
  return (
    <div className={css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent)}>
      <Persona
        presence={personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none}
        size={PersonaSize.size24}
        className={css('ms-PeoplePicker-Persona', styles.peoplePickerPersona)}
        {...personaProps}
      />
    </div>
  );
};
