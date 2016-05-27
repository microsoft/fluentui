import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { LayerHost, ILayer } from './LayerHost';
import './Layer.scss';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

let _instance = 0;
let _layerHost: LayerHost;

export class Layer extends React.Component<ILayerProps, {}> {
  private _layer: ILayer;

  constructor(props?: ILayerProps) {
    super(props);

    this._layer = {
      id: String(_instance++),
      children: props.children
    };
  }

  public render() {
    return (
      <div className='ms-Layer' />
    );
  }

  public componentWillMount() {
    if (!_layerHost) {
      let hostElement = document.createElement('div');
      hostElement.setAttribute('id', LAYER_HOST_ELEMENT_ID);
      document.body.appendChild(hostElement);

      let layerHost: LayerHost = ReactDOM.render((
        <LayerHost />
      ), hostElement) as LayerHost;

      _layerHost = layerHost;
    }
  }

  public componentDidMount() {
    _layerHost.addLayer(this._layer, this.props.onLayerMounted);
  }

  public componentWillReceiveProps(props: ILayerProps) {
    this._layer.children = props.children;

    _layerHost.updateLayer(this._layer);
  }

  public componentWillUnmount() {
    _layerHost.removeLayer(this._layer);
  }
}
