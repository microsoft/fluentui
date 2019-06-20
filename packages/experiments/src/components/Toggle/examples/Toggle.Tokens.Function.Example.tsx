import * as React from 'react';
import { IToggleComponent, IToggleTokenReturnType, Toggle } from '@uifabric/experiments';

const toggleTokens: IToggleComponent['tokens'] = (props): IToggleTokenReturnType => {
  return {
    ...(props.checked ? { textColor: 'green' } : { textColor: 'red' }),
    ...(props.disabled
      ? { ...{ pillBackground: 'gainsboro' }, ...(props.checked ? { pillBackground: 'slategrey' } : {}) }
      : { ...{ pillBackground: 'turquoise' }, ...(props.checked ? { pillBackground: 'navy' } : {}) })
  };
};

export class ToggleTokensFunctionExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Toggle
          defaultChecked={true}
          label="Enabled and checked"
          onText="On"
          offText="Off"
          onChange={this._onChange}
          tokens={toggleTokens}
        />
        <Toggle
          defaultChecked={false}
          label="Enabled and unchecked"
          onText="On"
          offText="Off"
          onChange={this._onChange}
          tokens={toggleTokens}
        />
        <Toggle defaultChecked={true} disabled={true} label="Disabled and checked" onText="On" offText="Off" tokens={toggleTokens} />
        <Toggle defaultChecked={false} disabled={true} label="Disabled and unchecked" onText="On" offText="Off" tokens={toggleTokens} />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
