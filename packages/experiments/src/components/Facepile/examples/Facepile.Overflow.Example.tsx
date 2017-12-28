import * as React from 'react';
import {
  IFacepilePersona,
  OverflowButtonType
} from 'office-ui-fabric-react/lib/Facepile';
import {
  ResizableFacepile,
  IResizableFacepileProps
} from '../ResizableFacepile';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { facepilePersonas } from './FacepileExampleData';
import './Facepile.Examples.scss';

const facepileProps: IResizableFacepileProps = {
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
  overflowButtonType: OverflowButtonType;
  widthAvailable: number;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      overflowButtonType: OverflowButtonType.none,
      widthAvailable: 300
    };
  }

  public render() {
    let { overflowButtonType, widthAvailable } = this.state;
    let updatedFacepileProps: IResizableFacepileProps = {
      ...facepileProps,
      overflowButtonType: overflowButtonType,
      width: widthAvailable
    };

    return (
      <div className={ 'ms-FacepileExample' }>
        <ResizableFacepile {...updatedFacepileProps} />
        <div className={ 'control' }>
          <Slider
            label='Width available:'
            min={ 10 }
            max={ 300 }
            step={ 10 }
            showValue={ true }
            value={ widthAvailable }
            onChange={ (value: number) => this.setState((prevState: IFacepileOverflowExampleState) => {
              prevState.widthAvailable = value;
              return prevState;
            }) }
          />
        </div>
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
          onChanged={ this._onChangeType
          }
        />
      </div>
    );
  }

  @autobind
  private _onChangeType(value: IDropdownOption): void {
    this.setState((prevState: IFacepileOverflowExampleState): IFacepileOverflowExampleState => {
      prevState.overflowButtonType = value.key as OverflowButtonType;
      return prevState;
    });
  }
}