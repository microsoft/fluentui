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
   * isCustomized should be true only if it's a user action, and indicates overwriting the slot's inheritance (if any)
   * overwriteCustomValue: a slot could have a generated value based on its inheritance rules (isCustomized is false), or a custom value
                            based on user input (isCustomized is true), this bool tells us whether to override existing customized values */
  public static setSlot(
    rule: IThemeSlotRule,
    value: string | IColor,
    slotRules: IThemeRules,
    isInverted = false,
    isCustomized = false,
    overwriteCustomValue = true
  ) {
    if (overwriteCustomValue) {
      let valueAsIColor: IColor;
      if (typeof value === 'string') {
        valueAsIColor = getColorFromString(value);
      } else {
        valueAsIColor = value;
      }
      ThemeGenerator._setSlot(rule, valueAsIColor, slotRules, isInverted, true, overwriteCustomValue);
    } else if (rule.value) {
      ThemeGenerator._setSlot(rule, rule.value, slotRules, isInverted, true, overwriteCustomValue);
    }
  }

  /* Sets the color of each slot based on its rule. Slots that don't inherit must have a value already.
   * If this completes without error, then the theme is ready to use. (All slots will have a value.)
   * setSlot() can be called before this, but this must be called before getThemeAs*().
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
          rule.value ? rule.value.str : '');
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
    isInverted: boolean,
    isCustomization: boolean,
    overwriteCustomValue = true
  ) {
    rule.isCustomized = !rule.inherits || isCustomization; // a rule is always customized if it doesn't inherit

    if (overwriteCustomValue || !rule.value || !rule.isCustomized || !rule.inherits) { // set the rule's value under these conditions
      if (!isCustomization && rule.inherits && isValidShade(rule.asShade)) { // it's inheriting by shade
        if (rule.isBackgroundShade) {
          rule.value = getBackgroundShade(value, rule.asShade!, isInverted)!;
        } else {
          rule.value = getShade(value, rule.asShade!, isInverted)!;
        }
      } else {
        rule.value = value;
      }
      rule.isCustomized = overwriteCustomValue ? isCustomization : rule.isCustomized;

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