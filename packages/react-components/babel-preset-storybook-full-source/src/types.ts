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
   * When `true` (or a config object), the plugin will:
   *  - Preserve `*.module.css` imports (rewriting paths to `./styles/<basename>`)
   *  - Auto-detect CSS module files on disk and inject `Story.parameters.cssModuleSources.cssModules`
   *  - If `tokensFilePath` is provided, inject `Story.parameters.cssModuleSources.tokensSource`
   *
   * @default false
   */
  cssModules?: boolean | CssModulesConfig;
}
