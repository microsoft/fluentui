/** Configuration for documenting `data-*` members from exported component state types. */
export type StateDataAttributesConfig = {
  /**
   * Absolute root of the built package whose `package.json` `exports` map declares the direct `types`
   * entry points (API Extractor-style `.d.ts` rollups) to scan for exported `*State` declarations.
   *
   * The package must already be built: extraction reads the on-disk `.d.ts` rollups resolved from the
   * export map, it never falls back to scanning TypeScript source.
   */
  packageRoot: string;
};

/** Options for the `@fluentui/react-storybook-addon` Storybook preset. */
export interface PresetConfig {
  /** Adds all `data-*` members. */
  stateDataAttributes?: StateDataAttributesConfig;
}
