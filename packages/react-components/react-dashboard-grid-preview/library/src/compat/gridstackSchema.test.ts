import {
  fromGridStackOptions,
  fromGridStackWidget,
  fromGridStackWidgets,
  suffixDuplicateGridStackIds,
  toGridStackOptions,
  toGridStackWidget,
} from './gridstackSchema';
import type { DashboardGridCompatibilityItem, GridStackOptions, GridStackWidget } from './gridstackTypes';

describe('GridStack schema compatibility', () => {
  it('keeps empty option mappings sparse', () => {
    expect(fromGridStackOptions({})).toEqual({});
    expect(toGridStackOptions({})).toEqual({});
  });

  it('maps GridStack widget fields to descriptive engine fields without mutating callers', () => {
    const widget = Object.freeze<GridStackWidget>({
      id: 'sales',
      x: 0,
      y: 2,
      w: 4,
      h: 3,
      minW: 2,
      maxW: 6,
      minH: 1,
      maxH: 5,
      noMove: true,
      noResize: false,
      locked: true,
      lazyLoad: false,
      sizeToContent: 7,
      resizeToContentParent: '.body',
      resizeHandles: 'e,se',
      content: '<img src=x onerror=alert(1)>',
      component: 'SalesCard',
      props: { title: 'Sales' },
      customField: 'preserved',
    });

    const item = fromGridStackWidget(widget);

    expect(item).toMatchObject({
      id: 'sales',
      column: 0,
      row: 2,
      columnSpan: 4,
      rowSpan: 3,
      minColumnSpan: 2,
      maxColumnSpan: 6,
      minRowSpan: 1,
      maxRowSpan: 5,
      movable: false,
      resizable: true,
      locked: true,
      lazyMount: false,
      sizeToContent: 7,
      sizeToContentSelector: '.body',
      resizeHandles: 'e,se',
      content: '<img src=x onerror=alert(1)>',
      component: 'SalesCard',
      props: { title: 'Sales' },
      legacy: { customField: 'preserved' },
    });
    expect(widget).toEqual(expect.objectContaining({ id: 'sales', customField: 'preserved' }));
  });

  it('serializes legacy short fields while preserving zero coordinates and explicit overrides', () => {
    const item: DashboardGridCompatibilityItem = {
      id: 'sales',
      column: 0,
      row: 0,
      columnSpan: 2,
      rowSpan: 1,
      minColumnSpan: 2,
      minRowSpan: 1,
      movable: true,
      resizable: false,
      locked: false,
      lazyMount: false,
      sizeToContent: false,
    };

    expect(toGridStackWidget(item)).toEqual({
      x: 0,
      y: 0,
      minW: 2,
      minH: 1,
      noResize: true,
      id: 'sales',
      lazyLoad: false,
      sizeToContent: false,
    });
  });

  it('normalizes full auto-placement when autoPosition is set or either coordinate is missing', () => {
    expect(fromGridStackWidget({ id: 'explicit-auto', x: 4, y: 5, autoPosition: true })).toMatchObject({
      id: 'explicit-auto',
      autoPosition: true,
    });
    expect(fromGridStackWidget({ id: 'partial', x: 4 })).toEqual({
      id: 'partial',
      autoPosition: true,
    });
    expect(
      toGridStackWidget({
        id: 'partial',
        column: 4,
        movable: true,
        resizable: true,
        locked: false,
      }),
    ).toEqual({
      autoPosition: true,
      id: 'partial',
    });
  });

  it('suffixes duplicate IDs only through compatibility helpers', () => {
    const widgets: GridStackWidget[] = [{ id: 'tile' }, { id: 'tile' }, { id: 'tile_1' }, {}];

    expect(fromGridStackWidgets(widgets).map(item => item.id)).toEqual([
      'tile',
      'tile_1',
      'tile_1_1',
      'gridstack-item-4',
    ]);
    expect(suffixDuplicateGridStackIds([{ id: 'tile' }], ['tile'])).toEqual([{ id: 'tile_1' }]);
  });

  it('preserves the first existing ID for legacy load matching and suffixes later duplicates', () => {
    const mapped = fromGridStackWidgets([{ id: 'tile' }, { id: 'tile' }, { id: 'new' }], {
      existingIds: ['tile'],
      preserveFirstExistingId: true,
    });

    expect(mapped.map(item => item.id)).toEqual(['tile', 'tile_1', 'new']);
  });

  it('maps GridStack options in both directions', () => {
    const options: GridStackOptions = {
      acceptWidgets: '.external',
      alwaysShowResizeHandle: 'mobile',
      animate: false,
      auto: true,
      cellHeight: 5,
      cellHeightUnit: 'rem',
      cellHeightThrottle: 25,
      column: 8,
      columnOpts: {
        columnMax: 12,
        breakpointForWindow: true,
        breakpoints: [{ w: 640, c: 1, layout: 'list' }],
      },
      class: 'dashboard',
      disableDrag: true,
      draggable: {
        handle: '.ignored',
        appendTo: '.overlay',
        pause: 100,
        scroll: false,
      },
      float: true,
      handleClass: 'drag-handle',
      itemClass: 'tile',
      marginTop: 1,
      marginRight: 2,
      marginBottom: 3,
      marginLeft: 4,
      marginUnit: 'em',
      maxRow: 10,
      minRow: 2,
      placeholderClass: 'placeholder',
      placeholderText: 'Drop here',
      printMode: 'exact',
      removable: '.trash',
      removableOptions: { accept: 'tile', decline: 'fixed' },
      resizable: { handles: 'e,se', autoHide: false },
      rtl: true,
      staticGrid: false,
      subGridDynamic: true,
      children: [{ id: 'one', x: 0, y: 0 }],
    };

    const mapped = fromGridStackOptions(options);

    expect(mapped).toMatchObject({
      columns: 8,
      rowHeight: '5rem',
      rowHeightThrottle: 25,
      gap: { top: '1em', right: '2em', bottom: '3em', left: '4em' },
      minRows: 2,
      maxRows: 10,
      direction: 'rtl',
      className: 'dashboard',
      drag: { handleSelector: '.drag-handle', appendTo: '.overlay', pause: 100, scroll: false },
      resize: { handleVisibility: 'coarse-pointer', handles: 'e,se' },
      placeholder: { className: 'placeholder', text: 'Drop here' },
      compatibility: { autoImportDom: true, handleClass: 'drag-handle', itemClass: 'tile' },
    });
    expect(mapped.items?.[0]).toMatchObject({ id: 'one', column: 0, row: 0 });

    expect(toGridStackOptions(mapped)).toMatchObject({
      column: 8,
      cellHeight: '5rem',
      minRow: 2,
      maxRow: 10,
      rtl: true,
      handleClass: 'drag-handle',
      itemClass: 'tile',
      removable: '.trash',
      printMode: 'exact',
      children: [{ id: 'one', x: 0, y: 0 }],
    });
  });

  it('does not carry prototype-polluting custom fields into mapped legacy data', () => {
    const widget = JSON.parse(
      '{"id":"safe","__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}}}',
    ) as GridStackWidget;

    const item = fromGridStackWidget(widget);

    expect(item.legacy).toBeUndefined();
    expect((Object.prototype as { polluted?: boolean }).polluted).toBeUndefined();
  });

  it('strips nullish and runtime compatibility fields from short serialization', () => {
    const item: DashboardGridCompatibilityItem = {
      id: 'safe',
      column: 0,
      row: 0,
      movable: true,
      resizable: true,
      locked: false,
      legacy: {
        custom: 'value',
        empty: null,
        missing: undefined,
        el: { runtime: true },
        _runtime: true,
      },
    };

    expect(toGridStackWidget(item)).toEqual({
      custom: 'value',
      x: 0,
      y: 0,
      id: 'safe',
    });
  });
});
