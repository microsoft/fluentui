import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { LayerHost, ILayer } from './LayerHost';
import './Layer.scss';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

let _instance = 0;
let _layerHost: { [key: string]: LayerHost };

export class Layer extends React.Component<ILayerProps, {}> {
  public static contextTypes = {
    isInLayer: React.PropTypes.bool
  };

  public context: {
    isInLayer: boolean;
  };

  private _layer: ILayer;
  private _hostWindow: Window;

  constructor(props?: ILayerProps) {
    if (!_layerHost) {
      _layerHost = {};
    }
    super(props);
    this._hostWindow = this.props.hostWindow ? this.props.hostWindow : window;
    if (this._hostWindow.name === '') {
      this._hostWindow.name = new Date().getTime().toString();
    }
    this._layer = {
      id: String(_instance++),
      children: props.children
    };
  }

  public render(): JSX.Element {
    let { isInLayer } = this.context;

    return isInLayer ? this.props.children as JSX.Element : null;
  }

  public componentWillMount() {
    // Test to see if there is a host window passed in, if there is and that window does not already have a layer
    // then the layer should be added to that window.
    // NOTE: The window must be within the same domain as the parent window or this will not be allowed.
    let layerHost: LayerHost = _layerHost[this._hostWindow.name];
    if (_layerHost !== undefined) {
      let hostElement: HTMLElement;
      let hostDocument: Document = this._hostWindow.document;

      hostElement = hostDocument.createElement('div');
      hostElement.setAttribute('id', LAYER_HOST_ELEMENT_ID);
      hostDocument.body.appendChild(hostElement);

      layerHost = ReactDOM.render((
        <LayerHost />
      ), hostElement) as LayerHost;

      _layerHost[this._hostWindow.name] = layerHost;
    }
  }

  public componentDidMount() {
    if (!this.context.isInLayer) {
      _layerHost[this._hostWindow.name].addLayer(this._layer, this.props.onLayerMounted);
    } else {
      if (this.props.onLayerMounted) {
        this.props.onLayerMounted();
      }
    }
  }

  public componentWillReceiveProps(props: ILayerProps) {
    if (!this.context.isInLayer) {
      this._layer.children = props.children;
      _layerHost[this._hostWindow.name].updateLayer(this._layer);
    }
  }

  public componentWillUnmount() {
    if (!this.context.isInLayer) {
      _layerHost[this._hostWindow.name].removeLayer(this._layer);
    }
  }

}
