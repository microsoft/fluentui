import * as React from 'react';
import { Persona, PersonaSize, PersonaPresence } from '../../../../../components/Persona/index';

const billMurrayContact = {
  imageUrl: '//www.fillmurray.com/200/200',
  imageInitials: 'BM',
  primaryText: 'Bill Murray',
  seconaryText: 'Actor',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export default class PersonaBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.tiny }
          presence={ PersonaPresence.offline }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.extraSmall }
          presence={ PersonaPresence.online }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.small }
          presence={ PersonaPresence.away }
        />
        <Persona
          { ...billMurrayContact }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.large }
          presence={ PersonaPresence.dnd }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.extraLarge }
          presence={ PersonaPresence.blocked }
        />
      </div>
    );
  }
}

