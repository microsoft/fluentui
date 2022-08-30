// Type definitions extension for ignore-not-found-export-webpack-plugin 1.0.3
declare module 'ignore-not-found-export-webpack-plugin' {
  export interface Options {
    include: RegExp | RegExp[];
  }

  declare class IgnoreNotFoundExportWebpackPlugin {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
  }

  export = IgnoreNotFoundExportWebpackPlugin;
}
