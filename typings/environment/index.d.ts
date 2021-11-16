declare namespace NodeJS {
  interface ExtendedProcessEnv {
    NODE_ENV?: 'production' | 'development' | 'test';
    LAGE_PACKAGE_NAME?: string;
    CI?: string;
    TF_BUILD?: string;
  }

  /**
   * This needs to look like this to follow confusing node typings that recursively reference ProcessEnv
   * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/v12/globals.d.ts#L764
   * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/v12/globals.d.ts#L918
   */

  export interface ProcessEnv extends ExtendedProcessEnv {
    env: ProcessEnv;
  }
}

declare var process: NodeJS.ProcessEnv;
