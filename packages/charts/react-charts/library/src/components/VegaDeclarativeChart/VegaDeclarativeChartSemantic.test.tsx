import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- The monorepo supplies React Testing Library for adjacent tests.
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { VegaDeclarativeChart, validateVegaLiteSpec, resolveVegaLiteResources } from '../../VegaDeclarativeChart';
import type {
  VegaDataResolver,
  VegaLiteDiagnostic,
  VegaLiteSpec,
  VegaDeclarativeChartProps,
} from '../../VegaDeclarativeChart';
import {
  integrationLineSpec,
  integrationConcatSpec,
  integrationFacetSpec,
  integrationRepeatSpec,
  integrationRangedSpec,
  integrationLegendSpec,
  integrationResourceSpec,
  integrationAggregateSpec,
} from '../../testing/fixtures/integration';

beforeEach(() => {
  resetIdsForTests();
  // jsdom has no layout or resolved token margins. Model native chart/legend/text measurements,
  // rather than suppressing invalid-SVG warnings or replacing any chart renderer.
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const text = this.tagName.toLowerCase() === 'text';
    const legend = this.getAttribute('role') === 'listbox' || /legend/i.test(this.getAttribute('class') ?? '');
    const height = text ? 18 : legend ? 32 : 400;
    const width = text ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
    return { width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => ({}) };
  });
  const computedStyle = globalThis.getComputedStyle;
  jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
    const style = computedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (property: string) => style.getPropertyValue(property),
    } as CSSStyleDeclaration;
  });
});

afterEach(() => jest.restoreAllMocks());

function deferred() {
  let resolve!: (value: unknown) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<unknown>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function chart(spec: VegaLiteSpec, props: Partial<VegaDeclarativeChartProps> = {}) {
  return <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} {...props} />;
}

describe('VegaDeclarativeChart public semantics', () => {
  it('renders centered areas through the public responsive boundary with raw-value tooltips', async () => {
    const spec: VegaLiteSpec = {
      width: 640,
      height: 400,
      mark: 'area',
      data: {
        values: [
          { x: 1, series: 'First', amount: 2 },
          { x: 1, series: 'Second', amount: 6 },
          { x: 2, series: 'First', amount: 4 },
          { x: 2, series: 'Second', amount: 4 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'amount', type: 'quantitative', stack: 'center' },
        color: { field: 'series', type: 'nominal' },
        tooltip: [
          { field: 'series', title: 'Series' },
          { field: 'amount', title: 'Amount' },
        ],
      },
    };
    const before = JSON.stringify(spec);
    const { container } = render(chart(spec, { semanticMode: 'strict' }));
    expect(container.querySelectorAll('path[data-centered-series]')).toHaveLength(2);
    const point = screen.getByLabelText('Series: First; Amount: 2');
    fireEvent.focus(point);
    expect(await screen.findByRole('tooltip', { name: 'Series: First; Amount: 2' })).toBeTruthy();
    expect(JSON.stringify(spec)).toBe(before);
  });

  it('renders histogram count-without-field from all source rows, not projected aggregate rows', () => {
    const spec: VegaLiteSpec = {
      width: 640,
      height: 400,
      mark: 'bar',
      data: { values: [{ value: 1 }, { value: 1 }, { value: 2 }] },
      encoding: {
        x: { field: 'value', type: 'quantitative', bin: { extent: [0, 10], step: 10 } },
        y: { aggregate: 'count', type: 'quantitative', title: 'Frequency' },
        tooltip: [{ aggregate: 'count', type: 'quantitative', title: 'Records' }],
      },
    };
    render(chart(spec, { semanticMode: 'strict' }));
    expect(screen.getByLabelText('Records: 3')).toBeTruthy();
    expect(screen.getByRole('region', { name: /Y axis displays Frequency/ })).toBeTruthy();
  });

  it('retains timeUnit and aggregate EMA metadata in native tooltip aliases', async () => {
    const spec: VegaLiteSpec = {
      width: 640,
      height: 400,
      mark: 'line',
      data: {
        values: [
          { when: '2024-01-02', amount: 2 },
          { when: '2024-01-03', amount: 6 },
        ],
      },
      transform: [{ calculate: 'datum.amount + 1', as: 'amount' }],
      encoding: {
        x: { field: 'when', type: 'temporal', timeUnit: 'utcmonth' },
        y: { field: 'amount', aggregate: { exponential: 0.5 }, type: 'quantitative', title: 'EMA' },
        tooltip: [
          { field: 'when', type: 'temporal', timeUnit: 'utcmonth', title: 'Month' },
          { field: 'amount', aggregate: { exponential: 0.5 }, type: 'quantitative', format: '.2f', title: 'EMA' },
        ],
      },
    };
    render(chart(spec, { semanticMode: 'strict' }));
    const point = screen.getByLabelText('Month: January; EMA: 5.67');
    expect(point.getAttribute('aria-label')).not.toContain('__vega_');
    fireEvent.focus(point);
    expect(await screen.findByRole('tooltip', { name: 'Month: January; EMA: 5.67' })).toBeTruthy();
  });

  it('binds normalized native stack tooltips to raw contributions before normalization', async () => {
    const spec: VegaLiteSpec = {
      width: 640,
      height: 400,
      mark: 'bar',
      data: {
        values: [
          { category: 'A', series: 'First', amount: 2 },
          { category: 'A', series: 'Second', amount: 6 },
        ],
      },
      encoding: {
        x: { field: 'category', type: 'nominal' },
        y: { field: 'amount', type: 'quantitative', stack: 'normalize' },
        color: { field: 'series', type: 'nominal' },
        tooltip: [
          { field: 'series', title: 'Series' },
          { field: 'amount', type: 'quantitative', title: 'Raw amount' },
        ],
      },
    };
    render(chart(spec, { semanticMode: 'strict' }));
    const first = screen.getByLabelText('Series: First; Raw amount: 2');
    expect(first).toBeTruthy();
    expect(screen.getByLabelText('Series: Second; Raw amount: 6')).toBeTruthy();
    expect(screen.queryByLabelText('Series: First; Raw amount: 0.25')).toBeNull();
    fireEvent.focus(first);
    expect(await screen.findByRole('tooltip', { name: 'Series: First; Raw amount: 2' })).toBeTruthy();
  });

  it('exports additive validation and host resource APIs from the root barrel', () => {
    expect(validateVegaLiteSpec(integrationLineSpec, { mode: 'strict' })).toEqual([]);
    expect(typeof resolveVegaLiteResources).toBe('function');
    const props: Partial<VegaDeclarativeChartProps> = {
      semanticMode: 'strict',
      onDiagnostics: (diagnostics: VegaLiteDiagnostic[]) => {
        expect(Array.isArray(diagnostics)).toBe(true);
      },
      allowedDataOrigins: ['https://data.example'],
      dataBaseUrl: 'https://data.example/',
      dataResolver: async () => [],
    };
    expect(props.semanticMode).toBe('strict');
  });

  it('keeps the ordinary legacy unit root/ref/class/style shape', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <VegaDeclarativeChart
        ref={ref}
        chartSchema={{ vegaLiteSpec: integrationLineSpec }}
        className="host"
        style={{ display: 'block' }}
      />,
    );
    expect(container.firstElementChild).toBe(ref.current);
    expect(ref.current?.className).toBe('host');
    expect(ref.current?.children).toHaveLength(1);
    expect(ref.current?.querySelector('svg')).not.toBeNull();
  });

  it.each(['legacy', 'strict'] as const)('renders named nested concat recursively in %s mode', semanticMode => {
    const source = JSON.stringify(integrationConcatSpec);
    const { container } = render(chart(integrationConcatSpec, { semanticMode }));
    expect(container.querySelectorAll('[data-vega-view]')).toHaveLength(4);
    expect(container.querySelectorAll('svg')).toHaveLength(4);
    expect(JSON.stringify(integrationConcatSpec)).toBe(source);
  });

  it('renders all flat concat cells', () => {
    const { mark: _mark, ...base } = integrationLineSpec;
    const { container } = render(
      chart(
        { ...base, concat: [{ mark: 'line' }, { mark: 'point' }, { mark: 'line' }], columns: 2 },
        { semanticMode: 'strict' },
      ),
    );
    expect(container.querySelectorAll('[data-vega-view]')).toHaveLength(3);
  });

  it('renders facet headers and accessible empty cells without native missing-field errors', () => {
    const { container } = render(chart(integrationFacetSpec, { semanticMode: 'strict' }));
    expect(container.querySelectorAll('[data-vega-view]')).toHaveLength(6);
    expect(container.querySelectorAll('svg')).toHaveLength(3);
    expect(screen.getAllByRole('region').filter(region => region.textContent?.includes('No data'))).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Region: (missing) · Quarter: Q1' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Region: North · Quarter: Q2' })).toBeTruthy();
  });

  it('renders every repeat matrix cell', () => {
    const { container } = render(chart(integrationRepeatSpec, { semanticMode: 'strict' }));
    expect(container.querySelectorAll('[data-vega-view]')).toHaveLength(4);
    expect(container.querySelectorAll('svg')).toHaveLength(4);
  });

  it('renders a composed layered cell as empty when all child pipelines filter out their rows', () => {
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { group: 'A', x: 1, y: 2 },
          { group: 'B', x: 2, y: 3 },
        ],
      },
      facet: { field: 'group' },
      spec: {
        width: 640,
        height: 400,
        encoding: integrationLineSpec.encoding,
        layer: [
          { mark: 'line', transform: [{ filter: 'datum.group === "A"' }] },
          { mark: 'point', transform: [{ filter: 'datum.group === "A"' }] },
        ],
      },
    };
    const { container } = render(chart(spec));
    expect(container.querySelectorAll('[data-vega-view]')).toHaveLength(2);
    expect(screen.getByRole('region', { name: 'group: B' }).textContent).toContain('No data');
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('retains authored ranged aggregate axis titles instead of generated aliases', () => {
    const spec: VegaLiteSpec = {
      ...integrationAggregateSpec,
      encoding: {
        ...integrationAggregateSpec.encoding,
        x: { ...integrationAggregateSpec.encoding?.x, aggregate: 'min', axis: { title: 'Authored start' } },
      },
    };
    const { container } = render(chart(spec, { semanticMode: 'strict' }));
    expect(container.querySelector('[data-ranged-mark]')?.getAttribute('aria-label')).not.toContain('__vega_');
    expect(screen.getByRole('img', { name: 'Sum of end: 5.0' })).toBeTruthy();
    expect(screen.getByText('Authored start')).toBeTruthy();
  });

  it('supports explicit config-only tooltip null in strict mode without exposing extra source columns', () => {
    const spec: VegaLiteSpec = {
      ...integrationLineSpec,
      data: { values: [{ x: 1, y: 2, secret: 'PRIVATE' }] },
      config: { mark: { tooltip: null } },
    };
    const { container } = render(chart(spec, { semanticMode: 'strict' }));
    expect(container.textContent).not.toContain('PRIVATE');
    expect(container.innerHTML).not.toContain('PRIVATE');
  });

  it('unions child series into one shared legend, including nonfirst children', () => {
    render(chart(integrationLegendSpec, { semanticMode: 'strict' }));
    expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'Later' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Last' })).toBeTruthy();
  });

  it('keeps independent color legends and palettes scoped to each child', () => {
    const spec: VegaLiteSpec = { ...integrationLegendSpec, resolve: { scale: { color: 'independent' } } };
    render(chart(spec, { semanticMode: 'strict' }));
    expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(2);
    expect(screen.getByRole('option', { name: 'Later' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Last' })).toBeTruthy();
  });

  it('does not hide a layered native legend at an independent composed color boundary', () => {
    const child: VegaLiteSpec = {
      ...integrationLineSpec,
      data: { values: [{ x: 1, y: 2, series: 'Layer series' }] },
      mark: undefined,
      encoding: { ...integrationLineSpec.encoding, color: { field: 'series', type: 'nominal' } },
      layer: [{ mark: 'line' }],
    };
    render(chart({ hconcat: [child], resolve: { scale: { color: 'independent' } } }));
    expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'Layer series' })).toBeTruthy();
  });

  it('does not leak a same-named independent series palette across children', () => {
    const child = (color: string): VegaLiteSpec => ({
      ...integrationLineSpec,
      data: { values: [{ x: 1, y: 2, series: 'Common' }] },
      encoding: {
        ...integrationLineSpec.encoding,
        color: { field: 'series', type: 'nominal', scale: { range: [color] } },
      },
    });
    render(
      chart(
        {
          hconcat: [child(tokens.colorPaletteRedBackground3), child(tokens.colorPaletteBlueBackground2)],
          resolve: { scale: { color: 'independent' } },
        },
        { semanticMode: 'strict' },
      ),
    );
    const legends = screen.getAllByRole('option', { name: 'Common' });
    expect(legends).toHaveLength(2);
    expect(legends[0].style.getPropertyValue('--rect-backgroundColor')).toBe(tokens.colorPaletteRedBackground3);
    expect(legends[1].style.getPropertyValue('--rect-backgroundColor')).toBe(tokens.colorPaletteBlueBackground2);
  });

  it('preserves the original immutable schema on shared legend changes', () => {
    const onSchemaChange = jest.fn();
    render(chart(integrationLegendSpec, { onSchemaChange, semanticMode: 'strict' }));
    fireEvent.click(screen.getByRole('option', { name: 'Last' }));
    expect(onSchemaChange).toHaveBeenLastCalledWith({ vegaLiteSpec: integrationLegendSpec, selectedLegends: ['Last'] });
    expect(onSchemaChange.mock.calls[0][0].vegaLiteSpec).toBe(integrationLegendSpec);
  });

  it('routes prepared ranges with transforms applied exactly once and formatted ARIA/tooltips', async () => {
    const source = JSON.stringify(integrationRangedSpec);
    const { container } = render(chart(integrationRangedSpec, { semanticMode: 'strict' }));
    const mark = screen.getByRole('img', { name: 'Task: Alpha; Finish: 5.0' });
    expect(container.querySelectorAll('[data-ranged-mark]')).toHaveLength(1);
    fireEvent.focus(mark);
    expect(await screen.findByRole('tooltip', { name: 'Task: Alpha; Finish: 5.0' })).toBeTruthy();
    expect(JSON.stringify(integrationRangedSpec)).toBe(source);
  });

  it('disables ranged callouts for tooltip:null while keeping meaningful ARIA', () => {
    const spec = { ...integrationRangedSpec, encoding: { ...integrationRangedSpec.encoding, tooltip: null } };
    render(chart(spec, { semanticMode: 'strict' }));
    fireEvent.focus(screen.getByRole('img'));
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Alpha');
  });

  it('keeps prepared aggregate aliases out of tooltip and ARIA titles', async () => {
    render(chart(integrationAggregateSpec, { semanticMode: 'strict' }));
    const mark = screen.getByRole('img', { name: 'Sum of end: 5.0' });
    fireEvent.focus(mark);
    expect(await screen.findByRole('tooltip', { name: 'Sum of end: 5.0' })).toBeTruthy();
    expect(mark.getAttribute('aria-label')).not.toContain('__vega_');
  });

  it('keeps ranged viewport dimensions inside the requested responsive container', () => {
    const { container } = render(chart(integrationRangedSpec, { semanticMode: 'strict' }));
    expect(container.querySelector('svg')?.getAttribute('width')).toBe('240');
    expect(container.querySelector('svg')?.getAttribute('height')).toBe('120');
  });

  it('reports legacy capability warnings only after commit, never during SSR/render', () => {
    const onDiagnostics = jest.fn();
    const spec = { ...integrationLineSpec, params: [{ name: 'selection' }] };
    renderToString(chart(spec, { onDiagnostics }));
    expect(onDiagnostics).not.toHaveBeenCalled();
    const { rerender } = render(chart(spec, { onDiagnostics }));
    expect(onDiagnostics).toHaveBeenCalledTimes(1);
    expect(onDiagnostics.mock.calls[0][0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ severity: 'warning', path: '$.params', remedy: expect.any(String) }),
      ]),
    );
    rerender(chart(spec, { onDiagnostics, className: 'changed' }));
    expect(onDiagnostics).toHaveBeenCalledTimes(1);
  });

  it('throws actionable strict preflight paths before native fallback or resource side effects', () => {
    const onDiagnostics = jest.fn();
    const dataResolver = jest.fn();
    const spec = { ...integrationResourceSpec, params: [{ name: 'selection' }] };
    const errors = jest.spyOn(console, 'error').mockImplementation();
    try {
      expect(() => render(chart(spec, { semanticMode: 'strict', onDiagnostics, dataResolver }))).toThrow(/\$\.params/);
      expect(onDiagnostics).not.toHaveBeenCalled();
      expect(dataResolver).not.toHaveBeenCalled();
    } finally {
      errors.mockRestore();
    }
  });

  it('rejects unresolved named data clearly in strict mode', () => {
    expect(() =>
      renderToString(chart({ ...integrationLineSpec, data: { name: 'missing' } }, { semanticMode: 'strict' })),
    ).toThrow(/\$\.data\.name/);
  });

  it('guards unsafe accessors before rendering or host callbacks without invoking them', () => {
    const getter = jest.fn(() => integrationLineSpec.data);
    const spec = { ...integrationLineSpec };
    Object.defineProperty(spec, 'data', { get: getter, enumerable: true });
    expect(() => renderToString(chart(spec))).toThrow(/unsafe-accessor|Accessor/);
    expect(getter).not.toHaveBeenCalled();
  });

  it('guards excessive specifications before tree expansion', () => {
    const spec = { ...integrationLineSpec, data: { values: new Array(100001) } };
    expect(() => renderToString(chart(spec))).toThrow(/work-limit|budget|inspection/);
  });

  it('rejects excessive declared repeat expansion before a host resolver can run', () => {
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async () => []);
    const spec: VegaLiteSpec = {
      data: integrationResourceSpec.data,
      repeat: { row: Array.from({ length: 101 }, () => 'x'), column: Array.from({ length: 101 }, () => 'y') },
      spec: { mark: 'point', encoding: integrationLineSpec.encoding },
    };
    expect(() => renderToString(chart(spec, { semanticMode: 'strict', dataResolver }))).toThrow(/expansion budget/);
    expect(dataResolver).not.toHaveBeenCalled();
  });
});

describe('VegaDeclarativeChart public resources', () => {
  it('does not perform host I/O during SSR and renders an accessible initial placeholder', () => {
    const dataResolver: VegaDataResolver = jest.fn(async () => []);
    const onDiagnostics = jest.fn();
    const html = renderToString(
      chart(integrationResourceSpec, {
        semanticMode: 'strict',
        dataResolver,
        dataBaseUrl: 'https://data.example/',
        onDiagnostics,
      }),
    );
    expect(html).toContain('role="status"');
    expect(dataResolver).not.toHaveBeenCalled();
    expect(onDiagnostics).not.toHaveBeenCalled();
  });

  it('requires an explicit resolver in strict mode; never creates default network access', () => {
    expect(() => renderToString(chart(integrationResourceSpec, { semanticMode: 'strict' }))).toThrow(
      /\$\.data\.url.*resolver/i,
    );
  });

  it('renders loading then parsed resource data via a host resolver', async () => {
    const pending = deferred();
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(() => pending.promise);
    const { container } = render(
      chart(integrationResourceSpec, { semanticMode: 'strict', dataResolver, dataBaseUrl: 'https://data.example/' }),
    );
    expect(screen.getByRole('status').textContent).toMatch(/loading/i);
    await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
    expect(dataResolver.mock.calls[0]).toEqual([expect.objectContaining({ url: 'https://data.example/table.csv' })]);
    await act(async () => pending.resolve('x,y\n1,2\n2,4'));
    expect(screen.queryByRole('status')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders an accessible resource error', async () => {
    const dataResolver: VegaDataResolver = async () => {
      throw new Error('Host unavailable');
    };
    render(chart(integrationResourceSpec, { dataResolver, dataBaseUrl: 'https://data.example/' }));
    expect((await screen.findByRole('alert')).textContent).toContain('Host unavailable');
  });

  it('aborts and suppresses stale completions when the data specification changes', async () => {
    const old = deferred();
    const next = deferred();
    const dataResolver = jest
      .fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>()
      .mockImplementationOnce(() => old.promise)
      .mockImplementationOnce(() => next.promise);
    const props = { dataResolver, semanticMode: 'strict' as const, dataBaseUrl: 'https://data.example/' };
    const { container, rerender } = render(chart(integrationResourceSpec, props));
    await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
    const signal = dataResolver.mock.calls[0][0].signal;
    rerender(chart({ ...integrationResourceSpec, data: { url: 'next.json' } }, props));
    await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(2));
    expect(signal.aborted).toBe(true);
    await act(async () => next.resolve([{ x: 1, y: 9 }]));
    expect(container.querySelector('svg')).not.toBeNull();
    await act(async () => old.reject(new Error('Stale error')));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('aborts on unmount', async () => {
    const pending = deferred();
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(() => pending.promise);
    const { unmount } = render(chart(integrationResourceSpec, { dataResolver, dataBaseUrl: 'https://data.example/' }));
    await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
    const signal = dataResolver.mock.calls[0][0].signal;
    unmount();
    expect(signal.aborted).toBe(true);
    await act(async () => pending.resolve([]));
  });

  it('aborts an old resource when switching to inline data and ignores its late success', async () => {
    const pending = deferred();
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(() => pending.promise);
    const props = { dataResolver, dataBaseUrl: 'https://data.example/', semanticMode: 'strict' as const };
    const { container, rerender } = render(chart(integrationResourceSpec, props));
    await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
    const signal = dataResolver.mock.calls[0][0].signal;
    rerender(chart(integrationLineSpec, props));
    expect(signal.aborted).toBe(true);
    const svg = container.querySelector('svg');
    await act(async () => pending.resolve('x,y\n9,99'));
    expect(container.querySelector('svg')).toBe(svg);
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  // eslint-disable-next-line no-script-url -- Hostile data is intentionally rejected before any host I/O.
  it.each([
    'javascript:alert(1)',
    'file:///secret',
    'https://user:password@data.example/table',
    'https://untrusted.example/table',
  ])('never calls the host for malicious or disallowed URL %s', async url => {
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async () => []);
    render(chart({ ...integrationLineSpec, data: { url } }, { dataResolver, dataBaseUrl: 'https://data.example/' }));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(dataResolver).not.toHaveBeenCalled();
  });
});
