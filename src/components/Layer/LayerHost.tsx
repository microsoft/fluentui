import * as React from 'react';
import { Fabric } from '../../Fabric';
import { autobind, findIndex } from '../../Utilities';
import { ProjectedLayer } from './ProjectedLayer';
import { ILayerProps } from './Layer.Props';

export interface ILayer {
  id: string;
  parentElement: HTMLElement;
  props: ILayerProps;
  onMounted: (projectedLayer: ProjectedLayer) => void;
}

/**
 * LayerHost provides a wrapper that acts as a passthrough, rendering the given children within it, but also
 * appending a div at the end, which projects all content wrapped in the Layer components within. Projecting
 * DOM to the end of the document allows for overlaying and stacking scenarios.
 *
 * Normally you do not need to interact directly with LayerHost. If you render Layers within content that isn't
 * wrapped within a LayerHost, a LayerHost will be created and appended to the end of the document body, where
 * layer content will then be projected. However in some circumstances you want Layered content to be rendered
 * in a specific place rather than document body (for example in a popup window or contained within a scrollable
 * region.) In those cases, wrap the content wihtin a LayerHost:
 *
 * <LayerHost>
 *   <Layer>I'm rendered on top.</Layer>
 *   <div>I am render on bottom.</div>
 * </LayerHost>
 **/
export class LayerHost extends React.Component<React.Props<LayerHost>, {}> {
  public static childContextTypes = {
    layerHost: React.PropTypes.object
  };

  private _layers: ILayer[];
  private _layerRefs: {
    [key: string]: ProjectedLayer
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      layers: []
    };

    this._layers = [];
    this._layerRefs = {};
  }

  public getChildContext() {
    return {
      layerHost: this as LayerHost
    };
  }

  public render() {
    return (
      <Fabric className='ms-LayerHost'>
        { this.props.children }
        <div className='ms-LayerHost-overlay'>
          { this._layers.map(layer => (
            <ProjectedLayer
              key={ layer.id }
              layerId={ layer.id }
              parentElement={ layer.parentElement }
              defaultRemoteProps={ layer.props }
              ref={ this._resolveLayer }
              />
          )) }
        </div>
      </Fabric>
    );
  }

  public addLayer(id: string, parentElement: HTMLElement, props: ILayerProps, onMounted: (proxyLayer: ProjectedLayer) => void) {
    this._layers.push({
      id,
      parentElement,
      props,
      onMounted
    });
    this.forceUpdate();
  }

  public removeLayer(id: string) {
    let index = findIndex(this._layers, layer => layer.id === id);

    if (index >= 0) {
      this._layers.splice(index, 1);
      delete this._layerRefs[id];
      this.forceUpdate();
    }
  }

  @autobind
  private _resolveLayer(projectedLayer: ProjectedLayer) {
    if (projectedLayer) {
      let layerId = projectedLayer.getId();
      let index = findIndex(this._layers, layer => layer.id === layerId);

      if (index >= 0 && this._layerRefs[layerId] !== projectedLayer) {
        this._layerRefs[layerId] = projectedLayer;
        this._layers[index].onMounted(projectedLayer);
      }
    }
  }

}