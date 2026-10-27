import * as React from 'react';
import { act, render } from '@testing-library/react';
import type { FocusRestorePolicy } from '../../types/index';
import { LineChart, VerticalBarChart, GaugeChart, DeclarativeChart, VegaDeclarativeChart } from '../../index';
import { useChartFocusRestore } from './useChartFocusRestore';

const charts: {
  name: string;
  selector: string;
  hasLegend?: boolean;
  supportsResetTarget?: boolean;
  renderChart: (
    value: number,
    color: string,
    policy?: FocusRestorePolicy,
    configureResetTarget?: boolean,
  ) => React.ReactElement;
}[] = [
  {
    name: 'line',
    supportsResetTarget: true,
    selector: '[id^="circle"][tabindex="0"]',
    renderChart: (value, color, policy, configureResetTarget) => (
      <LineChart
        data={{
          lineChartData: [
            {
              legend: 'First',
              color,
              data: [
                { x: 1, y: value },
                { x: 2, y: 20 },
              ],
            },
          ],
        }}
        focusRestorePolicy={policy}
        focusOnReset={configureResetTarget ? { lineIndex: 0, pointIndex: 0 } : undefined}
      />
    ),
  },
  {
    name: 'vertical bar',
    supportsResetTarget: true,
    selector: 'rect[role="option"]',
    renderChart: (value, color, policy, configureResetTarget) => (
      <VerticalBarChart
        data={[
          { x: 1, y: value, legend: 'First' },
          { x: 2, y: 20, legend: 'Second' },
        ]}
        colors={[color]}
        focusRestorePolicy={policy}
        focusOnReset={configureResetTarget ? { barIndex: 0 } : undefined}
      />
    ),
  },
  {
    name: 'gauge',
    supportsResetTarget: true,
    selector: 'path[role="option"]',
    renderChart: (value, color, policy, configureResetTarget) => (
      <GaugeChart
        segments={[
          { size: 50, legend: 'First', color },
          { size: 50, legend: 'Second', color },
        ]}
        chartValue={value}
        focusRestorePolicy={policy}
        focusOnReset={configureResetTarget ? { segmentIndex: 0 } : undefined}
      />
    ),
  },
  ...(['line', 'bar', 'gauge'] as const).map(type => ({
    name: `Plotly ${type === 'bar' ? 'histogram (vertical bar)' : type}`,
    selector:
      type === 'line'
        ? 'path[id^="lineID"][tabindex="0"]'
        : type === 'bar'
        ? 'rect[role="option"]'
        : 'path[role="option"]',
    renderChart: (value: number, color: string, policy?: FocusRestorePolicy) => (
      <DeclarativeChart
        focusRestorePolicy={policy}
        chartSchema={{
          plotlySchema: {
            data:
              type === 'gauge'
                ? [
                    {
                      type: 'indicator',
                      mode: 'gauge+number',
                      value,
                      gauge: {
                        axis: { range: [0, 100] },
                        steps: [
                          { range: [0, 50], name: 'First', color },
                          { range: [50, 100], name: 'Second', color },
                        ],
                      },
                    },
                  ]
                : (type === 'bar' ? ['First'] : ['First', 'Second']).map(name => ({
                    type: type === 'line' ? 'scatter' : 'histogram',
                    histfunc: 'sum',
                    mode: 'lines',
                    line: { shape: 'linear', color },
                    marker: { color },
                    name,
                    x: type === 'bar' ? ['First', 'Second'] : [1, 2],
                    y: [value, 20],
                  })),
            layout: { showlegend: true },
          },
        }}
      />
    ),
  })),
  ...(['line', 'bar'] as const).map(type => ({
    name: `Vega ${type}`,
    hasLegend: type !== 'bar',
    selector: type === 'line' ? '[id^="circle"][tabindex="0"]' : 'rect[role="option"]',
    renderChart: (value: number, color: string, policy?: FocusRestorePolicy) => (
      <VegaDeclarativeChart
        focusRestorePolicy={policy}
        chartSchema={{
          vegaLiteSpec: {
            data: {
              values: [
                { x: 1, y: value, series: 'First' },
                { x: 2, y: 20, series: 'First' },
                { x: 3, y: value, series: 'Second' },
                { x: 4, y: 20, series: 'Second' },
              ],
            },
            mark: type,
            encoding: {
              x: { field: 'x', type: 'quantitative' },
              y: { field: 'y', type: 'quantitative' },
              color:
                type === 'line'
                  ? { field: 'series', type: 'nominal', scale: { range: [color, color] } }
                  : { value: color },
            },
          },
        }}
      />
    ),
  })),
];

describe.each(charts)('$name focus policy', ({ selector, renderChart, hasLegend = true, supportsResetTarget }) => {
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

  const scene = (value: number, color = 'red', policy?: FocusRestorePolicy) => (
    <>
      <button data-testid="outside">Outside</button>
      {renderChart(value, color, policy)}
    </>
  );

  it('preserves current chart focus on content changes', () => {
    const { container, rerender } = render(scene(10));
    const target = container.querySelectorAll<SVGElement>(selector)[1];
    expect(target).toBeDefined();
    act(() => target.focus());
    expect(container.ownerDocument.activeElement).toBe(target);

    rerender(scene(15));
    expect(container.ownerDocument.activeElement).toBe(container.querySelectorAll(selector)[1]);
    rerender(scene(15, 'blue'));
    expect(container.ownerDocument.activeElement).toBe(container.querySelectorAll(selector)[1]);
  });

  it('leaves deliberate outside focus alone by default and retains reset memory', () => {
    const { container, rerender, getByTestId } = render(scene(10));
    const target = container.querySelectorAll<SVGElement>(selector)[1];
    expect(target).toBeDefined();
    act(() => target.focus());
    act(() => getByTestId('outside').focus());

    rerender(scene(15));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    rerender(scene(15, 'blue'));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));

    rerender(scene(15, 'blue', 'reset'));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    rerender(scene(16, 'blue', 'reset'));
    expect(container.ownerDocument.activeElement).toBe(container.querySelectorAll(selector)[1]);
  });

  it('does not execute restoration when disabled, even with chart-owned focus', () => {
    const { container, rerender, getByTestId } = render(scene(10, 'red', 'none'));
    const target = container.querySelectorAll<SVGElement>(selector)[1];
    expect(target).toBeDefined();
    act(() => target.focus());
    const onFocus = jest.spyOn(target, 'focus');

    rerender(scene(15, 'blue', 'none'));
    expect(onFocus).not.toHaveBeenCalled();
    act(() => getByTestId('outside').focus());
    rerender(scene(16, 'blue', 'none'));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    expect(onFocus).not.toHaveBeenCalled();
    rerender(scene(17, 'blue', 'reset'));
    expect(container.ownerDocument.activeElement).toBe(container.querySelectorAll(selector)[1]);
  });

  if (supportsResetTarget) {
    it('uses the configured destination only for explicit resets, not preservation', () => {
      const { container, rerender, getByTestId } = render(
        <>
          <button data-testid="outside">Outside</button>
          {renderChart(10, 'red', undefined, true)}
        </>,
      );
      const target = container.querySelectorAll<SVGElement>(selector)[1];
      act(() => target.focus());
      rerender(
        <>
          <button data-testid="outside">Outside</button>
          {renderChart(15, 'red', undefined, true)}
        </>,
      );
      expect(container.ownerDocument.activeElement).toBe(container.querySelectorAll(selector)[1]);
      act(() => getByTestId('outside').focus());
      rerender(
        <>
          <button data-testid="outside">Outside</button>
          {renderChart(16, 'red', undefined, true)}
        </>,
      );
      expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
      rerender(
        <>
          <button data-testid="outside">Outside</button>
          {renderChart(17, 'red', 'reset', true)}
        </>,
      );
      expect(container.ownerDocument.activeElement).toBe(container.querySelectorAll(selector)[0]);
    });
  }

  if (hasLegend) {
    it('does not move focus from a legend on a background content change', () => {
      const { container, rerender } = render(scene(10));
      act(() => container.querySelectorAll<SVGElement>(selector)[1].focus());
      const legend = container.querySelector<HTMLButtonElement>('button[role="option"]');
      expect(legend).not.toBeNull();
      act(() => legend!.focus());

      rerender(scene(15, 'blue'));
      expect(container.ownerDocument.activeElement).toBe(legend);
    });
  }
});

describe('chart focus ownership lifecycle', () => {
  const TestChart = ({
    version,
    restore = true,
    blurOnDetach = false,
    policy,
  }: {
    version: number;
    restore?: boolean;
    blurOnDetach?: boolean;
    policy?: FocusRestorePolicy;
  }) => {
    const target = React.useRef<HTMLButtonElement>(null);
    const shouldRestoreFocus = useChartFocusRestore(element => element === target.current);
    React.useEffect(() => {
      const shouldRestore = shouldRestoreFocus(policy);
      if (restore && shouldRestore) {
        target.current?.focus();
      }
    }, [version, restore, policy, shouldRestoreFocus]);
    return (
      <button
        key={version}
        ref={element => {
          if (!element && blurOnDetach && target.current?.isConnected) {
            target.current.blur();
          }
          target.current = element;
        }}
      >
        Chart target
      </button>
    );
  };

  it('recovers a target remounted by the current update', () => {
    const { getByRole, rerender } = render(<TestChart version={0} />);
    const previousTarget = getByRole('button');
    act(() => previousTarget.focus());
    rerender(<TestChart version={1} />);
    expect(previousTarget.isConnected).toBe(false);
    expect(previousTarget.ownerDocument.activeElement).toBe(getByRole('button'));
  });

  it.each([undefined, 'preserve', 'reset', 'none'] as const)(
    'handles native-style blur before detachment (policy: %s)',
    policy => {
      const { getByRole, rerender } = render(<TestChart version={0} blurOnDetach policy={policy} />);
      const previousTarget = getByRole('button');
      const connectedOnFocusOut: boolean[] = [];
      previousTarget.addEventListener('focusout', () => connectedOnFocusOut.push(previousTarget.isConnected));
      act(() => previousTarget.focus());

      rerender(<TestChart version={1} blurOnDetach policy={policy} />);

      expect(connectedOnFocusOut).toEqual([true]);
      expect(previousTarget.isConnected).toBe(false);
      expect(previousTarget.ownerDocument.activeElement).toBe(
        policy === 'none' ? previousTarget.ownerDocument.body : getByRole('button'),
      );
    },
  );

  it('does not recover a target deliberately blurred before remounting', () => {
    const { getByRole, rerender } = render(<TestChart version={0} />);
    const previousTarget = getByRole('button');
    act(() => previousTarget.focus());
    act(() => previousTarget.blur());
    rerender(<TestChart version={1} />);
    expect(previousTarget.ownerDocument.activeElement).toBe(previousTarget.ownerDocument.body);
  });

  it('does not reclaim focus lost in an earlier update', () => {
    const { getByRole, rerender } = render(<TestChart version={0} />);
    act(() => getByRole('button').focus());
    rerender(<TestChart version={1} restore={false} />);
    rerender(<TestChart version={2} />);
    expect(getByRole('button').ownerDocument.activeElement).toBe(getByRole('button').ownerDocument.body);
  });
});
