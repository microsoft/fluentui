import * as React from 'react';
import {
  Persona,
  PersonaInitialsColor,
} from '../../../../index';

const examplePersona = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

const personaWithInitials = {
  ...examplePersona,
  primaryText: 'Maor Sharett',
  imageInitials: 'MS'
};

export class PersonaInitialsExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Persona
          { ...examplePersona  }
          primaryText='Kat Larrson'
          />
        <Persona
          { ...examplePersona  }
          primaryText='Annie Lindqvist'
          />
        <Persona
          { ...personaWithInitials  }
          initialsColor={ PersonaInitialsColor.lightBlue }
          />
        <Persona
          { ...personaWithInitials  }
          initialsColor={ PersonaInitialsColor.teal }
          />
      </div>
    );
  }
}
