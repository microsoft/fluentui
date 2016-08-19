
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';

import { PortalNexusKey } from '../../utilities/portal/PortalNexusKey';
import { PortalNexus, IOnPortalsChangeEventArgs, PORTALS_CHANGE_EVENT_NAME } from '../../utilities/portal/PortalNexus';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { LayerPortalHost } from './LayerPortalHost';

const eventGroup = new EventGroup({});

const layerPortalNexus = new PortalNexus<void>();

let hostElement: HTMLDivElement;

function onPortalsChange({
  portals
}: IOnPortalsChangeEventArgs<void>) {
  if (!hostElement) {
    hostElement = document.createElement('div');
    document.body.appendChild(hostElement);
  }

  ReactDOM.render((
    <LayerPortalHost portals={ portals } />
  ), hostElement);
}

eventGroup.on(layerPortalNexus, PORTALS_CHANGE_EVENT_NAME, onPortalsChange);

export const layerPortalNexusKey: PortalNexusKey<void> = new PortalNexusKey<void>({
  name: 'layer',
  nexus: layerPortalNexus
});
