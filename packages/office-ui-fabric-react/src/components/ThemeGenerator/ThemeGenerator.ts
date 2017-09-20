import {
  IColor,
  getColorFromString
} from '../../utilities/color/colors';
import {
  isValidShade,
  getShade,
  getBackgroundShade
} from '../../utilities/color/shades';
import { format } from '../../Utilities';

import { IThemeSlotRule } from './IThemeSlotRule';
import { IThemeRules } from './IThemeRules';

export class ThemeGenerator {

  /* Sets an IThemeSlotRule to the given color and cascades it to the rest of the theme, updating other IThemeSlotRules in the theme that
   *   inherit from that color.
   * isInverted: whether it's a dark theme or not, which affects the algorithm used to generate shades
   * isCustomization should be true only if it's a user action, and indicates overwriting the slot's inheritance (if any)
   * overwriteCustomColor: a slot could have a generated color based on its inheritance rules (isCustomized is false), or a custom color
                            based on user input (isCustomized is true), this bool tells us whether to override existing customized colors */
  public static setSlot(
    rule: IThemeSlotRule,
    color: string | IColor,
    slotRules: IThemeRules,
    isInverted = false,
    isCustomization = false,
    overwriteCustomColor = true
  ) {
    if (!rule.color && rule.value) {
      // not a color rule
      return;
    }

    if (overwriteCustomColor) {
      let colorAsIColor: IColor;
      if (typeof color === 'string') {
        colorAsIColor = getColorFromString(color);
      } else {
        colorAsIColor = color;
      }
      ThemeGenerator._setSlot(rule, colorAsIColor, slotRules, isInverted, isCustomization, overwriteCustomColor);
    } else if (rule.color) {
      ThemeGenerator._setSlot(rule, rule.color, slotRules, isInverted, isCustomization, overwriteCustomColor);
    }
  }

  /* Sets the color of each slot based on its rule. Slots that don't inherit must have a color already.
   * If this completes without error, then the theme is ready to use. (All slots will have a color.)
   * setSlot() can be called before this, but this must be called before getThemeAs*().
   * Does not override colors of rules where isCustomized is true (i.e. doesn't override existing customizations).
   */
  public static insureSlots(slotRules: IThemeRules, isInverted: boolean) {
    // Get all the "root" rules, the ones which don't inherit. Then "set" them to trigger updating dependent slots.
    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        if (!rule.inherits && !rule.value) {
          if (!rule.color) {
            throw 'A color slot rule that does not inherit must provide its own color.';
          }
          ThemeGenerator._setSlot(rule, rule.color, slotRules, isInverted, false, false);
        }
      }
    }
  }

  /* Gets the JSON-formatted blob that describes the theme, usable with the REST request endpoints
   * { [theme slot name as string] : [color as string],
   *  "tokenName": "#f00f00",
   *  "tokenName2": "#ba2ba2",
   *   ... }
   */
  public static getThemeAsJson(slotRules: IThemeRules): any {
    let theme: any = {};
    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        theme[rule.name] = rule.color ? rule.color.str : rule.value || '';
      }
    }
    return theme;
  }

  /* Gets the theme as a list of SASS variables that can be used in code
   * $tokenName: "[theme:tokenName, default:#f00f00]";
   * $tokenName2: "[theme:tokenName2, default:#ba2ba2]";
   * ...
   */
  public static getThemeAsSass(slotRules: IThemeRules): any {
    let sassVarTemplate = '${0}Color: "[theme: {1},\tdefault: {2}]";\n';
    let output = '';

    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        let camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        output += format(sassVarTemplate,
          camelCasedName,
          camelCasedName,
          rule.color ? rule.color.str : rule.value || '');
      }
    }
    return output;
  }

  /* Gets the theme formatted for PowerShell scripts
   * @{
   * "tokenName" = "#f00f00";
   * "tokenName2" = "#ba2ba2";
   * ...
   * }
   */
  public static getThemeForPowerShell(slotRules: IThemeRules): any {
    let psVarTemplate = '"{0}" = "{1}";\n';
    let output = '';

    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        if (rule.value) {
          // skip this one, it's not a color
          continue;
        }
        let camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        let outputColor = rule.color ? '#' + rule.color.hex : rule.value || '';
        // powershell endpoint uses the RGBA format
        if (rule.color && rule.color.a && rule.color.a !== 100) {
          outputColor += String(rule.color.a.toString(16));
        }
        output += format(psVarTemplate,
          camelCasedName,
          outputColor);
      }
    }
    return '@{\n' + output + '}';
  }

  /* Sets the given slot's color to the appropriate color, shading it if necessary.
     Then, iterates through all other rules (that are this rule's dependents) to update them accordingly.
     isCustomization=true means it's a user provided color, set it to that raw color
     isCustomization=false means the rule it's inheriting from changed, so updated using asShade */
  private static _setSlot(
    rule: IThemeSlotRule,
    color: IColor,
    slotRules: IThemeRules,
    isInverted: boolean,
    isCustomization: boolean,
    overwriteCustomColor = true
  ) {
    if (!rule.color && rule.value) {
      // not a color rule
      return;
    }

    if (overwriteCustomColor || !rule.color || !rule.isCustomized || !rule.inherits) { // set the rule's color under these conditions
      if ((overwriteCustomColor || !rule.isCustomized) && !isCustomization && rule.inherits && isValidShade(rule.asShade)) {
        // it's inheriting by shade
        if (rule.isBackgroundShade) {
          rule.color = getBackgroundShade(color, rule.asShade!, isInverted)!;
        } else {
          rule.color = getShade(color, rule.asShade!, isInverted)!;
        }
        rule.isCustomized = false;
      } else {
        rule.color = color;
        rule.isCustomized = true;
      }

      // then run through the rest of the rules and update dependent colors
      for (let ruleName in slotRules) {
        if (slotRules.hasOwnProperty(ruleName)) {
          let ruleToUpdate: IThemeSlotRule = slotRules[ruleName];
          if (ruleToUpdate.inherits === rule) {
            ThemeGenerator._setSlot(ruleToUpdate, rule.color, slotRules, isInverted, false, overwriteCustomColor);
          }
        }
      }
    }
  }
}