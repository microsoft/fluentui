import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
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
      onClick: (ev: React.MouseEvent, persona: IFacepilePersona) =>
        alert('You clicked on ' + persona.personaName + '. Extra data: ' + persona.data)
    },
    {
      personaName: 'Greta Lundberg',
      imageInitials: 'GL',
      initialsColor: PersonaInitialsColor.green
    },
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
      personaName: 'Annie Lindqvist',
      imageUrl: './images/persona-female.png'
    },
    {
      personaName: 'Greta Lundberg',
      imageInitials: 'GL',
      initialsColor: PersonaInitialsColor.green
    }
  ]
};

export interface IFacepileBasicExampleState {
  numberOfFaces: any;
}

export class FacepileBasicExample extends React.Component<any, IFacepileBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 1
    };
  }

  public render() {
    let { numberOfFaces } = this.state;
    let props: IFacepileProps = {
      personas: []
    };
    props.personas = facepileProps.personas.slice(0, numberOfFaces);

    return (
      <div className='ms-FacePileBasicExample'>
        <Facepile {...props} />
        <Dropdown
          label='Number of Faces:'
          options={
            [
              { key: 0, text: '0' },
              { key: 1, text: '1' },
              { key: 2, text: '2' },
              { key: 3, text: '3' },
              { key: 4, text: '4' },
              { key: 5, text: '5' },
              { key: 6, text: '6' },
              { key: 7, text: '7' },
              { key: 8, text: '8' }
            ]
          }
          selectedKey={this.state.numberOfFaces}
          onChanged={this._onDropdownChanged.bind(this)}
          />
      </div>
    );
  }

  private _onDropdownChanged(option: IDropdownOption) {
    this.setState({
      numberOfFaces: option.key
    });
  }
}
