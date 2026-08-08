// @ts-check

/**
 * @file Browser-safe helper that converts state data-attribute metadata
 * into Storybook ArgTypes rows and provides a factory for per-component
 * extractors that merge them with native ArgTypes.
 *
 * No runtime imports of Storybook, Node, React, or Nx — safe for browser bundles.
 * Type-only imports below are erased before reaching the browser.
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
 *   type?: { name: string; value?: unknown; required?: boolean };
 *   table?: { category?: string; type?: { summary?: string } };
 *   control?: boolean | string | object;
 *   [key: string]: unknown;
 * }} ArgTypeRow
 *
 * @typedef {Record<string, ArgTypeRow>} ArgTypes
 *
 * @typedef {(component: unknown) => ArgTypes} ExtractArgTypes
 */

/**
 * Converts an array of {@link StateDataAttribute} entries into a Storybook
 * ArgTypes map. Generated rows are read-only (control: false) in "Data attributes".
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
 * Creates a one-argument extractor that:
 * 1. Always calls `nativeExtractArgTypes` with the component.
 * 2. Resolves the component key via `displayName ?? name`.
 * 3. Merges generated data-attribute rows first, native rows last (native wins).
 *
 * @param {((component: any) => ArgTypes | null | undefined) | null | undefined} nativeExtractArgTypes
 * @param {StateDataAttributes} metadata
 * @returns {ExtractArgTypes}
 */
function createStateDataAttributesExtractor(nativeExtractArgTypes, metadata) {
  /**
   * @param {unknown} component
   * @returns {ArgTypes}
   */
  function extract(component) {
    // Always call native extractor first; treat null/undefined result as {}
    const nativeRows = nativeExtractArgTypes ? nativeExtractArgTypes(component) : {};
    const safeNative = nativeRows !== null && nativeRows !== undefined ? nativeRows : {};

    // Type guard: component must be object or function
    if (!component || (typeof component !== 'object' && typeof component !== 'function')) {
      return { ...safeNative };
    }

    const fn = /** @type {{ displayName?: string; name?: string }} */ (component);
    const key = fn.displayName || fn.name || undefined;

    if (!key || !Object.prototype.hasOwnProperty.call(metadata, key)) {
      return { ...safeNative };
    }

    // Merge: generated first, native last (native wins on collision)
    const generated = toDataAttributeArgTypes(metadata[key]);
    return { ...generated, ...safeNative };
  }

  return extract;
}

module.exports = { toDataAttributeArgTypes, createStateDataAttributesExtractor };
