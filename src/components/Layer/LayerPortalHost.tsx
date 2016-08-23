
import * as React from 'react';

import { IPortal, PortalStatus } from '../../utilities/portal/IPortal';

export interface ILayerPortalHostProps extends React.Props<LayerPortalHost> {
  portals: IPortal<void>[];
}

export interface ILayerPortalHostState {
  // Nothing special.
}

export class LayerPortalHost extends React.Component<ILayerPortalHostProps, ILayerPortalHostState> {
  public render() {
    let {
      portals = []
    } = this.props;

    let layerElements = portals.filter(({
      status
    }: IPortal<void>) => {
      return status === PortalStatus.opened;
    }).map(({
      children,
      id: {
        id
      }
    }: IPortal<void>) => {
      return (
        <div className='ms-LayerHost-layer' key={ id }>
          { children }
        </div>
      );
    });

    return (
      <div className='ms-LayerHost'>
        { layerElements }
      </div>
    );
  }
}
