import type { ProfilerMeasureCycle, ProfilerMeasure } from '../types';

declare global {
  interface Window {
    runMeasures: (filter?: string) => Promise<ProfilerMeasureCycle>;
  }
}

export type { ProfilerMeasureCycle, ProfilerMeasure };
