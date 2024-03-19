/* color palette used in both darkTheme and teamsDarkTheme */

import { statusSharedColors, personaSharedColors, mappedStatusColors } from '../global/colorPalette';
import { statusSharedColorNames, personaSharedColorNames } from '../sharedColorNames';
import { ColorPaletteTokens, ColorStatusTokens, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';
import { statusColorMapping } from '../statusColorMapping';

const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].shade40,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].tint20,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].tint20,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as StatusColorPaletteTokens);

// one-off patches
statusColorPaletteTokens.colorPaletteRedForeground3 = statusSharedColors.red.tint30;
statusColorPaletteTokens.colorPaletteRedBorder2 = statusSharedColors.red.tint30;
statusColorPaletteTokens.colorPaletteGreenForeground3 = statusSharedColors.green.tint40;
statusColorPaletteTokens.colorPaletteGreenBorder2 = statusSharedColors.green.tint40;
statusColorPaletteTokens.colorPaletteDarkOrangeForeground3 = statusSharedColors.darkOrange.tint30;
statusColorPaletteTokens.colorPaletteDarkOrangeBorder2 = statusSharedColors.darkOrange.tint30;

statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.primary;
statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.primary;
statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.shade30;

const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].tint30,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as PersonaColorPaletteTokens);

// one-off patches
personaColorPaletteTokens.colorPaletteDarkRedBackground2 = personaSharedColors.darkRed.shade20;
personaColorPaletteTokens.colorPalettePlumBackground2 = personaSharedColors.plum.shade20;

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };

export const colorStatusTokens: ColorStatusTokens = Object.entries(statusColorMapping).reduce(
  (acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);

    // TODO: double check the mapping with design - see the one-off patches above
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].shade40,
      [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].shade30,
      [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].tint40,
      [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].tint20,
      [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].tint30,
      [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].shade10,
      [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].primary,
      [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].tint20,
    };

    return Object.assign(acc, statusColorTokens);
  },
  {} as ColorStatusTokens,
);

// one-off overrides for colorStatus tokens
colorStatusTokens.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
colorStatusTokens.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;

colorStatusTokens.colorStatusDangerForeground3 = mappedStatusColors[statusColorMapping.danger].tint40;
colorStatusTokens.colorStatusDangerBorder2 = mappedStatusColors[statusColorMapping.danger].tint30;
colorStatusTokens.colorStatusSuccessForeground3 = mappedStatusColors[statusColorMapping.success].tint40;
colorStatusTokens.colorStatusSuccessBorder2 = mappedStatusColors[statusColorMapping.success].tint40;
colorStatusTokens.colorStatusWarningForegroundInverted = mappedStatusColors[statusColorMapping.warning].shade20;
