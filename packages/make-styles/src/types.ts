import { Properties as CSSProperties } from 'csstype';

export interface MakeStylesBase extends CSSProperties {
  // TODO Questionable: how else would users target their own children?
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface MakeStyles extends Omit<MakeStylesBase, 'animationName'> {
  animationName?: object | string;
}

export type MakeStylesMatcher<Selectors> = ((selectors: Selectors) => boolean | undefined) | null;
export type MakeStylesStyleFunctionRule<Tokens> = (tokens: Tokens) => MakeStyles;
export type MakeStylesStyleRule<Tokens> = MakeStyles | MakeStylesStyleFunctionRule<Tokens>;

export type MakeStylesDefinition<Selectors, Tokens> = [MakeStylesMatcher<Selectors>, MakeStylesStyleRule<Tokens>];

export type MakeStaticStyles = MakeStylesBase | string;
export type MakeStaticStylesStyleFunctionRule<Tokens> = (tokens: Tokens) => MakeStaticStyles;
export type MakeStaticStylesStyleRule<Tokens> = MakeStaticStyles | MakeStaticStylesStyleFunctionRule<Tokens>;

export interface MakeStylesOptions<Tokens> {
  rtl?: boolean;
  renderer: MakeStylesRenderer;
  tokens: Tokens;
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
