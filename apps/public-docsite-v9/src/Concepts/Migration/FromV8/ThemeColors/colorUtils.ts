import { colorMap } from './colorMap';
import { ColorInfo, ColorKind } from './types';
import {
  black,
  blackAlpha,
  brandWeb,
  grey,
  sharedColors,
  white,
  whiteAlpha,
} from '../../../../shims/ThemeShim/themeDuplicates';
import { DefaultPalette } from '@fluentui/react';

const palettePrefix = 'palette.';
const paletteMap = DefaultPalette as unknown as Record<string, string>;

const blackAlphaPrefix = 'blackAlpha[';
const greyPrefix = 'grey[';
const whiteAlphaPrefix = 'whiteAlpha[';
const sharedColorsPrefix = 'sharedColors.';
const brandPrefix = 'brand[';

const blackAlphaMap = blackAlpha as unknown as Record<string, string>;
const greyMap = grey as unknown as Record<string, string>;
const whiteAlphaMap = whiteAlpha as unknown as Record<string, string>;
const sharedColorsMap = sharedColors as unknown as Record<string, string>;
const brandMap = brandWeb as unknown as Record<string, string>;

const getV9BlackAlpha = (name: string): string => {
  const rampNumber = name.substring(blackAlphaPrefix.length, name.length - 1);
  return blackAlphaMap[rampNumber];
};

const getV9Grey = (name: string): string => {
  const rampNumber = name.substring(greyPrefix.length, name.length - 1);
  return greyMap[rampNumber];
};

const getV9WhiteAlpha = (name: string): string => {
  const rampNumber = name.substring(whiteAlphaPrefix.length, name.length - 1);
  return whiteAlphaMap[rampNumber];
};

const getV9SharedColor = (name: string): string => {
  const colorParts = name.substring(sharedColorsPrefix.length).split('.');
  if (colorParts.length !== 2) {
    throw new Error('Could not get color block info. Unsupported shared color specified.');
  }
  const parent = sharedColorsMap[colorParts[0]];
  return (parent as unknown as Record<string, string>)[colorParts[1]];
};

const getV9BrandColor = (name: string): string => {
  const rampNumber = name.substring(brandPrefix.length, name.length - 1);
  return brandMap[rampNumber];
};

const getv9GlobalColor = (name: string): string => {
  if (name === 'black') {
    return black;
  } else if (name.startsWith(blackAlphaPrefix)) {
    return getV9BlackAlpha(name);
  } else if (name.startsWith(greyPrefix)) {
    return getV9Grey(name);
  } else if (name.startsWith(whiteAlphaPrefix)) {
    return getV9WhiteAlpha(name);
  } else if (name === 'white') {
    return white;
  } else if (name.startsWith(sharedColorsPrefix)) {
    return getV9SharedColor(name);
  } else if (name.startsWith(brandPrefix)) {
    return getV9BrandColor(name);
  } else {
    return name;
  }
};

export const getPaletteColorInfo = (name: string): ColorInfo => {
  const color = paletteMap[name];

  return {
    name,
    colorName: '',
    colorValue: color,
    kind: 'v8-palette',
  };
};

export const getSemanticColorInfo = (name: string): ColorInfo => {
  const colorName = colorMap.v8Semantic[name];

  let color = colorName;
  if (colorName.startsWith(palettePrefix)) {
    color = paletteMap[colorName.substring(palettePrefix.length)];
  }

  return {
    name,
    colorName,
    colorValue: color,
    kind: 'v8-semantic',
  };
};

export const getGlobalColorInfo = (name: string): ColorInfo => {
  const color = getv9GlobalColor(name);

  return {
    name,
    colorName: '',
    colorValue: color,
    kind: 'v9-global',
  };
};

export const getAliasColorInfo = (name: string): ColorInfo => {
  const colorName = colorMap.v9Alias[name];
  let color = colorName;
  if (colorName) {
    color = getv9GlobalColor(colorName);
  }

  return {
    name,
    colorName,
    colorValue: color,
    kind: 'v9-alias',
  };
};

export const getColorBlockInfo = (name: string, kind: ColorKind) => {
  switch (kind) {
    case 'v8-palette':
      return getPaletteColorInfo(name);
    case 'v8-semantic':
      return getSemanticColorInfo(name);
    case 'v9-global':
      return getGlobalColorInfo(name);
    case 'v9-alias':
      return getAliasColorInfo(name);
    default:
      break;
  }
  throw new Error('Could not get color block info. Unsupported color kind.');
};
