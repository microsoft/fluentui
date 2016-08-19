import * as React from 'react';
import {
  Persona,
  PersonaInitialsColor,
} from '../../../../index';

const examplePersona = {
  imageInitials: 'MS',
  primaryText: 'Maor Sharett',
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaInitialsExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Persona
          { ...examplePersona }
        />
        <Persona
          { ...examplePersona }
          initialsColor={PersonaInitialsColor.black}
        />
        <Persona
          { ...examplePersona }
          initialsColor={PersonaInitialsColor.teal}
        />
      </div>
    );
  }
}

