/**
 * Local authoring types for the supported native Fluent Vega-Lite grammar subset.
 *
 * These permissive compatibility types are not the complete official schema, and
 * declaring a property does not guarantee that a native renderer consumes it.
 * `validateVegaLiteSpec` is the capability-diagnostics source; semantic preparation
 * and renderer predicates apply further combination-specific checks. An empty
 * diagnostic result is not a certificate of full upstream conformance.
 *
 * Supported transforms, managed resources, recursive views, tooltips and geometry
 * are implemented locally, without an official compiler/runtime dependency or
 * implicit network access. Only the documented subset is implemented. For official
 * authoring coverage, use the official `vega-lite` package's `TopLevelSpec`; broader
 * types do not expand the native adapter's supported semantics.
 *
 * Official grammar reference: https://vega.github.io/vega-lite/docs/
 */

/**
 * Vega-Lite data type for field encodings
 */
export type VegaLiteType = 'quantitative' | 'temporal' | 'ordinal' | 'nominal' | 'geojson';

/** Semantic validation policy. Strict validation reports errors; it does not throw. */
export type VegaLiteSemanticMode = 'legacy' | 'strict';

/** Scalar operations implemented by the semantic data pipeline. */
export type VegaLiteAggregateOp =
  | 'count'
  | 'sum'
  | 'mean'
  | 'average'
  | 'median'
  | 'min'
  | 'max'
  | 'valid'
  | 'missing'
  | 'distinct'
  | 'values'
  | 'product'
  | 'q1'
  | 'q3'
  | 'variance'
  | 'variancep'
  | 'stdev'
  | 'stdevp'
  | 'stderr'
  | 'argmin'
  | 'argmax';

/** Object aggregate syntax is representable, not a guarantee of renderer support. */
export type VegaLiteAggregate =
  | VegaLiteAggregateOp
  | { exponential: number }
  | { exponentialb: number }
  | { argmin: string }
  | { argmax: string };

/** Window transforms remain `Record<string, unknown>`; this is an optional authoring helper. */
export type VegaLiteWindowOp =
  | VegaLiteAggregateOp
  | 'row_number'
  | 'rank'
  | 'dense_rank'
  | 'percent_rank'
  | 'cume_dist'
  | 'ntile'
  | 'lag'
  | 'lead'
  | 'first_value'
  | 'last_value'
  | 'nth_value';

/**
 * Vega-Lite mark types
 */
export type VegaLiteMark =
  | 'line'
  | 'point'
  | 'circle'
  | 'square'
  | 'bar'
  | 'area'
  | 'rect'
  | 'rule'
  | 'text'
  | 'arc'
  | 'tick';

/**
 * Vega-Lite scale type
 */
export type VegaLiteScaleType =
  | 'linear'
  | 'log'
  | 'pow'
  | 'sqrt'
  | 'symlog'
  | 'time'
  | 'utc'
  | 'ordinal'
  | 'band'
  | 'point';

/**
 * Vega-Lite interpolation method
 */
export type VegaLiteInterpolate =
  | 'linear'
  | 'linear-closed'
  | 'step'
  | 'step-before'
  | 'step-after'
  | 'basis'
  | 'cardinal'
  | 'monotone'
  | 'natural';

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
  domain?: (number | string)[];

  /**
   * Range values [min, max]
   */
  range?: [number | string, number | string] | string[];

  /**
   * Color scheme name (e.g., 'category10', 'tableau10')
   */
  scheme?: string;

  /**
   * Whether scale domain should include zero
   */
  zero?: boolean;

  /**
   * Whether to reverse the scale
   */
  reverse?: boolean;
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
      op?: VegaLiteAggregate;
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
   * Axis configuration. Ranged/center geometry suppresses the axis group for null;
   * ordinary native charts do not universally honor axis suppression.
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
   * Stack declaration; support depends on the selected renderer and channel combination.
   * Null disables supported native stacking; 'zero' uses a zero baseline and 'normalize'
   * uses normalized geometry. Center bars require a discrete category, nominal series
   * and linear quantitative value, with baseline (maximum absolute group total minus
   * this group's total) / 2. Vertical center areas use half-total centering at each x
   * position. Secondary endpoints, offsets and detail are not center-stack combinations.
   */
  stack?: null | 'zero' | 'center' | 'normalize';

  /**
   * Aggregate function
   */
  aggregate?: VegaLiteAggregate;

  /**
   * Axis title (shorthand alternative to axis.title)
   */
  title?: string;

  /**
   * Time unit for temporal fields (e.g., 'yearmonth', 'month', 'day')
   */
  timeUnit?: string;
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

  /** Aggregation is normalized before color rendering. */
  aggregate?: VegaLiteAggregate;

  /** Time-unit normalization for temporal color fields. */
  timeUnit?: string;

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

  /**
   * Conditional color encoding with a test expression
   */
  condition?: {
    test: string;
    value: string;
  };
}

/**
 * Vega-Lite size encoding channel
 */
export interface VegaLiteSizeEncoding {
  /**
   * Field name for size encoding
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Fixed size value
   */
  value?: number;

  /** Aggregation is normalized before size rendering. */
  aggregate?: VegaLiteAggregate;
}

/**
 * Vega-Lite shape encoding channel
 */
export interface VegaLiteShapeEncoding {
  /**
   * Field name for shape encoding
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Fixed shape value
   */
  value?: string;

  aggregate?: VegaLiteAggregate;
}

/**
 * Vega-Lite theta encoding channel for pie/donut charts and polar coordinates
 */
export interface VegaLiteThetaEncoding {
  /**
   * Field name
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Aggregate function
   */
  aggregate?: VegaLiteAggregate;

  /**
   * Axis configuration for polar charts
   */
  axis?: VegaLiteAxis | null;

  /**
   * Scale configuration for polar charts
   */
  scale?: VegaLiteScale | null;
}

/**
 * Vega-Lite radius encoding channel for polar charts
 */
export interface VegaLiteRadiusEncoding {
  /**
   * Field name
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Aggregate function
   */
  aggregate?: VegaLiteAggregate;

  /**
   * Axis configuration
   */
  axis?: VegaLiteAxis | null;

  /**
   * Scale configuration
   */
  scale?: VegaLiteScale | null;
}

/**
 * Vega-Lite text encoding channel
 */
export interface VegaLiteTextEncoding {
  /**
   * Field name
   */
  field?: string;

  /**
   * Data type
   */
  type?: VegaLiteType;

  /**
   * Fixed text value
   */
  value?: string;

  /**
   * Datum value for text encoding
   */
  datum?: string | number;

  aggregate?: VegaLiteAggregate;

  format?: string;

  formatType?: 'number' | 'time';
}

/** Optional tooltip authoring type; the legacy tooltip channel deliberately remains any. */
export type VegaLiteTooltipField = Omit<VegaLitePositionEncoding, 'value' | 'datum'> & {
  format?: string;
  formatType?: 'number' | 'time';
  value?: unknown;
  datum?: unknown;
};

/** Repeat references are isolated from legacy position/color/etc. field?: string. */
export type VegaLiteRepeatFieldDef = { repeat: 'row' | 'column' | 'repeat' };
type RepeatChannel<T> = T extends Array<infer Item>
  ? Array<RepeatChannel<Item>>
  : Omit<T, 'field'> & { field?: string | VegaLiteRepeatFieldDef };

/** Encoding for repeat templates only, never passed directly to the legacy unit adapter. */
export type VegaLiteRepeatEncoding = {
  [Channel in keyof VegaLiteEncoding]?: Channel extends 'tooltip'
    ? VegaLiteEncoding[Channel]
    : RepeatChannel<NonNullable<VegaLiteEncoding[Channel]>>;
};

/** Facet field helper. VegaLiteSpec.facet retains its permissive legacy record contract. */
export interface VegaLiteFacetFieldDef {
  field: string;
  type?: VegaLiteType;
  title?: string;
  sort?: VegaLiteSort;
  header?: { title?: string | null; labels?: boolean };
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
   * Size encoding for point marks
   */
  size?: VegaLiteSizeEncoding;

  /**
   * Shape encoding for point marks
   */
  shape?: VegaLiteShapeEncoding;

  /**
   * Theta encoding for pie/donut charts and polar coordinates
   */
  theta?: VegaLiteThetaEncoding;

  /**
   * Radius encoding for polar charts
   */
  radius?: VegaLiteRadiusEncoding;

  /**
   * Secondary x endpoint for supported ranged bar/rect/tick geometry and selected
   * native annotations; it shares the primary x scale. Not arbitrary interval layering.
   */
  x2?: VegaLitePositionEncoding;

  /**
   * Secondary y endpoint for supported ranged bar/rect/tick geometry and selected
   * native annotations; it shares the primary y scale. Not arbitrary interval layering.
   */
  y2?: VegaLitePositionEncoding;

  /**
   * Text encoding for text marks
   */
  text?: VegaLiteTextEncoding;

  /**
   * Offset declaration for supported grouped/ranged bars, rectangles and ticks.
   * Dedicated geometry resolves categorical slots or quantitative displacement
   * independently from color; capability predicates reject unsupported combinations.
   */
  xOffset?: VegaLitePositionEncoding;

  /** Y-axis offset for horizontal grouped/ranged bars. */
  yOffset?: VegaLitePositionEncoding;

  /** Additional declarative channels; validation determines renderer capability. */
  detail?: VegaLitePositionEncoding | VegaLitePositionEncoding[];
  order?: VegaLitePositionEncoding | VegaLitePositionEncoding[];
  opacity?: VegaLiteSizeEncoding;
  fill?: VegaLiteColorEncoding;
  stroke?: VegaLiteColorEncoding;
  strokeWidth?: VegaLiteSizeEncoding;

  /**
   * Tooltip encoding: field, array, null or value. Kept as any for public compatibility;
   * use `VegaLiteTooltipField` when a typed single-field definition is desired.
   * Field-bound comparison/logical filters are supported only on explicit array field
   * entries, including count aggregates, not single objects or value/datum-only entries.
   * Filters bind to displayed aggregate/time-unit aliases and omit tooltip/ARIA fields,
   * not plot rows. This permissive type does not model every supported filter property.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip?: any;
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
       * Stroke dash pattern (e.g., [5, 5] for dashed, [2, 2] for dotted)
       */
      strokeDash?: number[];
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
      /**
       * Inner radius for arc/pie/donut marks (0-1 or pixel value)
       */
      innerRadius?: number;
      /**
       * Outer radius for arc/pie marks (pixel value)
       */
      outerRadius?: number;

      /** Geometry declarations for supported ranged bar/rect/tick combinations, not universal mark support. */
      orient?: 'horizontal' | 'vertical';
      cornerRadiusEnd?: number;
      width?: number;
      height?: number;
      size?: number;
      thickness?: number;
    };

/** Declared host-loaded formats. This type does not authorize network access. */
export interface VegaLiteResourceFormat {
  type?: 'json' | 'csv' | 'tsv';
  /** Own-property path selecting records inside a JSON response. */
  property?: string;
  /** Strings remain permissive for old callers; diagnostics check supported parse declarations. */
  parse?: Record<string, string>;
}

/**
 * Vega-Lite inline, scoped named or explicitly host-resolved data.
 */
export interface VegaLiteData {
  /**
   * Inline data values (array of objects)
   */
  values?: Array<Record<string, unknown>>;

  /**
   * Managed URL source requiring an explicit host resolver and origin/base policy.
   * No default fetch or implicit external network request is installed.
   */
  url?: string;

  /**
   * Reference to an inline dataset inherited from the enclosing view scope.
   */
  name?: string;

  /**
   * Supported JSON/CSV/TSV format and own-field parse declarations.
   * Diagnostics validate the declared subset; the host owns resource I/O policy.
   */
  format?: VegaLiteResourceFormat;
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
   * Ordered transforms executed by the bounded local semantic pipeline.
   * Records are intentionally permissive; diagnostics determine supported operations.
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
   * Shared transforms applied before child transforms by semantic view preparation.
   * Records are intentionally permissive; arbitrary upstream transforms are not supported.
   */
  transform?: Array<Record<string, unknown>>;
}

/**
 * Vega-Lite title configuration with styling options
 */
export interface VegaLiteTitleParams {
  /**
   * Title text
   */
  text: string;

  /**
   * Subtitle text
   */
  subtitle?: string;

  /**
   * Font for the title
   */
  font?: string;

  /**
   * Font size for the title
   */
  fontSize?: number;

  /**
   * Font style for the title (e.g., 'normal', 'italic')
   */
  fontStyle?: string;

  /**
   * Font weight for the title (e.g., 'normal', 'bold', 100-900)
   */
  fontWeight?: string | number;

  /**
   * Color of the title text
   */
  color?: string;

  /**
   * Horizontal anchor position for the title
   * - 'start': left-aligned
   * - 'middle': centered
   * - 'end': right-aligned
   */
  anchor?: 'start' | 'middle' | 'end';

  /**
   * Vertical offset from the top of the chart
   */
  offset?: number;

  /**
   * Additional padding around the subtitle
   */
  subtitlePadding?: number;
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
   * Chart title - can be a string or a detailed title configuration
   */
  title?: string | VegaLiteTitleParams;

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

  /** Named inline datasets inherited by descendant views. */
  datasets?: Record<string, Array<Record<string, unknown>>>;

  /**
   * Mark type (for single view)
   */
  mark?: VegaLiteMarkDef;

  /**
   * Encoding channels (for single view)
   */
  encoding?: VegaLiteEncoding;

  /**
   * Horizontal concatenation for multi-plot layouts
   */
  hconcat?: VegaLiteSpec[];

  /**
   * Vertical concatenation for multi-plot layouts
   */
  vconcat?: VegaLiteSpec[];

  /** Grid concatenation and optional positive column count. */
  concat?: VegaLiteSpec[];
  columns?: number;

  /** Facet/repeat template; repeat field unions stay out of legacy unit encodings. */
  spec?: VegaLiteSpec | VegaLiteRepeatSpec;

  /**
   * Layer specification
   */
  layer?: VegaLiteUnitSpec[];

  /**
   * Ordered transforms executed by the bounded local semantic pipeline.
   * Records are intentionally permissive; diagnostics determine supported operations.
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
   * Inherited configuration with recursive child overrides. Supported behavior is
   * limited to tooltip defaults and number/time formatting, not all official config.
   */
  config?: Record<string, unknown>;

  /**
   * Legacy selection declarations remain representable but are diagnosed unsupported;
   * native legend interaction is not a Vega-Lite selection engine.
   */
  selection?: Record<string, unknown>;

  /** Parameters are representable but interactions require explicit implementation. */
  params?: Record<string, unknown>[];

  /**
   * Supported field or row/column facets, including scoped data, sorted groups and
   * empty cells. This permissive record is not the complete official facet grammar.
   */
  facet?: Record<string, unknown>;

  /**
   * Supported list or row/column repeat expansion with scoped template bindings.
   * Use `VegaLiteRepeatSpec` for object field references; arbitrary repeat forms and
   * layer-repeat are not guaranteed by this permissive record.
   */
  repeat?: string[] | Record<string, unknown>;

  /**
   * Resolution declarations for composed views. Compatible x/y/color domains can be
   * shared or independent; exposed field-family/scale-type conflicts are diagnosed.
   * Other typed channels, independent geometry layers and full axis/legend resolution
   * are not universally implemented. Renderer capability checks remain authoritative.
   */
  resolve?: {
    scale?: {
      x?: 'shared' | 'independent';
      y?: 'shared' | 'independent';
      color?: 'shared' | 'independent';
      opacity?: 'shared' | 'independent';
      size?: 'shared' | 'independent';
      shape?: 'shared' | 'independent';
    };
    axis?: {
      x?: 'shared' | 'independent';
      y?: 'shared' | 'independent';
    };
    legend?: {
      color?: 'shared' | 'independent';
      opacity?: 'shared' | 'independent';
      size?: 'shared' | 'independent';
      shape?: 'shared' | 'independent';
    };
  };
}

/** Modern nested composition authoring without weakening legacy unit-layer contracts. */
export type VegaLiteCompositionSpec = Omit<VegaLiteSpec, 'layer' | 'spec'> & {
  layer?: Array<VegaLiteUnitSpec | VegaLiteCompositionSpec>;
  spec?: VegaLiteSpec | VegaLiteRepeatSpec | VegaLiteCompositionSpec;
};

/** A repeat template can hold object field references until view expansion resolves them. */
export type VegaLiteRepeatSpec = Omit<VegaLiteSpec, 'encoding' | 'layer' | 'spec'> & {
  encoding?: VegaLiteRepeatEncoding;
  layer?: Array<VegaLiteUnitSpec | VegaLiteRepeatSpec>;
  spec?: VegaLiteSpec | VegaLiteRepeatSpec;
};
