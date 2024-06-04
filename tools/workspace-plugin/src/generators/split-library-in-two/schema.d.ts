export interface SplitLibraryInTwoGeneratorSchema {
  project?: string;
  all?: string;

  /**
   * @internal
   */
  logs?: boolean;

  /**
   * @internal
   */
  skipFormat?: boolean;
}
