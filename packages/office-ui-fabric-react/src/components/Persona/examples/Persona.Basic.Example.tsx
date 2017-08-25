import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TestImages } from '../../../common/TestImages';

const examplePersona = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  primaryText: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
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
          <Checkbox
            label='Include persona details'
            checked={ renderPersonaDetails }
            onChange={ (ev, checked) => { this.setState({ renderPersonaDetails: checked }); } } />
        </div>

        <Label>Tiny Persona (12px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.tiny }
          presence={ PersonaPresence.offline }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label>Extra Extra Small Persona (24px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.extraExtraSmall }
          presence={ PersonaPresence.none }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label>Size 28 Persona (28px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size28 }
          presence={ PersonaPresence.none }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label>Extra Small Persona (32px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.extraSmall }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label>Small Persona (40px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.small }
          presence={ PersonaPresence.away }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label>Medium Persona (48px)</Label>
        <Persona
          { ...examplePersona }
          hidePersonaDetails={ !renderPersonaDetails }
          presence={ PersonaPresence.busy }
        />

        <Label>Large Persona (72px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.large }
          presence={ PersonaPresence.dnd }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label>Extra Large Persona (100px)</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.extraLarge }
          presence={ PersonaPresence.blocked }
          hidePersonaDetails={ !renderPersonaDetails }
        />
      </div>
    );
  }
}