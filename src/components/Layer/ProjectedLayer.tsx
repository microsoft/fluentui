import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { LayerHost, ILayer } from './LayerHost';
import { BaseComponent, css, getId, assignExcept, setVirtualParent } from '../../Utilities';
import './Layer.scss';

const LAYER_HOST_ELEMENT_ID = 'ms-layer-host';

let _defaultHost: LayerHost;

export interface IProjectedLayerProps extends React.Props<ProjectedLayer> {
  /** Indicates a unique id for the layer, if applicable. */
  layerId: string;

  /** Virtual parent element. */
  parentElement: HTMLElement;

  /** Indicates the layer to redirect to. */
  defaultRemoteProps: any;
}

export interface IProjectedLayerState {
  remoteProps: any
};

/**
 * ProjectedLayer is an internal helper component that projects the contents rendered within a Layer. It is created
 * by the corresponding LayerHost that the originating Layer communicates with.
 */
export class ProjectedLayer extends BaseComponent<IProjectedLayerProps, IProjectedLayerState> {
  private _rootElement: HTMLElement;
  private _remoteProps: any;

  constructor(props?: IProjectedLayerProps) {
    super(props);

    this._remoteProps = props.defaultRemoteProps;
  }

  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount() {
    setVirtualParent(this._rootElement, this.props.parentElement);
  }

  public render() {
    let remoteProps = this._remoteProps;

    return (
      <div
        { ...remoteProps }
        className={ css('ms-ProjectedLayer', remoteProps.className) }
        ref={ this._resolveRef('_rootElement') }
        />
    );
  }

  public getId() {
    return this.props.layerId;
  }

  public projectProps(remoteProps: any) {
    this._remoteProps = remoteProps;
    this.forceUpdate();
  }
}
