import { Shades } from '../../utilities/Color/Shades';
import { getColorFromString } from '../../utilities/Color/Colors';

import { IThemeSlotRule } from './IThemeSlotRule';

/*export enum ThemeSlotsStandard {
  primaryPalette,

  primaryLightest,
  primaryLighter,
  primaryMedium,
  primaryDarker,
  primaryDarkest,

  inputAccentedBackground
}*/

export enum PaletteSlots {
  Primary,
  Neutral,
  Secondary
}

/* The string we append to the palette color slots enum to get the name of the palette color slots. */
export const PaletteName = 'Palette';

export function getThemeSlotsStandard() {
  let slots = [];
  _mapEnumByName(PaletteSlots, (paletteSlot) => {
    slots.push(paletteSlot + PaletteName);

    _mapEnumByName(Shades, (shadeName) => {
      slots.push(paletteSlot + shadeName);
      return void 0;
    });

    return void 0;
  });
}

/* Takes and enum and iterates over each value of the enum (as a string), returning a mapped array.
 * The callback takes as a first parameter the string that represents the name of the entry, and the
 * second parameter is the value of that entry, which is the value you'd normally use when using the
 * enum.
 * */
function _mapEnumByName(theEnum: Object, callback: (string?, number?) => {}) {
  return Object.keys(theEnum).map((p) => {
    if (String(Number(p)) !== p) {
      return callback(p, theEnum[p]);
    }
  }).filter(v => !!v);
}

export function ThemeRulesStandardCreator() {
  let slotRules: Array<IThemeSlotRule> = [];

  /*** BASE PALETTE COLORS and their SHADES */
  // iterate through each palette slot and make the SlotRules for those
  _mapEnumByName(PaletteSlots, (paletteSlot) => {
    // first make the SlotRule for the unshaded palette Color
    let paletteSlotName = paletteSlot + PaletteName;
    slotRules[paletteSlotName] = {
      name: paletteSlotName,
      isCustomized: true
    };

    // then make a rule for each shade of this palette color, but skip unshaded
    _mapEnumByName(Shades, (shadeName, actualShade) => {
      if (shadeName === Shades[Shades.Unshaded]) {
        return;
      }
      slotRules[paletteSlot + shadeName] = {
        name: paletteSlot + shadeName,
        inherits: slotRules[paletteSlotName],
        asShade: actualShade,
        isCustomized: false
      };
      return void 0;
    });

    return void 0;
  });

  // set default colors for the palette
  slotRules[PaletteSlots.Primary + PaletteName].value = getColorFromString('#0078d7');
  slotRules[PaletteSlots.Neutral + PaletteName].value = getColorFromString('#888');
  slotRules[PaletteSlots.Secondary + PaletteName].value = getColorFromString('#f00');

  /*** SEMANTIC SLOTS
  slotRules[ThemeSlotsStandard.inputAccentedBackground] = {
    name: 'InputAccentedBackground',
    inherits: slotRules[ThemeSlotsStandard.primaryMedium],
    isCustomized: false
  };*/

  return slotRules;
}