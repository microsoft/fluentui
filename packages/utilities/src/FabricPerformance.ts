declare const setTimeout: (cb: () => void, delay: number) => number;

/**
 * PerfData interface.
 *
 * @internal
 */
export interface IPerfData {
  duration: number;
  timeStamp: number;
}

/**
 * PerfMeasurement interface.
 *
 * @internal
 */
export interface IPerfMeasurement {
  totalDuration: number;
  count: number;
  all: IPerfData[];
}

/**
 * PerfSummary interface.
 *
 * @internal
 */
export interface IPerfSummary {
  [key: string]: IPerfMeasurement;
}

const now: () => number = () =>
  typeof performance !== 'undefined' && !!performance.now ? performance.now() : Date.now();

const RESET_INTERVAL = 3 * 60 * 1000; // auto reset every 3 minutes

/**
 * Performance helper class for measuring things.
 *
 * @public
 * {@docCategory FabricPerformance}
 */
export class FabricPerformance {
  public static summary: IPerfSummary = {};
  private static _timeoutId: number;

  /**
   * Measures execution time of the given syncronous function. If the same logic is executed multiple times,
   * each individual measurement will be collected as well the overall numbers.
   * @param name - The name of this measurement
   * @param func - The logic to be measured for execution time
   */
  public static measure(name: string, func: () => void): void {
    if (FabricPerformance._timeoutId) {
      FabricPerformance.setPeriodicReset();
    }
    const start = now();
    func();
    const end = now();
    const measurement: IPerfMeasurement = FabricPerformance.summary[name] || {
      totalDuration: 0,
      count: 0,
      all: [],
    };
    const duration = end - start;
    measurement.totalDuration += duration;
    measurement.count++;
    measurement.all.push({
      duration,
      timeStamp: end,
    });
    FabricPerformance.summary[name] = measurement;
  }

  public static reset(): void {
    FabricPerformance.summary = {};
    clearTimeout(FabricPerformance._timeoutId);
    FabricPerformance._timeoutId = NaN;
  }

  public static setPeriodicReset(): void {
    FabricPerformance._timeoutId = setTimeout(() => FabricPerformance.reset(), RESET_INTERVAL);
  }
}
