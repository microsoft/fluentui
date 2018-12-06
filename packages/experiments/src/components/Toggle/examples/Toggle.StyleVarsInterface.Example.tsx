import * as React from 'react';
import { Toggle } from '../index';
import { IToggleStyleVariablesTypes } from '../Toggle.types';

const styleVars1: IToggleStyleVariablesTypes = {
  pillHoveredBackground: 'black',
  textColor: 'red'
};

const styleVars2: IToggleStyleVariablesTypes = {
  pillBackground: 'orange',
  pillJustifyContent: 'center',
  textColor: 'purple',
  thumbBackground: 'green'
};

const styleVars3: IToggleStyleVariablesTypes = {
  pillBackground: 'dimgrey',
  pillBorderColor: 'brown',
  textColor: 'darkred'
};

export class ToggleStyleVarsInterfaceExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Toggle defaultChecked={true} label="Example 1" onText="On" offText="Off" onChange={this._onChange} styleVariables={styleVars1} />
        <Toggle defaultChecked={false} label="Example 2" onText="On" offText="Off" onChange={this._onChange} styleVariables={styleVars2} />
        <Toggle defaultChecked={true} disabled={true} label="Example 3" onText="On - Disabled" offText="Off" styleVariables={styleVars3} />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
