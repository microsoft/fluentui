import { CAN_USE_CSS_VARIABLES, DEFINITION_LOOKUP_TABLE } from './constants';
import { createCSSVariablesProxy, resolveDefinitions } from './runtime/index';
import {
  MakeStylesDefinition,
  MakeStylesMatchedDefinitions,
  MakeStylesOptions,
  MakeStylesResolvedDefinition,
} from './types';

export function makeStyles<Selectors, Tokens>(definitions: MakeStylesDefinition<Selectors, Tokens>[]) {
  const cxCache: Record<string, string> = {};

  return function computeClasses(
    selectors: Selectors,
    options: MakeStylesOptions<Tokens>,
    ...classNames: (string | undefined)[]
  ): string {
    let tokens: Tokens | null;
    let resolvedDefinitions: MakeStylesResolvedDefinition<Selectors, Tokens>[];

    // TODO: describe me
    if (process.env.NODE_ENV === 'production') {
      tokens = CAN_USE_CSS_VARIABLES ? null : options.tokens;
      resolvedDefinitions = CAN_USE_CSS_VARIABLES
        ? ((definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[])
        : resolveDefinitions((definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[], tokens);
    } else {
      tokens = CAN_USE_CSS_VARIABLES ? createCSSVariablesProxy(options.tokens) : options.tokens;
      resolvedDefinitions = resolveDefinitions(
        (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[],
        tokens,
      );
    }

    let nonMakeClasses: string = '';
    const overrides: MakeStylesMatchedDefinitions = {};
    let overridesCx: string = '';

    classNames.forEach(className => {
      if (typeof className === 'string') {
        if (className === '') {
          return;
        }

        className.split(' ').forEach(cName => {
          if (DEFINITION_LOOKUP_TABLE[cName] !== undefined) {
            overrides[DEFINITION_LOOKUP_TABLE[cName][0]] = DEFINITION_LOOKUP_TABLE[cName][1];
            overridesCx += cName;
          } else {
            nonMakeClasses += cName + ' ';
          }
        });
      }
    });

    let matchedIndexes = '';

    const matchedDefinitions = resolvedDefinitions.reduce<MakeStylesMatchedDefinitions[]>((acc, definition, i) => {
      const matcherFn = definition[0];

      if (matcherFn === null || matcherFn(selectors)) {
        acc.push(definition[2]);
        matchedIndexes += i;
      }

      return acc;
    }, []);

    const overridesHash = overridesCx === '' ? '' : overridesCx;
    const cxCacheKey = options.renderer.id + matchedIndexes + '' + overridesHash;

    if (CAN_USE_CSS_VARIABLES && cxCache[cxCacheKey] !== undefined) {
      return nonMakeClasses + cxCache[cxCacheKey];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resultDefinitions: MakeStylesMatchedDefinitions = Object.assign({}, ...matchedDefinitions, overrides);
    const resultClasses = options.renderer.insertDefinitions(DEFINITION_LOOKUP_TABLE, resultDefinitions, !!options.rtl);

    cxCache[cxCacheKey] = resultClasses;

    return nonMakeClasses + resultClasses;
  };
}
