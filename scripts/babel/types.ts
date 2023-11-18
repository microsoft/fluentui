import type { PluginTarget } from '@babel/core';

export interface BabelPresetOptions {
  tsBaseConfigPath: string;
}

export type BabelPluginItem = [PluginTarget, Record<string, unknown>];
