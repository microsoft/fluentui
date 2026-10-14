import * as React from 'react';
import { screen, fireEvent, render, within } from '@testing-library/react';
import { getByClass, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { ScatterChart } from '../../index';
import type { CustomizedCalloutData } from '../../index';
import type { ScatterChartProps } from './ScatterChart.types';
import { toHaveNoViolations } from 'jest-axe';
import type { ChartProps } from '../../ScatterChart';
expect.extend(toHaveNoViolations);

const chartData: ChartProps = {
  chartTitle: 'Sales Performance by Category',
  scatterChartData: [
    {
      legend: 'Region 1',
      data: [
        {
          x: 'Electronics',
          y: 50000, // Revenue in dollars
          markerSize: 25, // Units sold
        },
        {
          x: 'Furniture',
          y: 30000,
          markerSize: 20,
        },
        {
          x: 'Clothing',
          y: 20000,
          markerSize: 15,
        },
        {
          x: 'Toys',
          y: 15000,
          markerSize: 10,
        },
        {
          x: 'Books',
          y: 10000,
          markerSize: 8,
        },
      ],
      color: '#0078d4',
    },
    {
      legend: 'Region 2',
      data: [
        {
          x: 'Electronics',
          y: 60000,
          markerSize: 30,
        },
        {
          x: 'Furniture',
          y: 25000,
          markerSize: 18,
        },
        {
          x: 'Clothing',
          y: 22000,
          markerSize: 16,
        },
        {
          x: 'Toys',
          y: 12000,
          markerSize: 12,
        },
        {
          x: 'Books',
          y: 8000,
          markerSize: 6,
        },
      ],
      color: '#00bcf2',
    },
  ],
};

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = class ResizeObserver {
    public observe() {
      // do nothing
    }
    public unobserve() {
      // do nothing
    }
    public disconnect() {
      // do nothing
    }
  };
});

const originalRAF = window.requestAnimationFrame;
const originalGetComputedStyle = window.getComputedStyle;
const originalGetBoundingClientRect = window.HTMLElement.prototype.getBoundingClientRect;

function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.HTMLElement.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
    bottom: 44,
    height: 50,
    left: 10,
    right: 35.67,
    top: 20,
    width: 650,
    x: 10,
    y: 20,
  } as DOMRect);
  window.getComputedStyle = jest.fn().mockImplementation(element => {
    const style = originalGetComputedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (prop: string) => {
        if (prop === 'margin-top' || prop === 'margin-bottom') {
          return '0px';
        }
        return style.getPropertyValue(prop);
      },
    } as CSSStyleDeclaration;
  });
}

function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
  window.HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  window.getComputedStyle = originalGetComputedStyle;
}

describe('Scatter chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait('Should render the Scatter chart properly', ScatterChart, { data: chartData }, container => {
    // Assert
    expect(container).toMatchSnapshot();
  });

  testWithoutWait(
    'Should render when a legend is "__proto__"',
    ScatterChart,
    {
      data: {
        chartTitle: 'Prototype pollution regression',
        scatterChartData: [
          {
            legend: '__proto__',
            data: [{ x: 'Category', y: 10, markerSize: 5 }],
            color: '#0078d4',
          },
        ],
      },
    },
    () => {
      expect(screen.getByText('__proto__')).toBeInTheDocument();
    },
  );
});

describe('ScatterChart custom callout public contracts', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  // Native props shaped like the filtered-tooltip-newlines adapter output. Only
  // the declared Note and Amount fields belong in the custom callout.
  const rows = [
    { x: 1, y: 4, note: 'line one\nline two' },
    { x: 3, y: 6, note: 'backup\nsecond line' },
  ];
  const data: ChartProps = {
    scatterChartData: [
      {
        legend: 'default',
        data: rows.map(row => ({
          x: row.x,
          y: row.y,
          xAxisCalloutData: 'PRIVATE_X_CALLOUT',
          yAxisCalloutData: 'PRIVATE_CORPUS_VALUE',
          callOutAccessibilityData: { ariaLabel: `Note: ${row.note}; Amount: ${row.y.toFixed(1)}` },
        })),
      },
    ],
  };

  function interact(point: Element, interaction: 'hover' | 'focus') {
    if (interaction === 'hover') {
      fireEvent.mouseOver(point, { clientX: 120, clientY: 80 });
    } else {
      fireEvent.focus(point);
    }
  }

  function semanticCallout(input?: CustomizedCalloutData) {
    const row = rows.find(candidate => candidate.x === input?.x && input.values.some(value => value.y === candidate.y));
    return row ? (
      <dl role="tooltip">
        <dt>Note</dt>
        <dd>{row.note}</dd>
        <dt>Amount</dt>
        <dd>{row.y.toFixed(1)}</dd>
      </dl>
    ) : null;
  }

  it.each(['hover', 'focus'] as const)('renders only declared fields on %s with both adapter hooks', interaction => {
    const onRenderCalloutPerDataPoint = jest.fn(semanticCallout);
    const onRenderCalloutPerStack = jest.fn(semanticCallout);
    const props: ScatterChartProps = { data, onRenderCalloutPerDataPoint, onRenderCalloutPerStack };
    const { container } = render(<ScatterChart {...props} />);
    const points = container.querySelectorAll('circle[role="option"]');
    expect(points).toHaveLength(2);

    for (let index = 0; index < points.length; index++) {
      interact(points[index], interaction);
      const tooltip = screen.getByRole('tooltip');
      expect(
        within(tooltip)
          .getAllByRole('term')
          .map(term => term.textContent),
      ).toEqual(['Note', 'Amount']);
      expect(
        within(tooltip)
          .getAllByRole('definition')
          .map(value => value.textContent),
      ).toEqual([rows[index].note, rows[index].y.toFixed(1)]);
      const surface = container.querySelector('.fui-PopoverSurface');
      expect(surface).toContainElement(tooltip);
      expect(surface!.textContent).toBe(tooltip.textContent);
      expect(surface).not.toHaveTextContent('PRIVATE_CORPUS_VALUE');
      expect(surface).not.toHaveTextContent('PRIVATE_X_CALLOUT');
      expect(onRenderCalloutPerStack).toHaveBeenLastCalledWith(
        expect.objectContaining({
          x: rows[index].x,
          values: [expect.objectContaining({ y: rows[index].y, legend: 'default' })],
        }),
      );
    }
    expect(onRenderCalloutPerDataPoint).not.toHaveBeenCalled();
  });

  const sharedXData: ChartProps = {
    scatterChartData: [
      {
        legend: 'first',
        data: [
          { x: 2, y: 4 },
          { x: 2, y: 8 },
        ],
      },
      { legend: 'second', data: [{ x: 2, y: 4 }] },
    ],
  };

  it.each(['hover', 'focus'] as const)(
    'passes only the selected x/y/legend to the point renderer on %s',
    interaction => {
      const onRenderCalloutPerDataPoint = jest.fn((input?: CustomizedCalloutData) =>
        input ? <div role="tooltip">{input.values.map(value => `${value.legend}: ${value.y}`).join('; ')}</div> : null,
      );
      const { container } = render(
        <ScatterChart data={sharedXData} onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} />,
      );
      const points = container.querySelectorAll('circle[role="option"]');
      const expected = [
        { legend: 'second', y: 4 },
        { legend: 'first', y: 4 },
        { legend: 'first', y: 8 },
      ];
      expect(points).toHaveLength(expected.length);

      points.forEach((point, index) => {
        interact(point, interaction);
        expect(onRenderCalloutPerDataPoint).toHaveBeenLastCalledWith(
          expect.objectContaining({ x: 2, values: [expect.objectContaining(expected[index])] }),
        );
        expect(screen.getByRole('tooltip')).toHaveTextContent(`${expected[index].legend}: ${expected[index].y}`);
      });
    },
  );

  it.each(['hover', 'focus'] as const)('passes all points at x to the stack renderer on %s', interaction => {
    const onRenderCalloutPerStack = jest.fn((input?: CustomizedCalloutData) =>
      input ? <div role="tooltip">{input.values.map(value => `${value.legend}: ${value.y}`).join('; ')}</div> : null,
    );
    const { container } = render(<ScatterChart data={sharedXData} onRenderCalloutPerStack={onRenderCalloutPerStack} />);
    interact(container.querySelector('circle[role="option"]')!, interaction);
    expect(onRenderCalloutPerStack).toHaveBeenLastCalledWith(
      expect.objectContaining({
        x: 2,
        values: [
          expect.objectContaining({ legend: 'first', y: 4 }),
          expect.objectContaining({ legend: 'first', y: 8 }),
          expect.objectContaining({ legend: 'second', y: 4 }),
        ],
      }),
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('first: 4; first: 8; second: 4');
  });

  it.each(['hover', 'focus'] as const)('suppresses native content when a renderer returns null on %s', interaction => {
    const onRenderCalloutPerDataPoint = jest.fn(() => null);
    const { container } = render(
      <ScatterChart data={data} onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} />,
    );
    onRenderCalloutPerDataPoint.mockClear();
    interact(container.querySelector('circle[role="option"]')!, interaction);
    expect(onRenderCalloutPerDataPoint).toHaveBeenCalledWith(
      expect.objectContaining({ x: 1, values: [expect.objectContaining({ legend: 'default', y: 4 })] }),
    );
    expect(container.querySelector('.fui-PopoverSurface')).not.toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(screen.queryByText('PRIVATE_CORPUS_VALUE')).not.toBeInTheDocument();
  });

  it.each(['hover', 'focus'] as const)(
    'suppresses the point hook when the stack hook returns null on %s',
    interaction => {
      const onRenderCalloutPerDataPoint = jest.fn(semanticCallout);
      const onRenderCalloutPerStack = jest.fn(() => null);
      const { container } = render(
        <ScatterChart
          data={data}
          onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint}
          onRenderCalloutPerStack={onRenderCalloutPerStack}
        />,
      );
      onRenderCalloutPerDataPoint.mockClear();
      onRenderCalloutPerStack.mockClear();
      interact(container.querySelector('circle[role="option"]')!, interaction);
      expect(onRenderCalloutPerStack).toHaveBeenCalledWith(
        expect.objectContaining({ x: 1, values: [expect.objectContaining({ legend: 'default', y: 4 })] }),
      );
      expect(onRenderCalloutPerDataPoint).not.toHaveBeenCalled();
      expect(container.querySelector('.fui-PopoverSurface')).not.toBeInTheDocument();
    },
  );

  it.each(['hover', 'focus'] as const)(
    'preserves the native default callout without render hooks on %s',
    interaction => {
      const { container } = render(<ScatterChart data={data} />);
      interact(container.querySelector('circle[role="option"]')!, interaction);
      const surface = container.querySelector('.fui-PopoverSurface');
      expect(surface).toBeInTheDocument();
      expect(surface).toHaveTextContent('PRIVATE_X_CALLOUT');
      expect(surface).toHaveTextContent('PRIVATE_CORPUS_VALUE');
    },
  );

  it.each(['hover', 'focus'] as const)('respects hideTooltip with custom render hooks on %s', interaction => {
    const onRenderCalloutPerDataPoint = jest.fn(semanticCallout);
    const { container } = render(
      <ScatterChart data={data} onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} hideTooltip />,
    );
    interact(container.querySelector('circle[role="option"]')!, interaction);
    expect(container.querySelector('.fui-PopoverSurface')).not.toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('ScatterChart- Subcomponent Legends', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    ScatterChart,
    { data: chartData, hideLegend: true },
    container => {
      // Assert
      // Legends have 'rect' as a part of their classname
      expect(getByClass(container, /legend/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should select legend on single mouse click on legends',
    ScatterChart,
    { data: chartData },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![1]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'true');
    },
  );

  testWithWait(
    'Should deselect legend on double mouse click on legends',
    ScatterChart,
    { data: chartData },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![1]);
      fireEvent.click(legends![1]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithWait(
    'Should reduce the opacity of the other circles on mouse over a legend',
    ScatterChart,
    { data: chartData },
    async container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends[0]);
      await new Promise(resolve => setTimeout(resolve));
      const circles = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      // Assert
      expect(circles).toHaveLength(10);
      expect(circles[0]).toHaveAttribute('opacity', '0.1');
      expect(circles[1]).toHaveAttribute('opacity', '0.1');
      expect(circles[2]).toHaveAttribute('opacity', '0.1');
      expect(circles[3]).toHaveAttribute('opacity', '0.1');
      expect(circles[4]).toHaveAttribute('opacity', '0.1');
      expect(circles[5]).toHaveAttribute('opacity', '1');
      expect(circles[6]).toHaveAttribute('opacity', '1');
      expect(circles[7]).toHaveAttribute('opacity', '1');
      expect(circles[8]).toHaveAttribute('opacity', '1');
      expect(circles[9]).toHaveAttribute('opacity', '1');
    },
  );

  testWithWait(
    'Should update fill color of circles on mouse over on a circle',
    ScatterChart,
    { data: chartData },
    async container => {
      const circles = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      fireEvent.mouseOver(circles[0]);
      await new Promise(resolve => setTimeout(resolve));
      // Assert
      expect(circles).toHaveLength(10);
      expect(circles[0]).toHaveAttribute('fill', 'var(--colorNeutralBackground1)');
      expect(circles[1]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[2]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[3]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[4]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[5]).toHaveAttribute('fill', '#0078d4');
      expect(circles[6]).toHaveAttribute('fill', '#0078d4');
      expect(circles[7]).toHaveAttribute('fill', '#0078d4');
      expect(circles[8]).toHaveAttribute('fill', '#0078d4');
      expect(circles[9]).toHaveAttribute('fill', '#0078d4');
    },
  );

  testWithWait(
    'Should reset fill color of circles on mouse over on a circle',
    ScatterChart,
    { data: chartData },
    async container => {
      // Arrange
      const circles = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'circle');
      fireEvent.mouseOver(circles![0]);
      await new Promise(resolve => setTimeout(resolve));
      fireEvent.mouseLeave(circles![0]);
      await new Promise(resolve => setTimeout(resolve));
      // Assert
      expect(circles[0]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[1]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[2]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[3]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[4]).toHaveAttribute('fill', '#00bcf2');
      expect(circles[5]).toHaveAttribute('fill', '#0078d4');
      expect(circles[6]).toHaveAttribute('fill', '#0078d4');
      expect(circles[7]).toHaveAttribute('fill', '#0078d4');
      expect(circles[8]).toHaveAttribute('fill', '#0078d4');
      expect(circles[9]).toHaveAttribute('fill', '#0078d4');
    },
  );
});
