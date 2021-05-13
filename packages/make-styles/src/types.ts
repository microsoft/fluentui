import { Properties as CSSProperties } from 'csstype';

export interface MakeStyles extends Omit<CSSProperties, 'animationName'> {
  // TODO Questionable: how else would users target their own children?
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  animationName?: object | string;
}

export type MakeStylesStyleFunctionRule<Tokens> = (tokens: Tokens) => MakeStyles;
export type MakeStylesStyleRule<Tokens> = MakeStyles | MakeStylesStyleFunctionRule<Tokens>;

export interface MakeStylesOptions {
  dir: 'ltr' | 'rtl';
  renderer: MakeStylesRenderer;
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
  /* rtlClassName */ string?,
  /* rtlCSS */ string?,
];

// Renderer types

export type MakeStylesReducedDefinitions = Record<string, MakeStylesResolvedRule>;

/**
 * A type for transformed styles, matches an output from build time transforms.
 *
 * @internal
 */
export type ResolvedStylesBySlots<Slots extends string> = Record<Slots, Record<string, MakeStylesResolvedRule>>;

export interface MakeStylesRenderer {
  id: string;

  /**
   * @private
   */
  insertionCache: Record<string, true>;

  /**
   * @private
   */
  styleElements: Partial<Record<StyleBucketName, HTMLStyleElement>>;

  /**
   * @private
   */
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
  // @keyframes definitions
  | 'k'
  // at-rules (@media, @support)
  | 't';

export type LookupItem = [/* definitions: */ MakeStylesReducedDefinitions, /* dir:  */ 'rtl' | 'ltr'];
