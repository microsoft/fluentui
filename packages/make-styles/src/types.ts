import { Properties as CSSProperties } from 'csstype';

export interface MakeStyles extends Omit<CSSProperties, 'animationName'> {
  // TODO Questionable: how else would users target their own children?
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  animationName?: object | string;
}

export type MakeStylesStyleFunctionRule<Tokens> = (tokens: Tokens) => MakeStyles;
export type MakeStylesStyleRule<Tokens> = MakeStyles | MakeStylesStyleFunctionRule<Tokens>;

export interface MakeStylesOptions<Tokens> {
  dir: 'ltr' | 'rtl';
  renderer: MakeStylesRenderer;
  tokens: Tokens;
}

export type MakeStaticStyles =
  | ({
      [key: string]: CSSProperties &
        // TODO Questionable: how else would users target their own children?
        Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
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

export type MakeStylesResolvedRule = [
  /* bucketName */ StyleBucketName,
  /* className */ string | undefined,
  /* css */ string,
  /* rtlCSS */ string?,
];

// Renderer types

export type MakeStylesReducedDefinitions = Record<string, MakeStylesResolvedRule>;

export interface MakeStylesRenderer {
  id: string;

  insertDefinitions(dir: 'ltr' | 'rtl', resolvedDefinitions: MakeStylesReducedDefinitions): string;
}

/**
 * Buckets under which we will group our stylesheets.
 */
export type StyleBucketName =
  // default
  | ''
  // link
  | 'l'
  // visited
  | 'v'
  // focus-within
  | 'w'
  // focus
  | 'f'
  // focus-visible
  | 'i'
  // hover
  | 'h'
  // active
  | 'a'
  // at-rules (@media, @support)
  | 't';
