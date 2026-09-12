import type * as React from 'react';

export type DashboardGridSerializerContext = {
  gridId?: string;
  itemId?: string;
};

export type DashboardGridSerializer<TValue = unknown, TSerialized = unknown> = {
  serialize(value: TValue, context: DashboardGridSerializerContext): TSerialized;
  deserialize(value: TSerialized, context: DashboardGridSerializerContext): TValue;
  render?(value: TValue, context: DashboardGridSerializerContext): React.ReactNode;
};

export type DashboardGridSerializerRegistrySnapshot = {
  revision: number;
  keys: readonly string[];
};

export type DashboardGridSerializerRegistry = {
  register<TValue, TSerialized>(key: string, serializer: DashboardGridSerializer<TValue, TSerialized>): () => void;
  get(key: string): DashboardGridSerializer | undefined;
  serialize(key: string, value: unknown, context?: DashboardGridSerializerContext): unknown;
  deserialize(key: string, value: unknown, context?: DashboardGridSerializerContext): unknown;
  render(key: string, value: unknown, context?: DashboardGridSerializerContext): React.ReactNode;
  getSnapshot(): DashboardGridSerializerRegistrySnapshot;
  subscribe(listener: () => void): () => void;
};

export const createDashboardGridSerializerRegistry = (): DashboardGridSerializerRegistry => {
  const serializers = new Map<string, DashboardGridSerializer>();
  let listeners: Array<() => void> = [];
  let revision = 0;
  let snapshot: DashboardGridSerializerRegistrySnapshot = { revision, keys: [] };

  const emitChange = () => {
    revision++;
    snapshot = { revision, keys: [...serializers.keys()] };
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    register(key, serializer) {
      const previous = serializers.get(key);
      serializers.set(key, serializer as DashboardGridSerializer);
      emitChange();

      return () => {
        if (serializers.get(key) === serializer) {
          if (previous) {
            serializers.set(key, previous);
          } else {
            serializers.delete(key);
          }
          emitChange();
        }
      };
    },

    get: key => serializers.get(key),

    serialize(key, value, context = {}) {
      const serializer = serializers.get(key);
      return serializer ? serializer.serialize(value, context) : value;
    },

    deserialize(key, value, context = {}) {
      const serializer = serializers.get(key);
      return serializer ? serializer.deserialize(value, context) : value;
    },

    render(key, value, context = {}) {
      const serializer = serializers.get(key);
      if (!serializer) {
        return null;
      }

      const deserialized = serializer.deserialize(value, context);
      return serializer.render?.(deserialized, context) ?? null;
    },

    getSnapshot: () => snapshot,

    subscribe(listener) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter(candidate => candidate !== listener);
      };
    },
  };
};
