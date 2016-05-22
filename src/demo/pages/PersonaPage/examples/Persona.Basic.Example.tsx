import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
  Checkbox
} from '../../../../index';

const billMurrayContact = {
  imageUrl: '//www.fillmurray.com/200/200',
  imageInitials: 'BM',
  primaryText: 'Bill Murray',
  seconaryText: 'Actor',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaBasicExample extends React.Component<React.Props<PersonaBasicExample>, { renderPersonaDetails?: boolean; }> {
  constructor() {
    super();
    this.state = {
      renderPersonaDetails: true
    };
  }

  public render() {
    let { renderPersonaDetails } = this.state;

    return (
      <div>
        <div>
          <Checkbox text='Include persona details' isChecked={ renderPersonaDetails } onChanged={ (isChecked: boolean) => { this.setState({ renderPersonaDetails: isChecked }); }} />
        </div>
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.tiny }
          presence={ PersonaPresence.offline }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.extraSmall }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.small }
          presence={ PersonaPresence.away }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...billMurrayContact }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.large }
          presence={ PersonaPresence.dnd }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...billMurrayContact }
          size={ PersonaSize.extraLarge }
          presence={ PersonaPresence.blocked }
          hidePersonaDetails={ !renderPersonaDetails }
        />
      </div>
    );
  }
}

