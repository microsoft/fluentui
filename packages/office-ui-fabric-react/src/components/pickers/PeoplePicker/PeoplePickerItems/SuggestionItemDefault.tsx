/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../../Persona';
import { CommandButton, IconButton } from '../../../../Button';
import * as stylesImport from '../PeoplePicker.scss';
const styles: any = stylesImport;

export const SuggestionItemNormal: (persona: IPersonaProps, suggestionProps: any) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps: any) => {
  let { onRemoveItem, onClick } = suggestionItemProps;
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <CommandButton
        onClick={ onClick }
        className={ css('ms-PeoplePicker-personaButton', styles.personaButton) }
      >
        <Persona
          { ...personaProps }
          presence={ personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none }
          size={ PersonaSize.extraExtraSmall }
          className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
        />
      </CommandButton>
      <IconButton
        iconProps={ { iconName: 'Cancel' } }
        title='Remove'
        ariaLabel='Remove'
        onClick={ onRemoveItem }
        className={ css('ms-PeoplePicker-closeButton', styles.closeButton) }
      />
    </div>
  );
};

export const SuggestionItemSmall: (persona: IPersonaProps, suggestionProps: any) => JSX.Element = (personaProps: IPersonaProps, suggestionItemProps: any) => {
  let { onRemoveItem, onClick } = suggestionItemProps;
  return (
    <div className={ css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) }>
      <CommandButton
        onClick={ onClick }
        className={ css('ms-PeoplePicker-personaButtonSmall', styles.personaButtonSmall) }
      >
        <Persona
          { ...personaProps }
          presence={ PersonaPresence.none }
          size={ PersonaSize.extraExtraSmall }
          className={ css('ms-PeoplePicker-Persona', styles.peoplePickerPersona) }
        />
      </CommandButton>
      <IconButton
        iconProps={ { iconName: 'Cancel' } }
        title='Remove'
        ariaLabel='Remove'
        onClick={ onRemoveItem }
        className={ css('ms-PeoplePicker-closeButtonSmall', styles.closeButtonSmall) }
      />
    </div>
  );
};