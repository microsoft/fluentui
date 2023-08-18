import { Shade } from '../../utilities/color/shades';
import { getColorFromString } from '../../utilities/color/getColorFromString';
import { mapEnumByName } from '../../Utilities';
import type { IThemeRules } from './IThemeRules';

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
  foregroundColor,
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
  neutralSecondaryAlt, // BaseSlots.foregroundColor, Shade[Shade.Shade4]);
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
  disabledText,
}

export function themeRulesStandardCreator(): IThemeRules {
  const slotRules: IThemeRules = {};

  /*** BASE COLORS and their SHADES */
  // iterate through each base slot and make the SlotRules for those
  mapEnumByName(BaseSlots, (baseSlot: string) => {
    // first make the SlotRule for the unshaded base Color
    slotRules[baseSlot] = {
      name: baseSlot,
      isCustomized: true,
      dependentRules: [],
    };

    // then make a rule for each shade of this base color, but skip unshaded
    mapEnumByName(Shade, (shadeName: string, shadeValue: Shade) => {
      if (shadeName === Shade[Shade.Unshaded]) {
        return;
      }
      const inherits = slotRules[baseSlot];
      const thisSlotRule = {
        name: baseSlot + shadeName,
        inherits: slotRules[baseSlot],
        asShade: shadeValue,
        isCustomized: false,
        isBackgroundShade: baseSlot === BaseSlots[BaseSlots.backgroundColor] ? true : false,
        dependentRules: [],
      };
      slotRules[baseSlot + shadeName] = thisSlotRule;
      inherits.dependentRules.push(thisSlotRule);

      return undefined;
    });

    return undefined;
  });

  // set default colors for the base colors
  slotRules[BaseSlots[BaseSlots.primaryColor]].color = getColorFromString('#0078d4');
  slotRules[BaseSlots[BaseSlots.backgroundColor]].color = getColorFromString('#ffffff');
  slotRules[BaseSlots[BaseSlots.foregroundColor]].color = getColorFromString('#323130');

  function _makeFabricSlotRule(
    slotName: string,
    inheritedBase: BaseSlots,
    inheritedShade: Shade,
    isBackgroundShade = false,
  ): void {
    const inherits = slotRules[BaseSlots[inheritedBase]];
    const thisSlotRule = {
      name: slotName,
      inherits,
      asShade: inheritedShade,
      isCustomized: false,
      isBackgroundShade,
      dependentRules: [],
    };
    slotRules[slotName] = thisSlotRule;
    inherits.dependentRules.push(thisSlotRule);
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
  // bg6 or fg2
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralTertiaryAlt], BaseSlots.backgroundColor, Shade.Shade6, true);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralTertiary], BaseSlots.foregroundColor, Shade.Shade3);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralSecondary], BaseSlots.foregroundColor, Shade.Shade4);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralSecondaryAlt], BaseSlots.foregroundColor, Shade.Shade4);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralPrimaryAlt], BaseSlots.foregroundColor, Shade.Shade5);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralPrimary], BaseSlots.foregroundColor, Shade.Unshaded);
  _makeFabricSlotRule(FabricSlots[FabricSlots.neutralDark], BaseSlots.foregroundColor, Shade.Shade7);

  _makeFabricSlotRule(FabricSlots[FabricSlots.black], BaseSlots.foregroundColor, Shade.Shade8);
  _makeFabricSlotRule(FabricSlots[FabricSlots.white], BaseSlots.backgroundColor, Shade.Unshaded, true);

  slotRules[FabricSlots[FabricSlots.neutralLighterAlt]].color = getColorFromString('#faf9f8');
  slotRules[FabricSlots[FabricSlots.neutralLighter]].color = getColorFromString('#f3f2f1');
  slotRules[FabricSlots[FabricSlots.neutralLight]].color = getColorFromString('#edebe9');
  slotRules[FabricSlots[FabricSlots.neutralQuaternaryAlt]].color = getColorFromString('#e1dfdd');
  slotRules[FabricSlots[FabricSlots.neutralDark]].color = getColorFromString('#201f1e');
  slotRules[FabricSlots[FabricSlots.neutralTertiaryAlt]].color = getColorFromString('#c8c6c4');

  slotRules[FabricSlots[FabricSlots.black]].color = getColorFromString('#000000');
  slotRules[FabricSlots[FabricSlots.neutralDark]].color = getColorFromString('#201f1e');
  slotRules[FabricSlots[FabricSlots.neutralPrimaryAlt]].color = getColorFromString('#3b3a39');
  slotRules[FabricSlots[FabricSlots.neutralSecondary]].color = getColorFromString('#605e5c');
  slotRules[FabricSlots[FabricSlots.neutralSecondaryAlt]].color = getColorFromString('#8a8886');
  slotRules[FabricSlots[FabricSlots.neutralTertiary]].color = getColorFromString('#a19f9d');
  slotRules[FabricSlots[FabricSlots.white]].color = getColorFromString('#ffffff');

  slotRules[FabricSlots[FabricSlots.themeDarker]].color = getColorFromString('#004578');
  slotRules[FabricSlots[FabricSlots.themeDark]].color = getColorFromString('#005a9e');
  slotRules[FabricSlots[FabricSlots.themeDarkAlt]].color = getColorFromString('#106ebe');
  slotRules[FabricSlots[FabricSlots.themeSecondary]].color = getColorFromString('#2b88d8');
  slotRules[FabricSlots[FabricSlots.themeTertiary]].color = getColorFromString('#71afe5');
  slotRules[FabricSlots[FabricSlots.themeLight]].color = getColorFromString('#c7e0f4');
  slotRules[FabricSlots[FabricSlots.themeLighter]].color = getColorFromString('#deecf9');
  slotRules[FabricSlots[FabricSlots.themeLighterAlt]].color = getColorFromString('#eff6fc');

  slotRules[FabricSlots[FabricSlots.neutralLighterAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralLighter]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralLight]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralQuaternaryAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralDark]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralTertiaryAlt]].isCustomized = true;

  slotRules[FabricSlots[FabricSlots.black]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralDark]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralPrimaryAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralSecondary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralSecondaryAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.neutralTertiary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.white]].isCustomized = true;

  slotRules[FabricSlots[FabricSlots.themeDarker]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeDark]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeDarkAlt]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themePrimary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeSecondary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeTertiary]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeLight]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeLighter]].isCustomized = true;
  slotRules[FabricSlots[FabricSlots.themeLighterAlt]].isCustomized = true;

  return slotRules;
}
