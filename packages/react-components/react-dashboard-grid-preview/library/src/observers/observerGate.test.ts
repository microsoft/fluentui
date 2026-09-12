import { createDashboardGridDelayedGate } from './observerGate';

describe('createDashboardGridDelayedGate', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('delivers first-call arguments after the delay and drops calls while waiting', () => {
    const callback = jest.fn();
    const gate = createDashboardGridDelayedGate(callback, 50, window);

    gate.invoke('first');
    gate.invoke('second');
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first');

    gate.invoke('third');
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenLastCalledWith('third');
  });
});
