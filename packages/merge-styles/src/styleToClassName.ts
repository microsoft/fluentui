import { rtlifyRules } from './transforms/rtlifyRules';
import { provideUnits } from './transforms/provideUnits';
import { prefixRules } from './transforms/prefixRules';
import { kebabRules } from './transforms/kebabRules';
import { Stylesheet } from './Stylesheet';
import { IStyle, IRawStyle } from './IStyle';

const DISPLAY_NAME = 'displayName';

// tslint:disable-next-line:no-any
type IDictionary = { [key: string]: any };

interface IRuleSet {
  __order: string[];
  [key: string]: IDictionary;
}

function getDisplayName(rules?: { [key: string]: IRawStyle }): string | undefined {
  const rootStyle: IStyle = rules && rules['&'];

  return rootStyle ? (rootStyle as IRawStyle).displayName : undefined;
}

function extractRules(
  args: IStyle[],
  rules: IRuleSet = { __order: [] },
  currentSelector: string = '&'
): IRuleSet {
  const stylesheet = Stylesheet.getInstance();
  let currentRules: IDictionary | undefined = rules[currentSelector] as IDictionary;

  if (!currentRules) {
    currentRules = {};
    rules[currentSelector] = currentRules;
    rules.__order.push(currentSelector);
  }

  for (const arg of args) {
    // If the arg is a string, we need to look up the class map and merge.
    if (typeof arg === 'string') {
      const expandedRules = stylesheet.argsFromClassName(arg);

      if (expandedRules) {
        extractRules(expandedRules, rules);
      }
      // Else if the arg is an array, we need to recurse in.
    } else if (Array.isArray(arg)) {
      extractRules(arg, rules, currentSelector);
    } else {
      // tslint:disable-next-line:no-any
      for (const prop in (arg as any)) {
        if (prop === 'selectors') {
          // tslint:disable-next-line:no-any
          const selectors: { [key: string]: IStyle } = (arg as any).selectors;

          for (let newSelector in selectors) {
            if (selectors.hasOwnProperty(newSelector)) {
              const selectorValue = selectors[newSelector];

              if (newSelector.indexOf('&') < 0) {
                newSelector = currentSelector + newSelector;
              }
              extractRules([selectorValue], rules, newSelector);
            }
          }
        } else {
          // Else, add the rule to the currentSelector.
          if (prop === 'margin' || prop === 'padding') {
            // tslint:disable-next-line:no-any
            expandQuads(currentRules, prop, (arg as any)[prop]);
          } else {
            // tslint:disable-next-line:no-any
            (currentRules as any)[prop] = (arg as any)[prop] as any;
          }
        }
      }
    }
  }

  return rules;
}

function expandQuads(
  currentRules: IDictionary,
  name: string,
  value: string
): void {
  const parts = (typeof value === 'string') ? value.split(' ') : [value];

  currentRules[name + 'Top'] = parts[0];
  currentRules[name + 'Right'] = parts[1] || parts[0];
  currentRules[name + 'Bottom'] = parts[2] || parts[0];
  currentRules[name + 'Left'] = parts[3] || parts[1] || parts[0];
}

function getKeyForRules(rules: IRuleSet): string | undefined {
  const serialized: string[] = [];
  let hasProps = false;

  for (const selector of rules.__order) {
    serialized.push(selector);
    const rulesForSelector = rules[selector];

    for (const propName in rulesForSelector) {
      if (rulesForSelector.hasOwnProperty(propName)) {
        hasProps = true;
        serialized.push(propName, rulesForSelector[propName]);
      }
    }
  }

  return hasProps ? serialized.join('') : undefined;
}

export function serializeRuleEntries(ruleEntries: { [key: string]: string | number }): string {
  if (!ruleEntries) {
    return '';
  }

  const allEntries: (string | number)[] = [];

  for (const entry in ruleEntries) {
    if (ruleEntries.hasOwnProperty(entry) && entry !== DISPLAY_NAME) {
      allEntries.push(entry, ruleEntries[entry]);
    }
  }

  // Apply transforms.
  for (let i = 0; i < allEntries.length; i += 2) {
    kebabRules(allEntries, i);
    provideUnits(allEntries, i);
    rtlifyRules(allEntries, i);
    prefixRules(allEntries, i);
  }

  // Apply punctuation.
  for (let i = 1; i < allEntries.length; i += 4) {
    allEntries.splice(i, 1, ':', allEntries[i], ';');
  }

  return allEntries.join('');
}

export function styleToClassName(...args: IStyle[]): string {
  const rules: IRuleSet = extractRules(args);
  const key = getKeyForRules(rules);
  let className = '';

  if (key) {
    const stylesheet = Stylesheet.getInstance();

    className = stylesheet.classNameFromKey(key)!;

    if (!className) {
      className = stylesheet.getClassName(getDisplayName(rules));
      stylesheet.cacheClassName(className, key, args);

      for (let selector of rules.__order) {
        const rulesToInsert: string = serializeRuleEntries(rules[selector]);

        if (rulesToInsert) {
          selector = selector.replace(/\&/g, `.${className}`);
          stylesheet.insertRule(`${selector}{${rulesToInsert}}`);
        }
      }
    }
  }

  return className;
}
