import { IRawFontStyle, ITypography, IFontChoice, IFontFamilies, IFontVariant } from '../interfaces/ITypography';
import { DefaultFontSizes, DefaultFontWeights, DefaultFontVariants } from '../defaults/index';

/**
 * create the typography section of the theme
 *
 * @param localeCode - language code to use for font picking
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function createTypography(families: IFontFamilies): ITypography {
  return {
    families,
    sizes: DefaultFontSizes,
    weights: DefaultFontWeights,
    variants: DefaultFontVariants
  };
}

function _resolveKey(
  key: string,
  options: IFontChoice,
  lookup: object, standardVariant: Partial<IFontVariant>, thisVariant?: Partial<IFontVariant>): any {
  let val = options[key] || (thisVariant && (thisVariant[key] || standardVariant[key]));
  if (val && typeof val === 'string') {
    val = lookup[val] || val;
  }
  return val;
}

/**
 * This can be used in two ways.  The default behavior is onlySpecified being falsy.  In this mode
 * a full font definition will be provided falling back to the standard font variant, patched with
 * any overriden font variants, then patched with specified properties such as family.
 *
 * If onlySpecified is true this will exclude the font smoothing settings and only provide result
 * values for things that are set in the fontChoice.  This is designed to produce the minimum set
 * of properties to apply on top of a base definition.
 *
 * @param font - specified font settings, variant, family, etc
 * @param typography - current typography settings for the current theme/scheme
 * @param onlySpecified - if specified and true, this will not assume a baseline font variant and will
 * only return values for things specified in the font choice.  If font is empty, it will return an
 * empty IRawStyle
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function resolveFontChoice(fontChoice: IFontChoice, typography: ITypography): IRawFontStyle {
  const variant = fontChoice.fontVariant;
  const stdVariant = typography.variants.standard;
  const thisVariant = variant && typography.variants[variant];
  const fontFamily = _resolveKey('fontFamily', fontChoice, typography.families, stdVariant, thisVariant) as IRawFontStyle['fontFamily'];

  return {
    fontFamily,
    fontSize: _resolveKey('fontSize', fontChoice, typography.sizes, stdVariant, thisVariant),
    fontWeight: _resolveKey('fontWeight', fontChoice, typography.weights, stdVariant, thisVariant),
    ...(fontFamily && { MozOsxFontSmoothing: 'grayscale', WebkitFontSmoothing: 'antialiased' })
  };
}
