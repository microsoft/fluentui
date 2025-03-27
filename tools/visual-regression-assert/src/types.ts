export interface Result {
  passed: boolean;
  diffPixels?: number;
  diffPath?: string;
  file: string;
  changeType?: 'add' | 'diff' | 'dimensions-diff' | 'remove';
  error?: string;
}

export interface Metadata {
  /**
   * nx style absolute paths ( starting at workspace root )
   */
  paths: {
    baselineDir: string;
    actualDir: string;
    diffDir: string;
    outputBaselineDir: string;
    outputPath: string;
  };
  project: {
    /**
     * project root path (nx style absolute path)
     */
    root: string;
    /**
     * package.json#name
     */
    name: string;
  };
}

export type RootReport = { [project_name: string]: Report };

export interface Report {
  results: Result[];
  metadata: Metadata;
}
