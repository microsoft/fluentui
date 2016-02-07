import * as React from 'react';
import Label from '../../../components/label/Label';

export default class LabelExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='LabelExample'>
        <h1>Label</h1>

        <Label>I'm a Label</Label>
      </div>
    );
  }

}
