export interface NormalizePackageDependenciesGeneratorSchema {
  /**
   * Filter flag. Use to apply generator execution only on projects that contain provided `projectType` within their `project.json#projectType`.
   */
  projectType?: 'application' | 'library' | 'any';
  /**
   * Filter flag. Use to apply generator execution only on projects that contain provided tag within their `project.json#tags`.
   */
  tag?: string;
  /**
   * Run generator in check(verification mode). Verify package.json dependencies for all projects or filtered projects (if filters are applied)
   */
  verify?: boolean;
}
