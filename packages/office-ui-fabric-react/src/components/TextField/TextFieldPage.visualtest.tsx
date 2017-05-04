import { TextField } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class TextFieldVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <div> <TextField
        className='TextField'
        label='TextField'
      /></div>&nbsp;

      <div> <TextField
        className='TextFieldIcon'
        label='TextFieldIcon'
        iconClass='ms-Icon--Calendar ms-Icon'
      /></div>&nbsp;
    </div>;
  }
}