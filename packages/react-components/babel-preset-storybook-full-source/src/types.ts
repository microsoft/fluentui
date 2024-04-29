export interface DependencyEntry {
  /**
   * Replaces the dependency with another
   * @default \@fluentui/react-components
   */
  replace: string;
}

export type BabelPluginOptions = Record<string, DependencyEntry>;
