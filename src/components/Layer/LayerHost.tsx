import * as React from 'react';
import Fabric from '../Fabric/index';
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

export default class LayerHost extends React.Component<React.Props<LayerHost>, ILayerHostState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      layers: []
    };
  }

  public render() {
    let layers = this.state.layers.map((layer: ILayer) => {
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
    this.setState((state: ILayerHostState) => {
      let layers = state.layers.slice();

      layers.push(layerToAdd);

      return {
        layers: layers
      };
    }, onComplete);
  }

  public updateLayer(layerToUpdate: ILayer) {
    this.setState((state: ILayerHostState) => {
      let ids = state.layers.map((layer: ILayer) => layer.id);

      let layers = state.layers.slice();

      let index = ids.indexOf(layerToUpdate.id);

      if (index > -1) {
        layers.splice(index, 1, layerToUpdate);
      }

      return {
        layers: layers
      };
    });
  }

  public removeLayer(layerToRemove: ILayer) {
    this.setState((state: ILayerHostState) => {
      let ids = state.layers.map((layer: ILayer) => layer.id);

      let layers = state.layers.slice();

      let index = ids.indexOf(layerToRemove.id);

      if (index > -1) {
        layers.splice(index, 1);
      }

      return {
        layers: layers
      };
    });
  }
}