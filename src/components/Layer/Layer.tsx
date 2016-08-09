import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { LayerHost, ILayer } from './LayerHost';
import './Layer.scss';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

let _instance = 0;
let _layerHost: LayerHost;

export class Layer extends React.Component<ILayerProps, {}> {
  public static contextTypes = {
    isInLayer: React.PropTypes.bool
  };

  public context: {
    isInLayer: boolean;
  };

  private _layer: ILayer;

  constructor(props?: ILayerProps) {
    super(props);

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
    let useHostWindow: boolean = (this.props.hostWindow && !this.props.hostWindow.document.getElementById(LAYER_HOST_ELEMENT_ID));

    if (!_layerHost || useHostWindow) {
      let hostElement: HTMLElement;
      let hostDocument: Document = useHostWindow ? this.props.hostWindow.document : document;

      hostElement = hostDocument.createElement('div');
      hostElement.setAttribute('id', LAYER_HOST_ELEMENT_ID);
      hostDocument.body.appendChild(hostElement);

      let layerHost: LayerHost = ReactDOM.render((
        <LayerHost />
      ), hostElement) as LayerHost;

      _layerHost = layerHost;
    }
  }

  public componentDidMount() {
    if (!this.context.isInLayer) {
      _layerHost.addLayer(this._layer, this.props.onLayerMounted);
    } else {
      if (this.props.onLayerMounted) {
        this.props.onLayerMounted();
      }
    }
  }

  public componentWillReceiveProps(props: ILayerProps) {
    if (!this.context.isInLayer) {
      this._layer.children = props.children;
      _layerHost.updateLayer(this._layer);
    }
  }

  public componentWillUnmount() {
    if (!this.context.isInLayer) {
      _layerHost.removeLayer(this._layer);
    }
  }
}
