import type * as React from 'react';

export type DashboardGridItemHostSnapshot = {
  revision: number;
  items: readonly DashboardGridItemHostRecord[];
};

export type DashboardGridItemHostRecord = {
  id: string;
  gridId?: string;
  host: HTMLDivElement | null;
  content: React.ReactNode;
};

export type DashboardGridItemHostRegistry = {
  getSnapshot(): DashboardGridItemHostSnapshot;
  subscribe(listener: () => void): () => void;
  ensureHost(id: string, targetDocument: Document | null | undefined): HTMLDivElement | null;
  setContent(id: string, content: React.ReactNode, gridId?: string): void;
  setOwner(id: string, gridId: string | undefined): void;
  attach(id: string, container: HTMLElement): HTMLDivElement | null;
  park(id: string, container?: HTMLElement | null): void;
  setParkingElement(element: HTMLElement | null): void;
  get(id: string): DashboardGridItemHostRecord | undefined;
  remove(id: string): void;
  dispose(): void;
};

type MutableHostRecord = {
  id: string;
  gridId?: string;
  host: HTMLDivElement | null;
  content: React.ReactNode;
};

const createHost = (id: string, targetDocument: Document): HTMLDivElement => {
  const host = targetDocument.createElement('div');
  host.dataset.dashboardGridItemHost = id;
  host.style.display = 'contents';
  return host;
};

export const createDashboardGridItemHostRegistry = (): DashboardGridItemHostRegistry => {
  const records = new Map<string, MutableHostRecord>();
  let parkingElement: HTMLElement | null = null;
  let listeners: Array<() => void> = [];
  let revision = 0;
  let snapshot: DashboardGridItemHostSnapshot = { revision, items: [] };

  const updateSnapshot = () => {
    revision++;
    snapshot = {
      revision,
      items: [...records.values()].map(record => ({ ...record })),
    };

    for (const listener of listeners) {
      listener();
    }
  };

  const getOrCreateRecord = (id: string): MutableHostRecord => {
    let record = records.get(id);
    if (!record) {
      record = { id, host: null, content: null };
      records.set(id, record);
    }
    return record;
  };

  const ensureHost = (id: string, targetDocument: Document | null | undefined): HTMLDivElement | null => {
    const record = getOrCreateRecord(id);
    if (!record.host && targetDocument) {
      record.host = createHost(id, targetDocument);
      parkingElement?.appendChild(record.host);
      updateSnapshot();
    }
    return record.host;
  };

  return {
    getSnapshot: () => snapshot,

    subscribe(listener) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter(candidate => candidate !== listener);
      };
    },

    ensureHost,

    setContent(id, content, gridId) {
      const record = getOrCreateRecord(id);
      if (record.content === content && record.gridId === gridId) {
        return;
      }

      record.content = content;
      record.gridId = gridId;
      updateSnapshot();
    },

    setOwner(id, gridId) {
      const record = getOrCreateRecord(id);
      if (record.gridId === gridId) {
        return;
      }

      record.gridId = gridId;
      updateSnapshot();
    },

    attach(id, container) {
      const host = ensureHost(id, container.ownerDocument);
      if (host && host.parentElement !== container) {
        container.appendChild(host);
      }
      return host;
    },

    park(id, container) {
      const host = records.get(id)?.host;
      if (!host || (container && host.parentElement !== container)) {
        return;
      }

      parkingElement?.appendChild(host);
    },

    setParkingElement(element) {
      parkingElement = element;
      if (!parkingElement) {
        return;
      }

      for (const record of records.values()) {
        if (record.host && !record.host.isConnected) {
          parkingElement.appendChild(record.host);
        }
      }
    },

    get(id) {
      const record = records.get(id);
      return record ? { ...record } : undefined;
    },

    remove(id) {
      const record = records.get(id);
      if (!record) {
        return;
      }

      record.host?.remove();
      records.delete(id);
      updateSnapshot();
    },

    dispose() {
      for (const record of records.values()) {
        record.host?.remove();
      }
      records.clear();
      parkingElement = null;
      listeners = [];
      revision++;
      snapshot = { revision, items: [] };
    },
  };
};
