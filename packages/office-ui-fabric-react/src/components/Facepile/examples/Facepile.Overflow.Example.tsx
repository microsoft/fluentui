import * as React from 'react';
import {
  IFacepilePersona,
  IFacepileProps,
  Facepile,
  OverflowButtonType,
} from 'office-ui-fabric-react/lib/Facepile';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  getPersonaProps: (persona: IFacepilePersona) => {
    return {
      imageShouldFadeIn: false
    };
  },
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
  widthAvailable: number;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      useOnlyAvailableWidth: false,
      displayedPersonas: 5,
      overflowButtonType: OverflowButtonType.none,
      widthAvailable: 300
    };
  }

  public render() {
    let { useOnlyAvailableWidth, displayedPersonas, overflowButtonType, widthAvailable } = this.state;
    facepileProps.maxDisplayablePersonas = displayedPersonas;
    facepileProps.overflowButtonType = overflowButtonType;
    facepileProps.useOnlyAvailableWidth = true;
    useOnlyAvailableWidth && (facepileProps.width = widthAvailable);

    return (
      <div className={ 'ms-FacepileExample' }>
        <Facepile {...facepileProps} />
        <div className={ 'control' }>
          <Slider
            label='Maximum number of Personas Shown:'
            min={ 1 }
            max={ 16 }
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
              { prevState.useOnlyAvailableWidth = !!checked; }
              return prevState;
            });
          } }
        />
        <Slider
          label='Width available:'
          min={ 10 }
          max={ 300 }
          step={ 10 }
          showValue={ true }
          value={ widthAvailable }
          onChange={ value => this.setState((prevState: IFacepileOverflowExampleState) => {
            prevState.widthAvailable = value;
            return prevState;
          }) }
        />
        <Dropdown
          label='Overflow Type:'
          selectedKey={ overflowButtonType }
          options={
            [
              { key: OverflowButtonType.none, text: OverflowButtonType[OverflowButtonType.none] },
              { key: OverflowButtonType.descriptive, text: OverflowButtonType[OverflowButtonType.descriptive] },
              { key: OverflowButtonType.downArrow, text: OverflowButtonType[OverflowButtonType.downArrow] },
              { key: OverflowButtonType.more, text: OverflowButtonType[OverflowButtonType.more] }
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