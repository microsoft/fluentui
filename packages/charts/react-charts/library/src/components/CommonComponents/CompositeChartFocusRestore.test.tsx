import * as React from 'react';
import { act, render } from '@testing-library/react';
import { DeclarativeChart, VegaDeclarativeChart } from '../../index';
import type { FocusRestorePolicy } from '../../types/index';

const composites = [
  ...(['line', 'bar', 'gauge'] as const).map(type => ({
    name: `Plotly ${type}`,
    selector:
      type === 'line'
        ? 'path[id^="lineID"][tabindex="0"]'
        : type === 'bar'
        ? 'rect[role="option"]'
        : 'path[role="option"]',
    renderChart: (value: number, policy?: FocusRestorePolicy, selectedLegends?: string[], count = 2) => (
      <DeclarativeChart
        focusRestorePolicy={policy}
        chartSchema={{
          plotlySchema: {
            selectedLegends,
            data: Array.from({ length: count }, (_, index) =>
              type === 'gauge'
                ? [
                    {
                      type: 'indicator',
                      mode: 'gauge+number',
                      value,
                      domain: { x: index === 0 ? [0, 0.45] : [0.55, 1], y: [0, 1] },
                      gauge: {
                        axis: { range: [0, 100] },
                        steps: [
                          { range: [0, 50], name: 'First', color: 'red' },
                          { range: [50, 100], name: 'Second', color: 'blue' },
                        ],
                      },
                    },
                  ]
                : ['First', 'Second'].map(name => ({
                    type: type === 'line' ? 'scatter' : 'histogram',
                    histfunc: 'sum',
                    mode: 'lines',
                    line: { shape: 'linear' },
                    name,
                    xaxis: index === 0 ? 'x' : 'x2',
                    yaxis: index === 0 ? 'y' : 'y2',
                    x: type === 'bar' ? ['First', 'Second'] : [1, 2],
                    y: [value, 20],
                  })),
            ).flat(),
            layout: {
              showlegend: true,
              xaxis: { domain: [0, 0.45], anchor: 'y' },
              yaxis: { domain: [0, 1], anchor: 'x' },
              xaxis2: { domain: [0.55, 1], anchor: 'y2' },
              yaxis2: { domain: [0, 1], anchor: 'x2' },
            },
          },
        }}
      />
    ),
  })),
  ...(['hconcat', 'vconcat'] as const).map(concat => ({
    name: `Vega ${concat}`,
    selector: '[id^="circle"][tabindex="0"]',
    renderChart: (value: number, policy?: FocusRestorePolicy, selectedLegends?: string[], count = 2) => (
      <VegaDeclarativeChart
        focusRestorePolicy={policy}
        chartSchema={{
          selectedLegends,
          vegaLiteSpec: {
            [concat]: Array.from({ length: count }, () => ({
              data: {
                values: [
                  { x: 1, y: value, series: 'First' },
                  { x: 2, y: 20, series: 'First' },
                  { x: 3, y: value, series: 'Second' },
                  { x: 4, y: 20, series: 'Second' },
                ],
              },
              mark: 'line',
              encoding: {
                x: { field: 'x', type: 'quantitative' },
                y: { field: 'y', type: 'quantitative' },
                color: { field: 'series', type: 'nominal' },
              },
            })),
          },
        }}
      />
    ),
  })),
];

describe.each(composites)('$name composite focus restoration', ({ renderChart, selector }) => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 600,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 400,
      right: 600,
      toJSON: () => ({}),
    });
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 0;
    });
    const getComputedStyle = global.getComputedStyle;
    jest.spyOn(global, 'getComputedStyle').mockImplementation(element => {
      const style = getComputedStyle(element);
      style.marginTop = '0px';
      style.marginBottom = '0px';
      return style;
    });
  });

  afterEach(() => jest.restoreAllMocks());

  const setup = (policy?: FocusRestorePolicy) => {
    const focusEvents: Element[] = [];
    const scene = (value: number, nextPolicy = policy, selectedLegends?: string[], count = 2) => (
      <div onFocusCapture={event => focusEvents.push(event.target)}>
        <button data-testid="outside">Outside</button>
        {renderChart(value, nextPolicy, selectedLegends, count)}
      </div>
    );
    const result = render(scene(10));
    const findTarget = (subplot: number, legend = 'First') => {
      const grid = result.container.querySelector<HTMLElement>('[style*="display: grid"]');
      const target = Array.from(grid!.children[subplot].querySelectorAll<SVGElement>(selector)).find(element =>
        (
          element.getAttribute('aria-label') ?? element.closest('[role="listbox"]')?.getAttribute('aria-label')
        )?.includes(legend),
      );
      expect(target).toBeDefined();
      return target!;
    };
    return { ...result, scene, findTarget, focusEvents };
  };

  it.each([0, 1])('resets only the last-focused subplot %s after both subplots were visited', last => {
    const { findTarget, getByTestId, rerender, scene, focusEvents, container } = setup('reset');
    act(() => findTarget(1 - last).focus());
    act(() => findTarget(last).focus());
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;

    rerender(scene(15));

    expect(container.ownerDocument.activeElement).toBe(findTarget(last));
    expect(focusEvents).toEqual([findTarget(last)]);
  });

  it('does not fall back to another visited subplot when the intended target becomes inactive', () => {
    const { findTarget, getByTestId, rerender, scene, focusEvents, container } = setup('reset');
    act(() => findTarget(1, 'Second').focus());
    act(() => findTarget(0).focus());
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;

    rerender(scene(15, 'reset', ['Second']));

    expect(findTarget(1, 'Second')).toBeDefined();
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(focusEvents).toHaveLength(0);
  });

  it('does not fall back when the last-focused subplot is removed', () => {
    const { findTarget, getByTestId, rerender, scene, focusEvents, container } = setup('reset');
    act(() => findTarget(0).focus());
    act(() => findTarget(1).focus());
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;

    rerender(scene(15, 'reset', undefined, 1));

    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(focusEvents).toHaveLength(0);
  });

  it('keeps external focus during preservation and retains the recipient for a later explicit reset', () => {
    const { findTarget, getByTestId, rerender, scene, focusEvents, container } = setup();
    act(() => findTarget(1).focus());
    act(() => findTarget(0).focus());
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;

    rerender(scene(15));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    rerender(scene(15, 'reset'));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(focusEvents).toHaveLength(0);

    rerender(scene(16, 'reset'));
    expect(container.ownerDocument.activeElement).toBe(findTarget(0));
    expect(focusEvents).toEqual([findTarget(0)]);
  });

  it('preserves the current subplot owner without restoring another visited subplot', () => {
    const { findTarget, rerender, scene, focusEvents, container } = setup();
    act(() => findTarget(1).focus());
    act(() => findTarget(0).focus());
    focusEvents.length = 0;

    rerender(scene(15));

    expect(container.ownerDocument.activeElement).toBe(findTarget(0));
    expect(focusEvents.every(element => element === findTarget(0))).toBe(true);
  });

  it('does not choose an unvisited subplot or reset on an equivalent data allocation', () => {
    const { findTarget, getByTestId, rerender, scene, focusEvents, container } = setup('reset');
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;
    rerender(scene(15));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(focusEvents).toHaveLength(0);

    act(() => findTarget(1).focus());
    act(() => findTarget(0).focus());
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;
    rerender(scene(15));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(focusEvents).toHaveLength(0);
  });

  it('retains the single recipient while automatic restoration is disabled', () => {
    const { findTarget, getByTestId, rerender, scene, focusEvents, container } = setup('none');
    act(() => findTarget(1).focus());
    act(() => findTarget(0).focus());
    act(() => getByTestId('outside').focus());
    focusEvents.length = 0;
    rerender(scene(15));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(focusEvents).toHaveLength(0);

    rerender(scene(16, 'reset'));
    expect(container.ownerDocument.activeElement).toBe(findTarget(0));
    expect(focusEvents).toEqual([findTarget(0)]);
  });
});
