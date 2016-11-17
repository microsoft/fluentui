import * as React from 'react';
import {
  BaseComponent,
  css,
  divProperties,
  getNativeProps,
  setVirtualParent
} from '../../Utilities';
import { ILayerProps } from './Layer.Props';
import './Layer.scss';

export interface IProjectedLayerProps extends React.Props<ProjectedLayer> {
  /** Indicates a unique id for the layer, if applicable. */
  layerId: string;

  /** Virtual parent element. */
  parentElement: HTMLElement;

  /** Indicates the layer to redirect to. */
  defaultRemoteProps: ILayerProps;
}

export interface IProjectedLayerState {
  isMounted: boolean;
}

/**
 * ProjectedLayer is an internal helper component that projects the contents rendered within a Layer. It is created
 * by the corresponding LayerHost that the originating Layer communicates with.
 */
export class ProjectedLayer extends BaseComponent<IProjectedLayerProps, IProjectedLayerState> {
  private _rootElement: HTMLElement;
  private _remoteProps: ILayerProps;

  constructor(props?: IProjectedLayerProps) {
    super(props);

    this.state = {
      isMounted: false
    };

    this._remoteProps = props.defaultRemoteProps;
  }

  public shouldComponentUpdate() {
    return !this.state.isMounted;
  }

  public componentDidMount() {
    setVirtualParent(this._rootElement, this.props.parentElement);
    this.setState({ isMounted: true });
  }

  public render() {
    let remoteProps = getNativeProps<React.HTMLProps<HTMLDivElement>>(this._remoteProps, divProperties);

    // If this is the first render, let's avoid rendering children until we're certain that we've set
    // the virtual parent. After that, we can safely render the children, which in turn can safely call
    // dom utilities like elementContains, which respects the virtual parent.

    if (!this.state.isMounted) {
      delete remoteProps.children;
    }

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
