import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle, IToggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const contentClass = mergeStyles({
  border: '1px dashed #ababab'
});

export interface IFocusTrapZoneBoxExampleState {
  isChecked: boolean;
}

export class FocusTrapZoneBoxExample extends React.Component<{}, IFocusTrapZoneBoxExampleState> {
  public state: IFocusTrapZoneBoxExampleState = {
    isChecked: false
  };

  private _toggle: IToggle;

  public render() {
    const { isChecked } = this.state;

    return (
      <div>
        <DefaultButton secondaryText="Focuses inside the FocusTrapZone" onClick={this._onButtonClickHandler} text="Go to Trap Zone" />

        {(() => {
          if (isChecked) {
            return <FocusTrapZone>{this._internalContents()}</FocusTrapZone>;
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
      <div className={contentClass}>
        <TextField label="Default TextField" placeholder="Input inside Focus Trap Zone" className="" />
        <Link href="">Hyperlink inside FocusTrapZone</Link>
        <br />
        <br />
        <Toggle
          componentRef={this._setRef}
          checked={isChecked}
          onChange={this._onFocusTrapZoneToggleChanged}
          label="Focus Trap Zone"
          onText="On"
          offText="Off"
        />
        {(() => {
          if (isChecked) {
            return (
              <DefaultButton secondaryText="Exit Focus Trap Zone" onClick={this._onExitButtonClickHandler} text="Exit Focus Trap Zone" />
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
