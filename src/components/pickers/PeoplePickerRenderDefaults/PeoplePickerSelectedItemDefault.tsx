// TsLint doesn't understand that React is needed for JSX to work properly
// and so it must be disabled or it throws errors.
/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { PeoplePickerType } from '../PeoplePicker.Props';
import { IPeoplePickerItemProps } from '../PeoplePickerItemProps';
import {
  Persona,
  PersonaPresence
} from '../../Persona';

/**
 * A dumb component that renders items for the PeoplePicker results.
 * Can appear either in the search box itself or beneath it
 * if the PeoplePicker type is memberList
 */
export const PeoplePickerSelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let { persona,
    onRemovePersona,
    index,
    peoplePickerType
  } = peoplePickerItemProps;
  let buttonClassName = peoplePickerType === PeoplePickerType.memberList ? 'ms-PeoplePicker-resultAction' : 'ms-PeoplePicker-personaRemove';
  return (
    <div className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...persona }
        presence = { persona.presence ? persona.presence : PersonaPresence.online }
        />
      <button className={ buttonClassName } onClick={ () => { if (onRemovePersona) { onRemovePersona(index, persona); } } }>
        <i className='ms-Icon ms-Icon--x'></i>
      </button>
    </div>
  );
};