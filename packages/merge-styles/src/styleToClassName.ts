import { IStyle } from './IStyle';
import { IRawStyle } from './IRawStyle';

import { Stylesheet } from './Stylesheet';
import { kebabRules } from './transforms/kebabRules';
import { prefixRules } from './transforms/prefixRules';
import { provideUnits } from './transforms/provideUnits';
import { rtlifyRules } from './transforms/rtlifyRules';
import { IStyleOptions } from './IStyleOptions';
import { tokenizeWithParentheses } from './tokenizeWithParentheses';
import { ShadowConfig } from './shadowConfig';

const DISPLAY_NAME = 'displayName';

type IDictionary = { [key: string]: any };

interface IRuleSet {
  __order: string[];
  [key: string]: IDictionary;
}

function getDisplayName(rules?: { [key: string]: IRawStyle }): string | undefined {
  const rootStyle: IStyle = rules && rules['&'];

  return rootStyle ? (rootStyle as IRawStyle).displayName : undefined;
}

const globalSelectorRegExp = /\:global\((.+?)\)/g;

type ReplacementInfo = [number, number, string];

/**
 * Finds comma separated selectors in a :global() e.g. ":global(.class1, .class2, .class3)"
 * and wraps them each in their own global ":global(.class1), :global(.class2), :global(.class3)"
 *
 * @param selectorWithGlobals The selector to process
 * @returns The updated selector
 */
function expandCommaSeparatedGlobals(selectorWithGlobals: string): string {
  // We the selector does not have a :global() we can shortcut
  if (!globalSelectorRegExp.test(selectorWithGlobals)) {
    return selectorWithGlobals;
  }

  const replacementInfo: ReplacementInfo[] = [];

  const findGlobal = /\:global\((.+?)\)/g;
  let match = null;
  // Create a result list for global selectors so we can replace them.
  while ((match = findGlobal.exec(selectorWithGlobals))) {
    // Only if the found selector is a comma separated list we'll process it.
    if (match[1].indexOf(',') > -1) {
      replacementInfo.push([
        match.index,
        match.index + match[0].length,
        // Wrap each of the found selectors in :global()
        match[1]
          .split(',')
          .map((v: string) => `:global(${v.trim()})`)
          .join(', '),
      ]);
    }
  }

  // Replace the found selectors with their wrapped variants in reverse order
  return replacementInfo
    .reverse()
    .reduce((selector: string, [matchIndex, matchEndIndex, replacement]: ReplacementInfo) => {
      const prefix = selector.slice(0, matchIndex);
      const suffix = selector.slice(matchEndIndex);

      return prefix + replacement + suffix;
    }, selectorWithGlobals);
}

function expandSelector(newSelector: string, currentSelector: string): string {
  if (newSelector.indexOf(':global(') >= 0) {
    return newSelector.replace(globalSelectorRegExp, '$1');
  } else if (newSelector.indexOf(':') === 0) {
    return currentSelector + newSelector;
  } else if (newSelector.indexOf('&') < 0) {
    return currentSelector + ' ' + newSelector;
  }

  return newSelector;
}

function extractSelector(
  currentSelector: string,
  rules: IRuleSet = { __order: [] },
  selector: string,
  value: IStyle,
  shadowConfig?: ShadowConfig,
) {
  if (selector.indexOf('@') === 0) {
    selector = selector + '{' + currentSelector;
    extractRules([value], rules, selector, shadowConfig);
  } else if (selector.indexOf(',') > -1) {
    expandCommaSeparatedGlobals(selector)
      .split(',')
      .map((s: string) => s.trim())
      .forEach((separatedSelector: string) =>
        extractRules([value], rules, expandSelector(separatedSelector, currentSelector), shadowConfig),
      );
  } else {
    extractRules([value], rules, expandSelector(selector, currentSelector), shadowConfig);
  }
}

function extractRules(
  args: IStyle[],
  rules: IRuleSet = { __order: [] },
  currentSelector: string = '&',
  shadowConfig?: ShadowConfig,
): IRuleSet {
  const stylesheet = Stylesheet.getInstance(shadowConfig);
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
        extractRules(expandedRules, rules, currentSelector, shadowConfig);
      }
      // Else if the arg is an array, we need to recurse in.
    } else if (Array.isArray(arg)) {
      extractRules(arg, rules, currentSelector, shadowConfig);
    } else {
      for (const prop in arg as any) {
        if ((arg as any).hasOwnProperty(prop)) {
          const propValue = (arg as any)[prop];

          if (prop === 'selectors') {
            // every child is a selector.
            const selectors: { [key: string]: IStyle } = (arg as any).selectors;

            for (const newSelector in selectors) {
              if (selectors.hasOwnProperty(newSelector)) {
                extractSelector(currentSelector, rules, newSelector, selectors[newSelector], shadowConfig);
              }
            }
          } else if (typeof propValue === 'object') {
            // prop is a selector.
            if (propValue !== null) {
              extractSelector(currentSelector, rules, prop, propValue, shadowConfig);
            }
          } else {
            if (propValue !== undefined) {
              // Else, add the rule to the currentSelector.
              if (prop === 'margin' || prop === 'padding') {
                expandQuads(currentRules, prop, propValue);
              } else {
                (currentRules as any)[prop] = propValue;
              }
            }
          }
        }
      }
    }
  }

  return rules;
}

function expandQuads(currentRules: IDictionary, name: string, value: string): void {
  let parts = typeof value === 'string' ? tokenizeWithParentheses(value) : [value];

  if (parts.length === 0) {
    parts.push(value);
  }

  if (parts[parts.length - 1] === '!important') {
    // Remove !important from parts, and append it to each part individually
    parts = parts.slice(0, -1).map(p => p + ' !important');
  }

  currentRules[name + 'Top'] = parts[0];
  currentRules[name + 'Right'] = parts[1] || parts[0];
  currentRules[name + 'Bottom'] = parts[2] || parts[0];
  currentRules[name + 'Left'] = parts[3] || parts[1] || parts[0];
}

function getKeyForRules(options: IStyleOptions, rules: IRuleSet): string | undefined {
  const serialized: string[] = [options.rtl ? 'rtl' : 'ltr'];
  let hasProps = false;

  for (const selector of rules.__order) {
    serialized.push(selector);
    const rulesForSelector = rules[selector];

    for (const propName in rulesForSelector) {
      if (rulesForSelector.hasOwnProperty(propName) && rulesForSelector[propName] !== undefined) {
        hasProps = true;
        serialized.push(propName, rulesForSelector[propName]);
      }
    }
  }

  return hasProps ? serialized.join('') : undefined;
}

function repeatString(target: string, count: number): string {
  if (count <= 0) {
    return '';
  }

  if (count === 1) {
    return target;
  }

  return target + repeatString(target, count - 1);
}

export function serializeRuleEntries(options: IStyleOptions, ruleEntries: { [key: string]: string | number }): string {
  if (!ruleEntries) {
    return '';
  }

  const allEntries: (string | number)[] = [];

  for (const entry in ruleEntries) {
    if (ruleEntries.hasOwnProperty(entry) && entry !== DISPLAY_NAME && ruleEntries[entry] !== undefined) {
      allEntries.push(entry, ruleEntries[entry]);
    }
  }

  // Apply transforms.
  for (let i = 0; i < allEntries.length; i += 2) {
    kebabRules(allEntries, i);
    provideUnits(allEntries, i);
    rtlifyRules(options, allEntries, i);
    prefixRules(allEntries, i);
  }

  // Apply punctuation.
  for (let i = 1; i < allEntries.length; i += 4) {
    allEntries.splice(i, 1, ':', allEntries[i], ';');
  }

  return allEntries.join('');
}

export interface IRegistration {
  className: string;
  key: string;
  args: IStyle[];
  rulesToInsert: string[];
}

export function styleToRegistration(options: IStyleOptions, ...args: IStyle[]): IRegistration | undefined {
  const rules: IRuleSet = extractRules(args, undefined, undefined, options.shadowConfig);
  const key = getKeyForRules(options, rules);

  if (key) {
    const stylesheet = Stylesheet.getInstance(options.shadowConfig);
    const registration: Partial<IRegistration> = {
      className: stylesheet.classNameFromKey(key),
      key,
      args,
    };

    if (!registration.className) {
      registration.className = stylesheet.getClassName(getDisplayName(rules));
      const rulesToInsert: string[] = [];

      for (const selector of rules.__order) {
        rulesToInsert.push(selector, serializeRuleEntries(options, rules[selector]));
      }
      registration.rulesToInsert = rulesToInsert;
    }

    return registration as IRegistration;
  }

  return undefined;
}

/**
 * Insert style to stylesheet.
 * @param registration Style registration.
 * @param specificityMultiplier Number of times classname selector is repeated in the css rule.
 * This is to increase css specificity in case it's needed. Default to 1.
 */
export function applyRegistration(
  registration: IRegistration,
  specificityMultiplier: number = 1,
  shadowConfig?: ShadowConfig,
): void {
  const stylesheet = Stylesheet.getInstance(shadowConfig);
  const { className, key, args, rulesToInsert } = registration;

  if (rulesToInsert) {
    // rulesToInsert is an ordered array of selector/rule pairs.
    for (let i = 0; i < rulesToInsert.length; i += 2) {
      const rules = rulesToInsert[i + 1];
      if (rules) {
        let selector = rulesToInsert[i];
        selector = selector.replace(/&/g, repeatString(`.${registration.className}`, specificityMultiplier));

        // Insert. Note if a media query, we must close the query with a final bracket.
        const processedRule = `${selector}{${rules}}${selector.indexOf('@') === 0 ? '}' : ''}`;
        stylesheet.insertRule(processedRule);
      }
    }
    stylesheet.cacheClassName(className!, key!, args!, rulesToInsert);
  }
}

export function styleToClassName(options: IStyleOptions, shadowConfig?: ShadowConfig, ...args: IStyle[]): string {
  const registration = styleToRegistration(options, shadowConfig, ...args);
  if (registration) {
    applyRegistration(registration, options.specificityMultiplier, options.shadowConfig);

    return registration.className;
  }

  return '';
}
