import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import {
  BaseComponent,
  autobind,
  css,
  findIndex,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { ProjectedLayer } from './ProjectedLayer';
import { ILayerProps } from './Layer.Props';
import { ILayerHostProps } from './LayerHost.Props';
import './LayerHost.scss';

export interface ILayer {
  id: string;
  parentElement: HTMLElement;
  props: ILayerProps;
  onMounted: (projectedLayer: ProjectedLayer) => void;
}

const DEFAULT_HOST_ID = '__layerHost';
/**
 * LayerHost provides a wrapper that acts as a passthrough, rendering the given children within it, but also
 * appending a div at the end, which projects all content wrapped in the Layer components within. Projecting
 * DOM to the end of the document allows for overlaying and stacking scenarios.
 *
 * Normally you do not need to interact directly with LayerHost. If you render Layers within content that isn't
 * wrapped within a LayerHost, a LayerHost will be created and appended to the end of the document body, where
 * layer content will then be projected. However in some circumstances you want Layered content to be rendered
 * in a specific place rather than document body (for example in a popup window or contained within a scrollable
 * region.) In those cases, wrap the content wihtin a LayerHost.
 *
 * @example
 * <LayerHost>
 *   <Layer>I will at the end of LayerHost.</Layer>
 *   <div>I will render normally.</div>
 * </LayerHost>
 **/
export class LayerHost extends BaseComponent<ILayerHostProps, {}> {
  public static childContextTypes = {
    layerHost: React.PropTypes.object
  };

  private _layers: ILayer[];
  private _layerRefs: {
    [key: string]: ProjectedLayer
  };

  public static getDefault(layerElement: HTMLElement): LayerHost {
    let doc = layerElement.ownerDocument;
    let hostElement = doc.getElementById(DEFAULT_HOST_ID);

    if (hostElement) {
      return hostElement[DEFAULT_HOST_ID] as LayerHost;
    } else {
      hostElement = doc.createElement('div');
      hostElement.id = DEFAULT_HOST_ID;
      doc.body.appendChild(hostElement);

      let defaultHost = ReactDOM.render(<LayerHost isDefault />, hostElement) as LayerHost;

      hostElement[DEFAULT_HOST_ID] = defaultHost;

      return defaultHost;
    }
  }

  constructor(props: ILayerHostProps) {
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
    let divProps = getNativeProps(this.props, divProperties);

    return (
      <div { ...divProps } className={ css('ms-LayerHost', this.props.className, { 'ms-LayerHost--default': this.props.isDefault }) }>
        <Fabric>
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
      </div>
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