import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import './PersonaExample.scss';

const examplePersona: IPersonaSharedProps = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

const personaWithInitials: IPersonaSharedProps = {
  ...examplePersona,
  text: 'Maor Sharett',
  imageInitials: 'MS'
};

export class PersonaInitialsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-PersonaExample">
        <Persona {...examplePersona} text="Kat Larrson" />
        <Persona {...examplePersona} text="Annie" />
        <Persona {...examplePersona} text="Annie Lindqvist" />
        <Persona {...examplePersona} text="Annie Boyl Lindqvist" />
        <Persona {...examplePersona} text="Annie Boyl Carrie Lindqvist" />
        <Persona {...examplePersona} text="+1 (555) 123-4567 X4567" />
        <Persona {...examplePersona} text="+1 (555) 123-4567 X4567" allowPhoneInitials={true} />
        <Persona {...examplePersona} text="宋智洋" />
        <Persona {...examplePersona} text="남궁 성종" />
        <Persona {...examplePersona} text="خسرو رحیمی" />
        <Persona {...personaWithInitials} initialsColor={PersonaInitialsColor.lightBlue} />
        <Persona {...personaWithInitials} initialsColor={PersonaInitialsColor.teal} />
        <Persona {...personaWithInitials} initialsColor={PersonaInitialsColor.teal} coinSize={150} />
      </div>
    );
  }
}
