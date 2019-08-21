import { IRawStyle, IStyle } from './IStyle';

import { Stylesheet } from './Stylesheet';
import { kebabRules } from './transforms/kebabRules';
import { prefixRules } from './transforms/prefixRules';
import { provideUnits } from './transforms/provideUnits';
import { rtlifyRules } from './transforms/rtlifyRules';
import { extractRules } from './extractRules';

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

function getKeyForRules(rules: IRuleSet): string | undefined {
  const serialized: string[] = [];
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

export function serializeRuleEntries(ruleEntries: { [key: string]: string | number }): string {
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
    rtlifyRules(allEntries, i);
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

export function styleToRegistration(...args: IStyle[]): IRegistration | undefined {
  const rules: IRuleSet = extractRules(args);
  const key = getKeyForRules(rules);

  if (key) {
    const stylesheet = Stylesheet.getInstance();
    const registration: Partial<IRegistration> = {
      className: stylesheet.classNameFromKey(key),
      key,
      args
    };

    if (!registration.className) {
      registration.className = stylesheet.getClassName(getDisplayName(rules));
      const rulesToInsert: string[] = [];

      for (const selector of rules.__order) {
        rulesToInsert.push(selector, serializeRuleEntries(rules[selector]));
      }
      registration.rulesToInsert = rulesToInsert;
    }

    return registration as IRegistration;
  }
}

export function applyRegistration(registration: IRegistration, classMap?: { [key: string]: string }): void {
  const stylesheet = Stylesheet.getInstance();
  const { className, key, args, rulesToInsert } = registration;

  if (rulesToInsert) {
    // rulesToInsert is an ordered array of selector/rule pairs.
    for (let i = 0; i < rulesToInsert.length; i += 2) {
      const rules = rulesToInsert[i + 1];
      if (rules) {
        let selector = rulesToInsert[i];

        // Fix selector using map.
        selector = selector.replace(
          /(&)|\$([\w-]+)\b/g,
          (match: string, amp: string, cn: string): string => {
            if (amp) {
              return '.' + registration.className;
            } else if (cn) {
              return '.' + ((classMap && classMap[cn]) || cn);
            }
            return '';
          }
        );

        // Insert. Note if a media query, we must close the query with a final bracket.
        const processedRule = `${selector}{${rules}}${selector.indexOf('@') === 0 ? '}' : ''}`;

        stylesheet.insertRule(processedRule);
      }
    }
    stylesheet.cacheClassName(className!, key!, args!, rulesToInsert);
  }
}

export function styleToClassName(...args: IStyle[]): string {
  const registration = styleToRegistration(...args);
  if (registration) {
    applyRegistration(registration);

    return registration.className;
  }

  return '';
}
