import { Label } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class LabelVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { backgroundColor: 'white' } } >
      <Label className='Label'>This is a label</Label>
      <Label className='LabelDisabled' disabled={ true } >This is a disabled label</Label>
      <Label className='LabelRequired' required={ true }>This is a required label</Label>
    </div>;
  }
}