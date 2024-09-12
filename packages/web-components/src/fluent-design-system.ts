/**
 * Design system configuration for the Fluent Web Components library.
 *
 * @public
 */
export const FluentDesignSystem = Object.freeze({
  prefix: 'fluent',
  shadowRootMode: 'open',
  registry: customElements,
});

/**
 * Generates an element name based on the base name and the design system prefix.
 * @param baseName - The base name of the element
 * @returns The generated element name
 *
 * @public
 */
export function generateElementName(baseName: string): string {
  return `${FluentDesignSystem.prefix}-${baseName}`;
}
