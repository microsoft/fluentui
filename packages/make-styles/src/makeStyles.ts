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
  options: MakeStylesOptions<Tokens>,
) {
  const cxCache: Record<string, string> = {};
  let resolvedDefinitions: MakeStylesResolvedDefinition<Selectors, Tokens>[];

  let tokens: Tokens | null;
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

  return function computeClasses(selectors: Selectors, ...classNames: (string | undefined)[]): string {
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

    let cxCacheKey = options.renderer.id;

    if (overridesCx) {
      cxCacheKey += overridesCx;
    }

    const matchedDefinitions = resolvedDefinitions.reduce<MakeStylesMatchedDefinitions[]>((acc, definition, i) => {
      const matcherFn = definition[0];

      if (matcherFn === null || matcherFn(selectors)) {
        acc.push(definition[2]);
        cxCacheKey += i;
      }

      return acc;
    }, []);

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
