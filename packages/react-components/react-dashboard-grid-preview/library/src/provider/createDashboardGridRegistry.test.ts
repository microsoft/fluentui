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
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ code: 'duplicate-item-id', itemId: 'duplicate' }));
  });

  it('keeps the source intact when target preflight rejects a transfer', async () => {
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

    await expect(
      registry.transfer({
        operation: 'drag',
        sourceGridId: 'source',
        targetGridId: 'target',
        itemId: 'moving',
      }),
    ).resolves.toEqual({ status: 'rejected', reason: 'target-full' });
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

    await expect(
      registry.transfer({
        operation: 'drag',
        sourceGridId: 'source',
        targetGridId: 'target',
        itemId: 'controlled',
      }),
    ).resolves.toMatchObject({ status: 'accepted' });

    await Promise.resolve();
    await Promise.resolve();

    expect(source.getItem('controlled')).toBeDefined();
    expect(target.getItem('controlled')).toBeUndefined();
    expect(registry.getItemOwner('controlled')).toBe('source');
  });

  it('creates a child-grid definition for dynamic nesting when no child grid exists', async () => {
    const registry = createDashboardGridRegistry();
    const source = createDashboardGridStore({
      id: 'source',
      columns: 12,
      defaultItems: [{ id: 'moving', column: 0, row: 0, columnSpan: 6 }],
    });
    const target = createDashboardGridStore({
      id: 'target',
      columns: 12,
      defaultItems: [{ id: 'host', column: 0, row: 0, columnSpan: 4 }],
    });
    registry.registerGrid({ id: 'source', store: source });
    registry.registerGrid({
      id: 'target',
      store: target,
      dynamicNesting: true,
      subGridDefaults: { columns: 'auto' },
    });
    registry.registerItem({ id: 'moving', gridId: 'source', content: 'moving' });
    registry.registerItem({ id: 'host', gridId: 'target', content: 'host' });

    const nestingResult = await Promise.resolve(
      registry.requestNesting({
        sourceGridId: 'source',
        targetGridId: 'target',
        itemId: 'moving',
        targetItemId: 'host',
        coverage: 0.9,
      }),
    );
    expect(nestingResult).toMatchObject({
      status: 'accepted',
      targetGridId: 'target::host::subgrid',
    });
    expect(source.getItem('moving')).toBeUndefined();
    expect(target.getDefinition('host')?.subGrid).toMatchObject({
      columns: 6,
      items: [expect.objectContaining({ id: 'moving', autoPosition: true })],
    });
    expect(registry.getEventGrid('target::host::subgrid')?.id).toBe('target');
  });

  it('commits removal state before returning an accepted finalizer', async () => {
    const registry = createDashboardGridRegistry();
    const store = createDashboardGridStore({
      id: 'source',
      columns: 1,
      defaultItems: [{ id: 'remove-me', column: 0, row: 0 }],
    });
    registry.registerGrid({ id: 'source', store });

    const result = await registry.remove({
      operation: 'drag',
      sourceGridId: 'source',
      itemId: 'remove-me',
    });

    expect(result).toMatchObject({ status: 'accepted' });
    expect(store.getItem('remove-me')).toBeUndefined();
    if (result.status === 'accepted') {
      await result.finalize();
    }
  });
});
