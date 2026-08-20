import type {
  DashboardGridLayoutItemInput,
  DashboardGridLoadOptions,
  DashboardGridResolvedItem,
} from '../engine';
import { createDashboardGridEngine } from '../engine';
import { adaptGridStackLoadOptions, createGridStackEventAdapter } from './gridstackFacade';
import type { DashboardGridCompatibilityHandle, GridStackNode } from './gridstackTypes';

function resolveItem(
  input: DashboardGridLayoutItemInput,
  previous?: DashboardGridResolvedItem,
): DashboardGridResolvedItem {
  return {
    id: input.id,
    column: input.column ?? previous?.column ?? 0,
    row: input.row ?? previous?.row ?? 0,
    columnSpan: input.columnSpan ?? previous?.columnSpan ?? 1,
    rowSpan: input.rowSpan ?? previous?.rowSpan ?? 1,
    minColumnSpan: input.minColumnSpan ?? previous?.minColumnSpan,
    maxColumnSpan: input.maxColumnSpan ?? previous?.maxColumnSpan,
    minRowSpan: input.minRowSpan ?? previous?.minRowSpan,
    maxRowSpan: input.maxRowSpan ?? previous?.maxRowSpan,
    movable: input.movable ?? previous?.movable ?? true,
    resizable: input.resizable ?? previous?.resizable ?? true,
    locked: input.locked ?? previous?.locked ?? false,
  };
}

class TestCompatibilityHandle implements DashboardGridCompatibilityHandle {
  private items: DashboardGridResolvedItem[];

  public constructor(items: readonly DashboardGridLayoutItemInput[]) {
    this.items = items.map(item => resolveItem(item));
  }

  public getItems(): readonly DashboardGridResolvedItem[] {
    return this.items;
  }

  public load(
    inputs: readonly DashboardGridLayoutItemInput[],
    options: DashboardGridLoadOptions = {},
  ): void {
    const addMissing = options.addMissing ?? true;
    const removeMissing = options.removeMissing ?? true;
    const existing = new Map(this.items.map(item => [item.id, item]));
    const incomingIds = new Set(inputs.map(item => item.id));
    const next = removeMissing ? [] : this.items.filter(item => !incomingIds.has(item.id));

    for (const input of inputs) {
      const previous = existing.get(input.id);
      if (previous) {
        next.push(resolveItem(input, previous));
      } else if (addMissing) {
        next.push(resolveItem(input));
      }
    }

    this.items = next;
  }
}

describe('GridStack event and load compatibility', () => {
  it('adapts the legacy boolean load overload', () => {
    expect(adaptGridStackLoadOptions()).toEqual({ addMissing: true, removeMissing: true });
    expect(adaptGridStackLoadOptions(true)).toEqual({ addMissing: true, removeMissing: true });
    expect(adaptGridStackLoadOptions(false)).toEqual({ addMissing: false, removeMissing: false });
  });

  it('supports update-only legacy load(false)', () => {
    const target = new TestCompatibilityHandle([
      { id: 'one', column: 0, row: 0 },
      { id: 'two', column: 1, row: 0 },
    ]);
    const facade = createGridStackEventAdapter(target);

    facade.load(
      [
        { id: 'one', x: 3, y: 2 },
        { id: 'new', x: 4, y: 2 },
      ],
      false,
    );

    expect(target.getItems()).toMatchObject([
      { id: 'two', column: 1, row: 0 },
      { id: 'one', column: 3, row: 2 },
    ]);
  });

  it('adapts directly to the public DashboardGridEngine interface', () => {
    const engine = createDashboardGridEngine({
      items: [
        { id: 'one', column: 0, row: 0 },
        { id: 'two', column: 1, row: 0 },
      ],
    });
    const facade = createGridStackEventAdapter(engine);

    facade.load([{ id: 'one', x: 3, y: 2 }], false);

    expect(engine.getItem('one')).toMatchObject({ id: 'one', column: 3, row: 0 });
    expect(engine.getItem('two')).toMatchObject({ id: 'two', column: 1, row: 0 });
  });

  it('uses default add/remove semantics, emits committed events, and serializes short fields', () => {
    const target = new TestCompatibilityHandle([
      { id: 'one', column: 0, row: 0 },
      { id: 'two', column: 1, row: 0 },
    ]);
    const facade = createGridStackEventAdapter(target);
    const events: string[] = [];
    const nodeHandler = (event: { type: string }, nodes: readonly GridStackNode[]) => {
      events.push(`${event.type}:${nodes.map(node => node.id).join(',')}`);
    };
    facade.on('removed added change', nodeHandler);

    facade.load([
      { id: 'one', x: 2, y: 1 },
      { id: 'three', x: 0, y: 0 },
    ]);

    expect(target.getItems().map(item => item.id)).toEqual(['one', 'three']);
    expect(events).toEqual(['removed:two', 'added:three', 'change:one']);
    expect(facade.save()).toEqual([
      { x: 2, y: 1, id: 'one' },
      { x: 0, y: 0, id: 'three' },
    ]);
  });

  it('serializes string content from a public handle without interpreting it as HTML', () => {
    const engine = createDashboardGridEngine({ items: [{ id: 'one' }] });
    const definitions = [{ id: 'one', content: '<img src=x onerror=alert(1)>' }];
    const target: DashboardGridCompatibilityHandle = {
      getStore: () => ({ engine }),
      getItems: () => definitions,
      load: (items, options) => engine.load(items, options),
    };
    const facade = createGridStackEventAdapter(target);

    expect(facade.save()).toEqual([
      { x: 0, y: 0, id: 'one', content: '<img src=x onerror=alert(1)>' },
    ]);
    expect(facade.save(false)).toEqual([{ x: 0, y: 0, id: 'one' }]);
  });

  it('adapts the legacy callback overload and uses its returned elements for element events', () => {
    const root = document.createElement('div');
    const target = new TestCompatibilityHandle([
      { id: 'one', column: 0, row: 0 },
      { id: 'two', column: 1, row: 0 },
    ]);
    const facade = createGridStackEventAdapter(target, { rootElement: root });
    const callbackCalls: Array<{ id: string | undefined; add: boolean }> = [];
    const addedElement = document.createElement('div');

    facade.load(
      [
        { id: 'one', x: 0, y: 0 },
        { id: 'three', x: 2, y: 0 },
      ],
      (_parent, widget, add) => {
        callbackCalls.push({ id: widget.id, add });
        return add ? addedElement : undefined;
      },
    );

    expect(callbackCalls).toEqual([
      { id: 'two', add: false },
      { id: 'three', add: true },
    ]);
    expect(target.getItems().map(item => item.id)).toEqual(['one', 'three']);

    const dragHandler = jest.fn();
    facade.on('dragstart', dragHandler);
    facade.emit('dragstart', { item: target.getItems()[1] });
    expect(dragHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'dragstart', target: root }),
      addedElement,
    );
  });

  it('requires an explicit root only when a legacy callback must add or remove', () => {
    const target = new TestCompatibilityHandle([{ id: 'one' }]);
    const facade = createGridStackEventAdapter(target);

    expect(() => facade.load([{ id: 'two' }], () => document.createElement('div'))).toThrow(
      /requires GridStackEventAdapterOptions\.rootElement/,
    );
  });

  it('suffixes duplicate IDs before invoking the primary engine contract', () => {
    const target = new TestCompatibilityHandle([]);
    const facade = createGridStackEventAdapter(target);

    facade.load([{ id: 'tile' }, { id: 'tile' }, { id: 'tile_1' }]);

    expect(target.getItems().map(item => item.id)).toEqual(['tile', 'tile_1', 'tile_1_1']);
  });

  it('exposes GridStack CRUD aliases through the public engine API', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <div class="grid-stack-item" gs-id="one"></div>
      <div class="grid-stack-item" gs-id="two"></div>
    `;
    const engine = createDashboardGridEngine({
      items: [
        { id: 'one', column: 0, row: 0 },
        { id: 'two', column: 1, row: 0 },
      ],
    });
    const facade = createGridStackEventAdapter(engine, { rootElement: root });

    const added = facade.addWidget({ id: 'one', x: 2, y: 0 });
    expect(added?.id).toBe('one_1');

    facade.update('one', { x: 3, y: 1, w: 2, noMove: true });
    expect(engine.getItem('one')).toMatchObject({
      column: 3,
      columnSpan: 2,
      movable: false,
    });

    facade.removeWidget('[gs-id="two"]');
    expect(engine.getItem('two')).toBeUndefined();

    facade.removeAll();
    expect(engine.getSnapshot().items).toEqual([]);
  });

  it('adopts an existing element through makeWidget using safe DOM parsing', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <div class="grid-stack-item" gs-id="adopted" gs-x="1" gs-y="0" gs-w="2" gs-min-w="1">
        <div class="grid-stack-item-content"><strong>Safe text</strong></div>
      </div>
    `;
    const element = root.firstElementChild as HTMLElement;
    const engine = createDashboardGridEngine();
    const facade = createGridStackEventAdapter(engine, { rootElement: root });

    const node = facade.makeWidget('.grid-stack-item', { w: 3 });

    expect(node).toMatchObject({ id: 'adopted', x: 1, y: 0, w: 3, h: 1, el: element });
    expect(engine.getItem('adopted')).toMatchObject({
      column: 1,
      row: 0,
      columnSpan: 3,
    });
    expect(element.getAttribute('gs-w')).toBe('3');
    expect(element.getAttribute('gs-min-w')).toBeNull();
    expect(element.querySelector('strong')?.textContent).toBe('Safe text');
  });

  it('adopts widgets from an explicit ShadowRoot selector scope', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="grid-stack-item" gs-id="shadow-item" gs-x="0" gs-y="0">
        <div class="grid-stack-item-content">Shadow content</div>
      </div>
    `;
    const engine = createDashboardGridEngine();
    const facade = createGridStackEventAdapter(engine, { selectorRoot: shadowRoot });

    const node = facade.makeWidget('.grid-stack-item');

    expect(node?.id).toBe('shadow-item');
    expect(engine.getItem('shadow-item')).toBeDefined();
  });

  it('coalesces facade events while using the public engine batch transaction', () => {
    const engine = createDashboardGridEngine({ items: [{ id: 'one' }] });
    const facade = createGridStackEventAdapter(engine);
    const addedHandler = jest.fn();
    facade.on('added', addedHandler);

    facade.batchUpdate();
    facade.addWidget({ id: 'two', x: 1, y: 0 });
    facade.addWidget({ id: 'three', x: 2, y: 0 });
    expect(addedHandler).not.toHaveBeenCalled();
    facade.batchUpdate(false);

    expect(addedHandler).toHaveBeenCalledTimes(1);
    expect(addedHandler.mock.calls[0][1].map((node: GridStackNode) => node.id)).toEqual([
      'two',
      'three',
    ]);
  });

  it('does not emit compatibility events for rejected public-engine mutations', () => {
    const engine = createDashboardGridEngine({
      columns: 1,
      maxRows: 1,
      items: [{ id: 'existing', column: 0, row: 0 }],
    });
    const facade = createGridStackEventAdapter(engine);
    const handler = jest.fn();
    facade.on('added change', handler);

    expect(facade.addWidget({ id: 'blocked', x: 0, y: 1 })).toBeUndefined();
    expect(handler).not.toHaveBeenCalled();
    expect(engine.getSnapshot().items.map(item => item.id)).toEqual(['existing']);
  });

  it('exposes public engine query, column, compact, and rotation aliases', () => {
    const engine = createDashboardGridEngine({
      columns: 4,
      items: [{ id: 'one', column: 0, row: 0, columnSpan: 2, rowSpan: 1 }],
    });
    const facade = createGridStackEventAdapter(engine);

    expect(facade.getColumn()).toBe(4);
    expect(facade.getRow()).toBe(1);
    expect(facade.isAreaEmpty(3, 0, 1, 1)).toBe(true);
    expect(facade.willItFit({ id: 'two', x: 2, y: 0, w: 2, h: 1 })).toBe(true);

    facade.rotate('one');
    expect(engine.getItem('one')).toMatchObject({ columnSpan: 1, rowSpan: 2 });

    facade.column(6).compact('compact');
    expect(facade.getColumn()).toBe(6);
  });

  it('restores item-level interaction flags across disable and enable aliases', () => {
    const engine = createDashboardGridEngine({
      items: [
        { id: 'fixed', movable: false, resizable: true },
        { id: 'editable', movable: true, resizable: true },
      ],
    });
    const facade = createGridStackEventAdapter(engine);
    const disableHandler = jest.fn();
    const enableHandler = jest.fn();
    facade.on('disable', disableHandler).on('enable', enableHandler);

    facade.disable();
    expect(engine.getItem('fixed')).toMatchObject({ movable: false, resizable: false });
    expect(engine.getItem('editable')).toMatchObject({ movable: false, resizable: false });
    facade.addWidget({ id: 'added-while-disabled', noMove: false, noResize: true });
    expect(engine.getItem('added-while-disabled')).toMatchObject({
      movable: false,
      resizable: false,
    });

    facade.enable();
    expect(engine.getItem('fixed')).toMatchObject({ movable: false, resizable: true });
    expect(engine.getItem('editable')).toMatchObject({ movable: true, resizable: true });
    expect(engine.getItem('added-while-disabled')).toMatchObject({
      movable: true,
      resizable: false,
    });
    expect(disableHandler).toHaveBeenCalledTimes(1);
    expect(enableHandler).toHaveBeenCalledTimes(1);
  });

  it('sets up external drag metadata without enabling the unsafe HTML5 drag path', () => {
    const root = document.createElement('div');
    root.innerHTML = '<div class="source"></div>';
    const source = root.querySelector('.source') as HTMLElement;
    const setupDragIn = jest.fn();
    const facade = createGridStackEventAdapter(new TestCompatibilityHandle([]), {
      rootElement: root,
      setupDragIn,
    });

    facade.setupDragIn('.source', { helper: 'clone' }, [
      { id: 'external', content: '<img src=x onerror=alert(1)>' },
    ]);

    expect(source.getAttribute('data-dashboard-grid-drag-source')).toBe('true');
    expect(source.hasAttribute('draggable')).toBe(false);
    expect(JSON.parse(source.getAttribute('data-gs-widget') ?? '{}')).toEqual({
      id: 'external',
      content: '<img src=x onerror=alert(1)>',
    });
    expect(setupDragIn).toHaveBeenCalledWith(
      [source],
      { helper: 'clone' },
      [{ id: 'external', content: '<img src=x onerror=alert(1)>' }],
    );
  });

  it('bridges committed public DashboardGrid callbacks to legacy event names', () => {
    const root = document.createElement('div');
    const itemElement = document.createElement('div');
    const engine = createDashboardGridEngine({ items: [{ id: 'one' }] });
    const facade = createGridStackEventAdapter(engine, {
      rootElement: root,
      getItemElement: () => itemElement,
    });
    const handlers = facade.getDashboardGridEventHandlers();
    const addedHandler = jest.fn();
    const changeHandler = jest.fn();
    const dragHandler = jest.fn();
    const dropHandler = jest.fn();
    facade
      .on('added', addedHandler)
      .on('change', changeHandler)
      .on('dragstart', dragHandler)
      .on('dropped', dropHandler);

    const addResult = engine.add({ id: 'two', column: 1, row: 0 });
    handlers.onItemAdd(new Event('added'), {
      type: 'item-add',
      items: addResult.changeSet.added,
      changeSet: addResult.changeSet,
    });

    const updateResult = engine.update('two', { column: 2 });
    handlers.onLayoutChange(new Event('change'), {
      type: 'layout-change',
      changeSet: updateResult.changeSet,
    });

    const item = engine.getItem('two')!;
    handlers.onDragStart(new Event('dragstart'), {
      type: 'drag-start',
      itemId: 'two',
    });
    handlers.onTransfer(new Event('dropped'), {
      type: 'transfer',
      items: [item],
    });

    expect(addedHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'added' }),
      expect.arrayContaining([expect.objectContaining({ id: 'two' })]),
    );
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'change' }),
      expect.arrayContaining([expect.objectContaining({ id: 'two', x: 2 })]),
    );
    expect(dragHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'dragstart' }),
      itemElement,
    );
    expect(dropHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'dropped' }),
      undefined,
      expect.objectContaining({ id: 'two' }),
    );
  });

  it('supports space-separated subscriptions and cleanup', () => {
    const target = new TestCompatibilityHandle([{ id: 'one' }]);
    const facade = createGridStackEventAdapter(target);
    const handler = jest.fn();
    const item = target.getItems()[0];

    facade.on('enable disable', handler);
    facade.emit('enable', {});
    facade.emit('disable', {});
    expect(handler).toHaveBeenCalledTimes(2);

    facade.off('enable disable');
    facade.emit('enable', {});
    facade.emit('disable', {});
    expect(handler).toHaveBeenCalledTimes(2);

    facade.on('resizecontent', handler).offAll();
    facade.emit('resizecontent', { nodes: [item] });
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
