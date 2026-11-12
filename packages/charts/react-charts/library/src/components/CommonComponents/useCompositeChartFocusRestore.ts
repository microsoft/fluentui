'use client';

import * as React from 'react';
import type { FocusRestorePolicy } from '../../types/index';

/** Selects one reset recipient without taking ownership of leaf navigation targets. */
export function useCompositeChartFocusRestore(policy?: FocusRestorePolicy): {
  onSubplotFocus: (subplot: string) => void;
  getSubplotFocusRestorePolicy: (subplot: string) => FocusRestorePolicy | undefined;
} {
  const [lastFocusedSubplot, setLastFocusedSubplot] = React.useState<string>();

  const getSubplotFocusRestorePolicy = (subplot: string): FocusRestorePolicy | undefined =>
    policy === 'reset' && subplot !== lastFocusedSubplot ? 'preserve' : policy;

  return {
    onSubplotFocus: setLastFocusedSubplot,
    getSubplotFocusRestorePolicy,
  };
}
