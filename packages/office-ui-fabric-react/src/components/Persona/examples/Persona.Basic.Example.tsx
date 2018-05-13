import * as React from 'react';
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TestImages } from '../../../common/TestImages';

import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const examplePersona: IPersonaSharedProps = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaBasicExample extends React.Component<{}, {
  renderPersonaDetails?: boolean;
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      renderPersonaDetails: true
    };
  }

  public render(): JSX.Element {
    const { renderPersonaDetails } = this.state;

    return (
      <div>
        <div>
          <Checkbox
            label='Include persona details'
            checked={ renderPersonaDetails }
            onChange={ this._onChange }
          />
        </div>

        <Label className={ exampleStyles.exampleLabel }>Size 10 Persona, with no presence</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size10 }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Label className={ exampleStyles.exampleLabel }>Size 10 Persona, with presence</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size10 }
          presence={ PersonaPresence.offline }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Label className={ exampleStyles.exampleLabel }>Size 24 Persona</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size24 }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Label className={ exampleStyles.exampleLabel }>Size 28 Persona</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size28 }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Label className={ exampleStyles.exampleLabel }>Size 32 Persona</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size32 }
          presence={ PersonaPresence.online }
          hidePersonaDetails={ !renderPersonaDetails }
        />

        <Label className={ exampleStyles.exampleLabel }>Size 40 Persona</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size40 }
          presence={ PersonaPresence.away }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Label className={ exampleStyles.exampleLabel }>Size 48 Persona (default) </Label>
        <Persona
          { ...examplePersona }
          hidePersonaDetails={ !renderPersonaDetails }
          presence={ PersonaPresence.busy }
        />

        <Label className={ exampleStyles.exampleLabel }>Size 72 Persona</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size72 }
          presence={ PersonaPresence.dnd }
          hidePersonaDetails={ !renderPersonaDetails }
        />
        <Label className={ exampleStyles.exampleLabel }>Size 100 Persona</Label>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size100 }
          presence={ PersonaPresence.blocked }
          hidePersonaDetails={ !renderPersonaDetails }
        />
      </div >
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined): void => {
    this.setState({ renderPersonaDetails: checked });
  }
}
