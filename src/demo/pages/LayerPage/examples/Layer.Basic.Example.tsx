import * as React from 'react';
import './Layer.Basic.Example.scss';
import {
  Layer
} from '../../../../index';

export default class LayerBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Layer>
        <div className='ms-LayerBasicExample-content'>This is an example layer.</div>
      </Layer>
    );
  }
}
