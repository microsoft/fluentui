
import * as React from 'react';
import { IPortalNexus } from './PortalNexus';
import { PortalNexusKey } from './PortalNexusKey';

export interface IPortalContext {
  portalNexusByKeyId?: {
    [nexusKeyId: string]: IPortalNexus<any>;
  };
}

export const PORTAL_CONTEXT_PROP_TYPES = {
  portalNexusByKeyId: React.PropTypes.object
};

export function setPortalNexus<TOptions>(nexusKey: PortalNexusKey<TOptions>, nexus: IPortalNexus<TOptions>, context: IPortalContext = {}): IPortalContext {
  let {
    id
  } = nexusKey;

  // TODO Merge this with an existing provided context.
  context.portalNexusByKeyId = {
    [id]: nexus
  };

  return context;
}

export function getPortalNexus<TOptions>(nexusKey: PortalNexusKey<TOptions>, context: IPortalContext = {}): IPortalNexus<TOptions> {
  let nexus: IPortalNexus<TOptions>;

  let {
    id
  } = nexusKey;

  if (isPortalContext(context)) {
    nexus = context.portalNexusByKeyId[id];
  }

  if (!nexus) {
    nexus = nexusKey.nexus;
  }

  return nexus;
}

export function isPortalContext(context?: IPortalContext): context is IPortalContext {
  return !!context && !!context.portalNexusByKeyId;
}
