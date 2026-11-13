import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { useLineChartSceneInteraction } from './useLineChartSceneInteraction';
import type {
  LineChartInteractionChange,
  LineChartPlotContext,
  LineChartProps,
  LineChartResolvedPoint,
  LineChartResolvedSeries,
  LineChartXValue,
} from './LineChart.types';

function series(
  key: string,
  values: readonly [LineChartXValue, number][],
  projectX: (x: LineChartXValue) => number,
  keys?: string[],
): LineChartResolvedSeries {
  const points: LineChartResolvedPoint[] = values.map(([x, y], index) => ({
    key: keys?.[index] ?? `p${index}`,
    dataIndex: index,
    data: { x, y },
    position: { x: projectX(x), y },
  }));
  const pieces = points.slice(1).map((point, index) => ({
    kind: 'line' as const,
    start: points[index].position,
    end: point.position,
  }));
  return {
    key,
    scaleKey: 'y',
    data: { legend: key, data: values.map(([x, y]) => ({ x, y })) },
    phase: 'present',
    transition: { startMs: 0, durationMs: 0, progress: 1, revealProgress: 1, entranceEndMs: 0, exitDelayMs: 0 },
    capturedLayoutEpoch: 3,
    stroke: { color: 'red', width: 2, lineCap: 'round', lineJoin: 'round', opacity: 1 },
    path: '',
    points,
    segments: points.length
      ? [
          {
            key: 'run',
            path: '',
            pointKeys: points.map(point => point.key),
            screenXBounds: [
              Math.min(...points.map(point => point.position.x)),
              Math.max(...points.map(point => point.position.x)),
            ],
            curve: { status: 'supported', xDirection: 'increasing', pieces },
          },
        ]
      : [],
  };
}

function scene(
  values: readonly [LineChartXValue, number][] = [
    [0, 20],
    [10, 20],
  ],
  options: { rtl?: boolean; keys?: string[]; frame?: number; categories?: string[]; dates?: boolean } = {},
): LineChartPlotContext {
  const { rtl = false, keys, frame = 7, categories, dates } = options;
  const projectX = (value: LineChartXValue) => {
    const scalar = categories ? categories.indexOf(String(value)) * 10 : Number(value);
    return rtl ? 100 - scalar * 10 : scalar * 10;
  };
  return {
    frameId: frame,
    geometryVersion: frame + 10,
    layoutEpoch: 3,
    frameTimeMs: 0,
    reducedMotion: true,
    svgRect: { x: 0, y: 0, width: 100, height: 100 },
    plotRect: { x: 0, y: 0, width: 100, height: 100 },
    markerClipRect: { x: 0, y: 0, width: 100, height: 100 },
    isRtl: rtl,
    plotClipPathId: 'plot',
    markerClipPathId: 'markers',
    xScale: categories
      ? { kind: 'category', domain: categories, range: rtl ? [100, 0] : [0, 100] }
      : dates
      ? { kind: 'date', domain: [new Date(0), new Date(10)], range: rtl ? [100, 0] : [0, 100] }
      : { kind: 'number', scaleType: 'linear', domain: [0, 10], range: rtl ? [100, 0] : [0, 100] },
    yScales: [],
    axes: [],
    xAxisLabelRows: [],
    series: [series('a', values, projectX, keys)],
    interaction: {},
    inspection: {},
    projectX,
    projectY: (_key, value) => value,
  };
}

type HarnessProps = {
  plot: LineChartPlotContext;
  options?: LineChartProps['interactionOptions'];
  state?: LineChartProps['interactionState'];
  onChange?: (change: LineChartInteractionChange) => void;
  customCallout?: boolean;
  disabledPoints?: string[];
  hiddenPoints?: string[];
};

function Harness({ plot, options, state, onChange, customCallout, disabledPoints, hiddenPoints }: HarnessProps) {
  const ref = React.useRef<SVGSVGElement>(null);
  const interaction = useLineChartSceneInteraction(
    {
      data: { lineChartData: plot.series.map(item => item.data) },
      interactionOptions: options,
      interactionState: state,
      onInteractionChange: onChange,
    },
    plot,
    ref,
  );
  return (
    <>
      <div
        data-line-chart-root
        data-testid="chart-root"
        onBlur={interaction.onChartBlur}
        onPointerLeave={interaction.onChartPointerLeave}
      >
        <svg
          ref={ref}
          aria-label="chart"
          tabIndex={0}
          onPointerMove={interaction.onPointerMove}
          onPointerLeave={interaction.onPointerLeave}
          onKeyDown={interaction.onKeyDown}
        >
          {plot.series
            .filter(item => item.phase !== 'exit')
            .flatMap(item =>
              item.points.map(point => (
                <g
                  key={`${item.key}:${point.key}`}
                  tabIndex={disabledPoints?.includes(`${item.key}:${point.key}`) ? -1 : 0}
                  aria-hidden={hiddenPoints?.includes(`${item.key}:${point.key}`) || undefined}
                  role="button"
                  aria-label={`${item.key}:${point.key}`}
                  data-line-chart-series-key={item.key}
                  data-line-chart-point-key={point.key}
                  onFocus={event => interaction.onPointFocus({ seriesKey: item.key, pointKey: point.key }, event)}
                  onBlur={interaction.onPointBlur}
                />
              )),
            )}
        </svg>
        <output data-testid="state">{JSON.stringify(interaction.state)}</output>
        <output data-testid="inspection">{JSON.stringify(interaction.inspection)}</output>
        {customCallout && interaction.state.activePoint && (
          <div data-line-chart-callout role="dialog" aria-label="point callout">
            <button>callout action</button>
            <button>callout secondary</button>
          </div>
        )}
        <button onMouseEnter={interaction.clearInspection}>legend</button>
        <button>annotation</button>
      </div>
      <button>outside</button>
    </>
  );
}

function pointer(svg: SVGSVGElement, x: number, y: number) {
  // MouseEvent supplies client coordinates on jsdom versions without PointerEvent.
  fireEvent(svg, new MouseEvent('pointermove', { bubbles: true, clientX: x, clientY: y }));
}

function lastChange(callback: jest.Mock): LineChartInteractionChange {
  return callback.mock.calls[callback.mock.calls.length - 1][0];
}

describe('useLineChartSceneInteraction', () => {
  let offset = 0;
  let scale = 2;
  let matrixDescriptor: PropertyDescriptor | undefined;
  beforeEach(() => {
    offset = 0;
    scale = 2;
    matrixDescriptor = Object.getOwnPropertyDescriptor(SVGSVGElement.prototype, 'getScreenCTM');
    Object.defineProperty(SVGSVGElement.prototype, 'getScreenCTM', {
      configurable: true,
      value: () => ({
        a: scale,
        b: 0,
        c: 0,
        d: scale,
        e: offset,
        f: 10,
        inverse: () => ({ a: 1 / scale, b: 0, c: 0, d: 1 / scale, e: -offset / scale, f: -10 / scale }),
      }),
    });
  });
  afterEach(() => {
    if (matrixDescriptor) {
      Object.defineProperty(SVGSVGElement.prototype, 'getScreenCTM', matrixDescriptor);
    } else {
      Reflect.deleteProperty(SVGSVGElement.prototype, 'getScreenCTM');
    }
  });

  it.each([false, true])('chooses the earlier continuous slot on an exact tie (RTL=%s)', rtl => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene(undefined, { rtl })} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 100, 50);
    expect(lastChange(onChange).state.activeX).toBe(0);
    expect(lastChange(onChange).state.activePoint).toEqual({ seriesKey: 'a', pointKey: 'p0' });
    expect(lastChange(onChange).inspection.pointer).toEqual({ x: 50, y: 20 });
    expect(lastChange(onChange).inspection.clientPointer).toEqual({ x: 100, y: 50 });
    expect(lastChange(onChange).inspection.anchor?.svg.x).toBe(rtl ? 100 : 0);
    expect(lastChange(onChange)).toMatchObject({ frameId: 7, geometryVersion: 17, layoutEpoch: 3 });
  });

  it('matches Date slots by epoch, preserving unavailable slots without synthetic points', () => {
    const onChange = jest.fn();
    const plot = scene(
      [
        [new Date(0), 20],
        [new Date(10), 20],
      ],
      { dates: true },
    );
    const view = render(
      <Harness plot={plot} options={{ xValues: [new Date(0), new Date(5), new Date(10)] }} onChange={onChange} />,
    );
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 100, 52);
    const change = lastChange(onChange);
    expect(change.state.activeX).toEqual(new Date(5));
    expect(change.state.activePoint).toBeUndefined();
    expect(change.inspection.hit?.pointKey).toBeUndefined();
    expect(change.inspection.anchor?.svg).toEqual({ x: 50, y: 20 });
    expect(change.inspection.pointer).toEqual({ x: 50, y: 21 });
  });

  it('uses the resolved categorical order and does not sort labels lexically', () => {
    const onChange = jest.fn();
    const view = render(
      <Harness
        plot={scene(
          [
            ['z', 20],
            ['a', 20],
          ],
          { categories: ['z', 'a'] },
        )}
        onChange={onChange}
      />,
    );
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 100, 50);
    expect(lastChange(onChange).state.activeX).toBe('z');
  });

  it('keeps controlled clear committed, reports proposals, and does not echo acceptance', () => {
    const onChange = jest.fn();
    const plot = scene();
    const view = render(<Harness plot={plot} state={{}} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 200, 50);
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual({});
    const proposed = lastChange(onChange).state;
    expect(proposed.activePoint).toEqual({ seriesKey: 'a', pointKey: 'p1' });
    const count = onChange.mock.calls.length;
    view.rerender(<Harness plot={plot} state={proposed} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(count);
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual(proposed);
    expect(document.activeElement).not.toBe(view.getByRole('button', { name: 'a:p1' }));
  });

  it('anchors actual focus immediately even when controlled logical selection is rejected', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} state={{}} onChange={onChange} />);
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    const change = lastChange(onChange);
    expect(change.reason).toBe('focus');
    expect(change.inspection.focusedPoint).toEqual({ seriesKey: 'a', pointKey: 'p1' });
    expect(change.inspection.anchor).toEqual({ svg: { x: 100, y: 20 }, client: { x: 200, y: 50 } });
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual({});
    expect(JSON.parse(view.getByTestId('inspection').textContent!).focusedPoint).toEqual(
      change.inspection.focusedPoint,
    );
  });

  it('normalizes stale controlled references once after commit, but accepts point-only state silently', () => {
    const onChange = jest.fn();
    const plot = scene();
    const view = render(
      <Harness plot={plot} state={{ activePoint: { seriesKey: 'a', pointKey: 'p0' } }} onChange={onChange} />,
    );
    expect(onChange).not.toHaveBeenCalled();
    const stale = {
      activeX: 5,
      activePoint: { seriesKey: 'missing', pointKey: 'gone' },
      emphasizedSeriesKeys: ['a', 'a', 'gone'],
    };
    view.rerender(<Harness plot={plot} state={stale} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({ reason: 'data-change', state: { emphasizedSeriesKeys: ['a'] } });
    view.rerender(<Harness plot={plot} state={{ ...stale }} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('reconciles removed physical focus to the earlier same-series observation exactly once', () => {
    const onChange = jest.fn();
    const initial = scene(
      [
        [0, 20],
        [5, 20],
        [10, 20],
      ],
      { keys: ['left', 'middle', 'right'] },
    );
    const view = render(<Harness plot={initial} state={{}} onChange={onChange} />);
    act(() => view.getByRole('button', { name: 'a:middle' }).focus());
    onChange.mockClear();
    const next = scene(
      [
        [0, 20],
        [10, 20],
      ],
      { keys: ['left', 'right'], frame: 8 },
    );
    view.rerender(<Harness plot={next} state={{}} onChange={onChange} />);
    expect(document.activeElement).toBe(view.getByRole('button', { name: 'a:left' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'focus-reconcile',
      frameId: 8,
      inspection: { focusedPoint: { seriesKey: 'a', pointKey: 'left' } },
    });
    const empty = { ...next, frameId: 9, geometryVersion: 19, series: [] };
    onChange.mockClear();
    view.rerender(<Harness plot={empty} state={{}} onChange={onChange} />);
    expect(document.activeElement).toBe(view.getByLabelText('chart'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange).inspection.focusedPoint).toBeUndefined();
  });

  it('refreshes only the client anchor on scroll and removes subscriptions on unmount', () => {
    const onChange = jest.fn();
    const plot = scene();
    const state = { activePoint: { seriesKey: 'a', pointKey: 'p1' } };
    const view = render(<Harness plot={plot} state={state} onChange={onChange} />);
    expect(onChange).not.toHaveBeenCalled();
    offset = 30;
    fireEvent.scroll(document);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'layout',
      frameId: 7,
      geometryVersion: 17,
      inspection: { anchor: { svg: { x: 100, y: 20 }, client: { x: 230, y: 50 } } },
    });
    const count = onChange.mock.calls.length;
    view.unmount();
    fireEvent.scroll(document);
    fireEvent.resize(window);
    expect(onChange).toHaveBeenCalledTimes(count);
  });

  it('clears pointer on leave, retains eligible pointer inspection on point blur within SVG, and clears on Escape', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} onChange={onChange} />);
    const svg = view.getByLabelText('chart') as unknown as SVGSVGElement;
    pointer(svg, 0, 50);
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    act(() => svg.focus());
    expect(lastChange(onChange)).toMatchObject({ reason: 'blur', state: { activeX: 0 } });
    expect(lastChange(onChange).inspection.focusedPoint).toBeUndefined();
    fireEvent.pointerLeave(svg);
    expect(lastChange(onChange).state).toEqual({});
    expect(lastChange(onChange).inspection.pointer).toBeUndefined();
    pointer(svg, 200, 50);
    fireEvent.keyDown(svg, { key: 'Escape' });
    expect(lastChange(onChange)).toMatchObject({ reason: 'escape', state: {} });
    expect(lastChange(onChange).inspection.anchor).toBeUndefined();
  });

  it('supports a point-independent exact nearest-series hit even outside the hit radius', () => {
    const onChange = jest.fn();
    const view = render(
      <Harness
        plot={scene()}
        options={{
          mode: 'nearest-series',
          hitRadius: 1,
          xValues: [0, 5, 10],
          showDefaultGuide: false,
          showDefaultHighlight: false,
        }}
        onChange={onChange}
      />,
    );
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 100, 90);
    const change = lastChange(onChange);
    expect(change.state).toEqual({ activeX: 5 });
    expect(change.inspection.hit).toMatchObject({
      seriesKey: 'a',
      position: { x: 50, y: 20 },
      distance: 20,
      withinRadius: false,
    });
    expect(change.inspection.hit?.pointKey).toBeUndefined();
    expect(change.inspection.pointer).toEqual({ x: 50, y: 40 });
    expect(change.inspection.anchor?.svg).toEqual({ x: 50, y: 20 });
  });

  it('does not fabricate a point or x for KPI-only emphasis', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} state={{ emphasizedSeriesKeys: ['a'] }} onChange={onChange} />);
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual({ emphasizedSeriesKeys: ['a'] });
    expect(JSON.parse(view.getByTestId('inspection').textContent!)).toEqual({});
    expect(onChange).not.toHaveBeenCalled();
  });

  it('re-hits a retained pointer after removing the inspected observation', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 200, 50);
    onChange.mockClear();
    const next = scene([[0, 20]], { keys: ['p0'], frame: 8 });
    view.rerender(<Harness plot={next} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'data-change',
      frameId: 8,
      state: { activeX: 0, activePoint: { seriesKey: 'a', pointKey: 'p0' } },
      inspection: { hit: { seriesKey: 'a', pointKey: 'p0', position: { x: 0, y: 20 } } },
    });
  });

  it('keeps surviving physical focus on reorder, then reconciles across series without focusing exits', () => {
    const onChange = jest.fn();
    const initial = scene();
    const b = series(
      'b',
      [
        [0, 30],
        [10, 30],
      ],
      value => Number(value) * 10,
    );
    const c = series(
      'c',
      [
        [0, 40],
        [10, 40],
      ],
      value => Number(value) * 10,
    );
    const view = render(<Harness plot={{ ...initial, series: [initial.series[0], b, c] }} onChange={onChange} />);
    const focused = view.getByRole('button', { name: 'a:p1' });
    act(() => focused.focus());
    onChange.mockClear();
    view.rerender(<Harness plot={{ ...initial, series: [c, initial.series[0], b] }} onChange={onChange} />);
    expect(document.activeElement).toBe(focused);
    expect(onChange).not.toHaveBeenCalled();
    view.rerender(
      <Harness
        plot={{ ...initial, frameId: 8, geometryVersion: 18, series: [{ ...initial.series[0], phase: 'exit' }, c, b] }}
        onChange={onChange}
      />,
    );
    expect(document.activeElement).toBe(view.getByRole('button', { name: 'c:p1' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'focus-reconcile',
      inspection: { focusedPoint: { seriesKey: 'c', pointKey: 'p1' } },
    });
  });

  it('uses native keyboard focus to inspect and retains real focus metadata after Escape', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} onChange={onChange} />);
    const svg = view.getByLabelText('chart');
    act(() => svg.focus());
    fireEvent.keyDown(svg, { key: 'ArrowRight' });
    const first = view.getByRole('button', { name: 'a:p0' });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    const second = view.getByRole('button', { name: 'a:p1' });
    expect(document.activeElement).toBe(second);
    fireEvent.keyDown(second, { key: 'Escape' });
    expect(lastChange(onChange).state).toEqual({});
    expect(lastChange(onChange).inspection.focusedPoint).toEqual({ seriesKey: 'a', pointKey: 'p1' });
    expect(lastChange(onChange).inspection.anchor).toBeUndefined();
    expect(document.activeElement).toBe(second);
  });

  it('clears transient inspection for document hiding and window blur while keeping controlled emphasis', () => {
    const onChange = jest.fn();
    const plot = scene();
    const view = render(<Harness plot={plot} state={{ emphasizedSeriesKeys: ['a'] }} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 200, 50);
    fireEvent.blur(window);
    expect(lastChange(onChange)).toMatchObject({ reason: 'blur', state: { emphasizedSeriesKeys: ['a'] } });
    expect(lastChange(onChange).inspection.pointer).toBeUndefined();
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 200, 50);
    const descriptor = Object.getOwnPropertyDescriptor(document, 'hidden');
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    try {
      fireEvent(document, new Event('visibilitychange'));
      expect(lastChange(onChange)).toMatchObject({ reason: 'blur', state: { emphasizedSeriesKeys: ['a'] } });
      expect(lastChange(onChange).inspection.pointer).toBeUndefined();
    } finally {
      if (descriptor) {
        Object.defineProperty(document, 'hidden', descriptor);
      } else {
        Reflect.deleteProperty(document, 'hidden');
      }
    }
  });

  it('keeps custom callout controls mounted on point-to-callout focus, then clears on chart departure', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} customCallout onChange={onChange} />);
    const svg = view.getByLabelText('chart') as unknown as SVGSVGElement;
    pointer(svg, 200, 50);
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    const logical = JSON.parse(view.getByTestId('state').textContent!);
    const action = view.getByRole('button', { name: 'callout action' });
    act(() => action.focus());
    expect(document.activeElement).toBe(action);
    expect(view.getByRole('dialog', { name: 'point callout' })).toBeTruthy();
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual(logical);
    expect(lastChange(onChange).state).toEqual(logical);
    expect(lastChange(onChange).inspection.focusedPoint).toBeUndefined();
    expect(JSON.parse(view.getByTestId('inspection').textContent!).focusedPoint).toBeUndefined();
    fireEvent(svg, new MouseEvent('pointerout', { bubbles: true, relatedTarget: action }));
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual(logical);
    const secondary = view.getByRole('button', { name: 'callout secondary' });
    onChange.mockClear();
    act(() => secondary.focus());
    expect(onChange).not.toHaveBeenCalled();
    act(() => view.getByRole('button', { name: 'outside' }).focus());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({ reason: 'blur', state: {} });
    expect(lastChange(onChange).inspection.pointer).toBeUndefined();
    expect(lastChange(onChange).inspection.focusedPoint).toBeUndefined();
    expect(view.queryByRole('dialog', { name: 'point callout' })).toBeNull();
  });

  it('clears chart focus departure once even with an eligible retained pointer', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 200, 50);
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    onChange.mockClear();
    act(() => view.getByRole('button', { name: 'outside' }).focus());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({ reason: 'blur', state: {} });
    expect(lastChange(onChange).inspection).toEqual({});
  });

  it('clears pointer inspection after SVG-to-callout-to-outside root without keyboard focus', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} customCallout onChange={onChange} />);
    const svg = view.getByLabelText('chart') as unknown as SVGSVGElement;
    pointer(svg, 200, 50);
    const action = view.getByRole('button', { name: 'callout action' });
    fireEvent(svg, new MouseEvent('pointerout', { bubbles: true, relatedTarget: action }));
    expect(view.queryByRole('dialog')).not.toBeNull();
    expect(lastChange(onChange).inspection.pointer).toBeUndefined();
    onChange.mockClear();
    fireEvent(
      action,
      new MouseEvent('pointerout', { bubbles: true, relatedTarget: view.getByRole('button', { name: 'outside' }) }),
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({ reason: 'leave', state: {} });
    expect(view.queryByRole('dialog')).toBeNull();
  });

  it.each(['legend', 'annotation'])('does not retain pointer or point-focus inspection for the %s', target => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} customCallout onChange={onChange} />);
    const svg = view.getByLabelText('chart') as unknown as SVGSVGElement;
    const control = view.getByRole('button', { name: target });
    pointer(svg, 200, 50);
    fireEvent(svg, new MouseEvent('pointerout', { bubbles: true, relatedTarget: control }));
    expect(lastChange(onChange).state).toEqual({});
    expect(view.queryByRole('dialog')).toBeNull();
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    act(() => control.focus());
    expect(lastChange(onChange).state).toEqual({});
    expect(lastChange(onChange).inspection.focusedPoint).toBeUndefined();
    expect(view.queryByRole('dialog')).toBeNull();
  });

  it('retains inspection for callout focus during root pointer leave, but not after focus moves to the legend', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} customCallout onChange={onChange} />);
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    const action = view.getByRole('button', { name: 'callout action' });
    act(() => action.focus());
    fireEvent(
      action,
      new MouseEvent('pointerout', { bubbles: true, relatedTarget: view.getByRole('button', { name: 'outside' }) }),
    );
    expect(document.activeElement).toBe(action);
    expect(view.queryByRole('dialog')).not.toBeNull();
    act(() => view.getByRole('button', { name: 'legend' }).focus());
    expect(lastChange(onChange).state).toEqual({});
    expect(view.queryByRole('dialog')).toBeNull();
  });

  it('clears logical inspection for native legend hover without inventing a loss of physical point focus', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} customCallout onChange={onChange} />);
    const point = view.getByRole('button', { name: 'a:p1' });
    act(() => point.focus());
    onChange.mockClear();
    fireEvent.mouseEnter(view.getByRole('button', { name: 'legend' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'leave',
      state: {},
      inspection: { focusedPoint: { seriesKey: 'a', pointKey: 'p1' } },
    });
    expect(document.activeElement).toBe(point);
    expect(view.queryByRole('dialog')).toBeNull();
  });

  it('reconciles a surviving but newly aria-hidden focused node to an eligible host, then to chart entry', () => {
    const onChange = jest.fn();
    const plot = scene();
    const view = render(<Harness plot={plot} onChange={onChange} />);
    act(() => view.getByRole('button', { name: 'a:p1' }).focus());
    onChange.mockClear();
    view.rerender(<Harness plot={plot} hiddenPoints={['a:p1']} onChange={onChange} />);
    expect(document.activeElement).toBe(view.getByRole('button', { name: 'a:p0' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'focus-reconcile',
      inspection: { focusedPoint: { seriesKey: 'a', pointKey: 'p0' } },
    });
    onChange.mockClear();
    view.rerender(<Harness plot={plot} disabledPoints={['a:p0', 'a:p1']} onChange={onChange} />);
    expect(document.activeElement).toBe(view.getByLabelText('chart'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange).reason).toBe('focus-reconcile');
    expect(lastChange(onChange).inspection.focusedPoint).toBeUndefined();
  });

  it('skips negative-tabindex and aria-hidden point hosts during keyboard navigation', () => {
    const plot = scene([
      [0, 20],
      [3, 20],
      [6, 20],
      [10, 20],
    ]);
    const view = render(<Harness plot={plot} disabledPoints={['a:p1']} hiddenPoints={['a:p2']} />);
    const first = view.getByRole('button', { name: 'a:p0' });
    act(() => first.focus());
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(view.getByRole('button', { name: 'a:p3' }));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(first);
  });

  it('deduplicates SVG and root leave ownership for a direct departure', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} onChange={onChange} />);
    const svg = view.getByLabelText('chart') as unknown as SVGSVGElement;
    pointer(svg, 200, 50);
    onChange.mockClear();
    fireEvent(
      svg,
      new MouseEvent('pointerout', { bubbles: true, relatedTarget: view.getByRole('button', { name: 'outside' }) }),
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({ reason: 'leave', state: {} });
  });

  it('retains eligible keyboard point inspection when the pointer leaves the complete chart', () => {
    const onChange = jest.fn();
    const view = render(<Harness plot={scene()} onChange={onChange} />);
    const point = view.getByRole('button', { name: 'a:p1' });
    act(() => point.focus());
    fireEvent(
      point,
      new MouseEvent('pointerout', { bubbles: true, relatedTarget: view.getByRole('button', { name: 'outside' }) }),
    );
    expect(document.activeElement).toBe(point);
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual({
      activeX: 10,
      activePoint: { seriesKey: 'a', pointKey: 'p1' },
    });
    expect(JSON.parse(view.getByTestId('inspection').textContent!).focusedPoint).toEqual({
      seriesKey: 'a',
      pointKey: 'p1',
    });
  });

  it.each(['nearest-x', 'nearest-series'] as const)(
    'anchors %s to visible clipped geometry while retaining the real off-plot observation reference',
    mode => {
      const onChange = jest.fn();
      const base = scene([
        [0, -10],
        [2, 30],
      ]);
      const plot: LineChartPlotContext = {
        ...base,
        plotRect: { x: 0, y: 0, width: 20, height: 10 },
        yScales: [{ key: 'y', scaleType: 'linear', domain: [0, 10], range: [0, 10] }],
      };
      const view = render(<Harness plot={plot} options={{ mode, xValues: [0, 2] }} onChange={onChange} />);
      pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 15, 20);
      const change = lastChange(onChange);
      expect(change.state).toEqual({ activeX: 0, activePoint: { seriesKey: 'a', pointKey: 'p0' } });
      expect(change.inspection.hit).toMatchObject({
        seriesKey: 'a',
        pointKey: 'p0',
        position: { x: 7.5, y: 5 },
        withinRadius: true,
      });
      expect(change.inspection.anchor?.svg).toEqual({ x: mode === 'nearest-x' ? 0 : 7.5, y: 5 });
      expect(change.inspection.anchor?.client).toEqual({ x: mode === 'nearest-x' ? 0 : 15, y: 20 });
    },
  );

  it('omits an off-plot controlled point anchor when no visible hit supplies placement', () => {
    const onChange = jest.fn();
    const view = render(
      <Harness
        plot={scene([
          [0, -10],
          [2, 130],
        ])}
        state={{ activePoint: { seriesKey: 'a', pointKey: 'p0' } }}
        onChange={onChange}
      />,
    );
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual({
      activeX: 0,
      activePoint: { seriesKey: 'a', pointKey: 'p0' },
    });
    expect(JSON.parse(view.getByTestId('inspection').textContent!).anchor).toBeUndefined();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps the nearest inspection slot tied to raw pointer x while a nearby curve hit crosses the slot midpoint', () => {
    const onChange = jest.fn();
    const projectX = (value: LineChartXValue) => 10 + 58 * Number(value);
    const base = scene();
    const plot: LineChartPlotContext = {
      ...base,
      svgRect: { x: 0, y: 0, width: 600, height: 300 },
      plotRect: { x: 10, y: 10, width: 580, height: 280 },
      xScale: { kind: 'number', scaleType: 'linear', domain: [0, 10], range: [10, 590] },
      series: [
        series(
          'a',
          [
            [0, 290],
            [10, 10],
          ],
          projectX,
        ),
      ],
      projectX,
    };
    const view = render(
      <Harness
        plot={plot}
        options={{ mode: 'nearest-series', hitRadius: 12, xValues: [0, 4, 5, 10] }}
        onChange={onChange}
      />,
    );
    const svg = view.getByLabelText('chart') as unknown as SVGSVGElement;
    const lineY = 290 - ((268 - 10) * 280) / 580;
    pointer(svg, 268 * 2, (lineY - 10) * 2 + 10);
    const above = lastChange(onChange);
    expect(above.state).toEqual({ activeX: 4 });
    expect(above.inspection.pointer?.x).toBe(268);
    expect(above.inspection.pointer?.y).toBeCloseTo(lineY - 10);
    expect(above.inspection.hit?.position.x).toBeGreaterThan(271);
    expect(above.inspection.hit?.distance).toBeGreaterThan(0);
    expect(above.inspection.hit?.distance).toBeLessThan(12);
    expect(above.inspection.hit?.withinRadius).toBe(true);
    expect(above.inspection.hit?.pointKey).toBeUndefined();
    pointer(svg, 268 * 2, (lineY + 10) * 2 + 10);
    const below = lastChange(onChange);
    expect(below.state).toEqual({ activeX: 4 });
    expect(below.inspection.pointer?.x).toBe(268);
    expect(below.inspection.hit?.position.x).toBeLessThan(268);
    expect(below.inspection.hit?.withinRadius).toBe(true);
  });

  it('refreshes SVG pointer and client anchors on resize and scroll without changing logical selection', () => {
    const onChange = jest.fn();
    const plot = scene();
    const view = render(<Harness plot={plot} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 80, 50);
    const selected = lastChange(onChange).state;
    expect(selected).toEqual({ activeX: 0, activePoint: { seriesKey: 'a', pointKey: 'p0' } });
    onChange.mockClear();
    scale = 1;
    offset = 20;
    fireEvent.resize(window);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'layout',
      state: selected,
      geometryVersion: 17,
      inspection: {
        pointer: { x: 60, y: 40 },
        clientPointer: { x: 80, y: 50 },
        hit: { position: { x: 60, y: 20 } },
        anchor: { svg: { x: 0, y: 20 }, client: { x: 20, y: 30 } },
      },
    });
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual(selected);
    expect(JSON.parse(view.getByTestId('inspection').textContent!).pointer).toEqual({ x: 60, y: 40 });
    offset = 40;
    fireEvent.scroll(document);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'layout',
      state: selected,
      geometryVersion: 17,
      inspection: {
        pointer: { x: 40, y: 40 },
        clientPointer: { x: 80, y: 50 },
        anchor: { svg: { x: 0, y: 20 }, client: { x: 40, y: 30 } },
      },
    });
  });

  it('reprojects a retained client pointer after viewBox/layout commit without reselecting slots', () => {
    const onChange = jest.fn();
    const initial = scene();
    const view = render(<Harness plot={initial} onChange={onChange} />);
    pointer(view.getByLabelText('chart') as unknown as SVGSVGElement, 120, 50);
    const selected = lastChange(onChange).state;
    expect(selected.activeX).toBe(10);
    onChange.mockClear();
    scale = 1;
    const projectX = (value: LineChartXValue) => Number(value) * 30;
    const next: LineChartPlotContext = {
      ...initial,
      frameId: 8,
      geometryVersion: 18,
      layoutEpoch: 4,
      svgRect: { x: 0, y: 0, width: 300, height: 100 },
      plotRect: { x: 0, y: 0, width: 300, height: 100 },
      xScale: { kind: 'number', scaleType: 'linear', domain: [0, 10], range: [0, 300] },
      series: [
        series(
          'a',
          [
            [0, 20],
            [10, 20],
          ],
          projectX,
        ),
      ],
      projectX,
    };
    view.rerender(<Harness plot={next} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastChange(onChange)).toMatchObject({
      reason: 'layout',
      state: selected,
      frameId: 8,
      geometryVersion: 18,
      layoutEpoch: 4,
      inspection: {
        pointer: { x: 120, y: 40 },
        clientPointer: { x: 120, y: 50 },
        hit: { position: { x: 120, y: 20 } },
        anchor: { svg: { x: 300, y: 20 }, client: { x: 300, y: 30 } },
      },
    });
    expect(JSON.parse(view.getByTestId('state').textContent!)).toEqual(selected);
    expect(JSON.parse(view.getByTestId('inspection').textContent!).pointer).toEqual({ x: 120, y: 40 });
  });
  it('publishes the committed root transform without waiting for pointer or resize events', () => {
    Object.defineProperty(SVGSVGElement.prototype, 'getScreenCTM', {
      configurable: true,
      value: function (this: SVGSVGElement) {
        const factor = Number(this.closest('[data-transform-scale]')?.getAttribute('data-transform-scale'));
        return { a: factor, b: 0, c: 0, d: factor, e: 0, f: 0 };
      },
    });
    const plot = scene();
    const state = { activePoint: { seriesKey: 'a', pointKey: 'p1' } };
    const view = render(
      <div data-transform-scale="2">
        <Harness plot={plot} state={state} />
      </div>,
    );
    expect(JSON.parse(view.getByTestId('inspection').textContent!).anchor.client).toEqual({ x: 200, y: 40 });
    view.rerender(
      <div data-transform-scale="1">
        <Harness plot={plot} state={state} />
      </div>,
    );
    expect(JSON.parse(view.getByTestId('inspection').textContent!).anchor.client).toEqual({ x: 100, y: 20 });
  });
});
