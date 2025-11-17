/* Todo: Move all of this logic into a separate theme package */

import { defaultLightPrimitives, defaultLightGenerics } from './defaultLightTheme';
import { ThemePrimitives } from '../primitives/primitives.types';
import { genericFallbacks } from '../../scripts/definitions/fallbacks/genericFallbacks';
import { GroupTokens } from '../groups/groups.types';
import { GenericTokens } from '../generics/generics.types';
import { splitCamelCase } from '../../utils/splitCamelCase';

const createLightGenerics = (primitives: ThemePrimitives): Record<string, string> => {
  const generics: Record<string, string> = { ...defaultLightGenerics };

  Object.keys(genericFallbacks).forEach(genericName => {
    const fallback = genericFallbacks[genericName];
    if (fallback.primitive) {
      generics[genericName] = primitives[fallback.primitive];
    }
  });

  return generics;
};

export const createLightTheme = ({
  themePrimitives,
  themeTokens,
}: {
  themePrimitives?: Partial<ThemePrimitives>;
  themeTokens: Partial<GenericTokens & GroupTokens>;
}): Record<string, string> => {
  const primitives: ThemePrimitives = {
    ...defaultLightPrimitives,
    ...themePrimitives,
  };

  const themeProperties: Record<string, string> = {
    ...defaultLightGenerics,
    ...createLightGenerics(primitives),
    ...themeTokens,
  };

  const themeValues: Record<string, string> = {};
  Object.keys(themeProperties).forEach(tokenName => {
    const cssVarName = `smtc-${splitCamelCase(tokenName)}`;
    themeValues[cssVarName] = themeProperties[tokenName];
  });

  return themeValues;
};
