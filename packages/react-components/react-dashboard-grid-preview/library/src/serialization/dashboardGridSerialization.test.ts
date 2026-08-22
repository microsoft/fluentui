import { createDashboardGridRegistry } from '../provider/createDashboardGridRegistry';
import { createDashboardGridStore } from '../state/createDashboardGridStore';
import {
  loadSerializedDashboardGrid,
  serializeDashboardGrid,
} from './dashboardGridSerialization';

describe('dashboard grid serialization', () => {
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
