import * as React from 'react';
import {
  Facepile,
  IFacepileProps,
  IPersonaProps,
  OverflowButtonType,
  Slider
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

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
    let facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
    };

    return (
      <div className={'ms-FacepileExample'}>
        <Facepile {...facepileProps} />
        <Slider
          label='Number of Personas:'
          min={1}
          max={5}
          step={1}
          showValue={true}
          value={numberOfFaces}
          onChange={value => this.setState((prevState: IFacepileBasicExampleState) => {
            prevState.numberOfFaces = value;
            return prevState;
          })}
          />
      </div>
    );
  }
}