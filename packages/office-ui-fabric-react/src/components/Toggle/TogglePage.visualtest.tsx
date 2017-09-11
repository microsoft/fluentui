import { Toggle } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ToggleVPage extends React.Component<any, any> {
  public render() {
    return (
      <div >
        <Toggle
          className='Toggle'
          defaultChecked={ true }
          label='Enabled and checked'
          onAriaLabel='This toggle is checked. Press to uncheck.'
          offAriaLabel='This toggle is unchecked. Press to check.'
          onText='On'
          offText='Off'
        />
      </div>
    );
  }
}