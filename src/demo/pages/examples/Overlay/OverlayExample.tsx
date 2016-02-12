import * as React from 'react';
import Overlay from '../../../../components/Overlay';

export default class OverlayExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='OverlayExample'>
        <h1>Overlay</h1>
        <Overlay />
      </div>
    );
  }

}
