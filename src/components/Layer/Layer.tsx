import * as React from 'react';
import './Layer.scss';
import * as ReactDom from 'react-dom';
import LayerHost from './LayerHost';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

export interface ILayerProps extends React.Props<Layer> {
  // Nothing for the moment.
}

export default class Layer extends React.Component<ILayerProps, {}> {
  private static _layerHost: LayerHost;
  private static _lastId: number = 0;

  private _id: string;

  constructor(props?: ILayerProps) {
    super(props);

    this._id = `${++Layer._lastId}`;
  }

  public render() {
    return (
      <div className='ms-Layer' />
    );
  }

  public componentWillMount() {
    if (!Layer._layerHost) {
      let hostElement = document.createElement('div');
      hostElement.setAttribute('id', LAYER_HOST_ELEMENT_ID);
      document.body.appendChild(hostElement);

      let layerHost: LayerHost = ReactDom.render((
        <LayerHost />
      ), hostElement) as LayerHost;

      Layer._layerHost = layerHost;
    }
  }

  public componentDidMount() {
    Layer._layerHost.addLayer({
      id: this._id,
      children: this.props.children
    });
  }

  public componentWillReceiveProps(props: ILayerProps) {
    Layer._layerHost.updateLayer({
      id: this._id,
      children: props.children
    });
  }

  public componentWillUnmount() {
    Layer._layerHost.removeLayer({
      id: this._id,
      children: []
    });
  }
}
