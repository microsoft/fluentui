import { screen, fireEvent } from '@testing-library/react';
import { getByClass, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { ScatterChart } from './ScatterChart';
import { toHaveNoViolations } from 'jest-axe';
import { ChartProps } from '../../ScatterChart';
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

function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.HTMLElement.prototype.getBoundingClientRect = () =>
    ({
      bottom: 44,
      height: 50,
      left: 10,
      right: 35.67,
      top: 20,
      width: 650,
    } as DOMRect);
}
function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
}

describe('Scatter chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait('Should render the Scatter chart properly', ScatterChart, { data: chartData }, container => {
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('ScatterChart- Subcomponent Legends', () => {
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
