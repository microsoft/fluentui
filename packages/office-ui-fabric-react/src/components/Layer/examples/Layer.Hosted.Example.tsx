import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Layer, LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './Layer.Example.scss';
import { AnimationClassNames } from '../../../Styling';

export class LayerHostedExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      showLayer: false,
      showHost: true
    };
  }

  public render() {
    let { showLayer, showHost } = this.state;
    let content = (
      <div className={ 'LayerExample-content ' + AnimationClassNames.scaleUpIn100 } >
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
          In some cases, you may need to contain layered content within an area. Create an instance of a LayerHost along with an id, and provide a hostId on the layer to render it within the specific host. (Note that it's important that you don't include children within the LayerHost. It's meant to contain Layered content only.)
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
