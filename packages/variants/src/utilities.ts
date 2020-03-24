import { ITheme } from 'office-ui-fabric-react';
import { getNeutralVariant, getSoftVariant, getStrongVariant } from './variants';

/**
 * Add all variants to provided theme as elements of the theme's scheme property.
 * Any existing schemes will be overwritten.
 *
 * @export
 * @param {ITheme} theme Theme for which variants will be added.
 */
export function addVariants(theme: ITheme): void {
  theme.schemes = {
    strong: getStrongVariant(theme),
    soft: getSoftVariant(theme),
    neutral: getNeutralVariant(theme),
  };
}
