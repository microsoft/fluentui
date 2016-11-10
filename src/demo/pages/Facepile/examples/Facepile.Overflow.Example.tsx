import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
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
  overflowButtonType: OverflowButtonType.downArrow,
  overflowButtonProps: {
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
      alert('overflow icon clicked')
  }
};

export interface IFacepileOverflowExampleState {
  displayedPersonas: any;
  overflowButtonType: OverflowButtonType;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      displayedPersonas: 5,
      overflowButtonType: OverflowButtonType.none
    };
  }

  public render() {
    let { displayedPersonas, overflowButtonType } = this.state;
    facepileProps.maxDisplayablePersonas = displayedPersonas;
    facepileProps.overflowButtonType = overflowButtonType;

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
          onChange={value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.displayedPersonas = value;
            return prevState;
          })}
          />
        <Dropdown
          label='Overflow Type:'
          selectedKey={this.state.overflowButtonType}
          options={
            [
              { key: OverflowButtonType.none, text: OverflowButtonType[OverflowButtonType.none] },
              { key: OverflowButtonType.descriptive, text: OverflowButtonType[OverflowButtonType.descriptive] },
              { key: OverflowButtonType.downArrow, text: OverflowButtonType[OverflowButtonType.downArrow] },
              { key: OverflowButtonType.more, text: OverflowButtonType[OverflowButtonType.more] },

            ]
          }
          onChanged={value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.overflowButtonType = value.key as OverflowButtonType;
            return prevState;
          })}
          />
      </div>
    );
  }
}