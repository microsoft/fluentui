export interface ProviderContextValue {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document;

  /**
   * The provider will use `forced-color-adjust: none` to bail out from system forced colors.
   * Setting this flag means the Fluent application will no longer be affected by windows high contrast mode.
   */
  noForcedColors?: boolean;
}
