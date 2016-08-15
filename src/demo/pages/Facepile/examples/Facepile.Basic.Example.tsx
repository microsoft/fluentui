import * as React from 'react';
import {
  Facepile,
  IFacepilePersona,
  IFacepileProps,
  PersonaInitialsColor
} from '../../../../index';

const facepileProps: IFacepileProps = {
  personas: [
    {
      personaName: 'Annie Lindqvist',
      imageUrl: './images/persona-female.png'
    },
    {
      personaName: 'Greta Lundberg',
      imageInitials: 'GL',
      initialsColor: PersonaInitialsColor.green
    },
    {
      personaName: 'Roko Kolar',
      imageInitials: 'RK',
      initialsColor: PersonaInitialsColor.purple,
      data: 'Emp1234',
      onClick: (persona: IFacepilePersona, ev: React.MouseEvent) =>
        alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
    }
  ]
};

export class FacepileBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Facepile {...facepileProps} />
    );
  }

}
