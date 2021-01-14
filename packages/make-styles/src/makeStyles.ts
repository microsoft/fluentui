import { CAN_USE_CSS_VARIABLES, DEFINITION_LOOKUP_TABLE } from './constants';
import { createCSSVariablesProxy, resolveDefinitions } from './runtime/index';
import {
  MakeStylesDefinition,
  MakeStylesMatchedDefinitions,
  MakeStylesOptions,
  MakeStylesResolvedDefinition,
} from './types';

export function makeStyles<Selectors, Tokens>(
  definitions: MakeStylesDefinition<Selectors, Tokens>[],
  unstable_cssPriority: number = 0,
) {
  const cxCache: Record<string, string> = {};

  function computeClasses(
    selectors: Selectors,
    options: MakeStylesOptions<Tokens>,
    ...classNames: (string | undefined)[]
  ): string;
  function computeClasses(selectors: Selectors, options: MakeStylesOptions<Tokens>): string {
    let tokens: Tokens | null;
    let resolvedDefinitions: MakeStylesResolvedDefinition<Selectors, Tokens>[];

    // TODO: describe me
    if (process.env.NODE_ENV === 'production') {
      tokens = CAN_USE_CSS_VARIABLES ? null : options.tokens;
      resolvedDefinitions = CAN_USE_CSS_VARIABLES
        ? ((definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[])
        : resolveDefinitions(
            (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[],
            tokens,
            unstable_cssPriority,
          );
    } else {
      tokens = CAN_USE_CSS_VARIABLES ? createCSSVariablesProxy(options.tokens) : options.tokens;
      resolvedDefinitions = resolveDefinitions(
        (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[],
        tokens,
        unstable_cssPriority,
      );
    }

    let nonMakeClasses: string = '';
    const overrides: MakeStylesMatchedDefinitions = {};
    let overridesCx: string = '';

    // arguments are parsed intentionally manually to avoid double loops as TS transforms rest via an additional loop
    for (let i = 2; i < arguments.length; i++) {
      // eslint-disable-next-line prefer-rest-params
      const classNames = arguments[i];

      if (typeof classNames === 'string' && classNames !== '') {
        // .split() is an expensive call, it's faster to ensure that string contains any spaces before splitting
        if (classNames.indexOf(' ') === -1) {
          const definition = DEFINITION_LOOKUP_TABLE[classNames];

          if (definition !== undefined) {
            overrides[definition[0]] = DEFINITION_LOOKUP_TABLE[classNames][1];
            overridesCx += classNames;
          } else {
            nonMakeClasses += classNames + ' ';
          }
        } else {
          classNames.split(' ').forEach(className => {
            const definition = DEFINITION_LOOKUP_TABLE[className];

            if (definition !== undefined) {
              overrides[definition[0]] = definition[1];
              overridesCx += className;
            } else {
              nonMakeClasses += className + ' ';
            }
          });
        }
      }
    }

    let matchedIndexes = '';
    const matchedDefinitions: MakeStylesMatchedDefinitions[] = [];

    for (let i = 0, l = resolvedDefinitions.length; i < l; i++) {
      const matcherFn = resolvedDefinitions[i][0];

      if (matcherFn === null || matcherFn(selectors)) {
        matchedDefinitions.push(resolvedDefinitions[i][2]);
        matchedIndexes += i;
      }
    }

    const overridesHash = overridesCx === '' ? '' : overridesCx;
    const cxCacheKey = options.renderer.id + matchedIndexes + '' + overridesHash;
    const cxCacheElement = cxCache[cxCacheKey];

    if (CAN_USE_CSS_VARIABLES && cxCacheElement !== undefined) {
      return nonMakeClasses + cxCacheElement;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resultDefinitions: MakeStylesMatchedDefinitions = Object.assign({}, ...matchedDefinitions, overrides);
    const resultClasses = options.renderer.insertDefinitions(DEFINITION_LOOKUP_TABLE, resultDefinitions, !!options.rtl);

    cxCache[cxCacheKey] = resultClasses;

    return nonMakeClasses + resultClasses;
  }

  return computeClasses;
}
