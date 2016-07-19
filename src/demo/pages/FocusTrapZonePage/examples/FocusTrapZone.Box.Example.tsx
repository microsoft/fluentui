/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import { FocusTrapZone } from '../../../../index';
import './FocusTrapZone.Box.Example.scss';
import {
  Button,
  Link,
  TextField,
  Toggle
} from '../../../../index';

export interface IBoxExampleExampleState {
  isChecked: boolean;
}

export default class BoxExample extends React.Component<React.HTMLProps<HTMLDivElement>, IBoxExampleExampleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    toggle: HTMLElement;
  };
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  public render() {
    let { isChecked } = this.state;
    return (
      <div>
        <Button description='Focuses inside the FocusTrapZone' onClick={ this._onButtonClickHandler.bind(this) }>Go to Trap Zone</Button>

        {(() => {
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
        })()}
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
          ref='toggle'
          checked={ isChecked }
          onChanged={ this._onFocusTrapZoneToggleChanged.bind(this) }
          label='Focus Trap Zone'
          onText='On'
          offText='Off' />
        {(() => {
          if (isChecked) {
            return (
              <Button description='Exit Focus Trap Zone' onClick={ this._onExitButtonClickHandler.bind(this) }>Exit Focus Trap Zone</Button>
            );
          }
        })()}
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
    }, () => {
      let toggle = ReactDOM.findDOMNode(this.refs.toggle) as HTMLElement;

      if (toggle) {
        toggle.focus();
      }
    });
  }
}