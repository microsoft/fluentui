export type CLIBuildFixtureOptions = {
  type: 'tree';
  name: string;
  options: { [key: string]: string };
  clean: boolean;
};

export type CLIBuildOptions = {
  griffelMode: GriffelMode;
  mode: WebpackMode;
  verbose: boolean;
  buildDeps: boolean;
};

export type CLIBuildTestConfigOptions = {
  scenario: string;
  testCases: string[];
  sizes: string[];
  browsers: string[];
  sampleSize: number;
  targets: string[];
  port: number;
  testOptions: { [key: string]: string };
};

export type CLIDevOptions = {
  griffelMode: GriffelMode;
  open: boolean;
  mode: WebpackMode;
};

export type CLIProcessResultsOptions = {
  scenario: string;
};

export type CLIRunOptions = {
  scenario: string;
  testCases: string[];
  sizes: string[];
  browsers: string[];
  sampleSize: number;
  targets: string[];
  useConfig: boolean;
  processResults: boolean;
  port: number;
  root: string;
  testOptions: { [key: string]: string };
};

export type CLIServerOptions = {
  port?: number;
  root?: string;
};

export type CLITachometerOptions = {
  scenario: string;
};

export type ConfigResult = {
  testFile: string;
  resultsFile: string;
  configDir: string;
  resultsDir: string;
};

export type ProcessedBrowserBenchmarkDifference = {
  absolute: {
    low: number;
    high: number;
  };
  percentChange: {
    low: number;
    high: number;
  };
};

export type TachometerBenchmark = {
  name: string;
  mean: number;
  differences: (ProcessedBrowserBenchmarkDifference | null)[];
  samples: number[];
  target: string;
  testCase: string;
  size: string;
};

export type ProcessedBrowserBenchmark = TachometerBenchmark;

export type ProcessedBrowserData = {
  scenario: string;
  testCases: {
    [testCase: string]: {
      sizes: {
        [size: string]: {
          browsers: {
            [browser: string]: ProcessedBrowserBenchmark[];
          };
        };
      };
    };
  };
};

export type GriffelMode = 'runtime' | 'buildtime' | 'extraction';

export type TestOptions = Record<string, string>;

export type WebpackMode = 'development' | 'production' | 'none';
