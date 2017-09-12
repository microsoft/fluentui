import { Checkbox } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CheckboxVPage extends React.Component<any, any> {
  public render() {
    return (
      <div style={ { backgroundColor: 'white' } } >
        <Checkbox
          className='Checkbox'
          label='Check Box'
          defaultChecked={ true }
        />
        <Checkbox
          className='CheckboxDisabled'
          label='Check Box Disabled'
          defaultChecked={ true }
          disabled={ true }
        />
      </div>
    );
  }
}