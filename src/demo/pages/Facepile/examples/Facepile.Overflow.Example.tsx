import * as React from 'react';
import {
  Slider,
  IFacepileProps,
  Facepile
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  maxDisplayablePersonas: 5,
  overflowPersonaProps: {
    onClick: (ev: React.MouseEvent<HTMLElement>) =>
      alert('overflow icon clicked')
  }
};

export interface IFacepileOverflowExampleState {
  displayedPersonas: any;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      displayedPersonas: 5
    };
  }

  public render() {
    let { displayedPersonas } = this.state;
    facepileProps.maxDisplayablePersonas = displayedPersonas;

    return (
      <div className={'ms-FacepileExample'}>
        <Facepile {...facepileProps} />
        <Slider
          label='Number of Personas Shown:'
          min={0}
          max={6}
          step={1}
          showValue={true}
          value={this.state.displayedPersonas}
          onChange={value => this.setState({ displayedPersonas: value })}
          />
      </div>
    );
  }
}