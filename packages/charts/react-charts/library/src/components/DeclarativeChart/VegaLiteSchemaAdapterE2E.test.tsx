import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToAreaChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToScatterChartProps,
  transformVegaLiteToHeatMapChartProps,
} from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec } from './VegaLiteTypes';
import * as fs from 'fs';
import * as path from 'path';

/**
 * End-to-end snapshot tests for VegaLiteSchemaAdapter using real Vega-Lite JSON schemas.
 * These tests validate that the adapter correctly transforms various chart types and configurations.
 */
describe('VegaLiteSchemaAdapter E2E Tests', () => {
  const colorMap = new Map<string, string>();
  const colorMapRef = { current: colorMap };
  const schemaBasePath = path.resolve(__dirname, '../../../../stories/src/VegaDeclarativeChart/schemas');

  /**
   * Helper function to load and parse a Vega-Lite JSON schema file
   */
  const loadSchema = (filename: string): VegaLiteSpec => {
    const schemaPath = path.join(schemaBasePath, filename);
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    return JSON.parse(schemaContent);
  };

  describe('Line Charts', () => {
    test('Should transform API response time line chart', () => {
      const spec = loadSchema('api_response_line.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Area Charts', () => {
    test('Should transform simple area chart', () => {
      const spec = loadSchema('areachart.json');
      const result = transformVegaLiteToAreaChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform multi-series area chart without stack', () => {
      const spec = loadSchema('area_multiSeries_noStack.json');
      const result = transformVegaLiteToAreaChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Bar Charts', () => {
    test('Should transform simple bar chart', () => {
      const spec = loadSchema('barchart.json');
      const result = transformVegaLiteToVerticalBarChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform age distribution bar chart', () => {
      const spec = loadSchema('age_distribution_bar.json');
      const result = transformVegaLiteToVerticalBarChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Scatter Charts', () => {
    test('Should transform ad CTR scatter chart', () => {
      const spec = loadSchema('ad_ctr_scatter.json');
      const result = transformVegaLiteToScatterChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Heatmap Charts', () => {
    test('Should transform air quality heatmap', () => {
      const spec = loadSchema('air_quality_heatmap.json');
      const result = transformVegaLiteToHeatMapChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });
});
