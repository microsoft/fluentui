import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IFocusTrapZoneBoxCustomElementExampleState {
  isChecked: boolean;
}

export class FocusTrapZoneBoxCustomElementExample extends React.Component<{}, IFocusTrapZoneBoxCustomElementExampleState> {
  public state: IFocusTrapZoneBoxCustomElementExampleState = {
    isChecked: false
  };

  private _toggle: IToggle;
  private focusClassName = 'shouldFocusInput';

  public render() {
    const { isChecked } = this.state;

    return (
      <div>
        <DefaultButton onClick={this._onButtonClickHandler} text="Go to Trap Zone" />
        {(() => {
          if (isChecked) {
            return <FocusTrapZone firstFocusableSelector={this.focusClassName}>{this._internalContents()}</FocusTrapZone>;
          } else {
            return <div>{this._internalContents()}</div>;
          }
        })()}
      </div>
    );
  }

  private _internalContents() {
    const { isChecked } = this.state;

    return (
      <div className="ms-FocusTrapZoneBoxExample">
        <TextField label="Default TextField" placeholder="Input inside Focus Trap Zone" className="" />
        <Link href="" className="">
          Hyperlink inside FocusTrapZone
        </Link>
        <br />
        <br />
        <div>
          <Toggle
            componentRef={this._setRef}
            checked={isChecked}
            onChange={this._onFocusTrapZoneToggleChanged}
            label="Focus Trap Zone"
            onText="On"
            offText="Off"
          />
        </div>
        {(() => {
          if (isChecked) {
            return (
              <DefaultButton
                className={this.focusClassName}
                secondaryText="Exit Focus Trap Zone"
                onClick={this._onExitButtonClickHandler}
                text="Exit Focus Trap Zone"
              />
            );
          }
        })()}
      </div>
    );
  }

  private _onButtonClickHandler = (): void => {
    this.setState({
      isChecked: true
    });
  };

  private _onExitButtonClickHandler = (): void => {
    this.setState({
      isChecked: false
    });
  };

  private _onFocusTrapZoneToggleChanged = (ev: React.MouseEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState(
      {
        isChecked: isChecked
      },
      () => this._toggle.focus()
    );
  };

  private _setRef = (toggle: IToggle): void => {
    this._toggle = toggle;
  };
}
