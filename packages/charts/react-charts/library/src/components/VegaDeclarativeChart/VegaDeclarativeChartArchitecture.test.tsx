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
import * as diagnostics from './VegaLiteDiagnostics';
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

function groupedRouteSpec(budget: boolean, title?: string): VegaLiteSpec {
  // Small gallery representatives, not story imports or copies of the entire gallery.
  const categoryField = budget ? 'department' : 'region';
  const valueField = budget ? 'amount' : 'count';
  return {
    width: 400,
    height: 200,
    ...(title ? { title } : {}),
    mark: 'bar',
    data: {
      values: budget
        ? [
            { department: 'Marketing', category: 'Budget', amount: 250000 },
            { department: 'Marketing', category: 'Actual', amount: 235000 },
            { department: 'Engineering', category: 'Budget', amount: 450000 },
            { department: 'Engineering', category: 'Actual', amount: 478000 },
            { department: 'Sales', category: 'Budget', amount: 320000 },
            { department: 'Sales', category: 'Actual', amount: 310000 },
            { department: 'Operations', category: 'Budget', amount: 180000 },
            { department: 'Operations', category: 'Actual', amount: 192000 },
          ]
        : [
            { region: 'Amazon', category: 'Mammals', count: 427 },
            { region: 'Amazon', category: 'Birds', count: 1300 },
            { region: 'Congo', category: 'Mammals', count: 268 },
            { region: 'Congo', category: 'Birds', count: 700 },
          ],
    },
    encoding: {
      x: { field: categoryField, type: 'nominal', axis: { title: budget ? 'Department' : 'Region' } },
      y: {
        field: valueField,
        type: 'quantitative',
        axis: budget ? { title: 'Amount ($)', format: '$,.0f' } : { title: 'Species Count' },
      },
      color: {
        field: 'category',
        type: 'nominal',
        ...(budget ? { scale: { domain: ['Budget', 'Actual'] } } : {}),
      },
      xOffset: { field: 'category' },
    },
  };
}

describe('VegaDeclarativeChart architecture', () => {
  describe.each([
    { name: 'untitled region gallery', spec: freeze(groupedRouteSpec(false)) },
    { name: 'titled region gallery', spec: freeze(groupedRouteSpec(false, 'Biodiversity by Rainforest Region')) },
    { name: 'budget gallery', spec: freeze(groupedRouteSpec(true, 'Budget vs Actual - Department Comparison')) },
    ...(['x', 'y', 'both'] as const).map(axes => {
      const spec = groupedRouteSpec(false, 'Grouped bars with inferred types');
      if (axes !== 'y') {
        delete spec.encoding!.x!.type;
      }
      if (axes !== 'x') {
        delete spec.encoding!.y!.type;
        spec.encoding!.y!.aggregate = 'sum';
      }
      return { name: `omitted ${axes} types${axes === 'x' ? '' : ' with aggregate y'}`, spec: freeze(spec) };
    }),
  ])('$name grouped routing', ({ spec }) => {
    it.each([undefined, 'legacy', 'strict'] as const)('uses the actual renderer for %s mode', semanticMode => {
      const before = JSON.stringify(spec);
      expect(diagnostics.validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
      );
      expect(container.querySelectorAll('svg')).toHaveLength(1);
      const svg = container.querySelector('svg')!;
      if (semanticMode === 'strict') {
        expect(svg).not.toHaveClass('fui-cart__chart');
        if (spec.title) {
          expect(svg.querySelector('title')).toHaveTextContent(spec.title as string);
        }
        const marks = svg.querySelectorAll('path[data-ranged-mark][role="img"][tabindex="0"]');
        expect(marks).toHaveLength(spec.data!.values!.length);
        marks.forEach(mark => {
          expect(mark.getAttribute('d')).toMatch(/^M.+Z$/);
          expect(mark.getAttribute('d')).not.toMatch(/NaN|Infinity/);
          expect(mark.getAttribute('aria-label')).toBeTruthy();
        });
      } else {
        expect(svg).toHaveClass('fui-cart__chart');
        expect(svg).toHaveAttribute('role', 'region');
        expect(svg).toHaveAttribute(
          'aria-label',
          expect.stringContaining('Vertical bar chart with 2 grouped bar series.'),
        );
        expect(svg.getAttribute('aria-label')).toContain(`The X axis displays ${spec.encoding!.x!.axis!.title}.`);
        expect(svg.getAttribute('aria-label')).toContain(`The Y axis displays ${spec.encoding!.y!.axis!.title}.`);
        if (spec.title) {
          expect(svg.getAttribute('aria-label')).toContain(spec.title as string);
        }
        expect(container.querySelectorAll('[data-ranged-mark]')).toHaveLength(0);
        const bars = svg.querySelectorAll('rect[role="option"][tabindex="0"]');
        expect(bars).toHaveLength(spec.data!.values!.length);
        bars.forEach(bar => {
          expect(bar.getAttribute('aria-label')).toBeTruthy();
          ['x', 'y', 'width', 'height'].forEach(attribute => {
            expect(bar).toHaveAttribute(attribute);
            expect(Number.isFinite(Number(bar.getAttribute(attribute)))).toBe(true);
          });
          ['width', 'height'].forEach(attribute => expect(Number(bar.getAttribute(attribute))).toBeGreaterThan(0));
          expect(bar.outerHTML).not.toMatch(/NaN|Infinity/);
        });
      }
      expect(JSON.stringify(spec)).toBe(before);
    });
  });

  it.each([undefined, 'legacy', 'strict'] as const)(
    'renders a native polar chart without Cartesian x/y channels in %s mode',
    semanticMode => {
      const spec: VegaLiteSpec = freeze({
        ...integrationLineSpec,
        mark: 'arc',
        encoding: { theta: integrationLineSpec.encoding!.x, radius: integrationLineSpec.encoding!.y },
      });
      const before = JSON.stringify(spec);
      expect(diagnostics.validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
      );
      expect(container.querySelectorAll('svg')).toHaveLength(1);
      expect(container.querySelectorAll('svg circle[role="img"]')).toHaveLength(spec.data!.values!.length);
      expect(container.querySelector('svg')!.outerHTML).not.toMatch(/NaN|Infinity/);
      expect(JSON.stringify(spec)).toBe(before);
    },
  );

  describe.each(['x2', 'y2', 'independent xOffset'] as const)('%s new geometry routing', kind => {
    it.each([undefined, 'legacy', 'strict'] as const)('remains ranged in %s mode', semanticMode => {
      const grouped = groupedRouteSpec(false);
      const spec: VegaLiteSpec = freeze({
        ...grouped,
        data: { values: grouped.data!.values!.map(row => ({ ...row, start: 1, end: 4, scenario: row.region })) },
        encoding:
          kind === 'x2'
            ? {
                x: { field: 'start', type: 'quantitative' },
                x2: { field: 'end' },
                y: { field: 'region', type: 'nominal' },
                color: grouped.encoding!.color,
              }
            : kind === 'y2'
            ? { ...grouped.encoding, y: { field: 'start', type: 'quantitative' }, y2: { field: 'end' } }
            : { ...grouped.encoding, xOffset: { field: 'scenario', type: 'nominal' } },
      });
      expect(diagnostics.validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
      );
      expect(container.querySelector('svg.fui-cart__chart')).toBeNull();
      const marks = container.querySelectorAll('svg path[data-ranged-mark][role="img"][tabindex="0"]');
      expect(marks).toHaveLength(4);
      marks.forEach(mark => {
        expect(mark.getAttribute('d')).toMatch(/^M.+Z$/);
        expect(mark.getAttribute('d')).not.toMatch(/NaN|Infinity/);
      });
    });
  });

  it.each([undefined, 'legacy', 'strict'] as const)(
    'keeps centered areas on shared geometry in %s mode',
    semanticMode => {
      const spec = freeze(seriesSpec('centered', 'Stream'));
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode={semanticMode} />,
      );
      expect(container.querySelector('svg.fui-cart__chart')).toBeNull();
      expect(container.querySelectorAll('[data-centered-navigation]')).toHaveLength(1);
      expect(container.querySelectorAll('svg path[data-centered-series]')).toHaveLength(1);
      const marks = container.querySelectorAll('svg circle[data-centered-point][role="img"][tabindex="0"]');
      expect(marks).toHaveLength(2);
      marks.forEach(mark => expect(mark.outerHTML).not.toMatch(/NaN|Infinity/));
    },
  );

  it('independently server-renders the same sampled ranged tuples and paths without mutating the frozen input', () => {
    const spec: VegaLiteSpec = freeze({
      width: 400,
      height: 200,
      mark: 'bar',
      data: {
        values: Array.from({ length: 100 }, (_, index) => ({ task: `Task ${index}`, start: index, end: index + 2 })),
      },
      transform: [{ sample: 7 }],
      encoding: {
        x: { field: 'start', type: 'quantitative' },
        x2: { field: 'end' },
        y: { field: 'task', type: 'nominal' },
        tooltip: [{ field: 'task', title: 'Task' }],
      },
    });
    const before = JSON.stringify(spec);
    const chart = <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />;
    const first = renderToString(chart);
    const second = renderToString(chart);
    // Only generated IDs and their references may differ between independent SSR roots.
    const normalizeIds = (markup: string) => {
      const svgId = markup.match(/<svg id="([^"]+)"/)![1];
      return markup.replace(
        /\b(id|aria-labelledby|aria-describedby|clip-path)="([^"]*)"/g,
        (_match, attribute: string, value: string) => `${attribute}="${value.split(svgId).join('vega-ranged-ID')}"`,
      );
    };
    expect(normalizeIds(second)).toBe(normalizeIds(first));
    const { container } = render(<div />);
    container.firstElementChild!.innerHTML = first;
    const marks = container.querySelectorAll('svg path[data-ranged-mark][role="img"][tabindex="0"]');
    expect(marks).toHaveLength(7);
    const labels = Array.from(marks, mark => mark.getAttribute('aria-label'));
    expect(new Set(labels).size).toBe(7);
    labels.forEach(label => expect(label).toMatch(/^Task: Task \d+$/));
    marks.forEach(mark => {
      expect(mark.getAttribute('d')).toMatch(/^M.+Z$/);
      expect(mark.getAttribute('d')).not.toMatch(/NaN|Infinity/);
    });
    expect(JSON.stringify(spec)).toBe(before);
  });

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

  it('bounds notifications when an inline diagnostics callback updates parent state', () => {
    const onDiagnostics = jest.fn();
    function Host() {
      const [notifications, setNotifications] = React.useState(0);
      return (
        <>
          <output data-testid="notifications">{notifications}</output>
          <VegaDeclarativeChart
            chartSchema={{ vegaLiteSpec: integrationLineSpec }}
            onDiagnostics={items => {
              onDiagnostics(items);
              if (onDiagnostics.mock.calls.length > 3) {
                throw new Error('Unbounded diagnostics notifications');
              }
              setNotifications(count => count + 1);
            }}
          />
        </>
      );
    }
    render(<Host />);
    expect(onDiagnostics).toHaveBeenCalledTimes(1);
    expect(onDiagnostics).toHaveBeenCalledWith([]);
    expect(screen.getByTestId('notifications')).toHaveTextContent('1');
  });

  it('notifies only on diagnostic changes and uses the latest callback after parent and legend rerenders', () => {
    const previousCallback = jest.fn();
    const latestCallback = jest.fn();
    const spec = seriesSpec('native', 'Series');
    const props = { chartSchema: { vegaLiteSpec: spec } };
    const { rerender } = render(<VegaDeclarativeChart {...props} onDiagnostics={previousCallback} />);
    expect(previousCallback).toHaveBeenCalledTimes(1);
    expect(previousCallback).toHaveBeenCalledWith([]);
    rerender(<VegaDeclarativeChart {...props} className="parent-update" onDiagnostics={latestCallback} />);
    fireEvent.click(screen.getByRole('option', { name: 'Series' }));
    expect(previousCallback).toHaveBeenCalledTimes(1);
    expect(latestCallback).not.toHaveBeenCalled();
    const nextSpec = { ...spec, ignored: true };
    rerender(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: nextSpec }} onDiagnostics={latestCallback} />);
    expect(previousCallback).toHaveBeenCalledTimes(1);
    expect(latestCallback).toHaveBeenCalledTimes(1);
    expect(latestCallback).toHaveBeenCalledWith([
      expect.objectContaining({ code: 'unsupported-property', path: '$.ignored', severity: 'warning' }),
    ]);
    rerender(
      <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: nextSpec }} onDiagnostics={items => latestCallback(items)} />,
    );
    expect(latestCallback).toHaveBeenCalledTimes(1);
  });

  it('does not replay diagnostics when a callback is supplied after being absent', () => {
    const onDiagnostics = jest.fn();
    const props = { chartSchema: { vegaLiteSpec: integrationLineSpec } };
    const { rerender } = render(<VegaDeclarativeChart {...props} />);
    rerender(<VegaDeclarativeChart {...props} onDiagnostics={onDiagnostics} />);
    expect(onDiagnostics).not.toHaveBeenCalled();
    rerender(
      <VegaDeclarativeChart
        chartSchema={{ vegaLiteSpec: Object.assign({}, integrationLineSpec, { ignored: true }) }}
        onDiagnostics={onDiagnostics}
      />,
    );
    expect(onDiagnostics).toHaveBeenCalledTimes(1);
    expect(onDiagnostics).toHaveBeenCalledWith([expect.objectContaining({ path: '$.ignored' })]);
  });

  it('never notifies diagnostics during server rendering', () => {
    const onDiagnostics = jest.fn();
    const spec = { ...integrationLineSpec, ignored: true };
    expect(
      renderToString(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} onDiagnostics={onDiagnostics} />),
    ).toContain('<svg');
    expect(onDiagnostics).not.toHaveBeenCalled();
  });

  it.each(['legacy', 'strict'] as const)(
    'rejects uninspectable objects by diagnostic code, not message wording, in %s mode',
    semanticMode => {
      const validate = diagnostics.validateVegaLiteSpec;
      jest
        .spyOn(diagnostics, 'validateVegaLiteSpec')
        .mockImplementation((...args) =>
          validate(...args).map(item => ({ ...item, message: 'Host object rejected.' })),
        );
      for (const trap of ['getPrototypeOf', 'ownKeys', 'getOwnPropertyDescriptor'] as const) {
        for (const nested of [false, true]) {
          const exotic = new Proxy<VegaLiteSpec>(
            { mark: 'line' },
            {
              [trap]: () => {
                throw new Error('Proxy trap must not escape');
              },
            },
          );
          const spec = nested
            ? { ...integrationLineSpec, data: { values: [{ x: 1, y: 2, payload: exotic }] } }
            : exotic;
          const onDiagnostics = jest.fn();
          expect(() =>
            renderToString(
              <VegaDeclarativeChart
                chartSchema={{ vegaLiteSpec: spec }}
                semanticMode={semanticMode}
                onDiagnostics={onDiagnostics}
              />,
            ),
          ).toThrow(`${nested ? '$.data.values[0].payload' : '$'} [unsafe-object] Host object rejected.`);
          expect(onDiagnostics).not.toHaveBeenCalled();
        }
      }
    },
  );

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

  it.each(['origins', 'resolver', 'both'] as const)(
    'keeps pending and resolved resources and controlled legend focus across inline %s rerenders',
    async inline => {
      let resolve!: (value: unknown) => void;
      const pending = new Promise<unknown>(res => {
        resolve = res;
      });
      const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(() => pending);
      const onDiagnostics = jest.fn();
      const onSchemaChange = jest.fn();
      const origins = ['https://data.example', 'https://other.example'];
      const spec: VegaLiteSpec = {
        ...integrationResourceSpec,
        encoding: { ...integrationResourceSpec.encoding, color: { field: 'series', type: 'nominal' } },
      };
      function Controlled({ revision }: { revision: number }) {
        const [chartSchema, setChartSchema] = React.useState<VegaSchema>({
          vegaLiteSpec: spec,
          selectedLegends: ['Series'],
        });
        return (
          <VegaDeclarativeChart
            chartSchema={chartSchema}
            semanticMode="strict"
            dataBaseUrl="https://data.example/"
            allowedDataOrigins={
              inline === 'resolver'
                ? origins
                : revision % 2
                ? ['https://other.example', 'https://data.example', 'https://data.example']
                : ['https://data.example', 'https://other.example']
            }
            dataResolver={inline === 'origins' ? dataResolver : request => dataResolver(request)}
            onDiagnostics={onDiagnostics}
            onSchemaChange={schema => {
              onSchemaChange(schema);
              setChartSchema(schema);
            }}
          />
        );
      }
      const { rerender, container } = render(<Controlled revision={0} />);
      await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
      const signal = dataResolver.mock.calls[0][0].signal;
      rerender(<Controlled revision={1} />);
      expect(dataResolver).toHaveBeenCalledTimes(1);
      expect(signal.aborted).toBe(false);
      expect(onDiagnostics).toHaveBeenCalledTimes(1);
      await act(async () => resolve('x,y,series\n1,2,Series\n2,4,Series\n1,3,Other\n2,5,Other'));
      const svg = container.querySelector('svg');
      const legend = screen.getByRole('option', { name: 'Series' });
      act(() => legend.focus());
      expect(legend.ownerDocument.activeElement).toBe(legend);
      const diagnosticCalls = onDiagnostics.mock.calls.length;
      rerender(<Controlled revision={2} />);
      expect(screen.queryByRole('status')).toBeNull();
      expect(container.querySelector('svg')).toBe(svg);
      expect(legend.ownerDocument.activeElement).toBe(legend);
      fireEvent.click(legend);
      expect(onSchemaChange).toHaveBeenLastCalledWith({ vegaLiteSpec: spec, selectedLegends: [] });
      expect(screen.queryByRole('status')).toBeNull();
      expect(container.querySelector('svg')).toBe(svg);
      expect(legend.ownerDocument.activeElement).toBe(legend);
      fireEvent.click(legend);
      expect(onSchemaChange).toHaveBeenLastCalledWith({ vegaLiteSpec: spec, selectedLegends: ['Series'] });
      await act(async () => undefined);
      expect(dataResolver).toHaveBeenCalledTimes(1);
      expect(signal.aborted).toBe(false);
      expect(onDiagnostics).toHaveBeenCalledTimes(diagnosticCalls);
      expect(container.querySelector('svg')).toBe(svg);
      expect(screen.queryByRole('status')).toBeNull();
      expect(legend.ownerDocument.activeElement).toBe(legend);
    },
  );

  it('uses the current resolver for later resources and spec reloads without restarting a pending request', async () => {
    let resolve!: (value: unknown) => void;
    const pending = new Promise<unknown>(res => {
      resolve = res;
    });
    const oldResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(() => pending);
    const nextResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async () => [
      { x: 1, y: 2 },
      { x: 2, y: 4 },
    ]);
    const spec: VegaLiteSpec = {
      hconcat: ['first.json', 'second.json'].map(url => ({ ...integrationLineSpec, data: { url } })),
    };
    const props = { chartSchema: { vegaLiteSpec: spec }, dataBaseUrl: 'https://data.example/' };
    const { rerender, container } = render(<VegaDeclarativeChart {...props} dataResolver={oldResolver} />);
    await waitFor(() => expect(oldResolver).toHaveBeenCalledTimes(1));
    const signal = oldResolver.mock.calls[0][0].signal;
    rerender(<VegaDeclarativeChart {...props} dataResolver={nextResolver} />);
    expect(signal.aborted).toBe(false);
    expect(nextResolver).not.toHaveBeenCalled();
    await act(async () => resolve([{ x: 1, y: 2 }]));
    await waitFor(() => expect(container.querySelectorAll('svg')).toHaveLength(2));
    expect(nextResolver).toHaveBeenCalledTimes(1);
    expect(nextResolver.mock.calls[0][0].url).toBe('https://data.example/second.json');
    rerender(
      <VegaDeclarativeChart
        {...props}
        chartSchema={{ vegaLiteSpec: { ...integrationLineSpec, data: { url: 'next.json' } } }}
        dataResolver={nextResolver}
      />,
    );
    await waitFor(() => expect(nextResolver).toHaveBeenCalledTimes(2));
    expect(nextResolver.mock.calls[1][0].url).toBe('https://data.example/next.json');
    expect(oldResolver).toHaveBeenCalledTimes(1);
    expect(signal.aborted).toBe(true);
  });

  it.each(['spec', 'base', 'origins', 'mode'] as const)(
    'aborts and reloads resources when the actual %s request input changes',
    async change => {
      const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(
        () => new Promise<unknown>(() => undefined),
      );
      const props: VegaDeclarativeChartProps = {
        chartSchema: { vegaLiteSpec: integrationResourceSpec },
        dataResolver,
        dataBaseUrl: 'https://data.example/',
        allowedDataOrigins: ['https://data.example'],
        semanticMode: 'legacy',
      };
      const { rerender } = render(<VegaDeclarativeChart {...props} />);
      await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(1));
      const signal = dataResolver.mock.calls[0][0].signal;
      const next = {
        spec: { chartSchema: { vegaLiteSpec: { ...integrationResourceSpec } } },
        base: { dataBaseUrl: 'https://data.example/next/' },
        origins: { allowedDataOrigins: ['https://other.example'] },
        mode: { semanticMode: 'strict' as const },
      }[change];
      rerender(<VegaDeclarativeChart {...props} {...next} />);
      await waitFor(() => expect(dataResolver).toHaveBeenCalledTimes(2));
      expect(signal.aborted).toBe(true);
      expect(dataResolver.mock.calls[1][0].signal.aborted).toBe(false);
    },
  );

  it('reprepares when resolver availability toggles, without authorizing I/O for inline data', () => {
    const plan = jest.spyOn(views, 'planVegaDeclarativeChartViews');
    const dataResolver = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async () => []);
    const props = { chartSchema: { vegaLiteSpec: integrationLineSpec } };
    const { rerender } = render(<VegaDeclarativeChart {...props} dataResolver={dataResolver} />);
    expect(plan).toHaveBeenCalledTimes(1);
    rerender(<VegaDeclarativeChart {...props} />);
    expect(plan).toHaveBeenCalledTimes(2);
    rerender(<VegaDeclarativeChart {...props} dataResolver={dataResolver} />);
    expect(plan).toHaveBeenCalledTimes(3);
    expect(dataResolver).not.toHaveBeenCalled();
  });
});
