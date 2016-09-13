import * as React from 'react';
import './Layer.Example.scss';
import {
  Checkbox,
  Layer,
  LayerHost
} from '../../../../index';

export class LayerHostedExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { showLayer: false };
  }

  public render() {
    let { showLayer } = this.state;
    let content = (
      <div className='LayerExample-content'>
        This is example layer content.
      </div>
    );

    return (
      <LayerHost className='LayerExample-customHost'>
        <p>
          In some cases, you may need to contain layered content within an area. Wrap the area with a LayerHost, and it will render content at the end of host's area.
        </p>

        <Checkbox
          label='Wrap the content box belowed in a Layer'
          checked={ showLayer }
          onChange={ (ev, checked) => this.setState({ showLayer: checked }) } />

        { showLayer ? <Layer>{ content }</Layer> : content }

        <div className='LayerExample-nonLayered'>I am normally below the content.</div>
      </LayerHost>
    );
  }
}
