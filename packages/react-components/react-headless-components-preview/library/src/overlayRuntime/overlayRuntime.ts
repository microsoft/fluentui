'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import type { OverlayFallbackRuntime } from './fallbackRuntime';
import { supportsNativeOverlayRuntime } from './nativeCapabilities';

export type OverlayRuntimeSnapshot =
  | { mode: 'ssr' }
  | { mode: 'native' }
  | { mode: 'fallback-idle' }
  | { mode: 'fallback-loading' }
  | { mode: 'fallback-ready'; runtime: OverlayFallbackRuntime }
  | { mode: 'fallback-error'; error: unknown };

type OverlayRuntimeRecord = {
  snapshot: OverlayRuntimeSnapshot;
  listeners: Set<() => void>;
};

type OverlayFallbackModule = typeof import('./fallbackRuntime');
type OverlayFallbackLoader = () => Promise<OverlayFallbackModule>;

const defaultFallbackLoader: OverlayFallbackLoader = () => import('./fallbackRuntime');

let fallbackLoader = defaultFallbackLoader;
let fallbackRuntimePromise: Promise<OverlayFallbackRuntime> | undefined;
let runtimeRecords = new WeakMap<Document, OverlayRuntimeRecord>();

const emit = (record: OverlayRuntimeRecord): void => {
  for (const listener of record.listeners) {
    listener();
  }
};

const getOrCreateRecord = (targetDocument: Document): OverlayRuntimeRecord => {
  const existingRecord = runtimeRecords.get(targetDocument);
  if (existingRecord) {
    return existingRecord;
  }

  const record: OverlayRuntimeRecord = {
    snapshot: supportsNativeOverlayRuntime(targetDocument) ? { mode: 'native' } : { mode: 'fallback-idle' },
    listeners: new Set(),
  };

  runtimeRecords.set(targetDocument, record);
  return record;
};

const loadFallbackRuntime = (): Promise<OverlayFallbackRuntime> => {
  fallbackRuntimePromise ??= fallbackLoader().then(module => module.fallbackRuntime);
  return fallbackRuntimePromise;
};

const startFallbackRuntime = (record: OverlayRuntimeRecord): void => {
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

export function getOverlayRuntimeSnapshot(targetDocument: Document | undefined): OverlayRuntimeSnapshot {
  return targetDocument ? getOrCreateRecord(targetDocument).snapshot : { mode: 'ssr' };
}

export function useOverlayRuntime(targetDocument: Document | undefined): OverlayRuntimeSnapshot {
  const [currentRecord, setCurrentRecord] = React.useState<
    { targetDocument: Document; record: OverlayRuntimeRecord } | undefined
  >();
  const [, forceUpdate] = React.useReducer(value => value + 1, 0);
  const record =
    currentRecord && currentRecord.targetDocument === targetDocument
      ? currentRecord.record
      : undefined;

  useIsomorphicLayoutEffect(() => {
    if (!targetDocument) {
      setCurrentRecord(undefined);
      return;
    }

    const nextRecord = getOrCreateRecord(targetDocument);
    const listener = () => forceUpdate();
    nextRecord.listeners.add(listener);
    setCurrentRecord({ targetDocument, record: nextRecord });
    startFallbackRuntime(nextRecord);

    return () => {
      nextRecord.listeners.delete(listener);
    };
  }, [targetDocument]);

  return record?.snapshot ?? { mode: 'ssr' };
}

export function resetOverlayRuntimeForTests(): void {
  runtimeRecords = new WeakMap();
  fallbackRuntimePromise = undefined;
  fallbackLoader = defaultFallbackLoader;
}

export function setOverlayFallbackLoaderForTests(loader: OverlayFallbackLoader): void {
  fallbackRuntimePromise = undefined;
  fallbackLoader = loader;
}
