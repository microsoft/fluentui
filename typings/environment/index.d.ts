declare namespace NodeJS {
  interface ExtendedProcessEnv {
    env: {
      NODE_ENV?: 'production' | 'development' | 'test';
      LAGE_PACKAGE_NAME?: string;
      CI?: string;
      TF_BUILD?: string;
    };
  }

  /**
   * NOTE:
   * proper DX and type-checking wont work whenever a library that uses `@types/webpack-env` is used in your code.
   *
   * WHY?:
   * - `@types/webpack-env` defines `env` as `any`, thus making extension incompatible. @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/webpack-env/index.d.ts#L275
   * - `@storybook/addons` module type definitions internally reference `@types/webpack-env` so `process.env` type checking/DX wont work in all storybook configs/files
   */
  export interface ProcessEnv extends ExtendedProcessEnv {}
}

declare var process: NodeJS.ProcessEnv;
