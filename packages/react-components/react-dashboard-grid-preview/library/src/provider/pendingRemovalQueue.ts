export type DashboardGridPendingRemovalQueue = {
  schedule(key: string, callback: () => void): void;
  cancel(key: string): boolean;
  flush(key?: string): void;
  dispose(): void;
};

type PendingRemoval = {
  callback: () => void;
  cancelled: boolean;
};

export const createDashboardGridPendingRemovalQueue = (): DashboardGridPendingRemovalQueue => {
  const pending = new Map<string, PendingRemoval>();

  const run = (key: string) => {
    const entry = pending.get(key);
    if (!entry) {
      return;
    }

    pending.delete(key);
    if (!entry.cancelled) {
      entry.callback();
    }
  };

  return {
    schedule(key, callback) {
      const previous = pending.get(key);
      if (previous) {
        previous.cancelled = true;
      }

      const entry: PendingRemoval = { callback, cancelled: false };
      pending.set(key, entry);

      Promise.resolve().then(() => {
        if (pending.get(key) === entry) {
          run(key);
        }
      });
    },

    cancel(key) {
      const entry = pending.get(key);
      if (!entry) {
        return false;
      }

      entry.cancelled = true;
      pending.delete(key);
      return true;
    },

    flush(key) {
      if (key !== undefined) {
        run(key);
        return;
      }

      for (const pendingKey of [...pending.keys()]) {
        run(pendingKey);
      }
    },

    dispose() {
      for (const entry of pending.values()) {
        entry.cancelled = true;
      }
      pending.clear();
    },
  };
};
