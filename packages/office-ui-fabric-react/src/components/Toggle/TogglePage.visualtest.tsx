import { Toggle } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ToggleVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div>
        <Toggle
          id='ToggleEnabledChecked'
          defaultChecked={ true }
          label='Enabled and checked'
          onText='On'
          offText='Off' />
      </div>
      <div>
        <Toggle
          id='ToggleEnabledUnchecked'
          defaultChecked={ false }
          label='Enabled and unchecked'
          onText='On'
          offText='Off' /></div>
      <div>
        <Toggle
          id='ToggleDisabledChecked'
          defaultChecked={ true }
          disabled={ true }
          label='Disabled and checked'
          onText='On'
          offText='Off' /></div>
      <div>
        <Toggle
          id='ToggleDisabledUnchecked'
          defaultChecked={ false }
          disabled={ true }
          label='Disabled and unchecked'
          onText='On'
          offText='Off' /></div>
    </div>;
  }
}
