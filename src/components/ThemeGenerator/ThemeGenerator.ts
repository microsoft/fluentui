import { IColor } from '../../utilities/Color/IColor';
import { getColorFromString } from '../../utilities/Color/Colors';
import { getShade } from '../../utilities/Color/Shades';

import { IThemeSlotRule } from './IThemeSlotRule';

export class ThemeGenerator {

  /* Sets the color of each slot based on its rule. Slots that don't inherit must have a value already.
   * If this completes without error, then the theme is ready to use.
   * setSlot() can be called before this.
   */
  public static insureSlots(slotRules: Array<IThemeSlotRule>) {
    // Get all the "root" rules, the ones which don't inherit. Then "set" them to trigger updating dependent slots.
    slotRules.forEach((rule: IThemeSlotRule) => {
      if (!rule.inherits) {
        if (!rule.value) {
          throw 'A theme slot that does not inherit must have a value.';
        }
        ThemeGenerator.setSlot(rule, rule.value, slotRules);
      }
    }); // slotRules.forEach()
  }

  public static setSlot(
    rule:       IThemeSlotRule,
    value:      string | IColor,
    slotRules:  Array<IThemeSlotRule>
  ) {
    let valueAsIColor: IColor;
    if (typeof value === 'string') {
      valueAsIColor = getColorFromString(value);
    } else {
      valueAsIColor = value;
    }

    ThemeGenerator._setSlot(rule, valueAsIColor, slotRules, true);
  }

  private static _setSlot(
    rule:       IThemeSlotRule,
    value:      IColor,
    slotRules:  Array<IThemeSlotRule>,
    isCustomized: boolean
  ) {
    // set the appropriate data on the slot rule first
    if (!rule.asShade) {
      rule.value = value;
    } else {
      rule.value = getShade(value, rule.asShade);
    }
    rule.isCustomized = isCustomized;

    // then run through the rest of the rules and update dependent values
    slotRules.forEach((ruleToUpdate: IThemeSlotRule) => {
      if (ruleToUpdate.inherits === rule) {
        ThemeGenerator._setSlot(ruleToUpdate, rule.value, slotRules, false);
      }
    });
  }

  /* Gets the JSON-format blob that describes the theme, in this format:
   * { [theme slot name as string] : [value as string],
   *   ... }
   */
  public static getTheme(slotRules: Array<IThemeSlotRule>): any {
    let theme: any = {};
    slotRules.forEach((rule: IThemeSlotRule) => {
      theme[rule.name] = rule.value.str;
    });
    return theme;
  }
}
