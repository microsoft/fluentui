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

  /* isInverted: whether it's a dark theme or not, which affects the algorithm used to generate shades
   * isCustomization should be true only if it's a user action, and indicates overwriting the slot's inheritance (if any)
   * overwriteCustomValue: a slot could have a generated value based on its inheritance rules (isCustomized is false), or a custom value
                            based on user input (isCustomized is true), this bool tells us whether to override existing customized values */
  public static setSlot(
    rule: IThemeSlotRule,
    value: string | IColor,
    slotRules: IThemeRules,
    isInverted = false,
    isCustomization = false,
    overwriteCustomValue = true
  ) {
    if (overwriteCustomValue) {
      let valueAsIColor: IColor;
      if (typeof value === 'string') {
        valueAsIColor = getColorFromString(value);
      } else {
        valueAsIColor = value;
      }
      ThemeGenerator._setSlot(rule, valueAsIColor, slotRules, isInverted, isCustomization, overwriteCustomValue);
    } else if (rule.value) {
      ThemeGenerator._setSlot(rule, rule.value, slotRules, isInverted, isCustomization, overwriteCustomValue);
    }
  }

  /* Sets the color of each slot based on its rule. Slots that don't inherit must have a value already.
   * If this completes without error, then the theme is ready to use. (All slots will have a value.)
   * setSlot() can be called before this, but this must be called before getThemeAs*().
   * Does not override values of rules where isCustomized is true (i.e. doesn't override existing customizations).
   */
  public static insureSlots(slotRules: IThemeRules, isInverted: boolean) {
    // Get all the "root" rules, the ones which don't inherit. Then "set" them to trigger updating dependent slots.
    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        if (!rule.inherits) {
          if (!rule.value) {
            throw 'A slot rule that does not inherit must provide its own value.';
          }
          ThemeGenerator._setSlot(rule, rule.value, slotRules, isInverted, false, false);
        }
      }
    }
  }

  /* Gets the JSON-formatted blob that describes the theme, usable with the REST request endpoints
   * { [theme slot name as string] : [value as string],
   *  "tokenName": "#f00f00",
   *  "tokenName2": "#ba2ba2",
   *   ... }
   */
  public static getThemeAsJson(slotRules: IThemeRules): any {
    let theme: any = {};
    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        theme[rule.name] = rule.value ? rule.value.str : '';
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
    let sassVarTemplate = '${0}Color:\t"[theme: {1},\tdefault: {2}]";\n';
    let output = '';

    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        let camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        output += format(sassVarTemplate,
          camelCasedName,
          camelCasedName,
          rule.value ? rule.value.str : '');
      }
    }
    return output;
  }

  /* Gets the theme formatted for the PowerShell endpoint
   * @{
   * "tokenName" = "#f00f00";
   * "tokenName2" = "#ba2ba2";
   * ...
   * }
)
Add-SPOTheme -Name "TestOrange" -Palette $themeOrange -IsInverted $false

   */
  public static getThemeForPowerShell(slotRules: IThemeRules): any {
    let psVarTemplate = '"{0}" = "{2}";\n';
    let output = '';

    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        let camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        output += format(psVarTemplate,
          camelCasedName,
          camelCasedName,
          rule.value ? rule.value.str : '');
      }
    }
    return '@{\n' + output + '}';
  }

  /* Sets the given slot's value to the appropriate value, shading it if necessary.
     Then, iterates through all other rules (that are this rule's dependents) to update them accordingly.
     isCustomization=true means it's a user provided color, set it to that raw color
     isCustomization=false means the rule it's inheriting from changed, so updated using asShade */
  private static _setSlot(
    rule: IThemeSlotRule,
    value: IColor,
    slotRules: IThemeRules,
    isInverted: boolean,
    isCustomization: boolean,
    overwriteCustomValue = true
  ) {
    if (overwriteCustomValue || !rule.value || !rule.isCustomized || !rule.inherits) { // set the rule's value under these conditions
      if ((overwriteCustomValue || !rule.isCustomized) && !isCustomization && rule.inherits && isValidShade(rule.asShade)) {
        // it's inheriting by shade
        if (rule.isBackgroundShade) {
          rule.value = getBackgroundShade(value, rule.asShade!, isInverted)!;
        } else {
          rule.value = getShade(value, rule.asShade!, isInverted)!;
        }
        rule.isCustomized = false;
      } else {
        rule.value = value;
        rule.isCustomized = true;
      }

      // then run through the rest of the rules and update dependent values
      for (let ruleName in slotRules) {
        if (slotRules.hasOwnProperty(ruleName)) {
          let ruleToUpdate: IThemeSlotRule = slotRules[ruleName];
          if (ruleToUpdate.inherits === rule) {
            ThemeGenerator._setSlot(ruleToUpdate, rule.value, slotRules, isInverted, false, overwriteCustomValue);
          }
        }
      }
    }
  }
}