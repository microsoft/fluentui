import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';
import type { VegaDeclarativeChartProps } from './VegaDeclarativeChart';

// Suppress console warnings for cleaner test output
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('VegaDeclarativeChart - Financial Ratios Heatmap', () => {
  it('should render financial ratios heatmap without errors', () => {
    const financialRatiosSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Financial ratios comparison',
      data: {
        values: [
          { company: 'Company A', ratio: 'Current Ratio', value: 2.1 },
          { company: 'Company A', ratio: 'Quick Ratio', value: 1.5 },
          { company: 'Company A', ratio: 'Debt-to-Equity', value: 0.8 },
          { company: 'Company A', ratio: 'ROE', value: 15.2 },
          { company: 'Company B', ratio: 'Current Ratio', value: 1.8 },
          { company: 'Company B', ratio: 'Quick Ratio', value: 1.2 },
          { company: 'Company B', ratio: 'Debt-to-Equity', value: 1.3 },
          { company: 'Company B', ratio: 'ROE', value: 12.7 },
          { company: 'Company C', ratio: 'Current Ratio', value: 2.5 },
          { company: 'Company C', ratio: 'Quick Ratio', value: 1.9 },
          { company: 'Company C', ratio: 'Debt-to-Equity', value: 0.5 },
          { company: 'Company C', ratio: 'ROE', value: 18.5 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'company', type: 'nominal', axis: { title: 'Company' } },
        y: { field: 'ratio', type: 'nominal', axis: { title: 'Financial Ratio' } },
        color: {
          field: 'value',
          type: 'quantitative',
          scale: { scheme: 'viridis' },
          legend: { title: 'Value' },
        },
        tooltip: [
          { field: 'company', type: 'nominal' },
          { field: 'ratio', type: 'nominal' },
          { field: 'value', type: 'quantitative', format: '.1f' },
        ],
      },
      title: 'Financial Ratios Heatmap',
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: financialRatiosSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verify heatmap rectangles are rendered (should have 12 data points)
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });
});
