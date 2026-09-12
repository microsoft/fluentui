'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DashboardGridRegistry } from './DashboardGridRegistry.types';

export type DashboardGridHostPortalsProps = {
  registry: DashboardGridRegistry;
};

export const DashboardGridHostPortals = (props: DashboardGridHostPortalsProps): JSXElement => {
  const { registry } = props;
  const snapshot = useSyncExternalStore(
    registry.itemHosts.subscribe,
    registry.itemHosts.getSnapshot,
    registry.itemHosts.getSnapshot,
  );

  const setParkingElement = React.useCallback(
    (element: HTMLDivElement | null) => {
      registry.setParkingElement(element);
    },
    [registry],
  );

  return (
    <>
      <div ref={setParkingElement} data-dashboard-grid-host-parking="" style={{ display: 'contents' }} />
      {snapshot.items.map(record =>
        record.host && record.content !== undefined
          ? ReactDOM.createPortal(record.content, record.host, record.id)
          : null,
      )}
    </>
  );
};
