// Type definitions for ignore-not-found-export-webpack-plugin 1.0.2

declare module 'ignore-not-found-export-webpack-plugin' {
  import type { Compiler } from 'webpack';
  interface Options {
    include: RegExp | RegExp[];
  }

  class IgnoreNotFoundExportWebpackPlugin {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
  }

  export = IgnoreNotFoundExportWebpackPlugin;
}
