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
import { css } from '../../../utilities/css';

/**
 * A dumb component that renders items for the PeoplePicker search dropdown.
 */
export const PeoplePickerSearchItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let { persona,
    onRemovePersona,
    onSelectPersona,
    index,
    peoplePickerType,
    isSelected
  } = peoplePickerItemProps;

  let buttonClassName = css('ms-PeoplePicker-resultBtn', {
    'ms-PeoplePicker-resultBtn--compact': peoplePickerType === PeoplePickerType.compact,
    'ms-PeoplePicker-resultBtn--selected': isSelected
  });
  return (
    <div role='button' className={ buttonClassName }>
      <Persona
        { ...persona }
        presence={ persona.presence ? persona.presence : PersonaPresence.online }
        onMouseDown={ () => { if (onSelectPersona) { onSelectPersona(persona); } } }
        onClick={ () => { if (onSelectPersona) { onSelectPersona(persona); } } }
        />
      { peoplePickerType !== PeoplePickerType.memberList ?
        <button
          className='ms-PeoplePicker-resultAction'
          tabIndex={-1}
          onClick={ () => { if (onRemovePersona) { onRemovePersona(index, persona); } } } >
          <i className='ms-Icon ms-Icon--x'/>
        </button>
        : null }
    </div>
  );
};