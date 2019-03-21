import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
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
      isChecked: false
    };
  }

  public render() {
    const { isChecked } = this.state;

    return (
      <div>
        <DefaultButton secondaryText="Focuses inside the FocusTrapZone" onClick={this._onButtonClickHandler} text="Go to Trap Zone" />
        {(() => {
          if (isChecked) {
            return (
              <FocusTrapZone forceFocusInsideTrap={true} focusPreviouslyFocusedInnerElement={true}>
                {this._internalContents()}
              </FocusTrapZone>
            );
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
        <TextField placeholder="Not tabbable" className="" tabIndex={-1} />
        <TextField placeholder="Not tabbable" className="" tabIndex={-1} />
        <TextField placeholder="Not tabbable" className="" tabIndex={-1} />
        <Toggle
          componentRef={this._setRef}
          checked={isChecked}
          onChange={this._onFocusTrapZoneToggleChanged}
          label="Focus Trap Zone"
          onText="On"
          offText="Off"
          tabIndex={-1}
        />
        {(() => {
          if (isChecked) {
            return (
              <DefaultButton
                secondaryText="Exit Focus Trap Zone"
                onClick={this._onExitButtonClickHandler}
                text="Exit Focus Trap Zone"
                tabIndex={-1}
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
