import * as React from 'react';
import {
  Persona,
  PersonaInitialsColor,
} from '../../../../index';

const billMurrayContact = {
  imageInitials: 'BM',
  primaryText: 'Bill Murray',
  seconaryText: 'Actor',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export default class PersonaInitialsExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Persona
          { ...billMurrayContact }
        />
        <Persona
          { ...billMurrayContact }
          initialsColor={PersonaInitialsColor.black}
        />
        <Persona
          { ...billMurrayContact }
          initialsColor={PersonaInitialsColor.darkRed}
        />
      </div>
    );
  }
}

