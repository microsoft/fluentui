import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import * as stylesImport from './DefaultPeopleSuggestionsItem.scss';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { ISuggestionModel } from '@fluentui/react/lib/Pickers';

export const DefaultPeopleSuggestionsItem = <TPersona extends IPersonaProps>(
  props: ISuggestionModel<TPersona>,
): JSX.Element => {
  const item = props.item;
  return (
    <div className={css('ms-PeoplePicker-personaContent', stylesImport.peoplePickerPersonaContent)}>
      <Persona
        presence={item.presence !== undefined ? item.presence : PersonaPresence.none}
        size={PersonaSize.size40}
        className={css('ms-PeoplePicker-Persona', stylesImport.peoplePickerPersona)}
        showSecondaryText={true}
        {...item}
      />
    </div>
  );
};
