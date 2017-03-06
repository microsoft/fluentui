/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import './FocusTrapZone.Box.Example.scss';

interface IFocusTrapComponentProps {
  name: string;
  isActive: boolean;
  setIsActive: (name: string, isActive: boolean) => void;
}

interface IFocusTrapComponentState {
}

class FocusTrapComponent extends React.Component<IFocusTrapComponentProps, IFocusTrapComponentState> {

  public refs: {
    [key: string]: React.ReactInstance;
    toggle: HTMLElement;
  };

  render() {
    let contents = (
      <div className='ms-FocusTrapComponent'>
        <Button onClick={ this._onStringButtonClicked } >
          {
            this.props.name
          }
        </Button>
        <Toggle
          ref='toggle'
          checked={ this.props.isActive }
          onChanged={ this._onFocusTrapZoneToggleChanged }
          label='Focus Trap Zone'
          onText='On'
          offText='Off' />
        {
          this.props.children
        }
      </div>
    );

    if (this.props.isActive) {
      return (
        <FocusTrapZone forceFocusInsideTrap={false}>
        {
          contents
        }
        </FocusTrapZone>
      );
    }
    return contents;
  }

  @autobind
  private _onStringButtonClicked() {
    console.log(this.props.name);
  }

  @autobind
  private _onFocusTrapZoneToggleChanged(isChecked: boolean) {
    this.props.setIsActive(this.props.name, isChecked);
  }

}

export interface IFocusTrapZoneNestedExampleState {
  stateMap: any;
}

const NAMES: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];

export default class FocusTrapZoneNestedExample extends React.Component<React.HTMLProps<HTMLDivElement>, IFocusTrapZoneNestedExampleState> {

  constructor() {
    super();

    this.state = {
      stateMap: {}
    };
  }

  public render() {
    return (
      <div>
        <FocusTrapComponent name={ 'One' } isActive={ !!this.state.stateMap['One']} setIsActive={ this._setIsActive } >
          <FocusTrapComponent name={ 'Two' } isActive={ !!this.state.stateMap['Two']} setIsActive={ this._setIsActive } >
            <FocusTrapComponent name={ 'Three' } isActive={ !!this.state.stateMap['Three']} setIsActive={ this._setIsActive } >
            </FocusTrapComponent>
            <FocusTrapComponent name={ 'Four' } isActive={ !!this.state.stateMap['Four']} setIsActive={ this._setIsActive } >
            </FocusTrapComponent>
          </FocusTrapComponent>
          <FocusTrapComponent name={ 'Five' } isActive={ !!this.state.stateMap['Five']} setIsActive={ this._setIsActive } >
          </FocusTrapComponent>
        </FocusTrapComponent>
        <Button onClick={ this._randomize }>Randomize</Button>
      </div>
    );
  }

  @autobind
  private _setIsActive(name: string, isActive: boolean): void {
    this.state.stateMap[name] = isActive;
    this.forceUpdate();
  }

  @autobind
  private _randomize(): void {
    for (let i in NAMES) {
      let newVal: boolean = Math.random() < .5 ? false : true;
      this.state.stateMap[NAMES[i]] = newVal;
    }
    this.forceUpdate();
  }

}


