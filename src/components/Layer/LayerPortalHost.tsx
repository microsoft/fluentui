
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

    let layerElements = portals.filter((portal: IPortal<void>) => {
      let {
        status
      } = portal;

      return status === PortalStatus.opened;
    }).map((portal: IPortal<void>) => {
      let {
        children,
        id: {
          id
        }
      } = portal;

      return (
        <div className="ms-LayerHost-layer" key={ id }>
          { children }
        </div>
      );
    });

    return (
      <div className="ms-LayerHost">
        { layerElements }
      </div>
    );
  }
}
