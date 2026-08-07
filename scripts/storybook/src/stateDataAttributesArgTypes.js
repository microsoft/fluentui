// @ts-check

/**
 * @file Browser-safe helper that converts state data-attribute metadata
 * into Storybook ArgTypes rows and provides a second-pass enhancer that merges
 * them into the existing ArgTypes produced by Storybook's primary extraction.
 *
 * This module must not import Node-only modules (fs, path, typescript, …) or
 * Storybook runtime modules so it can be loaded in the browser bundle.
 */

/**
 * @typedef {{
 *   name: `data-${string}`;
 *   type: string;
 *   description: string;
 * }} StateDataAttribute
 *
 * @typedef {Record<string, StateDataAttribute[]>} StateDataAttributes
 *
 * @typedef {{
 *   name: string;
 *   description?: string;
 *   type?: { name: string; value?: string; required?: boolean };
 *   table?: { category?: string; type?: { summary?: string } };
 *   control?: boolean | string | object;
 *   [key: string]: unknown;
 * }} ArgTypeRow
 *
 * @typedef {Record<string, ArgTypeRow>} ArgTypes
 *
 * @typedef {(component: unknown) => ArgTypes} ExtractArgTypes
 *
 * @typedef {{
 *   title: string;
 *   component?: unknown;
 *   subcomponents?: Record<string, unknown>;
 *   argTypes?: ArgTypes;
 *   parameters?: {
 *     docs?: {
 *       extractArgTypes?: ExtractArgTypes;
 *       argTypes?: { include?: string[]; exclude?: string[]; [key: string]: unknown };
 *       [key: string]: unknown;
 *     };
 *     [key: string]: unknown;
 *   };
 * }} StoryContext
 */

// Module-local Symbol used to mark and retrieve the original base extractor
// stored on a wrapped extractor function.
const BASE_EXTRACTOR_KEY = Symbol('stateDataAttributesArgTypes.baseExtractor');

/**
 * Converts an array of {@link StateDataAttribute} entries into a Storybook
 * ArgTypes map.  The generated rows are read-only (control: false) and placed
 * in the "Data attributes" category.
 *
 * @param {StateDataAttribute[]} metadata
 * @returns {ArgTypes}
 */
function toDataAttributeArgTypes(metadata) {
  /** @type {ArgTypes} */
  const result = {};

  for (const attr of metadata) {
    result[attr.name] = {
      name: attr.name,
      description: attr.description,
      type: { name: 'other', value: attr.type, required: false },
      table: { category: 'Data attributes', type: { summary: attr.type } },
      control: false,
    };
  }

  return result;
}

/**
 * Resolves the metadata key for a component using:
 * 1. displayName property — if present and found in allMetadata
 * 2. function name — if present and found in allMetadata
 * 3. final segment of the story title — as last fallback
 *
 * @param {unknown} component
 * @param {string} title
 * @param {StateDataAttributes} allMetadata
 * @returns {string | undefined}
 */
function resolvePrimaryKey(component, title, allMetadata) {
  if (component && (typeof component === 'object' || typeof component === 'function')) {
    const fn = /** @type {{ displayName?: string; name?: string }} */ (component);
    if (fn.displayName && Object.prototype.hasOwnProperty.call(allMetadata, fn.displayName)) {
      return fn.displayName;
    }
    if (fn.name && Object.prototype.hasOwnProperty.call(allMetadata, fn.name)) {
      return fn.name;
    }
  }
  // fall back to final title segment
  const segments = title.split('/');
  const last = segments[segments.length - 1];
  return last || undefined;
}

/**
 * Builds a Map from component reference (any value stored in subcomponents) to
 * the string key used in the subcomponents record.
 *
 * @param {Record<string, unknown> | undefined} subcomponents
 * @returns {Map<unknown, string>}
 */
function buildReferenceMap(subcomponents) {
  /** @type {Map<unknown, string>} */
  const map = new Map();
  if (!subcomponents) {
    return map;
  }
  for (const [key, ref] of Object.entries(subcomponents)) {
    map.set(ref, key);
  }
  return map;
}

/**
 * Wraps a base `extractArgTypes` function so that when it is called with a
 * component reference it also injects the corresponding data-attribute ArgType
 * rows (merged before existing rows so existing rows win on collision).
 *
 * The wrapper stores the original base extractor under {@link BASE_EXTRACTOR_KEY}
 * so that subsequent calls to `wrapExtractor` can unwrap it and avoid stacking.
 *
 * @param {ExtractArgTypes | undefined} baseExtractor
 * @param {StateDataAttributes} allMetadata
 * @param {Map<unknown, string>} refMap  Maps component reference → subcomponents key
 * @returns {ExtractArgTypes}
 */
function wrapExtractor(baseExtractor, allMetadata, refMap) {
  /**
   * @param {unknown} component
   * @returns {ArgTypes}
   */
  function wrappedExtractor(component) {
    // Call base extractor with exactly one argument
    const existingArgTypes = baseExtractor ? baseExtractor(component) : {};

    // Resolve the metadata key: reference map first, then displayName, then name
    let metadataKey;
    if (refMap.has(component)) {
      metadataKey = refMap.get(component);
    } else if (component && (typeof component === 'object' || typeof component === 'function')) {
      const fn = /** @type {{ displayName?: string; name?: string }} */ (component);
      metadataKey = fn.displayName || fn.name || undefined;
    }

    if (!metadataKey || !allMetadata[metadataKey]) {
      return { ...existingArgTypes };
    }

    // Merge: generated rows first, existing rows second (existing win)
    const generated = toDataAttributeArgTypes(allMetadata[metadataKey]);
    return { ...generated, ...existingArgTypes };
  }

  // Tag the wrapper with the base extractor so future calls can unwrap
  /** @type {any} */ (wrappedExtractor)[BASE_EXTRACTOR_KEY] = baseExtractor;

  return wrappedExtractor;
}

/**
 * Creates a Storybook second-pass ArgTypes enhancer that merges state
 * data-attribute metadata into the ArgTypes produced by the primary extraction.
 *
 * @param {StateDataAttributes} allMetadata  Full metadata map from getStateDataAttributes.
 * @returns {((context: StoryContext) => ArgTypes) & { secondPass: true }}
 */
function createStateDataAttributesArgTypesEnhancer(allMetadata) {
  /**
   * @param {StoryContext} context
   * @returns {ArgTypes}
   */
  function enhancer(context) {
    const { title, component, subcomponents, argTypes: existingArgTypes = {}, parameters = {} } = context;

    // ── clone parameters.docs to avoid mutating the original object ────────────
    const originalDocs = parameters.docs ?? {};
    /** @type {NonNullable<NonNullable<StoryContext['parameters']>['docs']>} */
    const clonedDocs = { ...originalDocs };

    // ── unwrap to base extractor if already wrapped; create fresh wrapper ───────
    const incomingExtractor = /** @type {any} */ (originalDocs.extractArgTypes);
    const baseExtractor =
      incomingExtractor && Object.prototype.hasOwnProperty.call(incomingExtractor, BASE_EXTRACTOR_KEY)
        ? /** @type {ExtractArgTypes | undefined} */ (incomingExtractor[BASE_EXTRACTOR_KEY])
        : /** @type {ExtractArgTypes | undefined} */ (incomingExtractor);

    const refMap = buildReferenceMap(subcomponents);
    const freshWrapper = wrapExtractor(baseExtractor, allMetadata, refMap);

    // Replace extractArgTypes in cloned docs with fresh wrapper
    clonedDocs.extractArgTypes = freshWrapper;

    // Replace parameters.docs with cloned version — original docs object is untouched
    if (context.parameters) {
      context.parameters.docs = clonedDocs;
    }

    // ── resolve primary metadata key ─────────────────────────────────────────────
    const primaryKey = resolvePrimaryKey(component, title, allMetadata);
    const primaryMetadata = primaryKey ? allMetadata[primaryKey] : undefined;

    // ── generate primary data-attribute rows ──────────────────────────────────────
    const generatedPrimary = primaryMetadata ? toDataAttributeArgTypes(primaryMetadata) : {};

    // ── merge: generated first, existing second (existing win) ────────────────────
    return { ...generatedPrimary, ...existingArgTypes };
  }

  enhancer.secondPass = /** @type {true} */ (true);
  return /** @type {((context: StoryContext) => ArgTypes) & { secondPass: true }} */ (enhancer);
}

module.exports = { toDataAttributeArgTypes, createStateDataAttributesArgTypesEnhancer };
