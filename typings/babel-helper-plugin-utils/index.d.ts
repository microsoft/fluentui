// TODO: replace with @types/babel__helper-plugin-utils once upgrade to TS4 will be merged

declare module '@babel/helper-plugin-utils' {
  import * as babel from '@babel/core';

  export type BabelAPI = typeof babel & babel.ConfigAPI;

  export function declare<O extends Record<string, any>, R extends babel.PluginObj = babel.PluginObj>(
    builder: (api: BabelAPI, options: O, dirname: string) => R,
  ): (api: object, options: O | null | undefined, dirname: string) => R;
}
