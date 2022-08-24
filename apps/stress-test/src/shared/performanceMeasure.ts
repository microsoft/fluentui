export type PerformanceMeasureFn = (measureName: string, startMark: string) => void;

export const performanceMeasure: PerformanceMeasureFn = (measureName, startMark) => {
  performance.mark(startMark);

  // requestPostAnimationFrame polyfill
  requestAnimationFrame(() => {
    addEventListener(
      'message',
      () => {
        performance.measure(measureName, startMark);
      },
      { once: true },
    );
    postMessage('', '*');
  });
};
