import { GlobalSettings } from '@uifabric/utilities/lib/GlobalSettings';
import { rtlifyRules } from './transforms/rtlifyRules';
import { provideUnits } from './transforms/provideUnits';
import { prefixRules } from './transforms/prefixRules';
import { getVendorSettings } from './getVendorSettings';
import { Stylesheet } from './Stylesheet';
import { IStyle, IExtendedRawStyle } from './IStyle';

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
  const rulePair: string[] = [
    name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    value
  ];

  // Apply transforms.
  provideUnits(rulePair);
  rtlifyRules(rulePair);
  prefixRules(rulePair);

  const ruleEntries: string[] = [];

  // Stringify the rules.
  for (let i = 0; i < rulePair.length; i += 2) {
    ruleEntries.push(rulePair[i], ':', rulePair[i + 1], ';');
  }

  return ruleEntries.join('');
}

function getDisplayName(rules?: Map<string, IStyle>): string | undefined {
  const rootStyle: IStyle = rules && rules.get('&');

  return rootStyle ? (rootStyle as IExtendedRawStyle).displayName : undefined;
}

function extractRules(
  args: IStyle[],
  rules: Map<string, {}> = new Map<string, {}>(),
  currentSelector: string = '&'
): Map<string, {}> {
  const stylesheet = Stylesheet.getInstance();
  let currentRules: {} | undefined = rules.get(currentSelector);

  if (!currentRules) {
    currentRules = {};
    rules.set(currentSelector, currentRules);
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
  currentRules: { [key: string]: string },
  name: string,
  value: string
): void {
  const parts = value.split(' ');
  currentRules[name + 'Top'] = parts[0];
  currentRules[name + 'Right'] = parts[1] || parts[0];
  currentRules[name + 'Bottom'] = parts[2] || parts[0];
  currentRules[name + 'Left'] = parts[3] || parts[1] || parts[0];
}

function serializeRules(rules: Map<string, IStyle>): string | undefined {
  const serialized: string[] = [];
  let hasProps = false;

  rules.forEach((ruleEntries: { [key: string]: string }, selector: string): void => {
    serialized.push(selector);

    for (const propName in ruleEntries) {
      if (ruleEntries.hasOwnProperty(propName)) {
        hasProps = true;
        serialized.push(propName, ruleEntries[propName]);
      }
    }
  });

  return hasProps ? serialized.join('') : undefined;
}

export function serializeRuleEntries(ruleEntries: { [key: string]: string }): string {
  const allEntries: string[] = [];

  if (ruleEntries) {
    for (const entry in ruleEntries) {
      if (ruleEntries.hasOwnProperty(entry)) {
        allEntries.push(toRuleEntry(entry, ruleEntries[entry])!);
      }
    }
  }

  return allEntries.join('');
}

export function styleToClassName(...args: IStyle[]): string {
  const rules: Map<string, IStyle> = extractRules(args);
  const key = serializeRules(rules);
  let className = '';

  if (key) {
    const stylesheet = Stylesheet.getInstance();

    className = stylesheet.classNameFromKey(key)!;

    if (!className) {
      className = stylesheet.getClassName(getDisplayName(rules));
      stylesheet.cacheClassName(className, key, args);

      const ruleSelectors = rules.keys();
      let selector = ruleSelectors.next().value;

      while (selector) {
        const rulesToInsert: string = serializeRuleEntries(rules.get(selector) as {});

        if (rulesToInsert) {
          selector = selector.replace(/\&/g, `.${className}`);
          stylesheet.insertRule(`${selector}{${rulesToInsert}}`);
        }
        selector = ruleSelectors.next().value;
      }
    }
  }

  return className;
}
