declare namespace NodeJS {
  interface ExtendedProcessEnv {
    env: {
      NODE_ENV?: 'production' | 'development' | 'test';
      LAGE_PACKAGE_NAME?: string;
      CI?: string;
      TF_BUILD?: string;
    };
  }

  // @ts-ignore - ignore type checking on `/typings` package scope, because `@types/webpack-env` defines `env` as `any`,
  // thus making extension incompatible.
  // - `@types/webpack-env` leaks here because we override `@storybook/addons` module type definitions which internally reference `@types/webpack-env`
  export interface ProcessEnv extends ExtendedProcessEnv {}
}

declare var process: NodeJS.ProcessEnv;
