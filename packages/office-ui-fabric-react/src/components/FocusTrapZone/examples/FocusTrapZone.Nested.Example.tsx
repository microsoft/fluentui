import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

interface IFocusTrapComponentProps {
  zoneNumber: number;
  isActive: boolean;
  setIsActive: (zoneNumber: number, isActive: boolean) => void;
}

class FocusTrapComponent extends React.Component<IFocusTrapComponentProps> {
  public render() {
    const { isActive, zoneNumber, children } = this.props;

    return (
      <FocusTrapZone disabled={!isActive} forceFocusInsideTrap={false}>
        <Stack
          horizontalAlign="start"
          tokens={{ childrenGap: 10 }}
          styles={{
            root: { border: `2px solid ${isActive ? '#ababab' : 'transparent'}`, padding: 10 }
          }}
        >
          <Toggle
            checked={isActive}
            onChange={this._onFocusTrapZoneToggleChanged}
            label={'Enable trap zone ' + zoneNumber}
            onText="On (toggle to exit)"
            offText="Off"
            styles={{
              // Set a width on these toggles in the horizontal zone to prevent jumping when enabled
              root: zoneNumber >= 2 && zoneNumber <= 4 && { width: 200 }
            }}
          />
          <DefaultButton onClick={this._onStringButtonClicked} text={`Zone ${zoneNumber} button`} />
          {children}
        </Stack>
      </FocusTrapZone>
    );
  }

  private _onStringButtonClicked = (): void => {
    alert(`Button ${this.props.zoneNumber} clicked`);
  };

  private _onFocusTrapZoneToggleChanged = (ev: React.MouseEvent<HTMLElement>, isChecked: boolean): void => {
    this.props.setIsActive(this.props.zoneNumber, isChecked);
  };
}

export interface IFocusTrapZoneNestedExampleState {
  activeStates: { [key: number]: boolean };
}

export class FocusTrapZoneNestedExample extends React.Component<{}, IFocusTrapZoneNestedExampleState> {
  public state: IFocusTrapZoneNestedExampleState = { activeStates: {} };

  public render() {
    const { activeStates } = this.state;

    return (
      <div>
        <FocusTrapComponent zoneNumber={1} isActive={!!activeStates[1]} setIsActive={this._setIsActive}>
          <FocusTrapComponent zoneNumber={2} isActive={!!activeStates[2]} setIsActive={this._setIsActive}>
            <FocusTrapComponent zoneNumber={3} isActive={!!activeStates[3]} setIsActive={this._setIsActive} />
            <FocusTrapComponent zoneNumber={4} isActive={!!activeStates[4]} setIsActive={this._setIsActive} />
          </FocusTrapComponent>
          <FocusTrapComponent zoneNumber={5} isActive={!!activeStates[5]} setIsActive={this._setIsActive} />
        </FocusTrapComponent>
      </div>
    );
  }

  private _setIsActive = (zoneNumber: number, isActive: boolean): void => {
    const { activeStates } = this.state;
    this.setState({ activeStates: { ...activeStates, [zoneNumber]: isActive } });
  };
}
