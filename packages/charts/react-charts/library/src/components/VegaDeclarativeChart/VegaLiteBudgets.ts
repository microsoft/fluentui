/** Internal, input-independent limits. This module must not depend on the semantic/rendering layers. */
export const VEGA_MAX_DATA_ROWS = 100000;
export const VEGA_MAX_TEXT_LENGTH = 10000000;
export const VEGA_MAX_SPECIFICATION_WORK = 100000;

// One bounded source: text parsing + two descriptor copies + one text-cap of key/visit/parse
// headroom (100 work units per maximum-count row). Wide records/multiple sources still share this cap.
export const VEGA_MAX_DATA_WORK = 4 * VEGA_MAX_TEXT_LENGTH;

// Five view copies (input, parser, parsed output, materialized spec and materialized rows) plus
// three text-caps of key/visit/transform/domain headroom. Preparation's three baseline copies use
// the same fixed allowance independently. Neither limit scales with input size or view fanout.
// Charge every copied key/string/array slot cumulatively across the entire build/preparation.
export const VEGA_MAX_PIPELINE_WORK = 2 * VEGA_MAX_DATA_WORK;

// Rows are objects, but so are the spec, data wrapper, encodings and nested metadata. Reserve the
// fixed grammar allowance in addition to the row allowance; never derive a limit from input size.
export const VEGA_MAX_CLONE_NODES = VEGA_MAX_DATA_ROWS + VEGA_MAX_SPECIFICATION_WORK;

// Deliberately independent of linear copying: window frames, sorts, Cartesian transforms and
// statistical kernels must not acquire a larger operation allowance merely because input is large.
export const VEGA_MAX_SEMANTIC_OPERATIONS = 2000000;
