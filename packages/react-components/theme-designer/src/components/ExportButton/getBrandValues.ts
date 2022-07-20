import type { BrandVariants, Theme } from '@fluentui/react-components';
import { brandRamp } from '../ColorTokens/getOverridableTokenBrandColors';

export const getBrandValues = (brand: BrandVariants, overrideList: Partial<Theme>, spacer: string) => {
  const hexToBrand: Record<string, string> = {};

  brandRamp.map(i => {
    hexToBrand[brand[i]] = 'brand[' + `${i as number}` + ']';
    return;
  });

  const stringOverrideList = overrideList as Record<string, string>;

  const overrideString = Object.keys(overrideList).map(token => {
    return '\n' + spacer + token + ': ' + hexToBrand[stringOverrideList[token]];
  });

  return overrideString;
};
