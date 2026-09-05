import { createDashboardGridPendingRemovalQueue } from './pendingRemovalQueue';

describe('createDashboardGridPendingRemovalQueue', () => {
  it('cancels a same-turn removal', async () => {
    const callback = jest.fn();
    const queue = createDashboardGridPendingRemovalQueue();

    queue.schedule('item', callback);
    expect(queue.cancel('item')).toBe(true);
    await Promise.resolve();

    expect(callback).not.toHaveBeenCalled();
  });

  it('runs the latest scheduled removal once', async () => {
    const first = jest.fn();
    const second = jest.fn();
    const queue = createDashboardGridPendingRemovalQueue();

    queue.schedule('item', first);
    queue.schedule('item', second);
    await Promise.resolve();

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
