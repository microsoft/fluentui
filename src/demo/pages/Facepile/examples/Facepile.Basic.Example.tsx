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
      personaName: 'Bill Murray',
      imageUrl: '//www.fillmurray.com/200/200'
    },
    {
      personaName: 'Douglas Field',
      imageInitials: 'DF',
      initialsColor: PersonaInitialsColor.green
    },
    {
      personaName: 'Marcus Laue',
      imageInitials: 'ML',
      initialsColor: PersonaInitialsColor.purple,
      data: 'Emp1234',
      onClick: (persona: IFacepilePersona, ev: React.MouseEvent) =>
        alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
    }
  ]
};

export default class FacepileBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Facepile {...facepileProps} />
    );
  }

}
