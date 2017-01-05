import * as React from 'react';
import './Layer.Example.scss';
import {
  Checkbox,
  Layer,
  Toggle,
  LayerHost
} from '../../../../index';

export class LayerHostedExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      showLayer: false,
      showHost: true
    };
  }

  public render() {
    let { showLayer, showHost} = this.state;
    let content = (
      <div className='LayerExample-content ms-u-scaleUpIn100'>
        This is example layer content.
      </div>
    );

    return (
      <div>
        <Toggle
          label='Show host'
          checked={ showHost }
          onChanged={ checked => this.setState({ showHost: checked }) } />

        { showHost && (
          <LayerHost id='layerhost1' className='LayerExample-customHost' />
        ) }

        <p id='foo'>
          In some cases, you may need to contain layered content within an area. Wrap the area with a LayerHost, and it will render content at the end of host's area.
        </p>

        <Checkbox
          label='Render the box below in a Layer and target it at hostId=layerhost1'
          checked={ showLayer }
          onChange={ (ev, checked) => this.setState({ showLayer: checked }) } />

        { showLayer ? (
          <Layer
            hostId='layerhost1'
            onLayerDidMount={ () => console.log('didmount') }
            onLayerWillUnmount={ () => console.log('willunmount') }
            >
            { content }
          </Layer>
        ) : content }

        <div className='LayerExample-nonLayered'>I am normally below the content.</div>

      </div>
    );
  }
}
