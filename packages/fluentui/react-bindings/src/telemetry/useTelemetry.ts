import * as React from 'react';
import { Telemetry, UseTelemetryResult } from './types';

export const getTelemetry = (
  displayName: string,
  telemetry: Telemetry | undefined,
  isFirstRenderRef: React.MutableRefObject<boolean>,
): UseTelemetryResult => {
  let start: number = -1;
  let end: number = -1;

  const setStart = () => {
    if (telemetry && telemetry.enabled) {
      start = performance.now();

      if (!telemetry.performance[displayName]) {
        telemetry.performance[displayName] = {
          count: 0,
          msTotal: 0,
          msMin: Number.MAX_SAFE_INTEGER,
          msMax: 0,
          renders: 0,
          stylesCacheHit: 0,
        };
      }
    }
  };

  const setEnd = () => {
    if (telemetry && telemetry.enabled && start !== -1) {
      end = performance.now();

      const duration = end - start;

      telemetry.performance[displayName].renders++;
      telemetry.performance[displayName].msTotal += duration;
      telemetry.performance[displayName].msMin = Math.min(duration, telemetry.performance[displayName].msMin);
      telemetry.performance[displayName].msMax = Math.max(duration, telemetry.performance[displayName].msMax);
      telemetry.performance[displayName].count += Number(isFirstRenderRef.current);

      isFirstRenderRef.current = false;
    }
  };

  return { setStart, setEnd };
};

const useTelemetry = (displayName: string, telemetry: Telemetry | undefined): UseTelemetryResult => {
  const isFirstRenderRef = React.useRef<boolean>(true);

  return getTelemetry(displayName, telemetry, isFirstRenderRef);
};

export default useTelemetry;
