import * as React from 'react';
import {
  Slider,
  Facepile,
  IFacepileProps
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
      maxDisplayablePersonas: 6,
      personaDetailsShown: false,
      personas: facepilePersonas.slice(0, numberOfFaces),
      chevronButtonProps: {
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
          alert('Down arrow icon clicked')
      }
    };

    return (
      <div className={'ms-FacepileExample'}>
        <Facepile {...facepileProps} />
        <Slider
          label='Number of Personas:'
          min={1}
          max={6}
          step={1}
          showValue={true}
          value={this.state.numberOfFaces}
          onChange={value => this.setState({ numberOfFaces: value })}
          />
      </div>
    );
  }
}