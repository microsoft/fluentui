import * as React from 'react';
import { css, classNamesFunction } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { getStyles } from './SuggestionItemDefault.styles';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { ISuggestionItemProps } from '@fluentui/react/lib/Pickers';
import type { ISuggestionItemDefaultStylesProps, ISuggestionItemDefaultStyles } from './SuggestionItemDefault.styles';

export const SuggestionItemNormal: (persona: IPersonaProps) => JSX.Element = (
  personaProps: IPersonaProps,
  suggestionItemProps?: ISuggestionItemProps<IPersonaProps>,
) => {
  const getClassNames = classNamesFunction<ISuggestionItemDefaultStylesProps, ISuggestionItemDefaultStyles>();
  const classNames = getClassNames(getStyles);
  return (
    <div className={css('ms-PeoplePicker-personaContent', classNames.personaContent)}>
      <Persona
        presence={personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none}
        size={PersonaSize.size40}
        className={css('ms-PeoplePicker-Persona', classNames.persona)}
        showSecondaryText={true}
        {...personaProps}
      />
    </div>
  );
};
