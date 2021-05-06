import { ITheme } from '@fluentui/theme';
import { getNeutralVariant, getSoftVariant, getStrongVariant } from './variants';

/**
 * Add all variants to provided theme as elements of the theme's scheme property.
 * Any existing schemes will be overwritten.
 */
export function addVariants(theme: ITheme): void {
  theme.schemes = {
    strong: getStrongVariant(theme),
    soft: getSoftVariant(theme),
    neutral: getNeutralVariant(theme),
  };
}
