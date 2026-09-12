import { createDashboardGridRegistry } from '../provider/createDashboardGridRegistry';
import { createDashboardGridStore } from '../state/createDashboardGridStore';
import { loadSerializedDashboardGrid, serializeDashboardGrid } from './dashboardGridSerialization';

describe('dashboard grid serialization', () => {
  it('saves item geometry from the requested layout and keeps the engine envelope in agreement', () => {
    const registry = createDashboardGridRegistry();
    const source = createDashboardGridStore({
      id: 'source',
      columns: 12,
      defaultItems: [
        { id: 'left', column: 0, row: 0, columnSpan: 6 },
        { id: 'right', column: 6, row: 0, columnSpan: 6 },
      ],
    });
    source.setColumns(1);

    const highest = serializeDashboardGrid(source, registry);
    const requested = serializeDashboardGrid(source, registry, { columns: 1 });

    expect(highest.items).toEqual([
      {
        id: 'left',
        column: 0,
        row: 0,
        columnSpan: 6,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
      },
      {
        id: 'right',
        column: 6,
        row: 0,
        columnSpan: 6,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
      },
    ]);
    expect(highest.engine?.items).toEqual(highest.items);
    expect(requested.items).toEqual([
      {
        id: 'left',
        column: 0,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
      },
      {
        id: 'right',
        column: 0,
        row: 1,
        columnSpan: 1,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
      },
    ]);
    expect(requested.engine?.items).toEqual(requested.items);
  });

  it('round-trips literal application data and content according to save controls', () => {
    const registry = createDashboardGridRegistry();
    const source = createDashboardGridStore({
      id: 'source',
      columns: 2,
      defaultItems: [
        {
          id: 'literal',
          column: 0,
          row: 0,
          content: 'Visible content',
          data: { kind: 'metric', value: 42 },
        },
      ],
    });

    const defaults = serializeDashboardGrid(source, registry);
    const contentOnly = serializeDashboardGrid(source, registry, {
      includeData: false,
      includeContent: true,
    });
    const geometryOnly = serializeDashboardGrid(source, registry, {
      includeData: false,
      includeContent: false,
    });
    const target = createDashboardGridStore({ id: 'target', columns: 2 });
    loadSerializedDashboardGrid(target, registry, contentOnly);

    expect(defaults.items).toEqual([
      {
        id: 'literal',
        column: 0,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
        data: { kind: 'metric', value: 42 },
      },
    ]);
    expect(contentOnly.items).toEqual([
      {
        id: 'literal',
        column: 0,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
        content: 'Visible content',
      },
    ]);
    expect(geometryOnly.items).toEqual([
      {
        id: 'literal',
        column: 0,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
      },
    ]);
    expect(
      serializeDashboardGrid(target, registry, {
        includeData: false,
        includeContent: true,
      }).items,
    ).toEqual(contentOnly.items);
  });

  it('round-trips complete grid options through the serializer APIs', () => {
    const registry = createDashboardGridRegistry();
    const source = createDashboardGridStore({
      id: 'source',
      columns: 12,
      serializedOptions: {
        columns: 'auto',
        responsive: {
          targetColumnWidth: 240,
          maxColumns: 8,
          breakpoints: [{ maxWidth: 640, columns: 2, layout: 'list' }],
          observe: 'window',
          layout: 'compact',
        },
        rowHeight: 'auto',
        rowHeightThrottle: 20,
        gap: '12px 8px',
        minRows: 2,
        maxRows: 20,
        fixedRows: 10,
        float: true,
        animate: true,
        direction: 'auto',
        static: true,
        disableDrag: true,
        disableResize: true,
        lazyMount: true,
        sizeToContent: true,
        printMode: 'exact',
        collision: { dragActivationRatio: 0.6, nestingActivationRatio: 0.8 },
        compactMode: 'list',
        drag: {
          handleSelector: '.drag-handle',
          cancelSelector: '.no-drag',
          preview: 'clone',
          portal: 'parent',
          scroll: true,
          pause: 150,
        },
        resize: { handles: ['e', 'se'], handleVisibility: 'coarse-pointer' },
        acceptExternal: '.widget',
        removable: '.trash',
        removal: { accept: '.allowed', decline: '.blocked' },
        subGridDefaults: {
          columns: 'auto',
          rowHeight: 'initial',
          direction: 'auto',
        },
        dynamicNesting: true,
      },
      defaultItems: [
        {
          id: 'nested',
          subGrid: {
            columns: 'auto',
            rowHeight: 'auto',
            direction: 'auto',
            resize: { handles: 'all', handleVisibility: 'always' },
            printMode: 'flow',
          },
        },
      ],
    });

    const saved = serializeDashboardGrid(source, registry);
    const target = createDashboardGridStore({ id: 'target', columns: 4 });
    loadSerializedDashboardGrid(target, registry, saved);
    const roundTripped = serializeDashboardGrid(target, registry);

    expect(roundTripped.options).toEqual({
      columns: 'auto',
      responsive: {
        targetColumnWidth: 240,
        maxColumns: 8,
        breakpoints: [{ maxWidth: 640, columns: 2, layout: 'list' }],
        observe: 'window',
        layout: 'compact',
      },
      rowHeight: 'auto',
      rowHeightThrottle: 20,
      gap: '12px 8px',
      minRows: 2,
      maxRows: 20,
      fixedRows: 10,
      float: true,
      animate: true,
      direction: 'auto',
      static: true,
      disableDrag: true,
      disableResize: true,
      lazyMount: true,
      sizeToContent: true,
      printMode: 'exact',
      collision: { dragActivationRatio: 0.6, nestingActivationRatio: 0.8 },
      compactMode: 'list',
      drag: {
        handleSelector: '.drag-handle',
        cancelSelector: '.no-drag',
        preview: 'clone',
        portal: 'parent',
        scroll: true,
        pause: 150,
      },
      resize: { handles: ['e', 'se'], handleVisibility: 'coarse-pointer' },
      acceptExternal: '.widget',
      removable: '.trash',
      removal: { accept: '.allowed', decline: '.blocked' },
      subGridDefaults: {
        columns: 'auto',
        rowHeight: 'initial',
        direction: 'auto',
      },
      dynamicNesting: true,
    });
    expect(roundTripped.items[0].subGrid?.options).toEqual({
      columns: 'auto',
      rowHeight: 'auto',
      direction: 'auto',
      resize: { handles: 'all', handleVisibility: 'always' },
      printMode: 'flow',
    });
  });
});
