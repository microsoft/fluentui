import type { BrandVariants, Theme } from '@fluentui/react-components';
import { brandRamp } from '../components/ColorTokens/getOverridableTokenBrandColors';

export const getBrandValues = (brand: BrandVariants, overrideList: Partial<Theme>, name: string, spacer: string) => {
  const hexToBrand: Record<string, string> = {};

  brandRamp.map(i => {
    hexToBrand[brand[i]] = name + '[' + `${i as number}` + ']';
    return;
  });

  const stringOverrideList = overrideList as Record<string, string>;

  return (
    Object.keys(overrideList).map(token => {
      return '\n' + spacer + token + ': ' + hexToBrand[stringOverrideList[token]];
    }) + '\n'
  );
};

export const objectToString = (input: Record<string, string>, spacer: string) => {
  return (
    Object.keys(input).map(key => {
      return '\n' + spacer + key + ': "' + input[key].toUpperCase() + '"';
    }) + '\n'
  );
};

export const themeToString = (theme: Theme, spacer: string) => {
  const indexableTheme: Record<string, string | number> = theme;
  return (
    // don't put quotes around numbers
    Object.keys(theme).map(key => {
      if (!Number(indexableTheme[key])) {
        return '\n' + spacer + key + ': "' + indexableTheme[key] + '"';
      } else {
        return '\n' + spacer + key + ': ' + indexableTheme[key];
      }
    }) + '\n'
  );
};
