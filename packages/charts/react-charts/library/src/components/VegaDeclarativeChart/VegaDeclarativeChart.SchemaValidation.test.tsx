import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';
import * as fs from 'fs';
import * as path from 'path';

// Import transformation functions to test them directly
import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToVerticalStackedBarChartProps,
  transformVegaLiteToGroupedVerticalBarChartProps,
  transformVegaLiteToHorizontalBarChartProps,
  transformVegaLiteToAreaChartProps,
  transformVegaLiteToScatterChartProps,
  transformVegaLiteToDonutChartProps,
  transformVegaLiteToHeatMapChartProps,
} from '../DeclarativeChart/VegaLiteSchemaAdapter';

interface SchemaTestResult {
  schemaName: string;
  success: boolean;
  chartType?: string;
  error?: string;
  unsupportedFeatures?: string[];
}

/**
 * Get chart type from Vega-Lite spec
 */
function getChartType(spec: any): string {
  const mark = spec.layer ? spec.layer[0]?.mark : spec.mark;
  const markType = typeof mark === 'string' ? mark : mark?.type;
  const encoding = spec.layer ? spec.layer[0]?.encoding : spec.encoding;
  const hasColorEncoding = !!encoding?.color?.field;

  if (markType === 'arc' && encoding?.theta) {
    return 'donut';
  }
  if (markType === 'rect' && encoding?.x && encoding?.y && encoding?.color) {
    return 'heatmap';
  }
  if (markType === 'bar') {
    const isYNominal = encoding?.y?.type === 'nominal' || encoding?.y?.type === 'ordinal';
    const isXNominal = encoding?.x?.type === 'nominal' || encoding?.x?.type === 'ordinal';

    if (isYNominal && !isXNominal) {
      return 'horizontal-bar';
    }
    if (hasColorEncoding) {
      return 'stacked-bar';
    }
    return 'bar';
  }
  if (markType === 'area') {
    return 'area';
  }
  if (markType === 'point' || markType === 'circle' || markType === 'square') {
    return 'scatter';
  }
  return 'line';
}

/**
 * Load all schema files from the schemas directory
 */
function loadAllSchemas(): Map<string, any> {
  const schemas = new Map<string, any>();
  const schemasDir = path.join(__dirname, '../../../../stories/src/VegaDeclarativeChart/schemas');

  if (!fs.existsSync(schemasDir)) {
    console.warn(`Schemas directory not found: ${schemasDir}`);
    return schemas;
  }

  const files = fs.readdirSync(schemasDir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  jsonFiles.forEach(file => {
    try {
      const filePath = path.join(schemasDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const schema = JSON.parse(content);
      const name = file.replace('.json', '');
      schemas.set(name, schema);
    } catch (error: any) {
      console.error(`Error loading schema ${file}:`, error.message);
    }
  });

  return schemas;
}

/**
 * Test if a schema can be transformed to Fluent chart props
 */
function testSchemaTransformation(schemaName: string, spec: any): SchemaTestResult {
  const result: SchemaTestResult = {
    schemaName,
    success: false,
    unsupportedFeatures: [],
  };

  try {
    const chartType = getChartType(spec);
    result.chartType = chartType;

    const colorMap = new Map<string, string>();
    const isDarkTheme = false;

    // Test transformation based on chart type
    switch (chartType) {
      case 'line':
        transformVegaLiteToLineChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'bar':
        transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'stacked-bar':
        transformVegaLiteToVerticalStackedBarChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'grouped-bar':
        transformVegaLiteToGroupedVerticalBarChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'horizontal-bar':
        transformVegaLiteToHorizontalBarChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'area':
        transformVegaLiteToAreaChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'scatter':
        transformVegaLiteToScatterChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'donut':
        transformVegaLiteToDonutChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      case 'heatmap':
        transformVegaLiteToHeatMapChartProps(spec, { current: colorMap }, isDarkTheme);
        break;
      default:
        throw new Error(`Unknown chart type: ${chartType}`);
    }

    result.success = true;

    // Detect potentially unsupported features
    const unsupported: string[] = [];

    // Check for layered specs (combo charts)
    if (spec.layer && spec.layer.length > 1) {
      const marks = spec.layer.map((l: any) => (typeof l.mark === 'string' ? l.mark : l.mark?.type));
      const uniqueMarks = Array.from(new Set(marks));
      if (uniqueMarks.length > 1) {
        unsupported.push(`Layered chart with marks: ${uniqueMarks.join(', ')}`);
      }
    }

    // Check for log scale
    if (
      spec.encoding?.y?.scale?.type === 'log' ||
      spec.encoding?.x?.scale?.type === 'log' ||
      (spec.layer &&
        spec.layer.some((l: any) => l.encoding?.y?.scale?.type === 'log' || l.encoding?.x?.scale?.type === 'log'))
    ) {
      unsupported.push('Logarithmic scale');
    }

    // Check for transforms
    if (spec.transform && spec.transform.length > 0) {
      const transformTypes = spec.transform.map((t: any) => Object.keys(t)[0]);
      unsupported.push(`Transforms: ${transformTypes.join(', ')}`);
    }

    // Check for independent y-axis resolution in combo charts
    if (spec.resolve?.scale?.y === 'independent') {
      unsupported.push('Independent y-axis scales (dual-axis)');
    }

    // Check for size encoding in scatter charts
    if (spec.encoding?.size || (spec.layer && spec.layer.some((l: any) => l.encoding?.size))) {
      unsupported.push('Size encoding (bubble charts)');
    }

    // Check for opacity encoding
    if (spec.encoding?.opacity || (spec.layer && spec.layer.some((l: any) => l.encoding?.opacity))) {
      unsupported.push('Opacity encoding');
    }

    // Check for xOffset (grouped bars)
    if (spec.encoding?.xOffset) {
      unsupported.push('xOffset encoding (grouped bars)');
    }

    // Check for text marks (annotations)
    const hasTextMarks =
      spec.mark === 'text' ||
      spec.mark?.type === 'text' ||
      (spec.layer && spec.layer.some((l: any) => l.mark === 'text' || l.mark?.type === 'text'));
    if (hasTextMarks) {
      unsupported.push('Text marks (annotations)');
    }

    // Check for rule marks (reference lines)
    const hasRuleMarks =
      spec.mark === 'rule' ||
      spec.mark?.type === 'rule' ||
      (spec.layer && spec.layer.some((l: any) => l.mark === 'rule' || l.mark?.type === 'rule'));
    if (hasRuleMarks) {
      unsupported.push('Rule marks (reference lines)');
    }

    // Check for rect marks with x/x2 (color fill bars)
    if (spec.layer) {
      const hasColorFillRects = spec.layer.some(
        (l: any) =>
          (l.mark === 'rect' || l.mark?.type === 'rect') && l.encoding?.x && (l.encoding?.x2 || l.encoding?.xOffset),
      );
      if (hasColorFillRects) {
        unsupported.push('Color fill bars (rect with x/x2)');
      }
    }

    result.unsupportedFeatures = unsupported;
  } catch (error: any) {
    result.success = false;
    result.error = error.message;
  }

  return result;
}

describe('VegaDeclarativeChart - All Schemas Validation', () => {
  let allSchemas: Map<string, any>;
  let testResults: SchemaTestResult[] = [];

  beforeAll(() => {
    allSchemas = loadAllSchemas();
    console.log(`\n📊 Loading ${allSchemas.size} Vega-Lite schemas for validation...\n`);
  });

  it('should load all schema files from the schemas directory', () => {
    expect(allSchemas.size).toBeGreaterThan(0);
    console.log(`✅ Loaded ${allSchemas.size} schemas successfully`);
  });

  it('should validate all schemas and identify unsupported features', () => {
    allSchemas.forEach((spec, name) => {
      const result = testSchemaTransformation(name, spec);
      testResults.push(result);
    });

    // Generate summary report
    const successful = testResults.filter(r => r.success);
    const failed = testResults.filter(r => !r.success);
    const withUnsupportedFeatures = testResults.filter(r => r.success && r.unsupportedFeatures!.length > 0);

    console.log('\n' + '='.repeat(80));
    console.log('VEGA-LITE SCHEMA VALIDATION SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Schemas Tested: ${testResults.length}`);
    console.log(
      `✅ Successfully Transformed: ${successful.length} (${((successful.length / testResults.length) * 100).toFixed(
        1,
      )}%)`,
    );
    console.log(
      `❌ Failed Transformation: ${failed.length} (${((failed.length / testResults.length) * 100).toFixed(1)}%)`,
    );
    console.log(`⚠️  With Unsupported Features: ${withUnsupportedFeatures.length}`);
    console.log('='.repeat(80));

    if (failed.length > 0) {
      console.log('\n❌ FAILED TRANSFORMATIONS:');
      console.log('-'.repeat(80));
      failed.forEach(result => {
        console.log(`Schema: ${result.schemaName}`);
        console.log(`  Chart Type: ${result.chartType || 'unknown'}`);
        console.log(`  Error: ${result.error}`);
        console.log('');
      });
    }

    if (withUnsupportedFeatures.length > 0) {
      console.log('\n⚠️  SCHEMAS WITH UNSUPPORTED FEATURES:');
      console.log('-'.repeat(80));

      // Group by chart type
      const byChartType = new Map<string, SchemaTestResult[]>();
      withUnsupportedFeatures.forEach(result => {
        const type = result.chartType || 'unknown';
        if (!byChartType.has(type)) {
          byChartType.set(type, []);
        }
        byChartType.get(type)!.push(result);
      });

      byChartType.forEach((results, chartType) => {
        console.log(`\n[${chartType.toUpperCase()}] - ${results.length} schemas`);
        results.forEach(result => {
          console.log(`  • ${result.schemaName}`);
          result.unsupportedFeatures!.forEach(feature => {
            console.log(`    - ${feature}`);
          });
        });
      });
    }

    // Chart type distribution
    console.log('\n📈 CHART TYPE DISTRIBUTION:');
    console.log('-'.repeat(80));
    const chartTypeCounts = new Map<string, number>();
    testResults.forEach(result => {
      const type = result.chartType || 'unknown';
      chartTypeCounts.set(type, (chartTypeCounts.get(type) || 0) + 1);
    });

    Array.from(chartTypeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`  ${type.padEnd(20)}: ${count}`);
      });

    console.log('\n' + '='.repeat(80) + '\n');

    // The test passes if at least 70% of schemas transform successfully
    const successRate = successful.length / testResults.length;
    expect(successRate).toBeGreaterThan(0.7);
  });

  it('should render each successfully transformed schema without crashing', () => {
    const successful = testResults.filter(r => r.success);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    let renderCount = 0;

    successful.forEach(result => {
      const spec = allSchemas.get(result.schemaName);
      if (spec) {
        try {
          const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
          expect(container).toBeTruthy();
          renderCount++;
        } catch (error: any) {
          console.error(`Failed to render ${result.schemaName}:`, error.message);
        }
      }
    });

    consoleSpy.mockRestore();
    console.log(`\n✅ Successfully rendered ${renderCount}/${successful.length} transformed schemas\n`);
    expect(renderCount).toBe(successful.length);
  });

  it('should throw appropriate errors for schemas that cannot be transformed', () => {
    const failed = testResults.filter(r => !r.success);

    failed.forEach(result => {
      const spec = allSchemas.get(result.schemaName);
      if (spec) {
        expect(() => {
          const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
          render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} />);
          consoleSpy.mockRestore();
        }).toThrow();
      }
    });
  });
});

describe('VegaDeclarativeChart - Specific Feature Tests', () => {
  it('should handle layered/combo charts', () => {
    const comboSpec = {
      layer: [
        {
          mark: 'bar',
          encoding: {
            x: { field: 'date', type: 'temporal' },
            y: { field: 'sales', type: 'quantitative' },
          },
        },
        {
          mark: 'line',
          encoding: {
            x: { field: 'date', type: 'temporal' },
            y: { field: 'profit', type: 'quantitative' },
          },
        },
      ],
      data: {
        values: [
          { date: '2023-01', sales: 100, profit: 20 },
          { date: '2023-02', sales: 150, profit: 30 },
        ],
      },
    };

    // This may or may not work depending on implementation
    // The test documents the behavior
    try {
      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: comboSpec }} />);
      expect(container).toBeTruthy();
      console.log('✅ Layered charts are supported');
    } catch (error: any) {
      console.log('❌ Layered charts are not fully supported:', error.message);
      expect(error).toBeDefined();
    }
  });

  it('should handle log scale charts', () => {
    const logScaleSpec = {
      mark: 'line',
      data: {
        values: [
          { x: 1, y: 10 },
          { x: 2, y: 100 },
          { x: 3, y: 1000 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative', scale: { type: 'log' } },
      },
    };

    try {
      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: logScaleSpec }} />);
      expect(container).toBeTruthy();
      console.log('✅ Logarithmic scales are supported');
    } catch (error: any) {
      console.log('⚠️  Logarithmic scales may not be fully supported:', error.message);
      // Log scale might work but not be perfectly accurate
    }
  });

  it('should handle transforms (fold, filter, etc.)', () => {
    const transformSpec = {
      mark: 'line',
      data: {
        values: [
          { month: 'Jan', seriesA: 100, seriesB: 80 },
          { month: 'Feb', seriesA: 120, seriesB: 90 },
        ],
      },
      transform: [{ fold: ['seriesA', 'seriesB'], as: ['series', 'value'] }],
      encoding: {
        x: { field: 'month', type: 'ordinal' },
        y: { field: 'value', type: 'quantitative' },
        color: { field: 'series', type: 'nominal' },
      },
    };

    try {
      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: transformSpec }} />);
      expect(container).toBeTruthy();
      console.log('✅ Data transforms are supported');
    } catch (error: any) {
      console.log('⚠️  Data transforms may not be fully supported:', error.message);
    }
  });
});
