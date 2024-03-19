import { hcHighlight, hcCanvas, hcCanvasText } from '../global/colors';
import { statusSharedColorNames, personaSharedColorNames } from '../sharedColorNames';
import { ColorPaletteTokens, ColorStatusTokens, PersonaColorPaletteTokens, StatusColorPaletteTokens } from '../types';
import { statusColorMapping } from '../statusColorMapping';

const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: hcCanvas,
    [`colorPalette${color}Background2`]: hcCanvas,
    [`colorPalette${color}Background3`]: hcCanvasText,
    [`colorPalette${color}Foreground1`]: hcCanvasText,
    [`colorPalette${color}Foreground2`]: hcCanvasText,
    [`colorPalette${color}Foreground3`]: hcCanvasText,
    [`colorPalette${color}BorderActive`]: hcHighlight,
    [`colorPalette${color}Border1`]: hcCanvasText,
    [`colorPalette${color}Border2`]: hcCanvasText,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as StatusColorPaletteTokens);

// one-off patches
statusColorPaletteTokens.colorPaletteRedForegroundInverted = hcCanvasText;
statusColorPaletteTokens.colorPaletteGreenForegroundInverted = hcCanvasText;
statusColorPaletteTokens.colorPaletteYellowForegroundInverted = hcCanvasText;

const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: hcCanvas,
    [`colorPalette${color}Foreground2`]: hcCanvasText,
    [`colorPalette${color}BorderActive`]: hcHighlight,
  };

  return Object.assign(acc, sharedColorTokens);
}, {} as PersonaColorPaletteTokens);

export const colorPaletteTokens: ColorPaletteTokens = { ...statusColorPaletteTokens, ...personaColorPaletteTokens };

export const colorStatusTokens: ColorStatusTokens = Object.entries(statusColorMapping).reduce(
  (acc, [statusColor, sharedColor]) => {
    const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);

    // TODO: double check the mapping with design
    const statusColorTokens = {
      [`colorStatus${color}Background1`]: hcCanvas,
      [`colorStatus${color}Background2`]: hcCanvas,
      [`colorStatus${color}Background3`]: hcCanvasText,
      [`colorStatus${color}Foreground1`]: hcCanvasText,
      [`colorStatus${color}Foreground2`]: hcCanvasText,
      [`colorStatus${color}Foreground3`]: hcCanvasText,
      [`colorStatus${color}BorderActive`]: hcHighlight,
      [`colorStatus${color}ForegroundInverted`]: hcCanvasText,
      [`colorStatus${color}Border1`]: hcCanvasText,
      [`colorStatus${color}Border2`]: hcCanvasText,
    };

    return Object.assign(acc, statusColorTokens);
  },
  {} as ColorStatusTokens,
);

// one-off overrides for colorStatus tokens
colorStatusTokens.colorStatusDangerBackground3Hover = hcHighlight;
colorStatusTokens.colorStatusDangerBackground3Pressed = hcHighlight;
