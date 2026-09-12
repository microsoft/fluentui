import { createDashboardGridEngine } from './DefaultDashboardGridEngine';

describe('dashboard grid transactions', () => {
  it('temporarily defers packing and publishes once at the outer batch commit', () => {
    const engine = createDashboardGridEngine({
      items: [
        { id: 'first', column: 0, row: 0 },
        { id: 'second', column: 0, row: 1 },
      ],
    });
    const listener = jest.fn();
    engine.subscribe(listener);

    engine.beginBatch();
    engine.beginBatch();
    engine.update('first', { row: 5 });

    expect(engine.getSnapshot().revision).toBe(0);
    expect(listener).not.toHaveBeenCalled();
    expect(engine.commitBatch().changes).toHaveLength(0);

    const changeSet = engine.commitBatch();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(changeSet.changed.map(change => change.id)).toEqual(['second', 'first']);
  });

  it('classifies removed, added, then verified changed items without duplication', () => {
    const engine = createDashboardGridEngine({
      items: [
        { id: 'removed', column: 0, row: 0 },
        { id: 'changed', column: 1, row: 0 },
      ],
    });

    engine.beginBatch();
    engine.remove('removed');
    engine.add({ id: 'added', column: 0, row: 2 });
    engine.update('changed', { column: 2 });
    const changeSet = engine.commitBatch();

    expect(changeSet.changes.map(change => change.kind)).toEqual(['removed', 'added', 'changed']);
    expect(changeSet.changed.map(change => change.id)).not.toContain('added');
  });

  it('rolls back every displaced item and responsive cache', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      items: [
        { id: 'first', column: 0, row: 0, columnSpan: 6 },
        { id: 'second', column: 6, row: 0, columnSpan: 6 },
      ],
    });
    engine.setColumns(1);
    engine.setColumns(12);
    const initial = engine.save({ includeLayouts: true });

    engine.beginInteraction('first', {
      kind: 'keyboard',
      source: 'internal',
    });
    engine.move('first', { input: 'keyboard', column: 6, row: 0 });
    engine.cancelInteraction();

    expect(engine.save({ includeLayouts: true })).toEqual(initial);
  });

  it('does not replace an active interaction snapshot when a batch begins', () => {
    const engine = createDashboardGridEngine({
      float: true,
      items: [
        { id: 'active', column: 0, row: 0 },
        { id: 'other', column: 1, row: 0 },
      ],
    });
    const initial = engine.getSnapshot().items;

    engine.beginInteraction('active', {
      kind: 'keyboard',
      source: 'internal',
    });
    engine.move('active', { input: 'keyboard', row: 2, pack: false });
    engine.beginBatch();
    engine.update('other', { row: 3 });
    engine.rollbackBatch();
    engine.cancelInteraction();

    expect(engine.getSnapshot().items).toEqual(initial);
  });
});
