'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import type { FallbackPositioningRuntime } from './fallbackPositioningRuntime';
import { getPositioningRuntimeOverride, supportsNativeAnchorPositioning } from './anchorPositioningCapabilities';

export type PositioningRuntimeSnapshot =
  | { mode: 'ssr' }
  | { mode: 'native' }
  | { mode: 'fallback-idle' }
  | { mode: 'fallback-loading' }
  | { mode: 'fallback-ready'; runtime: FallbackPositioningRuntime }
  | { mode: 'fallback-error'; error: unknown };

type PositioningRuntimeRecord = {
  listeners: Set<() => void>;
  snapshot: PositioningRuntimeSnapshot;
};

type FallbackPositioningModule = typeof import('./fallbackPositioningRuntime.js');
type FallbackPositioningLoader = () => Promise<FallbackPositioningModule>;

const defaultFallbackLoader: FallbackPositioningLoader = () => import('./fallbackPositioningRuntime.js');

let fallbackLoader = defaultFallbackLoader;
let fallbackRuntimePromise: Promise<FallbackPositioningRuntime> | undefined;
let runtimeRecords = new WeakMap<Document, PositioningRuntimeRecord>();

const emit = (record: PositioningRuntimeRecord): void => {
  for (const listener of record.listeners) {
    listener();
  }
};

const getOrCreateRecord = (targetDocument: Document): PositioningRuntimeRecord => {
  const existing = runtimeRecords.get(targetDocument);
  if (existing) {
    return existing;
  }

  const record: PositioningRuntimeRecord = {
    listeners: new Set(),
    snapshot: supportsNativeAnchorPositioning(targetDocument) ? { mode: 'native' } : { mode: 'fallback-idle' },
  };
  runtimeRecords.set(targetDocument, record);

  return record;
};

const loadFallbackRuntime = (): Promise<FallbackPositioningRuntime> => {
  fallbackRuntimePromise ??= fallbackLoader().then(module => module.fallbackPositioningRuntime);
  return fallbackRuntimePromise;
};

const startFallbackRuntime = (record: PositioningRuntimeRecord): void => {
  if (record.snapshot.mode !== 'fallback-idle') {
    return;
  }

  record.snapshot = { mode: 'fallback-loading' };
  emit(record);

  loadFallbackRuntime().then(
    runtime => {
      record.snapshot = { mode: 'fallback-ready', runtime };
      emit(record);
    },
    error => {
      record.snapshot = { mode: 'fallback-error', error };
      emit(record);
    },
  );
};

export function getPositioningRuntimeSnapshot(targetDocument: Document | undefined): PositioningRuntimeSnapshot {
  return targetDocument ? getOrCreateRecord(targetDocument).snapshot : { mode: 'ssr' };
}

export function usePositioningRuntime(targetDocument: Document | undefined): PositioningRuntimeSnapshot {
  const override = targetDocument ? getPositioningRuntimeOverride(targetDocument) : 'auto';
  const [currentRecord, setCurrentRecord] = React.useState<
    { record: PositioningRuntimeRecord; targetDocument: Document } | undefined
  >(() =>
    targetDocument && override !== 'auto' ? { record: getOrCreateRecord(targetDocument), targetDocument } : undefined,
  );
  const [, forceUpdate] = React.useReducer(value => value + 1, 0);
  const record = currentRecord && currentRecord.targetDocument === targetDocument ? currentRecord.record : undefined;

  useIsomorphicLayoutEffect(() => {
    if (!targetDocument) {
      setCurrentRecord(undefined);
      return;
    }

    const nextRecord = getOrCreateRecord(targetDocument);
    const listener = () => forceUpdate();
    nextRecord.listeners.add(listener);
    setCurrentRecord({ record: nextRecord, targetDocument });
    startFallbackRuntime(nextRecord);

    return () => {
      nextRecord.listeners.delete(listener);
    };
  }, [targetDocument]);

  return record?.snapshot ?? { mode: 'ssr' };
}

export function resetPositioningRuntimeForTests(): void {
  fallbackLoader = defaultFallbackLoader;
  fallbackRuntimePromise = undefined;
  runtimeRecords = new WeakMap();
}

export function setFallbackPositioningLoaderForTests(loader: FallbackPositioningLoader): void {
  fallbackLoader = loader;
  fallbackRuntimePromise = undefined;
}
