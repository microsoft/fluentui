export interface NormalizePackageDependenciesGeneratorSchema {
  /**
   * filter generator to  library or application. If not specified all projects are being used
   */
  projectType?: 'application' | 'library' | 'any';
  /**
   * filter generator to be applied only on projects that contain provided tag
   */
  tag?: string;
  /**
   * Verify package.json dependencies for all projects
   */
  verify?: boolean;
}
