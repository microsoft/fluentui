import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '../../../common/TestImages';

const examplePersona = {
  imageUrl: TestImages.personaMale,
  imageInitials: 'AR',
  primaryText: 'Annie Reid',
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  showSecondaryText: true
};

export class PersonaAlternateExample extends React.Component<React.Props<PersonaAlternateExample>, { renderPersonaDetails?: boolean; }> {
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
        <Persona
          { ...examplePersona }
          size={ PersonaSize.extraExtraSmall }
          presence={ PersonaPresence.none }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size28 }
          presence={ PersonaPresence.none }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Persona
          { ...examplePersona }
          size={ PersonaSize.extraSmall }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />
      </div>
    );
  }
}
