import type { BrandVariants, Theme } from '@fluentui/react-components';
import { brandRamp } from './getOverridableTokenBrandColors';

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
