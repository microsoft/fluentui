export interface Result {
  passed: boolean;
  diffPixels?: any;
  diffPath?: string;
  file: any;
  changeType?: 'add' | 'diff' | 'remove';
  error?: string;
}

export interface Metadata {
  paths: {
    baselineDir: string;
    actualDir: string;
    diffDir: string;
    reportPath: string;
  };
  project: {
    root: string;
    name: string;
  };
}

export interface Report {
  results: Result[];
  metadata: Metadata;
}
