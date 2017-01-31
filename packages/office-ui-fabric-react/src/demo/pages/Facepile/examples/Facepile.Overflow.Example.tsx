import * as React from 'react';
import {
  Checkbox,
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
  useOnlyAvailableWidth: false,
  overflowButtonType: OverflowButtonType.downArrow,
  overflowButtonProps: {
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
      alert('overflow icon clicked')
  }
};

export interface IFacepileOverflowExampleState {
  useOnlyAvailableWidth: boolean;
  displayedPersonas: any;
  overflowButtonType: OverflowButtonType;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      useOnlyAvailableWidth: false,
      displayedPersonas: 1,
      overflowButtonType: OverflowButtonType.descriptive
    };
  }

  public render() {
    let { useOnlyAvailableWidth, displayedPersonas, overflowButtonType } = this.state;
    facepileProps.useOnlyAvailableWidth = useOnlyAvailableWidth;
    facepileProps.maxDisplayablePersonas = displayedPersonas;
    facepileProps.overflowButtonType = overflowButtonType;

    return (
      <div className={ 'ms-FacepileExample' }>
        <Facepile {...facepileProps} />
        <Slider
          label='Maximum number of Personas Shown:'
          min={ 0 }
          max={ 10 }
          step={ 1 }
          showValue={ true }
          value={ this.state.displayedPersonas }
          onChange={ value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.displayedPersonas = value;
            return prevState;
          }) }
          />
        <Checkbox
          label='Use only width available'
          checked={ this.state.useOnlyAvailableWidth }
          onChange={ (ev, checked) => {
            this.setState((prevState: IFacepileOverflowExampleState) => {
              prevState.useOnlyAvailableWidth = checked;
              return prevState;
            });
          } } />
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