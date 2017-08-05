/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import './FocusTrapZone.Box.Example.scss';

export interface IBoxExampleExampleState {
  isChecked: boolean;
}

export default class BoxExample extends React.Component<React.HTMLAttributes<HTMLDivElement>, IBoxExampleExampleState> {
  private _toggle: IToggle;

  constructor(props: React.HTMLAttributes<HTMLDivElement>) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  public render() {
    let { isChecked } = this.state;

    return (
      <div>
        <DefaultButton
          description='Focuses inside the FocusTrapZone'
          onClick={ this._onButtonClickHandler.bind(this) }
          text='Go to Trap Zone'
        />

        { (() => {
          if (isChecked) {
            return (
              <FocusTrapZone>
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
    let { isChecked } = this.state;

    return (
      <div className='ms-FocusTrapZoneBoxExample'>
        <TextField label='Default TextField' placeholder='Input inside Focus Trap Zone' className='' />
        <Link href='' className='' >Hyperlink inside FocusTrapZone</Link><br /><br />
        <Toggle
          componentRef={ toggle => this._toggle = toggle }
          checked={ isChecked }
          onChanged={ this._onFocusTrapZoneToggleChanged.bind(this) }
          label='Focus Trap Zone'
          onText='On'
          offText='Off' />
        { (() => {
          if (isChecked) {
            return (
              <DefaultButton
                description='Exit Focus Trap Zone'
                onClick={ this._onExitButtonClickHandler.bind(this) }
                text='Exit Focus Trap Zone'
              />
            );
          }
        })() }
      </div>
    );
  }

  private _onButtonClickHandler() {
    this.setState({
      isChecked: true
    });
  }

  private _onExitButtonClickHandler() {
    this.setState({
      isChecked: false
    });
  }

  private _onFocusTrapZoneToggleChanged(isChecked: boolean) {
    this.setState({
      isChecked: isChecked
    }, () => this._toggle.focus());
  }
}