import * as React from 'react';
import { Toggle } from '../index';
import { IToggleViewProps, IToggleStyleVariablesTypes } from '../Toggle.types';

const styleVarsFunction = (props: IToggleViewProps): IToggleStyleVariablesTypes => {
  const toggleVariables: IToggleStyleVariablesTypes = {};

  toggleVariables.textColor = 'red';

  if (!props.disabled) {
    toggleVariables.pillBackground = 'turquoise';
    if (props.checked) {
      toggleVariables.pillBackground = 'navy';
    }
  } else {
    toggleVariables.pillBackground = 'gainsboro';
    if (props.checked) {
      toggleVariables.pillBackground = 'slategrey';
    }
  }

  if (props.checked) {
    toggleVariables.textColor = 'green';
  }

  return toggleVariables;
};

export class ToggleStyleVarsFunctionExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Toggle
          defaultChecked={true}
          label="Enabled and checked"
          onText="On"
          offText="Off"
          onChange={this._onChange}
          styleVariables={styleVarsFunction}
        />
        <Toggle
          defaultChecked={false}
          label="Enabled and unchecked"
          onText="On"
          offText="Off"
          onChange={this._onChange}
          styleVariables={styleVarsFunction}
        />
        <Toggle
          defaultChecked={true}
          disabled={true}
          label="Disabled and checked"
          onText="On"
          offText="Off"
          styleVariables={styleVarsFunction}
        />
        <Toggle
          defaultChecked={false}
          disabled={true}
          label="Disabled and unchecked"
          onText="On"
          offText="Off"
          styleVariables={styleVarsFunction}
        />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
