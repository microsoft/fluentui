import * as React from 'react';
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';

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
          { ...examplePersona  }
          primaryText='宋智洋'
        />
        <Persona
          { ...examplePersona  }
          primaryText='남궁 성종'
        />
        <Persona
          { ...examplePersona  }
          primaryText='خسرو رحیمی'
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
