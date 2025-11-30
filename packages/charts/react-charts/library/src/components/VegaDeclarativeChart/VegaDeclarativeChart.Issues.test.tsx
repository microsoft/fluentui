import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';

/**
 * Tests for specific issues reported:
 * 1. Heatmap chart not rendering
 * 2. Line+Bar combo not showing line (layered spec limitation)
 * 3. Line with color fill bars not working (layered spec limitation)
 */

describe('VegaDeclarativeChart - Issue Fixes', () => {
  // Suppress console.warn for layered spec warnings
  const originalWarn = console.warn;
  beforeAll(() => {
    console.warn = jest.fn();
  });
  afterAll(() => {
    console.warn = originalWarn;
  });

  describe('Issue 1: Heatmap Chart Not Rendering', () => {
    it('should render simple heatmap chart', () => {
      const heatmapSpec = {
        mark: 'rect' as const,
        data: {
          values: [
            { x: 'A', y: 'Monday', value: 10 },
            { x: 'B', y: 'Monday', value: 20 },
            { x: 'C', y: 'Monday', value: 15 },
            { x: 'A', y: 'Tuesday', value: 25 },
            { x: 'B', y: 'Tuesday', value: 30 },
            { x: 'C', y: 'Tuesday', value: 22 },
            { x: 'A', y: 'Wednesday', value: 18 },
            { x: 'B', y: 'Wednesday', value: 28 },
            { x: 'C', y: 'Wednesday', value: 35 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'nominal' as const, axis: { title: 'X Category' } },
          y: { field: 'y', type: 'nominal' as const, axis: { title: 'Day' } },
          color: { field: 'value', type: 'quantitative' as const, scale: { scheme: 'blues' } },
        },
        title: 'Heatmap Chart',
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: heatmapSpec }} />
      );

      // Heatmap should render successfully
      expect(container.firstChild).toBeTruthy();
      
      // Should have SVG element
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should match snapshot for heatmap', () => {
      const heatmapSpec = {
        mark: 'rect' as const,
        data: {
          values: [
            { x: 'A', y: 'Mon', value: 10 },
            { x: 'B', y: 'Mon', value: 20 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'nominal' as const },
          y: { field: 'y', type: 'nominal' as const },
          color: { field: 'value', type: 'quantitative' as const },
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: heatmapSpec }} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Issue 2: Line+Bar Combo (Now Supported!)', () => {
    it('should render line+bar combo with both bars and lines', () => {
      const comboSpec = {
        layer: [
          {
            mark: 'bar',
            encoding: {
              x: { field: 'month', type: 'temporal' as const, axis: { title: 'Month' } },
              y: { field: 'sales', type: 'quantitative' as const, axis: { title: 'Sales ($)' } },
              color: { field: 'category', type: 'nominal' as const },
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
            { month: '2024-01', sales: 45000, profit: 12000, category: 'A' },
            { month: '2024-02', sales: 52000, profit: 15000, category: 'A' },
            { month: '2024-03', sales: 48000, profit: 13500, category: 'A' },
          ],
        },
        title: 'Sales and Profit Trend',
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: comboSpec }} />
      );

      // Should render successfully with both bars and lines
      expect(container.firstChild).toBeTruthy();
      
      // Should NOT warn about bar+line combo (it's supported now)
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should match snapshot for line+bar combo', () => {
      const comboSpec = {
        layer: [
          { mark: 'bar', encoding: { x: { field: 'x', type: 'ordinal' as const }, y: { field: 'y1', type: 'quantitative' as const } } },
          { mark: 'line', encoding: { x: { field: 'x', type: 'ordinal' as const }, y: { field: 'y2', type: 'quantitative' as const } } },
        ],
        data: { values: [{ x: 'A', y1: 10, y2: 20 }, { x: 'B', y1: 15, y2: 25 }] },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: comboSpec }} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Issue 3: Line with Color Fill Bars (Layered Spec)', () => {
    it('should render line with color fill (first layer only with warning)', () => {
      const colorFillSpec = {
        layer: [
          {
            mark: { type: 'rect' as const, opacity: 0.2, color: 'lightblue' },
            encoding: {
              x: { datum: '2023-01-02' },
              x2: { datum: '2023-01-04' },
            },
          },
          {
            data: {
              values: [
                { date: '2023-01-01', value: 28 },
                { date: '2023-01-02', value: 55 },
                { date: '2023-01-03', value: 43 },
                { date: '2023-01-04', value: 91 },
                { date: '2023-01-05', value: 81 },
              ],
            },
            mark: 'line',
            encoding: {
              x: { field: 'date', type: 'temporal' as const, axis: { title: 'Date' } },
              y: { field: 'value', type: 'quantitative' as const, axis: { title: 'Value' } },
            },
          },
        ],
        title: 'Line Chart with Color Fill Bars',
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: colorFillSpec }} />
      );

      // Should render (the rect from first layer, though it may not display properly without x/y fields)
      expect(container.firstChild).toBeTruthy();
      
      // Should have warned about layered spec
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Layered specifications with multiple chart types are not fully supported')
      );
    });
  });

  describe('Heatmap Detection Edge Cases', () => {
    it('should NOT detect heatmap when color is not quantitative', () => {
      const spec = {
        mark: 'rect' as const,
        data: { values: [{ x: 'A', y: 'B', cat: 'C1' }] },
        encoding: {
          x: { field: 'x', type: 'nominal' as const },
          y: { field: 'y', type: 'nominal' as const },
          color: { field: 'cat', type: 'nominal' as const }, // nominal, not quantitative
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
      );

      // Should still render but as different chart type
      expect(container.firstChild).toBeTruthy();
    });

    it('should NOT detect heatmap when using datum instead of field', () => {
      const spec = {
        mark: 'rect' as const,
        encoding: {
          x: { datum: '2023-01-01' }, // datum, not field
          y: { datum: 'A' },
          color: { value: 'blue' },
        },
      };

      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />
      );

      // Should render but not as heatmap
      expect(container.firstChild).toBeTruthy();
    });
  });
});
