import { getNeutralVariant, getSoftVariant, getStrongVariant } from './variants';
import type { ITheme } from '@fluentui/theme';

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
