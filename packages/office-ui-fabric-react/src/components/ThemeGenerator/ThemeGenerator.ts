import {
  IColor,
  getColorFromString
} from '../../utilities/color/Colors';
import {
  isValidShade,
  getShade,
  getBackgroundShade
} from '../../utilities/color/Shades';
import { format } from '../../Utilities';

import { IThemeSlotRule } from './IThemeSlotRule';
import { IThemeRules } from './IThemeRules';

export class ThemeGenerator {

  /* isCustomized should be true only if it's a user action, and indicates overwriting the slot's inheritance (if any)
     overwriteCustomValue: a slot could have a generated value based on its inheritance rules (isCustomized is false), or a custom value
                            based on user input (isCustomized is true), this bool tells us whether to override existing customized values */
  public static setSlot(
    rule: IThemeSlotRule,
    value: string | IColor,
    slotRules: IThemeRules,
    isCustomized = false,
    overwriteCustomValue = true
  ) {
    if (isCustomized) {
      window['__backgroundColor'] = slotRules['backgroundColor'].value;
    }
    if (rule === slotRules['backgroundColor']) {
      let primaryColor = slotRules['primaryColor'];
      let foregroundColor = slotRules['foregroundColor'];
      ThemeGenerator.setSlot(primaryColor, primaryColor.value, slotRules, isCustomized, overwriteCustomValue);
      ThemeGenerator.setSlot(foregroundColor, foregroundColor.value, slotRules, isCustomized, overwriteCustomValue);
    }

    rule.isCustomized = !rule.inherits || isCustomized; // it's always customized if it doesn't inherit

    if (overwriteCustomValue) {
      let valueAsIColor: IColor;
      if (typeof value === 'string') {
        valueAsIColor = getColorFromString(value);
      } else {
        valueAsIColor = value;
      }
      ThemeGenerator._setSlot(rule, valueAsIColor, slotRules, true);
    } else if (rule.value) {
      ThemeGenerator._setSlot(rule, rule.value, slotRules, true, false);
    }
  }

  /* Sets the color of each slot based on its rule. Slots that don't inherit must have a value already.
   * If this completes without error, then the theme is ready to use.
   * setSlot() can be called before this.
   */
  public static insureSlots(slotRules: IThemeRules) {
    // Get all the "root" rules, the ones which don't inherit. Then "set" them to trigger updating dependent slots.
    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let rule: IThemeSlotRule = slotRules[ruleName];
        if (!rule.inherits) {
          if (!rule.value) {
            throw 'A theme slot that does not inherit must have a value.';
          }
          ThemeGenerator.setSlot(rule, rule.value, slotRules, true, false);
        }
      }
    }
  }

  /* Gets the JSON-format blob that describes the theme, in this format:
   * { [theme slot name as string] : [value as string],
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

  /* Gets the theme as a list of SASS variables that can be used in code in this format:
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
          rule.value.str);
      }
    }
    return output;
  }

  /* Sets the given slot's value to the appropriate value, shading it if necessary.
     Then, iterates through all other rules (that are this rule's dependents) to update them accordingly. */
  private static _setSlot(
    rule: IThemeSlotRule,
    value: IColor,
    slotRules: IThemeRules,
    isCustomized: boolean, // this property isn't changed on the rule if overwriteCustomValue is false
    overwriteCustomValue = true
  ) {
    if (overwriteCustomValue || !rule.value) { // set a value under these conditions
      if (isCustomized || !isValidShade(rule.asShade)) {
        // if it's customized (or the rule is invalid), just set it to the raw value
        rule.value = value;
      } else { // not customized, so get the color, by shade if necessary
        if (rule.isBackgroundShade) {
          rule.value = getBackgroundShade(value, rule.asShade);
        } else {
          rule.value = getShade(value, rule.asShade);
        }
      }
      rule.isCustomized = isCustomized;
    }

    // then run through the rest of the rules and update dependent values
    for (let ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        let ruleToUpdate: IThemeSlotRule = slotRules[ruleName];
        if (ruleToUpdate.inherits === rule) {
          ThemeGenerator._setSlot(ruleToUpdate, rule.value, slotRules, false, overwriteCustomValue);
        }
      }
    }
  }

}