
import * as React from 'react';

import { IPortal, PortalStatus } from '../../utilities/Portal/IPortal';

export interface ILayerPortalHostProps extends React.Props<LayerPortalHost> {
  portals: IPortal<void>[];
}

export interface ILayerPortalHostState {
  // Nothing special.
}

/**
 * Provides a host for portal content which should be rendered as individual layers on a glass pane.
 *
 * @export
 * @class LayerPortalHost
 * @extends {React.Component<ILayerPortalHostProps, ILayerPortalHostState>}
 */
export class LayerPortalHost extends React.Component<ILayerPortalHostProps, ILayerPortalHostState> {
  public render(): JSX.Element {
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
