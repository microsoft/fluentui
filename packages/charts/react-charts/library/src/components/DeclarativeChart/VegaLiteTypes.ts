/**
 * Vega-Lite TypeScript interfaces for declarative chart specifications.
 * This is a minimal subset focused on line/point charts with basic encodings.
 * 
 * RECOMMENDED: For full type coverage, install the official vega-lite package:
 * ```
 * npm install vega-lite
 * ```
 * Then import `TopLevelSpec` from 'vega-lite' for complete schema support.
 * 
 * The types provided here are a lightweight alternative that covers common use cases
 * without requiring the full vega-lite dependency (~5.8MB unpacked).
 * 
 * Full Vega-Lite spec: https://vega.github.io/vega-lite/docs/
 * 
 * TODO: Add support for:
 * - Transform operations (filter, aggregate, calculate, etc.)
 * - Remote data sources (url, named datasets)
 * - Facet and concatenation for multi-view layouts
 * - Selection interactions
 * - Additional mark types (bar, area, etc.)
 * - Conditional encodings
 * - Tooltip customization
 */

/**
 * Vega-Lite data type for field encodings
 */
export type VegaLiteType = 'quantitative' | 'temporal' | 'ordinal' | 'nominal' | 'geojson';

/**
 * Vega-Lite mark types
 */
export type VegaLiteMark = 'line' | 'point' | 'circle' | 'square' | 'bar' | 'area' | 'rect' | 'rule' | 'text';

/**
 * Vega-Lite scale type
 */
export type VegaLiteScaleType = 'linear' | 'log' | 'pow' | 'sqrt' | 'symlog' | 'time' | 'utc' | 'ordinal' | 'band' | 'point';

/**
 * Vega-Lite interpolation method
 */
export type VegaLiteInterpolate = 'linear' | 'linear-closed' | 'step' | 'step-before' | 'step-after' | 'basis' | 'cardinal' | 'monotone' | 'natural';

/**
 * Vega-Lite axis configuration
 */
export interface VegaLiteAxis {
  /**
   * Axis title
   */
  title?: string | null;

  /**
   * Format string for axis tick labels
   * Uses d3-format for quantitative and d3-time-format for temporal
   */
  format?: string;

  /**
   * Tick values to display
   */
  values?: number[] | string[];

  /**
   * Number of ticks
   */
  tickCount?: number;

  /**
   * Grid visibility
   */
  grid?: boolean;
}

/**
 * Vega-Lite scale configuration
 */
export interface VegaLiteScale {
  /**
   * Scale type
   */
  type?: VegaLiteScaleType;

  /**
   * Domain values [min, max]
   */
  domain?: [number | string, number | string];

  /**
   * Range values [min, max]
   */
  range?: [number | string, number | string] | string[];

  /**
   * Color scheme name (e.g., 'category10', 'tableau10')
   */
  scheme?: string;
}

/**
 * Vega-Lite legend configuration
 */
export interface VegaLiteLegend {
  /**
   * Legend title
   */
  title?: string | null;

  /**
   * Hide the legend
   */
  disable?: boolean;
}

/**
 * Vega-Lite sort specification
 */
export type VegaLiteSort =
  | 'ascending'
  | 'descending'
  | null
  | {
      field?: string;
      op?: 'count' | 'sum' | 'mean' | 'average' | 'median' | 'min' | 'max';
      order?: 'ascending' | 'descending';
    }
  | string[];

/**
 * Vega-Lite binning configuration
 */
export interface VegaLiteBin {
  /**
   * Maximum number of bins
   */
  maxbins?: number;

  /**
   * Exact step size between bins
   */
  step?: number;

  /**
   * Extent [min, max] for binning
   */
  extent?: [number, number];

  /**
   * Base for nice bin values (e.g., 10 for powers of 10)
   */
  base?: number;

  /**
   * Whether to include the boundary in bins
   */
  anchor?: number;
}

/**
 * Vega-Lite position encoding channel (x or y)
 */
export interface VegaLitePositionEncoding {
  /**
   * Field name in data
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Axis configuration
   */
  axis?: VegaLiteAxis | null;

  /**
   * Constant value for encoding (for reference lines and annotations)
   */
  value?: number | string | Date;

  /**
   * Datum value for encoding (alternative to value)
   */
  datum?: number | string | Date;

  /**
   * Scale configuration
   */
  scale?: VegaLiteScale | null;

  /**
   * Sort order for categorical axes
   * Supports: 'ascending', 'descending', null, array of values, or object with field/op/order
   */
  sort?: VegaLiteSort;

  /**
   * Binning configuration for histograms
   * Set to true for default binning or provide custom bin parameters
   */
  bin?: boolean | VegaLiteBin;

  /**
   * Stack configuration for area/bar charts
   * - null: disable stacking
   * - 'zero': stack from zero baseline (default for area charts)
   * - 'center': center stack
   * - 'normalize': normalize to 100%
   */
  stack?: null | 'zero' | 'center' | 'normalize';

  /**
   * Aggregate function
   * TODO: Implement aggregate support
   */
  aggregate?: 'count' | 'sum' | 'mean' | 'average' | 'median' | 'min' | 'max';
}

/**
 * Vega-Lite color encoding channel
 */
export interface VegaLiteColorEncoding {
  /**
   * Field name for color differentiation
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Legend configuration
   */
  legend?: VegaLiteLegend | null;

  /**
   * Scale configuration
   */
  scale?: VegaLiteScale | null;

  /**
   * Fixed color value
   */
  value?: string;
}

/**
 * Vega-Lite encoding channels
 */
export interface VegaLiteEncoding {
  /**
   * X-axis encoding
   */
  x?: VegaLitePositionEncoding;

  /**
   * Y-axis encoding
   */
  y?: VegaLitePositionEncoding;

  /**
   * Color encoding for series differentiation
   */
  color?: VegaLiteColorEncoding;

  /**
   * Size encoding
   * TODO: Implement size encoding for point marks
   */
  size?: {
    field?: string;
    type?: VegaLiteType;
    value?: number;
  };

  /**
   * Shape encoding
   * TODO: Implement shape encoding for point marks
   */
  shape?: {
    field?: string;
    type?: VegaLiteType;
    value?: string;
  };

  /**
   * Theta encoding for pie/donut charts
   */
  theta?: {
    field?: string;
    type?: VegaLiteType;
    aggregate?: 'count' | 'sum' | 'mean' | 'average' | 'median' | 'min' | 'max';
  };

  /**
   * X2 encoding for interval marks (rect, rule, bar with ranges)
   */
  x2?: VegaLitePositionEncoding;

  /**
   * Y2 encoding for interval marks (rect, rule, bar with ranges)
   */
  y2?: VegaLitePositionEncoding;

  /**
   * Text encoding for text marks
   */
  text?: {
    field?: string;
    type?: VegaLiteType;
    value?: string;
  };
}

/**
 * Vega-Lite mark definition (can be string or object)
 */
export type VegaLiteMarkDef =
  | VegaLiteMark
  | {
      type: VegaLiteMark;
      /**
       * Mark color
       */
      color?: string;
      /**
       * Line interpolation method
       */
      interpolate?: VegaLiteInterpolate;
      /**
       * Point marker visibility
       */
      point?: boolean | { filled?: boolean; size?: number };
      /**
       * Stroke width
       */
      strokeWidth?: number;
      /**
       * Fill opacity
       */
      fillOpacity?: number;
      /**
       * Stroke opacity
       */
      strokeOpacity?: number;
      /**
       * Overall opacity
       */
      opacity?: number;
    };

/**
 * Vega-Lite inline data
 */
export interface VegaLiteData {
  /**
   * Inline data values (array of objects)
   */
  values?: Array<Record<string, unknown>>;

  /**
   * URL to load data from
   * TODO: Implement remote data loading
   */
  url?: string;

  /**
   * Named dataset reference
   * TODO: Implement named dataset resolution
   */
  name?: string;

  /**
   * Data format specification
   * TODO: Implement format parsing (csv, json, etc.)
   */
  format?: {
    type?: 'json' | 'csv' | 'tsv';
    parse?: Record<string, string>;
  };
}

/**
 * Base Vega-Lite spec unit (single view)
 */
export interface VegaLiteUnitSpec {
  /**
   * Mark type
   */
  mark: VegaLiteMarkDef;

  /**
   * Encoding channels
   */
  encoding?: VegaLiteEncoding;

  /**
   * Data specification
   */
  data?: VegaLiteData;

  /**
   * Data transformations
   * TODO: Implement transform pipeline
   */
  transform?: Array<Record<string, unknown>>;
}

/**
 * Vega-Lite layer spec (multiple overlaid views)
 */
export interface VegaLiteLayerSpec {
  /**
   * Layer array
   */
  layer: VegaLiteUnitSpec[];

  /**
   * Shared data across layers
   */
  data?: VegaLiteData;

  /**
   * Shared encoding across layers
   */
  encoding?: VegaLiteEncoding;

  /**
   * Data transformations
   * TODO: Implement transform pipeline
   */
  transform?: Array<Record<string, unknown>>;
}

/**
 * Top-level Vega-Lite specification
 */
export interface VegaLiteSpec {
  /**
   * Schema version
   */
  $schema?: string;

  /**
   * Chart title
   */
  title?: string | { text: string; subtitle?: string };

  /**
   * Chart description
   */
  description?: string;

  /**
   * Chart width
   */
  width?: number | 'container';

  /**
   * Chart height
   */
  height?: number | 'container';

  /**
   * Data specification (for single/layer specs)
   */
  data?: VegaLiteData;

  /**
   * Mark type (for single view)
   */
  mark?: VegaLiteMarkDef;

  /**
   * Encoding channels (for single view)
   */
  encoding?: VegaLiteEncoding;

  /**
   * Layer specification
   */
  layer?: VegaLiteUnitSpec[];

  /**
   * Data transformations
   * TODO: Implement transform pipeline
   */
  transform?: Array<Record<string, unknown>>;

  /**
   * Background color
   */
  background?: string;

  /**
   * Padding configuration
   */
  padding?: number | { top?: number; bottom?: number; left?: number; right?: number };

  /**
   * Auto-size configuration
   */
  autosize?: string | { type?: string; contains?: string };

  /**
   * Configuration overrides
   * TODO: Implement config resolution
   */
  config?: Record<string, unknown>;
}
