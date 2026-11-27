import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { tokens } from '@fluentui/react-theme';
import { LineChart } from '../../index';
import type { LineChartPoints } from './LineChart.types';

function series(mode?: NonNullable<LineChartPoints['lineOptions']>['mode']): LineChartPoints {
  return {
    legend: 'Requests',
    color: tokens.colorBrandForeground1,
    hideNonActiveDots: false,
    lineOptions: mode ? { mode } : undefined,
    data: [
      { x: 1, y: 12 },
      { x: 2, y: 0 },
      { x: 5, y: 24 },
    ],
  };
}

describe('LineChart last-point pointer targets', () => {
  beforeEach(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 640,
      height: 320,
      top: 0,
      left: 0,
      right: 640,
      bottom: 320,
      x: 0,
      y: 0,
      toJSON: () => ({}),
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

  it.each(['markers', 'lines+markers', 'lines+markers+text', 'text', 'lines+text'] as const)(
    'lets the rendered circle receive pointer events in %s mode',
    async mode => {
      const { container } = render(<LineChart data={{ lineChartData: [series(mode)] }} width={640} height={320} />);
      await waitFor(() => expect(container.querySelectorAll('circle[role="option"]')).toHaveLength(3));
      const marker = container.querySelector('circle[role="option"][id$="L"]')!;
      const latch = container.querySelector('circle[id$="D"]')!;
      expect(latch).toHaveAttribute('pointer-events', 'none');
      expect(latch).toHaveAttribute('r', '8');
      expect(latch).toHaveAttribute('opacity', '0');
      expect(latch).toHaveAttribute('focusable', 'false');
      expect(marker).not.toHaveAttribute('pointer-events', 'none');
      expect(marker).toHaveAttribute('opacity', '1');
      expect(marker).toHaveAttribute('tabindex', '0');
    },
  );

  it.each([undefined, 'lines'] as const)('retains the larger magnetic target for line-only mode %s', async mode => {
    const { container } = render(<LineChart data={{ lineChartData: [series(mode)] }} width={640} height={320} />);
    await waitFor(() => expect(container.querySelectorAll('path[role="option"]')).toHaveLength(3));
    const latch = container.querySelector('circle[id$="D"]')!;
    expect(latch).toHaveAttribute('r', '8');
    expect(latch).toHaveAttribute('opacity', '0');
    expect(latch).not.toHaveAttribute('pointer-events');
    expect(latch).not.toHaveAttribute('tabindex');
  });

  it('chooses pointer behavior per series rather than the chart-wide markers flag', async () => {
    const { container } = render(
      <LineChart
        data={{ lineChartData: [series('lines+markers'), { ...series('lines'), legend: 'Line only' }] }}
        width={640}
        height={320}
      />,
    );
    await waitFor(() => expect(container.querySelectorAll('circle[id$="D"]')).toHaveLength(2));
    const markersSeries = screen.getByRole('listbox', { name: 'Requests, line 1 of 2 with 3 data points.' });
    const lineOnlySeries = screen.getByRole('listbox', { name: 'Line only, line 2 of 2 with 3 data points.' });
    expect(markersSeries.querySelector('circle[id$="D"]')).toHaveAttribute('pointer-events', 'none');
    expect(lineOnlySeries.querySelector('circle[id$="D"]')).not.toHaveAttribute('pointer-events');
  });

  it.each(['hover', 'focus'] as const)(
    'preserves the final marker stack callback on %s and point click',
    async action => {
      const onDataPointClick = jest.fn();
      const data = series('lines+markers');
      data.data[2].onDataPointClick = onDataPointClick;
      const onRenderCalloutPerStack = jest.fn(point => <div data-testid="last-point-callout">{point?.x}</div>);
      const { container } = render(
        <LineChart
          data={{ lineChartData: [data] }}
          width={640}
          height={320}
          onRenderCalloutPerStack={onRenderCalloutPerStack}
        />,
      );
      await waitFor(() => expect(container.querySelectorAll('circle[role="option"]')).toHaveLength(3));
      const marker = container.querySelector('circle[role="option"][id$="L"]')!;
      if (action === 'hover') {
        fireEvent.mouseOver(marker);
      } else {
        fireEvent.focus(marker);
      }
      await waitFor(() => expect(screen.getByTestId('last-point-callout')).toHaveTextContent('5'));
      expect(onRenderCalloutPerStack).toHaveBeenLastCalledWith(
        expect.objectContaining({ x: 5, values: [expect.objectContaining({ y: 24, legend: 'Requests' })] }),
      );
      fireEvent.click(marker);
      expect(onDataPointClick).toHaveBeenCalledTimes(1);
    },
  );

  it('preserves line-only latch hover and the final path focus callback', async () => {
    const onRenderCalloutPerStack = jest.fn(point => <div data-testid="line-only-callout">{point?.x}</div>);
    const { container } = render(
      <LineChart
        data={{ lineChartData: [series()] }}
        width={640}
        height={320}
        onRenderCalloutPerStack={onRenderCalloutPerStack}
      />,
    );
    await waitFor(() => expect(container.querySelectorAll('path[role="option"]')).toHaveLength(3));
    fireEvent.mouseOver(container.querySelector('circle[id$="D"]')!);
    await waitFor(() => expect(screen.getByTestId('line-only-callout')).toHaveTextContent('5'));
    fireEvent.focus(container.querySelector('path[role="option"][id$="L"]')!);
    expect(onRenderCalloutPerStack).toHaveBeenLastCalledWith(
      expect.objectContaining({ x: 5, values: [expect.objectContaining({ y: 24 })] }),
    );
  });
});
