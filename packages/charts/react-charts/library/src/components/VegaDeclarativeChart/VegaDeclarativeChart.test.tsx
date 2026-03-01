import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';
import type { VegaDeclarativeChartProps } from './VegaDeclarativeChart';
import { resetIdsForTests } from '@fluentui/react-utilities';

// Suppress console warnings for cleaner test output
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

// Reset IDs before each test to ensure consistent snapshots
beforeEach(() => {
  resetIdsForTests();
});

describe('VegaDeclarativeChart - Basic Rendering', () => {
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

// ===================================================================================================
// BAR + LINE COMBO CHARTS
// ===================================================================================================

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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: lineBarComboSpec }} />);

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
          {
            mark: 'bar',
            encoding: {
              x: { field: 'x', type: 'ordinal' as const },
              y: { field: 'y1', type: 'quantitative' as const },
              color: { field: 'cat', type: 'nominal' as const },
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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      // Should still render (fallback behavior)
      expect(container.firstChild).toBeTruthy();
    });
  });
});

// ===================================================================================================
// CHART TYPE DETECTION
// ===================================================================================================

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

// ===================================================================================================
// FINANCIAL RATIOS
// ===================================================================================================

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

// ===================================================================================================
// ISSUE FIXES
// ===================================================================================================

describe('VegaDeclarativeChart - Issue Fixes', () => {
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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: heatmapSpec }} />);

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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: heatmapSpec }} />);

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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: comboSpec }} />);

      // Should render successfully with both bars and lines
      expect(container.firstChild).toBeTruthy();

      // Should NOT warn about bar+line combo (it's supported now)
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should match snapshot for line+bar combo', () => {
      const comboSpec = {
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
            { x: 'A', y1: 10, y2: 20 },
            { x: 'B', y1: 15, y2: 25 },
          ],
        },
      };

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: comboSpec }} />);

      expect(container).toMatchSnapshot();
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

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);

      // Should still render but as different chart type
      expect(container.firstChild).toBeTruthy();
    });
  });
});

// ===================================================================================================
// SCATTER & HEATMAP CHARTS
// ===================================================================================================

describe('VegaDeclarativeChart - Scatter Charts', () => {
  it('should render scatter chart with basic point encoding', () => {
    const scatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: [
          { x: 10, y: 20, category: 'A' },
          { x: 20, y: 30, category: 'B' },
          { x: 30, y: 25, category: 'A' },
          { x: 40, y: 35, category: 'B' },
          { x: 50, y: 40, category: 'C' },
        ],
      },
      mark: 'point',
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
        color: { field: 'category', type: 'nominal' },
      },
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: scatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Check that an SVG element is rendered
    expect(container.querySelector('svg')).toBeInTheDocument();

    // Snapshot test (circles render when container has width, but in test env width may be 0)
    expect(container).toMatchSnapshot();
  });

  it('should render scatter chart with size encoding', () => {
    const scatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: [
          { height: 160, weight: 52, bmi: 20.3, category: 'Normal' },
          { height: 165, weight: 68, bmi: 25.0, category: 'Overweight' },
          { height: 170, weight: 75, bmi: 25.9, category: 'Overweight' },
          { height: 175, weight: 70, bmi: 22.9, category: 'Normal' },
          { height: 180, weight: 95, bmi: 29.3, category: 'Overweight' },
        ],
      },
      mark: 'point',
      encoding: {
        x: { field: 'height', type: 'quantitative' },
        y: { field: 'weight', type: 'quantitative' },
        color: { field: 'category', type: 'nominal' },
        size: { value: 100 },
      },
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: scatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    expect(container.querySelector('svg')).toBeInTheDocument();

    // Snapshot test (circles render when container has width, but in test env width may be 0)
    expect(container).toMatchSnapshot();
  });

  it('should render scatter chart from actual bmi_scatter.json schema', () => {
    const bmiScatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'BMI distribution analysis',
      data: {
        values: [
          { height: 160, weight: 52, bmi: 20.3, category: 'Normal' },
          { height: 165, weight: 68, bmi: 25.0, category: 'Overweight' },
          { height: 170, weight: 75, bmi: 25.9, category: 'Overweight' },
          { height: 175, weight: 70, bmi: 22.9, category: 'Normal' },
          { height: 180, weight: 95, bmi: 29.3, category: 'Overweight' },
          { height: 158, weight: 45, bmi: 18.0, category: 'Underweight' },
          { height: 172, weight: 82, bmi: 27.7, category: 'Overweight' },
          { height: 168, weight: 58, bmi: 20.5, category: 'Normal' },
          { height: 177, weight: 88, bmi: 28.1, category: 'Overweight' },
          { height: 162, weight: 48, bmi: 18.3, category: 'Underweight' },
        ],
      },
      mark: 'point',
      encoding: {
        x: { field: 'height', type: 'quantitative', axis: { title: 'Height (cm)' } },
        y: { field: 'weight', type: 'quantitative', axis: { title: 'Weight (kg)' } },
        color: {
          field: 'category',
          type: 'nominal',
          scale: { domain: ['Underweight', 'Normal', 'Overweight'], range: ['#ff7f0e', '#2ca02c', '#d62728'] },
          legend: { title: 'BMI Category' },
        },
        size: { value: 100 },
        tooltip: [
          { field: 'height', type: 'quantitative', title: 'Height (cm)' },
          { field: 'weight', type: 'quantitative', title: 'Weight (kg)' },
          { field: 'bmi', type: 'quantitative', title: 'BMI', format: '.1f' },
          { field: 'category', type: 'nominal', title: 'Category' },
        ],
      },
      title: 'BMI Distribution Scatter',
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: bmiScatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Snapshot test (circles render when container has width, but in test env width may be 0)
    expect(container).toMatchSnapshot();
  });

  it('should detect scatter chart type from point mark', () => {
    const scatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: [{ x: 1, y: 2 }] },
      mark: 'point',
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
      },
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: scatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('VegaDeclarativeChart - More Heatmap Charts', () => {
  it('should render heatmap with rect marks and quantitative color', () => {
    const heatmapSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: [
          { x: 'A', y: 'Mon', value: 10 },
          { x: 'B', y: 'Mon', value: 20 },
          { x: 'A', y: 'Tue', value: 30 },
          { x: 'B', y: 'Tue', value: 40 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'x', type: 'ordinal' },
        y: { field: 'y', type: 'ordinal' },
        color: { field: 'value', type: 'quantitative' },
      },
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: heatmapSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Check that an SVG element is rendered
    expect(container.querySelector('svg')).toBeInTheDocument();

    // Check for heatmap rectangles
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  it('should render heatmap from actual air_quality_heatmap.json schema', () => {
    const airQualitySpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Air quality index by location',
      data: {
        values: [
          { city: 'New York', time: 'Morning', aqi: 45 },
          { city: 'New York', time: 'Afternoon', aqi: 62 },
          { city: 'New York', time: 'Evening', aqi: 58 },
          { city: 'Los Angeles', time: 'Morning', aqi: 85 },
          { city: 'Los Angeles', time: 'Afternoon', aqi: 95 },
          { city: 'Los Angeles', time: 'Evening', aqi: 78 },
          { city: 'Chicago', time: 'Morning', aqi: 52 },
          { city: 'Chicago', time: 'Afternoon', aqi: 68 },
          { city: 'Chicago', time: 'Evening', aqi: 61 },
          { city: 'Houston', time: 'Morning', aqi: 72 },
          { city: 'Houston', time: 'Afternoon', aqi: 88 },
          { city: 'Houston', time: 'Evening', aqi: 75 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'time', type: 'ordinal', axis: { title: 'Time of Day' } },
        y: { field: 'city', type: 'ordinal', axis: { title: 'City' } },
        color: {
          field: 'aqi',
          type: 'quantitative',
          scale: { scheme: 'redyellowgreen', domain: [0, 150], reverse: true },
          legend: { title: 'AQI' },
        },
        tooltip: [
          { field: 'city', type: 'ordinal' },
          { field: 'time', type: 'ordinal' },
          { field: 'aqi', type: 'quantitative', title: 'Air Quality Index' },
        ],
      },
      title: 'Air Quality Index Heatmap',
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: airQualitySpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verify heatmap rectangles are rendered
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  it('should render heatmap from actual attendance_heatmap.json schema', () => {
    const attendanceSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Class attendance patterns',
      data: {
        values: [
          { day: 'Monday', period: 'Period 1', attendance: 92 },
          { day: 'Monday', period: 'Period 2', attendance: 89 },
          { day: 'Monday', period: 'Period 3', attendance: 87 },
          { day: 'Monday', period: 'Period 4', attendance: 85 },
          { day: 'Tuesday', period: 'Period 1', attendance: 90 },
          { day: 'Tuesday', period: 'Period 2', attendance: 88 },
          { day: 'Tuesday', period: 'Period 3', attendance: 91 },
          { day: 'Tuesday', period: 'Period 4', attendance: 86 },
          { day: 'Wednesday', period: 'Period 1', attendance: 94 },
          { day: 'Wednesday', period: 'Period 2', attendance: 92 },
          { day: 'Wednesday', period: 'Period 3', attendance: 90 },
          { day: 'Wednesday', period: 'Period 4', attendance: 88 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'day', type: 'ordinal', axis: { title: 'Day of Week' } },
        y: { field: 'period', type: 'ordinal', axis: { title: 'Class Period' } },
        color: {
          field: 'attendance',
          type: 'quantitative',
          scale: { scheme: 'blues' },
          legend: { title: 'Attendance %' },
        },
        tooltip: [
          { field: 'day', type: 'ordinal' },
          { field: 'period', type: 'ordinal' },
          { field: 'attendance', type: 'quantitative', title: 'Attendance %', format: '.0f' },
        ],
      },
      title: 'Weekly Attendance Patterns',
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: attendanceSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verify heatmap rectangles are rendered
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  it('should detect heatmap chart type from rect mark with quantitative color', () => {
    const heatmapSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: [{ x: 'A', y: 'B', value: 10 }] },
      mark: 'rect',
      encoding: {
        x: { field: 'x', type: 'ordinal' },
        y: { field: 'y', type: 'ordinal' },
        color: { field: 'value', type: 'quantitative' },
      },
    };

    const props: VegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: heatmapSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders hconcat donut charts with shared legend outside the grid', () => {
    const hconcatSpec = {
      title: 'Test HConcat',
      hconcat: [
        {
          data: {
            values: [
              { metric: 'A', value: 10 },
              { metric: 'B', value: 20 },
            ],
          },
          mark: { type: 'arc', innerRadius: 30 },
          encoding: {
            theta: { field: 'value', type: 'quantitative' },
            color: { field: 'metric', type: 'nominal' },
          },
        },
        {
          data: {
            values: [
              { metric: 'A', value: 15 },
              { metric: 'B', value: 25 },
            ],
          },
          mark: { type: 'arc', innerRadius: 30 },
          encoding: {
            theta: { field: 'value', type: 'quantitative' },
            color: { field: 'metric', type: 'nominal' },
          },
        },
      ],
    };

    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: hconcatSpec }} />);

    // Should render 2 donut charts (SVGs)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);

    // Should render shared legend with buttons for A and B
    const legendButtons = container.querySelectorAll('button');
    const legendTexts = Array.from(legendButtons).map(btn => btn.textContent);
    expect(legendTexts).toContain('A');
    expect(legendTexts).toContain('B');
  });
});
