import { GlobalSettings } from '@uifabric/utilities/lib/GlobalSettings';
import { rtlifyRules } from './transforms/rtlifyRules';
import { provideUnits } from './transforms/provideUnits';
import { prefixRules } from './transforms/prefixRules';
import { expandQuads } from './transforms/expandQuads';
import { getVendorSettings } from './getVendorSettings';
import { Stylesheet } from './Stylesheet';
import { IStyle } from './IStyle';

const DISPLAY_NAME = 'displayName';

function toRuleEntry(name: string, value: string): string | undefined {
  if (name === DISPLAY_NAME) {
    return undefined;
  }

  // Prefixes like WebKit need a dash infront of them.
  if (/[A-Z]/.test(name[0])) {
    name = '-' + name;
  }

  // Kebab case the rule.
  let rules: string[] = [
    name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    value
  ];

  let ruleEntries: string[] = [];

  // Apply transforms.
  provideUnits(rules);
  rtlifyRules(rules);
  prefixRules(rules);
  expandQuads(rules);

  // Stringify the rules.
  for (let i = 0; i < rules.length; i += 2) {
    ruleEntries.push(rules[i], ':', rules[i + 1], ';');
  }

  return ruleEntries.join('');
}

function getDisplayName(rules?: Map<string, IStyle>): string | undefined {
  let rootStyle: IStyle = rules && rules.get('&');

  // tslint:disable-next-line:no-any
  return rootStyle && (rootStyle as any).displayName;
}

/**
 * Given an array of objects or strings, iterate through each:
 *  if string, look up Map. Merge map into current map.
 *  else if object:
 *    iterate through each prop:
 *      if is a selector.
 *
 *
 * edge cases; should :active always have prescidence over :hover?
 * ([':hover': {}, ':active': {}], [':hover': {}])
 */
function extractRules(
  args: IStyle[],
  rules: Map<string, {}> = new Map<string, {}>(),
  currentSelector: string = '&'
): Map<string, {}> {
  let stylesheet = Stylesheet.getInstance();
  let currentRules: {} | undefined = rules.get(currentSelector);

  if (!currentRules) {
    currentRules = {};
    rules.set(currentSelector, currentRules);
  }

  for (let i = 0; i < args.length; i++) {
    const arg: IStyle = args[i];

    // If the arg is a string, we need to look up the class map and merge.
    if (typeof arg === 'string') {
      let expandedRules = stylesheet.argsFromClassName(arg);

      if (expandedRules) {
        extractRules(expandedRules, rules);
      }
      // Else if the arg is an array, we need to recurse in.
    } else if (Array.isArray(arg)) {
      extractRules(arg, rules, currentSelector);
    } else {
      // tslint:disable-next-line:no-any
      for (let prop in (arg as any)) {
        if (prop === 'selectors') {
          // tslint:disable-next-line:no-any
          let selectors: { [key: string]: IStyle } = (arg as any).selectors;

          for (let newSelector in selectors) {
            if (selectors.hasOwnProperty(newSelector)) {
              let selectorValue = selectors[newSelector];

              if (newSelector.indexOf('&') < 0) {
                newSelector = currentSelector + newSelector;
              }
              extractRules([selectorValue], rules, newSelector);
            }
          }
        } else {
          // Else, add the rule to the currentSelector.
          // tslint:disable-next-line:no-any
          (currentRules as any)[prop] = (arg as any)[prop] as any;
        }
      }
    }
  }

  return rules;
}

function serializeRules(rules: Map<string, IStyle>): string | undefined {
  let serialized: string[] = [];
  let hasProps = false;

  rules.forEach((ruleEntries: { [key: string]: string }, selector: string): void => {
    serialized.push(selector);

    for (let propName in ruleEntries) {
      if (ruleEntries.hasOwnProperty(propName)) {
        hasProps = true;
        serialized.push(propName);
        serialized.push(ruleEntries[propName]);
      }
    }
  });

  return hasProps ? serialized.join('') : undefined;
}

export function serializeRuleEntries(ruleEntries: { [key: string]: string }): string {
  let allEntries: string[] = [];

  if (ruleEntries) {
    for (let entry in ruleEntries) {
      if (ruleEntries.hasOwnProperty(entry)) {
        allEntries.push(toRuleEntry(entry, ruleEntries[entry])!);
      }
    }
  }

  return allEntries.join('');
}

export function styleToClassName(...args: IStyle[]): string {
  let rules: Map<string, IStyle> = extractRules(args);
  let key = serializeRules(rules);
  let className = '';

  if (key) {
    let stylesheet = Stylesheet.getInstance();

    className = stylesheet.classNameFromKey(key)!;

    if (!className) {
      className = stylesheet.getClassName(getDisplayName(rules));
      stylesheet.cacheClassName(className, key, args);

      let ruleSelectors = rules.keys();
      let selector = ruleSelectors.next().value;

      while (selector) {
        let rulesToInsert: string = serializeRuleEntries(rules.get(selector) as {});

        if (rulesToInsert) {
          selector = selector.replace('&', `.${className}`);
          stylesheet.insertRule(`${selector}{${rulesToInsert}}`);
        }
        selector = ruleSelectors.next().value;
      }
    }
  }
  return className;
}
