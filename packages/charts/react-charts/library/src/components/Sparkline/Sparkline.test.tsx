import { act, queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { ChartProps, Sparkline } from './index';

expect.extend(toHaveNoViolations);

const sparkline1Points: ChartProps = {
  chartTitle: '10.21',
  lineChartData: [
    {
      legend: '19.64',
      color: '#00AA00',
      data: [
        {
          x: 1,
          y: 58.13,
        },
        {
          x: 2,
          y: 140.98,
        },
        {
          x: 3,
          y: 20,
        },
        {
          x: 4,
          y: 89.7,
        },
        {
          x: 5,
          y: 99,
        },
        {
          x: 6,
          y: 13.28,
        },
        {
          x: 7,
          y: 31.32,
        },
        {
          x: 8,
          y: 10.21,
        },
      ],
    },
  ],
};

const sparkline2Points: ChartProps = {
  chartTitle: '49.44',
  lineChartData: [
    {
      legend: '131.33',
      color: '#E60000',
      data: [
        {
          x: 1,
          y: 29.13,
        },
        {
          x: 2,
          y: 70.98,
        },
        {
          x: 3,
          y: 60,
        },
        {
          x: 4,
          y: 89.7,
        },
        {
          x: 5,
          y: 19,
        },
        {
          x: 6,
          y: 49.44,
        },
      ],
    },
  ],
};

export const emptySparklinePoints: ChartProps = {
  chartTitle: 'Empty sparkline chart',
  lineChartData: [
    {
      legend: '19.64',
      color: '#00AA00',
      data: [],
    },
  ],
};

describe('Sparkline chart rendering', () => {
  test('Should re-render the Sparkline chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<Sparkline data={emptySparklinePoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SparklineChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<Sparkline data={sparkline1Points} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SparklineChart_empty/i)).toHaveLength(0);
    });
  });
});

describe('Sparkline Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<Sparkline data={sparkline1Points} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

describe('Sparkline snapShot testing', () => {
  it('renders Sparkline correctly', () => {
    const { container } = render(<Sparkline data={sparkline1Points} showLegend={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Sparkline correctly with no legend', () => {
    const { container } = render(<Sparkline data={sparkline2Points} showLegend={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<Sparkline data={sparkline1Points} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let wrapper = render(<Sparkline data={emptySparklinePoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('Sparkline dimension props', () => {
  it('should apply custom width prop to SVG element', () => {
    const customWidth = 150;
    const { container } = render(<Sparkline data={sparkline1Points} width={customWidth} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', customWidth.toString());
  });

  it('should apply custom height prop to SVG element', () => {
    const customHeight = 40;
    const { container } = render(<Sparkline data={sparkline1Points} height={customHeight} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', customHeight.toString());
  });

  it('should apply custom valueTextWidth prop to legend SVG', () => {
    const customValueTextWidth = 120;
    const { container } = render(
      <Sparkline data={sparkline1Points} showLegend={true} valueTextWidth={customValueTextWidth} />,
    );
    const svgElements = container.querySelectorAll('svg');
    // Second SVG is the legend text
    expect(svgElements[1]).toHaveAttribute('width', customValueTextWidth.toString());
  });
});
