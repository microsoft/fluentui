import * as React from 'react';
import { PageMarkdown } from '@uifabric/example-app-base';
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence,
} from '../../Persona';
import { Checkbox } from '../../Checkbox';
import { Label } from '../../Label';
import { TestImages } from '../../../common/TestImages';

import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export class PersonaCustomDescriptorsExample extends React.Component<{}, {
  renderPersonaDetails?: boolean;
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      renderPersonaDetails: true
    };
  }

  public render() {
    const examplePersonaProps: IPersonaProps = {
      imageUrl: TestImages.personaFemale,
      imageInitials: 'AR',
      primaryText: 'Annie Reid',
      secondaryText: 'Designer',
      tertiaryText: 'In A Meeting',
      showSecondaryText: true,
      size: PersonaSize.size40,
      hidePersonaDetails: !this.state.renderPersonaDetails,
    };
    const dndExampleFunction = (s?: string): string => s || 'Do Not Disturb';
    const blockedExampleFunction = (n: number = 1): string => `${n} ${n > 1 ? 'hours' : 'hour'}.`;

    const description = `The presence descriptions appear when you hover over the presence indicators. By default
          these values are basic presence descriptions in English. Use the \`presenceDescriptors\` prop
          to change these values.\n\nSome suggested uses:\n\n- Localize the values\n- Use custom status (ie: 'In a Call' instead of 'Busy`;

    return (
      <div className='ms-PersonaExample'>
        <div style={ { marginBottom: '30px' } }>
          <PageMarkdown>
            { description }
          </PageMarkdown>

          <Checkbox
            label='Include Persona Details'
            checked={ this.state.renderPersonaDetails }
            onChange={ this._onChange }
          />
        </div>

        <Label className={ exampleStyles.exampleLabel }><strong>Offline</strong> Persona: Left default.</Label>
        <Persona
          { ...examplePersonaProps }
          presence={ PersonaPresence.offline }
        />

        <Label className={ exampleStyles.exampleLabel }><strong>Online</strong> Persona: Translated to Spanish.</Label>
        <Persona
          { ...examplePersonaProps }
          presence={ PersonaPresence.online }
          presenceDescriptors={ {
            [PersonaPresence.online]: 'Disponible'
          } }
        />

        <Label className={ exampleStyles.exampleLabel }><strong>Away</strong> Persona: Replaced with arbitrary string.</Label>
        <Persona
          { ...examplePersonaProps }
          presence={ PersonaPresence.away }
          presenceDescriptors={ {
            [PersonaPresence.away]: 'Away From Desk'
          } }
        />

        <Label className={ exampleStyles.exampleLabel }><strong>Busy</strong> Persona: Using <code>tertiaryText</code> as the description.</Label>
        <Persona
          { ...examplePersonaProps }
          presence={ PersonaPresence.busy }
          presenceDescriptors={ {
            [PersonaPresence.busy]: examplePersonaProps.tertiaryText
          } }
        />

        <Label className={ exampleStyles.exampleLabel }><strong>Do Not Disturb</strong> Persona: Using a function that returns a string.</Label>
        <Persona
          { ...examplePersonaProps }
          presence={ PersonaPresence.dnd }
          presenceDescriptors={ {
            [PersonaPresence.dnd]: dndExampleFunction('Working on an intense project!')
          } }
        />

        <Label className={ exampleStyles.exampleLabel }><strong>Blocked</strong> Persona: Using string literals to combine text and variables.</Label>
        <Persona
          { ...examplePersonaProps }
          presence={ PersonaPresence.blocked }
          presenceDescriptors={ {
            [PersonaPresence.blocked]: `${examplePersonaProps.tertiaryText}. Will be available in ${blockedExampleFunction(2)}`
          } }
        />
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked: boolean | undefined): void => {
    this.setState({ renderPersonaDetails: checked });
  }
}
