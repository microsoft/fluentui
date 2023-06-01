import type { Brands, BrandVariants, Theme } from '@fluentui/react-theme';
import { createDarkTheme } from '@fluentui/react-components';
import { ColorOverrideBrands } from '../Context/ThemeDesignerContext';

export const brandRamp: Brands[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];

export const sortOverrideableColorTokens = (overridableColorTokens: string[]) => {
  return overridableColorTokens.sort((a, b) => {
    if (a.includes('Inverted') && b.includes('Inverted')) {
      return a.localeCompare(b);
    } else if (a.includes('Inverted')) {
      return 1;
    } else if (b.includes('Inverted')) {
      return -1;
    } else {
      return a.localeCompare(b);
    }
  });
};

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
export const getOverridableTokenBrandColors = (theme: Theme, brand: BrandVariants): ColorOverrideBrands => {
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

  const sortedOverrideableColorTokens = sortOverrideableColorTokens(overridableColorTokens);

  // Flips the brand ramp to use the hex values as keys and the brand ramp colors as values for O(1) indexing
  const hexColorToBrand: ColorOverrideBrands = brandRamp.reduce((a: ColorOverrideBrands, c, i) => {
    a[brand[c]] = c;
    return a;
  }, {});

  // Create an assignment of color tokens to brand ramp colors given the hex value
  const brandColors: ColorOverrideBrands = {};
  for (let i = 0; i < sortedOverrideableColorTokens.length; i++) {
    const key = sortedOverrideableColorTokens[i];
    const themeColor = (theme as unknown as Record<string, string>)[key];
    brandColors[key] = hexColorToBrand[themeColor];
  }

  return brandColors;
};

export const createDarkThemeWithUpdatedMapping = (brand: BrandVariants): Theme => {
  const darkTheme = createDarkTheme(brand);
  // Dark themes have a different set of mapping than light themes
  darkTheme.colorBrandForeground1 = brand[110]; // use brand[110] instead of brand[100]
  darkTheme.colorBrandForeground2 = brand[120]; // use brand[120] instead of brand[110]
  return darkTheme;
};
