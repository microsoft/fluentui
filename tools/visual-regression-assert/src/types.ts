export interface Result {
  passed: boolean;
  diffPixels?: any;
  diffPath?: string;
  file: any;
  changeType?: 'add' | 'diff' | 'dimensions-diff' | 'remove';
  error?: string;
}

export interface Metadata {
  /**
   * absolute paths
   */
  paths: {
    baselineDir: string;
    actualDir: string;
    diffDir: string;
    outputBaselineDir: string;
    outputPath: string;
  };
  project: {
    root: string;
    /**
     * package.json#name
     */
    name: string;
  };
}

export interface Report {
  results: Result[];
  metadata: Metadata;
}
