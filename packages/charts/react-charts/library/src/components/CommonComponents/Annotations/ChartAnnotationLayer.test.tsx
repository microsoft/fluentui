import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChartAnnotation } from '../../../types/ChartAnnotation';
import { createLineChartLayout } from '../../LineChart/lineChartScales';
import { ChartAnnotationLayer } from './ChartAnnotationLayer';
import type { ChartAnnotationContext, ChartAnnotationLayerProps } from './ChartAnnotationLayer.types';
import type { LineChartAnnotationRenderProps } from './ChartAnnotationLayer.types';
import type { RenderFunction } from '../../../utilities/index';

const plot = createLineChartLayout(
  {
    data: {
      lineChartData: [
        {
          legend: 'Series',
          data: [
            { x: 0, y: 0 },
            { x: 10, y: 100 },
          ],
        },
      ],
    },
    xAxis: { domain: [0, 10] },
    yScales: [
      { key: 'y', domain: [0, 100] },
      { key: 'hidden', domain: [0, 200] },
    ],
  },
  600,
  400,
  false,
  'annotation-test',
);
const context: ChartAnnotationContext = {
  plotRect: plot.plotRect,
  svgRect: { width: 600, height: 400 },
  xScale: value => plot.projectX(value) ?? NaN,
  yScalePrimary: value => plot.projectY('y', value) ?? NaN,
  yScales: plot.yScales,
  projectY: plot.projectY,
  frameId: plot.frameId,
  layoutEpoch: plot.layoutEpoch,
};
const note = (id: string, extra?: Partial<ChartAnnotation>): ChartAnnotation => ({
  id,
  text: `Note ${id}`,
  coordinates: { type: 'relative', x: 0.5, y: 0.5 },
  layout: { align: 'start', verticalAlign: 'top' },
  ...extra,
});
const action = (id: string, onInvoke = jest.fn()): ChartAnnotation =>
  note(id, {
    action: { label: `Open ${id}`, onInvoke },
  });
const layer = (annotations: ChartAnnotation[], extra?: Partial<ChartAnnotationLayerProps>) => (
  <ChartAnnotationLayer annotations={annotations} context={context} plot={plot} {...extra} />
);
const host = (element: HTMLElement) => element.closest('foreignObject')!;

let measuredWidth: number;
let measuredHeight: number;

beforeEach(() => {
  measuredWidth = 40;
  measuredHeight = 20;
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const width = this.hasAttribute('data-annotation-key') ? measuredWidth : 0;
    const height = this.hasAttribute('data-annotation-key') ? measuredHeight : 0;
    return { x: 0, y: 0, width, height, top: 0, left: 0, right: width, bottom: height, toJSON: () => ({}) };
  });
});

afterEach(() => jest.restoreAllMocks());

describe('ChartAnnotationLayer shared scene', () => {
  it('projects keyed data and mixed data-y anchors with the hidden scale rather than the legacy selector', () => {
    render(
      layer([
        note('data', { coordinates: { type: 'data', x: 5, y: 100, yScaleKey: 'hidden', yAxis: 'primary' } }),
        note('mixed', {
          coordinates: {
            type: 'mixed',
            xCoordinateType: 'pixel',
            yCoordinateType: 'data',
            x: 25,
            y: 100,
            yScaleKey: 'hidden',
          },
        }),
      ]),
    );
    const expectedY = plot.projectY('hidden', 100)!;
    expect(Number(host(screen.getByRole('note', { name: 'Note data' })).getAttribute('y'))).toBe(expectedY);
    expect(Number(host(screen.getByRole('note', { name: 'Note mixed' })).getAttribute('x'))).toBe(plot.plotRect.x + 25);
    expect(Number(host(screen.getByRole('note', { name: 'Note mixed' })).getAttribute('y'))).toBe(expectedY);
  });

  it('hides unknown, off-plot and nonfinite anchors together with connectors and actions', () => {
    const connector = { arrow: 'none' as const };
    render(
      layer([
        { ...action('unknown'), connector, coordinates: { type: 'data', x: 5, y: 10, yScaleKey: 'missing' } },
        { ...action('outside'), connector, coordinates: { type: 'data', x: 20, y: 10, yScaleKey: 'hidden' } },
        { ...action('invalid'), connector, coordinates: { type: 'data', x: 5, y: Infinity, yScaleKey: 'hidden' } },
      ]),
    );
    expect(screen.queryByRole('button')).toBeNull();
    expect(document.querySelector('foreignObject')).toBeNull();
    expect(document.querySelector('[data-chart-annotation-svg] line')).toBeNull();
  });

  it('preserves a legacy note when the supporting scene is omitted', () => {
    render(
      layer([action('legacy')], { plot: undefined, context: { ...context, frameId: undefined, projectY: undefined } }),
    );
    expect(screen.getByRole('note', { name: 'Note legacy' })).toHaveAttribute('tabindex', '0');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('uses one native button, supplied name and note description without an override role', () => {
    render(
      <>
        <span id="extra-description">Additional description</span>
        {layer([
          {
            ...action('event'),
            accessibility: { role: 'link', ariaLabel: 'Not the action name', ariaDescribedBy: 'extra-description' },
          },
        ])}
      </>,
    );
    const button = screen.getByRole('button', { name: 'Open event' });
    expect(screen.queryByRole('note')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
    const descriptions = button.getAttribute('aria-describedby')!.split(' ');
    expect(document.getElementById(descriptions[0])).toHaveTextContent('Note event');
    expect(descriptions).toContain('extra-description');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('invokes once from the native click and isolates point inspection and keyboard handlers', () => {
    const onInvoke = jest.fn();
    const parentClick = jest.fn();
    const parentKeyDown = jest.fn();
    const parentPointerMove = jest.fn();
    render(
      <div onClick={parentClick} onKeyDown={parentKeyDown} onPointerMove={parentPointerMove}>
        {layer([action('event', onInvoke)])}
      </div>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button, { detail: 1 });
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onInvoke).toHaveBeenCalledTimes(1);
    fireEvent.click(button, { detail: 0 });
    fireEvent.keyDown(button, { key: ' ' });
    fireEvent.keyUp(button, { key: ' ' });
    expect(onInvoke).toHaveBeenCalledTimes(2);
    fireEvent.click(button, { detail: 0 });
    fireEvent.pointerMove(button);
    expect(onInvoke.mock.calls).toEqual([['pointer'], ['keyboard'], ['keyboard']]);
    expect(parentClick).not.toHaveBeenCalled();
    expect(parentKeyDown).not.toHaveBeenCalled();
    expect(parentPointerMove).not.toHaveBeenCalled();
  });

  it('uses native Enter and Space activation without invoking from key handlers', () => {
    const onInvoke = jest.fn();
    render(layer([action('keyboard', onInvoke)]));
    act(() => screen.getByRole('button').focus());
    userEvent.keyboard('{Enter}');
    expect(onInvoke.mock.calls).toEqual([['keyboard']]);
    userEvent.keyboard(' ');
    expect(onInvoke.mock.calls).toEqual([['keyboard'], ['keyboard']]);
  });

  it('preserves focus by stable ID through reorder and reconciles next, previous and chart entry after removal', () => {
    const chartRef = React.createRef<SVGSVGElement>();
    const renderTree = (annotations: ChartAnnotation[]) => (
      <>
        <svg ref={chartRef} tabIndex={0} aria-label="Chart entry" />
        {layer(annotations, { chartRef })}
      </>
    );
    const first = action('first');
    const second = action('second');
    const third = action('third');
    const { rerender } = render(renderTree([first, second, third]));
    const focused = screen.getByRole('button', { name: 'Open second' });
    act(() => focused.focus());
    rerender(renderTree([first, third, second]));
    expect(document.activeElement).toBe(focused);
    expect(screen.getAllByRole('button').map(button => button.getAttribute('aria-label'))).toEqual([
      'Open first',
      'Open third',
      'Open second',
    ]);
    rerender(renderTree([first, third]));
    expect(screen.getByRole('button', { name: 'Open third' })).toHaveFocus();
    rerender(renderTree([first]));
    expect(screen.getByRole('button', { name: 'Open first' })).toHaveFocus();
    rerender(renderTree([]));
    expect(chartRef.current).toHaveFocus();
  });

  it('uses the next surviving annotation before the previous annotation when focus is removed', () => {
    const annotations = [action('first'), action('second'), action('third')];
    const { rerender } = render(layer(annotations));
    act(() => screen.getByRole('button', { name: 'Open second' }).focus());
    rerender(layer([annotations[0], annotations[2]]));
    expect(screen.getByRole('button', { name: 'Open third' })).toHaveFocus();
  });

  it('hides blank action labels rather than exposing an unnamed focus target', () => {
    const annotation = action('blank');
    annotation.action = { label: '  ', onInvoke: jest.fn() };
    render(layer([annotation]));
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('note')).toBeNull();
  });

  it('hides a lower-priority collision together with its connector without reordering surviving buttons', () => {
    const annotations = [action('low'), action('high'), action('separate')];
    annotations.forEach(annotation => {
      annotation.connector = { arrow: 'none' };
    });
    annotations[2] = { ...annotations[2], coordinates: { type: 'relative', x: 0.8, y: 0.8 } };
    render(
      layer(annotations, {
        annotationLayout: {
          collision: 'hide',
          spacing: 2,
          getPriority: annotation => (annotation.id === 'high' ? 10 : 0),
        },
      }),
    );
    expect(screen.queryByRole('button', { name: 'Open low' })).toBeNull();
    expect(screen.getAllByRole('button').map(button => button.getAttribute('aria-label'))).toEqual([
      'Open high',
      'Open separate',
    ]);
    expect(document.querySelectorAll('[data-chart-annotation-svg] line')).toHaveLength(2);
  });

  it('shifts vertically with measured spacing and hides when maxShift is exhausted', () => {
    const annotations = [note('first'), note('second')];
    const { rerender } = render(
      layer(annotations, { annotationLayout: { collision: 'shift', spacing: 2, maxShift: 24 } }),
    );
    const firstY = Number(host(screen.getByRole('note', { name: 'Note first' })).getAttribute('y'));
    const secondY = Number(host(screen.getByRole('note', { name: 'Note second' })).getAttribute('y'));
    expect(secondY - firstY).toBe(22);
    rerender(layer(annotations, { annotationLayout: { collision: 'shift', spacing: 2, maxShift: 10 } }));
    expect(screen.queryByRole('note', { name: 'Note second' })).toBeNull();
  });

  it('keeps independent placement for omitted or allow collision policy', () => {
    const annotations = [note('first'), note('second')];
    const { rerender } = render(layer(annotations));
    expect(screen.getAllByRole('note')).toHaveLength(2);
    rerender(layer(annotations, { annotationLayout: { collision: 'allow' } }));
    expect(screen.getAllByRole('note')).toHaveLength(2);
  });

  it('renders custom measured children and SVG connectors while core retains the only semantic host', () => {
    const content = jest.fn(
      (
        renderProps?: LineChartAnnotationRenderProps,
        defaultRender?: RenderFunction<LineChartAnnotationRenderProps>,
      ) => <span data-custom-content="true">{defaultRender?.(renderProps)}</span>,
    );
    const connector = jest.fn((renderProps?: LineChartAnnotationRenderProps) =>
      renderProps ? (
        <path
          data-custom-connector="true"
          d={`M${renderProps.anchor.x} ${renderProps.anchor.y}L${renderProps.connectorStart.x} ${renderProps.connectorStart.y}`}
        />
      ) : null,
    );
    render(layer([action('custom')], { onRenderAnnotationContent: content, onRenderAnnotationConnector: connector }));
    const button = screen.getByRole('button', { name: 'Open custom' });
    expect(button.querySelector('[data-custom-content]')).not.toBeNull();
    expect(button.querySelector('[inert]')).not.toBeNull();
    expect(document.querySelector('[data-custom-connector]')).not.toBeNull();
    const renderProps = connector.mock.calls[connector.mock.calls.length - 1][0]!;
    expect(renderProps.annotationIndex).toBe(0);
    expect(renderProps.labelRect.width).toBe(40);
    expect(renderProps.labelRect.height).toBe(20);
    expect(renderProps.plot).toBe(plot);
  });

  it('settles on one intrinsic measurement when the visible host has different constrained dimensions', () => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const width = this.hasAttribute('data-chart-annotation-measurement') ? 120 : 80;
      const height = this.hasAttribute('data-chart-annotation-measurement') ? 32 : 48;
      return { x: 0, y: 0, width, height, top: 0, left: 0, right: width, bottom: height, toJSON: () => ({}) };
    });
    const annotations = [action('intrinsic')];
    const renderTree = () =>
      layer(annotations, {
        annotationLayout: { collision: 'shift', spacing: 4 },
        onRenderAnnotationContent: (renderProps, defaultRender) => <span>{defaultRender?.(renderProps)}</span>,
      });
    const { rerender } = render(renderTree());
    const button = screen.getByRole('button', { name: 'Open intrinsic' });
    act(() => button.focus());
    expect(host(button)).toHaveAttribute('width', '120');
    expect(host(button)).toHaveAttribute('height', '32');
    rerender(renderTree());
    expect(screen.getByRole('button', { name: 'Open intrinsic' })).toBe(button);
    expect(button).toHaveFocus();
    expect(host(button)).toHaveAttribute('width', '120');
    expect(host(button)).toHaveAttribute('height', '32');
  });

  it('retains observer subscriptions across commits and remeasures loaded custom material', () => {
    const originalResizeObserver = Object.getOwnPropertyDescriptor(window, 'ResizeObserver');
    const callbacks: ResizeObserverCallback[] = [];
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    const ResizeObserverConstructor = jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
      callbacks.push(callback);
      return { observe, unobserve, disconnect };
    });
    Object.defineProperty(window, 'ResizeObserver', { configurable: true, value: ResizeObserverConstructor });
    const annotations = [action('loaded')];
    const renderTree = (text: string) =>
      layer(annotations, {
        onRenderAnnotationContent: () => <span>{text}</span>,
      });
    const { rerender, unmount } = render(renderTree('Initial content'));
    try {
      const button = screen.getByRole('button', { name: 'Open loaded' });
      act(() => button.focus());
      const subscriptions = observe.mock.calls.length;
      expect(ResizeObserverConstructor).toHaveBeenCalledTimes(1);
      rerender(renderTree('Replacement content'));
      expect(observe).toHaveBeenCalledTimes(subscriptions);
      expect(disconnect).not.toHaveBeenCalled();
      measuredWidth = 96;
      measuredHeight = 36;
      act(() => callbacks[0]([], {} as ResizeObserver));
      expect(host(button)).toHaveAttribute('width', '96');
      expect(host(button)).toHaveAttribute('height', '36');
      act(() => callbacks[0]([], {} as ResizeObserver));
      expect(ResizeObserverConstructor).toHaveBeenCalledTimes(1);
      expect(observe).toHaveBeenCalledTimes(subscriptions);
      expect(screen.getByRole('button', { name: 'Open loaded' })).toBe(button);
      expect(button).toHaveFocus();
    } finally {
      unmount();
      if (originalResizeObserver) {
        Object.defineProperty(window, 'ResizeObserver', originalResizeObserver);
      } else {
        Reflect.deleteProperty(window, 'ResizeObserver');
      }
    }
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('remeasures after inherited CSS font and host changes', async () => {
    const { rerender, unmount } = render(layer([note('font')]));
    try {
      expect(Number(host(screen.getByRole('note')).getAttribute('width'))).toBe(40);
      measuredWidth = 72;
      measuredHeight = 28;
      await act(async () => {
        document.body.classList.add('annotation-font-test');
        await Promise.resolve();
      });
      await waitFor(() => expect(Number(host(screen.getByRole('note')).getAttribute('width'))).toBe(72));
      expect(Number(host(screen.getByRole('note')).getAttribute('height'))).toBe(28);
      measuredWidth = 84;
      rerender(layer([note('font')], { context: { ...context, svgRect: { width: 700, height: 400 } } }));
      expect(Number(host(screen.getByRole('note')).getAttribute('width'))).toBe(84);
    } finally {
      unmount();
      await act(async () => {
        document.body.classList.remove('annotation-font-test');
        await Promise.resolve();
      });
    }
  });

  it('remeasures when web fonts finish loading', async () => {
    const originalFonts = Object.getOwnPropertyDescriptor(document, 'fonts');
    const fonts = new EventTarget();
    Object.defineProperty(fonts, 'ready', { value: Promise.resolve(fonts) });
    Object.defineProperty(document, 'fonts', { configurable: true, value: fonts });
    const { unmount } = render(layer([note('web-font')]));
    try {
      await act(async () => {
        await Promise.resolve();
      });
      measuredWidth = 90;
      await act(async () => {
        fonts.dispatchEvent(new Event('loadingdone'));
        await Promise.resolve();
      });
      await waitFor(() => expect(Number(host(screen.getByRole('note')).getAttribute('width'))).toBe(90));
    } finally {
      unmount();
      if (originalFonts) {
        Object.defineProperty(document, 'fonts', originalFonts);
      } else {
        Reflect.deleteProperty(document, 'fonts');
      }
    }
  });

  it('tracks current-frame keyed projection and removes a focused off-plot action', () => {
    const chartRef = React.createRef<SVGSVGElement>();
    const annotation = action('moving');
    annotation.coordinates = { type: 'data', x: 5, y: 50, yScaleKey: 'hidden' };
    const renderTree = (projectY: NonNullable<ChartAnnotationContext['projectY']>) => (
      <>
        <svg ref={chartRef} tabIndex={0} />
        {layer([annotation], { chartRef, context: { ...context, projectY } })}
      </>
    );
    const initialY = plot.plotRect.y + 50;
    const { rerender } = render(renderTree(() => initialY));
    const button = screen.getByRole('button');
    act(() => button.focus());
    expect(Number(host(button).getAttribute('y'))).toBe(initialY);
    rerender(renderTree(() => initialY + 30));
    expect(Number(host(button).getAttribute('y'))).toBe(initialY + 30);
    expect(button).toHaveFocus();
    rerender(renderTree(() => plot.plotRect.y - 1));
    expect(screen.queryByRole('button')).toBeNull();
    expect(chartRef.current).toHaveFocus();
  });

  it('keeps custom measurement copies inert and excludes them from action traversal', () => {
    render(
      <>
        <button>Before annotation</button>
        {layer([action('measured')], {
          onRenderAnnotationContent: (renderProps, defaultRender) => <span>{defaultRender?.(renderProps)}</span>,
        })}
        <button>After annotation</button>
      </>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
    const copy = document.querySelector('[data-chart-annotation-measurement]')!;
    expect(copy).toHaveAttribute('inert');
    expect(copy).toHaveAttribute('aria-hidden', 'true');
    expect(copy).toHaveAttribute('tabindex', '-1');
    expect(copy).toHaveAttribute('type', 'button');
    userEvent.tab();
    expect(screen.getByRole('button', { name: 'Before annotation' })).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', { name: 'Open measured' })).toHaveFocus();
    userEvent.tab();
    expect(screen.getByRole('button', { name: 'After annotation' })).toHaveFocus();
  });

  it('uses current action closures without changing the surviving button identity', () => {
    const original = jest.fn();
    const current = jest.fn();
    const { rerender } = render(layer([action('stable', original)]));
    const button = screen.getByRole('button');
    rerender(layer([action('stable', current)]));
    expect(screen.getByRole('button')).toBe(button);
    fireEvent.click(button, { detail: 1 });
    expect(original).not.toHaveBeenCalled();
    expect(current).toHaveBeenCalledWith('pointer');
  });

  it('aligns projected labels with the native curve in a scaled, nonzero-origin letterboxed root SVG', () => {
    const chartRef = React.createRef<SVGSVGElement>();
    const base = createLineChartLayout(
      {
        data: {
          lineChartData: [
            {
              legend: 'Series',
              data: [
                { x: 0, y: 0 },
                { x: 10, y: 100 },
              ],
            },
          ],
        },
        xAxis: { domain: [0, 10] },
        yScales: [{ key: 'y', domain: [0, 100] }],
      },
      800,
      300,
      false,
      'nonzero-annotation',
    );
    const translated = {
      ...base,
      svgRect: { x: 10, y: 20, width: 800, height: 300 },
      plotRect: { ...base.plotRect, x: base.plotRect.x + 10, y: base.plotRect.y + 20 },
      projectX: (value: Parameters<typeof base.projectX>[0]) => {
        const projected = base.projectX(value);
        return projected === undefined ? undefined : projected + 10;
      },
      projectY: (key: string, value: number) => {
        const projected = base.projectY(key, value);
        return projected === undefined ? undefined : projected + 20;
      },
    };
    const projectedContext = {
      ...context,
      svgRect: translated.svgRect,
      plotRect: translated.plotRect,
      xScale: (value: Parameters<typeof translated.projectX>[0]) => translated.projectX(value) ?? NaN,
      projectY: translated.projectY,
    };
    const x = translated.projectX(5)!;
    const y = translated.projectY('y', 50)!;
    const d = `M${translated.projectX(0)} ${translated.projectY('y', 0)}L${x} ${y}L${translated.projectX(
      10,
    )} ${translated.projectY('y', 100)}`;
    const renderTree = (aspectRatio: string) => (
      <div style={{ width: 400, height: 200, position: 'relative' }}>
        <svg ref={chartRef} width="100%" height="100%" viewBox="10 20 800 300" preserveAspectRatio={aspectRatio}>
          <path data-native-curve="true" d={d} />
          <circle data-native-point="true" cx={x} cy={y} r={2} />
        </svg>
        {layer([note('aligned', { coordinates: { type: 'data', x: 5, y: 50, yScaleKey: 'y' } })], {
          chartRef,
          plot: translated,
          context: projectedContext,
        })}
      </div>
    );
    const { container, rerender } = render(renderTree('xMaxYMin meet'));
    const overlay = container.querySelector('[data-chart-annotation-svg]')!;
    const label = host(screen.getByRole('note', { name: 'Note aligned' }));
    const point = container.querySelector('[data-native-point]')!;
    expect(container.querySelector('[data-native-curve]')).toHaveAttribute('d', d);
    expect(label.getAttribute('x')).toBe(point.getAttribute('cx'));
    expect(label.getAttribute('y')).toBe(point.getAttribute('cy'));
    expect(overlay).toHaveAttribute('viewBox', '10 20 800 300');
    expect(overlay.getAttribute('preserveAspectRatio')).toBe(chartRef.current!.getAttribute('preserveAspectRatio'));
    rerender(renderTree('xMinYMax slice'));
    expect(overlay).toHaveAttribute('preserveAspectRatio', 'xMinYMax slice');
  });

  it('tracks root SVG and inherited style mutations without recreating its observers', async () => {
    const NativeMutationObserver = window.MutationObserver;
    const observerConstructor = jest
      .spyOn(window, 'MutationObserver')
      .mockImplementation(callback => new NativeMutationObserver(callback));
    const chartRef = React.createRef<SVGSVGElement>();
    const { container, unmount } = render(
      <div>
        <svg ref={chartRef} preserveAspectRatio="xMaxYMin meet" />
        {layer([action('root-observer')], {
          chartRef,
          onRenderAnnotationContent: (renderProps, defaultRender) => <span>{defaultRender?.(renderProps)}</span>,
        })}
      </div>,
    );
    try {
      const button = screen.getByRole('button', { name: 'Open root-observer' });
      const overlay = container.querySelector('[data-chart-annotation-svg]')!;
      const observerCount = observerConstructor.mock.calls.length;
      expect(observerCount).toBeGreaterThan(0);
      expect(overlay).toHaveAttribute('preserveAspectRatio', 'xMaxYMin meet');
      await act(async () => {
        chartRef.current!.setAttribute('preserveAspectRatio', 'none');
        await Promise.resolve();
      });
      expect(overlay).toHaveAttribute('preserveAspectRatio', 'none');
      measuredWidth = 88;
      await act(async () => {
        (container.firstElementChild as HTMLElement).style.fontSize = '24px';
        await Promise.resolve();
      });
      expect(host(button)).toHaveAttribute('width', '88');
      expect(observerConstructor).toHaveBeenCalledTimes(observerCount);
      expect(screen.getByRole('button', { name: 'Open root-observer' })).toBe(button);
    } finally {
      unmount();
    }
  });

  it('clamps unclipped labels to the nonzero whole-SVG viewport rather than a zero origin', () => {
    const svgRect = { x: 10, y: 20, width: 800, height: 300 };
    const plotRect = { x: 10, y: 20, width: 800, height: 300 };
    const translated = { ...plot, svgRect, plotRect };
    render(
      layer(
        [
          note('whole-svg', {
            coordinates: { type: 'relative', x: 0, y: 0 },
            layout: { align: 'end', verticalAlign: 'bottom', clipToBounds: false },
          }),
        ],
        { plot: translated, context: { ...context, svgRect, plotRect } },
      ),
    );
    const label = host(screen.getByRole('note', { name: 'Note whole-svg' }));
    expect(label).toHaveAttribute('x', '10');
    expect(label).toHaveAttribute('y', '20');
  });

  it('retains legacy off-plot plain notes and whole-SVG clamping in the shared scene', () => {
    const annotations = [
      note('relative-outside', { coordinates: { type: 'relative', x: -1, y: -1 } }),
      note('pixel-outside', { coordinates: { type: 'pixel', x: -1000, y: -1000 } }),
      note('data-outside', { coordinates: { type: 'data', x: -1000, y: 1000 } }),
    ].map(annotation => ({
      ...annotation,
      layout: { align: 'start' as const, verticalAlign: 'top' as const, clipToBounds: false },
    }));
    render(layer(annotations));
    expect(screen.getAllByRole('note')).toHaveLength(3);
    annotations.forEach(annotation => {
      const label = host(screen.getByRole('note', { name: annotation.text }));
      expect(label).toHaveAttribute('x', '0');
      expect(label).toHaveAttribute('y', '0');
    });
  });

  it('keeps measured collision layout and focused action identity when an inline content callback is recreated', () => {
    const annotations = [
      {
        ...action('first-inline'),
        coordinates: {
          type: 'mixed' as const,
          xCoordinateType: 'pixel' as const,
          yCoordinateType: 'relative' as const,
          x: 30,
          y: 0.5,
        },
      },
      {
        ...action('second-inline'),
        coordinates: {
          type: 'mixed' as const,
          xCoordinateType: 'pixel' as const,
          yCoordinateType: 'relative' as const,
          x: 100,
          y: 0.5,
        },
      },
    ];
    const renderTree = (pointerEcho: number) => (
      <div data-pointer-echo={pointerEcho}>
        {layer(annotations, {
          annotationLayout: { collision: 'hide' },
          onRenderAnnotationContent: (renderProps, defaultRender) => <span>{defaultRender?.(renderProps)}</span>,
        })}
      </div>
    );
    const { rerender } = render(renderTree(0));
    const button = screen.getByRole('button', { name: 'Open second-inline' });
    const initialHost = host(button);
    const initialBounds = ['x', 'y', 'width', 'height'].map(attribute => initialHost.getAttribute(attribute));
    act(() => button.focus());
    for (let pointerEcho = 1; pointerEcho <= 3; pointerEcho++) {
      rerender(renderTree(pointerEcho));
      expect(screen.getByRole('button', { name: 'Open second-inline' })).toBe(button);
      expect(button).toHaveFocus();
      expect(host(button)).toBe(initialHost);
      expect(['x', 'y', 'width', 'height'].map(attribute => host(button).getAttribute(attribute))).toEqual(
        initialBounds,
      );
    }
  });
});
