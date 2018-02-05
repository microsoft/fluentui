/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { autobind } from '../../../Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import './FocusTrapZone.Box.Example.scss';

export interface IBoxNoClickExampleExampleState {
  isToggled: boolean;
}

export default class BoxNoClickExample extends React.Component<React.HTMLAttributes<HTMLDivElement>, IBoxNoClickExampleExampleState> {
  private _toggle: IToggle;

  constructor(props: React.HTMLAttributes<HTMLDivElement>) {
    super(props);

    this.state = {
      isToggled: false,
    };
  }

  public render() {
    let { isToggled } = this.state;

    return (
      <div>
        <DefaultButton
          description='Focuses inside the FocusTrapZone'
          onClick={ this._onButtonClickHandler }
          text='Go to Trap Zone'
        />

        { (() => {
          if (isToggled) {
            return (
              <FocusTrapZone isClickableOutsideFocusTrap={ true } forceFocusInsideTrap={ false }>
                { this._internalContents() }
              </FocusTrapZone>
            );
          } else {
            return (
              <div>
                { this._internalContents() }
              </div>
            );
          }
        })() }
      </div>
    );
  }

  private _internalContents() {
    let { isToggled } = this.state;

    return (
      <div className='ms-FocusTrapZoneBoxExample'>
        <TextField label='Default TextField' placeholder='Input inside Focus Trap Zone' className='' />
        <Link href='' className='' >Hyperlink inside FocusTrapZone</Link><br /><br />
        <Toggle
          componentRef={ this._setRef }
          checked={ isToggled }
          onChanged={ this._onFocusTrapZoneToggleChanged }
          label='Focus Trap Zone'
          onText='On'
          offText='Off'
        />
        { (() => {
          if (isToggled) {
            return (
              <DefaultButton
                description='Exit Focus Trap Zone'
                onClick={ this._onExitButtonClickHandler }
                text='Exit Focus Trap Zone'
              />
            );
          }
        })() }
      </div>
    );
  }

  @autobind
  private _onButtonClickHandler() {
    this.setState({
      isToggled: true
    });
  }

  @autobind
  private _onExitButtonClickHandler() {
    this.setState({
      isToggled: false
    });
  }

  @autobind
  private _onFocusTrapZoneToggleChanged(isToggled: boolean) {
    this.setState({
      isToggled: isToggled
    }, () => this._toggle.focus());
  }

  @autobind
  private _setRef(toggle: IToggle): void {
    this._toggle = toggle;
  }
}