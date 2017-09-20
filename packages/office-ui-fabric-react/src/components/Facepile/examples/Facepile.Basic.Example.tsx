import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Facepile, IFacepilePersona, IFacepileProps } from 'office-ui-fabric-react/lib/Facepile';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

export enum ExtraDataType {
  none = 0,
  name = 1
}

export interface IFacepileBasicExampleState {
  numberOfFaces: any;
  imagesFadeIn: boolean;
  extraDataType: ExtraDataType;
  personaSize: PersonaSize;
}

export class FacepileBasicExample extends React.Component<any, IFacepileBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 3,
      imagesFadeIn: true,
      extraDataType: ExtraDataType.none,
      personaSize: PersonaSize.extraSmall
    };
  }

  public render() {
    let { extraDataType, numberOfFaces, personaSize } = this.state;
    let facepileProps: IFacepileProps = {
      personaSize: personaSize,
      personas: facepilePersonas.slice(0, numberOfFaces),
      getPersonaProps: (persona: IFacepilePersona) => {
        if (extraDataType === ExtraDataType.name) {
          return {
            imageShouldFadeIn: this.state.imagesFadeIn,
            hidePersonaDetails: false
          };
        }
        return {
          imageShouldFadeIn: this.state.imagesFadeIn
        };
      },
      ariaDescription: 'To move through the items use left and right arrow keys.'
    };

    return (
      <div className={ 'ms-FacepileExample' }>
        <Facepile {...facepileProps} />
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
        </div>
        <Checkbox
          label='Fade In'
          checked={ this.state.imagesFadeIn }
          onChange={ this._onChangeFadeIn }
        />
        <Dropdown
          label='Persona Size:'
          selectedKey={ this.state.personaSize }
          options={
            [
              { key: PersonaSize.extraSmall, text: PersonaSize[PersonaSize.extraSmall] },
              { key: PersonaSize.extraExtraSmall, text: PersonaSize[PersonaSize.extraExtraSmall] }
            ]
          }
          onChanged={ this._onChangePersonaSize }
        />
        <Dropdown
          label='Additional Data:'
          selectedKey={ this.state.extraDataType }
          options={
            [
              { key: ExtraDataType.none, text: ExtraDataType[ExtraDataType.none] },
              { key: ExtraDataType.name, text: ExtraDataType[ExtraDataType.name] }
            ]
          }
          onChanged={ this._onChangeAddtlData }
        />
      </div>
    );
  }

  @autobind
  private _onChangeAddtlData(value: IDropdownOption): void {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.extraDataType = value.key as ExtraDataType;
      return prevState;
    });
  }

  @autobind
  private _onChangeFadeIn(ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.imagesFadeIn = checked!;
      return prevState;
    });
  }

  @autobind
  private _onChangePersonaNumber(value: number): void {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.numberOfFaces = value;
      return prevState;
    });
  }

  @autobind
  private _onChangePersonaSize(value: IDropdownOption): void {
    this.setState((prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
      prevState.personaSize = value.key as PersonaSize;
      return prevState;
    });
  }
}