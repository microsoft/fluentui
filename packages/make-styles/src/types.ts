import { Properties as CSSProperties } from 'csstype';

export interface MakeStyles extends Omit<CSSProperties, 'animationName'> {
  // TODO Questionable: how else would users target their own children?
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  animationName?: object | string;
}

export type MakeStylesMatcher<Selectors> = ((selectors: Selectors) => boolean | undefined) | null;
export type MakeStylesStyleFunctionRule<Tokens> = (tokens: Tokens) => MakeStyles;
export type MakeStylesStyleRule<Tokens> = MakeStyles | MakeStylesStyleFunctionRule<Tokens>;

export type MakeStylesDefinition<Selectors, Tokens> = [MakeStylesMatcher<Selectors>, MakeStylesStyleRule<Tokens>];
export interface MakeStylesOptions<Tokens> {
  rtl?: boolean;
  renderer: MakeStylesRenderer;
  tokens: Tokens;
}

export type MakeStaticStyles =
  | ({
      [key: string]: CSSProperties;
    } & {
      '@font-face'?: {
        fontFamily: string;
        src: string;

        fontFeatureSettings?: string;
        fontStretch?: string;
        fontStyle?: string;
        fontVariant?: string;
        fontVariationSettings?: string;
        fontWeight?: number | string;

        unicodeRange?: string;
      };
    })
  | string;

export interface MakeStaticStylesOptions {
  renderer: MakeStylesRenderer;
}

// Build time / runtime types

export type MakeStylesResolvedRule = [/* className */ string | undefined, /* css */ string, /* rtlCSS */ string?];

export type MakeStylesResolvedDefinition<Selectors, Tokens> = [
  MakeStylesMatcher<Selectors>,
  MakeStylesStyleRule<Tokens> | undefined,
  Record<string, MakeStylesResolvedRule>,
];

// Renderer types

export type MakeStylesMatchedDefinitions = Record<string, MakeStylesResolvedRule>;

export interface MakeStylesRenderer {
  id: string;

  insertDefinitions(resolvedDefinitions: MakeStylesMatchedDefinitions, rtl: boolean): string;
}
