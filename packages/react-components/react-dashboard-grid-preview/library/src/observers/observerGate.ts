export type DashboardGridDelayedGate<TArgs extends readonly unknown[]> = {
  invoke(...args: TArgs): void;
  cancel(): void;
};

export const createDashboardGridDelayedGate = <TArgs extends readonly unknown[]>(
  callback: (...args: TArgs) => void,
  delay: number,
  targetWindow: Pick<Window, 'setTimeout' | 'clearTimeout'>,
): DashboardGridDelayedGate<TArgs> => {
  let timer = 0;

  return {
    invoke(...args) {
      if (timer) {
        return;
      }

      timer = targetWindow.setTimeout(() => {
        timer = 0;
        callback(...args);
      }, Math.max(0, delay));
    },

    cancel() {
      if (timer) {
        targetWindow.clearTimeout(timer);
        timer = 0;
      }
    },
  };
};
