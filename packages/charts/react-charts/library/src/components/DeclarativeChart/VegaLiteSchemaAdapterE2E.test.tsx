import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToAreaChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToScatterChartProps,
  transformVegaLiteToDonutChartProps,
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
    test('Should transform simple line chart', () => {
      const spec = loadSchema('linechart.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform line chart with annotations', () => {
      const spec = loadSchema('linechart_annotations.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform daily orders line chart', () => {
      const spec = loadSchema('daily_orders_line.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform API response time line chart', () => {
      const spec = loadSchema('api_response_line.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform game scores line chart', () => {
      const spec = loadSchema('game_scores_line.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform temperature trend line chart', () => {
      const spec = loadSchema('temperature_trend_line.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform line chart with log scale', () => {
      const spec = loadSchema('log_scale_growth.json');
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

    test('Should transform temperature area chart', () => {
      const spec = loadSchema('temperature_area.json');
      const result = transformVegaLiteToAreaChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform stock price area chart', () => {
      const spec = loadSchema('stock_price_area.json');
      const result = transformVegaLiteToAreaChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform graduation rates area chart', () => {
      const spec = loadSchema('graduation_rates_area.json');
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

    test('Should transform grouped bar chart', () => {
      const spec = loadSchema('grouped_bar.json');
      const result = transformVegaLiteToVerticalBarChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform stacked vertical bar chart', () => {
      const spec = loadSchema('stacked_bar_vertical.json');
      const result = transformVegaLiteToVerticalBarChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform age distribution bar chart', () => {
      const spec = loadSchema('age_distribution_bar.json');
      const result = transformVegaLiteToVerticalBarChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform precipitation bar chart', () => {
      const spec = loadSchema('precipitation_bar.json');
      const result = transformVegaLiteToVerticalBarChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Scatter Charts', () => {
    test('Should transform simple scatter chart', () => {
      const spec = loadSchema('scatterchart.json');
      const result = transformVegaLiteToScatterChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform health metrics scatter chart', () => {
      const spec = loadSchema('health_metrics_scatter.json');
      const result = transformVegaLiteToScatterChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform ad CTR scatter chart', () => {
      const spec = loadSchema('ad_ctr_scatter.json');
      const result = transformVegaLiteToScatterChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Donut/Pie Charts', () => {
    test('Should transform simple donut chart', () => {
      const spec = loadSchema('donutchart.json');
      const result = transformVegaLiteToDonutChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform genre popularity donut chart', () => {
      const spec = loadSchema('genre_popularity_donut.json');
      const result = transformVegaLiteToDonutChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform market share donut chart', () => {
      const spec = loadSchema('market_share_donut.json');
      const result = transformVegaLiteToDonutChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Heatmap Charts', () => {
    test('Should transform simple heatmap chart', () => {
      const spec = loadSchema('heatmapchart.json');
      const result = transformVegaLiteToHeatMapChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform air quality heatmap', () => {
      const spec = loadSchema('air_quality_heatmap.json');
      const result = transformVegaLiteToHeatMapChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform financial ratios heatmap', () => {
      const spec = loadSchema('financial_ratios_heatmap.json');
      const result = transformVegaLiteToHeatMapChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Formatting Tests', () => {
    test('Should transform chart with date formatting', () => {
      const spec = loadSchema('formatting_date_full_month.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });

    test('Should transform chart with percentage formatting', () => {
      const spec = loadSchema('formatting_percentage_2decimals.json');
      const result = transformVegaLiteToLineChartProps(spec, colorMapRef, false);
      expect(result).toMatchSnapshot();
    });
  });
});
