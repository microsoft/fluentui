import { createDashboardGridStore } from '../state/createDashboardGridStore';
import { createDashboardGridRegistry } from './createDashboardGridRegistry';

describe('createDashboardGridRegistry', () => {
  it('rejects provider-wide duplicate item IDs atomically', () => {
    const onError = jest.fn();
    const registry = createDashboardGridRegistry({ onError });
    const first = createDashboardGridStore({ id: 'first', columns: 12 });
    const second = createDashboardGridStore({ id: 'second', columns: 12 });
    registry.registerGrid({ id: 'first', store: first });
    registry.registerGrid({ id: 'second', store: second });

    registry.registerItem({ id: 'duplicate', gridId: 'first', content: 'first' });
    registry.registerItem({ id: 'duplicate', gridId: 'second', content: 'second' });

    expect(registry.getItemOwner('duplicate')).toBe('first');
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'duplicate-item-id', itemId: 'duplicate' }),
    );
  });

  it('keeps the source intact when target preflight rejects a transfer', () => {
    const registry = createDashboardGridRegistry();
    const source = createDashboardGridStore({
      id: 'source',
      columns: 1,
      defaultItems: [{ id: 'moving', column: 0, row: 0 }],
    });
    const target = createDashboardGridStore({
      id: 'target',
      columns: 1,
      maxRows: 1,
      defaultItems: [{ id: 'blocker', column: 0, row: 0 }],
    });
    registry.registerGrid({ id: 'source', store: source });
    registry.registerGrid({ id: 'target', store: target });
    registry.registerItem({ id: 'moving', gridId: 'source', content: 'moving' });
    registry.registerItem({ id: 'blocker', gridId: 'target', content: 'blocker' });

    expect(
      registry.transfer({
        operation: 'drag',
        sourceGridId: 'source',
        targetGridId: 'target',
        itemId: 'moving',
      }),
    ).toEqual({ status: 'rejected', reason: 'target-full' });
    expect(source.getItem('moving')).toBeDefined();
    expect(target.getItem('moving')).toBeUndefined();
    expect(registry.getItemOwner('moving')).toBe('source');
  });

  it('rolls back provider ownership when controlled owners do not accept a transfer', async () => {
    const registry = createDashboardGridRegistry();
    const source = createDashboardGridStore({
      id: 'source',
      columns: 2,
      items: [{ id: 'controlled', column: 0, row: 0 }],
    });
    const target = createDashboardGridStore({
      id: 'target',
      columns: 2,
      items: [],
    });
    registry.registerGrid({ id: 'source', store: source });
    registry.registerGrid({ id: 'target', store: target });
    registry.registerItem({ id: 'controlled', gridId: 'source', content: 'controlled' });

    expect(
      registry.transfer({
        operation: 'drag',
        sourceGridId: 'source',
        targetGridId: 'target',
        itemId: 'controlled',
      }),
    ).toMatchObject({ status: 'accepted' });

    await Promise.resolve();
    await Promise.resolve();

    expect(source.getItem('controlled')).toBeDefined();
    expect(target.getItem('controlled')).toBeUndefined();
    expect(registry.getItemOwner('controlled')).toBe('source');
  });
});
