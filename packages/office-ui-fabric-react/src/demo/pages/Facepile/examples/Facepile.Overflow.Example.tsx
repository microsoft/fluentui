import * as React from 'react';
import {
  Dropdown,
  IFacepileProps,
  Facepile,
  OverflowButtonType,
  Slider
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  maxDisplayablePersonas: 5,
  availableWidth: 200,
  overflowButtonType: OverflowButtonType.downArrow,
  overflowButtonProps: {
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
      alert('overflow icon clicked')
  }
};

export interface IFacepileOverflowExampleState {
  availableWidth: number;
  displayedPersonas: any;
  overflowButtonType: OverflowButtonType;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      availableWidth: 200,
      displayedPersonas: 5,
      overflowButtonType: OverflowButtonType.descriptive
    };
  }

  public render() {
    let { availableWidth, displayedPersonas, overflowButtonType } = this.state;
    facepileProps.availableWidth = availableWidth;
    facepileProps.maxDisplayablePersonas = displayedPersonas;
    facepileProps.overflowButtonType = overflowButtonType;

    return (
      <div className={ 'ms-FacepileExample' }>
        <Facepile {...facepileProps} />
        <Slider
          label='Maximum number of Personas Shown:'
          min={ 0 }
          max={ 7 }
          step={ 1 }
          showValue={ true }
          value={ this.state.displayedPersonas }
          onChange={ value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.displayedPersonas = value;
            return prevState;
          }) }
          />
        <Slider
          label='Maximum width available:'
          min={ 10 }
          max={ 300 }
          step={ 25 }
          showValue={ true }
          value={ this.state.availableWidth }
          onChange={ value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.availableWidth = value;
            return prevState;
          }) }
          />
        <Dropdown
          label='Overflow Type:'
          selectedKey={ this.state.overflowButtonType }
          options={
            [
              { key: OverflowButtonType.none, text: OverflowButtonType[OverflowButtonType.none] },
              { key: OverflowButtonType.descriptive, text: OverflowButtonType[OverflowButtonType.descriptive] },
              { key: OverflowButtonType.downArrow, text: OverflowButtonType[OverflowButtonType.downArrow] },
              { key: OverflowButtonType.more, text: OverflowButtonType[OverflowButtonType.more] },

            ]
          }
          onChanged={ value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.overflowButtonType = value.key as OverflowButtonType;
            return prevState;
          }) }
          />
      </div>
    );
  }
}