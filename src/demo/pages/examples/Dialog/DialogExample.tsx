import * as React from 'react';
import Dialog from '../../../../components/Dialog';

export default class DialogExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DialogExample'>
        <h1>Dialog example</h1>
        <Dialog />
      </div>
    );
  }

}
