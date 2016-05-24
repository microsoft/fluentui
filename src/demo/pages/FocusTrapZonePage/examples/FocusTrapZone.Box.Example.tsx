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
  isToggled: boolean;
}

export default class BoxExample extends React.Component<React.HTMLProps<HTMLDivElement>, IBoxExampleExampleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    toggle: HTMLElement;
  };
  constructor(props) {
    super(props);

    this.state = {
      isToggled: false,
    };
  }

  public render() {
    let { isToggled } = this.state;

    return (
      <div>
        <Button description='Focuses inside the FocusTrapZone' onClick={ this._onButtonClickHandler.bind(this) }>Go to Trap Zone</Button>

        {(() => {
          if (isToggled) {
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
    let { isToggled } = this.state;

    return (
      <div className='ms-FocusTrapZone'>
        <TextField label='Default TextField' placeholder='Input inside Focus Trap Zone' className='' />
        <Link href='' className='' >Hyperlink inside FocusTrapZone</Link><br /><br />
        <Toggle
          ref='toggle'
          isToggled={ isToggled }
          onChanged={ this._onFocusTrapZoneToggleChanged.bind(this) }
          label='Focus Trap Zone'
          onText='On'
          offText='Off' />
        {(() => {
          if (isToggled) {
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
      isToggled: true
    });
  }

  private _onExitButtonClickHandler() {
    this.setState({
      isToggled: false
    });
  }

  private _onFocusTrapZoneToggleChanged(isToggled: boolean) {
    this.setState({
      isToggled: isToggled
    }, () => {
      let toggle = ReactDOM.findDOMNode(this.refs.toggle) as HTMLElement;

      if (toggle) {
        toggle.focus();
      }
    });
  }
}