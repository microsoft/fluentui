import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Persona, PersonaSize, PersonaPresence, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ISuggestionModel } from 'office-ui-fabric-react/lib/Pickers';
import * as stylesImport from './DefaultPeopleSuggestionsItem.scss';

export const DefaultPeopleSuggestionsItem = <TPersona extends IPersonaProps>(props: ISuggestionModel<TPersona>): JSX.Element => {
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
