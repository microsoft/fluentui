import { IStyle } from './IStyle';
import { Stylesheet } from './Stylesheet';

// tslint:disable-next-line:no-any
export type IDictionary = { [key: string]: any };

export interface IRuleSet {
  __order: string[];
  [key: string]: IDictionary;
}

type IReplacementInfo = [number, number, string];

const globalSelectorRegExp = /\:global\((.+?)\)/g;

/**
 *
 * @param args
 * @param rules
 * @param currentSelector
 */
export function extractRules(args: IStyle[], rules: IRuleSet = { __order: [] }, currentSelector: string = '&'): IRuleSet {
  const stylesheet = Stylesheet.getInstance();
  let currentRules: IDictionary | undefined = rules[currentSelector] as IDictionary;

  if (!currentRules) {
    currentRules = {};
    rules[currentSelector] = currentRules;
    rules.__order.push(currentSelector);
  }

  for (const arg of args) {
    // If the arg is a string, we need to look up the class map and merge.
    // TODO: It may not be valid to encounter this if we've done due dilligence to
    // separate classnames and objects (see extractStyleParts for redundant logic.)
    if (typeof arg === 'string') {
      const expandedRules = stylesheet.argsFromClassName(arg);

      if (expandedRules) {
        extractRules(expandedRules, rules, currentSelector);
      }
      // Else if the arg is an array, we need to recurse in.
    } else if (Array.isArray(arg)) {
      extractRules(arg, rules, currentSelector);
    } else {
      // tslint:disable-next-line:no-any
      for (const prop in arg as any) {
        if (prop === 'selectors') {
          // tslint:disable-next-line:no-any
          const selectors: { [key: string]: IStyle } = (arg as any).selectors;

          for (let newSelector in selectors) {
            if (selectors.hasOwnProperty(newSelector)) {
              const selectorValue = selectors[newSelector];

              if (newSelector.indexOf('@') === 0) {
                newSelector = newSelector + '{' + currentSelector;
                extractRules([selectorValue], rules, newSelector);
              } else if (newSelector.indexOf(',') > -1) {
                const commaSeparatedSelectors = expandCommaSeparatedGlobals(newSelector)
                  .split(/,/g)
                  .map((s: string) => s.trim());
                extractRules(
                  [selectorValue],
                  rules,
                  commaSeparatedSelectors
                    .map((commaSeparatedSelector: string) => expandSelector(commaSeparatedSelector, currentSelector))
                    .join(', ')
                );
              } else {
                extractRules([selectorValue], rules, expandSelector(newSelector, currentSelector));
              }
            }
          }
        } else {
          if ((arg as any)[prop] !== undefined) {
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
  }

  return rules;
}

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

  const replacementInfo: IReplacementInfo[] = [];

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
          .join(', ')
      ]);
    }
  }

  // Replace the found selectors with their wrapped variants in reverse order
  return replacementInfo.reverse().reduce((selector: string, [matchIndex, matchEndIndex, replacement]: IReplacementInfo) => {
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

function expandQuads(currentRules: IDictionary, name: string, value: string): void {
  const parts = typeof value === 'string' ? value.split(' ') : [value];

  currentRules[name + 'Top'] = parts[0];
  currentRules[name + 'Right'] = parts[1] || parts[0];
  currentRules[name + 'Bottom'] = parts[2] || parts[0];
  currentRules[name + 'Left'] = parts[3] || parts[1] || parts[0];
}
