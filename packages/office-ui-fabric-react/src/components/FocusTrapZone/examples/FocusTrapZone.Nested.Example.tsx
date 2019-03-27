import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const contentClass = mergeStyles({
  border: '2px solid black',
  padding: 5
});

interface IFocusTrapComponentProps {
  name: string;
  isActive: boolean;
  setIsActive: (name: string, isActive: boolean) => void;
}

interface IFocusTrapComponentState {
  stateMap: { [key: string]: boolean };
}

class FocusTrapComponent extends React.Component<IFocusTrapComponentProps, IFocusTrapComponentState> {
  public render() {
    const contents = (
      <div className={contentClass}>
        <DefaultButton onClick={this._onStringButtonClicked} text={this.props.name} />
        <Toggle
          defaultChecked={this.props.isActive}
          onChange={this._onFocusTrapZoneToggleChanged}
          label="Focus Trap Zone"
          onText="On"
          offText="Off"
        />
        {this.props.children}
      </div>
    );

    if (this.props.isActive) {
      return <FocusTrapZone forceFocusInsideTrap={false}>{contents}</FocusTrapZone>;
    }
    return contents;
  }

  private _onStringButtonClicked = (): void => {
    console.log(this.props.name);
  };

  private _onFocusTrapZoneToggleChanged = (ev: React.MouseEvent<HTMLElement>, isChecked: boolean): void => {
    this.props.setIsActive(this.props.name, isChecked);
  };
}

export interface IFocusTrapZoneNestedExampleState {
  stateMap: { One?: boolean; Two?: boolean; Three?: boolean; Four?: boolean; Five?: boolean };
}

type Name = keyof IFocusTrapZoneNestedExampleState['stateMap'];
const NAMES: Name[] = ['One', 'Two', 'Three', 'Four', 'Five'];

export class FocusTrapZoneNestedExample extends React.Component<{}, IFocusTrapZoneNestedExampleState> {
  public state: IFocusTrapZoneNestedExampleState = { stateMap: {} };

  public render() {
    const { stateMap } = this.state;

    return (
      <div>
        <FocusTrapComponent name="One" isActive={!!stateMap.One} setIsActive={this._setIsActive}>
          <FocusTrapComponent name="Two" isActive={!!stateMap.Two} setIsActive={this._setIsActive}>
            <FocusTrapComponent name="Three" isActive={!!stateMap.Three} setIsActive={this._setIsActive} />
            <FocusTrapComponent name="Four" isActive={!!stateMap.Four} setIsActive={this._setIsActive} />
          </FocusTrapComponent>
          <FocusTrapComponent name="Five" isActive={!!stateMap.Five} setIsActive={this._setIsActive} />
        </FocusTrapComponent>
        <DefaultButton onClick={this._randomize}>Randomize</DefaultButton>
      </div>
    );
  }

  private _setIsActive = (name: Name, isActive: boolean): void => {
    this.state.stateMap[name] = isActive;
    this.forceUpdate();
  };

  private _randomize = (): void => {
    NAMES.forEach(name => {
      this.state.stateMap[name] = Math.random() >= 0.5;
    });

    this.forceUpdate();
  };
}
