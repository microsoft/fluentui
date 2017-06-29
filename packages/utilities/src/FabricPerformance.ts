import { Async } from './Async';

/**
 * Perf data record.
 *
 * @public
 */
export interface IPerfData {
  duration: number;
  timeStamp: number;
}

/**
 * Perf mearurement.
 *
 * @public
 */
export interface IPerfMeasurement {
  totalDuration: number;
  count: number;
  all: IPerfData[];
}

/**
 * Perf summary.
 *
 * @public
 */
export interface IPerfSummary {
  [key: string]: IPerfMeasurement;
}

const now: () => number = () => (typeof performance !== 'undefined' && !!performance.now) ? performance.now() : Date.now();

const RESET_INTERVAL = 3 * 60 * 1000; // auto reset every 3 minutes

/**
 * Helpers to measure and read performance data.
 *
 * @public
 */
export class FabricPerformance {
  public static summary: IPerfSummary = {};
  private static _async: Async = new Async();
  private static _timeoutId: number;
  /**
   * Measures execution time of the given syncronous function. If the same logic is executed multiple times,
   * each individual measurement will be collected as well the overall numbers.
   * @param name - The name of this measurement
   * @param func - The logic to be measured for execution time
   */
  public static measure(name: string, func: () => void) {
    const start = now();
    func();
    const end = now();
    const measurement: IPerfMeasurement = FabricPerformance.summary[name] || {
      totalDuration: 0,
      count: 0,
      all: []
    };
    const duration = end - start;
    measurement.totalDuration += duration;
    measurement.count++;
    measurement.all.push({
      duration: duration,
      timeStamp: end
    });
    FabricPerformance.summary[name] = measurement;
  }

  public static reset() {
    FabricPerformance.summary = {};
    FabricPerformance._async.clearTimeout(FabricPerformance._timeoutId);
    FabricPerformance.setPeriodicReset();
  }

  public static setPeriodicReset(): void {
    FabricPerformance._timeoutId = FabricPerformance._async.setTimeout(() => FabricPerformance.reset(), RESET_INTERVAL);
  };
}

FabricPerformance.setPeriodicReset();
