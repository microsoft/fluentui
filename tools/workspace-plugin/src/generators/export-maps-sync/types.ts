/**
 * Per project entry point declaration, provided via `project.json#metadata.exportMap`.
 *
 * Entry points cannot be inferred from the file layout: `react-headless-components-preview/src/*.ts`
 * are all export subpaths, while `react-button/src/*.ts` are internal re-export modules.
 */
export interface ExportMapConfig {
  /**
   * Whether the package exposes a root (`"."`) entry point resolved from `src/index.ts`.
   * @default true
   */
  root: boolean;
  /**
   * Globs, relative to the project root, resolving to the source files backing non-root export
   * subpaths. Source paths map to subpaths by stripping `src/` and the extension, so
   * `src/color-picker.ts` becomes `./color-picker` and `src/unstable/index.ts` becomes `./unstable`.
   * @default []
   */
  subpathEntryPoints: string[];
  /**
   * Export map keys the generator does not own, eg. `./styles.css`. Only the keys are declared here;
   * their entries stay hand authored in `package.json`, next to the `files` array that ships them,
   * and are read back verbatim on every sync.
   *
   * For asset subpaths that no source glob can produce - a package's compiled stylesheet, a raw
   * `.css` source shipped for `@source` scanning - without them a sync deletes the entry.
   * @default []
   */
  staticSubpaths: string[];
}
