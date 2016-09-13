import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { LayerHost, ILayer } from './LayerHost';
import { ProjectedLayer } from './ProjectedLayer';
import { BaseComponent, css, getId, assignExcept, setVirtualParent } from '../../Utilities';
import './Layer.scss';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

let _defaultHost: LayerHost;

export class Layer extends BaseComponent<ILayerProps, {}> {
  public static contextTypes = {
    layerHost: React.PropTypes.object
  };

  public context: {
    layerHost: LayerHost;
  };

  private _rootElement: HTMLElement;
  private _projectedLayer: ProjectedLayer;
  private _layerHost: LayerHost;
  private _id: string;

  constructor(props?: ILayerProps) {
    super(props);

    this._id = getId();
  }

  public componentDidMount() {
    let layerHost = this.context.layerHost || _getDefaultLayerHost();

    this._layerHost = layerHost;

    layerHost.addLayer(this._id, this._rootElement, this.props, (projectedLayer) => {
      this._projectedLayer = projectedLayer;

      if (this.props.onLayerMounted) {
        this.props.onLayerMounted();
      }
    });
  }

  public componentWillUnmount() {
    this._layerHost.removeLayer(this._id);
  }

  public componentWillReceiveProps(newProps: ILayerProps) {
    if (this._projectedLayer) {
      this._projectedLayer.projectProps(newProps);
    }
  }

  public forceUpdate() {
    if (this._projectedLayer) {
      this._projectedLayer.forceUpdate();
    }
  }

  public render() {
    return (
      <span
        className='ms-Layer'
        ref={ this._resolveRef('_rootElement') }
        />
    );
  }
}

function _getDefaultLayerHost() {
  if (!_defaultHost) {
    let hostElement = document.createElement('div');

    hostElement.setAttribute('id', LAYER_HOST_ELEMENT_ID);
    document.body.appendChild(hostElement);
    _defaultHost = ReactDOM.render(<LayerHost />, hostElement) as any;
  }

  return _defaultHost;
}
