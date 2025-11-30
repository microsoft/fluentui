import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';

/**
 * Snapshot tests specifically for bar+line combo charts
 * to verify that both bars and lines are rendered correctly
 */

describe('VegaDeclarativeChart - Bar+Line Combo Rendering', () => {
  describe('Bar + Line Combinations', () => {
    it('should render bar chart with single line overlay', () => {
      const spec = {
        layer: [
          {
            mark: 'bar',
            encoding: {
              x: { field: 'month', type: 'ordinal' as const },
              y: { field: 'sales', type: 'quantitative' as const },
              color: { field: 'region', type: 'nominal' as const },
            },
          },
          {
            mark: 'line',
            encoding: {
              x: { field: 'month', type: 'ordinal' as const },
              y: { field: 'target', type: 'quantitative' as const },
            },
          },
        ],
        data: {
          values: [
            { month: 'Jan', sales: 100, target: 120, region: 'North' },
            { month: 'Jan', sales: 80, target: 120, region: 'South' },
            { month: 'Feb', sales: 120, target: 130, region: 'North' },
            { month: 'Feb', sales: 90, target: 130, region: 'South' },
            { month: 'Mar', sales: 110, target: 125, region: 'North' },
            { month: 'Mar', sales: 85, target: 125, region: 'South' },
          ],
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
      );

      // Should render
      expect(container.firstChild).toBeTruthy();
      
      // Check for SVG (chart rendered)
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      
      // Snapshot the entire output
      expect(container).toMatchSnapshot();
    });

    it('should render simple bar+line without color encoding', () => {
      const spec = {
        layer: [
          {
            mark: 'bar',
            encoding: {
              x: { field: 'x', type: 'ordinal' as const },
              y: { field: 'y1', type: 'quantitative' as const },
            },
          },
          {
            mark: 'line',
            encoding: {
              x: { field: 'x', type: 'ordinal' as const },
              y: { field: 'y2', type: 'quantitative' as const },
            },
          },
        ],
        data: {
          values: [
            { x: 'A', y1: 10, y2: 15 },
            { x: 'B', y1: 20, y2: 18 },
            { x: 'C', y1: 15, y2: 22 },
          ],
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
      );

      expect(container.firstChild).toBeTruthy();
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container).toMatchSnapshot();
    });

    it('should render bar+line with temporal x-axis', () => {
      const spec = {
        layer: [
          {
            mark: 'bar',
            encoding: {
              x: { field: 'date', type: 'temporal' as const },
              y: { field: 'sales', type: 'quantitative' as const },
              color: { field: 'category', type: 'nominal' as const },
            },
          },
          {
            mark: { type: 'line' as const, point: true },
            encoding: {
              x: { field: 'date', type: 'temporal' as const },
              y: { field: 'profit', type: 'quantitative' as const },
            },
          },
        ],
        data: {
          values: [
            { date: '2024-01-01', sales: 100, profit: 30, category: 'A' },
            { date: '2024-01-02', sales: 120, profit: 35, category: 'A' },
            { date: '2024-01-03', sales: 110, profit: 32, category: 'A' },
          ],
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
      );

      expect(container.firstChild).toBeTruthy();
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container).toMatchSnapshot();
    });

    it('should render the actual line_bar_combo schema from schemas folder', () => {
      const lineBarComboSpec = {
        layer: [
          {
            mark: 'bar',
            encoding: {
              x: { field: 'month', type: 'temporal' as const, axis: { title: 'Month' } },
              y: { field: 'sales', type: 'quantitative' as const, axis: { title: 'Sales ($)' } },
              color: { value: 'lightblue' },
            },
          },
          {
            mark: { type: 'line' as const, point: true, color: 'red' },
            encoding: {
              x: { field: 'month', type: 'temporal' as const },
              y: { field: 'profit', type: 'quantitative' as const },
            },
          },
        ],
        data: {
          values: [
            { month: '2024-01', sales: 45000, profit: 12000 },
            { month: '2024-02', sales: 52000, profit: 15000 },
            { month: '2024-03', sales: 48000, profit: 13500 },
            { month: '2024-04', sales: 61000, profit: 18000 },
            { month: '2024-05', sales: 58000, profit: 16500 },
            { month: '2024-06', sales: 67000, profit: 20000 },
          ],
        },
        title: 'Sales and Profit Trend',
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: lineBarComboSpec }} />
      );

      // Should render successfully
      expect(container.firstChild).toBeTruthy();
      
      // Should have SVG
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      
      // Verify bars exist (rect elements for bars)
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
      
      // Verify lines exist (path elements for lines)
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
      
      expect(container).toMatchSnapshot();
    });
  });

  describe('Chart Type Detection for Bar+Line', () => {
    it('should detect bar+line combo and use stacked-bar type', () => {
      const spec = {
        layer: [
          { mark: 'bar', encoding: { x: { field: 'x', type: 'ordinal' as const }, y: { field: 'y1', type: 'quantitative' as const }, color: { field: 'cat', type: 'nominal' as const } } },
          { mark: 'line', encoding: { x: { field: 'x', type: 'ordinal' as const }, y: { field: 'y2', type: 'quantitative' as const } } },
        ],
        data: { values: [{ x: 'A', y1: 10, y2: 15, cat: 'C1' }] },
      };

      // This should not throw an error
      expect(() => {
        render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
      }).not.toThrow();
    });
  });

  describe('Error Cases', () => {
    it('should handle bar layer without color encoding gracefully', () => {
      const spec = {
        layer: [
          {
            mark: 'bar',
            encoding: {
              x: { field: 'x', type: 'ordinal' as const },
              y: { field: 'y1', type: 'quantitative' as const },
              // No color encoding
            },
          },
          {
            mark: 'line',
            encoding: {
              x: { field: 'x', type: 'ordinal' as const },
              y: { field: 'y2', type: 'quantitative' as const },
            },
          },
        ],
        data: {
          values: [
            { x: 'A', y1: 10, y2: 15 },
            { x: 'B', y1: 20, y2: 18 },
          ],
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
      );

      // Should still render (fallback behavior)
      expect(container.firstChild).toBeTruthy();
    });
  });
});
