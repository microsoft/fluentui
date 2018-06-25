import { IStyleFunction } from '@uifabric/merge-styles';

export type IClassNames<TStyleProps, TStyles> = {
  [key in keyof TStyles]?: TStyles[key] extends Function ? IStyleFunction<TStyleProps, TStyles> : string
};
