import * as React from 'react';
import {
  IFacepileProps,
  Facepile,
  OverflowButtonType,
} from '../../../../Facepile';
import { Checkbox } from '../../../../Checkbox';
import { Dropdown } from '../../../../Dropdown';
import { Slider } from '../../../../Slider';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  overflowButtonProps: {
    ariaLabel: 'More info',
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
      displayedPersonas: 5,
      overflowButtonType: OverflowButtonType.none
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
        <div className={ 'control' }>
          <Slider
            label='Maximum number of Personas Shown:'
            min={ 0 }
            max={ 10 }
            step={ 1 }
            showValue={ true }
            value={ displayedPersonas }
            onChange={ value => this.setState((prevState: IFacepileOverflowExampleState) => {
              prevState.displayedPersonas = value;
              return prevState;
            }) }
          />
        </div>
        <Checkbox
          label='Use only width available'
          checked={ useOnlyAvailableWidth }
          onChange={ (ev, checked) => {
            this.setState((prevState: IFacepileOverflowExampleState) => {
              prevState.useOnlyAvailableWidth = checked;
              return prevState;
            });
          } } />
        <Dropdown
          label='Overflow Type:'
          selectedKey={ overflowButtonType }
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