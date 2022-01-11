import * as CSS from 'csstype';

export type MakeStylesCSSValue = string | 0;

type MakeStylesUnsupportedCSSProperties = {
  // We don't support expansion of CSS shorthands
  animation?: never;
  background?: never;
  border?: never;
  borderBlock?: never;
  borderBlockEnd?: never;
  borderBlockStart?: never;
  borderBottom?: never;
  borderColor?: never;
  borderImage?: never;
  borderInline?: never;
  borderInlineEnd?: never;
  borderInlineStart?: never;
  borderLeft?: never;
  borderRadius?: never;
  borderRight?: never;
  borderStyle?: never;
  borderTop?: never;
  borderWidth?: never;
  columnRule?: never;
  flex?: never;
  flexFlow?: never;
  font?: never;
  gap?: never;
  grid?: never;
  gridArea?: never;
  gridColumn?: never;
  gridGap?: never;
  gridRow?: never;
  gridTemplate?: never;
  listStyle?: never;
  margin?: never;
  mask?: never;
  maskBorder?: never;
  offset?: never;
  outline?: never;
  overflow?: never;
  padding?: never;
  placeItems?: never;
  placeSelf?: never;
  textDecoration?: never;
  textEmphasis?: never;
  transition?: never;
};
type MakeStylesCSSProperties = Omit<
  CSS.Properties<MakeStylesCSSValue>,
  // We have custom definition for "animationName" and "fontWeight"
  'animationName' | 'fontWeight'
> &
  MakeStylesUnsupportedCSSProperties;

export type MakeStylesStrictCSSObject = MakeStylesCSSProperties &
  MakeStylesCSSPseudos & {
    animationName?: MakeStylesAnimation | MakeStylesAnimation[] | CSS.AnimationProperty;
    fontWeight?: CSS.Properties['fontWeight'] | string;
  };

type MakeStylesCSSPseudos = {
  [Property in CSS.Pseudos]?:
    | (MakeStylesStrictCSSObject & { content?: string })
    | (MakeStylesCSSObjectCustomL1 & { content?: string });
};

//
// "MakeStylesCSSObjectCustom*" is a workaround to avoid circular references in types that are breaking TS <4.
// Once we will support "typesVersions" (types downleleving) or update our requirements for TS this should be
// updated or removed.
//

type MakeStylesCSSObjectCustomL1 = {
  [Property: string]: MakeStylesCSSValue | undefined | MakeStylesCSSObjectCustomL2;
} & MakeStylesStrictCSSObject;
type MakeStylesCSSObjectCustomL2 = {
  [Property: string]: MakeStylesCSSValue | undefined | MakeStylesCSSObjectCustomL3;
} & MakeStylesStrictCSSObject;
type MakeStylesCSSObjectCustomL3 = {
  [Property: string]: MakeStylesCSSValue | undefined | MakeStylesCSSObjectCustomL4;
} & MakeStylesStrictCSSObject;
type MakeStylesCSSObjectCustomL4 = {
  [Property: string]: MakeStylesCSSValue | undefined | MakeStylesCSSObjectCustomL5;
} & MakeStylesStrictCSSObject;
type MakeStylesCSSObjectCustomL5 = {
  [Property: string]: MakeStylesCSSValue | undefined;
} & MakeStylesStrictCSSObject;

export type MakeStylesAnimation = Record<'from' | 'to' | string, MakeStylesCSSObjectCustomL1>;
export type MakeStylesStyle = MakeStylesStrictCSSObject | MakeStylesCSSObjectCustomL1;

export interface MakeStylesOptions {
  dir: 'ltr' | 'rtl';
  renderer: MakeStylesRenderer;
}

export type MakeStaticStylesStyle = {
  [key: string]: CSS.Properties &
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
};
export type MakeStaticStyles = MakeStaticStylesStyle | string;

export interface MakeStaticStylesOptions {
  renderer: MakeStylesRenderer;
}

export interface MakeStylesRenderer {
  id: string;

  /**
   * @private
   */
  insertionCache: Record<string, StyleBucketName>;

  /**
   * @private
   */
  styleElements: Partial<Record<StyleBucketName, HTMLStyleElement>>;

  /**
   * @private
   */
  insertCSSRules(cssRules: CSSRulesByBucket): void;
}

/**
 * Buckets under which we will group our stylesheets.
 */
export type StyleBucketName =
  // default
  | 'd'
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

export type SequenceHash = string;
export type PropertyHash = string;

export type CSSClasses = /* ltrClassName */ string | [/* ltrClassName */ string, /* rtlClassName */ string];

export type CSSClassesMap = Record<PropertyHash, CSSClasses>;
export type CSSClassesMapBySlot<Slots extends string | number> = Record<Slots, CSSClassesMap>;

export type CSSRulesByBucket = Partial<Record<StyleBucketName, string[]>>;

export type StylesBySlots<Slots extends string | number> = Record<Slots, MakeStylesStyle>;

export type LookupItem = [/* definitions */ CSSClassesMap, /* dir */ 'rtl' | 'ltr'];
