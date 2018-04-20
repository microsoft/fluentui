import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Facepile, IFacepilePersona, IFacepileProps } from 'office-ui-fabric-react/lib/Facepile';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export interface IFacepileBasicExampleState {
  numberOfFaces: any;
  imagesFadeIn: boolean;
  personaSize: PersonaSize;
}

export class FacepileBasicExample extends React.Component<{}, IFacepileBasicExampleState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      numberOfFaces: 3,
      imagesFadeIn: true,
      personaSize: PersonaSize.size32
    };
  }

  public render(): JSX.Element {
    const { numberOfFaces, personaSize } = this.state;
    const facepileProps: IFacepileProps = {
      personaSize: personaSize,
      personas: facepilePersonas.slice(0, numberOfFaces),
      overflowPersonas: facepilePersonas.slice(numberOfFaces),
      getPersonaProps: (persona: IFacepilePersona) => {
        return {
          imageShouldFadeIn: this.state.imagesFadeIn
        };
      },
      ariaDescription: 'To move through the items use left and right arrow keys.'
    };

    return (
      <div className={ 'ms-FacepileExample' }>
        <Facepile { ...facepileProps } />
        <div className={ 'control' }>
          <Slider
            label='Number of Personas:'
            min={ 1 }
            max={ 5 }
            step={ 1 }
            showValue={ true }
            value={ numberOfFaces }
            onChange={ this._onChangePersonaNumber }
          />
          <Dropdown
            label='Persona Size:'
            selectedKey={ this.state.personaSize }
            options={
              [
                { key: PersonaSize.size16, text: PersonaSize[PersonaSize.size16] },
                { key: PersonaSize.size24, text: PersonaSize[PersonaSize.size24] },
                { key: PersonaSize.size28, text: PersonaSize[PersonaSize.size28] },
                { key: PersonaSize.size32, text: PersonaSize[PersonaSize.size32] },
                { key: PersonaSize.size40, text: PersonaSize[PersonaSize.size40] }
              ]
            }
            onChanged={ this._onChangePersonaSize }
          />
          <Checkbox
            className={ exampleStyles.exampleCheckbox }
            label='Fade In'
            checked={ this.state.imagesFadeIn }
            onChange={ this._onChangeFadeIn }
          />
        </div>
      </div>
    );
  }

  private _onChangeFadeIn = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.imagesFadeIn = checked!;
      return prevState;
    });
  }

  private _onChangePersonaNumber = (value: number): void => {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.numberOfFaces = value;
      return prevState;
    });
  }

  private _onChangePersonaSize = (value: IDropdownOption): void => {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.personaSize = value.key as PersonaSize;
      return prevState;
    });
  }
}