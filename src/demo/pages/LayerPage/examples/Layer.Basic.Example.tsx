import * as React from 'react';
import './Layer.Basic.Example.scss';
import {
  Layer
} from '../../../../index';

export class LayerBasicExample extends React.Component<any, any> {

  public render() {
    return (
      <Layer>
        <div className='ms-LayerBasicExample-content'>
          <div>This is an example layer.</div>
          </div>
      </Layer>
    );
  }

}
