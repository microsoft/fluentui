import { getColorFromString } from '../../utilities/color/getColorFromString';
import { isValidShade, getShade, getBackgroundShade } from '../../utilities/color/shades';
import { format } from '../../Utilities';
import type { IColor } from '../../utilities/color/interfaces';
import type { IThemeSlotRule } from './IThemeSlotRule';
import type { IThemeRules } from './IThemeRules';

export class ThemeGenerator {
  /**
   * Sets an IThemeSlotRule to the given color and cascades it to the rest of the theme, updating other IThemeSlotRules
   * in the theme that inherit from that color.
   * @param isInverted - whether it's a dark theme or not, which affects the algorithm used to generate shades
   * @param isCustomization - should be true only if it's a user action, and indicates overwriting the slot's
   * inheritance (if any)
   * @param overwriteCustomColor - A slot could have a generated color based on its inheritance rules (isCustomized
   * is false), or a custom color based on user input (isCustomized is true). This bool tells us whether to override
   * existing customized colors.
   */
  public static setSlot(
    rule: IThemeSlotRule,
    color: string | IColor,
    isInverted = false,
    isCustomization = false,
    overwriteCustomColor = true,
  ) {
    if (!rule.color && rule.value) {
      // not a color rule
      return;
    }

    if (overwriteCustomColor) {
      let colorAsIColor: IColor;
      if (typeof color === 'string') {
        colorAsIColor = getColorFromString(color)!; // the ! is a lie here but we'll verify it in the next line
        if (!colorAsIColor) {
          throw new Error('color is invalid in setSlot(): ' + color);
        }
      } else {
        colorAsIColor = color;
      }
      ThemeGenerator._setSlot(rule, colorAsIColor, isInverted, isCustomization, overwriteCustomColor);
    } else if (rule.color) {
      ThemeGenerator._setSlot(rule, rule.color, isInverted, isCustomization, overwriteCustomColor);
    }
  }

  /**
   * Sets the color of each slot based on its rule. Slots that don't inherit must have a color already.
   * If this completes without error, then the theme is ready to use. (All slots will have a color.)
   * setSlot() can be called before this, but this must be called before getThemeAs*().
   * Does not override colors of rules where isCustomized is true (i.e. doesn't override existing customizations).
   */
  public static insureSlots(slotRules: IThemeRules, isInverted: boolean) {
    // Get all the "root" rules, the ones which don't inherit. Then "set" them to trigger updating dependent slots.
    for (const ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        const rule: IThemeSlotRule = slotRules[ruleName];
        if (!rule.inherits && !rule.value) {
          if (!rule.color) {
            throw new Error('A color slot rule that does not inherit must provide its own color.');
          }
          ThemeGenerator._setSlot(rule, rule.color, isInverted, false, false);
        }
      }
    }
  }

  /**
   * Gets the JSON-formatted blob that describes the theme, usable with the REST request endpoints:
   * ```
   * { [theme slot name as string] : [color as string],
   *  "tokenName": "#f00f00",
   *  "tokenName2": "#ba2ba2",
   *   ... }
   * ```
   */
  public static getThemeAsJson(slotRules: IThemeRules): any {
    const theme: any = {};
    for (const ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        const rule: IThemeSlotRule = slotRules[ruleName];
        theme[rule.name] = rule.color ? rule.color.str : rule.value || '';
      }
    }
    return theme;
  }

  /**
   * Gets code-formatted load theme blob that can be copy and pasted.
   * Only used for the old theme designer, where loadTheme usage is acceptable,
   * unlike in the new theme designer.
   */
  public static getThemeAsCode(slotRules: IThemeRules): any {
    const output = 'loadTheme({\n  palette: {\n';
    return ThemeGenerator._makeRemainingCode(output, slotRules);
  }

  /**
   * Gets code-formatted load theme blob, specifically for the new theme designer,
   * aka.ms/themedesigner. Shouldn't use loadTheme like the old theme designer since it's deprecated.
   * We want to use the theme object from createTheme and use the Customizations.applySettings API instead.
   */
  public static getThemeAsCodeWithCreateTheme(slotRules: IThemeRules): any {
    const output = 'const myTheme = createTheme({\n  palette: {\n';
    return ThemeGenerator._makeRemainingCode(output, slotRules);
  }

  /**
   * Gets the theme as a list of SASS variables that can be used in code
   * ```
   * $tokenName: "[theme:tokenName, default:#f00f00]";
   * $tokenName2: "[theme:tokenName2, default:#ba2ba2]";
   * ...
   * ```
   */
  public static getThemeAsSass(slotRules: IThemeRules): any {
    const sassVarTemplate = '${0}Color: "[theme: {1}, default: {2}]";\n';
    let output = '';

    for (const ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        const rule: IThemeSlotRule = slotRules[ruleName];
        const camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        output += format(
          sassVarTemplate,
          camelCasedName,
          camelCasedName,
          rule.color ? rule.color.str : rule.value || '',
        );
      }
    }
    return output;
  }

  /**
   * Gets the theme formatted for PowerShell scripts
   * ```
   * @{
   * "tokenName" = "#f00f00";
   * "tokenName2" = "#ba2ba2";
   * ...
   * }
   * ```
   */
  public static getThemeForPowerShell(slotRules: IThemeRules): any {
    const psVarTemplate = '"{0}" = "{1}";\n';
    let output = '';

    for (const ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        const rule: IThemeSlotRule = slotRules[ruleName];
        if (rule.value) {
          // skip this one, it's not a color
          continue;
        }
        const camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        let outputColor = rule.color ? '#' + rule.color.hex : rule.value || '';
        // powershell endpoint uses the RGBA format
        if (rule.color && rule.color.a && rule.color.a !== 100) {
          outputColor += String(rule.color.a.toString(16));
        }
        output += format(psVarTemplate, camelCasedName, outputColor);
      }
    }
    return '@{\n' + output + '}';
  }

  /**
   * Sets the given slot's color to the appropriate color, shading it if necessary.
   * Then, iterates through all other rules (that are this rule's dependents) to update them accordingly.
   * @param isCustomization - If true, it's a user-provided color, which should be to that raw color.
   * If false, the rule it's inheriting from changed, so updated using asShade.
   */
  private static _setSlot(
    rule: IThemeSlotRule,
    color: IColor,
    isInverted: boolean,
    isCustomization: boolean,
    overwriteCustomColor = true,
  ) {
    if (!rule.color && rule.value) {
      // not a color rule
      return;
    }

    if (overwriteCustomColor || !rule.color || !rule.isCustomized || !rule.inherits) {
      // set the rule's color under these conditions
      if (
        (overwriteCustomColor || !rule.isCustomized) &&
        !isCustomization &&
        rule.inherits &&
        isValidShade(rule.asShade)
      ) {
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

      // then update dependent colors
      for (const ruleToUpdate of rule.dependentRules) {
        ThemeGenerator._setSlot(ruleToUpdate, rule.color, isInverted, false, overwriteCustomColor);
      }
    }
  }

  /**
   * Makes the rest of the code that's used for the load theme blob in the exported codepens of
   * both the older sharepoint-specific theme designer and the new theme designer. Takes in
   * theme rules and converts them to format fitting a list of palette colors and their values.
   * Resulting output looks like:
   * ```
   * const _theme = createTheme({
   *  palette: {
   *    themePrimary: '#0078d4',
   *    themeLighterAlt: '#f3f9fd',
   *    ...
   *  }});
   * ```
   * The first line is loadTheme instead of createTheme for the old sharepoint theme designer.
   */
  private static _makeRemainingCode(output: string, slotRules: IThemeRules) {
    const attributeTemplate = "    {0}: '{1}',\n";
    for (const ruleName in slotRules) {
      if (slotRules.hasOwnProperty(ruleName)) {
        const rule: IThemeSlotRule = slotRules[ruleName];
        const camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
        const outputColor = rule.color ? '#' + rule.color.hex : rule.value || '';
        output += format(attributeTemplate, camelCasedName, outputColor);
      }
    }
    output += '  }});';
    return output;
  }
}
