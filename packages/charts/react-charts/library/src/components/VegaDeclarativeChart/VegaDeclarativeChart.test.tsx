import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';

describe('VegaDeclarativeChart', () => {
  it('renders with basic line chart spec', () => {
    const spec = {
      mark: 'line',
      data: {
        values: [
          { x: 1, y: 10 },
          { x: 2, y: 20 },
          { x: 3, y: 15 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('renders vertical bar chart', () => {
    const spec = {
      mark: 'bar',
      data: {
        values: [
          { category: 'A', amount: 28 },
          { category: 'B', amount: 55 },
          { category: 'C', amount: 43 },
        ],
      },
      encoding: {
        x: { field: 'category', type: 'nominal' },
        y: { field: 'amount', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('renders stacked bar chart with color encoding', () => {
    const spec = {
      mark: 'bar',
      data: {
        values: [
          { category: 'A', group: 'G1', amount: 28 },
          { category: 'A', group: 'G2', amount: 15 },
          { category: 'B', group: 'G1', amount: 55 },
          { category: 'B', group: 'G2', amount: 20 },
        ],
      },
      encoding: {
        x: { field: 'category', type: 'nominal' },
        y: { field: 'amount', type: 'quantitative' },
        color: { field: 'group', type: 'nominal' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('renders horizontal bar chart', () => {
    const spec = {
      mark: 'bar',
      data: {
        values: [
          { category: 'A', amount: 28 },
          { category: 'B', amount: 55 },
          { category: 'C', amount: 43 },
        ],
      },
      encoding: {
        y: { field: 'category', type: 'nominal' },
        x: { field: 'amount', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('throws error when vegaLiteSpec is missing', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: undefined as any }} />);
    }).toThrow('VegaDeclarativeChart: vegaLiteSpec is required');

    consoleSpy.mockRestore();
  });

  it('handles legend selection', () => {
    const onSchemaChange = jest.fn();
    const spec = {
      mark: 'line',
      data: {
        values: [
          { x: 1, y: 10, category: 'A' },
          { x: 2, y: 20, category: 'B' },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
        color: { field: 'category', type: 'nominal' },
      },
    };

    render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} onSchemaChange={onSchemaChange} />);
    // Legend interaction would be tested in integration tests
  });

  it('renders area chart', () => {
    const spec = {
      mark: 'area',
      data: {
        values: [
          { date: '2023-01', value: 100 },
          { date: '2023-02', value: 150 },
          { date: '2023-03', value: 120 },
        ],
      },
      encoding: {
        x: { field: 'date', type: 'temporal' },
        y: { field: 'value', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('renders scatter chart', () => {
    const spec = {
      mark: 'point',
      data: {
        values: [
          { x: 10, y: 20, size: 100 },
          { x: 15, y: 30, size: 200 },
          { x: 25, y: 15, size: 150 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
        size: { field: 'size', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('renders donut chart', () => {
    const spec = {
      mark: 'arc',
      data: {
        values: [
          { category: 'A', value: 30 },
          { category: 'B', value: 70 },
          { category: 'C', value: 50 },
        ],
      },
      encoding: {
        theta: { field: 'value', type: 'quantitative' },
        color: { field: 'category', type: 'nominal' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });

  it('renders heatmap chart', () => {
    const spec = {
      mark: 'rect',
      data: {
        values: [
          { x: 'A', y: 'Mon', value: 28 },
          { x: 'B', y: 'Mon', value: 55 },
          { x: 'C', y: 'Mon', value: 43 },
          { x: 'A', y: 'Tue', value: 91 },
          { x: 'B', y: 'Tue', value: 81 },
          { x: 'C', y: 'Tue', value: 53 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'nominal' },
        y: { field: 'y', type: 'nominal' },
        color: { field: 'value', type: 'quantitative' },
      },
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
    expect(container).toBeTruthy();
  });
});
