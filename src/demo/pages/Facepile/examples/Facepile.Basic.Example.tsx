import * as React from 'react';
import {
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
  firstName,
  stats
}

export interface IFacepileBasicExampleState {
  numberOfFaces: any;
  extraDataType: ExtraDataType;
}

export class FacepileBasicExample extends React.Component<any, IFacepileBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 3,
      extraDataType: ExtraDataType.none
    };
  }

  public render() {
    let { extraDataType, numberOfFaces } = this.state;
    let facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
      getPersonaProps: (persona: IFacepilePersona) => {
        if (extraDataType === ExtraDataType.firstName) {
          return {
            hidePersonaDetails: false
          }
        } else if (extraDataType === ExtraDataType.stats) {
          return {
            hidePersonaDetails: false,
            primaryText: `[${persona.data}]`
          }
        }
        return null;
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
        <Dropdown
          label='Additional Data:'
          selectedKey={ this.state.extraDataType }
          options={
            [
              { key: ExtraDataType.none, text: ExtraDataType[ExtraDataType.none] },
              { key: ExtraDataType.firstName, text: ExtraDataType[ExtraDataType.firstName] },
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