import { Shade } from '../../utilities/Color/Shades';
import { getColorFromString } from '../../utilities/Color/Colors';
import { mapEnumByName } from '../../utilities/object';

import { IThemeSlotRule } from './IThemeSlotRule';

/* This is the set of rules for our default theme. */

/* The most minimal set of slots we start with. All other ones can be generated based on rules.
 * This is not so much an enum as it is a list. The enum is used to insure "type"-safety.
 * For now, we are only dealing with color. */
export enum BaseSlots {
  primaryColor,
  backgroundColor,
  foregroundColor
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
  let slots = [];
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

export function ThemeRulesStandardCreator() {
  let slotRules: Array<IThemeSlotRule> = [];

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
        isCustomized: false
      };
      return void 0;
    });

    return void 0;
  });

  // set default colors for the palette
  slotRules[BaseSlots[BaseSlots.primaryColor]].value = getColorFromString('#0078d7');
  slotRules[BaseSlots[BaseSlots.backgroundColor]].value = getColorFromString('#eee'); // todo: our current library has divide-by-0 bug with #fff
  slotRules[BaseSlots[BaseSlots.foregroundColor]].value = getColorFromString('#333');

  /*** SEMANTIC SLOTS */
  // create the SlotRule for a semantic slot, it will automatically find the right shade SlotRule to point at
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
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextAlt, BaseSlots.foregroundColor, Shade.Medium);
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextDisabled, BaseSlots.foregroundColor, Shade.Lighter);
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextHover, BaseSlots.foregroundColor, Shade.Darkest);
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextPrimary, BaseSlots.primaryColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextPrimaryAlt, BaseSlots.primaryColor, Shade.Medium);
  _makeSemanticSlotRule(SemanticColorSlots.bodyTextStrong, BaseSlots.foregroundColor, Shade.Darkest);
  //_makeSemanticSlotRule(SemanticColorSlots.bodyLink, BaseSlots.backgroundColor, Shade.Unshaded);
  //_makeSemanticSlotRule(SemanticColorSlots.bodyLinkHover, BaseSlots.backgroundColor, Shade.Unshaded);

  _makeSemanticSlotRule(SemanticColorSlots.focusBorder, BaseSlots.foregroundColor, Shade.Darkest);

  _makeSemanticSlotRule(SemanticColorSlots.controlText, BaseSlots.foregroundColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.controlBackground, BaseSlots.backgroundColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundDisabled, BaseSlots.backgroundColor, Shade.Lightest);
  _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundHover, BaseSlots.backgroundColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.controlBackgroundSelected, BaseSlots.backgroundColor, Shade.Unshaded);
  //_makeSemanticSlotRule(SemanticColorSlots.controlBackgroundSelectedHover, BaseSlots.backgroundColor, Shade.Unshaded); // mapping to controlfilledhover
  _makeSemanticSlotRule(SemanticColorSlots.controlForegroundSelected, BaseSlots.primaryColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.controlForegroundDisabled, BaseSlots.foregroundColor, Shade.Lightest);
  _makeSemanticSlotRule(SemanticColorSlots.controlBorder, BaseSlots.foregroundColor, Shade.Medium);
  _makeSemanticSlotRule(SemanticColorSlots.controlBorderDisabled, BaseSlots.foregroundColor, Shade.Lightest);
  _makeSemanticSlotRule(SemanticColorSlots.controlBorderHover, BaseSlots.foregroundColor, Shade.Darkest);
  _makeSemanticSlotRule(SemanticColorSlots.controlUnfilled, BaseSlots.primaryColor, Shade.Lightest);
  //_makeSemanticSlotRule(SemanticColorSlots.controlUnfilledDefault, BaseSlots.backgroundColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.controlFilled, BaseSlots.primaryColor, Shade.Unshaded);
  _makeSemanticSlotRule(SemanticColorSlots.controlFilledHover, BaseSlots.primaryColor, Shade.Darker);

  /* OLD STUFF
    // Inputs
    _makeSemanticSlotRule(SemanticColorSlots.InputEmphasizedBackground, BaseSlots.Primary, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.InputEmphasizedBackgroundHover, BaseSlots.Primary, Shade.Medium);
    _makeSemanticSlotRule(SemanticColorSlots.InputEmphasizedForeground, BaseSlots.Neutral, Shade.Lightest);
    _makeSemanticSlotRule(SemanticColorSlots.InputEmphasizedForegroundHover, BaseSlots.Neutral, Shade.Lighter);
    _makeSemanticSlotRule(SemanticColorSlots.InputBackground, BaseSlots.Neutral, Shade.Lighter);
    _makeSemanticSlotRule(SemanticColorSlots.InputBackgroundHover, BaseSlots.Neutral, Shade.Medium);
    _makeSemanticSlotRule(SemanticColorSlots.InputForeground, BaseSlots.Neutral, Shade.Darker);
    _makeSemanticSlotRule(SemanticColorSlots.InputForegroundHover, BaseSlots.Neutral, Shade.Darkest);
    _makeSemanticSlotRule(SemanticColorSlots.DisabledBackground, BaseSlots.Neutral, Shade.Medium);
    _makeSemanticSlotRule(SemanticColorSlots.DisabledForeground, BaseSlots.Neutral, Shade.Lightest);

    // Areas? Informational? Presentation?
    _makeSemanticSlotRule(SemanticColorSlots.EmphasizedBackground, BaseSlots.Primary, Shade.Unshaded);
    _makeSemanticSlotRule(SemanticColorSlots.EmphasizedForeground, BaseSlots.Neutral, Shade.Lightest);
    _makeSemanticSlotRule(SemanticColorSlots.NeutralBackground, BaseSlots.Neutral, Shade.Lighter);
    _makeSemanticSlotRule(SemanticColorSlots.NeutralForeground, BaseSlots.Neutral, Shade.Darker);
  */

  return slotRules;
}