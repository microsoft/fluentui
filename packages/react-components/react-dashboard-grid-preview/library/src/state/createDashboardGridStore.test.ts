import { createDashboardGridStore } from './createDashboardGridStore';

describe('createDashboardGridStore', () => {
  it('loads defaultItems once for uncontrolled state', () => {
    const store = createDashboardGridStore({
      id: 'grid',
      columns: 12,
      defaultItems: [{ id: 'a', column: 0, row: 0, columnSpan: 2, rowSpan: 1 }],
    });

    store.update('a', { column: 4 });
    store.setCallbacks({});

    expect(store.getItem('a')?.column).toBe(4);
  });

  it('reconciles controlled items explicitly', () => {
    const store = createDashboardGridStore({
      id: 'grid',
      columns: 12,
      items: [{ id: 'a', column: 0, row: 0 }],
    });

    store.setControlledItems([{ id: 'a', column: 3, row: 0 }]);
    expect(store.getItem('a')?.column).toBe(3);
  });

  it('restores controlled geometry when the owner does not accept a mutation', async () => {
    const store = createDashboardGridStore({
      id: 'grid',
      columns: 12,
      items: [{ id: 'a', column: 0, row: 0 }],
    });

    store.update('a', { column: 4 });
    expect(store.getItem('a')?.column).toBe(4);
    await Promise.resolve();

    expect(store.getItem('a')?.column).toBe(0);
    expect(store.getDefinition('a')?.column).toBe(0);
  });

  it('notifies only the item subscriber whose geometry changes', () => {
    const store = createDashboardGridStore({
      id: 'grid',
      columns: 12,
      defaultItems: [
        { id: 'a', column: 0, row: 0 },
        { id: 'b', column: 2, row: 0 },
      ],
    });
    const itemA = jest.fn();
    const itemB = jest.fn();
    store.subscribeItem('a', itemA);
    store.subscribeItem('b', itemB);

    store.update('a', { column: 1 });

    expect(itemA).toHaveBeenCalled();
    expect(itemB).not.toHaveBeenCalled();
  });

  it('updates controlled render metadata without reloading unchanged geometry', () => {
    const store = createDashboardGridStore({
      id: 'grid',
      columns: 12,
      items: [{ id: 'a', column: 0, row: 0, content: 'first' }],
    });
    const revision = store.getSnapshot().revision;

    store.setControlledItems([{ id: 'a', column: 0, row: 0, content: 'second' }]);

    expect(store.getSnapshot().revision).toBe(revision);
    expect(store.getDefinition('a')?.content).toBe('second');
  });
});
