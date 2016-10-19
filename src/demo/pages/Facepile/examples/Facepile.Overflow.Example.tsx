import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
  Facepile,
  IFacepileProps,
  PersonaInitialsColor
} from '../../../../index';

const facepileProps: IFacepileProps = {
  personas: [
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
      personaName: 'Roko Kolar',
      imageInitials: 'RK',
      initialsColor: PersonaInitialsColor.purple
    },
    {
      personaName: 'Greta Lundberg',
      imageInitials: 'GL',
      initialsColor: PersonaInitialsColor.lightBlue
    },
    {
      personaName: 'Annie Lindqvist',
      imageUrl: './images/persona-female.png'
    },
    {
      personaName: 'Roko Kolar',
      imageInitials: 'RK',
      initialsColor: PersonaInitialsColor.purple
    },
    {
      personaName: 'Greta Lundberg',
      imageInitials: 'GL',
      initialsColor: PersonaInitialsColor.green
    }
  ]
};

export interface IFacepileOverflowExampleState {
  widthAvailable: any;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      widthAvailable: 120
    };
  }

  public render() {
    let { widthAvailable } = this.state;
    facepileProps.availableWidth = widthAvailable;

    return (
      <div className='ms-FacePileBasicExample'>
        <Facepile {...facepileProps} />
        <Dropdown
          label='Width Available:'
          options={
            [
              { key: 40, text: '40' },
              { key: 80, text: '80' },
              { key: 120, text: '120' },
              { key: 150, text: '150' },
              { key: 180, text: '180' },
              { key: 210, text: '210' },
              { key: 240, text: '240' },
            ]
          }
          selectedKey={this.state.widthAvailable}
          onChanged={this._onDropdownChanged.bind(this)}
          />
      </div>
    );
  }

  private _onDropdownChanged(option: IDropdownOption) {
    this.setState({
      widthAvailable: option.key
    });
  }
}