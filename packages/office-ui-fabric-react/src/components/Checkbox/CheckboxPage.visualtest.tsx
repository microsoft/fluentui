import { Checkbox } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CheckboxVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <Checkbox className='Checkbox' label='Check box'
        defaultChecked={ true } />
      <Checkbox className='CheckboxDisbaled' label='Check box'
        defaultChecked={ true }
        disabled={ true } />
    </div>;
  }
}