import { Shades } from '../../utilities/Color/Shades';
import { getColorFromString } from '../../utilities/Color/Colors';

import { IThemeSlotRule } from './IThemeSlotRule';

export enum ThemeSlotsStandard {
  primaryPalette,

  primaryLightest,
  primaryLighter,
  primaryMedium,
  primaryDarker,
  primaryDarkest,

  inputAccentedBackground
}

export function ThemeRulesStandardCreator() {
  let slotRules: Array<IThemeSlotRule> = [];

  /*** BASE PALETTE COLORS */
  slotRules[ThemeSlotsStandard.primaryPalette] = {
    name: 'PrimaryPalette',
    value: getColorFromString('#0078d7'),
    isCustomized: true
  };

  /*** PRIMARY SHADES */
  slotRules[ThemeSlotsStandard.primaryLightest] = {
    name: 'PrimaryLightest',
    inherits: slotRules[ThemeSlotsStandard.primaryPalette],
    asShade: Shades.Lightest,
    isCustomized: false
  };
    slotRules[ThemeSlotsStandard.primaryLighter] = {
    name: 'PrimaryLighter',
    inherits: slotRules[ThemeSlotsStandard.primaryPalette],
    asShade: Shades.Lighter,
    isCustomized: false
  };
    slotRules[ThemeSlotsStandard.primaryMedium] = {
    name: 'PrimaryMedium',
    inherits: slotRules[ThemeSlotsStandard.primaryPalette],
    asShade: Shades.Medium,
    isCustomized: false
  };
    slotRules[ThemeSlotsStandard.primaryDarker] = {
    name: 'PrimaryDarker',
    inherits: slotRules[ThemeSlotsStandard.primaryPalette],
    asShade: Shades.Darker,
    isCustomized: false
  };
    slotRules[ThemeSlotsStandard.primaryDarkest] = {
    name: 'PrimaryDarkest',
    inherits: slotRules[ThemeSlotsStandard.primaryPalette],
    asShade: Shades.Darkest,
    isCustomized: false
  };

  /*** SEMANTIC SLOTS */
  slotRules[ThemeSlotsStandard.inputAccentedBackground] = {
    name: 'InputAccentedBackground',
    inherits: slotRules[ThemeSlotsStandard.primaryMedium],
    isCustomized: false
  };

  return slotRules;
}