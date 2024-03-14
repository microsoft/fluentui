import { type Options as SwcOptions } from '@swc/core';

declare module '@swc/core' {
  interface BaseModuleConfig {
    resolveFully?: boolean;
  }
}

export type Options = SwcOptions & Required<Pick<SwcOptions, 'module' | 'outputPath'>> & { root?: string };
