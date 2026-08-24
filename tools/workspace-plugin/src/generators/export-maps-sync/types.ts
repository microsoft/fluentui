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
   * Subpath *patterns*, relative to the project root, emitted as wildcard export entries rather than
   * being expanded. Each must contain exactly one `*` and end in `/index.ts`, so
   * `src/items/*\/index.ts` becomes `./items/*`.
   *
   * The `/index.ts` shape is required by `generate-api`, which expands a wildcard entry by scanning
   * for sub-directories and reading `index.d.ts` from each.
   * @default []
   */
  subpathPatterns: string[];
}
