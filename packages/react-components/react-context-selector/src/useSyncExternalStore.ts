import * as React from 'react';
import { useSyncExternalStore as shim } from 'use-sync-external-store/shim';

const native = (React as never)['useSync' + 'ExternalStore'] as typeof shim | undefined;

export const useSyncExternalStore = native ? native : shim;
