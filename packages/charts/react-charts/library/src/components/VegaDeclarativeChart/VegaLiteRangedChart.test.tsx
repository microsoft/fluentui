import * as React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import type { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';
import { VegaLiteRangedChart } from './VegaLiteRangedChart';
import { canRenderVegaRangedSpec, getVegaRangedGeometry, readVegaField } from './VegaLiteRangedGeometry';
import { getVegaCenterStack } from './VegaLiteStackGeometry';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { prepareVegaLiteSpec, readVegaField as canonicalReadVegaField } from './VegaLiteDataTransforms';
import { timeFormat, utcFormat } from 'd3-time-format';
import { ThemeContext_unstable } from '@fluentui/react-shared-contexts';
import { FluentProvider } from '@fluentui/react-provider';
import { webDarkTheme, webLightTheme } from '@fluentui/react-theme';
import { renderVegaTooltip } from './VegaLiteTooltip';
import { getVegaColor } from './VegaLiteColorAdapter';
import { VegaLiteChartTitle } from './VegaLiteChartPresentation';
import { withResponsiveContainer } from '../ResponsiveContainer/withResponsiveContainer';
import {
  groupedOffsetSpec,
  horizontalRangeSpec,
  numericOffsetSpec,
  plainTickSpec,
  rangedSpec,
  rectangleRangeSpec,
  roundedBarSpec,
  sameFieldCellSpec,
} from '../../testing/fixtures/ranged';

// Observe the native callout boundary, not its unrelated positioning implementation.
const popover = jest.fn();
let nativePopover = false;
jest.mock('../CommonComponents/ChartPopover', () => {
  const ChartPopover = function mockChartPopover(props: ChartPopoverProps) {
    popover(props);
    if (nativePopover) {
      return <NativePopover {...props} />;
    }
    return props.isPopoverOpen ? <div data-testid="popover">{props.customCallout?.customizedCallout}</div> : null;
  };
  return { ChartPopover };
});

// Load native Griffel styles outside React render, even when the wrapper is mocked for unit assertions.
const NativePopover: React.ComponentType<ChartPopoverProps> = jest.requireActual(
  '../CommonComponents/ChartPopover',
).ChartPopover;

beforeEach(() => {
  popover.mockClear();
  nativePopover = false;
});

/** JSDOM visibility shims only; all focus movement is handled by actual Tabster. */
function renderNavigable(content: React.ReactElement) {
  const host = render(<div />);
  const targetDocument = host.container.ownerDocument;
  const view = targetDocument.defaultView!;
  const bounds = jest
    .spyOn(targetDocument.body, 'getBoundingClientRect')
    .mockReturnValue(new view.DOMRect(0, 0, 640, 400));
  const offset = jest.spyOn(view.HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(targetDocument.body);
  jest.useFakeTimers();
  const result = render(<FluentProvider theme={webLightTheme}>{content}</FluentProvider>);
  act(() => jest.runOnlyPendingTimers());
  jest.useRealTimers();
  return {
    ...result,
    restoreVisibility: () => {
      bounds.mockRestore();
      offset.mockRestore();
    },
  };
}

describe('ranged routing', () => {
  it('keeps ordinary bars on their existing route', () => {
    expect(
      canRenderVegaRangedSpec({
        ...groupedOffsetSpec,
        encoding: {
          x: groupedOffsetSpec.encoding!.x,
          y: groupedOffsetSpec.encoding!.y,
        },
      }),
    ).toBe(false);
    expect(canRenderVegaRangedSpec({ ...groupedOffsetSpec, mark: 'line' })).toBe(false);
    expect(canRenderVegaRangedSpec({ ...groupedOffsetSpec, layer: [] })).toBe(false);
  });

  it.each([groupedOffsetSpec, horizontalRangeSpec, rectangleRangeSpec, numericOffsetSpec, sameFieldCellSpec])(
    'accepts prepared ranged/offset unit specs %#',
    spec => expect(canRenderVegaRangedSpec(spec)).toBe(true),
  );

  it('accepts offset ticks and refuses unsupported position scales', () => {
    expect(canRenderVegaRangedSpec(rangedSpec({ ...groupedOffsetSpec, mark: 'tick' }))).toBe(true);
    expect(
      canRenderVegaRangedSpec(
        rangedSpec({
          ...groupedOffsetSpec,
          encoding: {
            ...groupedOffsetSpec.encoding,
            y: { field: 'amount', type: 'quantitative', scale: { type: 'log' } },
          },
        }),
      ),
    ).toBe(false);
  });
});

describe('explicit plot-space coordinates', () => {
  it('groups by offset, not by color, and uses a zero baseline for both signs', () => {
    const geometry = getVegaRangedGeometry(groupedOffsetSpec, 200, 100);
    expect(geometry.marks.map(({ x, y, width, height }) => ({ x, y, width, height }))).toEqual([
      { x: 0, y: 30, width: 50, height: 20 },
      { x: 50, y: 10, width: 50, height: 40 },
      { x: 100, y: 50, width: 50, height: 20 },
      { x: 150, y: 40, width: 50, height: 10 },
    ]);
    expect(geometry.axes.x.ticks.map(tick => [tick.label, tick.position])).toEqual([
      ['A', 50],
      ['B', 150],
    ]);
  });

  it('preserves horizontal primary/secondary endpoints before rectangle sorting', () => {
    const geometry = getVegaRangedGeometry(horizontalRangeSpec, 200, 100);
    expect(geometry.marks.map(({ x, y, width, height, roundedEnd }) => ({ x, y, width, height, roundedEnd }))).toEqual([
      { x: 20, y: 0, width: 60, height: 50, roundedEnd: 'left' },
      { x: 120, y: 50, width: 60, height: 50, roundedEnd: 'right' },
    ]);
  });

  it.each([false, true])('inverts rounded horizontal ends on reversed domain/scale: %s', reverse => {
    const spec = rangedSpec({
      ...horizontalRangeSpec,
      encoding: {
        ...horizontalRangeSpec.encoding,
        x: {
          ...horizontalRangeSpec.encoding!.x,
          scale: reverse ? { domain: [-10, 10], reverse: true } : { domain: [10, -10] },
        },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks.map(mark => [mark.x, mark.width, mark.roundedEnd])).toEqual([
      [120, 60, 'right'],
      [20, 60, 'left'],
    ]);
  });

  it('maps both x/x2 and y/y2 even when endpoints are unsorted', () => {
    expect(getVegaRangedGeometry(rectangleRangeSpec, 200, 100).marks[0]).toMatchObject({
      x: 40,
      y: 20,
      width: 120,
      height: 40,
      x1: 160,
      x2: 40,
      y1: 20,
      y2: 60,
      d: 'M40,20L160,20L160,60L40,60Z',
    });
  });

  it('uses independent numeric offset fields and the same upward-positive y direction', () => {
    expect(getVegaRangedGeometry(numericOffsetSpec, 200, 100).marks[0]).toMatchObject({
      x: 45,
      y: 20,
      width: 80,
      height: 40,
      x1: 45,
      x2: 125,
      y1: 20,
      y2: 60,
    });
    const spec = rangedSpec({
      ...numericOffsetSpec,
      encoding: {
        ...numericOffsetSpec.encoding,
        xOffset: { value: -5 },
        yOffset: { value: -10 },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ x: 35, y: 40, width: 80, height: 40 });
  });

  it('scales quantitative offsets independently of the main position scale', () => {
    const spec = rangedSpec({
      ...numericOffsetSpec,
      encoding: {
        ...numericOffsetSpec.encoding,
        xOffset: { field: 'dx', type: 'quantitative', scale: { domain: [0, 10], range: [0, 40] } },
        yOffset: { field: 'dy', type: 'quantitative', scale: { domain: [0, 20], range: [0, 20] } },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ x: 60, y: 20, width: 80, height: 40 });
  });

  it('supports horizontal ordinal offsets in top-to-bottom band order', () => {
    const spec = rangedSpec({
      ...groupedOffsetSpec,
      encoding: {
        x: groupedOffsetSpec.encoding!.y,
        y: groupedOffsetSpec.encoding!.x,
        yOffset: groupedOffsetSpec.encoding!.xOffset,
        color: groupedOffsetSpec.encoding!.color,
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks.map(mark => [mark.x, mark.y, mark.width, mark.height])).toEqual([
      [100, 0, 40, 25],
      [100, 25, 80, 25],
      [60, 50, 40, 25],
      [100, 75, 20, 25],
    ]);
  });

  it('does not share offset-band namespaces with same-field cell axes', () => {
    expect(
      getVegaRangedGeometry(sameFieldCellSpec, 200, 100).marks.map(mark => [mark.x, mark.y, mark.width, mark.height]),
    ).toEqual([
      [0, 0, 50, 100],
      [150, 0, 50, 100],
    ]);
  });

  it.each([
    [4, false, 'top', 'M0,34Q0,30 4,30L96,30Q100,30 100,34L100,50L0,50Z'],
    [-4, false, 'bottom', 'M0,50L100,50L100,66Q100,70 96,70L4,70Q0,70 0,66Z'],
    [4, true, 'bottom', 'M0,50L100,50L100,66Q100,70 96,70L4,70Q0,70 0,66Z'],
    [-4, true, 'top', 'M0,34Q0,30 4,30L96,30Q100,30 100,34L100,50L0,50Z'],
  ])('rounds only the primary vertical value end (%s, reverse=%s)', (amount, reverse, roundedEnd, d) => {
    const spec = rangedSpec({
      mark: { type: 'bar', cornerRadiusEnd: 4 },
      data: { values: [{ category: 'A', amount }] },
      encoding: {
        x: { field: 'category', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } },
        xOffset: { datum: 'only', type: 'nominal' },
        y: { field: 'amount', type: 'quantitative', scale: { domain: [-10, 10], reverse: reverse as boolean } },
      },
    });
    expect(getVegaRangedGeometry(spec, 100, 100).marks[0]).toMatchObject({ roundedEnd, d });
  });

  it('ranged rounding follows primary value end, not the sorted top edge', () => {
    const spec = rangedSpec({
      mark: { type: 'bar', cornerRadiusEnd: 4 },
      data: { values: [{ category: 'A', value: -8, base: -2 }] },
      encoding: {
        x: { field: 'category', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } },
        y: { field: 'value', type: 'quantitative', scale: { domain: [-10, 10] } },
        y2: { field: 'base' },
      },
    });
    expect(getVegaRangedGeometry(spec, 100, 100).marks[0]).toMatchObject({ y: 60, height: 30, roundedEnd: 'bottom' });
  });

  it('renders ticks at the value, not from zero, respecting thickness', () => {
    const spec = rangedSpec({ ...groupedOffsetSpec, mark: { type: 'tick', thickness: 2 } });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ x: 0, y: 29, width: 50, height: 2 });
  });

  it('reads nested and escaped field names without executing data', () => {
    expect(readVegaField({ stats: { amount: 4 }, 'stats.amount': 9 }, 'stats.amount')).toBe(4);
    expect(readVegaField({ 'stats.amount': 9 }, 'stats\\.amount')).toBe(9);
    expect(readVegaField({ rows: [{ amount: 7 }] }, 'rows[0].amount')).toBe(7);
  });

  it('does not mutate prepared rows/specs and drops invalid geometry', () => {
    const original = JSON.stringify(groupedOffsetSpec);
    getVegaRangedGeometry(groupedOffsetSpec, 200, 100);
    expect(JSON.stringify(groupedOffsetSpec)).toBe(original);
    const spec = { ...groupedOffsetSpec, data: { values: [{ category: 'A', slot: 'first', amount: null }] } };
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
  });
});

describe('native SVG integration', () => {
  it('respects authored labels, links descriptions and presents only authored visible titles', () => {
    const { container, rerender } = render(
      <VegaLiteRangedChart
        aria-label="Author label"
        spec={{
          ...horizontalRangeSpec,
          title: { text: 'Ranges', subtitle: 'Prepared values' },
          description: 'Range description',
        }}
      />,
    );
    expect(container.firstElementChild).toHaveAttribute('aria-label', 'Author label');
    expect(screen.getByRole('heading', { name: 'Ranges' })).toBeVisible();
    expect(screen.getByText('Prepared values')).toBeVisible();
    const svg = container.querySelector('svg')!;
    const description = svg.querySelector('desc')!;
    expect(svg).toHaveAttribute('aria-describedby', description.id);
    expect(description.textContent).toContain('Range description');
    expect(description.textContent).toContain('Home');
    expect(description.textContent).toContain('Shift+Tab');
    rerender(<VegaLiteRangedChart spec={horizontalRangeSpec} />);
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('leaves the composed view wrapper as the only heading through an explicit presentation prop', () => {
    const { container } = render(
      <div data-vega-view="root/hconcat/0">
        <h3>Ranges</h3>
        <VegaLiteRangedChart hideTitle spec={{ ...horizontalRangeSpec, title: 'Ranges' }} />
      </div>,
    );
    expect(screen.getAllByRole('heading', { name: 'Ranges' })).toHaveLength(1);
    expect(container.querySelectorAll('h3')).toHaveLength(1);
  });

  it('omits a standalone hidden title in SSR while retaining subtitle, SVG naming and layout', () => {
    const spec = { ...horizontalRangeSpec, title: { text: 'Ranges', subtitle: 'Prepared values' } };
    const html = renderToString(<VegaLiteRangedChart hideTitle spec={spec} width={400} height={200} />);
    const { container } = render(<div />);
    container.firstElementChild!.innerHTML = html;
    expect(container.querySelectorAll('h3')).toHaveLength(0);
    expect(screen.getByText('Prepared values')).toBeVisible();
    const svg = container.querySelector('svg')!;
    expect(svg.querySelector('title')).toHaveTextContent('Ranges');
    expect(svg).toHaveAttribute('aria-labelledby', svg.querySelector('title')!.id);
    expect(svg).toHaveAttribute('viewBox', '-56 -24 400 200');
    expect(svg.querySelector('clipPath rect')).toHaveAttribute('width', '328');
    expect(container.innerHTML).not.toMatch(/hidetitle/i);
  });

  it('keeps authored headings independent of ancestor markup and forwards generic heading props/ref', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    const spec = { title: { text: 'Ranges', subtitle: 'Prepared values' } };
    const { container, rerender } = render(
      <div data-vega-view="unrelated">
        <h3>Ancestor title</h3>
        <VegaLiteChartTitle spec={spec} ref={ref} hidden className="authored" data-testid="chart-heading" />
      </div>,
    );
    expect(ref.current).toBe(screen.getByTestId('chart-heading'));
    expect(ref.current).toHaveAttribute('hidden');
    expect(ref.current).toHaveClass('authored');
    rerender(
      <div data-vega-view="unrelated">
        <h3>Ancestor title</h3>
        <VegaLiteChartTitle spec={spec} ref={ref} data-testid="chart-heading" />
      </div>,
    );
    expect(screen.getByRole('heading', { name: 'Ranges' })).toBeVisible();
    rerender(<VegaLiteChartTitle spec={spec} ref={ref} hideTitle />);
    expect(container.querySelector('h3')).toBeNull();
    expect(ref.current).toBeNull();
    expect(screen.getByText('Prepared values')).toBeVisible();
  });

  it('preserves generic root hidden, ref, class and layout with title suppression', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container, rerender } = render(
      <VegaLiteRangedChart
        ref={ref}
        spec={{ ...horizontalRangeSpec, title: 'Ranges' }}
        hideTitle
        hidden
        className="authored"
        style={{ display: 'grid' }}
        width={400}
        height={200}
      />,
    );
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current).toHaveAttribute('hidden');
    expect(ref.current).toHaveClass('authored');
    expect(ref.current).toHaveStyle({ display: 'grid', width: '400px' });
    expect(container.querySelector('h3')).toBeNull();
    expect(ref.current).not.toHaveAttribute('hideTitle');
    rerender(
      <VegaLiteRangedChart ref={ref} spec={{ ...horizontalRangeSpec, title: 'Ranges' }} width={400} height={200} />,
    );
    expect(ref.current).not.toHaveAttribute('hidden');
    expect(screen.getByRole('heading', { name: 'Ranges' })).toBeVisible();
  });

  it('calls consumer blur and mouse-leave handlers once per event', () => {
    const onBlur = jest.fn();
    const onMouseLeave = jest.fn();
    const { container } = render(
      <VegaLiteRangedChart spec={horizontalRangeSpec} onBlur={onBlur} onMouseLeave={onMouseLeave} />,
    );
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.focus(mark);
    fireEvent.blur(mark);
    fireEvent.mouseLeave(container.firstElementChild!);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it.each([false, true])('gives native raw/semantic content one resolvable tooltip role (semantic=%s)', semantic => {
    nativePopover = true;
    const { container } = render(
      <VegaLiteRangedChart
        spec={horizontalRangeSpec}
        renderTooltip={semantic ? row => renderVegaTooltip(horizontalRangeSpec, row) : () => <span>Raw tooltip</span>}
      />,
    );
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.mouseEnter(mark);
    fireEvent.focus(mark);
    const tooltip = screen.getByRole('tooltip');
    expect(container.ownerDocument.getElementById(mark.getAttribute('aria-describedby')!)!.contains(tooltip)).toBe(
      true,
    );
    if (semantic) {
      expect(tooltip.tagName).toBe('DL');
    }
  });

  it.each(['hidden-field', 'null', 'false'])('does not expose suppressed native tooltip content: %s', mode => {
    nativePopover = true;
    const spec = {
      ...horizontalRangeSpec,
      data: { values: horizontalRangeSpec.data!.values!.map(row => ({ ...row, private: 'secret' })) },
      encoding: { ...horizontalRangeSpec.encoding, tooltip: { field: 'private', tooltip: false } },
    };
    const { container } = render(
      <VegaLiteRangedChart
        spec={mode === 'hidden-field' ? spec : horizontalRangeSpec}
        renderTooltip={
          mode === 'hidden-field' ? row => renderVegaTooltip(spec, row) : () => (mode === 'null' ? null : false)
        }
      />,
    );
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.mouseEnter(mark);
    fireEvent.focus(mark);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
    expect(mark).not.toHaveAttribute('aria-describedby');
    expect(container.textContent).not.toContain('secret');
  });

  it('clears removed anchors even if the mark key is reused later', () => {
    const { container, rerender } = render(<VegaLiteRangedChart spec={horizontalRangeSpec} />);
    fireEvent.focus(container.querySelector('path[data-ranged-mark]')!);
    expect(screen.getByRole('tooltip')).toBeTruthy();
    rerender(<VegaLiteRangedChart spec={{ ...horizontalRangeSpec, data: { values: [] } }} />);
    expect(screen.queryByRole('tooltip')).toBeNull();
    rerender(<VegaLiteRangedChart spec={horizontalRangeSpec} />);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('renders actual geometry, axis labels, controlled selection and forwards the root ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<VegaLiteRangedChart ref={ref} spec={groupedOffsetSpec} selectedLegends={['red']} />);
    const paths = container.querySelectorAll('path[data-ranged-mark]');
    expect(paths).toHaveLength(4);
    expect(paths[0].getAttribute('d')).toBe('M0,8.4L32,8.4L32,14L0,14Z');
    expect(paths[2].getAttribute('d')).toBe('M64,14L96,14L96,19.6L64,19.6Z');
    expect(paths[2].getAttribute('data-selected')).toBe('false');
    expect(ref.current).toBe(container.firstChild);
    expect(screen.getByText('A', { selector: 'text' })).toBeTruthy();
    expect(screen.getByText('amount', { selector: 'text' })).toBeTruthy();
  });

  it('uses distinct per-chart IDs including axis and offset namespaces', () => {
    const { container } = render(
      <>
        <VegaLiteRangedChart spec={sameFieldCellSpec} />
        <VegaLiteRangedChart spec={sameFieldCellSpec} />
      </>,
    );
    const ids = Array.from(container.querySelectorAll('[id]'), element => element.id);
    expect(ids.length).toBeGreaterThan(10);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('opens focus and hover callouts at the actual event anchor in the second SVG', () => {
    const { container } = render(
      <>
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
      </>,
    );
    const charts = container.querySelectorAll('svg');
    const target = charts[1].querySelectorAll('path[data-ranged-mark]')[1];
    fireEvent.focus(target);
    let props = popover.mock.calls[popover.mock.calls.length - 1][0] as ChartPopoverProps;
    // DOM anchors must be reference-equal; deep matching traverses cyclic React/DOM internals.
    expect((props.positioning as { target: unknown }).target).toBe(target);
    expect(props.clickPosition).toBeUndefined();
    expect(screen.getByRole('tooltip').textContent).toContain('value: 8; baseline: 2; task: B');
    fireEvent.blur(target);
    expect(screen.queryByRole('tooltip')).toBeNull();
    const other = charts[1].querySelectorAll('path[data-ranged-mark]')[0];
    fireEvent.mouseEnter(other, { clientX: 37, clientY: 41 });
    props = popover.mock.calls[popover.mock.calls.length - 1][0] as ChartPopoverProps;
    expect((props.positioning as { target: unknown }).target).toBe(other);
    expect(props.clickPosition).toBeUndefined();
    expect(screen.getByRole('tooltip').textContent).toContain('baseline: -2; task: A');
    fireEvent.focus(target);
    props = popover.mock.calls[popover.mock.calls.length - 1][0] as ChartPopoverProps;
    expect((props.positioning as { target: unknown }).target).toBe(target);
    expect(screen.getByRole('tooltip').textContent).toContain('value: 8; baseline: 2; task: B');
    fireEvent.mouseLeave(other);
    fireEvent.blur(target);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('keeps keyboard navigation within its SVG and does not trap Tab', async () => {
    const host = render(<div />);
    const targetDocument = host.container.ownerDocument;
    const view = targetDocument.defaultView!;
    // Only simulate layout visibility; navigation itself comes from the real FluentProvider/Tabster.
    const bounds = jest
      .spyOn(targetDocument.body, 'getBoundingClientRect')
      .mockReturnValue(new view.DOMRect(0, 0, 640, 400));
    const offset = jest.spyOn(view.HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(targetDocument.body);
    jest.useFakeTimers();
    const { container } = render(
      <FluentProvider theme={webLightTheme}>
        <button>Before charts</button>
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
        <button>After charts</button>
      </FluentProvider>,
    );
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
    const marks = container.querySelectorAll<SVGPathElement>('path[data-ranged-mark]');
    try {
      act(() => marks[2].focus());
      fireEvent.mouseEnter(marks[3]);
      await act(async () => userEvent.keyboard('{Home}'));
      expect(marks[2]).toHaveFocus();
      expect(screen.getByRole('tooltip').textContent).toContain('task: A');
      await act(async () => userEvent.keyboard('{End}'));
      expect(marks[3]).toHaveFocus();
      for (const [key, index] of [
        ['ArrowRight', 2],
        ['ArrowLeft', 3],
        ['ArrowDown', 2],
        ['ArrowUp', 3],
      ] as const) {
        await act(async () => userEvent.keyboard(`{${key}}`));
        expect(marks[index]).toHaveFocus();
      }
      await act(async () => userEvent.tab());
      expect(screen.getByRole('button', { name: 'After charts' })).toHaveFocus();
      await act(async () => userEvent.tab({ shift: true }));
      expect(marks[2].ownerSVGElement!.contains(targetDocument.activeElement)).toBe(true);
      await act(async () => userEvent.tab({ shift: true }));
      expect(marks[0].ownerSVGElement!.contains(targetDocument.activeElement)).toBe(true);
      await act(async () => userEvent.tab({ shift: true }));
      expect(screen.getByRole('button', { name: 'Before charts' })).toHaveFocus();
      const attributes = JSON.parse(container.querySelector('[data-ranged-navigation]')!.getAttribute('data-tabster')!);
      expect(attributes.mover).toMatchObject({ cyclic: true, direction: 0 });
      expect(attributes.groupper).toBeDefined();
    } finally {
      bounds.mockRestore();
      offset.mockRestore();
    }
  });

  it('wires optional row tooltip/aria callbacks and native legends', () => {
    const renderTooltip = jest.fn(row => <span>Custom {String(row.amount)}</span>);
    const onLegendChange = jest.fn();
    const getAriaLabel = jest.fn((row: Record<string, unknown>) => `Value ${String(row.amount)}`);
    const { container } = render(
      <VegaLiteRangedChart
        spec={groupedOffsetSpec}
        renderTooltip={renderTooltip}
        getAriaLabel={getAriaLabel}
        onLegendChange={onLegendChange}
      />,
    );
    const mark = within(container).getByRole('img', { name: 'Value 4' });
    fireEvent.focus(mark);
    expect(screen.getByRole('tooltip').textContent).toBe('Custom 4');
    expect(renderTooltip).toHaveBeenCalledWith(groupedOffsetSpec.data!.values![0]);
    fireEvent.click(screen.getByRole('option', { name: 'red' }));
    expect(onLegendChange).toHaveBeenCalledWith(['red']);
  });

  it('provides accessible range names and server-safe rendering', () => {
    const html = renderToString(<VegaLiteRangedChart spec={rectangleRangeSpec} />);
    expect(html).toContain('left: 8 to 2');
    expect(html).toContain('top: 6 to -2');
    expect(html).toContain('M25.6,5.6L102.4,5.6L102.4,16.8L25.6,16.8Z');
  });

  it('renders the real native callout from focused and hovered marks', () => {
    nativePopover = true;
    const { container } = render(
      <>
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
      </>,
    );
    const marks = container.querySelectorAll<SVGPathElement>('path[data-ranged-mark]');
    fireEvent.focus(marks[2]);
    expect(screen.getByText('value: −8; baseline: -2; task: A')).toBeTruthy();
    expect((popover.mock.calls[popover.mock.calls.length - 1][0].positioning as { target: unknown }).target).toBe(
      marks[2],
    );
    fireEvent.blur(marks[2]);
    fireEvent.mouseEnter(marks[3]);
    expect(screen.getByText('value: 8; baseline: 2; task: B')).toBeTruthy();
    expect((popover.mock.calls[popover.mock.calls.length - 1][0].positioning as { target: unknown }).target).toBe(
      marks[3],
    );
  });
});

describe('field safety regressions', () => {
  it('re-exports the canonical descriptor-only field resolver', () => {
    expect(readVegaField).toBe(canonicalReadVegaField);
  });

  it.each(['amount', 'stats.amount', 'rows[0].amount'])('never invokes field accessors: %s', field => {
    const getter = jest.fn(() => 4);
    const record = Object.defineProperty({}, 'amount', { get: getter, enumerable: true });
    const row = field === 'amount' ? record : field === 'stats.amount' ? { stats: record } : { rows: [record] };
    Object.assign(row, { category: 'A', slot: 'first' });
    const spec = rangedSpec({
      ...groupedOffsetSpec,
      data: { values: [row] },
      encoding: { ...groupedOffsetSpec.encoding, y: { field, type: 'quantitative' } },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
    expect(getter).not.toHaveBeenCalled();
  });

  it.each(['valueOf', 'toString', 'toPrimitive'])('does not coerce arbitrary numeric objects: %s', hook => {
    const invoke = jest.fn(() => 4);
    const amount = hook === 'toPrimitive' ? { [Symbol.toPrimitive]: invoke } : { [hook]: invoke };
    const spec = rangedSpec({ ...groupedOffsetSpec, data: { values: [{ category: 'A', slot: 'first', amount }] } });
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
    expect(invoke).not.toHaveBeenCalled();
  });
});

describe('responsive dimension regressions', () => {
  it('uses measured dimensions exactly and resizes plot geometry', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container, rerender } = render(
      <VegaLiteRangedChart ref={ref} spec={rectangleRangeSpec} {...{ width: 400, height: 200 }} />,
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '400');
    expect(svg).toHaveAttribute('height', '200');
    expect(svg).toHaveAttribute('viewBox', '-56 -24 400 200');
    expect(ref.current).toHaveStyle({ width: '400px', height: '200px' });
    const first = container.querySelector('path[data-ranged-mark]')!.getAttribute('d');
    rerender(<VegaLiteRangedChart ref={ref} spec={rectangleRangeSpec} {...{ width: 600, height: 300 }} />);
    expect(svg).toHaveAttribute('width', '600');
    expect(svg).toHaveAttribute('height', '300');
    expect(ref.current).toHaveStyle({ width: '600px', height: '300px' });
    expect(container.querySelector('path[data-ranged-mark]')!.getAttribute('d')).not.toBe(first);
  });

  it('does not enlarge numeric specification dimensions for axis gutters', () => {
    const { container } = render(<VegaLiteRangedChart spec={rectangleRangeSpec} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '200');
    expect(container.querySelector('svg')).toHaveAttribute('height', '100');
  });
});

describe('unit routing and tick contracts', () => {
  it.each([plainTickSpec, roundedBarSpec])('routes unit ticks/rounded bars without offsets or ranges %#', spec => {
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toHaveLength(2);
  });

  it('treats cornerRadiusEnd:0 as a routing declaration', () => {
    expect(canRenderVegaRangedSpec(rangedSpec({ ...roundedBarSpec, mark: { type: 'bar', cornerRadiusEnd: 0 } }))).toBe(
      true,
    );
  });

  it('makes quantitative-x nominal-y ticks narrow, not zero-baseline bars', () => {
    expect(
      getVegaRangedGeometry(plainTickSpec, 200, 100).marks.map(mark => [mark.x, mark.y, mark.width, mark.height]),
    ).toEqual([
      [139, 0, 2, 50],
      [59, 50, 2, 50],
    ]);
  });

  it('transposes ticks to horizontal thickness for nominal-x quantitative-y', () => {
    const spec = rangedSpec({
      ...plainTickSpec,
      encoding: { x: plainTickSpec.encoding!.y, y: plainTickSpec.encoding!.x },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks.map(mark => [mark.x, mark.y, mark.width, mark.height])).toEqual([
      [0, 29, 100, 2],
      [100, 69, 100, 2],
    ]);
  });

  it('honors explicit tick length centered inside the categorical band', () => {
    const spec = rangedSpec({ ...plainTickSpec, mark: { type: 'tick', thickness: 2, size: 10 } });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ x: 139, y: 20, width: 2, height: 10 });
  });

  it.each(['log', 'sqrt', 'pow', 'symlog'] as const)(
    'does not render unsupported nonlinear ranged scales: %s',
    type => {
      const spec = rangedSpec({
        ...roundedBarSpec,
        encoding: {
          ...roundedBarSpec.encoding,
          x: { ...roundedBarSpec.encoding!.x, scale: { type } },
        },
      });
      expect(canRenderVegaRangedSpec(spec)).toBe(false);
      expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
    },
  );

  it('renders a flat ranged layer at the same coordinates as its unit', () => {
    const spec = { layer: [{ ...horizontalRangeSpec, mark: horizontalRangeSpec.mark! }] };
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    const geometry = getVegaRangedGeometry(spec, 200, 100);
    expect(geometry.marks.map(({ x, y, width, height }) => ({ x, y, width, height }))).toEqual(
      getVegaRangedGeometry(horizontalRangeSpec, 200, 100).marks.map(({ x, y, width, height }) => ({
        x,
        y,
        width,
        height,
      })),
    );
    expect(geometry.marks.map(mark => mark.key)).toEqual(['layer-0-0', 'layer-0-1']);
  });
});

describe('scaled offsets and signed endpoints', () => {
  it.each([
    [false, false, 100, 10],
    [true, false, 80, 10],
    [true, true, 40, 30],
  ])('clamps local offsets and reverses their direction (clamp=%s reverse=%s)', (clamp, reverse, x, y) => {
    const spec = rangedSpec({
      ...numericOffsetSpec,
      data: { values: [{ left: 2, right: 6, top: 4, bottom: -4, dx: 15, dy: 30 }] },
      encoding: {
        ...numericOffsetSpec.encoding,
        xOffset: { field: 'dx', type: 'quantitative', scale: { domain: [0, 10], range: [0, 40], clamp, reverse } },
        yOffset: {
          field: 'dy',
          type: 'quantitative',
          scale: { domain: [0, 20], range: [0, 20], clamp: true, reverse },
        },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ x, y, width: 80, height: 40 });
  });

  it('clamps below the offset domain too', () => {
    const spec = rangedSpec({
      ...numericOffsetSpec,
      data: { values: [{ left: 2, right: 6, top: 4, bottom: -4, dx: -5, dy: -10 }] },
      encoding: {
        ...numericOffsetSpec.encoding,
        xOffset: { field: 'dx', type: 'quantitative', scale: { domain: [0, 10], range: [0, 40], clamp: true } },
        yOffset: { field: 'dy', type: 'quantitative', scale: { domain: [0, 20], range: [0, 20], clamp: true } },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ x: 40, y: 30 });
  });

  it.each([0, -0])('keeps zero-length signed bars finite: %s', amount => {
    const spec = rangedSpec({ ...roundedBarSpec, data: { values: [{ category: 'A', amount }] } });
    const mark = getVegaRangedGeometry(spec, 200, 100).marks[0];
    expect(mark).toMatchObject({ x: 100, width: 0 });
    expect(mark.d).not.toMatch(/NaN|Infinity/);
  });

  it.each([false, true])('rounds signed horizontal bars at their primary end (reverse=%s)', reverse => {
    const spec = rangedSpec({
      ...roundedBarSpec,
      encoding: {
        ...roundedBarSpec.encoding,
        x: { ...roundedBarSpec.encoding!.x, scale: { domain: [-10, 10], reverse } },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks.map(mark => [mark.width, mark.roundedEnd])).toEqual(
      reverse
        ? [
            [40, 'left'],
            [40, 'right'],
          ]
        : [
            [40, 'right'],
            [40, 'left'],
          ],
    );
  });
});

describe('additional scalar safety', () => {
  it.each(['4', ' 4 ', '4e0'])('accepts finite quantitative string columns: %s', amount => {
    const spec = { ...groupedOffsetSpec, data: { values: [{ category: 'A', slot: 'first', amount }] } };
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ y: 30, height: 20 });
  });

  it.each([null, undefined, '', '  ', false, Infinity, 'Infinity', NaN, 'invalid'])(
    'excludes invalid quantitative rows %#',
    amount => {
      const spec = { ...groupedOffsetSpec, data: { values: [{ category: 'A', slot: 'first', amount }] } };
      expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
    },
  );

  it('excludes inherited fields, malformed paths and accessor array entries', () => {
    const getter = jest.fn(() => ({ category: 'A', slot: 'first', amount: 4 }));
    const rows = Object.defineProperty([], '0', { get: getter, enumerable: true });
    expect(getVegaRangedGeometry({ ...groupedOffsetSpec, data: { values: rows } }, 200, 100).marks).toEqual([]);
    expect(getter).not.toHaveBeenCalled();
    expect(readVegaField(Object.create({ amount: 4 }), 'amount')).toBeUndefined();
    expect(readVegaField({ amount: 4 }, 'amount[')).toBeUndefined();
  });

  it('does not stringify object category/color fields', () => {
    const invoke = jest.fn(() => 'A');
    const value = { [Symbol.toPrimitive]: invoke };
    const spec = {
      ...groupedOffsetSpec,
      data: { values: [{ category: value, slot: 'first', paletteColor: value, amount: 4 }] },
    };
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
    const colorOnly = { ...spec, data: { values: [{ category: 'A', slot: 'first', paletteColor: value, amount: 4 }] } };
    expect(getVegaRangedGeometry(colorOnly, 200, 100).marks[0].legend).toBeUndefined();
    render(<VegaLiteRangedChart spec={colorOnly} />);
    expect(invoke).not.toHaveBeenCalled();
  });

  it('accepts a recursively frozen prepared spec without mutation', () => {
    const freeze = (value: unknown): void => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
      }
    };
    const spec = prepareVegaLiteSpec(groupedOffsetSpec, { mode: 'strict' });
    freeze(spec);
    const before = JSON.stringify(spec);
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toHaveLength(4);
    render(<VegaLiteRangedChart spec={spec} />);
    expect(JSON.stringify(spec)).toBe(before);
  });
});

describe('legend domains and per-view theme colors', () => {
  it('keeps full color domains, including absent categories, without looking up a missing mark', () => {
    const spec = rangedSpec({
      ...groupedOffsetSpec,
      encoding: {
        ...groupedOffsetSpec.encoding,
        color: {
          ...groupedOffsetSpec.encoding!.color,
          scale: { domain: ['missing', 'blue', 'red'], range: ['gold', 'navy', 'crimson'] },
        },
      },
    });
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    expect(screen.getAllByRole('option').map(option => option.getAttribute('aria-label'))).toEqual([
      'missing',
      'blue',
      'red',
    ]);
    const marks = container.querySelectorAll('path[data-ranged-mark]');
    expect(marks[0]).toHaveAttribute('fill', 'crimson');
    expect(marks[2]).toHaveAttribute('fill', 'navy');
  });

  it('retains cached category colors when prepared rows reorder or disappear', () => {
    const { container, rerender } = render(<VegaLiteRangedChart spec={groupedOffsetSpec} />);
    const colors = Array.from(container.querySelectorAll('path[data-ranged-mark]'), mark => mark.getAttribute('fill'));
    rerender(
      <VegaLiteRangedChart
        spec={{
          ...groupedOffsetSpec,
          data: { values: [groupedOffsetSpec.data!.values![2], groupedOffsetSpec.data!.values![0]] },
        }}
      />,
    );
    const marks = container.querySelectorAll('path[data-ranged-mark]');
    expect(marks[0]).toHaveAttribute('fill', colors[2]!);
    expect(marks[1]).toHaveAttribute('fill', colors[0]!);
  });

  it('isolates concurrent view caches and honors dark theme changes', () => {
    const spec = rangedSpec({
      ...groupedOffsetSpec,
      encoding: {
        ...groupedOffsetSpec.encoding,
        color: { field: 'paletteColor', type: 'nominal', scale: { scheme: 'category10' } },
      },
    });
    const other = { ...spec, data: { values: [spec.data!.values![2], spec.data!.values![0]] } };
    const { container, rerender } = render(
      <ThemeContext_unstable.Provider value={webLightTheme}>
        <VegaLiteRangedChart spec={spec} />
        <VegaLiteRangedChart spec={other} />
      </ThemeContext_unstable.Provider>,
    );
    const charts = container.querySelectorAll('svg');
    expect(charts[0].querySelector('path[data-ranged-mark]')).toHaveAttribute(
      'fill',
      getVegaColor(0, 'category10', undefined, false),
    );
    expect(charts[1].querySelector('path[data-ranged-mark]')).toHaveAttribute(
      'fill',
      getVegaColor(0, 'category10', undefined, false),
    );
    rerender(
      <ThemeContext_unstable.Provider value={webDarkTheme}>
        <VegaLiteRangedChart spec={spec} />
        <VegaLiteRangedChart spec={other} />
      </ThemeContext_unstable.Provider>,
    );
    expect(charts[0].querySelector('path[data-ranged-mark]')).toHaveAttribute(
      'fill',
      getVegaColor(0, 'category10', undefined, true),
    );
    expect(charts[1].querySelectorAll('path[data-ranged-mark]')[1]).toHaveAttribute(
      'fill',
      getVegaColor(1, 'category10', undefined, true),
    );
  });
});

describe('tooltip activation and focus containment', () => {
  it.each([
    { encoding: { ...horizontalRangeSpec.encoding, tooltip: null } },
    { mark: { type: 'bar', tooltip: null } },
    { mark: { type: 'bar', tooltip: false as const } },
    { config: { mark: { tooltip: null } } },
    { config: { bar: { tooltip: false } } },
  ])('does not open mark/config/encoded disabled tooltips %#', override => {
    const spec = rangedSpec({ ...horizontalRangeSpec, ...override });
    const renderTooltip = jest.fn(() => <span>Must not open</span>);
    const { container } = render(<VegaLiteRangedChart spec={spec} renderTooltip={renderTooltip} />);
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.focus(mark);
    fireEvent.mouseEnter(mark);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(popover).not.toHaveBeenCalled();
    expect(renderTooltip).not.toHaveBeenCalled();
    expect(mark.getAttribute('aria-label')).toContain('task: A');
    expect(mark).not.toHaveAttribute('aria-describedby');
  });

  it('does not mount an empty wrapper when the shared callback returns null', () => {
    const renderTooltip = jest.fn(() => null);
    const { container } = render(<VegaLiteRangedChart spec={horizontalRangeSpec} renderTooltip={renderTooltip} />);
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.focus(mark);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(popover).not.toHaveBeenCalled();
    expect(mark).not.toHaveAttribute('aria-describedby');
  });

  it('keeps the focus callout on pointer leave and clears it only when focus leaves the chart', () => {
    const { container } = render(
      <>
        <VegaLiteRangedChart spec={horizontalRangeSpec} />
        <button>Outside</button>
      </>,
    );
    const root = container.firstElementChild!;
    const marks = root.querySelectorAll('path[data-ranged-mark]');
    fireEvent.focus(marks[0]);
    fireEvent.mouseEnter(marks[1]);
    fireEvent.mouseLeave(marks[1]);
    fireEvent.mouseLeave(root);
    expect(screen.getByRole('tooltip').textContent).toContain('task: A');
    fireEvent.blur(marks[0], { relatedTarget: marks[1] });
    expect(screen.getByRole('tooltip')).toBeTruthy();
    fireEvent.focus(marks[1]);
    expect(screen.getByRole('tooltip').textContent).toContain('task: B');
    fireEvent.blur(marks[1], { relatedTarget: screen.getByRole('button') });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('dismisses with Escape and never keeps an old row anchor after a resize/spec change', () => {
    const { container, rerender } = render(<VegaLiteRangedChart spec={horizontalRangeSpec} />);
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.focus(mark);
    fireEvent.keyDown(mark, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.focus(mark);
    rerender(<VegaLiteRangedChart spec={horizontalRangeSpec} width={600} height={300} />);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});

describe('temporal geometry and prepared aliases', () => {
  it.each(['time', 'utc'] as const)('formats temporal axes with the declared %s scale', type => {
    const start = '2024-01-01T23:30:00Z';
    const spec = rangedSpec({
      mark: 'rect',
      data: { values: [{ start, end: '2024-01-02T23:30:00Z', category: 'A' }] },
      encoding: {
        x: {
          field: 'start',
          type: 'temporal',
          scale: { type },
          axis: { values: [start], format: '%Y-%m-%d %H:%M %Z' },
        },
        x2: { field: 'end' },
        y: { field: 'category', type: 'nominal' },
      },
    });
    const geometry = getVegaRangedGeometry(spec, 200, 100);
    const formatter = type === 'utc' ? utcFormat : timeFormat;
    expect(geometry.axes.x.ticks[0].label).toBe(formatter('%Y-%m-%d %H:%M %Z')(new Date(start)));
    expect(geometry.marks[0]).toMatchObject({ x: 0, width: 200 });
  });

  it('uses Date intrinsics without invoking overridden getTime/valueOf hooks', () => {
    const date = new Date('2024-01-01T00:00:00Z');
    const invoke = jest.fn(() => {
      throw new Error('Must not invoke');
    });
    date.getTime = invoke;
    date.valueOf = invoke;
    const spec = rangedSpec({
      mark: 'rect',
      data: { values: [{ start: date, end: new Date('2024-01-02T00:00:00Z'), category: 'A' }] },
      encoding: {
        x: { field: 'start', type: 'temporal', scale: { type: 'utc' } },
        x2: { field: 'end' },
        y: { field: 'category', type: 'nominal' },
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks[0]).toMatchObject({ width: 200 });
    expect(invoke).not.toHaveBeenCalled();
  });

  it('consumes the engine’s corrected 2012 time-unit alias without deriving or mutating it again', () => {
    const prepared = prepareVegaLiteSpec(
      rangedSpec({
        mark: 'tick',
        data: { values: [{ when: '2024-02-29T23:30:00Z', amount: 4 }] },
        encoding: {
          x: {
            field: 'when',
            type: 'temporal',
            timeUnit: 'utcmonthdate',
            scale: { type: 'utc' },
            axis: { format: '%Y-%m-%d' },
          },
          y: { field: 'amount', type: 'quantitative' },
        },
      }),
      { mode: 'strict' },
    );
    const field = prepared.encoding!.x!.field!;
    expect(field).toMatch(/^__vega_/);
    const value = readVegaField(prepared.data!.values![0], field) as Date;
    expect(value.toISOString()).toBe('2012-02-29T00:00:00.000Z');
    expect(getVegaRangedGeometry(prepared, 200, 100).marks).toHaveLength(1);
    expect(readVegaField(prepared.data!.values![0], field)).toBe(value);
  });
});

describe('responsive wrapper and clipping contract', () => {
  it('accepts actual measured dimensions from the native responsive HOC without leaking its private props', () => {
    const host = render(<div />);
    const view = host.container.ownerDocument.defaultView!;
    const descriptor = Object.getOwnPropertyDescriptor(view, 'ResizeObserver');
    let resize: ResizeObserverCallback | undefined;
    const observer = { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
    const Observer = jest.fn((callback: ResizeObserverCallback) => {
      resize = callback;
      return observer;
    });
    Object.defineProperty(view, 'ResizeObserver', { value: Observer, configurable: true });
    const frame = jest.spyOn(view, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const ResponsiveChart = withResponsiveContainer(VegaLiteRangedChart);
    const rendered = render(<ResponsiveChart spec={rectangleRangeSpec} width={400} height={200} />);
    try {
      act(() =>
        resize!([{ contentRect: { width: 400, height: 200 } }] as ResizeObserverEntry[], observer as ResizeObserver),
      );
      const svg = rendered.container.querySelector('svg')!;
      expect(svg).toHaveAttribute('width', '400');
      expect(svg).toHaveAttribute('height', '200');
      expect(svg.parentElement).not.toHaveAttribute('shouldResize');
      expect(svg.parentElement).not.toHaveAttribute('styles');
      act(() =>
        resize!([{ contentRect: { width: 500, height: 250 } }] as ResizeObserverEntry[], observer as ResizeObserver),
      );
      expect(svg).toHaveAttribute('width', '500');
      expect(svg).toHaveAttribute('height', '250');
    } finally {
      rendered.unmount();
      frame.mockRestore();
      if (descriptor) {
        Object.defineProperty(view, 'ResizeObserver', descriptor);
      } else {
        Reflect.deleteProperty(view, 'ResizeObserver');
      }
    }
  });

  it('keeps default and tiny viewport dimensions exact', () => {
    const spec = { ...rectangleRangeSpec, width: 'container' as const, height: 'container' as const };
    const { container, rerender } = render(<VegaLiteRangedChart spec={spec} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '640');
    expect(svg).toHaveAttribute('height', '400');
    rerender(<VegaLiteRangedChart spec={spec} width={0} height={50} />);
    expect(svg).toHaveAttribute('width', '0');
    expect(svg).toHaveAttribute('height', '50');
    expect(svg.querySelectorAll('path[data-ranged-mark]')).toHaveLength(0);
  });

  it('clips only the plot group with a unique clip definition in each SVG', () => {
    const { container } = render(
      <>
        <VegaLiteRangedChart spec={rectangleRangeSpec} />
        <VegaLiteRangedChart spec={rectangleRangeSpec} />
      </>,
    );
    const charts = container.querySelectorAll('svg');
    for (const svg of Array.from(charts)) {
      const clip = svg.querySelector('clipPath')!;
      expect(clip.querySelector('rect')).toHaveAttribute('width', '128');
      expect(clip.querySelector('rect')).toHaveAttribute('height', '28');
      expect(svg.querySelector('path[data-ranged-mark]')!.parentElement).toHaveAttribute(
        'clip-path',
        `url(#${clip.id})`,
      );
      expect(svg.querySelector('[id$="-x"]')).not.toHaveAttribute('clip-path');
    }
    expect(charts[0].querySelector('clipPath')!.id).not.toBe(charts[1].querySelector('clipPath')!.id);
  });

  it('honors reversed color domains and constant mark colors', () => {
    const spec = rangedSpec({
      ...groupedOffsetSpec,
      encoding: {
        ...groupedOffsetSpec.encoding,
        color: {
          ...groupedOffsetSpec.encoding!.color,
          scale: { domain: ['red', 'blue'], range: ['crimson', 'navy'], reverse: true },
        },
      },
    });
    const { container, rerender } = render(<VegaLiteRangedChart spec={spec} />);
    expect(container.querySelector('path[data-ranged-mark]')).toHaveAttribute('fill', 'navy');
    rerender(
      <VegaLiteRangedChart
        spec={rangedSpec({
          ...spec,
          mark: { type: 'bar', color: 'currentColor' },
          encoding: { ...spec.encoding, color: { value: 'inherit' } },
        })}
      />,
    );
    expect(container.querySelector('path[data-ranged-mark]')).toHaveAttribute('fill', 'inherit');
  });
});

const centerSpec = (overrides: Partial<VegaLiteSpec> = {}): VegaLiteSpec =>
  rangedSpec({
    mark: 'bar',
    data: {
      values: [
        { category: 'A', series: 'a', amount: 2 },
        { category: 'A', series: 'b', amount: 4 },
        { category: 'B', series: 'a', amount: -1 },
        { category: 'B', series: 'b', amount: 1 },
      ],
    },
    encoding: {
      x: { field: 'category', type: 'nominal', scale: { domain: ['A', 'B'], paddingInner: 0, paddingOuter: 0 } },
      y: { field: 'amount', type: 'quantitative', stack: 'center' },
      color: { field: 'series', type: 'nominal', scale: { domain: ['a', 'b'], range: ['currentColor', 'inherit'] } },
    },
    ...overrides,
  });

describe('reference-matched centered bar stacks', () => {
  it('uses absolute magnitudes and tallest-group centering, not signed D3 silhouette', () => {
    const rows = centerSpec().data!.values!;
    const result = getVegaCenterStack(rows, {
      groupField: 'category',
      valueField: 'amount',
      seriesField: 'series',
      sort: [{ field: 'series', descending: true }],
    });
    // Vega 5.30 stackCenter: max=6, A starts at 0, B starts at (6-2)/2=2.
    expect(result.map(segment => [segment.index, segment.start, segment.end])).toEqual([
      [0, 4, 6],
      [1, 0, 4],
      [2, 3, 4],
      [3, 2, 3],
    ]);
    expect(result.every(segment => segment.row === rows[segment.index])).toBe(true);
  });

  it('keeps numeric/string group identities separate and resolves nested/escaped fields safely', () => {
    const rows = [
      { category: 1, series: 'a', stats: { amount: 4 } },
      { category: '1', series: 'a', stats: { amount: 2 } },
    ];
    expect(
      getVegaCenterStack(rows, {
        groupField: 'category',
        seriesField: 'series',
        valueField: 'stats.amount',
        sort: [],
      }).map(segment => [segment.start, segment.end]),
    ).toEqual([
      [0, 4],
      [1, 3],
    ]);
    expect(
      getVegaCenterStack([{ category: 'A', series: 'a', 'stats.amount': 4 }], {
        groupField: 'category',
        seriesField: 'series',
        valueField: 'stats\\.amount',
        sort: [],
      })[0],
    ).toMatchObject({ start: 0, end: 4 });
  });

  it('does not let an overflowing total contaminate other groups', () => {
    const result = getVegaCenterStack(
      [
        { category: 'A', series: 'a', amount: Number.MAX_VALUE },
        { category: 'A', series: 'b', amount: Number.MAX_VALUE },
        { category: 'B', series: 'a', amount: 4 },
      ],
      { groupField: 'category', seriesField: 'series', valueField: 'amount', sort: [] },
    );
    expect(result.map(segment => [segment.index, segment.start, segment.end])).toEqual([[2, 0, 4]]);
  });

  it('routes center bars but leaves ordinary zero/normalize/area charts native', () => {
    const spec = centerSpec();
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    for (const stack of ['zero', 'normalize', null] as const) {
      expect(
        canRenderVegaRangedSpec({ ...spec, encoding: { ...spec.encoding, y: { ...spec.encoding!.y, stack } } }),
      ).toBe(false);
    }
    expect(canRenderVegaRangedSpec({ ...spec, mark: 'area' })).toBe(false);
  });

  it('lays out both unequal groups on one auto domain with per-row accessible raw values', () => {
    const geometry = getVegaRangedGeometry(centerSpec(), 200, 120);
    expect(geometry.marks.map(mark => [mark.x, mark.y, mark.width, mark.height])).toEqual([
      [0, 0, 100, 40],
      [0, 40, 100, 80],
      [100, 40, 100, 20],
      [100, 60, 100, 20],
    ]);
    expect(geometry.marks[2].ariaLabel).toContain('amount: -1');
    expect(geometry.axes.y.ticks.map(tick => tick.label)).toContain('6');
  });

  it('uses ascending series order for horizontal center stacks', () => {
    const spec = centerSpec();
    const horizontal = { ...spec, encoding: { ...spec.encoding, x: spec.encoding!.y, y: spec.encoding!.x } };
    expect(canRenderVegaRangedSpec(horizontal)).toBe(true);
    expect(
      getVegaRangedGeometry(horizontal, 120, 100).marks.map(mark => [mark.x, mark.y, mark.width, mark.height]),
    ).toEqual([
      [0, 0, 40, 50],
      [40, 0, 80, 50],
      [40, 50, 20, 50],
      [60, 50, 20, 50],
    ]);
  });

  it('honors authored stack order without using the color domain as stack order', () => {
    const spec = centerSpec();
    const ordered = {
      ...spec,
      encoding: { ...spec.encoding, order: { field: 'series', type: 'nominal' as const, sort: 'ascending' as const } },
    };
    expect(getVegaRangedGeometry(ordered, 200, 120).marks.map(mark => [mark.y, mark.height])).toEqual([
      [80, 40],
      [0, 80],
      [60, 20],
      [40, 20],
    ]);
  });

  it('supports stable multi-field stack order without reordering the input rows', () => {
    const rows = [
      { category: 'A', series: 'a', amount: 1, rank: 2 },
      { category: 'A', series: 'b', amount: 2, rank: 1 },
      { category: 'A', series: 'c', amount: 3, rank: 1 },
    ];
    const before = JSON.stringify(rows);
    expect(
      getVegaCenterStack(rows, {
        groupField: 'category',
        seriesField: 'series',
        valueField: 'amount',
        sort: [
          { field: 'rank', descending: false },
          { field: 'series', descending: true },
        ],
      }).map(segment => [segment.start, segment.end]),
    ).toEqual([
      [5, 6],
      [3, 5],
      [0, 3],
    ]);
    expect(JSON.stringify(rows)).toBe(before);
  });

  it.each([false, true])('honors an authored domain and reversal, including rounded segment ends (%s)', reverse => {
    const spec = centerSpec();
    const geometry = getVegaRangedGeometry(
      {
        ...spec,
        mark: { type: 'bar', cornerRadiusEnd: 3 },
        encoding: {
          ...spec.encoding,
          y: { ...spec.encoding!.y, scale: { domain: [0, 12], reverse } },
        },
      },
      200,
      120,
    );
    expect(geometry.marks[0]).toMatchObject({
      y: reverse ? 40 : 60,
      height: 20,
      roundedEnd: reverse ? 'bottom' : 'top',
    });
    expect(geometry.marks[0].d).toContain('Q');
  });

  it('consumes aggregate aliases once and never mutates frozen rows', () => {
    const spec = centerSpec();
    const prepared = prepareVegaLiteSpec(
      {
        ...spec,
        data: { values: [...spec.data!.values!, { category: 'A', series: 'a', amount: 2 }] },
        encoding: { ...spec.encoding, y: { ...spec.encoding!.y, aggregate: 'sum' } },
      },
      { mode: 'strict' },
    );
    const freeze = (value: unknown): void => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
      }
    };
    freeze(prepared);
    const before = JSON.stringify(prepared);
    expect(prepared.encoding!.y!.aggregate).toBeUndefined();
    expect(prepared.encoding!.y!.stack).toBe('center');
    expect(getVegaRangedGeometry(prepared, 200, 160).marks).toHaveLength(4);
    expect(getVegaRangedGeometry(prepared, 200, 160).marks[0].height).toBe(80);
    expect(JSON.stringify(prepared)).toBe(before);
  });

  it('preserves distinct duplicate rows rather than aggregating again', () => {
    const rows = [
      { category: 'A', series: 'a', amount: 2 },
      { category: 'A', series: 'a', amount: 3 },
    ];
    const result = getVegaCenterStack(rows, {
      groupField: 'category',
      seriesField: 'series',
      valueField: 'amount',
      sort: [],
    });
    expect(result.map(segment => [segment.start, segment.end])).toEqual([
      [0, 2],
      [2, 5],
    ]);
  });

  it.each([0, -0, '0'])('keeps zero-total centered groups finite (%s)', amount => {
    const spec = centerSpec({ data: { values: [{ category: 'A', series: 'a', amount }] } });
    const mark = getVegaRangedGeometry(spec, 200, 100).marks[0];
    expect(mark.height).toBe(0);
    expect(mark.d).not.toMatch(/NaN|Infinity/);
  });

  it('drops invalid/accessor/coercion values without contaminating valid stacks', () => {
    const invoke = jest.fn(() => 2);
    const bad = Object.defineProperty({ category: 'A', series: 'a' }, 'amount', { get: invoke, enumerable: true });
    const spec = centerSpec({
      data: {
        values: [
          bad,
          { category: 'A', series: 'a', amount: { [Symbol.toPrimitive]: invoke } },
          { category: 'A', series: 'b', amount: null },
          { category: 'A', series: 'b', amount: '4' },
          { category: 'B', series: 'b', amount: Infinity },
        ],
      },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toHaveLength(1);
    expect(invoke).not.toHaveBeenCalled();
  });

  it('refuses nonlinear, quantitative-color, ranged-endpoint and offset center combinations', () => {
    const spec = centerSpec();
    for (const override of [
      { y: { ...spec.encoding!.y, scale: { type: 'log' as const } } },
      { color: { field: 'series', type: 'quantitative' as const } },
      { y2: { field: 'base' } },
      { xOffset: { field: 'series', type: 'nominal' as const } },
    ]) {
      const unsupported = { ...spec, encoding: { ...spec.encoding, ...override } };
      expect(canRenderVegaRangedSpec(unsupported)).toBe(false);
      expect(getVegaRangedGeometry(unsupported, 200, 100).marks).toEqual([]);
    }
  });

  it('renders signed raw-value callouts, category colors and keyboard-reachable segments', async () => {
    const { container, restoreVisibility } = renderNavigable(
      <VegaLiteRangedChart spec={centerSpec()} width={272} height={192} selectedLegends={['b']} />,
    );
    const marks = container.querySelectorAll<SVGPathElement>('path[data-ranged-mark]');
    expect(marks).toHaveLength(4);
    expect(marks[0]).toHaveAttribute('d', 'M0,0L100,0L100,40L0,40Z');
    expect(marks[0]).toHaveAttribute('fill', 'currentColor');
    expect(marks[2]).toHaveAttribute('data-selected', 'false');
    try {
      act(() => marks[2].focus());
      expect(screen.getByRole('tooltip').textContent).toContain('amount: −1');
      await act(async () => userEvent.keyboard('{ArrowRight}'));
      expect(marks[3]).toHaveFocus();
      expect((popover.mock.calls[popover.mock.calls.length - 1][0].positioning as { target: unknown }).target).toBe(
        marks[3],
      );
    } finally {
      restoreVisibility();
    }
  });
});

const layerRangeSpec = (): VegaLiteSpec =>
  rangedSpec({
    data: {
      values: [
        { category: 'A', lower: -4, upper: 2, otherLow: 6, otherHigh: 10 },
        { category: 'B', lower: 0, upper: 4, otherLow: -10, otherHigh: -6 },
      ],
    },
    encoding: { x: { field: 'category', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } } },
    layer: [
      {
        mark: { type: 'bar', color: 'currentColor' },
        encoding: {
          y: { field: 'lower', type: 'quantitative' },
          y2: { field: 'upper' },
          tooltip: [{ field: 'lower', title: 'First', type: 'quantitative' }],
        },
      },
      {
        mark: { type: 'bar', color: 'inherit', opacity: 0.6 },
        encoding: {
          y: { field: 'otherHigh', type: 'quantitative' },
          y2: { field: 'otherLow' },
          tooltip: [{ field: 'otherHigh', title: 'Second', type: 'quantitative' }],
        },
      },
    ],
  });

describe('compatible flat ranged layer geometry', () => {
  it('unions both endpoints across differently named fields with inherited categories', () => {
    const geometry = getVegaRangedGeometry(layerRangeSpec(), 200, 100);
    expect(geometry.marks.map(mark => [mark.x, mark.y, mark.width, mark.height])).toEqual([
      [0, 40, 100, 30],
      [100, 30, 100, 20],
      [0, 0, 100, 20],
      [100, 80, 100, 20],
    ]);
    expect(geometry.marks.map(mark => mark.key)).toEqual(['layer-0-0', 'layer-0-1', 'layer-1-0', 'layer-1-1']);
    expect(geometry.axes.y.ticks.map(tick => tick.label)).toEqual(['-10', '-5', '0', '5', '10']);
  });

  it('honors layer-local data and unions categorical domains without duplicate bands', () => {
    const spec = layerRangeSpec();
    spec.layer![1] = { ...spec.layer![1], data: { values: [{ category: 'C', otherHigh: 10, otherLow: 6 }] } };
    const geometry = getVegaRangedGeometry(spec, 300, 100);
    expect(geometry.axes.x.ticks.map(tick => [tick.label, tick.position])).toEqual([
      ['A', 50],
      ['B', 150],
      ['C', 250],
    ]);
    expect(geometry.marks[2]).toMatchObject({ x: 200, width: 100 });
  });

  it('overlays plain nonstacked bars, rects and ticks on the shared ranged scale', () => {
    const spec = layerRangeSpec();
    spec.layer!.push(
      { mark: 'bar', encoding: { y: { field: 'upper', type: 'quantitative' } } },
      { mark: 'tick', encoding: { y: { field: 'upper', type: 'quantitative' } } },
      { mark: 'rect', encoding: { y: { field: 'lower', type: 'quantitative' }, y2: { field: 'upper' } } },
    );
    const geometry = getVegaRangedGeometry(spec, 200, 100);
    expect(geometry.marks).toHaveLength(10);
    expect(geometry.marks[4]).toMatchObject({ y: 40, height: 10 });
    expect(geometry.marks[6]).toMatchObject({ y: 39.5, height: 1 });
    expect(geometry.marks[8]).toMatchObject({ y: 40, height: 30 });
  });

  it.each(['x', 'y'] as const)('refuses independent %s scales instead of pretending to share axes', axis => {
    const spec = { ...layerRangeSpec(), resolve: { scale: { [axis]: 'independent' as const } } };
    expect(canRenderVegaRangedSpec(spec)).toBe(false);
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toEqual([]);
  });

  it('refuses mixed marks, nonlinear/contradictory scales and nested composition', () => {
    for (const spec of [
      { ...layerRangeSpec(), layer: [...layerRangeSpec().layer!, { mark: 'line' as const }] },
      {
        ...layerRangeSpec(),
        layer: [
          ...layerRangeSpec().layer!,
          {
            mark: 'bar' as const,
            encoding: { y: { field: 'upper', type: 'quantitative' as const, scale: { reverse: true } } },
          },
        ],
      },
      {
        ...layerRangeSpec(),
        layer: [
          ...layerRangeSpec().layer!,
          {
            mark: 'bar' as const,
            encoding: { y: { field: 'upper', type: 'quantitative' as const, scale: { type: 'log' as const } } },
          },
        ],
      },
      { layer: [layerRangeSpec()] } as unknown as VegaLiteSpec,
    ]) {
      expect(canRenderVegaRangedSpec(spec)).toBe(false);
    }
    expect(
      canRenderVegaRangedSpec({
        layer: [
          {
            mark: 'bar',
            encoding: { x: { field: 'category', type: 'nominal' }, y: { field: 'upper', type: 'quantitative' } },
          },
        ],
      }),
    ).toBe(false);
  });

  it('does not claim layered normalize/zero stacks or continuous color scales', () => {
    const spec = layerRangeSpec();
    for (const stack of ['zero', 'normalize'] as const) {
      const layers = [...spec.layer!];
      layers[0] = { ...layers[0], encoding: { ...layers[0].encoding, y: { ...layers[0].encoding!.y, stack } } };
      expect(canRenderVegaRangedSpec({ ...spec, layer: layers })).toBe(false);
    }
    expect(
      canRenderVegaRangedSpec({
        ...spec,
        encoding: { ...spec.encoding, color: { field: 'upper', type: 'quantitative' } },
      }),
    ).toBe(false);
  });

  it('unions stack extents with ranged-layer endpoints', () => {
    const center = centerSpec();
    const spec: VegaLiteSpec = {
      layer: [
        { ...center, mark: center.mark! },
        {
          mark: 'bar',
          data: { values: [{ category: 'A', low: -2, high: 10 }] },
          encoding: { x: center.encoding!.x, y: { field: 'high', type: 'quantitative' }, y2: { field: 'low' } },
        },
      ],
    };
    expect(getVegaRangedGeometry(spec, 200, 120).marks[0]).toMatchObject({ y: 40, height: 20 });
    expect(getVegaRangedGeometry(spec, 200, 120).marks[4]).toMatchObject({ y: 0, height: 120 });
  });

  it('is immutable for recursively frozen inherited layer specs', () => {
    const spec = layerRangeSpec();
    const freeze = (value: unknown): void => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
      }
    };
    freeze(spec);
    const before = JSON.stringify(spec);
    expect(getVegaRangedGeometry(spec, 200, 100).marks).toHaveLength(4);
    render(<VegaLiteRangedChart spec={spec} />);
    expect(JSON.stringify(spec)).toBe(before);
  });

  it('shares nominal color legends and colors, including empty-layer domain categories', () => {
    const spec = layerRangeSpec();
    spec.encoding!.color = { field: 'category', type: 'nominal', scale: { range: ['currentColor', 'inherit'] } };
    const { container, rerender } = render(<VegaLiteRangedChart spec={spec} selectedLegends={['A']} />);
    let marks = container.querySelectorAll('path[data-ranged-mark]');
    expect(screen.getAllByRole('option').map(option => option.getAttribute('aria-label'))).toEqual(['A', 'B']);
    // Remove authored constant mark colors so shared category colors take effect.
    const colored = { ...spec, layer: spec.layer!.map(layer => ({ ...layer, mark: { type: 'bar' as const } })) };
    rerender(<VegaLiteRangedChart spec={colored} selectedLegends={['A']} />);
    marks = container.querySelectorAll('path[data-ranged-mark]');
    expect(marks[0]).toHaveAttribute('fill', 'currentColor');
    expect(marks[2]).toHaveAttribute('fill', 'currentColor');
    expect(marks[1]).toHaveAttribute('fill', 'inherit');
    expect(marks[3]).toHaveAttribute('data-selected', 'false');
    const empty = {
      ...colored,
      layer: [
        ...colored.layer!,
        {
          mark: 'tick' as const,
          data: { values: [] },
          encoding: {
            y: { field: 'upper', type: 'quantitative' as const },
            color: {
              ...spec.encoding!.color,
              scale: { range: ['currentColor', 'inherit'], domain: ['absent', 'A', 'B'] },
            },
          },
        },
      ],
    };
    rerender(<VegaLiteRangedChart spec={empty} />);
    // Native Legends can collapse all items into its overflow menu in jsdom's zero-width layout.
    expect(screen.getAllByRole('option', { hidden: true }).map(option => option.getAttribute('aria-label'))).toEqual([
      'absent',
      'A',
      'B',
    ]);
  });

  it('supports shared temporal range axes without converting them into numeric ticks', () => {
    const spec: VegaLiteSpec = {
      data: { values: [{ start: '2024-01-01', end: '2024-01-02', later: '2024-01-03', category: 'A' }] },
      encoding: { y: { field: 'category', type: 'nominal' } },
      layer: [
        {
          mark: 'bar',
          encoding: { x: { field: 'start', type: 'temporal', scale: { type: 'utc' } }, x2: { field: 'end' } },
        },
        {
          mark: 'rect',
          encoding: { x: { field: 'end', type: 'temporal', scale: { type: 'utc' } }, x2: { field: 'later' } },
        },
      ],
    };
    const geometry = getVegaRangedGeometry(spec, 200, 100);
    expect(geometry.marks.map(mark => [mark.x, mark.width])).toEqual([
      [0, 100],
      [100, 100],
    ]);
    expect(geometry.axes.x.ticks[0].label).toBe('2024-01-01');
  });

  it('uses layer-local tooltip declarations, colors, opacity, anchors and unique IDs', async () => {
    const spec = layerRangeSpec();
    const { container, restoreVisibility } = renderNavigable(
      <>
        <VegaLiteRangedChart spec={spec} />
        <VegaLiteRangedChart spec={spec} />
      </>,
    );
    const marks = container.querySelectorAll<SVGPathElement>('path[data-ranged-mark]');
    expect(marks[0]).toHaveAttribute('fill', 'currentColor');
    expect(marks[2]).toHaveAttribute('fill', 'inherit');
    expect(marks[2]).toHaveAttribute('opacity', '0.6');
    try {
      act(() => marks[6].focus());
      expect(screen.getByRole('tooltip').textContent).toBe('Second: 10');
      expect((popover.mock.calls[popover.mock.calls.length - 1][0].positioning as { target: unknown }).target).toBe(
        marks[6],
      );
      await act(async () => userEvent.keyboard('{ArrowRight}'));
      expect(marks[7]).toHaveFocus();
      const ids = Array.from(container.querySelectorAll('[id]'), element => element.id);
      expect(new Set(ids).size).toBe(ids.length);
    } finally {
      restoreVisibility();
    }
  });

  it('passes the effective unit spec to tooltip/ARIA callbacks, keeping the raw row', () => {
    const spec = layerRangeSpec();
    const renderTooltip = jest.fn((row, unit) => `${String(unit.encoding.y.field)}=${String(row.otherHigh)}`);
    const getAriaLabel = jest.fn((row, unit) => `${String(unit.encoding.y.field)} ${String(row.otherHigh)}`);
    const { container } = render(
      <VegaLiteRangedChart spec={spec} renderTooltip={renderTooltip} getAriaLabel={getAriaLabel} />,
    );
    const mark = container.querySelectorAll('path[data-ranged-mark]')[2];
    expect(mark).toHaveAttribute('aria-label', 'otherHigh 10');
    fireEvent.focus(mark);
    expect(screen.getByRole('tooltip').textContent).toBe('otherHigh=10');
    expect(renderTooltip.mock.calls[0][0]).toBe(spec.data!.values![0]);
    expect(renderTooltip.mock.calls[0][1].encoding.y.field).toBe('otherHigh');
  });

  it('honors a disabled tooltip on one layer without disabling its sibling', () => {
    const spec = layerRangeSpec();
    spec.layer![1].encoding!.tooltip = null;
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    const marks = container.querySelectorAll('path[data-ranged-mark]');
    fireEvent.focus(marks[2]);
    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.focus(marks[0]);
    expect(screen.getByRole('tooltip').textContent).toBe('First: −4');
  });
});

describe('axis-null and immutable-row renderer regressions', () => {
  it.each<{ axes: ('x' | 'y')[] }>([{ axes: ['x'] }, { axes: ['y'] }, { axes: ['x', 'y'] }])(
    'omits entire null axis groups without changing plot geometry: $axes',
    ({ axes }) => {
      const spec = rangedSpec({ ...rectangleRangeSpec, encoding: { ...rectangleRangeSpec.encoding } });
      for (const axis of axes) {
        spec.encoding![axis] = { ...spec.encoding![axis], axis: null };
      }
      const expected = getVegaRangedGeometry(rectangleRangeSpec, 200, 100);
      const actual = getVegaRangedGeometry(spec, 200, 100);
      expect(actual.marks).toEqual(expected.marks);
      for (const axis of axes) {
        expect(actual.axes[axis]).toEqual({ title: undefined, ticks: [] });
      }
      const { container } = render(<VegaLiteRangedChart spec={spec} width={272} height={172} />);
      const svg = container.querySelector('svg')!;
      for (const axis of ['x', 'y'] as const) {
        expect(svg.querySelector(`[id$="-${axis}"]`) !== null).toBe(!axes.includes(axis));
      }
      expect(svg).toHaveAttribute('viewBox', '-56 -24 272 172');
      expect(svg.querySelector('clipPath rect')).toHaveAttribute('width', '200');
      expect(svg.querySelector('path[data-ranged-mark]')).toHaveAttribute('d', expected.marks[0].d);
    },
  );

  it.each(['x', 'y'] as const)('uses a visible sibling %s axis declaration, even after a null first layer', axis => {
    const spec = layerRangeSpec();
    spec.layer = spec.layer!.map((layer, index) => ({
      ...layer,
      encoding: {
        ...layer.encoding,
        [axis]: {
          ...spec.encoding?.[axis],
          ...layer.encoding?.[axis],
          axis: index === 0 ? null : { title: `Visible ${axis}`, values: axis === 'x' ? ['A'] : [0] },
        },
      },
    }));
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    const expected = getVegaRangedGeometry(spec, 200, 100).marks.map(item => item.d);
    const { container, rerender } = render(<VegaLiteRangedChart spec={spec} width={272} height={172} />);
    const svg = container.querySelector('svg')!;
    expect(svg.querySelector(`[id$="-${axis}"]`)!.textContent).toBe(`${axis === 'x' ? 'A' : '0'}Visible ${axis}`);
    expect(Array.from(svg.querySelectorAll('path[data-ranged-mark]'), item => item.getAttribute('d'))).toEqual(
      expected,
    );
    const reversed = { ...spec, layer: [...spec.layer!].reverse() };
    rerender(<VegaLiteRangedChart spec={reversed} width={272} height={172} />);
    expect(svg.querySelector(`[id$="-${axis}"]`)!.textContent).toBe(`${axis === 'x' ? 'A' : '0'}Visible ${axis}`);
    const hidden = {
      ...spec,
      layer: spec.layer!.map(layer => ({
        ...layer,
        encoding: { ...layer.encoding, [axis]: { ...layer.encoding![axis], axis: null } },
      })),
    };
    rerender(<VegaLiteRangedChart spec={hidden} width={272} height={172} />);
    expect(svg.querySelector(`[id$="-${axis}"]`)).toBeNull();
    expect(Array.from(svg.querySelectorAll('path[data-ranged-mark]'), item => item.getAttribute('d'))).toEqual(
      expected,
    );
  });

  it('prefers an authored shared axis declaration over an earlier implicit field title', () => {
    const spec = layerRangeSpec();
    spec.layer![1].encoding!.y!.axis = { title: 'Shared measure', format: '.1f', values: [0] };
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    expect(container.querySelector('[id$="-y"]')!.textContent).toBe('0.0Shared measure');
  });

  it('honors an explicit null title on a visible shared axis without a field-name fallback', () => {
    const spec = layerRangeSpec();
    spec.layer![0].encoding!.y!.axis = null;
    spec.layer![1].encoding!.y!.axis = { title: null, values: [0] };
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    expect(container.querySelector('[id$="-y"]')!.textContent).toBe('0');
    expect(container.querySelector('[id$="-y"] path')).not.toBeNull();
  });

  it.each([Object.seal, Object.preventExtensions])('preserves nonextensible source rows %#', constrain => {
    const row = constrain({ category: 'A', series: 'a', stats: { amount: 4 }, 'series.name': 'a' });
    const before = Object.getOwnPropertyDescriptors(row);
    const spec = centerSpec({ data: { values: [row] } });
    spec.encoding!.y!.field = 'stats.amount';
    spec.encoding!.color!.field = 'series\\.name';
    const result = getVegaRangedGeometry(spec, 200, 100);
    expect(result.marks[0].row).toBe(row);
    expect(result.marks[0].height).toBe(100);
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    fireEvent.focus(container.querySelector('path[data-ranged-mark]')!);
    expect(screen.getByRole('tooltip').textContent).toContain('stats.amount: 4');
    expect(Object.getOwnPropertyDescriptors(row)).toEqual(before);
    const prepared = prepareVegaLiteSpec(spec, { mode: 'strict' });
    expect(prepared.data!.values![0]).not.toBe(row);
    expect(readVegaField(prepared.data!.values![0], 'stats.amount')).toBe(4);
    expect(getVegaRangedGeometry(prepared, 200, 100).marks[0].row).toBe(prepared.data!.values![0]);
    expect(Object.getOwnPropertyDescriptors(row)).toEqual(before);
  });

  it('keeps typed stack groups but intentionally coalesces categorical pixel labels and colors', () => {
    const spec = centerSpec({
      data: {
        values: [
          { category: 1, series: 1, amount: 4 },
          { category: '1', series: '1', amount: 2 },
        ],
      },
    });
    const scale = { type: 'band' as const, paddingInner: 0, paddingOuter: 0 };
    spec.encoding!.x!.scale = scale;
    spec.encoding!.color!.scale = { domain: [1, '1'], range: ['currentColor', 'inherit'] };
    const result = getVegaRangedGeometry(spec, 200, 100);
    expect(result.axes.x.ticks).toEqual([{ label: '1', position: 100 }]);
    expect(result.marks.map(item => [item.x, item.y, item.width, item.height])).toEqual([
      [0, 0, 200, 100],
      [0, 25, 200, 50],
    ]);
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    const marks = container.querySelectorAll('path[data-ranged-mark]');
    expect(marks[0].getAttribute('fill')).toBe(marks[1].getAttribute('fill'));
    expect(screen.getAllByRole('option', { hidden: true }).map(item => item.getAttribute('aria-label'))).toEqual(['1']);
  });

  it('renders no invalid records or NaN coordinates for all-invalid runtime rows', () => {
    const spec = centerSpec({
      data: {
        values: [false, null, 0, [], { category: 'A', series: 'a', amount: false }] as unknown as Record<
          string,
          unknown
        >[],
      },
    });
    const { container } = render(<VegaLiteRangedChart spec={spec} />);
    expect(container.querySelectorAll('path[data-ranged-mark]')).toHaveLength(0);
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
  });

  it('treats a trusted callback returning false as empty content, without mounting a popover', () => {
    const renderTooltip = jest.fn(() => false);
    const { container } = render(<VegaLiteRangedChart spec={horizontalRangeSpec} renderTooltip={renderTooltip} />);
    const mark = container.querySelector('path[data-ranged-mark]')!;
    fireEvent.focus(mark);
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(popover).not.toHaveBeenCalled();
    expect(mark).not.toHaveAttribute('aria-describedby');
  });

  it('preserves token-based axis/focus styles and forced-color marks', () => {
    const { container } = render(<VegaLiteRangedChart spec={rectangleRangeSpec} />);
    const css = Array.from(container.ownerDocument.querySelectorAll('style'))
      .flatMap(element => Array.from(element.sheet?.cssRules ?? [], rule => rule.cssText))
      .join('\n');
    expect(css).toContain('var(--colorNeutralStroke1)');
    expect(css).toContain('var(--colorStrokeFocus2)');
    expect(css).toContain('forced-colors: active');
    expect(css).toContain('CanvasText');
  });
});
