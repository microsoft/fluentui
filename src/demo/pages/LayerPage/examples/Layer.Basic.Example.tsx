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
          <Layer>
            <div>Layers should act as passthroughs, when nested. This text content is in a nested layer and should be rendered as a descendant of the parent div.</div>
          </Layer>
        </div>
      </Layer>
    );
  }
}
