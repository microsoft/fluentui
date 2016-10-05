import { Shade } from '../../utilities/Color/Shades';
import { getColorFromString } from '../../utilities/Color/Colors';

import { IThemeSlotRule } from './IThemeSlotRule';

export enum PaletteSlot {
  Primary,
  Neutral,
  Secondary
}

export enum SemanticSlot {
  Foreground,
  Background,
  AccentBackground,
  AccentBackgroundHover,
  CounteraccentForeground,
  CounteraccentForegroundHover,
  NeutralBackground,
  NeutralForeground,
  DisabledBackground,
  DisabledForeground
}

/* The string we append to the palette color slots enum to get the name of the palette color slots. */
export const PaletteName = 'Palette';

export function getThemeSlotsStandard() {
  let slots = [];
  _mapEnumByName(PaletteSlot, (paletteSlot) => {
    slots.push(paletteSlot + PaletteName);

    _mapEnumByName(Shade, (shadeName) => {
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
  _mapEnumByName(PaletteSlot, (paletteSlot) => {
    // first make the SlotRule for the unshaded palette Color
    let paletteSlotName = paletteSlot + PaletteName;
    slotRules[paletteSlotName] = {
      name: paletteSlotName,
      isCustomized: true
    };

    // then make a rule for each shade of this palette color, but skip unshaded
    _mapEnumByName(Shade, (shadeName, actualShade) => {
      if (shadeName === Shade[Shade.Unshaded]) {
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
  slotRules[PaletteSlot[PaletteSlot.Primary] + PaletteName].value = getColorFromString('#0078d7');
  slotRules[PaletteSlot[PaletteSlot.Neutral] + PaletteName].value = getColorFromString('#888');
  slotRules[PaletteSlot[PaletteSlot.Secondary] + PaletteName].value = getColorFromString('#f00');

  /*** SEMANTIC SLOTS */
  function _makeSemanticSlotRule(semanticSlot: SemanticSlot, inherits: string) {
    slotRules[SemanticSlot[semanticSlot]] = {
      name: SemanticSlot[semanticSlot],
      inherits: slotRules[inherits],
      isCustomized: false
    };
  }
  _makeSemanticSlotRule(SemanticSlot.Foreground,              PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Darkest]);
  _makeSemanticSlotRule(SemanticSlot.Background,              PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Lightest]);
  _makeSemanticSlotRule(SemanticSlot.AccentBackground,        PaletteSlot[PaletteSlot.Primary] + PaletteName);
  _makeSemanticSlotRule(SemanticSlot.AccentBackgroundHover,   PaletteSlot[PaletteSlot.Primary] + Shade[Shade.Medium]);
  _makeSemanticSlotRule(SemanticSlot.CounteraccentForeground, PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Lightest]);
  _makeSemanticSlotRule(SemanticSlot.CounteraccentForegroundHover, PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Lighter]);
  _makeSemanticSlotRule(SemanticSlot.NeutralBackground,       PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Lighter]);
  _makeSemanticSlotRule(SemanticSlot.NeutralForeground,       PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Darker]);
  _makeSemanticSlotRule(SemanticSlot.DisabledBackground,      PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Medium]);
  _makeSemanticSlotRule(SemanticSlot.DisabledForeground,      PaletteSlot[PaletteSlot.Neutral] + Shade[Shade.Lightest]);

  return slotRules;
}