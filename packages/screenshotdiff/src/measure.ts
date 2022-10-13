import { performance, PerformanceEntry, PerformanceObserver } from 'perf_hooks';

type Measurement = {
  stop(): void;
};

export function stopMeasureFor<T>(measurement: Measurement): (v: T) => T {
  return v => {
    measurement.stop();
    return v;
  };
}

export function measure(name: string): Measurement {
  const startMark = `${name}_start`;
  const endMark = `${name}_end`;
  performance.mark(startMark);

  return {
    stop: () => {
      performance.mark(endMark);
      performance.measure(`${name}_measure`, startMark, endMark);
    },
  };
}

export function startMeasurements(): () => PerformanceEntry[] {
  const measurements = new Set<PerformanceEntry>();
  const obs = new PerformanceObserver(items => {
    measurements.add(items.getEntries()[0]);
    performance.clearMarks();
  });
  obs.observe({ entryTypes: ['measure'] });

  return () => [...measurements];
}
