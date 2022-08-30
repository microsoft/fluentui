import { requestPostAnimationFrame } from './requestPostAnimationFrame';

export type PerformanceMeasureFn = (measureName?: string, startMark?: string) => void;

export const performanceMeasure: PerformanceMeasureFn = (measureName = 'stress', startMark = 'start') => {
  performance.mark(startMark);

  requestPostAnimationFrame(() => {
    performance.measure(measureName, startMark);
  });
};
