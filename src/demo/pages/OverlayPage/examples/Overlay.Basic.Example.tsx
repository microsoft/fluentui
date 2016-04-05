import * as React from 'react';
import {
  Overlay
} from '../../../../components/index';

import './Overlay.Basic.Example.scss';

export default class OverlayBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Overlay>
        <div className='ms-OverlayBasicExample'>
          <p>This is an overlay.</p>
        </div>
      </Overlay>
    );
  }
}
