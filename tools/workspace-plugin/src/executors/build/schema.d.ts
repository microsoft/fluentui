export interface BuildExecutorSchema {
  /** relative to {projectRoot} */
  sourceRoot: string;
  /** Root directory where all output assets will live. Relative to {workspaceRoot} */
  outputPathRoot: string;
  moduleOutput: Array<{
    /** relative to outputPathRoot */
    outputPath: string;
    module: 'es6' | 'commonjs' | 'amd';
  }>;
  assets?: Array<
    | string
    | {
        glob: string;
        input: string;
        output: string;
        /**
         * an object of key-value pairs to replace in the output path
         */
        substitutions?: Record<string, string>;
      }
  >;
  /**
   * Whether to clean the output directory before building
   */
  clean?: boolean;
}
