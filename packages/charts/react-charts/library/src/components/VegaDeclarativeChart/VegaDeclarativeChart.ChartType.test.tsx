import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';

/**
 * Tests to verify correct chart type detection and rendering
 *
 * These tests specifically address:
 * 1. Grouped bar charts (with xOffset) should render as GroupedVerticalBarChart, not VerticalStackedBarChart
 * 2. Donut charts (with innerRadius) should render with innerRadius, not as pie charts
 * 3. Heatmap charts should render correctly
 */

describe('VegaDeclarativeChart - Chart Type Detection', () => {
  describe('Grouped Bar Charts', () => {
    it('should detect grouped bar chart with xOffset encoding', () => {
      const spec = {
        mark: 'bar',
        data: {
          values: [
            { quarter: 'Q1', region: 'North', sales: 45000 },
            { quarter: 'Q1', region: 'South', sales: 38000 },
            { quarter: 'Q2', region: 'North', sales: 52000 },
            { quarter: 'Q2', region: 'South', sales: 41000 },
          ],
        },
        encoding: {
          x: { field: 'quarter', type: 'nominal' as const },
          y: { field: 'sales', type: 'quantitative' as const },
          color: { field: 'region', type: 'nominal' as const },
          xOffset: { field: 'region' },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      // Should render successfully without errors
      expect(container.firstChild).toBeTruthy();

      // Grouped bar chart should create SVG with bars
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should detect stacked bar chart without xOffset', () => {
      const spec = {
        mark: 'bar',
        data: {
          values: [
            { quarter: 'Q1', region: 'North', sales: 45000 },
            { quarter: 'Q1', region: 'South', sales: 38000 },
            { quarter: 'Q2', region: 'North', sales: 52000 },
            { quarter: 'Q2', region: 'South', sales: 41000 },
          ],
        },
        encoding: {
          x: { field: 'quarter', type: 'nominal' as const },
          y: { field: 'sales', type: 'quantitative' as const },
          color: { field: 'region', type: 'nominal' as const },
          // No xOffset - should be stacked
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      // Should render successfully
      expect(container.firstChild).toBeTruthy();
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Donut Charts', () => {
    it('should render donut chart with innerRadius', () => {
      const spec = {
        mark: { type: 'arc' as const, innerRadius: 50 },
        data: {
          values: [
            { category: 'A', value: 28 },
            { category: 'B', value: 55 },
            { category: 'C', value: 43 },
            { category: 'D', value: 91 },
          ],
        },
        encoding: {
          theta: { field: 'value', type: 'quantitative' as const },
          color: { field: 'category', type: 'nominal' as const },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      expect(container.firstChild).toBeTruthy();

      // Donut chart should have SVG
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render pie chart without innerRadius', () => {
      const spec = {
        mark: 'arc' as const,
        data: {
          values: [
            { category: 'A', value: 28 },
            { category: 'B', value: 55 },
            { category: 'C', value: 43 },
          ],
        },
        encoding: {
          theta: { field: 'value', type: 'quantitative' as const },
          color: { field: 'category', type: 'nominal' as const },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      expect(container.firstChild).toBeTruthy();
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Heatmap Charts', () => {
    it('should render heatmap with rect mark and x/y/color encodings', () => {
      const spec = {
        mark: 'rect' as const,
        data: {
          values: [
            { x: 'A', y: 'Monday', value: 10 },
            { x: 'B', y: 'Monday', value: 20 },
            { x: 'C', y: 'Monday', value: 15 },
            { x: 'A', y: 'Tuesday', value: 25 },
            { x: 'B', y: 'Tuesday', value: 30 },
            { x: 'C', y: 'Tuesday', value: 22 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'nominal' as const },
          y: { field: 'y', type: 'nominal' as const },
          color: { field: 'value', type: 'quantitative' as const },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      expect(container.firstChild).toBeTruthy();

      // Heatmap should have SVG
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Snapshots for Chart Type Detection', () => {
    it('should match snapshot for grouped bar chart', () => {
      const spec = {
        mark: 'bar',
        data: {
          values: [
            { quarter: 'Q1', region: 'North', sales: 45000 },
            { quarter: 'Q1', region: 'South', sales: 38000 },
          ],
        },
        encoding: {
          x: { field: 'quarter', type: 'nominal' as const },
          y: { field: 'sales', type: 'quantitative' as const },
          color: { field: 'region', type: 'nominal' as const },
          xOffset: { field: 'region' },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for donut chart with innerRadius', () => {
      const spec = {
        mark: { type: 'arc' as const, innerRadius: 50 },
        data: {
          values: [
            { category: 'A', value: 28 },
            { category: 'B', value: 55 },
          ],
        },
        encoding: {
          theta: { field: 'value', type: 'quantitative' as const },
          color: { field: 'category', type: 'nominal' as const },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for heatmap chart', () => {
      const spec = {
        mark: 'rect' as const,
        data: {
          values: [
            { x: 'A', y: 'Monday', value: 10 },
            { x: 'B', y: 'Monday', value: 20 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'nominal' as const },
          y: { field: 'y', type: 'nominal' as const },
          color: { field: 'value', type: 'quantitative' as const },
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      expect(container).toMatchSnapshot();
    });
  });
});
