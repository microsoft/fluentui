import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineChart } from './LineChart';
import type { LineChartGap, LineChartPoints } from '../../types/index';
import type { LineChartInteractionChange, LineChartPlotContext, LineChartProps } from './LineChart.types';

const bounds = { x: 0, y: 0, left: 0, top: 0, right: 600, bottom: 300, width: 600, height: 300, toJSON: () => ({}) };
const margins = { left: 10, right: 10, top: 10, bottom: 10 };
let matrixDescriptor: PropertyDescriptor | undefined;

beforeEach(() => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(bounds);
  matrixDescriptor = Object.getOwnPropertyDescriptor(SVGSVGElement.prototype, 'getScreenCTM');
  Object.defineProperty(SVGSVGElement.prototype, 'getScreenCTM', {
    configurable: true,
    value: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, inverse: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }) }),
  });
});
afterEach(() => {
  jest.restoreAllMocks();
  if (matrixDescriptor) {
    Object.defineProperty(SVGSVGElement.prototype, 'getScreenCTM', matrixDescriptor);
  } else {
    Reflect.deleteProperty(SVGSVGElement.prototype, 'getScreenCTM');
  }
});

function CommittedPlot({
  plot,
  onCommit,
}: {
  plot: LineChartPlotContext;
  onCommit: (plot: LineChartPlotContext) => void;
}) {
  useIsomorphicLayoutEffect(() => onCommit(plot), [plot, onCommit]);
  return null;
}

function continuousProps(): LineChartProps {
  return {
    data: {
      chartTitle: 'Inspection chart',
      lineChartData: [
        {
          legend: 'A',
          color: 'red',
          data: [
            { x: 0, y: 1 },
            { x: 2, y: 3 },
          ],
          gaps: [{ startIndex: 0, endIndex: 1 }],
          lineOptions: { connectGaps: true },
        },
      ],
    },
    width: 600,
    height: 300,
    hideLegend: true,
    hideTooltip: true,
    margins,
    getSeriesKey: series => series.legend,
    getPointKey: point => String(point.x),
    xAxis: { axis: false, domain: [0, 2] },
    yAxis: { axis: false, domain: [0, 4] },
    interactionOptions: { mode: 'nearest-series', xValues: [0, 1, 2], hitRadius: 12 },
  };
}

it('projects four hidden raw-value scales without normalizing unlike metrics', () => {
  const values = [5, 50, 500, 0.5];
  const props: LineChartProps = {
    data: {
      chartTitle: 'Four metrics',
      lineChartData: values.map((value, index) => ({
        legend: `metric-${index}`,
        color: 'red',
        data: [{ x: 0, y: value }],
      })),
    },
    width: 600,
    height: 300,
    margins,
    hideLegend: true,
    hideTooltip: true,
    getSeriesKey: series => series.legend,
    getSeriesYScaleKey: (_, index) => `scale-${index}`,
    xAxis: { axis: false, domain: [-0.5, 0.5] },
    yScales: values.map((value, index) => ({ key: `scale-${index}`, domain: [0, value * 2], axis: false })),
    onRenderMarker: marker =>
      marker ? (
        <circle
          data-testid={`visible-${marker.series.key}`}
          cx={marker.point.position.x}
          cy={marker.point.position.y}
          r={3}
        />
      ) : null,
  };
  render(<LineChart {...props} />);
  for (let index = 0; index < values.length; index++) {
    const marker = screen.getByTestId(`visible-metric-${index}`);
    expect(Number(marker.getAttribute('cx'))).toBeCloseTo(300);
    expect(Number(marker.getAttribute('cy'))).toBeCloseTo(150);
  }
  expect(screen.getAllByRole('option')).toHaveLength(4);
});

it('reports a connected missing-slot curve hit without inventing a point and keeps geometry stable on inspection', () => {
  const changes: LineChartInteractionChange[] = [];
  const frames: LineChartPlotContext[] = [];
  const committed = (plot: LineChartPlotContext) => {
    frames.push(plot);
  };
  const props = continuousProps();
  const { container } = render(
    <LineChart
      {...props}
      onInteractionChange={change => changes.push(change)}
      onRenderPlotLayers={plot => ({ aboveSeries: <CommittedPlot plot={plot} onCommit={committed} /> })}
    />,
  );
  const before = frames[frames.length - 1];
  const svg = container.querySelector('svg')!;
  fireEvent(svg, new MouseEvent('pointermove', { bubbles: true, clientX: 300, clientY: 150 }));
  const change = changes[changes.length - 1];
  expect(change.reason).toBe('pointer');
  expect(change.state.activeX).toBe(1);
  expect(change.state.activePoint).toBeUndefined();
  expect(change.inspection.hit?.seriesKey).toBe('A');
  expect(change.inspection.hit?.segmentKey).toBeDefined();
  expect(change.inspection.hit?.pointKey).toBeUndefined();
  expect(change.inspection.hit?.withinRadius).toBe(true);
  expect(change.inspection.hit?.distance).toBeCloseTo(0);
  const after = frames[frames.length - 1];
  expect(after.geometryVersion).toBe(before.geometryVersion);
  expect(after.series[0].segments).toBe(before.series[0].segments);
  expect(after.frameId).toBeGreaterThan(before.frameId);
});

it('does not notify again when a controlled parent accepts a pointer proposal', () => {
  const onChange = jest.fn();
  const props = continuousProps();
  const { container, rerender } = render(<LineChart {...props} interactionState={{}} onInteractionChange={onChange} />);
  fireEvent(
    container.querySelector('svg')!,
    new MouseEvent('pointermove', { bubbles: true, clientX: 300, clientY: 150 }),
  );
  const proposal = onChange.mock.calls[onChange.mock.calls.length - 1][0] as LineChartInteractionChange;
  onChange.mockClear();
  rerender(<LineChart {...props} interactionState={proposal.state} onInteractionChange={onChange} />);
  expect(onChange).not.toHaveBeenCalled();
});

it('keeps isolated measured points visible after a declared break removes their only edge', () => {
  const props = continuousProps();
  props.data.lineChartData![0].lineOptions = { connectGaps: false };
  const { container } = render(<LineChart {...props} />);
  const visible = container.querySelectorAll('g[role="option"] > g[aria-hidden="true"] circle');
  expect(visible).toHaveLength(2);
  expect(Number(visible[0].getAttribute('cx'))).toBeCloseTo(10);
  expect(Number(visible[1].getAttribute('cx'))).toBeCloseTo(590);
});

it('retains native point activation without also activating the containing series', () => {
  const onPoint = jest.fn();
  const onLine = jest.fn();
  const props = continuousProps();
  props.data.lineChartData![0].onLineClick = onLine;
  props.data.lineChartData![0].data[0].onDataPointClick = onPoint;
  props.data.lineChartData![0].data[0].callOutAccessibilityData = { ariaLabel: 'Measured point A' };
  render(<LineChart {...props} />);
  const point = screen.getByRole('option', { name: 'Measured point A' });
  fireEvent.click(point);
  fireEvent.keyDown(point, { key: 'Enter' });
  expect(onPoint).toHaveBeenCalledTimes(2);
  expect(onLine).not.toHaveBeenCalled();
});

it('updates selected legacy data and then follows a changed controlled selection', () => {
  const data = (updated: boolean): LineChartPoints[] => [
    {
      legend: 'A',
      color: 'red',
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 25 },
      ],
      lineOptions: { curve: 'linear' },
    },
    {
      legend: 'B',
      color: 'green',
      data: [
        { x: 0, y: updated ? 75 : 15 },
        { x: 1, y: updated ? 90 : 20 },
      ],
      lineOptions: { curve: 'linear' },
    },
  ];
  const base: Omit<LineChartProps, 'data'> = {
    width: 600,
    height: 300,
    hideLegend: true,
    hideTooltip: true,
    yMinValue: 0,
    yMaxValue: 100,
    legendProps: { canSelectMultipleLegends: true, selectedLegends: ['B'] },
  };
  const { container, rerender } = render(
    <LineChart {...base} data={{ chartTitle: 'Legacy selection', lineChartData: data(false) }} />,
  );
  const before = container.querySelector('path[stroke="green"]')!.getAttribute('d');
  rerender(<LineChart {...base} data={{ chartTitle: 'Legacy selection', lineChartData: data(true) }} />);
  expect(container.querySelector('path[stroke="green"]')!.getAttribute('d')).not.toBe(before);
  rerender(
    <LineChart
      {...base}
      legendProps={{ canSelectMultipleLegends: true, selectedLegends: ['A'] }}
      data={{ chartTitle: 'Legacy selection', lineChartData: data(true) }}
    />,
  );
  expect(container.querySelector('path[stroke="red"]')).toBeInTheDocument();
  expect(container.querySelector('path[stroke="green"]')).not.toBeInTheDocument();
});

it('honors a frozen legacy gap list without mutating caller-owned intervals', () => {
  const gaps: LineChartGap[] = [{ startIndex: 0, endIndex: 1 }];
  Object.freeze(gaps[0]);
  Object.freeze(gaps);
  const { container } = render(
    <LineChart
      data={{
        chartTitle: 'Frozen gaps',
        lineChartData: [
          {
            legend: 'A',
            color: 'red',
            data: [
              { x: 0, y: 1 },
              { x: 1, y: 2 },
              { x: 2, y: 3 },
            ],
            gaps,
          },
        ],
      }}
      width={600}
      height={300}
      hideLegend
      hideTooltip
    />,
  );
  expect(container.querySelectorAll('line[stroke="red"]')).toHaveLength(1);
  expect(gaps).toEqual([{ startIndex: 0, endIndex: 1 }]);
});

it('clears physical focus when a measured point is removed rather than focusing an exit visual', () => {
  const props = continuousProps();
  const { container, rerender } = render(<LineChart {...props} />);
  const point = container.querySelector<SVGGElement>('[data-line-chart-point-key="0"]')!;
  act(() => point.focus());
  expect(document.activeElement).toBe(point);
  rerender(<LineChart {...props} data={{ chartTitle: 'Inspection chart', lineChartData: [] }} />);
  expect(document.activeElement).toBe(container.querySelector('svg'));
  expect(container.querySelector('g[role="listbox"]')).not.toBeInTheDocument();
});

it('retains a stateful custom marker appearance through exit and quick re-entry', () => {
  jest.useFakeTimers();
  function LoadedMarker({
    point,
    seriesKey,
  }: {
    point: import('./LineChart.types').LineChartResolvedPoint;
    seriesKey: string;
  }) {
    const [radius, setRadius] = React.useState(3);
    React.useEffect(() => {
      const loaded = () => setRadius(7);
      window.addEventListener('marker-ready', loaded);
      return () => window.removeEventListener('marker-ready', loaded);
    }, []);
    return (
      <circle
        data-testid={`stateful-${seriesKey}-${point.key}`}
        cx={point.position.x}
        cy={point.position.y}
        r={radius}
      />
    );
  }
  const props = continuousProps();
  const data = {
    ...props.data,
    lineChartData: [
      ...props.data.lineChartData!,
      {
        legend: 'B',
        color: 'blue',
        data: [
          { x: 0, y: 2 },
          { x: 2, y: 2 },
        ],
      },
    ],
  };
  const motion = {
    enter: { durationMs: 0, easing: 'linear' },
    update: { durationMs: 0, easing: 'linear' },
    exit: { durationMs: 100, easing: 'linear' },
  };
  const renderer: NonNullable<LineChartProps['onRenderMarker']> = visual =>
    visual ? <LoadedMarker point={visual.point} seriesKey={visual.series.key} /> : null;
  const { rerender, unmount } = render(<LineChart {...props} data={data} motion={motion} onRenderMarker={renderer} />);
  try {
    act(() => {
      window.dispatchEvent(new Event('marker-ready'));
    });
    expect(screen.getByTestId('stateful-A-0')).toHaveAttribute('r', '7');
    rerender(
      <LineChart
        {...props}
        data={{ ...data, lineChartData: [data.lineChartData[1]] }}
        motion={motion}
        onRenderMarker={renderer}
      />,
    );
    expect(screen.getByTestId('stateful-A-0')).toHaveAttribute('r', '7');
    rerender(<LineChart {...props} data={data} motion={motion} onRenderMarker={renderer} />);
    expect(screen.getByTestId('stateful-A-0')).toHaveAttribute('r', '7');
  } finally {
    unmount();
    jest.useRealTimers();
  }
});

it('preserves a focused observation when changed topology crosses an intermediate animated domain', () => {
  const props = continuousProps();
  props.xAxis = { axis: false, domain: [0, 4] };
  props.yAxis = { axis: false, domain: [0, 100] };
  props.motion = {
    enter: { durationMs: 0, easing: 'linear' },
    update: { durationMs: 1000, easing: 'linear' },
    exit: { durationMs: 0, easing: 'linear' },
  };
  props.data = {
    lineChartData: [
      {
        legend: 'A',
        color: 'red',
        data: [
          { x: 0, y: 50 },
          { x: 2, y: 20 },
        ],
      },
    ],
  };
  const { container, rerender } = render(<LineChart {...props} />);
  const focused = container.querySelector<SVGGElement>('[data-line-chart-point-key="0"]')!;
  act(() => focused.focus());
  expect(document.activeElement).toBe(focused);
  rerender(
    <LineChart
      {...props}
      yAxis={{ axis: false, domain: [0, 200] }}
      data={{
        lineChartData: [
          {
            legend: 'A',
            color: 'red',
            data: [
              { x: 0, y: 180 },
              { x: 2, y: 20 },
              { x: 4, y: 30 },
            ],
          },
        ],
      }}
    />,
  );
  expect(focused).toHaveAttribute('role', 'option');
  expect(focused).toHaveAttribute('tabindex', '0');
  expect(document.activeElement).toBe(focused);
});

it('adds frame-bound annotation actions without replacing the chart or changing its data geometry', () => {
  const frames: LineChartPlotContext[] = [];
  const onCommit = (plot: LineChartPlotContext) => {
    frames.push(plot);
  };
  const onInvoke = jest.fn();
  const props = continuousProps();
  props.annotations = [{ id: 'existing', text: 'Existing note', coordinates: { type: 'relative', x: 0.2, y: 0.2 } }];
  Object.freeze(props.annotations);
  const layers: NonNullable<LineChartProps['onRenderPlotLayers']> = plot => ({
    aboveSeries: <CommittedPlot plot={plot} onCommit={onCommit} />,
  });
  const { container, rerender } = render(
    <LineChart {...props} getAnnotations={() => []} onRenderPlotLayers={layers} />,
  );
  const svg = container.querySelector('svg');
  const before = frames[frames.length - 1];
  const generated: NonNullable<LineChartProps['getAnnotations']> = plot => [
    {
      id: 'interval-group',
      text: 'Active configuration snapshot',
      coordinates: {
        type: 'mixed',
        xCoordinateType: 'pixel',
        yCoordinateType: 'relative',
        x: plot.plotRect.width / 2,
        y: 0.1,
      },
      action: { label: 'Read interval details', onInvoke },
    },
  ];
  rerender(<LineChart {...props} getAnnotations={generated} onRenderPlotLayers={layers} />);
  const action = screen.getByRole('button', { name: 'Read interval details' });
  expect(screen.getByRole('note', { name: 'Existing note' })).toBeInTheDocument();
  expect(container.querySelector('svg')).toBe(svg);
  const after = frames[frames.length - 1];
  expect(after.geometryVersion).toBe(before.geometryVersion);
  expect(after.series).toBe(before.series);
  expect(after.xScale).toBe(before.xScale);
  fireEvent.click(action);
  expect(onInvoke).toHaveBeenCalledTimes(1);
  rerender(<LineChart {...props} getAnnotations={() => []} onRenderPlotLayers={layers} />);
  expect(screen.queryByRole('button', { name: 'Read interval details' })).not.toBeInTheDocument();
  expect(container.querySelector('svg')).toBe(svg);
});
