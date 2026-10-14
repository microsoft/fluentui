import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Supplied by the monorepo for adjacent tests.
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';
import type { VegaDeclarativeChartProps, VegaSchema, VegaLiteSpec } from './VegaDeclarativeChart';
import type { VegaDataResolver } from './VegaLiteResourceLoader';
import type { LineChartProps } from '../LineChart/index';
import * as adapter from './VegaLiteSchemaAdapter';
import * as views from './VegaDeclarativeChartView';
import { buildVegaViewTree, getVegaViewSourceSpec } from './VegaLiteViewTree';
import {
  integrationLineSpec,
  integrationRangedSpec,
  integrationResourceSpec,
} from '../../testing/fixtures/integration';

const mockObserveNativeRef = jest.fn<void, [LineChartProps['componentRef']]>();

// Observe refs only: retain the actual native renderer, responsiveness, DOM and interactions.
jest.mock('../LineChart/index', () => {
  const actual = jest.requireActual<typeof import('../LineChart/index')>('../LineChart/index');
  const react = jest.requireActual<typeof React>('react');
  return {
    ...actual,
    LineChart: react.forwardRef<HTMLDivElement, LineChartProps>((props, _ref) => {
      mockObserveNativeRef(props.componentRef);
      return <actual.LineChart {...props} />;
    }),
  };
});

// Count semantic factory calls while using the real transformer and every real native chart.
jest.mock('./VegaLiteSchemaAdapter', () => {
  const actual = jest.requireActual<typeof import('./VegaLiteSchemaAdapter')>('./VegaLiteSchemaAdapter');
  return { ...actual, transformVegaLiteToLineChartProps: jest.fn(actual.transformVegaLiteToLineChartProps) };
});

beforeEach(() => {
  resetIdsForTests();
  jest.clearAllMocks();
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

function seriesSpec(kind: 'native' | 'ranged' | 'centered', series: string): VegaLiteSpec {
  const base = kind === 'ranged' ? integrationRangedSpec : integrationLineSpec;
  return {
    ...base,
    ...(kind === 'centered' ? { mark: 'area' as const } : {}),
    data: { values: base.data!.values!.map(row => ({ ...row, series })) },
    encoding: {
      ...base.encoding,
      ...(kind === 'centered' ? { y: { ...base.encoding?.y, stack: 'center' as const } } : {}),
      color: { field: 'series', type: 'nominal' },
    },
  };
}

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

describe('VegaDeclarativeChart architecture', () => {
  it.each(['ranged', 'centered'] as const)(
    'renders exactly one composed %s heading in SSR with the authored label',
    kind => {
      const title = kind === 'ranged' ? 'Ranges' : 'Stream';
      const spec: VegaLiteSpec = {
        hconcat: [
          {
            ...seriesSpec(kind, 'Series'),
            title: { text: title, subtitle: 'Prepared values' },
            width: 400,
            height: 200,
          },
        ],
      };
      const html = renderToString(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
      // Inspect server markup without mounting chart components or running their effects.
      const { container } = render(<div />);
      container.firstElementChild!.innerHTML = html;
      expect(container.querySelectorAll('h3')).toHaveLength(1);
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeVisible();
      expect(screen.getByText('Prepared values')).toBeVisible();
      const svg = container.querySelector('svg')!;
      expect(svg.querySelector('title')).toHaveTextContent(title);
      expect(svg).toHaveAttribute('aria-labelledby', svg.querySelector('title')!.id);
      expect(svg).toHaveAttribute('width', '400');
      expect(svg).toHaveAttribute('height', '200');
      expect(container.innerHTML).not.toMatch(/hidetitle/i);
    },
  );

  it.each(['native', 'ranged', 'centered'] as const)(
    'ignores caller _hideLegend for declared %s legend visibility',
    kind => {
      const spec = freeze({ ...seriesSpec(kind, 'Visible'), _hideLegend: true });
      const { rerender } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
      expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(1);
      expect(screen.getByRole('option', { name: 'Visible' })).toBeTruthy();
      const hidden = freeze({
        ...spec,
        _hideLegend: false,
        encoding: { ...spec.encoding, color: { ...spec.encoding?.color, legend: { disable: true } } },
      });
      rerender(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: hidden }} />);
      expect(screen.queryByRole('listbox', { name: 'Legends' })).toBeNull();
    },
  );

  it('hides native and layered geometry child legends using only the shared internal plan', () => {
    const native = { ...seriesSpec('native', 'Native'), _hideLegend: false };
    const ranged = seriesSpec('ranged', 'Range');
    const centered = seriesSpec('centered', 'Area');
    const layered = ({ mark, ...spec }: VegaLiteSpec): VegaLiteSpec => ({
      ...spec,
      layer: [{ mark: mark!, encoding: { color: spec.encoding?.color } }],
    });
    const spec = freeze({ hconcat: [native, layered(ranged), layered(centered)] });
    const before = JSON.stringify(spec);
    // Unknown private producer properties remain diagnostics in legacy mode, never renderer instructions.
    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container.querySelectorAll('svg')).toHaveLength(3);
    expect(container.querySelectorAll('[data-ranged-mark]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-centered-series]')).toHaveLength(1);
    expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(1);
    container
      .querySelectorAll('[data-vega-view]')
      .forEach(cell => expect(cell.querySelector('[role="listbox"][aria-label="Legends"]')).toBeNull());
    ['Native', 'Range', 'Area'].forEach(name => expect(screen.getByRole('option', { name })).toBeTruthy());
    expect(JSON.stringify(spec)).toBe(before);
  });

  it('retains independent native and geometry legends regardless of caller private flags', () => {
    const spec: VegaLiteSpec = freeze({
      hconcat: [seriesSpec('native', 'Native'), seriesSpec('ranged', 'Range')].map(unit => ({
        ...unit,
        _hideLegend: true,
      })),
      resolve: { scale: { color: 'independent' } },
    });
    render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(2);
  });

  it('restores metadata without modifying either input tree and retains exact WeakMap provenance', () => {
    const spec: VegaLiteSpec = freeze({
      ...integrationRangedSpec,
      transform: [],
      encoding: {
        ...integrationRangedSpec.encoding,
        x2: { field: 'end', aggregate: 'sum', type: 'quantitative', axis: { title: 'Authored finish' } },
      },
    });
    const tree = buildVegaViewTree(spec, { mode: 'strict' });
    if (tree.type !== 'unit') {
      throw new Error('Expected unit fixture');
    }
    const sourceSpec = getVegaViewSourceSpec(tree.spec);
    const before = JSON.stringify(tree);
    freeze(tree);
    const plan = views.planVegaDeclarativeChartViews(tree, spec, { current: new Map() }, false, 'strict');
    if (plan.type !== 'unit') {
      throw new Error('Expected unit plan');
    }
    expect(plan.sourceSpec).toBe(sourceSpec);
    expect(plan.nativeSpec).toBe(sourceSpec);
    expect(plan.spec).not.toBe(tree.spec);
    expect(plan.spec.encoding?.x2?.title).toBe('Authored finish');
    expect(JSON.stringify(tree)).toBe(before);
    expect(getVegaViewSourceSpec(tree.spec)).toBe(sourceSpec);
  });

  it('gives two native children separate, stable imperative refs', () => {
    const spec: VegaLiteSpec = { hconcat: [integrationLineSpec, integrationLineSpec] };
    const { container, rerender } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container.querySelectorAll('svg')).toHaveLength(2);
    const refs = Array.from(
      new Set(mockObserveNativeRef.mock.calls.flatMap(([ref]) => (ref && typeof ref === 'object' ? [ref] : []))),
    );
    expect(refs).toHaveLength(2);
    refs.forEach(ref => expect(ref?.current).toBeTruthy());
    expect(refs[0]?.current).not.toBe(refs[1]?.current);
    rerender(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} className="updated" />);
    expect(
      Array.from(
        new Set(mockObserveNativeRef.mock.calls.flatMap(([ref]) => (ref && typeof ref === 'object' ? [ref] : []))),
      ),
    ).toEqual(refs);
  });

  it('preserves direct-file types and root class/style/ref without an extra wrapper', () => {
    const ref = React.createRef<HTMLDivElement>();
    const chartSchema: VegaSchema = { vegaLiteSpec: integrationLineSpec };
    const props: VegaDeclarativeChartProps = { chartSchema, className: 'host', style: { display: 'block' } };
    const { container, rerender } = render(<VegaDeclarativeChart {...props} ref={ref} />);
    const root = ref.current;
    expect(container.firstElementChild).toBe(root);
    expect(root?.className).toBe('host');
    expect(root?.style.display).toBe('block');
    expect(root?.children).toHaveLength(1);
    expect(root?.querySelector('svg')).toBeTruthy();
    rerender(<VegaDeclarativeChart {...props} ref={ref} className="next" style={{ display: 'grid' }} />);
    expect(ref.current).toBe(root);
    expect(root?.className).toBe('next');
    expect(root?.style.display).toBe('grid');
  });

  it('memoizes planning and native factories across prop/selection changes without stale callbacks', () => {
    const plan = jest.spyOn(views, 'planVegaDeclarativeChartViews');
    const onDiagnostics = jest.fn();
    const oldCallback = jest.fn();
    const nextCallback = jest.fn();
    const spec = seriesSpec('native', 'Series');
    const props = { chartSchema: { vegaLiteSpec: spec, selectedLegends: ['Series'] }, onDiagnostics };
    const { rerender } = render(<VegaDeclarativeChart {...props} onSchemaChange={oldCallback} />);
    const planCalls = plan.mock.calls.length;
    const transform = jest.mocked(adapter.transformVegaLiteToLineChartProps);
    const transformCalls = transform.mock.calls.length;
    expect(transformCalls).toBe(1);
    rerender(<VegaDeclarativeChart {...props} className="next" onSchemaChange={nextCallback} />);
    fireEvent.click(screen.getByRole('option', { name: 'Series' }));
    expect(nextCallback).toHaveBeenCalledWith({ vegaLiteSpec: spec, selectedLegends: [] });
    expect(oldCallback).not.toHaveBeenCalled();
    expect(plan).toHaveBeenCalledTimes(planCalls);
    expect(transform).toHaveBeenCalledTimes(transformCalls);
    expect(onDiagnostics).toHaveBeenCalledTimes(1);
    fireEvent.focus(screen.getByRole('option', { name: '1. Series, 2.' }));
    expect(transform).toHaveBeenCalledTimes(transformCalls);
  });

  it('does not restart host loads or diagnostics on unrelated props, during or after resolution', async () => {
    let resolve!: (value: unknown) => void;
    const pending = new Promise<unknown>(res => {
      resolve = res;
    });
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(() => pending);
    const onDiagnostics = jest.fn();
    const props = {
      chartSchema: { vegaLiteSpec: integrationResourceSpec },
      semanticMode: 'strict' as const,
      dataResolver,
      onDiagnostics,
      dataBaseUrl: 'https://data.example/',
    };
    const { rerender, container } = render(<VegaDeclarativeChart {...props} />);
    await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
    const signal = dataResolver.mock.calls[0][0].signal;
    rerender(<VegaDeclarativeChart {...props} className="pending" />);
    expect(onDiagnostics).toHaveBeenCalledTimes(1);
    expect(dataResolver).toHaveBeenCalledTimes(1);
    expect(signal.aborted).toBe(false);
    await act(async () => resolve('x,y\n1,2\n2,4'));
    expect(container.querySelector('svg')).toBeTruthy();
    const diagnosticCalls = onDiagnostics.mock.calls.length;
    rerender(<VegaDeclarativeChart {...props} className="loaded" style={{ display: 'block' }} />);
    expect(onDiagnostics).toHaveBeenCalledTimes(diagnosticCalls);
    expect(dataResolver).toHaveBeenCalledTimes(1);
    expect(signal.aborted).toBe(false);
  });
});
