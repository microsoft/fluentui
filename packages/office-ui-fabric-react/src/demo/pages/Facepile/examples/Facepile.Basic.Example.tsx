import * as React from 'react';
import {
  Checkbox,
  Dropdown,
  Facepile,
  IFacepilePersona,
  IFacepileProps,
  Slider
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

export enum ExtraDataType {
  none = 0,
  name,
  stats
}

export interface IFacepileBasicExampleState {
  numberOfFaces: any;
  imagesFadeIn: boolean;
  extraDataType: ExtraDataType;
}

export class FacepileBasicExample extends React.Component<any, IFacepileBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 3,
      imagesFadeIn: true,
      extraDataType: ExtraDataType.none
    };
  }

  public render() {
    let { extraDataType, numberOfFaces } = this.state;
    let facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
      getPersonaProps: (persona: IFacepilePersona) => {
        if (extraDataType === ExtraDataType.name) {
          return {
            imageShouldFadeIn: this.state.imagesFadeIn,
            hidePersonaDetails: false
          };
        } else if (extraDataType === ExtraDataType.stats) {
          return {
            imageShouldFadeIn: this.state.imagesFadeIn,
            hidePersonaDetails: false,
            primaryText: `[${persona.data}]`
          };
        }
        return {
          imageShouldFadeIn: this.state.imagesFadeIn,
        };
      }
    };

    return (
      <div className={ 'ms-FacepileExample' }>
        <Facepile {...facepileProps} />
        <Slider
          label='Number of Personas:'
          min={ 1 }
          max={ 5 }
          step={ 1 }
          showValue={ true }
          value={ numberOfFaces }
          onChange={ value => this.setState((prevState: IFacepileBasicExampleState) => {
            prevState.numberOfFaces = value;
            return prevState;
          }) }
          />
        <Checkbox
          label='Fade In'
          checked={ this.state.imagesFadeIn }
          onChange={ (ev, checked) => {
            this.setState((prevState: IFacepileBasicExampleState) => {
              prevState.imagesFadeIn = checked;
              return prevState;
            });
          } } />

        <Dropdown
          label='Additional Data:'
          selectedKey={ this.state.extraDataType }
          options={
            [
              { key: ExtraDataType.none, text: ExtraDataType[ExtraDataType.none] },
              { key: ExtraDataType.name, text: ExtraDataType[ExtraDataType.name] },
              { key: ExtraDataType.stats, text: ExtraDataType[ExtraDataType.stats] }
            ]
          }
          onChanged={ value => this.setState((prevState: IFacepileBasicExampleState) => {
            prevState.extraDataType = value.key as ExtraDataType;
            return prevState;
          }) }
          />
      </div>
    );
  }
}