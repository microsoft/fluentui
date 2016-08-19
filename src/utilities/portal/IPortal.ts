
import * as React from 'react';

export enum PortalStatus {
  initialized,
  opened,
  closed
}

export interface IPortalId<TOptions> {
  _PortalId_Brand: boolean;
  id: string;
}

export interface IPortal<TOptions> {
  id: IPortalId<TOptions>;
  children: React.ReactNode;
  options: TOptions;
  status: PortalStatus;
}
