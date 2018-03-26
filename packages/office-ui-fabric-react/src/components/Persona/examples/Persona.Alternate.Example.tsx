import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '../../../common/TestImages';
import './PersonaExample.scss';

const examplePersona = {
  imageUrl: TestImages.personaMale,
  imageInitials: 'AR',
  primaryText: 'Annie Reid',
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  showSecondaryText: true
};

export class PersonaAlternateExample extends React.Component<{}, {
  renderPersonaDetails: boolean;
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      renderPersonaDetails: true
    };
  }

  public render() {
    const { renderPersonaDetails } = this.state;

    return (
      <div className='ms-PersonaExample'>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size24 }
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
          size={ PersonaSize.size32 }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />
      </div>
    );
  }
}
