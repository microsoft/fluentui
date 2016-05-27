import * as React from 'react';
import { Fabric } from '../../Fabric';

export interface ILayer {
  /**
   * The React children of the layer.
   */
  children: any;
  /**
   * The unique id for the layer.
   */
  id: string;
}

export interface ILayerHostState extends React.Props<LayerHost> {
  layers: ILayer[];
}

export class LayerHost extends React.Component<React.Props<LayerHost>, ILayerHostState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      layers: []
    };
  }

  public render() {
    let layers = this.state.layers.map((layer: ILayer, index: number) => {
      return (
        <div className='ms-LayerHost-layer' key={ layer.id }>
          { layer.children }
        </div>
      );
    });

    return (
      <Fabric className='ms-LayerHost'>
        { layers }
      </Fabric>
    );
  }

  public addLayer(layerToAdd: ILayer, onComplete?: () => void) {
    let { layers } = this.state;

    this.setState({
      layers: layers.concat([ layerToAdd ])
    }, () => {
      if (onComplete) {
        onComplete();
      }
    });
  }

  public updateLayer(layerToUpdate: ILayer) {
    this.forceUpdate();
  }

  public removeLayer(layerToRemove: ILayer) {
    let { layers } = this.state;
    let index = layers.indexOf(layerToRemove);

    if (index > -1) {
      layers.splice(index, 1);
      this.forceUpdate();
    }
  }

}