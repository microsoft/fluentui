import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme, webDarkTheme } from '@fluentui/react-theme';
import type { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';
import {
  VegaLiteCenteredArea,
  canRenderVegaCenteredAreaSpec,
  getVegaCenteredAreaGeometry,
} from './VegaLiteCenteredArea';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { getVegaColor } from './VegaLiteColorAdapter';
import { prepareVegaLiteSpec, readVegaField } from './VegaLiteDataTransforms';
import { renderVegaTooltip } from './VegaLiteTooltip';
import { centeredAreaRows, centeredAreaSpec, centeredAreaLayerSpec } from './testing/fixtures/centered-area';

const popover = jest.fn();
let nativePopover = false;
jest.mock('../CommonComponents/ChartPopover', () => {
  const ChartPopover = function mockChartPopover(props: ChartPopoverProps) {
    popover(props);
    return nativePopover ? (
      <NativePopover {...props} />
    ) : props.isPopoverOpen ? (
      <div data-testid="popover">{props.customCallout?.customizedCallout}</div>
    ) : null;
  };
  return { ChartPopover };
});
const NativePopover: React.ComponentType<ChartPopoverProps> = jest.requireActual(
  '../CommonComponents/ChartPopover',
).ChartPopover;

beforeEach(() => {
  popover.mockClear();
  nativePopover = false;
});
const geometry = (spec = centeredAreaSpec()) => getVegaCenteredAreaGeometry(spec, 200, 100);
const points = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<SVGCircleElement>('circle[data-centered-point]'));
const series = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<SVGPathElement>('path[data-centered-series]'));
const anchor = () =>
  (popover.mock.calls[popover.mock.calls.length - 1][0] as ChartPopoverProps).positioning as { target: unknown };

describe('centered area capability contract', () => {
  it.each(['quantitative', 'temporal', 'ordinal'] as const)('accepts %s x with explicit centered y', type => {
    const spec = centeredAreaSpec();
    spec.encoding!.x!.type = type;
    expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
  });

  it('requires a genuine area and does not claim zero/normalized/ordinary stacks', () => {
    for (const mark of ['line', 'bar', 'point'] as const) {
      expect(canRenderVegaCenteredAreaSpec(centeredAreaSpec({ mark }))).toBe(false);
    }
    for (const stack of ['zero', 'normalize', null, undefined] as const) {
      const spec = centeredAreaSpec();
      spec.encoding!.y!.stack = stack;
      expect(canRenderVegaCenteredAreaSpec(spec)).toBe(false);
    }
  });

  it('refuses nominal x, continuous/ordinal color and nonquantitative y', () => {
    const spec = centeredAreaSpec();
    for (const type of ['nominal', 'geojson'] as const) {
      expect(canRenderVegaCenteredAreaSpec({ ...spec, encoding: { ...spec.encoding, x: { field: 'x', type } } })).toBe(
        false,
      );
    }
    for (const type of ['quantitative', 'ordinal', 'temporal'] as const) {
      expect(
        canRenderVegaCenteredAreaSpec({ ...spec, encoding: { ...spec.encoding, color: { field: 'series', type } } }),
      ).toBe(false);
    }
    expect(
      canRenderVegaCenteredAreaSpec({
        ...spec,
        encoding: { ...spec.encoding, y: { field: 'value', type: 'nominal', stack: 'center' } },
      }),
    ).toBe(false);
  });

  it('refuses ranged/detail/offset/conditional encodings and horizontal areas', () => {
    const spec = centeredAreaSpec();
    for (const channel of ['x2', 'y2', 'xOffset', 'yOffset', 'detail', 'size', 'opacity'] as const) {
      expect(
        canRenderVegaCenteredAreaSpec({ ...spec, encoding: { ...spec.encoding, [channel]: { field: 'rank' } } }),
      ).toBe(false);
    }
    expect(canRenderVegaCenteredAreaSpec(centeredAreaSpec({ mark: { type: 'area', orient: 'horizontal' } }))).toBe(
      false,
    );
    expect(
      canRenderVegaCenteredAreaSpec({
        ...spec,
        encoding: { ...spec.encoding, color: { ...spec.encoding!.color, condition: { test: 'true', value: 'red' } } },
      }),
    ).toBe(false);
  });

  it('accepts flat compatible inherited layers but not nesting/mixed marks/independent positions', () => {
    const spec = centeredAreaLayerSpec();
    expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
    expect(canRenderVegaCenteredAreaSpec({ ...spec, layer: [] })).toBe(false);
    expect(canRenderVegaCenteredAreaSpec({ ...spec, layer: [{ mark: 'area' }, { mark: 'line' }] })).toBe(false);
    const nested = { ...centeredAreaSpec(), mark: 'area' as const, layer: [{ mark: 'area' as const }] };
    expect(canRenderVegaCenteredAreaSpec({ ...spec, layer: [nested] })).toBe(false);
    for (const resolve of [
      { scale: { x: 'independent' } },
      { scale: { y: 'independent' } },
      { axis: { y: 'independent' } },
      { scale: { color: 'independent' } },
      { legend: { color: 'independent' } },
    ] as VegaLiteSpec['resolve'][]) {
      expect(canRenderVegaCenteredAreaSpec({ ...spec, resolve })).toBe(false);
    }
  });

  it('refuses contradictory layer scales and mixed center/zero semantics', () => {
    const spec = centeredAreaLayerSpec();
    expect(
      canRenderVegaCenteredAreaSpec({
        ...spec,
        layer: [
          spec.layer![0],
          {
            mark: 'area',
            encoding: {
              y: { ...spec.encoding!.y, scale: { reverse: true } },
            },
          },
        ],
      }),
    ).toBe(false);
    expect(
      canRenderVegaCenteredAreaSpec({
        ...spec,
        layer: [
          spec.layer![0],
          {
            mark: 'area',
            encoding: {
              y: { ...spec.encoding!.y, stack: 'zero' },
            },
          },
        ],
      }),
    ).toBe(false);
    expect(canRenderVegaCenteredAreaSpec({ ...spec, hconcat: [centeredAreaSpec()] })).toBe(false);
  });

  it('treats omitted and explicitly equivalent shared scale defaults as compatible', () => {
    const spec = centeredAreaLayerSpec();
    spec.layer![1].encoding = {
      x: { ...spec.encoding!.x, scale: { reverse: false, zero: true, type: 'linear' } },
      y: { ...spec.encoding!.y, scale: { type: 'linear', zero: true, reverse: false } },
    };
    expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
    expect(geometry(spec).series).toHaveLength(3);
  });
});

describe('pure Vega 6.4 centered area geometry', () => {
  it('uses abs magnitudes and the tallest-group baseline, never signed silhouette', () => {
    expect(geometry().yDomain).toEqual([0, 10]);
    expect(geometry().series.map(item => [item.legend, item.points.map(p => [p.lower, p.upper])])).toEqual([
      [
        'A',
        [
          [6, 8],
          [8, 10],
        ],
      ],
      [
        'B',
        [
          [2, 6],
          [0, 8],
        ],
      ],
    ]);
    const signed = centeredAreaSpec({ data: { values: centeredAreaRows.map(row => ({ ...row, value: -row.value })) } });
    expect(geometry(signed).series.map(item => item.points.map(p => [p.lower, p.upper]))).toEqual(
      geometry().series.map(item => item.points.map(p => [p.lower, p.upper])),
    );
    expect(geometry(signed).points.map(p => p.value)).toEqual([-2, -2, -4, -8]);
  });

  it('generates closed filled D3 polygons between the actual lower/upper endpoints', () => {
    expect(geometry().series.map(item => item.d)).toEqual(['M0,20L200,0L200,20L0,40Z', 'M0,40L200,20L200,100L0,80Z']);
    expect(geometry().series[1].points[0]).toMatchObject({ x: 0, yLower: 80, yUpper: 40 });
  });

  it('sorts numeric x numerically, not by input or lexical string order', () => {
    const spec = centeredAreaSpec({ data: { values: [10, 2, 0].map(x => ({ x, value: 2, series: 'A' })) } });
    expect(geometry(spec).series[0].points.map(p => p.x)).toEqual([0, 40, 200]);
  });

  it('zero-imputes missing observed categories without making fabricated rows focusable', () => {
    const spec = centeredAreaSpec({
      data: { values: [...centeredAreaRows, { x: 1, value: 2, series: 'A', rank: 1, private: 'hidden' }] },
    });
    const missing = geometry(spec).series[1].points[1];
    expect(missing).toMatchObject({ lower: 4, upper: 4, value: 0, imputed: true, x: 100 });
    expect(missing.row).toBeUndefined();
    expect(geometry(spec).series[0].points[1]).toMatchObject({ lower: 4, upper: 6 });
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    expect(points(container)).toHaveLength(5);
  });

  it('does not seed imputation with absent explicit domain categories or unseen legends', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.x = { field: 'x', type: 'ordinal', scale: { domain: [0, 1, 2] } };
    spec.encoding!.color!.scale = { domain: ['C', 'B', 'A'] };
    expect(geometry(spec).series).toHaveLength(2);
    expect(geometry(spec).points).toHaveLength(4);
    expect(geometry(spec).xDomain).toEqual([0, 1, 2]);
  });

  it('color domain controls palette/legend order, not Vega default descending field stack order', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.color!.scale = { domain: ['B', 'A'] };
    expect(geometry(spec).series.find(item => item.legend === 'B')!.points[0].lower).toBe(2);
    spec.encoding!.order = { field: 'rank', sort: 'descending' };
    expect(geometry(spec).series.find(item => item.legend === 'A')!.points[0].lower).toBe(2);
  });

  it('honors stable materialized multiple order fields without aggregating them', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.order = [
      { field: 'x', sort: 'ascending' },
      { field: 'rank', sort: 'descending' },
    ];
    expect(geometry(spec).series[0].points.map(p => p.lower)).toEqual([2, 0]);
  });

  it('respects explicit domains and independent x/y reversal without widening authored extents', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.x!.scale = { domain: [-2, 6], reverse: true };
    spec.encoding!.y!.scale = { domain: [0, 20], reverse: true };
    const result = geometry(spec);
    expect(result.xDomain).toEqual([-2, 6]);
    expect(result.yDomain).toEqual([0, 20]);
    expect(result.series[0].points[0]).toMatchObject({ x: 150, yLower: 30, yUpper: 40 });
  });

  it('preserves full temporal timestamps and UTC tick formatting', () => {
    const spec = centeredAreaSpec({
      data: {
        values: [
          { x: '2026-10-11T12:00:00.000Z', value: 2, series: 'A' },
          { x: new Date('2026-10-11T18:00:00.000Z'), value: 4, series: 'A' },
        ],
      },
    });
    spec.encoding!.x = {
      field: 'x',
      type: 'temporal',
      scale: { type: 'utc' },
      axis: { values: ['2026-10-11T12:00:00.000Z', '2026-10-11T18:00:00.000Z'], format: '%H:%M' },
    };
    expect(geometry(spec).xDomain).toEqual([Date.parse('2026-10-11T12:00:00Z'), Date.parse('2026-10-11T18:00:00Z')]);
    expect(geometry(spec).series[0].points.map(p => p.x)).toEqual([0, 200]);
    expect(geometry(spec).axes.x.ticks.map(tick => tick.label)).toEqual(['12:00', '18:00']);
  });

  it('uses an ordinal point scale, declared order and reverse', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.x = { field: 'x', type: 'ordinal', scale: { domain: [2, 0], reverse: true } };
    expect(geometry(spec).series[0].points.map(p => p.x)).toEqual([150, 50]);
  });

  it('uses prepared aliases/nested and escaped fields, preserves row identity and frozen input', () => {
    const row = Object.freeze({ x: 0, stats: Object.freeze({ sum: 3 }), 'series.name': 'A' });
    const spec = centeredAreaSpec({ data: { values: [row] } });
    spec.encoding!.y!.field = 'stats.sum';
    spec.encoding!.color!.field = 'series\\.name';
    Object.freeze(spec.encoding!.y);
    Object.freeze(spec.data!.values);
    Object.freeze(spec);
    expect(geometry(spec).points[0]).toMatchObject({ row, value: 3, lower: 0, upper: 3 });
    expect(geometry(spec).points[0].row).toBe(row);
    expect(Object.keys(row)).toEqual(['x', 'stats', 'series.name']);
  });

  it('filters invalid/non-scalar fields without invoking getters or object coercion', () => {
    const getter = jest.fn(() => 20);
    const coercion = jest.fn(() => 'A');
    const row = Object.defineProperty({ x: 1, series: 'A' }, 'value', { get: getter });
    const spec = centeredAreaSpec({
      data: {
        values: [
          row,
          { x: 0, value: NaN, series: 'A' },
          { x: 0, value: 2, series: { toString: coercion } },
          { x: null, value: 2, series: 'A' },
          { x: 2, value: null, series: 'A' },
        ],
      },
    });
    expect(geometry(spec).points).toEqual([]);
    expect(getter).not.toHaveBeenCalled();
    expect(coercion).not.toHaveBeenCalled();
  });

  it('handles empty/all-zero data with finite geometry', () => {
    expect(geometry(centeredAreaSpec({ data: { values: [] } })).series).toEqual([]);
    const result = geometry(centeredAreaSpec({ data: { values: [{ x: 0, value: 0, series: 'A' }] } }));
    expect(result.series[0].d).not.toMatch(/NaN|Infinity/);
    expect(result.points[0]).toMatchObject({ lower: 0, upper: 0 });
  });

  it.each(['log', 'sqrt', 'pow', 'symlog'] as const)(
    'reports unsupported nonlinear %s y and never falls back to lines',
    type => {
      const spec = centeredAreaSpec();
      spec.encoding!.y!.scale = { type };
      expect(canRenderVegaCenteredAreaSpec(spec)).toBe(false);
      expect(geometry(spec).series).toEqual([]);
      expect(geometry(spec).warnings.join(' ')).toMatch(/linear/i);
    },
  );

  it('unions layer stack bounds/x extents but stacks each unit independently', () => {
    const result = geometry(centeredAreaLayerSpec());
    expect(result.xDomain).toEqual([0, 4]);
    expect(result.yDomain).toEqual([0, 12]);
    expect(result.series).toHaveLength(3);
    expect(result.series[0].points[0].upper).toBe(8);
    expect(result.series[2].points.map(p => [p.lower, p.upper, p.x])).toEqual([
      [0, 12, 0],
      [4, 8, 200],
    ]);
  });
});

describe('native centered area renderer', () => {
  it('respects authored labels and links description plus complete keyboard instructions', () => {
    const { container } = render(
      <VegaLiteCenteredArea
        aria-label="Author label"
        spec={centeredAreaSpec({
          title: { text: 'Stream', subtitle: 'Prepared values' },
          description: 'Stream description',
        })}
      />,
    );
    expect(container.firstElementChild).toHaveAttribute('aria-label', 'Author label');
    expect(screen.getByRole('heading', { name: 'Stream' })).toBeVisible();
    expect(screen.getByText('Prepared values')).toBeVisible();
    const svg = container.querySelector('svg')!;
    const description = svg.querySelector('desc')!;
    expect(svg).toHaveAttribute('aria-describedby', description.id);
    expect(description.textContent).toContain('Stream description');
    expect(description.textContent).toContain('Home');
    expect(description.textContent).toContain('Shift+Tab');
  });

  it('leaves the composed wrapper as the only heading through an explicit presentation prop', () => {
    const { container } = render(
      <div data-vega-view="root/hconcat/0">
        <h3>Stream</h3>
        <VegaLiteCenteredArea hideTitle spec={centeredAreaSpec({ title: 'Stream' })} />
      </div>,
    );
    expect(screen.getAllByRole('heading', { name: 'Stream' })).toHaveLength(1);
    expect(container.querySelectorAll('h3')).toHaveLength(1);
  });

  it('omits a standalone hidden title in SSR while retaining subtitle, SVG naming and layout', () => {
    const spec = centeredAreaSpec({ title: { text: 'Stream', subtitle: 'Prepared values' } });
    const html = renderToString(<VegaLiteCenteredArea hideTitle spec={spec} width={272} height={172} />);
    const { container } = render(<div />);
    container.firstElementChild!.innerHTML = html;
    expect(container.querySelectorAll('h3')).toHaveLength(0);
    expect(screen.getByText('Prepared values')).toBeVisible();
    const svg = container.querySelector('svg')!;
    expect(svg.querySelector('title')).toHaveTextContent('Stream');
    expect(svg).toHaveAttribute('aria-labelledby', svg.querySelector('title')!.id);
    expect(svg).toHaveAttribute('viewBox', '-56 -24 272 172');
    expect(svg.querySelector('clipPath rect')).toHaveAttribute('width', '200');
    expect(series(container).map(path => path.getAttribute('d'))).toEqual(geometry(spec).series.map(item => item.d));
    expect(container.innerHTML).not.toMatch(/hidetitle/i);
  });

  it('preserves generic root hidden, ref, class and layout with title suppression', () => {
    const ref = React.createRef<HTMLDivElement>();
    const spec = centeredAreaSpec({ title: 'Stream' });
    const { container, rerender } = render(
      <VegaLiteCenteredArea
        ref={ref}
        spec={spec}
        hideTitle
        hidden
        className="authored"
        style={{ display: 'grid' }}
        width={272}
        height={172}
      />,
    );
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current).toHaveAttribute('hidden');
    expect(ref.current).toHaveClass('authored');
    expect(ref.current).toHaveStyle({ display: 'grid', width: '272px' });
    expect(container.querySelector('h3')).toBeNull();
    expect(ref.current).not.toHaveAttribute('hideTitle');
    rerender(<VegaLiteCenteredArea ref={ref} spec={spec} width={272} height={172} />);
    expect(ref.current).not.toHaveAttribute('hidden');
    expect(screen.getByRole('heading', { name: 'Stream' })).toBeVisible();
  });

  it.each([false, true])('gives native raw/semantic content one resolvable tooltip role (semantic=%s)', semantic => {
    nativePopover = true;
    const spec = centeredAreaSpec();
    const { container } = render(
      <VegaLiteCenteredArea
        spec={spec}
        renderTooltip={semantic ? row => renderVegaTooltip(spec, row) : () => <span>Raw tooltip</span>}
      />,
    );
    const point = points(container)[0];
    fireEvent.mouseEnter(point);
    fireEvent.focus(point);
    const tooltip = screen.getByRole('tooltip');
    expect(container.ownerDocument.getElementById(point.getAttribute('aria-describedby')!)!.contains(tooltip)).toBe(
      true,
    );
    if (semantic) {
      expect(tooltip.tagName).toBe('DL');
    }
  });

  it.each(['hidden-field', 'null', 'false'])('suppresses native content on hover and focus: %s', mode => {
    nativePopover = true;
    const spec = centeredAreaSpec();
    if (mode === 'hidden-field') {
      spec.encoding!.tooltip = { field: 'private', tooltip: false };
    }
    const { container } = render(
      <VegaLiteCenteredArea
        spec={spec}
        renderTooltip={
          mode === 'hidden-field' ? row => renderVegaTooltip(spec, row) : () => (mode === 'null' ? null : false)
        }
      />,
    );
    const point = points(container)[0];
    fireEvent.mouseEnter(point);
    fireEvent.focus(point);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
    expect(point).not.toHaveAttribute('aria-describedby');
    expect(container.textContent).not.toContain('hidden');
  });

  it('renders filled semantic area paths, endpoint metadata, points and exact viewport gutters', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container, rerender } = render(
      <VegaLiteCenteredArea ref={ref} spec={centeredAreaSpec()} width={272} height={172} className="authored" />,
    );
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveClass('authored');
    expect(series(container).map(path => path.getAttribute('d'))).toEqual(geometry().series.map(item => item.d));
    expect(series(container)[0]).toHaveAttribute('aria-hidden', 'true');
    expect(series(container)[0].getAttribute('fill')).toBeTruthy();
    expect(points(container)[0]).toHaveAttribute('data-value', '2');
    expect(points(container)[0]).toHaveAttribute('data-lower', '6');
    expect(points(container)[0]).toHaveAttribute('data-upper', '8');
    expect(points(container)[0]).toHaveAttribute('tabindex', '0');
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '-56 -24 272 172');
    expect(container.querySelector('clipPath rect')).toHaveAttribute('width', '200');
    rerender(<VegaLiteCenteredArea spec={centeredAreaSpec()} width={172} height={172} />);
    expect(container.querySelector('clipPath rect')).toHaveAttribute('width', '100');
    expect(series(container)[0].getAttribute('d')).toContain('L100,0');
  });

  it('uses per-chart unique IDs and event-owned anchors in the second chart', () => {
    const { container } = render(
      <>
        <VegaLiteCenteredArea spec={centeredAreaSpec()} />
        <VegaLiteCenteredArea spec={centeredAreaSpec()} />
      </>,
    );
    const ids = Array.from(container.querySelectorAll('[id]'), element => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThan(10);
    const point = points(container)[5];
    fireEvent.focus(point);
    expect(anchor().target).toBe(point);
    expect(point.getAttribute('aria-describedby')).toBe(screen.getByTestId('popover').firstElementChild!.id);
  });

  it('delegates requested tooltip/ARIA projection without leaking private fields or stack coordinates', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.tooltip = [{ field: 'value', title: 'Amount' }];
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    expect(points(container)[0]).toHaveAttribute('aria-label', 'Amount: 2');
    fireEvent.focus(points(container)[0]);
    expect(screen.getByTestId('popover').textContent).toBe('Amount2');
    expect(screen.getByTestId('popover').textContent).not.toMatch(/hidden|lower|upper|series/);
  });

  it('keeps signed raw values in tooltips, never centered data-unit coordinates', () => {
    const spec = centeredAreaSpec({ data: { values: [{ x: 0, value: -6, series: 'A' }] } });
    spec.encoding!.tooltip = { field: 'value' };
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    fireEvent.focus(points(container)[0]);
    expect(points(container)[0]).toHaveAttribute('data-value', '-6');
    expect(screen.getByTestId('popover').textContent).toBe('value-6');
  });

  it('passes untouched rows to custom callbacks and layer-local effective specs', () => {
    const tooltip = jest.fn((row: Record<string, unknown>, _unit?: VegaLiteSpec) => (
      <span>Raw {String(row.value)}</span>
    ));
    const label = jest.fn((row: Record<string, unknown>, _unit?: VegaLiteSpec) => `Raw ${String(row.value)}`);
    const { container, rerender } = render(
      <VegaLiteCenteredArea spec={centeredAreaSpec()} renderTooltip={tooltip} getAriaLabel={label} />,
    );
    fireEvent.focus(points(container)[0]);
    expect(tooltip).toHaveBeenCalledWith(centeredAreaRows[0]);
    expect(label).toHaveBeenCalledWith(centeredAreaRows[0]);
    rerender(<VegaLiteCenteredArea spec={centeredAreaLayerSpec()} renderTooltip={tooltip} getAriaLabel={label} />);
    fireEvent.focus(points(container)[4]);
    expect(tooltip.mock.calls[tooltip.mock.calls.length - 1]).toHaveLength(2);
    expect(tooltip.mock.calls[tooltip.mock.calls.length - 1][1]).toMatchObject({
      mark: { type: 'area', opacity: 0.5 },
    });
  });

  it.each([null, [], { field: 'private', tooltip: false }])(
    'suppresses disabled/empty tooltip declarations %# without native fallback',
    tooltip => {
      const spec = centeredAreaSpec();
      spec.encoding!.tooltip = tooltip;
      const { container } = render(<VegaLiteCenteredArea spec={spec} />);
      fireEvent.focus(points(container)[0]);
      expect(points(container)[0].getAttribute('aria-label')!.length).toBeGreaterThan(0);
      expect(screen.queryByTestId('popover')).toBeNull();
    },
  );

  it('suppresses custom null tooltip results rather than native fallback content', () => {
    function renderNullTooltip() {
      return null;
    }
    const { container } = render(<VegaLiteCenteredArea spec={centeredAreaSpec()} renderTooltip={renderNullTooltip} />);
    fireEvent.focus(points(container)[0]);
    expect(screen.queryByTestId('popover')).toBeNull();
  });

  it('coexists with pointer and keyboard focus, restores focus after hover, closes on external blur/Escape', () => {
    const onBlur = jest.fn();
    const onMouseLeave = jest.fn();
    const { container } = render(
      <>
        <VegaLiteCenteredArea spec={centeredAreaSpec()} onBlur={onBlur} onMouseLeave={onMouseLeave} />
        <button>Outside</button>
      </>,
    );
    const [first, second] = points(container);
    fireEvent.focus(first);
    fireEvent.mouseEnter(second);
    expect(anchor().target).toBe(second);
    // This move stays inside the chart; omitting relatedTarget synthesizes another root leave.
    fireEvent.mouseLeave(second, { relatedTarget: first });
    expect(anchor().target).toBe(first);
    fireEvent.mouseLeave(container.firstElementChild!);
    expect(anchor().target).toBe(first);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    fireEvent.blur(first, { relatedTarget: screen.getByRole('button', { name: 'Outside' }) });
    expect(screen.queryByTestId('popover')).toBeNull();
    expect(onBlur).toHaveBeenCalledTimes(1);
    fireEvent.focus(second);
    fireEvent.keyDown(second, { key: 'Escape' });
    expect(screen.queryByTestId('popover')).toBeNull();
  });

  it('removes stale callouts when prepared spec/geometry changes', () => {
    const { container, rerender } = render(<VegaLiteCenteredArea spec={centeredAreaSpec()} />);
    fireEvent.focus(points(container)[0]);
    expect(screen.getByTestId('popover')).toBeTruthy();
    rerender(<VegaLiteCenteredArea spec={centeredAreaSpec({ data: { values: [] } })} />);
    expect(screen.queryByTestId('popover')).toBeNull();
    rerender(<VegaLiteCenteredArea spec={centeredAreaSpec()} />);
    expect(screen.queryByTestId('popover')).toBeNull();
  });

  it('configures native Tabster grouping and arrow navigation, without trapping Tab', async () => {
    // Tabster correctly treats jsdom's zero-sized body and null offsetParent as hidden.
    const host = render(<div />);
    const targetDocument = host.container.ownerDocument;
    const view = targetDocument.defaultView!;
    const bounds = jest
      .spyOn(targetDocument.body, 'getBoundingClientRect')
      .mockReturnValue(new view.DOMRect(0, 0, 640, 400));
    const offset = jest.spyOn(view.HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(targetDocument.body);
    jest.useFakeTimers();
    const spec = centeredAreaSpec();
    spec.encoding!.color!.legend = null;
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <button>Before</button>
        <VegaLiteCenteredArea spec={spec} />
        <button>Outside</button>
      </FluentProvider>,
    );
    // MoverAPI queues its initialization: drain that queue before testing keyboard events.
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
    const group = container.querySelector('[data-centered-navigation]')!;
    const attrs = JSON.parse(group.getAttribute('data-tabster')!);
    expect(attrs.mover).toMatchObject({ cyclic: true, direction: 0 }); // Tabster MoverDirections.Both.
    expect(attrs.groupper).toBeDefined();
    try {
      act(() => points(container)[0].focus());
      fireEvent.mouseEnter(points(container)[1]);
      await act(async () => userEvent.keyboard('{Home}'));
      expect(points(container)[0]).toHaveFocus();
      expect(anchor().target).toBe(points(container)[0]);
      await act(async () => userEvent.keyboard('{End}'));
      expect(points(container)[3]).toHaveFocus();
      for (const [key, index] of [
        ['ArrowRight', 0],
        ['ArrowLeft', 3],
        ['ArrowDown', 0],
        ['ArrowUp', 3],
      ] as const) {
        await act(async () => userEvent.keyboard(`{${key}}`));
        expect(points(container)[index]).toHaveFocus();
      }
      await act(async () => userEvent.tab());
      expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
      await act(async () => userEvent.tab({ shift: true }));
      expect(points(container)[0].ownerSVGElement!.contains(targetDocument.activeElement)).toBe(true);
      await act(async () => userEvent.tab({ shift: true }));
      expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus();
    } finally {
      bounds.mockRestore();
      offset.mockRestore();
    }
  });

  it('renders the actual native popover with only shared projected content', () => {
    nativePopover = true;
    const spec = centeredAreaSpec();
    spec.encoding!.tooltip = { field: 'value', title: 'Amount' };
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    fireEvent.mouseEnter(points(container)[0]);
    expect(container.querySelector('.fui-PopoverSurface')!.textContent).toBe('Amount2');
    expect(anchor().target).toBe(points(container)[0]);
  });

  it('seeds scheme colors from nominal domains including empty legends, preserves controlled selection', () => {
    const spec = centeredAreaSpec();
    spec.encoding!.color!.scale = { domain: ['C', 'B', 'A'], scheme: 'tableau10' };
    const onLegendChange = jest.fn();
    const { container } = render(
      <VegaLiteCenteredArea spec={spec} selectedLegends={['A']} onLegendChange={onLegendChange} />,
    );
    expect(series(container).find(path => path.getAttribute('data-legend') === 'B')).toHaveAttribute(
      'fill',
      getVegaColor(1, 'tableau10', undefined, false),
    );
    expect(series(container).find(path => path.getAttribute('data-legend') === 'B')).toHaveAttribute(
      'data-selected',
      'false',
    );
    fireEvent.click(screen.getByRole('option', { name: 'C' }));
    expect(onLegendChange).toHaveBeenCalled();
    expect(series(container).find(path => path.getAttribute('data-legend') === 'A')).toHaveAttribute(
      'data-selected',
      'true',
    );
  });

  it('supports local legend state and dark theme color mapping', () => {
    const { container } = render(
      <FluentProvider theme={webDarkTheme}>
        <VegaLiteCenteredArea spec={centeredAreaSpec()} />
      </FluentProvider>,
    );
    expect(series(container)[0]).toHaveAttribute('fill', getVegaColor(0, undefined, undefined, true));
    fireEvent.click(screen.getByRole('option', { name: 'B' }));
    expect(series(container)[0]).toHaveAttribute('data-selected', 'false');
  });

  it('preserves authored colors and ranges in dark theme instead of remapping them', () => {
    const spec = centeredAreaSpec({ mark: { type: 'area', color: 'currentColor' } });
    const { container, rerender } = render(
      <FluentProvider theme={webDarkTheme}>
        <VegaLiteCenteredArea spec={spec} />
      </FluentProvider>,
    );
    expect(series(container)[0]).toHaveAttribute('fill', 'currentColor');
    const constant = { ...spec, encoding: { ...spec.encoding, color: { value: 'inherit' } } };
    rerender(
      <FluentProvider theme={webDarkTheme}>
        <VegaLiteCenteredArea spec={constant} />
      </FluentProvider>,
    );
    expect(series(container)[0]).toHaveAttribute('fill', 'inherit');
    const ranged = centeredAreaSpec();
    ranged.encoding!.color!.scale = { domain: ['A', 'B'], range: ['purple', 'orange'] };
    rerender(
      <FluentProvider theme={webDarkTheme}>
        <VegaLiteCenteredArea spec={ranged} />
      </FluentProvider>,
    );
    expect(series(container).map(path => path.getAttribute('fill'))).toEqual(['purple', 'orange']);
  });

  it('renders accessible headers/axis titles and server-safe SVG without a browser global', () => {
    const spec = centeredAreaSpec({ title: { text: 'Stream', subtitle: 'Prepared values' } });
    spec.encoding!.y!.axis = { title: 'Total', format: '.1f', values: [0, 10] };
    const html = renderToString(<VegaLiteCenteredArea spec={spec} width={272} height={172} />);
    expect(html).toContain('Stream');
    expect(html).toContain('Prepared values');
    expect(html).toContain('Total');
    expect(html).toContain('10.0');
    expect(html).toContain('M0,20L200,0L200,20L0,40Z');
    expect(html).not.toMatch(/NaN|Infinity/);
  });
});

describe('centered area axis-null and source-row regressions', () => {
  it.each<{ axes: ('x' | 'y')[] }>([{ axes: ['x'] }, { axes: ['y'] }, { axes: ['x', 'y'] }])(
    'omits entire null axes with deterministic empty metadata and unchanged domains: $axes',
    ({ axes }) => {
      const spec = centeredAreaSpec();
      for (const axis of axes) {
        spec.encoding![axis] = { ...spec.encoding![axis], axis: null };
      }
      const expected = geometry();
      const actual = geometry(spec);
      expect(actual.xDomain).toEqual(expected.xDomain);
      expect(actual.yDomain).toEqual(expected.yDomain);
      expect(actual.series.map(item => item.d)).toEqual(expected.series.map(item => item.d));
      expect(geometry(spec).axes).toEqual(actual.axes);
      for (const axis of axes) {
        expect(actual.axes[axis]).toEqual({ title: undefined, ticks: [] });
      }
      const { container } = render(<VegaLiteCenteredArea spec={spec} width={272} height={172} />);
      const svg = container.querySelector('svg')!;
      for (const axis of ['x', 'y'] as const) {
        expect(svg.querySelector(`[id$="-${axis}"]`) !== null).toBe(!axes.includes(axis));
      }
      expect(svg).toHaveAttribute('viewBox', '-56 -24 272 172');
      expect(svg.querySelector('clipPath rect')).toHaveAttribute('width', '200');
      expect(series(container).map(item => item.getAttribute('d'))).toEqual(expected.series.map(item => item.d));
      expect(points(container)).toHaveLength(4);
    },
  );

  it.each(['x', 'y'] as const)(
    'honors visible sibling %s axis metadata independently of shared scale geometry',
    axis => {
      const spec = centeredAreaLayerSpec();
      spec.layer = spec.layer!.map((layer, index) => ({
        ...layer,
        encoding: {
          ...layer.encoding,
          [axis]: {
            ...spec.encoding![axis],
            axis: index === 0 ? null : { title: `Visible ${axis}`, values: [0], format: '.1f' },
          },
        },
      }));
      expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
      const actual = geometry(spec);
      expect(actual.axes[axis]).toEqual({
        title: `Visible ${axis}`,
        ticks: [{ label: '0.0', position: axis === 'x' ? 0 : 100 }],
      });
      expect(actual.series.map(item => item.d)).toEqual(geometry(centeredAreaLayerSpec()).series.map(item => item.d));
      const { container, rerender } = render(<VegaLiteCenteredArea spec={spec} />);
      const svg = container.querySelector('svg')!;
      expect(svg.querySelector(`[id$="-${axis}"]`)!.textContent).toBe(`0.0Visible ${axis}`);
      const hidden = {
        ...spec,
        layer: spec.layer!.map(layer => ({
          ...layer,
          encoding: { ...layer.encoding, [axis]: { ...layer.encoding![axis], axis: null } },
        })),
      };
      expect(geometry(hidden).axes[axis]).toEqual({ title: undefined, ticks: [] });
      rerender(<VegaLiteCenteredArea spec={hidden} />);
      expect(svg.querySelector(`[id$="-${axis}"]`)).toBeNull();
    },
  );

  it('uses an explicit shared declaration before an implicit title and honors title:null', () => {
    const spec = centeredAreaLayerSpec();
    spec.layer![1].encoding = { y: { ...spec.encoding!.y, axis: { title: null, values: [0], format: '.1f' } } };
    expect(geometry(spec).axes.y).toEqual({ title: undefined, ticks: [{ label: '0.0', position: 100 }] });
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    expect(container.querySelector('[id$="-y"]')!.textContent).toBe('0.0');
    expect(container.querySelector('[id$="-y"] path')).not.toBeNull();
  });

  it.each([Object.seal, Object.preventExtensions])(
    'keeps canonical field reads and point identity on nonextensible rows %#',
    constrain => {
      const row = constrain({ x: 0, stats: constrain({ sum: 3 }), 'series.name': 'A' });
      const before = Object.getOwnPropertyDescriptors(row);
      const nestedBefore = Object.getOwnPropertyDescriptors(row.stats);
      const spec = centeredAreaSpec({ data: { values: [row] } });
      spec.encoding!.y!.field = 'stats.sum';
      spec.encoding!.color!.field = 'series\\.name';
      const result = geometry(spec);
      expect(result.points[0]).toMatchObject({ value: 3, lower: 0, upper: 3 });
      expect(result.points[0].row).toBe(row);
      const tooltip = jest.fn(() => <span>Canonical source</span>);
      const { container } = render(<VegaLiteCenteredArea spec={spec} renderTooltip={tooltip} />);
      fireEvent.focus(points(container)[0]);
      expect(tooltip).toHaveBeenCalledWith(row);
      expect(Object.getOwnPropertyDescriptors(row)).toEqual(before);
      expect(Object.getOwnPropertyDescriptors(row.stats)).toEqual(nestedBefore);
      const prepared = prepareVegaLiteSpec(spec, { mode: 'strict' });
      const clonedRow = prepared.data!.values![0];
      expect(clonedRow).not.toBe(row);
      expect(readVegaField(clonedRow, 'stats.sum')).toBe(3);
      expect(readVegaField(clonedRow, 'series\\.name')).toBe('A');
      expect(geometry(prepared).points[0].row).toBe(clonedRow);
      expect(Object.getOwnPropertyDescriptors(row)).toEqual(before);
      expect(Object.getOwnPropertyDescriptors(row.stats)).toEqual(nestedBefore);
    },
  );

  it.each([false, true])('clips authored out-of-data domains without rejecting or widening them (clamp=%s)', clamp => {
    const spec = centeredAreaSpec();
    const xScale = { domain: [0.5, 1.5], clamp };
    const yScale = { domain: [3, 5], clamp };
    spec.encoding!.x!.scale = xScale;
    spec.encoding!.y!.scale = yScale;
    const result = geometry(spec);
    expect(result.warnings).toEqual([]);
    expect(result.xDomain).toEqual([0.5, 1.5]);
    expect(result.yDomain).toEqual([3, 5]);
    expect(result.points).toHaveLength(4);
    expect(result.points[0]).toMatchObject({ x: clamp ? 0 : -100, yLower: clamp ? 0 : -50, yUpper: clamp ? 0 : -150 });
    const { container } = render(<VegaLiteCenteredArea spec={spec} width={272} height={172} />);
    const clip = container.querySelector('clipPath')!;
    expect(series(container)[0].parentElement).toHaveAttribute('clip-path', `url(#${clip.id})`);
    expect(series(container)[0]).toHaveAttribute('d', result.series[0].d);
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });

  it('renders no points or NaN coordinates for all-invalid runtime records', () => {
    const spec = centeredAreaSpec({
      data: {
        values: [false, null, 0, [], { x: 0, value: false, series: 'A' }] as unknown as Record<string, unknown>[],
      },
    });
    const { container } = render(<VegaLiteCenteredArea spec={spec} />);
    expect(series(container)).toEqual([]);
    expect(points(container)).toEqual([]);
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });

  it('retains token-based axes/focus styling and forced-color area/point contrast', () => {
    const { container } = render(<VegaLiteCenteredArea spec={centeredAreaSpec()} />);
    const css = Array.from(container.ownerDocument.querySelectorAll('style'))
      .flatMap(element => Array.from(element.sheet?.cssRules ?? [], rule => rule.cssText))
      .join('\n');
    expect(css).toContain('var(--colorNeutralStroke1)');
    expect(css).toContain('var(--colorStrokeFocus2)');
    expect(css).toContain('forced-colors: active');
    expect(css).toContain('CanvasText');
    expect(css).toContain('Highlight');
  });
});
