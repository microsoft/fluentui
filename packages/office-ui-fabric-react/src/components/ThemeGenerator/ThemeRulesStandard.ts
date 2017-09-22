import { Shade } from '../../utilities/color/shades';
import { getColorFromString } from '../../utilities/color/colors';
import { mapEnumByName } from '../../Utilities';

import { IThemeRules } from './IThemeRules';

/* This is the set of rules for our default theme.
   We start with three base slots, defining the background, foreground (text), and
   primary color (sometimes called theme color). Each Fabric slot is generated from
   shades (or tints) of one of those three, creating the Fabric palette.
   Then, we have semantic slots, the new thing intended to eventually replace the
   Fabric palette. The semantic slots inherit from the Fabric palette. */

/* The most minimal set of slots we start with. All other ones can be generated based on rules.
 * This is not so much an enum as it is a list. The enum is used to insure "type"-safety.
 * For now, we are only dealing with color. */
export enum BaseSlots {
  primaryColor,
  backgroundColor,
  foregroundColor
}

/* The original Fabric palette, only for back-compat. */
export enum FabricSlots {
  themePrimary, // BaseSlots.primaryColor, Shade[Shade.Unshaded]);
  themeLighterAlt, // BaseSlots.primaryColor, Shade[Shade.Shade1]);
  themeLighter, // BaseSlots.primaryColor, Shade[Shade.Shade2]);
  themeLight, // BaseSlots.primaryColor, Shade[Shade.Shade3]);
  themeTertiary, // BaseSlots.primaryColor, Shade[Shade.Shade4]);
  themeSecondary, // BaseSlots.primaryColor, Shade[Shade.Shade5]);
  themeDarkAlt, // BaseSlots.primaryColor, Shade[Shade.Shade6]);
  themeDark, // BaseSlots.primaryColor, Shade[Shade.Shade7]);
  themeDarker, // BaseSlots.primaryColor, Shade[Shade.Shade8]);

  neutralLighterAlt, // BaseSlots.backgroundColor, Shade[Shade.Shade1]);
  neutralLighter, // BaseSlots.backgroundColor, Shade[Shade.Shade2]);
  neutralLight, // BaseSlots.backgroundColor, Shade[Shade.Shade3]);
  neutralQuaternaryAlt, // BaseSlots.backgroundColor, Shade[Shade.Shade4]);
  neutralQuaternary, // BaseSlots.backgroundColor, Shade[Shade.Shade5]);
  neutralTertiaryAlt, // BaseSlots.backgroundColor, Shade[Shade.Shade6]); // bg6 or fg2
  neutralTertiary, // BaseSlots.foregroundColor, Shade[Shade.Shade3]);
  // deprecated: neutralSecondaryAlt, // BaseSlots.foregroundColor, Shade[Shade.Shade4]);
  neutralSecondary, // BaseSlots.foregroundColor, Shade[Shade.Shade5]);
  neutralPrimaryAlt, // BaseSlots.foregroundColor, Shade[Shade.Shade6]);
  neutralPrimary, // BaseSlots.foregroundColor, Shade[Shade.Unshaded]);
  neutralDark, // BaseSlots.foregroundColor, Shade[Shade.Shade7]);

  black, // BaseSlots.foregroundColor, Shade[Shade.Shade8]);
  white, // BaseSlots.backgroundColor, Shade[Shade.Unshaded]);
}

/* List of all the semantic color slots for this theme.
 * This is not so much an enum as it is a list. The enum is used to insure "type"-safety. */
export enum SemanticColorSlots {
  bodyBackground,
  bodyText,
  disabledBackground,
  disabledText
}

export function themeRulesStandardCreator() {
  let slotRules: IThemeRules = {};

  /*** BASE COLORS and their SHADES */
  // iterate through each base slot and make the SlotRules for those
  mapEnumByName(BaseSlots, (baseSlot: string) => {
    // first make the SlotRule for the unshaded base Color
    slotRules[baseSlot] = {
      name: baseSlot,
      isCustomized: true
    };

    // then make a rule for each shade of this base color, but skip unshaded
    mapEnumByName(Shade, (shadeName: string, shadeValue: Shade) => {
      if (shadeName === Shade[Shade.Unshaded]) {
        return;
      }
      slotRules[baseSlot + shadeName] = {
        name: baseSlot + shadeName,
        inherits: slotRules[baseSlot],
        asShade: shadeValue,
        isCustomized: false,
        isBackgroundShade: baseSlot === BaseSlots[BaseSlots.backgroundColor] ? true : false
      };
      return void 0;
    });

    return void 0;
  });

  // set default colors for the base colors
  slotRules[BaseSlots[BaseSlots.primaryColor]].color = getColorFromString('#0078d7');
  slotRules[BaseSlots[BaseSlots.backgroundColor]].color = getColorFromString('#fff');
  slotRules[BaseSlots[BaseSlots.foregroundColor]].color = getColorFromString('#333');

  // set default colors for shades (the slot rules were already created above and will be used if the base colors ever change)
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade1]].color = getColorFromString('#eff6fc');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade2]].color = getColorFromString('#deecf9');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade3]].color = getColorFromString('#c7e0f4');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade4]].color = getColorFromString('#71afe5');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade5]].color = getColorFromString('#2b88d8');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade6]].color = getColorFromString('#106ebe');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade7]].color = getColorFromString('#005a9e');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade8]].color = getColorFromString('#004578');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade1]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade2]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade3]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade4]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade5]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade6]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade7]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade8]].isCustomized = true;

  // set default colors for shades (the slot rules were already created above and will be used if the base colors ever change)
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade1]].color = getColorFromString('#eaeaea');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade2]].color = getColorFromString('#c8c8c8');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade3]].color = getColorFromString('#a6a6a6');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade4]].color = getColorFromString('#767676');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade5]].color = getColorFromString('#666666');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade6]].color = getColorFromString('#3c3c3c');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade7]].color = getColorFromString('#212121');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade8]].color = getColorFromString('#000000');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade1]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade2]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade3]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade4]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade5]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade6]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade7]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade8]].isCustomized = true;

  function _makeFabricSlotRule(slotName: string, inheritedBase: BaseSlots, inheritedShade: Shade, isBackgroundShade = false) {
    slotRules[slotName] = {
      name: slotName,
      inherits: slotRules[BaseSlots[inheritedBase]],
      asShade: inheritedShade,
      isCustomized: false,
      isBackgroundShade: isBackgroundShade
    };
  }
  _makeFabricSlotRule(FabricSlots[FabricSlots.themePrimary], BaseSlots.primaryColor, Shade.Unshaded);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeLighterAlt], BaseSlots.primaryColor, Shade.Shade1);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeLighter], BaseSlots.primaryColor, Shade.Shade2);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeLight], BaseSlots.primaryColor, Shade.Shade3);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeTertiary], BaseSlots.primaryColor, Shade.Shade4);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeSecondary], BaseSlots.primaryColor, Shade.Shade5);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeDarkAlt], BaseSlots.primaryColor, Shade.Shade6);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeDark], BaseSlots.primaryColor, Shade.Shade7);
  _makeFabricSlotRule(FabricSlots[FabricSlots.themeDarker], BaseSlots.primaryColor, Shade.Shade8);

  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralLighterAlt], BaseSlots.backgroundColor, Shade.Shade1, true);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralLighter], BaseSlots.backgroundColor, Shade.Shade2, true);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralLight], BaseSlots.backgroundColor, Shade.Shade3, true);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralQuaternaryAlt], BaseSlots.backgroundColor, Shade.Shade4, true);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralQuaternary], BaseSlots.backgroundColor, Shade.Shade5, true);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralTertiaryAlt], BaseSlots.backgroundColor, Shade.Shade6, true); // bg6 or fg2
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralTertiary], BaseSlots.foregroundColor, Shade.Shade3);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralSecondary], BaseSlots.foregroundColor, Shade.Shade5);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralPrimaryAlt], BaseSlots.foregroundColor, Shade.Shade6);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralPrimary], BaseSlots.foregroundColor, Shade.Unshaded);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralDark], BaseSlots.foregroundColor, Shade.Shade7);

  _makeFabricSlotRule(FabricSlots[FabricSlots.black], BaseSlots.foregroundColor, Shade.Shade8);
  _makeFabricSlotRule(FabricSlots[FabricSlots.white], BaseSlots.backgroundColor, Shade.Unshaded, true);

  // manually set initial colors for the primary-based Fabric slots to match the default theme
  slotRules[FabricSlots[FabricSlots.themeLighterAlt]].color = getColorFromString('#eff6fc');
  slotRules[FabricSlots[FabricSlots.themeLighter]].color = getColorFromString('#deecf9');
  slotRules[FabricSlots[FabricSlots.themeLight]].color = getColorFromString('#c7e0f4');
  slotRules[FabricSlots[FabricSlots.themeTertiary]].color = getColorFromString('#71afe5');
  slotRules[FabricSlots[FabricSlots.themeSecondary]].color = getColorFromString('#2b88d8');
  slotRules[FabricSlots[FabricSlots.themeDarkAlt]].color = getColorFromString('#106ebe');
  slotRules[FabricSlots[FabricSlots.themeDark]].color = getColorFromString('#005a9e');
  slotRules[FabricSlots[FabricSlots.themeDarker]].color = getColorFromString('#004578');
  slotRules[FabricSlots[FabricSlots.themeLighterAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeLighter]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeLight]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeTertiary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeSecondary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeDarkAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeDark]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeDarker]].isCustomized = true;

  // todo: can remove this once we remove these outdated slots from the product
  let primaryBackground = 'primaryBackground';
  slotRules[primaryBackground] = {
    name: primaryBackground,
    inherits: slotRules[FabricSlots[FabricSlots.white]],
    isCustomized: false
  };
  let primaryText = 'primaryText';
  slotRules[primaryText] = {
    name: primaryText,
    inherits: slotRules[FabricSlots[FabricSlots.neutralPrimary]],
    isCustomized: false
  };

  /*** SEMANTIC SLOTS */
  // create the SlotRule for a semantic slot
  function _makeSemanticSlotRule(semanticSlot: SemanticColorSlots, inheritedFabricSlot: FabricSlots) {
    slotRules[SemanticColorSlots[semanticSlot]] = {
      name: SemanticColorSlots[semanticSlot],
      inherits: slotRules[FabricSlots[inheritedFabricSlot]],
      isCustomized: false
    };
  }

  // Basics simple content slots
  _makeSemanticSlotRule(SemanticColorSlots.bodyBackground, FabricSlots.white);
  _makeSemanticSlotRule(SemanticColorSlots.bodyText, FabricSlots.neutralPrimary);
  _makeSemanticSlotRule(SemanticColorSlots.disabledBackground, FabricSlots.neutralLighter);
  _makeSemanticSlotRule(SemanticColorSlots.disabledText, FabricSlots.neutralTertiaryAlt);

  return slotRules;
}