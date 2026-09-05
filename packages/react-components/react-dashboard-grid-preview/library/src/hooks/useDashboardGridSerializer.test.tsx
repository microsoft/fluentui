import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardGrid } from '../components/DashboardGrid/DashboardGrid';
import { DashboardGridProvider } from '../components/DashboardGridProvider/DashboardGridProvider';
import type { DashboardGridHandle } from './useDashboardGrid';
import type { DashboardGridSerializedGrid } from '../state/DashboardGridStore.types';
import { useDashboardGridSerializer } from './useDashboardGridSerializer';

describe('useDashboardGridSerializer', () => {
  it('round-trips requested layout geometry and literal save fields through the public APIs', () => {
    const sourceRef = React.createRef<DashboardGridHandle>();
    const highestTargetRef = React.createRef<DashboardGridHandle>();
    const targetRef = React.createRef<DashboardGridHandle>();

    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid
          aria-label="Source dashboard"
          imperativeRef={sourceRef}
          columns={12}
          defaultItems={[
            {
              id: 'literal',
              column: 0,
              row: 0,
              columnSpan: 6,
              content: 'Visible content',
              data: { kind: 'metric', value: 42 },
            },
          ]}
        />
        <DashboardGrid aria-label="Highest-resolution target dashboard" imperativeRef={highestTargetRef} columns={12} />
        <DashboardGrid aria-label="Target dashboard" imperativeRef={targetRef} columns={1} />
      </DashboardGridProvider>,
    );

    sourceRef.current?.setColumns(1);
    const highest = sourceRef.current?.save();
    const requested = sourceRef.current?.save({
      columns: 1,
      includeData: false,
      includeContent: true,
    });

    expect(highest && 'items' in highest ? highest.items : undefined).toEqual([
      {
        id: 'literal',
        column: 0,
        row: 0,
        columnSpan: 6,
        rowSpan: 1,
        movable: true,
        resizable: true,
        locked: false,
        data: { kind: 'metric', value: 42 },
      },
    ]);
    expect(requested && 'items' in requested ? requested.items : undefined).toEqual([
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

    if (highest && 'items' in highest) {
      highestTargetRef.current?.load(highest);
    }
    const highestRoundTripped = highestTargetRef.current?.save();
    expect(highestRoundTripped && 'items' in highestRoundTripped ? highestRoundTripped.items : undefined).toEqual(
      highest && 'items' in highest ? highest.items : undefined,
    );

    if (requested && 'items' in requested) {
      targetRef.current?.load(requested);
    }
    const roundTripped = targetRef.current?.save({
      includeData: false,
      includeContent: true,
    });
    expect(roundTripped && 'items' in roundTripped ? roundTripped.items : undefined).toEqual([
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
  });

  it('saves the complete serializable grid options with semantic sentinels', () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();

    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid
          aria-label="Dashboard"
          imperativeRef={imperativeRef}
          columns="auto"
          responsive={{
            targetColumnWidth: 240,
            maxColumns: 8,
            breakpoints: [{ maxWidth: 640, columns: 2, layout: 'list' }],
            observe: 'window',
            layout: 'compact',
          }}
          rowHeight="auto"
          rowHeightThrottle={20}
          gap="12px 8px"
          minRows={2}
          maxRows={20}
          fixedRows={10}
          float
          animate
          direction="auto"
          static
          disableDrag
          disableResize
          lazyMount
          sizeToContent
          printMode="exact"
          collision={{ dragActivationRatio: 0.6, nestingActivationRatio: 0.8 }}
          compactMode="list"
          drag={{
            handleSelector: '.drag-handle',
            cancelSelector: '.no-drag',
            preview: 'clone',
            portal: 'parent',
            scroll: true,
            pause: 150,
          }}
          resize={{ handles: ['e', 'se'], handleVisibility: 'coarse-pointer' }}
          acceptExternal=".widget"
          removable=".trash"
          removal={{ accept: '.allowed', decline: '.blocked' }}
          subGridDefaults={{ columns: 'auto', rowHeight: 'initial', direction: 'auto' }}
          dynamicNesting
          defaultItems={[
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
          ]}
        />
      </DashboardGridProvider>,
    );

    const saved = imperativeRef.current?.save();

    expect('items' in saved! ? saved.options : undefined).toEqual({
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
      subGridDefaults: { columns: 'auto', rowHeight: 'initial', direction: 'auto' },
      dynamicNesting: true,
    });
    expect('items' in saved! ? saved.items[0].subGrid?.options : undefined).toEqual({
      columns: 'auto',
      rowHeight: 'auto',
      direction: 'auto',
      resize: { handles: 'all', handleVisibility: 'always' },
      printMode: 'flow',
    });
  });

  it('round-trips complete and legacy serialized options through load and save', () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const serialized: DashboardGridSerializedGrid = {
      version: 1,
      options: {
        columns: 'auto',
        responsive: {
          targetColumnWidth: 200,
          breakpoints: [{ maxWidth: 500, columns: 1, layout: 'list' }],
          observe: 'grid',
        },
        rowHeight: 'auto',
        direction: 'auto',
        resize: { handles: 'all', handleVisibility: 'hover' },
        drag: { preview: 'item', portal: 'body', pause: true },
        dynamicNesting: true,
        subGridDefaults: { columns: 'auto', printMode: 'flow' },
        printMode: 'exact',
      },
      items: [{ id: 'loaded', column: 0, row: 0 }],
    };

    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid aria-label="Dashboard" imperativeRef={imperativeRef} />
      </DashboardGridProvider>,
    );

    imperativeRef.current?.load(serialized);
    const saved = imperativeRef.current?.save();

    expect('items' in saved! ? saved.options : undefined).toEqual({
      columns: 'auto',
      responsive: {
        targetColumnWidth: 200,
        breakpoints: [{ maxWidth: 500, columns: 1, layout: 'list' }],
        observe: 'grid',
      },
      rowHeight: 'auto',
      direction: 'auto',
      resize: { handles: 'all', handleVisibility: 'hover' },
      drag: { preview: 'item', portal: 'body', pause: true },
      dynamicNesting: true,
      subGridDefaults: { columns: 'auto', printMode: 'flow' },
      printMode: 'exact',
    });

    imperativeRef.current?.load({
      version: 1,
      options: {
        columns: 6,
        minRows: 1,
        maxRows: 12,
        fixedRows: 8,
        float: false,
        disableDrag: false,
        disableResize: true,
        printMode: 'flow',
      },
      items: [{ id: 'legacy', column: 0, row: 0 }],
    });

    const legacySaved = imperativeRef.current?.save();
    expect('items' in legacySaved! ? legacySaved.options : undefined).toEqual({
      columns: 6,
      minRows: 1,
      maxRows: 12,
      fixedRows: 8,
      float: false,
      disableDrag: false,
      disableResize: true,
      printMode: 'flow',
    });
  });

  it('registers model rendering and persistence serialization', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const Serializer = () => {
      useDashboardGridSerializer('metric', {
        serialize: value => `saved:${value}`,
        deserialize: value => String(value).replace('saved:', ''),
        render: value => <span>{`Metric ${value}`}</span>,
      });
      return null;
    };

    render(
      <DashboardGridProvider targetDocument={document}>
        <Serializer />
        <DashboardGrid
          aria-label="Dashboard"
          imperativeRef={imperativeRef}
          defaultItems={[{ id: 'metric', component: 'metric', data: 7 }]}
        />
      </DashboardGridProvider>,
    );

    expect(await screen.findByText('Metric 7')).toBeVisible();
    const saved = imperativeRef.current?.save();
    expect('items' in saved! ? saved.items[0].data : undefined).toBe('saved:7');
  });
});
