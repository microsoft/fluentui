export interface NormalizePackageDependenciesGeneratorSchema {
  /**
   * Run generator in check(verification mode). Verify package.json dependencies for all projects or filtered projects (if filters are applied)
   */
  verify?: boolean;
}
