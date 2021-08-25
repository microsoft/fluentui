import * as React from 'react';

import { css } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import * as stylesImport from './SuggestionItemDefault.scss';
import type { IPersonaProps } from '../../../../Persona';
import type { IBasePickerSuggestionsProps, ISuggestionItemProps } from '../../../../Pickers';

const styles: any = stylesImport;

/**
 * @deprecated Use `PeoplePickerItemSuggestion` instead. Will be removed in \>= 7.0.
 */
export const SuggestionItemNormal: (
  persona: IPersonaProps,
  suggestionProps?: IBasePickerSuggestionsProps,
) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
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
 * @deprecated Use `PeoplePickerItemSuggestion` with `compact` prop set to `true`. Will be removed in \>= 7.0.
 */
export const SuggestionItemSmall: (
  persona: IPersonaProps,
  suggestionProps?: IBasePickerSuggestionsProps,
) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps?: ISuggestionItemProps<any>) => {
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
