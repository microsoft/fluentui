import { ThemePlateSet, TokenSetType } from './ThemeProvider';

export interface ThemePrepared {
  tokens: {
    site: {
      body: ThemePlateSet;
      accent: ThemePlateSet;
      neutral: ThemePlateSet;
    };
    [key: string]: TokenSetType;
  };
  stylesheets: string[];
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export interface Theme extends RecursivePartial<ThemePrepared> {}
