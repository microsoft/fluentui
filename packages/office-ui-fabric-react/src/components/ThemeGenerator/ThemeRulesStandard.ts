import { Shade } from '../../utilities/color/Shades';
import { getColorFromString } from '../../utilities/color/Colors';
import { mapEnumByName } from '../../Utilities';

import { IThemeRules } from './IThemeRules';

/* This is the set of rules for our default theme. */

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
  bodyTextAlt,
  bodyTextDisabled,
  bodyTextHover,
  bodyTextPrimary,
  bodyTextPrimaryAlt,
  bodyTextStrong,

  errorText,
  focusBorder,

  bodyLink,
  bodyLinkHover,

  // todo: drop shadows

  // todo: button slots

  calloutBackground,
  calloutBorder,
  calloutText,
  calloutTextDisabled,
  calloutTextHover,

  commandBarBackground,
  commandBarHover,
  commandBarIcon,
  commandBarIconSelected,

  controlText,
  controlBackground,
  controlBackgroundDisabled,
  controlBackgroundHover,
  controlBackgroundSelected,
  controlBackgroundSelectedHover,
  controlForegroundDisabled,
  controlForegroundSelected,
  controlBorder,
  controlBorderDisabled,
  controlBorderHover,
  controlUnfilled,
  controlUnfilledDefault,
  controlFilled, // needs review: we might merge controlFilled* states into controlForeground* states
  controlFilledHover,
  controlFilledActive,

  inputBackgroundDisabled,
  inputBorder,
  inputBorderDisabled,
  inputBorderFocus,
  inputBorderHover,

  menuBackgroundHover,
  menuDivider,
  menuIcon,
  menuSelectedBackgroundHover,
  menuTextDisabled
  // todo: item styles
}

/* Returns a list of all the slots */
export function getThemeSlotsStandard() {
  let slots: string[] = [];
  mapEnumByName(BaseSlots, (paletteSlot) => {
    slots.push(paletteSlot);

    mapEnumByName(Shade, (shadeName) => {
      slots.push(paletteSlot + shadeName);
      return void 0;
    });

    return void 0;
  });

  return slots;
}

export function themeRulesStandardCreator() {
  let slotRules: IThemeRules = {};

  /*** BASE COLORS and their SHADES */
  // iterate through each base slot and make the SlotRules for those
  mapEnumByName(BaseSlots, (baseSlot) => {
    // first make the SlotRule for the unshaded base Color
    slotRules[baseSlot] = {
      name: baseSlot,
      isCustomized: true
    };

    // then make a rule for each shade of this base color, but skip unshaded
    mapEnumByName(Shade, (shadeName, shadeValue) => {
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
  slotRules[BaseSlots[BaseSlots.primaryColor]].value = getColorFromString('#0078d7');
  slotRules[BaseSlots[BaseSlots.backgroundColor]].value = getColorFromString('#fff');
  slotRules[BaseSlots[BaseSlots.foregroundColor]].value = getColorFromString('#333');

  // set default colors for shades (the slot rules were already created above and will be used if the base colors ever change)
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade1]].value = getColorFromString('#eff6fc');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade2]].value = getColorFromString('#deecf9');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade3]].value = getColorFromString('#c7e0f4');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade4]].value = getColorFromString('#71afe5');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade5]].value = getColorFromString('#2b88d8');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade6]].value = getColorFromString('#106ebe');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade7]].value = getColorFromString('#005a9e');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade8]].value = getColorFromString('#004578');
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade1]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade2]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade3]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade4]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade5]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade6]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade7]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade8]].isCustomized = true;

  // set default colors for shades (the slot rules were already created above and will be used if the base colors ever change)
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade1]].value = getColorFromString('#eaeaea');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade2]].value = getColorFromString('#c8c8c8');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade3]].value = getColorFromString('#a6a6a6');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade4]].value = getColorFromString('#767676');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade5]].value = getColorFromString('#666666');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade6]].value = getColorFromString('#3c3c3c');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade7]].value = getColorFromString('#212121');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade8]].value = getColorFromString('#000000');
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade1]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade2]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade3]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade4]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade5]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade6]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade7]].isCustomized = true;
  slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade8]].isCustomized = true;

  /*** CONVERTER C->B */
  // converts modern-style slots to the ms-color-* Fabric palette
  // undefined error trying to reference Shade in this function for some reason, so need to make inheritedShade a string for now
  function _makeBtoCConverterSlotRule(slotName: string, inheritedBase: BaseSlots, inheritedShade: string) {
    if (inheritedShade === Shade[Shade.Unshaded]) {
      inheritedShade = '';
    }
    slotRules[slotName] = {
      name: slotName,
      inherits: slotRules[BaseSlots[inheritedBase] + inheritedShade],
      isCustomized: false
    };
  }
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themePrimary], BaseSlots.primaryColor, Shade[Shade.Unshaded]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeLighterAlt], BaseSlots.primaryColor, Shade[Shade.Shade1]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeLighter], BaseSlots.primaryColor, Shade[Shade.Shade2]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeLight], BaseSlots.primaryColor, Shade[Shade.Shade3]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeTertiary], BaseSlots.primaryColor, Shade[Shade.Shade4]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeSecondary], BaseSlots.primaryColor, Shade[Shade.Shade5]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeDarkAlt], BaseSlots.primaryColor, Shade[Shade.Shade6]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeDark], BaseSlots.primaryColor, Shade[Shade.Shade7]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.themeDarker], BaseSlots.primaryColor, Shade[Shade.Shade8]);

  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralLighterAlt], BaseSlots.backgroundColor, Shade[Shade.Shade1]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralLighter], BaseSlots.backgroundColor, Shade[Shade.Shade2]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralLight], BaseSlots.backgroundColor, Shade[Shade.Shade3]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralQuaternaryAlt], BaseSlots.backgroundColor, Shade[Shade.Shade4]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralQuaternary], BaseSlots.backgroundColor, Shade[Shade.Shade5]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralTertiaryAlt], BaseSlots.backgroundColor, Shade[Shade.Shade6]); // bg6 or fg2
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralTertiary], BaseSlots.foregroundColor, Shade[Shade.Shade3]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralSecondaryAlt], BaseSlots.foregroundColor, Shade[Shade.Shade4]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralSecondary], BaseSlots.foregroundColor, Shade[Shade.Shade5]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralPrimaryAlt], BaseSlots.foregroundColor, Shade[Shade.Shade6]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralPrimary], BaseSlots.foregroundColor, Shade[Shade.Unshaded]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.neutralDark], BaseSlots.foregroundColor, Shade[Shade.Shade7]);

  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.black], BaseSlots.foregroundColor, Shade[Shade.Shade8]);
  _makeBtoCConverterSlotRule(FabricSlots[FabricSlots.white], BaseSlots.backgroundColor, Shade[Shade.Unshaded]);

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
  // create the SlotRule for a semantic slot, it will automatically find the right shade SlotRule to point at,
  //   and not actually inherit the given slot as a shade
  function _makeSemanticSlotRule(semanticSlot: SemanticColorSlots, inheritedBase: BaseSlots, shade: Shade) {
    slotRules[SemanticColorSlots[semanticSlot]] = {
      name: SemanticColorSlots[semanticSlot],
      inherits: slotRules[BaseSlots[inheritedBase] + (shade !== Shade.Unshaded ? Shade[shade] : '')],
      isCustomized: false
    };
  }

  // One-offs that don't inherit
  slotRules[SemanticColorSlots[SemanticColorSlots.errorText]] = {
    name: SemanticColorSlots[SemanticColorSlots.errorText],
    value: getColorFromString('#f00'),
    isCustomized: true
  };

  /*
  bodyBackground,
  bodyText,
  bodyTextAlt,
  bodyTextDisabled,
  bodyTextHover,
  bodyTextPrimary,
  bodyTextPrimaryAlt,
  bodyTextStrong,

  errorText,
  focusBorder,

  bodyLink,
  bodyLinkHover,

  commandBarBackground,
  commandBarHover,
  commandBarIcon,
  commandBarIconSelected,
  commandBarSelected,
  commandBarSelectedHover,

  controlText,
  controlBackground,
  controlBackgroundDisabled,
  controlBackgroundHover,
  controlBackgroundSelected,
  controlBackgroundSelectedHover,
  controlForegroundDisabled,
  controlForegroundSelected,
  controlBorder,
  controlBorderDisabled,
  controlBorderHover,
  controlUnfilled,
  controlUnfilledDefault,
  controlFilled, // needs review: we might merge controlFilled* states into controlForeground* states
  controlFilledActive,

*/
  // Basics simple content slots
  _makeSemanticSlotRule(SemanticColorSlots.bodyBackground, BaseSlots.backgroundColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.bodyText, BaseSlots.foregroundColor, Shade.Unshaded);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyTextAlt, BaseSlots.foregroundColor, Shade.Shade1);
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextDisabled, BaseSlots.foregroundColor, Shade.Shade1);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyTextHover, BaseSlots.foregroundColor, Shade.Shade1);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyTextPrimary, BaseSlots.primaryColor, Shade.Unshaded);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyTextPrimaryAlt, BaseSlots.primaryColor, Shade.Shade1);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyTextStrong, BaseSlots.foregroundColor, Shade.Shade1);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyLink, BaseSlots.backgroundColor, Shade.Unshaded);
  // _makeSemanticSlotRule(SemanticColorSlots.bodyLinkHover, BaseSlots.backgroundColor, Shade.Unshaded);
  /*
    _makeSemanticSlotRule(SemanticColorSlots.focusBorder, BaseSlots.foregroundColor, Shade.Shade1);

    _makeSemanticSlotRule(SemanticColorSlots.controlText, BaseSlots.foregroundColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlBackground, BaseSlots.backgroundColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundDisabled, BaseSlots.foregroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundHover, BaseSlots.backgroundColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundSelected, BaseSlots.backgroundColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundSelectedHover, BaseSlots.backgroundColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlForegroundSelected, BaseSlots.primaryColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlForegroundDisabled, BaseSlots.foregroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlBorder, BaseSlots.foregroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlBorderDisabled, BaseSlots.foregroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlBorderHover, BaseSlots.foregroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlUnfilled, BaseSlots.primaryColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlUnfilledDefault, BaseSlots.backgroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.controlFilled, BaseSlots.primaryColor, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.controlFilledHover, BaseSlots.primaryColor, Shade.Shade1);

    _makeSemanticSlotRule(SemanticColorSlots.commandBarBackground, BaseSlots.backgroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.commandBarHover, BaseSlots.backgroundColor, Shade.Shade1);
    _makeSemanticSlotRule(SemanticColorSlots.commandBarIcon, BaseSlots.primaryColor, Shade.Shade6);
    _makeSemanticSlotRule(SemanticColorSlots.commandBarIconSelected, BaseSlots.primaryColor, Shade.Shade8);
  */
  return slotRules;
}