interface DependencyEntry {
  /**
   * Replaces the dependency with another
   * @default \@fluentui/react-components
   */
  replace: string;
}

interface CssModulesConfig {
  /**
   * Absolute path to the tokens CSS file. When provided, the plugin reads this
   * file at build time and injects its content as `Story.parameters.cssModuleSources.tokensSource`.
   */
  tokensFilePath?: string;
}

export interface BabelPluginOptions {
  /** Map of package names to their replacement config (used by `modifyImportsPlugin`). */
  importMappings: Record<string, DependencyEntry>;

  /**
   * Controls how `fullSource` is generated when a story file contains multiple
   * story exports (the standard Component Story Format convention).
   *
   * - `'file'` (default): legacy behavior — the **entire file** is attached as
   *   `fullSource` on the **last** story export. Suited to the one-story-per-file
   *   convention where a file maps to a single example.
   * - `'story'`: each story export gets its **own** sliced `fullSource` containing
   *   only the imports and helper declarations it references, plus that single
   *   story (converted to a renderable function). Suited to files with multiple
   *   stories per component.
   *
   * @default 'file'
   */
  storyGranularity?: 'file' | 'story';

  /**
   * When `true` (or a config object), the plugin will:
   *  - Preserve `*.module.css` imports (rewriting paths to `./styles/<basename>`)
   *  - Auto-detect CSS module files on disk and inject `Story.parameters.cssModuleSources.cssModules`
   *  - If `tokensFilePath` is provided, inject `Story.parameters.cssModuleSources.tokensSource`
   *
   * @default false
   */
  cssModules?: boolean | CssModulesConfig;
}
