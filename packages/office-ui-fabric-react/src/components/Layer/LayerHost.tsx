import * as React from 'react';
import { css, getId, initializeComponentRef } from '../../Utilities';
import { ILayerHostProps, ILayerHost } from './LayerHost.types';
import { notifyHostChanged, registerLayerHost, unregisterLayerHost } from './Layer.notification';

export class LayerHost extends React.Component<ILayerHostProps> implements ILayerHost {
  public hostId: string;

  public rootRef: React.RefObject<HTMLDivElement>;

  constructor(props: ILayerHostProps) {
    super(props);

    const layerHostId = getId();

    const { id: hostId = layerHostId } = this.props;

    this.hostId = hostId;

    this.rootRef = React.createRef<HTMLDivElement>();

    initializeComponentRef(this);
  }

  public notifyLayersChanged(): void {
    // Nothing, since the default implementation of Layer Host does not need to react to layer changes.
  }

  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount(): void {
    registerLayerHost(this.hostId, this);
    notifyHostChanged(this.props.id!);
  }

  public componentWillUnmount(): void {
    unregisterLayerHost(this.hostId, this);
    notifyHostChanged(this.props.id!);
  }

  public render(): JSX.Element {
    return <div {...this.props} className={css('ms-LayerHost', this.props.className)} ref={this.rootRef} />;
  }
}
