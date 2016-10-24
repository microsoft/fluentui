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

/**
 * ProjectedLayer is an internal helper component that projects the contents rendered within a Layer. It is created
 * by the corresponding LayerHost that the originating Layer communicates with.
 */
export class ProjectedLayer extends BaseComponent<IProjectedLayerProps, {}> {
  private _rootElement: HTMLElement;
  private _remoteProps: ILayerProps;

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
    let remoteProps = getNativeProps<React.HTMLProps<HTMLDivElement>>(this._remoteProps, divProperties);

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
