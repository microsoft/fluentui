import { statusSharedColors, personaSharedColors, mappedStatusColors } from '../global/colorPalette';
import { statusSharedColorNames, personaSharedColorNames } from '../sharedColorNames';
import { ColorPaletteTokens, ColorStatusTokens, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';
import { statusColorMapping } from '../statusColorMapping';

const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].tint60,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].shade10,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].primary,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as StatusColorPaletteTokens);

// one-off patch for yellow
statusColorPaletteTokens.colorPaletteYellowForeground1 = statusSharedColors.yellow.shade30;

statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.tint20;
statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.tint20;
statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.tint40;

const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].primary,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as PersonaColorPaletteTokens);

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };

export const colorStatusTokens: ColorStatusTokens = Object.entries(statusColorMapping).reduce(
  (acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);

    // TODO: double check the mapping with design
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].tint60,
      [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].shade10,
      [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].shade30,
      [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].primary,
    };

    return Object.assign(acc, statusColorTokens);
  },
  {} as ColorStatusTokens,
);

// one-off overrides for colorStatus tokens
colorStatusTokens.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
colorStatusTokens.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;

colorStatusTokens.colorStatusWarningForeground1 = mappedStatusColors[statusColorMapping.warning].shade20;
colorStatusTokens.colorStatusWarningForeground3 = mappedStatusColors[statusColorMapping.warning].shade20;
colorStatusTokens.colorStatusWarningBorder2 = mappedStatusColors[statusColorMapping.warning].shade20;
