import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';
import type { ColorOverrides } from '../../utils/colorOverrides';

export const brandRamp: Brands[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];

/**
 * This function returns a list of the accent colors in the theme that use brand colors. We specifically look for color
 * tokens, hence including 'color', and exclude color palette tokens, hence removing 'palette'. We are not looking for
 * neutrals, so we search for 'Brand' and remove 'NeutralStroke'. We also don't care about the Shadow values, so they
 * are excluded. Additionally, there are overrides for specific edge cases that do not match the above criteria.
 *
 * @param theme The theme that is being passed in
 * @param brand The brand that the theme uses
 * @returns A list of color tokens whos values are overridable by the user
 */
export const OverridableTokenBrandColors = (theme: Theme, brand: BrandVariants): ColorOverrides => {
  const addList: string[] = ['colorNeutralStrokeAccessibleSelected'];
  const removeList: string[] = ['colorBrandBackgroundInverted', 'colorNeutralForegroundOnBrand'];

  const overridableColorTokens: string[] = Object.keys(theme).filter(color => {
    if (addList.filter(exceptionColor => exceptionColor === color).length > 0) {
      return true;
    }
    if (removeList.filter(exceptionColor => exceptionColor === color).length > 0) {
      return false;
    }
    return (
      color.startsWith('color') &&
      !color.includes('Palette') &&
      color.includes('Brand') &&
      !color.includes('Shadow') &&
      !color.includes('NeutralStroke')
    );
  });

  // Flips the brand ramp to use the hex values as keys and the brand ramp colors as values for O(1) indexing
  const hexColorToBrand: Record<string, Brands> = brandRamp.reduce((a: Record<string, Brands>, c, i) => {
    a[brand[c]] = c;
    return a;
  }, {});

  // Create an assignment of color tokens to brand ramp colors given the hex value
  const brandColors: ColorOverrides = {};
  for (let i = 0; i < overridableColorTokens.length; i++) {
    const key = overridableColorTokens[i];
    const themeColor = ((theme as unknown) as Record<string, string>)[key];
    brandColors[key] = hexColorToBrand[themeColor];
  }

  return brandColors;
};
