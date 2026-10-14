export { VegaDeclarativeChart } from './VegaDeclarativeChart';
export type { VegaDeclarativeChartProps, VegaSchema, VegaLiteSpec } from './VegaDeclarativeChart';

/** Pure capability diagnostics for the supported Fluent Vega-Lite subset. */
export { validateVegaLiteSpec } from './VegaLiteDiagnostics';
/** Actionable diagnostic records and side-effect-free validation options. */
export type { VegaLiteDiagnostic, VegaLiteDiagnosticOptions } from './VegaLiteDiagnostics';
/** Explicit, cancellable host-owned resource loading; there is no default network resolver. */
export { resolveVegaLiteResources } from './VegaLiteResourceLoader';
/** Host callback, resource loading policy and parsing limits; limits do not authorize network access. */
export type { VegaDataResolver, VegaDataParseOptions, VegaLiteResourceOptions } from './VegaLiteResourceLoader.types';
/** Additive authoring types for semantic modes, composition, statistics and resource formats. */
export type {
  VegaLiteSemanticMode,
  VegaLiteAggregateOp,
  VegaLiteAggregate,
  VegaLiteWindowOp,
  VegaLiteCompositionSpec,
  VegaLiteRepeatSpec,
  VegaLiteRepeatFieldDef,
  VegaLiteRepeatEncoding,
  VegaLiteFacetFieldDef,
  VegaLiteTooltipField,
  VegaLiteResourceFormat,
} from './VegaLiteTypes';
